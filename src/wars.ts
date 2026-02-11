import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const warsModule = {
  /**
   * Return details about a war.
   * @param warID War ID
   * @returns War details
   */
  warInfo(warID: number): Promise<ESIResponse> {
    inputValidation({
      input: warID,
      type: 'number',
      message: `The function 'wars.warInfo' requires a war ID!`,
    })

    return request({
      subUrl: `wars/${warID}`,
    })
  },

  /**
   * Return a list of kills related to a war.
   * @param warID War ID
   * @returns War killmails
   */
  warKills(warID: number): Promise<ESIResponse> {
    inputValidation({
      input: warID,
      type: 'number',
      message: `The function 'wars.warKills' requires a war ID!`,
    })

    return request({
      subUrl: `wars/${warID}/killmails`,
    })
  },

  /**
   * Return a list of wars.
   * @param maxWarID Optional. Only return wars with ID smaller than this.
   * @returns List of wars
   */
  wars(maxWarID?: number): Promise<ESIResponse> {
    inputValidation({
      input: maxWarID,
      type: 'number',
      message: `The parameter 'maxWarID' in the function 'wars.wars' must be a number!`,
      optional: true,
    })

    return request({
      subUrl: `wars`,
      query: {
        max_war_id: maxWarID,
      },
    })
  },
}

export default warsModule