import { request } from './util/util'
import { ESIResponse } from './types'

export const statusModule = {
  /**
   * EVE Server status.
   * @returns Promise resolving to server status information
   */
  status(): Promise<ESIResponse> {
    return request({
      subUrl: `status`,
    })
  },
}

export default statusModule