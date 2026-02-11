import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const dogmaModule = {
  /**
   * Get information on a dogma attribute.
   * @param attribute Attribute ID
   * @returns Info on the attribute.
   */
  attrInfo(attribute: number): Promise<ESIResponse> {
    inputValidation({
      input: attribute,
      type: 'number',
      message: `The function 'dogma.attrInfo' requires an attribute!`,
    })

    return request({
      subUrl: `dogma/attributes/${attribute}`,
    })
  },

  /**
   * Get a list of dogma attribute ids.
   * @returns A array of all attributes.
   */
  attrs(): Promise<ESIResponse> {
    return request({
      subUrl: `dogma/attributes`,
    })
  },

  /**
   * Returns info about a dynamic item resulting from mutation with a mutaplasmid.
   * @param itemID Item ID
   * @param typeID Type ID
   * @returns Info on the mutation.
   */
  dynamicItemInfo(itemID: number, typeID: number): Promise<ESIResponse> {
    inputValidation({
      input: itemID,
      type: 'number',
      message: `The function 'dogma.dynamicItemInfo' requires an item ID!`,
    })
    inputValidation({
      input: typeID,
      type: 'number',
      message: `The function 'dogma.dynamicItemInfo' requires a type ID!`,
    })

    return request({
      subUrl: `dogma/dynamic/items/${typeID}/${itemID}`,
    })
  },

  /**
   * Get information on a dogma effect.
   * @param effect Effect ID
   * @returns Info on the effect.
   */
  effectInfo(effect: number): Promise<ESIResponse> {
    inputValidation({
      input: effect,
      type: 'number',
      message: `The function 'dogma.effectInfo' requires a effect ID!`,
    })

    return request({
      subUrl: `dogma/effects/${effect}`,
    })
  },

  /**
   * Get a list of dogma effect ids.
   * @returns A array of dogma effects.
   */
  effects(): Promise<ESIResponse> {
    return request({
      subUrl: `dogma/effects`,
    })
  },
}

export default dogmaModule