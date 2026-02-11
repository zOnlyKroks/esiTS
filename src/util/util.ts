import chalk from 'chalk'
import axios, { AxiosResponse, AxiosError } from 'axios'
import path from 'path'
import fs from 'fs'
import { URLSearchParams } from 'node:url'
import { projectPath, projectConfig, localConfig } from './constants'
import { version } from '../../package.json'
import {
  RequestConfig,
  ValidationConfig,
  ESISettings,
  CacheEntry,
  CacheStats,
  ESIError,
  ESIResponse
} from '../types'

const DEFAULT_USER_AGENT = `esiJS/${version}`

// ETag cache storage - in memory cache for storing ETags and cached responses
const etagCache = new Map<string, CacheEntry>()

// documented in utility.js
export function getSettings(): ESISettings {
  let settings: string
  if (checkForConfig()) {
    settings = fs.readFileSync(projectConfig, 'utf8')
    return JSON.parse(settings) as ESISettings
  } else {
    log(`No project config file! Attempting to revert to default configuration...`, 'WARN')
    settings = fs.readFileSync(localConfig, 'utf8')
  }
  return JSON.parse(settings) as ESISettings
}

/**
 * @private
 * @param msg - The error message.
 * @param code - The error code.
 * @param url - The endpoint url the error occurred on.
 */
export function buildError(msg: string, code?: string, url?: string): ESIError {
  const error = new Error(msg) as ESIError
  if (url) error.url = url
  error.code = code || 'NO_CODE_DEFINED'
  return error
}

/**
 * @private
 * @param message The log message.
 * @param type Either 'INFO', 'WARN', or 'ERROR'.
 */
export function log(message: string, type: 'INFO' | 'WARN' | 'WARNING' | 'ERROR' = 'INFO'): void {
  if (message) {
    switch (type.toLowerCase()) {
      case 'info': {
        console.log(`${chalk.green(`[esiJS:${type.toUpperCase()}]:`)} ${message}`)
        break
      }
      case 'warn':
      case 'warning': {
        console.log(`${chalk.yellow(`[esiJS:${type.toUpperCase()}]:`)} ${message}`)
        break
      }
      case 'error': {
        console.log(`${chalk.red(`[esiJS:${type.toUpperCase()}]:`)} ${message}`)
        break
      }
      default: {
        return
      }
    }
  }
}

/**
 * @private
 * Input validation function with TypeScript support
 */
export function inputValidation({
  input,
  type,
  message,
  options,
  optional = false
}: ValidationConfig): void {
  // If is optional and input is undefined, no need to validate
  if (optional && input === undefined) {
    return
  }

  // Do not check for !input or you are making that you won't accept falsy values such as empty '' or id = 0
  if (input === undefined) {
    throw buildError(message, `INPUT_UNDEFINED`)
  }
  if (typeof input !== type) {
    throw buildError(message, `INPUT_NOT_EQUAL_TO_REQUIRED_TYPE`)
  }
  // If options is provided, check that input is included
  if (options && !options.includes(input)) {
    throw buildError(message, `GIVEN_OPTION_NOT_VALID_OPTION`)
  }
}

/**
 * @private
 * Main request function with ETag caching support
 */
export function makeRequest({
  subUrl,
  body,
  query,
  requestType = 'GET',
  needsAuth = false
}: RequestConfig): Promise<ESIResponse> {
  const { link, authToken, language, projectName } = getSettings()
  const urlTest = /\/(?=\/)(?<!https:\/)/g
  const headers: Record<string, string> = {
    accept: 'gzip, deflate, br',
    'Accept-Language': language,
    'User-Agent': DEFAULT_USER_AGENT,
    // 'Content-Type': 'application/json',
  }
  let fullURL = `${link}${subUrl}/?datasource=tranquility`

  // Create cache key for ETag caching (based on URL, method, and auth status)
  let cacheKey = `${requestType.toUpperCase()}_${fullURL}_${needsAuth ? 'AUTH' : 'NOAUTH'}`
  if (query) {
    cacheKey += '_' + JSON.stringify(query)
  }
  if (body) {
    cacheKey += '_' + JSON.stringify(body)
  }

  // If query params are defined, add them to the end of the full url
  if (query) {
    fullURL += `?${new URLSearchParams(query as Record<string, string>).toString()}` // URLSearchParams doesn't add the beginning "?"
  }

  // Add in the language
  if (language !== '') {
    fullURL += `&language=${language.split('/').join('-')}`
  }
  // and the auth token if needed
  if (needsAuth && authToken !== '') {
    // Include both the headers and the query just in case one or the other fails
    headers['authorization'] = `Bearer ${authToken}`
    fullURL += `&token=${authToken}`
  } else if (needsAuth && authToken === '') {
    throw buildError(
      `You used an authenticated function without a token. Please set a token in the 'esi.json' file in ${path.join(__dirname, '../../../')}.`,
      `NO_AUTH_TOKEN`
    )
  }
  // Add in the program name if specified, else default to 'esiJS-v{version}'
  if (projectName && projectName !== '') {
    headers['User-Agent'] += ` (for: ${projectName})`
  }

  // Check for cached ETag and add If-None-Match header for GET requests
  const cachedEntry = etagCache.get(cacheKey)
  if (requestType.toUpperCase() === 'GET' && cachedEntry && cachedEntry.etag) {
    headers['If-None-Match'] = cachedEntry.etag
    log(`Using cached ETag for ${subUrl}: ${cachedEntry.etag}`, 'INFO')
  }

  // Check the URL for extra forward slashes and delete them
  fullURL = fullURL.replace(urlTest, '')

  // Create the appropriate axios request
  let request: Promise<AxiosResponse>
  switch (requestType.toUpperCase()) {
    case 'GET': {
      request = axios.get(fullURL, { headers })
      break
    }
    case 'POST': {
      request = axios.post(fullURL, body, { headers })
      break
    }
    case 'PUT': {
      request = axios.put(fullURL, body, { headers })
      break
    }
    case 'DELETE': {
      request = axios.delete(fullURL, { headers, data: body })
      break
    }
    default: {
      const url = fullURL.split('&token')[0]
      throw buildError(
        `ESIJS ERROR: Endpoint function not configured properly. Please report this error on the GitHub repository.`,
        'ESIJS_ERROR',
        url
      )
    }
  }

  // Return the promise request, pre set the 'then' and 'catch' clauses
  return request
    .then((response: AxiosResponse): ESIResponse => {
      const data: ESIResponse = {
        headers: response.headers as Record<string, string>,
        data: response.data,
      }

      // Cache the response and ETag for GET requests
      if (requestType.toUpperCase() === 'GET' && response.headers.etag) {
        etagCache.set(cacheKey, {
          etag: response.headers.etag as string,
          data: data,
          timestamp: Date.now()
        })
        log(`Cached new ETag for ${subUrl}: ${response.headers.etag}`, 'INFO')
      }

      return data
    })
    .catch((error: AxiosError): ESIResponse => {
      if (error.response) {
        // Handle 304 Not Modified - return cached data
        if (error.response.status === 304 && cachedEntry) {
          log(`Using cached data for ${subUrl} (304 Not Modified)`, 'INFO')
          return cachedEntry.data
        }
        // if its an error from ESI
        const esiError = `${(error.response.data as any)?.error || error.response.statusText}`
        const url = fullURL.split('&token')[0]
        throw buildError(esiError, `ESI_ERROR`, url)
      }
      // if its another error, just send the full error
      throw buildError(error.message, 'ESIJS_ERROR')
    })
}

export function checkForConfig(logging?: boolean): boolean {
  let localLog = log
  // Check for a ESI config file in the project directory
  if (!logging) {
    localLog = () => {}
  }
  try {
    const fileExists = fs.existsSync(projectConfig)

    // If the file exists...
    if (fileExists) {
      // ...see if we can read it...
      try {
        fs.accessSync(projectConfig, fs.constants.R_OK)

        // ...then see if we can write into it
        try {
          fs.accessSync(projectConfig, fs.constants.W_OK)
        } catch (_e) {
          localLog(`Couldn't write to 'esi.json', reverting to default configuration`, 'WARNING')
          return false
        }
      } catch (_e) {
        localLog(`Couldn't read config file, reverting to default configuration`, 'WARNING')
        return false
      }
    } else {
      // If the file doesn't exist...
      localLog(
        `The config file doesn't exist! Reverting to default configuration and attempting to write to "${projectConfig}"...`,
        'INFO'
      )
      try {
        // ...attempt to create it
        fs.writeFileSync(projectConfig, JSON.stringify(require(localConfig), null, 2))
        localLog(`Successfully created config file in ${projectPath}!`, 'INFO')
      } catch (e) {
        throw buildError(`There was an error while attempting to create the config file! Error: \n${e}`)
      }
      return false
    }
  } catch (_e) {
    return false
  }
  localLog(`I can read the config file!`, 'INFO')
  return true
}

/**
 * Clears the ETag cache
 * @param cacheKey Optional specific cache key to clear, if not provided clears all cache
 */
export function clearEtagCache(cacheKey?: string): void {
  if (cacheKey) {
    const deleted = etagCache.delete(cacheKey)
    log(`Cache entry ${deleted ? 'cleared' : 'not found'} for key: ${cacheKey}`, 'INFO')
  } else {
    const size = etagCache.size
    etagCache.clear()
    log(`Cleared ${size} entries from ETag cache`, 'INFO')
  }
}

/**
 * Gets cache statistics
 * @returns Cache stats including size and keys
 */
export function getCacheStats(): CacheStats {
  return {
    size: etagCache.size,
    keys: Array.from(etagCache.keys()),
    entries: Array.from(etagCache.entries()).map(([key, value]) => ({
      key,
      etag: value.etag,
      timestamp: value.timestamp,
      age: Date.now() - value.timestamp
    }))
  }
}

// Export the main request function with the new name for backwards compatibility
export const request = makeRequest