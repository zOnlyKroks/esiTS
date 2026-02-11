import { request } from './util/util'
import { ESIResponse } from './types'

export const industryModule = {
  /**
   * Return a list of industry facilities.
   * @returns Industry facilities
   */
  facilities(): Promise<ESIResponse> {
    return request({
      subUrl: `industry/facilities`,
    })
  },

  /**
   * Return cost indices for solar systems.
   * @returns Industry cost indices
   */
  systems(): Promise<ESIResponse> {
    return request({
      subUrl: `industry/systems`,
    })
  },
}

export default industryModule