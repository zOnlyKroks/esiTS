import fs from 'fs'
import {
  buildError,
  checkForConfig,
  log,
  getSettings,
  clearEtagCache,
  getCacheStats
} from './util/util'
import { projectConfig, routes, server, ESIRoute } from './util/constants'
import { ESISettings } from './types'

interface SetSettingsOptions {
  route?: ESIRoute | string
  authToken?: string
  language?: string
  projectName?: string
}

export const utilityFunctions = {
  /**
   * Gets the settings for esiJS.
   * @returns A JSON object with the settings.
   */
  getSettings,

  /**
   * Sets the settings for esiJS.
   * @param route Any of the valid routes through ESI. Defaults to `latest`.
   * @param authToken A valid auth token.
   * @param language A valid language code. Defaults to `en/us`.
   * @param projectName The name of your project, used by esiJS to pass in as a header. If not defined, defaults to `esiJS-v${version}`.
   * @returns `true` if it was able to successfully write. Otherwise, an error.
   */
  setSettings({
    route = 'latest',
    authToken,
    language = 'en/us',
    projectName
  }: SetSettingsOptions): boolean {
    if (checkForConfig()) {
      const currentSettings = getSettings()

      // Check if settings are already set, and don't change if not needed
      const finalRoute = route || currentSettings.projectName
      const finalAuthToken = authToken || currentSettings.authToken
      const finalLanguage = language || currentSettings.language
      const finalProjectName = projectName || currentSettings.projectName

      if (!finalRoute || !routes.includes(finalRoute as ESIRoute)) {
        throw buildError(`setSettings needs its "route" argument to be one of these: ${routes.join(', ')}`)
      }

      const routeUrl = `https://${server}/${finalRoute}/`

      try {
        const newConfig: ESISettings = {
          projectName: finalProjectName,
          link: routeUrl,
          authToken: finalAuthToken,
          language: finalLanguage,
        }

        const newConfigString = JSON.stringify(newConfig, null, 2)
        fs.writeFileSync(projectConfig, newConfigString)
        log(`Successfully updated config!\nNew config:\n${newConfigString}`, 'INFO')
      } catch (e) {
        throw buildError(`Couldn't write config file! Error:\n${e}`)
      }
      return true
    }
    throw buildError(
      `If you are seeing this error, 2 + 2 is not equal to 4 and your life is a lie.`,
      'THIS_SHOULDNT_EVER_HAPPEN'
    )
  },

  /**
   * Pause execution of code for a specified amount of time.
   * @param millis The time to delay (in milliseconds)
   * @returns Promise that resolves after the specified time
   */
  async sleep(millis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millis))
  },

  /**
   * Clears the ETag cache for improved performance
   * @param cacheKey Optional specific cache key to clear, if not provided clears all cache
   */
  clearEtagCache,

  /**
   * Gets cache statistics including size, keys, and age of cached entries
   * @returns Cache stats including size and keys
   */
  getCacheStats,
}

export default utilityFunctions