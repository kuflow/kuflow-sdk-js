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

export const KUFLOW_ENGINE_SIGNAL_PROCESS_ITEM = 'KuFlow_Engine_Signal_Process_Item'

export interface SignalProcessItemPayload {
  processItemDefinitionCode?: string
  dataStructureDataDefinitionCode?: string
}

export interface SignalProcessItem {
  /**
   * Represents the unique identifier for a SignalProcessItem.
   * This identifier is used to distinguish and refer to a specific signal process item in the workflow system.
   */
  id: string

  /**
   * Defines the type of the signal processing item.
   * This field specifies the category or nature of the item being processed
   * in the workflow system, such as tasks, messages, or threads.
   */
  type: 'TASK' | 'MESSAGE' | 'THREAD'

  /**
   * Represents the payload associated with a specific signal processing item.
   * This object contains information defining the specific item within a process
   * as well as its associated data structure.
   */
  payload: SignalProcessItemPayload

  /**
   * Represents the unique identifier of the principal (user or system)
   * who initiated the user action.
   * This field is used to associate the user action with the entity that requested it.
   */
  requestTime: string

  /**
   * The timestamp when the request was made.
   * This field is used to record the exact time the associated robot operation
   * or process item task was requested.
   */
  requestTimeZone: string
}

export interface SignalUserAction {
  /**
   * The code that defines a user action.
   * This code is used to identify and differentiate among various user actions
   * within a workflow system.
   */
  userActionDefinitionCode: string

  /**
   * Represents the unique identifier of the principal (user or system)
   * who initiated the user action.
   * This field is used to associate the user action with the entity that requested it.
   */
  requestTime: string

  /**
   * The timestamp when the request was made.
   * This field is used to record the exact time the associated robot operation
   * or process item task was requested.
   */
  requestTimeZone: string
}
