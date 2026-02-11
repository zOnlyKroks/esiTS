import path from 'path'

/**
 * @private
 * Configuration constants for esiJS
 */
export const localConfig = path.join(__dirname, `../../esi.json`)
export const projectConfig = path.join(__dirname, '../../../esi.json')
export const projectPath = path.join(__dirname, `../../../../`)
export const routes = ['latest', 'v1', 'legacy', 'dev'] as const
export const server = 'esi.evetech.net'

// Type for valid ESI routes
export type ESIRoute = typeof routes[number]