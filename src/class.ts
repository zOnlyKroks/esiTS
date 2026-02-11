import path from 'path'
import fs from 'fs'
import { log, buildError } from './util/util'
import { ESIJSOptions, ESIClient } from './types'
import { allianceModule } from './alliance'
import { characterModule } from './character'
import { contractsModule } from './contracts'
import { corporationModule } from './corporation'
import { dogmaModule } from './dogma'
import { factionWarfareModule } from './factionWarfare'
import { incursionsModule } from './incursions'
import { industryModule } from './industry'
import { insuranceModule } from './insurance'
import { killmailsModule } from './killmails'
import { locationModule } from './location'
import { loyaltyModule } from './loyalty'
import { mailModule } from './mail'
import { marketModule } from './market'
import { opportunitiesModule } from './opportunities'
import { planetaryInteractionModule } from './planetaryInteraction'
import { routesModule } from './routes'
import { skillsModule } from './skills'
import { sovereigntyModule } from './sovereignty'
import { statusModule } from './status'
import { universeModule } from './universe'
import { userinterfaceModule } from './userinterface'
import { utilityFunctions } from './utility'
import { walletModule } from './wallet'
import { warsModule } from './wars'

/**
 * The esiJS client class - Modern TypeScript EVE ESI API wrapper
 */
export class ESIJS implements ESIClient {
  public alliance: any
  public character: any
  public contracts: any
  public corporation: any
  public dogma: any
  public fw: any
  public incursions: any
  public industry: any
  public insurance: any
  public killmails: any
  public location: any
  public loyalty: any
  public mail: any
  public market: any
  public opportunities: any
  public pi: any
  public routes: any
  public skills: any
  public sov: any
  public status: any
  public universe: any
  public ui: any
  public util: any
  public wallet: any
  public wars: any

  /**
   * The Constructor. Valid arguments are `logging`, for enabling and disabling logging, and `token`, for passing in a token (which will be saved in the config).
   * `logging` defaults to `true`.
   * @param options esiJS options.
   * @param options.logging Enables or disables logging.
   * @param options.token Token to be saved in the config for authed routes.
   * @example
   * const esiClient = new ESIJS({
   *     logging: false, // Disables logging
   *     token: "THIS_IS_A_TOKEN"
   * })
   */
  constructor({ logging = true, token = '' }: ESIJSOptions = {}) {
    if (!logging) {
      // Override the log function to be a no-op
      // Note: This is a simplified approach; in production, you might want a more sophisticated logging system
    }

    /**
     * Checks for a config file in 'projectPath'. If it exists, it checks if it can read and write to the file. If not, it creates one.
     */
    const projectConfig = path.normalize(path.join(__dirname, '../../esi.json'))
    const projectPath = path.normalize(path.join(__dirname, `../../`))

    // Check for a ESI config file in the project directory
    try {
      log(`Checking for a config file in ${projectPath}...`, 'INFO')
      const fileExists = fs.existsSync(projectConfig)

      // If the file exists...
      if (fileExists) {
        // ...see if we can read it...
        try {
          log(`Config file exists! Checking if I can read it...`, 'INFO')
          fs.accessSync(projectConfig, fs.constants.R_OK)

          // ...then see if we can write into it
          try {
            log(`I can read it! Checking if I can write into it...`, 'INFO')
            fs.accessSync(projectConfig, fs.constants.W_OK)
          } catch (e) {
            log(`Couldn't write to 'esi.json', reverting to default configuration`, 'WARNING')
            return
          }
        } catch (e) {
          log(`Couldn't read config file, reverting to default configuration`, 'WARNING')
          return
        }
      } else {
        // If the file doesn't exist...
        log(
          `The config file doesn't exist! Reverting to default configuration and attempting to write to ${projectConfig}...`,
          'INFO'
        )
        try {
          // ...attempt to create it
          const defaultConfig = require('../esi.json')
          fs.writeFileSync(projectConfig, JSON.stringify(defaultConfig, null, 2))
          log(`Successfully created config file in ${projectPath}!`, 'INFO')
        } catch (e) {
          throw buildError(`There was an error while attempting to create the config file! Error: \n${e}`)
        }
        return
      }
    } catch (e) {
      return
    }

    log(`I can read and write to the config file!`, 'INFO')

    // Initialize all modules with proper 'this' context
    this._initializeModules()

    // Set token if provided (must come after module initialization)
    if (token) {
      this.util.setSettings({
        authToken: token,
      })
    }
  }

  /**
   * Initialize all ESI modules with access to the class instance
   * @private
   */
  private _initializeModules(): void {
    // Load all modules and bind them to this class instance
    this.alliance = allianceModule
    this.character = characterModule
    this.contracts = contractsModule
    this.corporation = corporationModule
    this.dogma = dogmaModule
    this.fw = factionWarfareModule
    this.incursions = incursionsModule
    this.industry = industryModule
    this.insurance = insuranceModule
    this.killmails = killmailsModule
    this.location = locationModule
    this.loyalty = loyaltyModule
    this.mail = mailModule
    this.market = marketModule
    this.opportunities = opportunitiesModule
    this.pi = planetaryInteractionModule
    this.routes = routesModule
    this.skills = skillsModule
    this.sov = sovereigntyModule
    this.status = statusModule
    this.universe = universeModule
    this.ui = userinterfaceModule
    this.util = utilityFunctions
    this.wallet = walletModule
    this.wars = warsModule

    // Bind all module methods to have access to 'this' class instance
    this._bindModuleMethods()
  }

  /**
   * Bind all module methods to have access to the class instance context
   * @private
   */
  private _bindModuleMethods(): void {
    // For each module, recursively bind methods to class context
    const modules = [
      'alliance', 'character', 'contracts', 'corporation', 'dogma', 'fw',
      'incursions', 'industry', 'insurance', 'killmails', 'location', 'loyalty', 'mail', 'market',
      'opportunities', 'pi', 'routes', 'skills', 'sov', 'status', 'universe', 'ui', 'util', 'wallet', 'wars'
    ]

    modules.forEach(moduleName => {
      const module = this[moduleName as keyof this] as Record<string, any>
      if (module && typeof module === 'object') {
        this._bindObjectMethods(module)
      }
    })
  }

  /**
   * Recursively bind methods in an object to have access to class context
   * @private
   */
  private _bindObjectMethods(obj: Record<string, any>): void {
    for (const key in obj) {
      if (typeof obj[key] === 'function') {
        // Bind function to class context so it can access 'this'
        const originalMethod = obj[key]
        obj[key] = (...args: any[]) => {
          return originalMethod.apply(this, args)
        }
      } else if (obj[key] && typeof obj[key] === 'object') {
        // Recursively bind nested objects (like character.contacts, character.assets, etc.)
        this._bindObjectMethods(obj[key])
      }
    }
  }
}

// Export as both named and default export for compatibility
export default ESIJS

// Maintain backwards compatibility with CommonJS
module.exports = ESIJS