import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

export const opportunitiesModule = {
  /**
   * Return information of an opportunities group.
   * @param groupID Group ID
   * @returns Opportunity group information
   */
  groupInfo(groupID: number): Promise<ESIResponse> {
    inputValidation({
      input: groupID,
      type: 'number',
      message: `The function 'opportunities.groupInfo' requires a group ID!`,
    })

    return request({
      subUrl: `opportunities/groups/${groupID}`,
    })
  },

  /**
   * Return a list of opportunities groups.
   * @returns List of opportunity groups
   */
  groups(): Promise<ESIResponse> {
    return request({
      subUrl: `opportunities/groups`,
    })
  },

  /**
   * Return information of an opportunities task.
   * @param taskID Task ID
   * @returns Opportunity task information
   */
  taskInfo(taskID: number): Promise<ESIResponse> {
    inputValidation({
      input: taskID,
      type: 'number',
      message: `The function 'opportunities.taskInfo' requires a task ID!`,
    })

    return request({
      subUrl: `opportunities/tasks/${taskID}`,
    })
  },

  /**
   * Return a list of opportunities tasks.
   * @returns List of opportunity tasks
   */
  tasks(): Promise<ESIResponse> {
    return request({
      subUrl: `opportunities/tasks`,
    })
  },
}

export default opportunitiesModule