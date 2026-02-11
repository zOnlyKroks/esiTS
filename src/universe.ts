import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const universeModule = {
  ancestries: {
    /**
     * Get all character ancestries.
     * @returns Character ancestries
     */
    ancestries(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/ancestries`,
      })
    },
  },

  belts: {
    /**
     * Get information on an asteroid belt.
     * @param beltID Asteroid belt ID
     * @returns Asteroid belt information
     */
    beltInfo(beltID: number): Promise<ESIResponse> {
      inputValidation({
        input: beltID,
        type: 'number',
        message: `The function 'universe.belts.beltInfo' requires a belt ID!`,
      })

      return request({
        subUrl: `universe/asteroid_belts/${beltID}`,
      })
    },
  },

  bloodlines: {
    /**
     * Get a list of bloodlines.
     * @returns Character bloodlines
     */
    bloodlines(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/bloodlines`,
      })
    },
  },

  bulk: {
    /**
     * Resolve a set of IDs to names and categories.
     * Supported ID's for resolving are: Characters, Corporations, Alliances, Stations, Solar Systems, Constellations, Regions, Types, Factions
     * @param IDs Array of IDs to resolve
     * @returns Names and categories for the provided IDs
     */
    idsToNames(IDs: number[]): Promise<ESIResponse> {
      inputValidation({
        input: IDs,
        type: 'object',
        message: `The function 'universe.bulk.idsToNames' requires IDs to be an array!`,
      })

      return request({
        subUrl: `universe/names`,
        requestType: 'POST',
        body: IDs,
      })
    },

    /**
     * Resolve a set of names to IDs in the following categories:
     * agents, alliances, characters, constellations, corporations factions, inventory_types, regions, stations, and systems.
     * Only exact matches will be returned. All names searched for are cached for 12 hours.
     * @param names Array of names to resolve
     * @returns IDs for the provided names
     */
    namesToIDs(names: string[]): Promise<ESIResponse> {
      inputValidation({
        input: names,
        type: 'object',
        message: `The function 'universe.bulk.namesToIDs' requires names to be an array!`,
      })

      return request({
        subUrl: `universe/ids`,
        requestType: 'POST',
        body: names,
      })
    },
  },

  categories: {
    /**
     * Get a list of item categories.
     * @returns Item categories
     */
    categories(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/categories`,
      })
    },

    /**
     * Get information on an item category.
     * @param categoryID Category ID
     * @returns Item category information
     */
    categoryInfo(categoryID: number): Promise<ESIResponse> {
      inputValidation({
        input: categoryID,
        type: 'number',
        message: `The function 'universe.categories.categoryInfo' requires a category ID!`,
      })

      return request({
        subUrl: `universe/categories/${categoryID}`,
      })
    },
  },

  constellations: {
    /**
     * Get information on a constellation.
     * @param constellationID Constellation ID
     * @returns Constellation information
     */
    constellationInfo(constellationID: number): Promise<ESIResponse> {
      inputValidation({
        input: constellationID,
        type: 'number',
        message: `The function 'universe.constellations.constellationInfo' requires a constellation ID!`,
      })

      return request({
        subUrl: `universe/constellations/${constellationID}`,
      })
    },

    /**
     * Get a list of constellations.
     * @returns List of constellations
     */
    constellations(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/constellations`,
      })
    },
  },

  factions: {
    /**
     * Get a list of factions.
     * @returns List of factions
     */
    factions(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/factions`,
      })
    },
  },

  graphics: {
    /**
     * Get information on a graphic.
     * @param graphicID Graphic ID
     * @returns Graphic information
     */
    graphicInfo(graphicID: number): Promise<ESIResponse> {
      inputValidation({
        input: graphicID,
        type: 'number',
        message: `The function 'universe.graphics.graphicInfo' requires a graphic ID!`,
      })

      return request({
        subUrl: `universe/graphics/${graphicID}`,
      })
    },

    /**
     * Get a list of graphics.
     * @returns List of graphics
     */
    graphics(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/graphics`,
      })
    },
  },

  groups: {
    /**
     * Get information on an item group.
     * @param groupID Group ID
     * @returns Item group information
     */
    groupInfo(groupID: number): Promise<ESIResponse> {
      inputValidation({
        input: groupID,
        type: 'number',
        message: `The function 'universe.groups.groupInfo' requires a group ID!`,
      })

      return request({
        subUrl: `universe/groups/${groupID}`,
      })
    },

    /**
     * Get a list of item groups.
     * @returns List of item groups
     */
    groups(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/groups`,
      })
    },
  },

  moons: {
    /**
     * Get information on a moon.
     * @param moonID Moon ID
     * @returns Moon information
     */
    moonInfo(moonID: number): Promise<ESIResponse> {
      inputValidation({
        input: moonID,
        type: 'number',
        message: `The function 'universe.moons.moonInfo' requires a moon ID!`,
      })

      return request({
        subUrl: `universe/moons/${moonID}`,
      })
    },
  },

  planets: {
    /**
     * Get information on a planet.
     * @param planetID Planet ID
     * @returns Planet information
     */
    planetInfo(planetID: number): Promise<ESIResponse> {
      inputValidation({
        input: planetID,
        type: 'number',
        message: `The function 'universe.planets.planetInfo' requires a planet ID!`,
      })

      return request({
        subUrl: `universe/planets/${planetID}`,
      })
    },
  },

  races: {
    /**
     * Get a list of character races.
     * @returns Character races
     */
    races(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/races`,
      })
    },
  },

  regions: {
    /**
     * Get information on a region.
     * @param regionID Region ID
     * @returns Region information
     */
    regionInfo(regionID: number): Promise<ESIResponse> {
      inputValidation({
        input: regionID,
        type: 'number',
        message: `The function 'universe.regions.regionInfo' requires a region ID!`,
      })

      return request({
        subUrl: `universe/regions/${regionID}`,
      })
    },

    /**
     * Get a list of regions.
     * @returns List of regions
     */
    regions(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/regions`,
      })
    },
  },

  stargates: {
    /**
     * Get information on a stargate.
     * @param stargateID Stargate ID
     * @returns Stargate information
     */
    stargateInfo(stargateID: number): Promise<ESIResponse> {
      inputValidation({
        input: stargateID,
        type: 'number',
        message: `The function 'universe.stargates.stargateInfo' requires a stargate ID!`,
      })

      return request({
        subUrl: `universe/stargates/${stargateID}`,
      })
    },
  },

  stars: {
    /**
     * Get information on a star.
     * @param starID Star ID
     * @returns Star information
     */
    starInfo(starID: number): Promise<ESIResponse> {
      inputValidation({
        input: starID,
        type: 'number',
        message: `The function 'universe.stars.starInfo' requires a star ID!`,
      })

      return request({
        subUrl: `universe/stars/${starID}`,
      })
    },
  },

  stations: {
    /**
     * Get information on a station.
     * @param stationID Station ID
     * @returns Station information
     */
    stationInfo(stationID: number): Promise<ESIResponse> {
      inputValidation({
        input: stationID,
        type: 'number',
        message: `The function 'universe.stations.stationInfo' requires a station ID!`,
      })

      return request({
        subUrl: `universe/stations/${stationID}`,
      })
    },
  },

  structures: {
    /**
     * List all public structures.
     * @returns List of public structures
     */
    structures(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/structures`,
      })
    },

    /**
     * Get structure information.
     * @param structureID Structure ID
     * @requires esi-universe.read_structures.v1
     * @returns Information on requested structure if you are on the ACL. Otherwise, returns "Forbidden" for all inputs.
     */
    structureInfo(structureID: number): Promise<ESIResponse> {
      inputValidation({
        input: structureID,
        type: 'number',
        message: `The function 'universe.structures.structureInfo' requires a structure ID!`,
      })

      return request({
        subUrl: `universe/structures/${structureID}`,
        needsAuth: true,
      })
    },
  },

  systems: {
    /**
     * Get information on a solar system.
     * @param systemID Solar system ID
     * @returns Solar system information
     */
    systemInfo(systemID: number): Promise<ESIResponse> {
      inputValidation({
        input: systemID,
        type: 'number',
        message: `The function 'universe.systems.systemInfo' requires a system ID!`,
      })

      return request({
        subUrl: `universe/systems/${systemID}`,
      })
    },

    /**
     * Get the number of jumps in solar systems within the last hour ending at the timestamp of the Last-Modified header,
     * excluding wormhole space. Only systems with jumps will be listed.
     * @returns Solar system jump statistics
     */
    systemJumps(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/system_jumps`,
      })
    },

    /**
     * Get the number of ship, pod and NPC kills per solar system within the last hour ending at the timestamp of the Last-Modified header,
     * excluding wormhole space. Only systems with kills will be listed.
     * @returns Solar system kill statistics
     */
    systemKills(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/system_kills`,
      })
    },

    /**
     * Get a list of solar systems.
     * @returns List of solar systems
     */
    systems(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/systems`,
      })
    },
  },

  types: {
    /**
     * Get information on a type.
     * @param typeID Type ID
     * @returns Type information
     */
    typeInfo(typeID: number): Promise<ESIResponse> {
      inputValidation({
        input: typeID,
        type: 'number',
        message: `The function 'universe.types.typeInfo' requires a type ID!`,
      })

      return request({
        subUrl: `universe/types/${typeID}`,
      })
    },

    /**
     * Get a list of type ids.
     * @returns List of type IDs
     */
    types(): Promise<ESIResponse> {
      return request({
        subUrl: `universe/types`,
      })
    },
  },
}

export default universeModule