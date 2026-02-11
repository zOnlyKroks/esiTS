import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const locationModule = {
  /**
   * Get character location.
   * @param characterID Character ID
   * @requires esi-location.read_location.v1
   * @returns Information about the characters current location. Returns the current solar system id, and also the current station or structure ID if applicable
   */
  location(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'location.location' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/location/`,
      needsAuth: true,
    })
  },

  /**
   * Get current ship.
   * @param characterID Character ID
   * @requires esi-location.read_ship_type.v1
   * @returns Get the current ship type, name and id
   */
  ship(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'location.ship' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/ship/`,
      needsAuth: true,
    })
  },

  /**
   * Get character online status.
   * @param characterID Character ID
   * @requires esi-location.read_online.v1
   * @returns Checks if the character is currently online
   */
  online(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'location.online' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/online/`,
      needsAuth: true,
    })
  },
}

export default locationModule