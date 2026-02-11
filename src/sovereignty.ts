import { request } from './util/util'
import { ESIResponse } from './types'

export const sovereigntyModule = {
  /**
   * Shows sovereignty data for campaigns.
   * @returns Sovereignty campaign data
   */
  campaigns(): Promise<ESIResponse> {
    return request({ subUrl: `sovereignty/campaigns` })
  },

  /**
   * Shows sovereignty information for solar systems.
   * @returns Sovereignty map data
   */
  map(): Promise<ESIResponse> {
    return request({ subUrl: `sovereignty/map` })
  },

  /**
   * Shows sovereignty data for structures.
   * @returns Sovereignty structure data
   */
  structures(): Promise<ESIResponse> {
    return request({ subUrl: `sovereignty/structures` })
  },
}

export default sovereigntyModule