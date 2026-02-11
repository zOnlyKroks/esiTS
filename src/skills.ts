import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const skillsModule = {
  /**
   * Get character skills.
   * @param characterID Character ID
   * @requires esi-skills.read_skills.v1
   * @returns List the configured skill queue of a character
   */
  skills(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'skills.skills' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/skills/`,
      needsAuth: true,
    })
  },

  /**
   * Get character skill queue.
   * @param characterID Character ID
   * @requires esi-skills.read_skillqueue.v1
   * @returns List the configured skill queue of a character
   */
  queue(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'skills.queue' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/skillqueue/`,
      needsAuth: true,
    })
  },

  /**
   * Get character attributes.
   * @param characterID Character ID
   * @requires esi-skills.read_skills.v1
   * @returns A list of the character's attributes
   */
  attributes(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'skills.attributes' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/attributes/`,
      needsAuth: true,
    })
  },
}

export default skillsModule