import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const walletModule = {
  character: {
    /**
     * Get character wallet balance.
     * @param characterID Character ID
     * @requires esi-wallet.read_character_wallet.v1
     * @returns Returns a character's wallet balance
     */
    balance(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'wallet.character.balance' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/wallet/`,
        needsAuth: true,
      })
    },

    /**
     * Get character wallet journal.
     * @param characterID Character ID
     * @param page Which page of results to return. Defaults to 1
     * @requires esi-wallet.read_character_wallet.v1
     * @returns Retrieve the given character's wallet journal going 30 days back
     */
    journal(characterID: number, page: number = 1): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'wallet.character.journal' requires a character ID!`,
      })
      inputValidation({
        input: page,
        type: 'number',
        message: `The function 'wallet.character.journal' requires a page number!`,
      })

      return request({
        subUrl: `characters/${characterID}/wallet/journal/`,
        query: {
          page: page,
        },
        needsAuth: true,
      })
    },

    /**
     * Get character wallet transactions.
     * @param characterID Character ID
     * @param fromID Only show transactions happened before the one referenced by this id
     * @requires esi-wallet.read_character_wallet.v1
     * @returns Get wallet transactions of a character
     */
    transactions(characterID: number, fromID?: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'wallet.character.transactions' requires a character ID!`,
      })

      const query: Record<string, string | number | boolean | number[] | undefined> = {}
      if (fromID !== undefined) {
        inputValidation({
          input: fromID,
          type: 'number',
          message: `The function 'wallet.character.transactions' fromID must be a number!`,
        })
        query.from_id = fromID
      }

      const requestConfig: any = {
        subUrl: `characters/${characterID}/wallet/transactions/`,
        needsAuth: true,
      }

      if (Object.keys(query).length > 0) {
        requestConfig.query = query
      }

      return request(requestConfig)
    },
  },

  corporation: {
    /**
     * Get corporation wallets.
     * @param corporationID Corporation ID
     * @requires esi-wallet.read_corporation_wallets.v1
     * @requires one of the following EVE corporation role(s): Accountant, Junior_Accountant
     * @returns Get a corporation's wallets
     */
    wallets(corporationID: number): Promise<ESIResponse> {
      inputValidation({
        input: corporationID,
        type: 'number',
        message: `The function 'wallet.corporation.wallets' requires a corporation ID!`,
      })

      return request({
        subUrl: `corporations/${corporationID}/wallets/`,
        needsAuth: true,
      })
    },

    /**
     * Get corporation wallet journal.
     * @param corporationID Corporation ID
     * @param division Wallet key of the division to fetch journals from
     * @param page Which page of results to return. Defaults to 1
     * @requires esi-wallet.read_corporation_wallets.v1
     * @requires one of the following EVE corporation role(s): Accountant, Junior_Accountant
     * @returns Retrieve the given corporation's wallet journal for the given division going 30 days back
     */
    journal(corporationID: number, division: number, page: number = 1): Promise<ESIResponse> {
      inputValidation({
        input: corporationID,
        type: 'number',
        message: `The function 'wallet.corporation.journal' requires a corporation ID!`,
      })
      inputValidation({
        input: division,
        type: 'number',
        message: `The function 'wallet.corporation.journal' requires a division number!`,
      })
      inputValidation({
        input: page,
        type: 'number',
        message: `The function 'wallet.corporation.journal' requires a page number!`,
      })

      return request({
        subUrl: `corporations/${corporationID}/wallets/${division}/journal/`,
        query: {
          page: page,
        },
        needsAuth: true,
      })
    },

    /**
     * Get corporation wallet transactions.
     * @param corporationID Corporation ID
     * @param division Wallet key of the division to fetch transactions from
     * @param fromID Only show transactions happened before the one referenced by this id
     * @requires esi-wallet.read_corporation_wallets.v1
     * @requires one of the following EVE corporation role(s): Accountant, Junior_Accountant
     * @returns Get wallet transactions of a corporation
     */
    transactions(corporationID: number, division: number, fromID?: number): Promise<ESIResponse> {
      inputValidation({
        input: corporationID,
        type: 'number',
        message: `The function 'wallet.corporation.transactions' requires a corporation ID!`,
      })
      inputValidation({
        input: division,
        type: 'number',
        message: `The function 'wallet.corporation.transactions' requires a division number!`,
      })

      const query: Record<string, string | number | boolean | number[] | undefined> = {}
      if (fromID !== undefined) {
        inputValidation({
          input: fromID,
          type: 'number',
          message: `The function 'wallet.corporation.transactions' fromID must be a number!`,
        })
        query.from_id = fromID
      }

      const requestConfig: any = {
        subUrl: `corporations/${corporationID}/wallets/${division}/transactions/`,
        needsAuth: true,
      }

      if (Object.keys(query).length > 0) {
        requestConfig.query = query
      }

      return request(requestConfig)
    },
  },
}

export default walletModule