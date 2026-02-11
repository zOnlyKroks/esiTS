import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const contractsModule = {
  public: {
    /**
     * Lists bids on a public auction contract.
     * @param contractID The auction contract to get the bids of.
     * @param pageNumber The page of bids to get. Defaults to `1`.
     * @returns The bids on the auction.
     */
    bids(contractID: number, pageNumber: number = 1): Promise<ESIResponse> {
      inputValidation({
        input: contractID,
        type: 'number',
        message: `The function 'contracts.public.bids' requires a contract ID!`,
      })
      inputValidation({
        input: pageNumber,
        type: 'number',
        message: `The input pageNumber for 'contracts.public.bids' needs to be a number`,
      })

      return request({
        subUrl: `contracts/public/bids/${contractID}`,
        query: { page: pageNumber }
      })
    },

    /**
     * Returns a paginated list of all public contracts in the given region.
     * @param regionID The region to get the contracts from.
     * @param pageNumber The page of contracts to get. Defaults to `1`.
     * @returns A paginated list of all public contracts in the given region.
     */
    contracts(regionID: number, pageNumber: number = 1): Promise<ESIResponse> {
      inputValidation({
        input: regionID,
        type: 'number',
        message: `The function 'contracts.public.contracts' requires a region ID!`,
      })
      inputValidation({
        input: pageNumber,
        type: 'number',
        message: `The input pageNumber for 'contracts.public.contracts' needs to be a number!`,
      })

      return request({
        subUrl: `contracts/public/${regionID}`,
        query: { page: pageNumber },
      })
    },

    /**
     * Lists items of a public contract.
     * @param contractID The contract to get items from.
     * @param pageNumber The page of contracts to get. Defaults to `1`.
     * @returns A array of items.
     */
    items(contractID: number, pageNumber: number = 1): Promise<ESIResponse> {
      inputValidation({
        input: contractID,
        type: 'number',
        message: `The function 'contracts.public.items' requires a contract ID!`,
      })
      inputValidation({
        input: pageNumber,
        type: 'number',
        message: `The input pageNumber for 'contracts.public.items' needs to be a number!`,
      })

      return request({
        subUrl: `contracts/public/items/${contractID}`,
        query: { page: pageNumber },
      })
    },
  },
}

export default contractsModule