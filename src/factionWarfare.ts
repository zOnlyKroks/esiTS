import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const factionWarfareModule = {
  leaderboards: {
    /**
     * Top 100 leaderboard of pilots for kills and victory points separated by total, last week and yesterday
     * @returns Character leaderboard of kills and victory points within faction warfare.
     */
    characters(): Promise<ESIResponse> {
      return request({
        subUrl: `fw/leaderboards/characters`,
      })
    },

    /**
     * Top 100 leaderboard of corporations for kills and victory points.
     * @returns Corporation leaderboard of kills and victory points within faction warfare.
     */
    corps(): Promise<ESIResponse> {
      return request({
        subUrl: `fw/leaderboards/corporations`,
      })
    },

    /**
     * Top 4 leaderboard of factions for kills and victory points separated by total, last week and yesterday.
     * @returns All-time leaderboard of kills and victory points within faction warfare.
     */
    leaderboard(): Promise<ESIResponse> {
      return request({
        subUrl: `fw/leaderboards`,
      })
    },
  },

  stats: {
    /**
     * Statistical overviews of factions involved in faction warfare
     * @returns Per faction breakdown of faction warfare statistics.
     */
    stats(): Promise<ESIResponse> {
      return request({
        subUrl: `fw/stats`,
      })
    },

    /**
     * Overview of a character involved in faction warfare.
     * @param characterID Character ID
     * @requires esi-characters.read_fw_stats.v1
     * @returns Statistical overview of a character involved in faction warfare.
     */
    characterStats(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'fw.stats.characterStats' requires a character ID!`,
      })
      return request({
        subUrl: `characters/${characterID}/fw/stats`,
        needsAuth: true,
      })
    },

    /**
     * Overview of a corporation involved in faction warfare.
     * @param corporationID Corporation ID
     * @requires esi-corporations.read_fw_stats.v1
     * @returns Statistics about a corporation involved in faction warfare.
     */
    corporationStats(corporationID: number): Promise<ESIResponse> {
      inputValidation({
        input: corporationID,
        type: 'number',
        message: `The function 'fw.stats.corporationStats' requires a corporation ID!`,
      })
      return request({
        subUrl: `corporations/${corporationID}/fw/stats`,
        needsAuth: true,
      })
    },
  },

  /**
   * An overview of the current ownership of faction warfare solar systems.
   * @returns Faction warfare systems data
   */
  systems(): Promise<ESIResponse> {
    return request({
      subUrl: `fw/systems`,
    })
  },

  /**
   * Data about which NPC factions are at war.
   * @returns Faction warfare wars data
   */
  wars(): Promise<ESIResponse> {
    return request({
      subUrl: `fw/wars`,
    })
  },
}

export default factionWarfareModule