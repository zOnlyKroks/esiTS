import { request } from './util/util'
import { ESIResponse } from './types'

export const insuranceModule = {
  /**
   * Return available insurance levels for all ship types.
   * @returns Available insurance levels
   */
  prices(): Promise<ESIResponse> {
    return request({
      subUrl: `insurance/prices`,
    })
  },
}

export default insuranceModule