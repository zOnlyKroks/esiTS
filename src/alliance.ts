import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const allianceModule = {
  /**
   * List all active player alliances.
   * @returns A array of all active player alliances.
   */
  alliances(): Promise<ESIResponse> {
    return request({
      subUrl: 'alliances',
    })
  },

  /**
   * Get all current member corporations of an alliance.
   * @param allianceID The alliance ID to get the alliances from.
   * @returns The corporations in the alliance.
   */
  corps(allianceID: number): Promise<ESIResponse> {
    inputValidation({
      input: allianceID,
      type: 'number',
      message: `The function 'alliance.corps' requires an alliance ID!`,
    })

    return request({
      subUrl: `alliances/${allianceID}/corporations`,
    })
  },

  /**
   * Get the icon urls for a alliance.
   * @param allianceID The alliance ID to get the icon of.
   * @returns Links to the different sizes of the alliance icon.
   */
  icon(allianceID: number): Promise<ESIResponse> {
    inputValidation({
      input: allianceID,
      type: 'number',
      message: `The function 'alliances.icon' requires an alliance ID!`,
    })

    return request({
      subUrl: `alliances/${allianceID}/icons`,
    })
  },

  /**
   * Get public information about an alliance.
   * @param allianceID The alliance ID to get info from.
   * @returns Public info on the alliance.
   */
  info(allianceID: number): Promise<ESIResponse> {
    inputValidation({
      input: allianceID,
      type: 'number',
      message: `The function 'alliances.info' requires an alliance ID!`,
    })

    return request({
      subUrl: `alliances/${allianceID}`,
    })
  },

  contacts: {
    /**
     * Get alliance contacts.
     * @param allianceID Alliance ID
     * @requires esi-alliances.read_contacts.v1
     * @returns Alliance contacts
     */
    contacts(allianceID: number): Promise<ESIResponse> {
      inputValidation({
        input: allianceID,
        type: 'number',
        message: `The function 'alliance.contacts.contacts' requires a alliance ID!`,
      })

      return request({
        subUrl: `alliances/${allianceID}/contacts`,
        needsAuth: true,
      })
    },

    /**
     * Get alliance contact labels
     * @param allianceID Alliance ID
     * @requires esi-alliances.read_contacts.v1
     * @returns Alliance contact labels
     */
    labels(allianceID: number): Promise<ESIResponse> {
      inputValidation({
        input: allianceID,
        type: 'number',
        message: `The function 'alliance.contacts.labels' requires a alliance ID!`,
      })

      return request({
        subUrl: `alliances/${allianceID}/contacts/labels`,
        needsAuth: true,
      })
    },
  },
}

export default allianceModule