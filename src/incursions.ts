import { request } from './util/util'
import { ESIResponse } from './types'

export const incursionsModule = {
  /**
   * Return a list of current incursions.
   * @returns Current incursions
   */
  incursions(): Promise<ESIResponse> {
    return request({
      subUrl: `incursions`,
    })
  },
}

export default incursionsModule