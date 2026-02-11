import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

type OrderType = 'all' | 'sell' | 'buy'

export const marketModule = {
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
        message: `The function 'market.groups.groupInfo' requires a group ID!`,
      })

      return request({
        subUrl: `markets/groups/${groupID}`,
      })
    },

    /**
     * Get a list of item groups.
     * @returns List of item groups
     */
    groups(): Promise<ESIResponse> {
      return request({
        subUrl: `markets/groups`,
      })
    },
  },

  /**
   * Return a list of historical market statistics for the specified type in a region.
   * @param regionID Region ID
   * @param typeID Type ID
   * @returns Historical market statistics
   */
  history(regionID: number, typeID: number): Promise<ESIResponse> {
    inputValidation({
      input: regionID,
      type: 'number',
      message: `The function 'market.history' requires a region ID!`,
    })
    inputValidation({
      input: typeID,
      type: 'number',
      message: `The function 'market.history' requires a type ID!`,
    })

    return request({
      subUrl: `markets/${regionID}/history`,
      query: {
        type_id: typeID,
      },
    })
  },

  /**
   * Return a list of orders in a region.
   * @param regionID Region ID
   * @param typeID Type ID (optional)
   * @param orderType Order type filter ('all', 'sell', or 'buy')
   * @param pageNumber Page number
   * @returns Market orders
   */
  orders(
    regionID: number,
    typeID?: number,
    orderType: OrderType = 'all',
    pageNumber: number = 1
  ): Promise<ESIResponse> {
    const orderTypeOptions: OrderType[] = ['all', 'sell', 'buy']

    inputValidation({
      input: regionID,
      type: 'number',
      message: `The function 'market.orders' requires a region ID!`,
    })
    inputValidation({
      input: pageNumber,
      type: 'number',
      message: `The input pageNumber for 'market.orders' requires a number!`,
    })
    inputValidation({
      input: orderType,
      type: 'string',
      options: orderTypeOptions,
      message: `The function 'market.orders' orderType input must be 'all', 'sell', or 'buy'!`,
    })
    inputValidation({
      input: typeID,
      type: 'number',
      optional: true,
      message: `The function 'market.orders' type ID must be a number!`,
    })

    return request({
      subUrl: `markets/${regionID}/orders`,
      query: {
        order_type: orderType,
        page: pageNumber,
        type_id: typeID,
      },
    })
  },

  /**
   * Return a list of prices.
   * @returns Market prices
   */
  prices(): Promise<ESIResponse> {
    return request({
      subUrl: `markets/prices`,
    })
  },

  /**
   * Return a list of type IDs that have active orders in the region, for efficient market indexing.
   * @param regionID Region ID
   * @param pageNumber Page number
   * @returns Active type IDs in the region
   */
  types(regionID: number, pageNumber: number = 1): Promise<ESIResponse> {
    inputValidation({
      input: regionID,
      type: 'number',
      message: `The function 'market.types' requires a region ID!`,
    })
    inputValidation({
      input: pageNumber,
      type: 'number',
      message: `The input pageNumber for 'market.types' needs to be a number`,
    })

    return request({
      subUrl: `markets/${regionID}/types`,
      query: {
        page: pageNumber,
      },
    })
  },
}

export default marketModule