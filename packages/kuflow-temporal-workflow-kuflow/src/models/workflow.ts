/**
 * The MIT License
 * Copyright © 2021-present KuFlow S.L.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

export interface WorkflowRequest {
  /**
   * Unique identifier for a specific process.
   * This identifier is used to track and reference a process in the workflow system.
   */
  processId: string

  /**
   * The timestamp when the request was made.
   * This field is used to record the exact time the associated robot operation
   * or process item task was requested.
   */
  requestTime: string

  /**
   * The time zone associated with the request.
   * This allows timestamp values to be interpreted in the context of a specific geographical region
   * or offset from UTC.
   */
  requestTimeZone: string
}

export interface WorkflowResponse {
  message: string
}

export interface WorkflowUserActionRequest {
  /**
   * The unique identifier of a process.
   * This identifier is used to track, manage, and reference a specific process
   * within the workflow system.
   */
  processId: string

  /**
   * The type of user action definition associated with this user action request.
   * This variable indicates the specific action type that a user has initiated.
   */
  userActionDefinitionType:
    | 'DOWNLOADABLE'
    | 'START_RELATED_PROCESS'
    | 'START_WORKFLOW'
    | 'CREATE_TASK'
    | 'CREATE_PROCESS_ITEM_MESSAGE'
    | 'CREATE_PROCESS_ITEM_THREAD'

  /**
   * The code that defines a user action.
   * This code is used to identify and differentiate among various user actions
   * within a workflow system.
   */
  userActionDefinitionCode: string

  /**
   * The unique identifier for a user action.
   * This identifier is used to track and manage a specific user action
   * within the workflow system.
   */
  userActionId: string

  /**
   * The unique identifier of the principal (user or system)
   * who initiated the user action.
   * This field is used to associate the user action with the entity that requested it.
   */
  requestorPrincipalId: string

  /**
   * The timestamp when the request was made.
   * This field is used to record the exact time the associated robot operation
   * or process item task was requested.
   */
  requestTime: string

  /**
   * The time zone associated with the request.
   * This allows timestamp values to be interpreted in the context of a specific geographical region
   * or offset from UTC.
   */
  requestTimeZone: string
}

export interface WorkflowUserActionResponse {
  message: string
}

export interface WorkflowProcessItemTaskRobotRequest {
  /**
   * The unique identifier of a process.
   * This identifier is used to track and reference a process in the workflow system.
   */
  processId: string

  /**
   * The identifier of a specific process item within a workflow.
   * This ID is used to uniquely identify and reference a process item.
   */
  processItemId: string

  /**
   * The unique identifier of the robot associated with the workflow process item task.
   */
  robotId: string

  /**
   * The operation to be performed by the robot within the workflow process.
   * This value specifies the nature of the operation the robot is expected to execute.
   */
  robotOperation: string

  /**
   * The timestamp when the request was made.
   * This field is used to record the exact time the associated robot operation
   * or process item task was requested.
   */
  requestTime: string

  /**
   * The time zone associated with the request.
   * This allows timestamp values to be interpreted in the context of a specific geographical region
   * or offset from UTC.
   */
  requestTimeZone: string
}

export interface WorkflowProcessItemTaskRobotResponse {
  message: string
}
