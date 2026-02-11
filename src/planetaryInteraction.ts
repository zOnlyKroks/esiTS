import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const planetaryInteractionModule = {
  /**
   * Get information on a planetary factory schematic.
   * @param schematicID Schematic ID
   * @returns Planetary schematic information
   */
  schematicInfo(schematicID: number): Promise<ESIResponse> {
    inputValidation({
      input: schematicID,
      type: 'number',
      message: `The function 'planetaryInteraction.schematicInfo' requires a schematic ID!`,
    })

    return request({
      subUrl: `universe/schematics/${schematicID}`,
    })
  },
}

export default planetaryInteractionModule