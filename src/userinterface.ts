import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

interface NewMailData {
  body: string
  recipients: number[]
  subject: string
  to_corp_or_alliance_id?: number
  to_mailing_list_id?: number
}

export const userinterfaceModule = {
  autopilot: {
    /**
     * Set Autopilot Waypoint.
     * @param destinationID The destination. Can be Station, Structure, or System.
     * @param addToBeginning Whether to add the destination to the beginning of the route. Defaults to false.
     * @param clearOtherWaypoints Whether to clear all other waypoints before adding the destination. Defaults to false.
     * @requires esi-ui.write_waypoint.v1
     */
    waypoint(
      destinationID: number,
      addToBeginning: boolean = false,
      clearOtherWaypoints: boolean = false
    ): Promise<ESIResponse> {
      inputValidation({
        input: destinationID,
        type: 'number',
        message: `The function 'ui.autopilot.waypoint' needs a destination ID!`,
      })
      inputValidation({
        input: addToBeginning,
        type: 'boolean',
        message: `The parameter "addToBeginning" in the function 'ui.autopilot.waypoint' must be a boolean!`,
      })
      inputValidation({
        input: clearOtherWaypoints,
        type: 'boolean',
        message: `The parameter "clearOtherWaypoints" in the function 'ui.autopilot.waypoint' must be a boolean!`,
      })

      return request({
        subUrl: `ui/autopilot/waypoint`,
        requestType: 'POST',
        query: {
          add_to_beginning: addToBeginning,
          clear_other_waypoints: clearOtherWaypoints,
          destination_id: destinationID,
        },
        needsAuth: true,
      })
    },
  },

  openWindow: {
    /**
     * Open Contract Window.
     * @param contractID The contract to open.
     * @requires esi-ui.open_window.v1
     */
    contract(contractID: number): Promise<ESIResponse> {
      inputValidation({
        input: contractID,
        type: 'number',
        message: `The function 'ui.openWindow.contract' requires a contract ID!`,
      })

      return request({
        subUrl: `ui/openwindow/contract`,
        requestType: 'POST',
        query: {
          contract_id: contractID,
        },
        needsAuth: true,
      })
    },

    /**
     * Open Information Window
     * @param targetID The target to get the information of. Can be a character, corporation or alliance.
     * @requires esi-ui.open_window.v1
     */
    information(targetID: number): Promise<ESIResponse> {
      inputValidation({
        input: targetID,
        type: 'number',
        message: `The function 'ui.openWindow.information' requires a target ID!`,
      })

      return request({
        subUrl: `ui/openwindow/information`,
        requestType: 'POST',
        query: {
          target_id: targetID,
        },
        needsAuth: true,
      })
    },

    /**
     * Open Market Details.
     * @param itemID The item type to open in market window.
     * @requires esi-ui.open_window.v1
     */
    marketDetails(itemID: number): Promise<ESIResponse> {
      inputValidation({
        input: itemID,
        type: 'number',
        message: `The function 'ui.openWindow.marketDetails' requires a item ID!`,
      })

      return request({
        subUrl: `ui/openwindow/marketdetails`,
        requestType: 'POST',
        query: {
          type_id: itemID,
        },
        needsAuth: true,
      })
    },

    /**
     * Open New Mail Window.
     * @param mail The details of mail to create.
     * @requires esi-ui.open_window.v1
     */
    newMail(mail: NewMailData): Promise<ESIResponse> {
      inputValidation({
        input: mail,
        type: 'object',
        message: `The function 'ui.openWindow.newMail' requires a mail object!`,
      })

      return request({
        subUrl: `ui/openwindow/newmail`,
        requestType: 'POST',
        body: mail,
        needsAuth: true,
      })
    },
  },
}

export default userinterfaceModule