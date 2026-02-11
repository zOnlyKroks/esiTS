import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

interface MailRecipient {
  recipient_id: number
  recipient_type: 'alliance' | 'character' | 'corporation' | 'mailing_list'
}

interface NewMail {
  approved_cost?: number
  body: string
  recipients: MailRecipient[]
  subject: string
}

export const mailModule = {
  /**
   * Get character mail headers.
   * @param characterID Character ID
   * @param labels Fetch only mails that match one or more of the given labels
   * @param lastMailID List only mail with an ID lower than the given ID, if present
   * @requires esi-mail.read_mail.v1
   * @returns Return the 50 most recent mail headers belonging to the character that match the query criteria. Queries can be filtered by label, and last_mail_id can be used to paginate backwards
   */
  headers(characterID: number, labels?: number[], lastMailID?: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'mail.headers' requires a character ID!`,
    })

    const query: Record<string, string | number | boolean | number[] | undefined> = {}
    if (labels !== undefined) {
      query.labels = labels
    }
    if (lastMailID !== undefined) {
      inputValidation({
        input: lastMailID,
        type: 'number',
        message: `The function 'mail.headers' lastMailID must be a number!`,
      })
      query.last_mail_id = lastMailID
    }

    const requestConfig: any = {
      subUrl: `characters/${characterID}/mail/`,
      needsAuth: true,
    }

    if (Object.keys(query).length > 0) {
      requestConfig.query = query
    }

    return request(requestConfig)
  },

  /**
   * Send a new mail.
   * @param characterID Character ID
   * @param mail Mail to send
   * @requires esi-mail.send_mail.v1
   * @returns Create and send a new mail
   */
  send(characterID: number, mail: NewMail): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'mail.send' requires a character ID!`,
    })
    inputValidation({
      input: mail,
      type: 'object',
      message: `The function 'mail.send' requires a mail object!`,
    })

    return request({
      subUrl: `characters/${characterID}/mail/`,
      requestType: 'POST',
      body: mail,
      needsAuth: true,
    })
  },

  /**
   * Delete a mail.
   * @param characterID Character ID
   * @param mailID An EVE mail ID
   * @requires esi-mail.organize_mail.v1
   * @returns Delete a mail
   */
  deleteMail(characterID: number, mailID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'mail.deleteMail' requires a character ID!`,
    })
    inputValidation({
      input: mailID,
      type: 'number',
      message: `The function 'mail.deleteMail' requires a mail ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/mail/${mailID}/`,
      requestType: 'DELETE',
      needsAuth: true,
    })
  },

  /**
   * Get mail details.
   * @param characterID Character ID
   * @param mailID An EVE mail ID
   * @requires esi-mail.read_mail.v1
   * @returns Return the contents of an EVE mail
   */
  mail(characterID: number, mailID: number): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'mail.mail' requires a character ID!`,
    })
    inputValidation({
      input: mailID,
      type: 'number',
      message: `The function 'mail.mail' requires a mail ID!`,
    })

    return request({
      subUrl: `characters/${characterID}/mail/${mailID}/`,
      needsAuth: true,
    })
  },

  /**
   * Update mail metadata.
   * @param characterID Character ID
   * @param mailID An EVE mail ID
   * @param metadata Mail metadata
   * @requires esi-mail.organize_mail.v1
   * @returns Update metadata about a mail
   */
  updateMetadata(characterID: number, mailID: number, metadata: { labels?: number[]; read?: boolean }): Promise<ESIResponse> {
    inputValidation({
      input: characterID,
      type: 'number',
      message: `The function 'mail.updateMetadata' requires a character ID!`,
    })
    inputValidation({
      input: mailID,
      type: 'number',
      message: `The function 'mail.updateMetadata' requires a mail ID!`,
    })
    inputValidation({
      input: metadata,
      type: 'object',
      message: `The function 'mail.updateMetadata' requires a metadata object!`,
    })

    return request({
      subUrl: `characters/${characterID}/mail/${mailID}/`,
      requestType: 'PUT',
      body: metadata,
      needsAuth: true,
    })
  },

  labels: {
    /**
     * Get mail labels and unread counts.
     * @param characterID Character ID
     * @requires esi-mail.read_mail.v1
     * @returns Return a list of the users mail labels, unread counts for each label and a total unread count
     */
    labels(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'mail.labels.labels' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/mail/labels/`,
        needsAuth: true,
      })
    },

    /**
     * Create a mail label.
     * @param characterID Character ID
     * @param label Label to create
     * @requires esi-mail.organize_mail.v1
     * @returns Create a mail label
     */
    createLabel(characterID: number, label: { color?: string; name: string }): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'mail.labels.createLabel' requires a character ID!`,
      })
      inputValidation({
        input: label,
        type: 'object',
        message: `The function 'mail.labels.createLabel' requires a label object!`,
      })

      return request({
        subUrl: `characters/${characterID}/mail/labels/`,
        requestType: 'POST',
        body: label,
        needsAuth: true,
      })
    },

    /**
     * Delete a mail label.
     * @param characterID Character ID
     * @param labelID An EVE label id
     * @requires esi-mail.organize_mail.v1
     * @returns Delete a mail label
     */
    deleteLabel(characterID: number, labelID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'mail.labels.deleteLabel' requires a character ID!`,
      })
      inputValidation({
        input: labelID,
        type: 'number',
        message: `The function 'mail.labels.deleteLabel' requires a label ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/mail/labels/${labelID}/`,
        requestType: 'DELETE',
        needsAuth: true,
      })
    },
  },

  lists: {
    /**
     * Get mailing list subscriptions.
     * @param characterID Character ID
     * @requires esi-mail.read_mail.v1
     * @returns Return all mailing lists that the character is subscribed to
     */
    lists(characterID: number): Promise<ESIResponse> {
      inputValidation({
        input: characterID,
        type: 'number',
        message: `The function 'mail.lists.lists' requires a character ID!`,
      })

      return request({
        subUrl: `characters/${characterID}/mail/lists/`,
        needsAuth: true,
      })
    },
  },
}

export default mailModule