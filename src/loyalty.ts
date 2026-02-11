import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const loyaltyModule = {
  /**
   * Return a list of offers from a specific corporation's loyalty store.
   * @param corporationID Corporation ID
   * @returns Loyalty store offers
   */
  offers(corporationID: number): Promise<ESIResponse> {
    inputValidation({
      input: corporationID,
      type: 'number',
      message: `The function 'loyalty.offers' requires a corporation ID!`,
    })

    return request({
      subUrl: `loyalty/stores/${corporationID}/offers`,
    })
  },
}

export default loyaltyModule