import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const killmailsModule = {
  /**
   * Return a single killmail from its ID and hash.
   * @param killID Killmail ID
   * @param killHash Killmail hash
   * @returns Killmail information
   */
  killmailInfo(killID: number, killHash: string): Promise<ESIResponse> {
    inputValidation({
      input: killID,
      type: 'number',
      message: `The function 'killmails.killmailInfo' requires a kill ID!`,
    })
    inputValidation({
      input: killHash,
      type: 'string',
      message: `The function 'killmails.killmailInfo' requires a kill hash!`,
    })

    return request({
      subUrl: `killmails/${killID}/${killHash}`,
    })
  },
}

export default killmailsModule