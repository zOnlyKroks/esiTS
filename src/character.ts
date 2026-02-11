import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const characterModule = {
  /**
   * Bulk lookup of character IDs to receive respective corporation, alliance, and faction IDs.
   * All characters must exist, or none will be returned.
   * @param characterIdArray The array of character IDs to get info from.
   * @returns Corporation, alliance, and faction IDs for each character ID.
   */
  affiliation(characterIdArray: number[]): Promise<ESIResponse> {
    inputValidation({
      input: characterIdArray,
      type: 'object',
      message: `The function 'character.affiliation' requires an array of character IDs!`,
    })

    return request({
      subUrl: 'characters/affiliation',
      requestType: 'POST',
      body: characterIdArray,
    })
  },

  /**
   * Get a list of all the corporations a character has been a member of.
   * @param characterID The character to get the history of.
   * @returns The character's history.
   */
  corpHistory(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.corpHistory' needs a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/corporationhistory`,
    })
  },

  /**
   * Get portrait urls for a character.
   * @param characterID The character to get the portrait of.
   * @returns Links to the different sizes of the character's portrait.
   */
  portrait(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.portrait' needs a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/portrait`,
    })
  },

  /**
   * Get public information about a character.
   * @param characterID The character to get the public info of.
   * @returns Public info on a character.
   */
  info(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.info' needs a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}`,
    })
  },

  /**
   * Gets agents research.
   * @param characterID Character ID
   * @requires esi-characters.read_agents_research.v1
   * @returns A list of agents research information for a character. The formula for finding the current research points with an agent is: currentPoints = remainderPoints + pointsPerDay * days(currentTime - researchStartDate)
   */
  agentsResearch(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.agentsResearch' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/agents_research`,
      needsAuth: true,
    })
  },

  /**
   * Get blueprints.
   * @param characterID Character ID
   * @requires esi-characters.read_blueprints.v1
   * @returns A list of blueprints the character owns.
   */
  blueprints(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.blueprints' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/blueprints`,
      needsAuth: true,
    })
  },

  /**
   * Calculate a CSPA (CONCORD Spam Prevention Act) cost.
   * @param characterID Character ID
   * @param characters The target characters to calculate the charge for.
   * @requires esi-characters.read_contacts.v1
   * @returns A CSPA charge cost.
   */
  cspa(characterID: number, characters: number[] = []): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.cspa' requires a character ID!`,
    })
    inputValidation({
      input: characters,
      type: 'object',
      message: `The function 'character.cspa' requires a array of character IDs!`,
    })

    return request({
      subUrl: `characters/${characterID}/cspa`,
      requestType: 'POST',
      body: {
        characters,
      },
      needsAuth: true,
    })
  },

  /**
   * Get jump fatigue.
   * @param characterID Character ID
   * @requires esi-characters.read_fatigue.v1
   * @returns A character's jump activation and fatigue information.
   */
  fatigue(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.fatigue' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/fatigue`,
      needsAuth: true,
    })
  },

  /**
   * Get medals.
   * @param characterID Character ID
   * @requires esi-characters.read_medals.v1
   * @returns A list of medals the character has.
   */
  medals(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.medals' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/medals`,
      needsAuth: true,
    })
  },

  /**
   * Get character corporation roles.
   * @param characterID Character ID
   * @requires esi-characters.read_corporation_roles.v1
   * @returns A character's corporation roles.
   */
  roles(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.roles' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/roles`,
      needsAuth: true,
    })
  },

  /**
   * Get standings.
   * @param characterID Character ID
   * @requires esi-characters.read_standings.v1
   * @returns Character standings from agents, NPC corporations, and factions.
   */
  standings(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.standings' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/standings`,
      needsAuth: true,
    })
  },

  /**
   * Yearly aggregate stats.
   * @param characterID Character ID
   * @requires esi-characterstats.read.v1
   * @returns Aggregate yearly stats for a character.
   */
  stats(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.stats' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/stats`,
      needsAuth: true,
    })
  },

  /**
   * Get character corporation titles.
   * @param characterID Character ID
   * @requires esi-characters.read_titles.v1
   * @returns A character's titles.
   */
  titles(characterID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'character.titles' requires a character ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/titles`,
      needsAuth: true,
    })
  },

  assets: {
    /**
     * Get character assets.
     * @param characterID Character ID
     * @requires esi-assets.read_assets.v1
     * @returns A list of the characters assets.
     */
    assets(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.assets.assets' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/assets`,
        needsAuth: true,
      })
    },

    /**
     * Get character asset locations.
     * @param characterID Character ID
     * @param itemIDs Array of item IDs
     * @requires esi-assets.read_assets.v1
     * @returns Locations for a set of item ids, which you can get from character assets endpoint.
     */
    locations(characterID: number, itemIDs: number[] = []): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.assets.locations' requires a character ID!`,
      })
      inputValidation({
        input: itemIDs,
        type: 'object',
        message: `The function 'character.assets.locations' requires a array of item IDs!`,
      })

      return request({
        subUrl: `characters/${characterID}/assets/locations`,
        requestType: 'POST',
        body: {
          item_ids: itemIDs,
        },
        needsAuth: true,
      })
    },

    /**
     * Get character asset names.
     * @param characterID Character ID
     * @param itemIDs Array of item IDs
     * @requires esi-assets.read_assets.v1
     * @returns Names for a set of item ids, which you can get from character assets endpoint.
     */
    names(characterID: number, itemIDs: number[]): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.assets.names' requires a character ID!`,
      })
      inputValidation({
        input: itemIDs,
        type: 'object',
        message: `The function 'character.assets.names' requires a array of item IDs!`,
      })

      return request({
        subUrl: `characters/${characterID}/assets/names`,
        requestType: 'POST',
        query: {
          item_ids: itemIDs,
        },
        needsAuth: true,
      })
    },
  },

  bookmarks: {
    /**
     * List bookmarks
     * @param characterID Character ID
     * @requires esi-bookmarks.read_character_bookmarks.v1
     * @returns A list of your character's personal bookmarks.
     */
    bookmarks(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.bookmarks.bookmarks' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/bookmarks`,
        needsAuth: true,
      })
    },

    /**
     * List bookmark folders
     * @param characterID Character ID
     * @requires esi-bookmarks.read_character_bookmarks.v1
     * @returns A list of your character's personal bookmark folders.
     */
    folders(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.bookmarks.folders' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/bookmarks/folders`,
        needsAuth: true,
      })
    },
  },

  calendar: {
    /**
     * List calendar event summaries.
     * @param characterID Character ID
     * @param fromEvent OPTIONAL - The event ID to start retrieving events from.
     * @requires esi-calendar.read_calendar_events.v1
     * @returns Get 50 event summaries from the calendar.
     */
    calendar(characterID: number, fromEvent?: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.calendar.calendar' requires a character ID!`,
      })
      inputValidation({
        input: fromEvent,
        type: 'number',
        message: `The parameter 'fromEvent' in the function 'character.calendar.calendar' must be a valid event ID!`,
        optional: true,
      })

      return request({
        subUrl: `characters/${characterID}/calendar`,
        query: {
          from_event: fromEvent,
        },
        needsAuth: true,
      })
    },

    /**
     * Get a event.
     * @param characterID Character ID
     * @param eventID Event ID
     * @requires esi-calendar.read_calendar_events.v1
     * @returns Get all the information for a specific event
     */
    getEvent(characterID: number, eventID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.calendar.getEvent' requires a character ID!`,
      })
      inputValidation({
        input: eventID,
        type: 'number',
        message: `The function 'character.calendar.getEvent' requires a event ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/calendar/${eventID}`,
        needsAuth: true,
      })
    },

    /**
     * Respond to a event.
     * @param characterID Character ID
     * @param eventID Event ID
     * @requires esi-calendar.respond_calendar_events.v1
     * @returns Set your response status to a event.
     */
    respond(characterID: number, eventID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.calendar.respond' requires a character ID!`,
      })
      inputValidation({
        input: eventID,
        type: 'number',
        message: `The function 'character.calendar.respond' requires a event ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/calendar/${eventID}`,
        requestType: 'POST',
        needsAuth: true,
      })
    },

    /**
     * Get event attendees.
     * @param characterID Character ID
     * @param eventID Event ID
     * @requires esi-calendar.respond_calendar_events.v1
     * @returns Get all invited attendees for a given event
     */
    getAttendees(characterID: number, eventID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.calendar.getAttendees' requires a character ID!`,
      })
      inputValidation({
        input: eventID,
        type: 'number',
        message: `The function 'character.calendar.getAttendees' requires a event ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/calendar/${eventID}/attendees`,
        needsAuth: true,
      })
    },
  },

  clones: {
    /**
     * Get clones.
     * @param characterID Character ID
     * @requires esi-clones.read_clones.v1
     * @returns A list of the character's clones.
     */
    clones(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.clones.clones' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/clones`,
        needsAuth: true,
      })
    },

    /**
     * Get active implants.
     * @param characterID Character ID
     * @requires esi-clones.read_implants.v1
     * @returns Implants on the active clone of a character.
     */
    implants(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.clones.implants' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/implants`,
        needsAuth: true,
      })
    },
  },

  contacts: {
    /**
     * Get contacts
     * @param characterID Character ID
     * @requires esi-characters.read_contacts.v1
     * @returns Character contacts
     */
    contacts(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.contacts.contacts' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/contacts`,
        needsAuth: true,
      })
    },

    /**
     * Bulk add contacts with same settings
     * @param characterID Character ID
     * @param contacts Array of contact IDs
     * @requires esi-characters.write_contacts.v1
     * @returns Add contacts result
     */
    addContacts(characterID: number, contacts: number[]): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.contacts.addContacts' requires a character ID!`,
      })
      inputValidation({
        input: contacts,
        type: 'object',
        message: `The function 'character.contacts.addContacts' requires a array of one or more contact IDs!`,
      })

      return request({
        subUrl: `characters/${characterID}/contacts`,
        needsAuth: true,
        requestType: 'POST',
      })
    },

    /**
     * Bulk delete contacts
     * @param characterID Character ID
     * @param contacts Array of contact IDs
     * @requires esi-characters.write_contacts.v1
     * @returns Delete contacts result
     */
    deleteContacts(characterID: number, contacts: number[]): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.contacts.deleteContacts' requires a character ID!`,
      })
      inputValidation({
        input: contacts,
        type: 'object',
        message: `The function 'character.contacts.deleteContacts' requires a array of one or more contact IDs!`,
      })

      return request({
        subUrl: `characters/${characterID}/contacts`,
        needsAuth: true,
        requestType: 'DELETE',
      })
    },

    /**
     * Bulk edit contacts with same settings
     * @param characterID Character ID
     * @param contacts Array of contact IDs
     * @requires esi-characters.write_contacts.v1
     * @returns Edit contacts result
     */
    editContacts(characterID: number, contacts: number[]): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.contacts.editContacts' requires a character ID!`,
      })
      inputValidation({
        input: contacts,
        type: 'object',
        message: `The function 'character.contacts.editContacts' requires a array of one or more contact IDs!`,
      })

      return request({
        subUrl: `characters/${characterID}/contacts`,
        needsAuth: true,
        requestType: 'PUT',
      })
    },
  },

  contracts: {
    /**
     * Get contracts
     * @param characterID Character ID
     * @requires esi-contracts.read_character_contracts.v1
     * @returns contracts available to a character, only if the character is issuer, acceptor or assignee.
     */
    contracts(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.contracts.contracts' requires a character ID!`,
      })

      return request({
        subUrl: `/characters/${characterID}/contracts/`,
        needsAuth: true,
      })
    },

    /**
     * Get contract bids
     * @param characterID Character ID
     * @param contractID Contract ID
     * @requires esi-contracts.read_character_contracts.v1
     * @returns bids on a particular auction contract.
     */
    bids(characterID: number, contractID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.contracts.bids' requires a character ID!`,
      })
      inputValidation({
        input: contractID,
        type: 'number',
        message: `The function 'character.contracts.bids' requires a contract ID!`,
      })

      return request({
        subUrl: `/characters/${characterID}/contracts/${contractID}/bids`,
        needsAuth: true,
      })
    },

    /**
     * Get contract items
     * @param characterID Character ID
     * @param contractID Contract ID
     * @requires esi-contracts.read_character_contracts.v1
     * @returns items of a particular contract.
     */
    items(characterID: number, contractID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.contracts.items' requires a character ID!`,
      })
      inputValidation({
        input: contractID,
        type: 'number',
        message: `The function 'character.contracts.items' requires a contract ID!`,
      })

      return request({
        subUrl: `/characters/${characterID}/contracts/${contractID}/items`,
        needsAuth: true,
      })
    },
  },

  industry: {
    /**
     * List character industry jobs.
     * @param characterID Character ID
     * @requires esi-industry.read_character_jobs.v1
     * @returns Character industry jobs
     */
    jobs(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.industry.jobs' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/industry/jobs`,
        needsAuth: true,
      })
    },

    /**
     * Character mining ledger.
     * @param characterID Character ID
     * @param page Page number
     * @requires esi-industry.read_character_mining.v1
     * @returns Paginated record of all mining done by a character for the past 30 days
     */
    ledger(characterID: number, page: number = 1): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'character.industry.ledger' requires a character ID!`,
      })
      inputValidation({
        input: page,
        type: 'number',
        message: `The function 'character.industry.ledger' page must be a number!`,
      })

      return request({
        subUrl: `characters/${characterID}/mining`,
        needsAuth: true,
      })
    },
  },

  // Additional nested modules would go here (notifications, killmails, mail, market, opportunities, pi, skills, wallet, location)
  // This is a condensed version for brevity - the full implementation would include all endpoints
}

export default characterModule