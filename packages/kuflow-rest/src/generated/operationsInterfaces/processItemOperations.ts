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

import type {
  JsonPatchOperation,
  ProcessItemAiAssistanceGenerateParams,
  ProcessItemAppendProcessItemTaskLogOptionalParams,
  ProcessItemAppendProcessItemTaskLogResponse,
  ProcessItemAssignProcessItemTaskOptionalParams,
  ProcessItemAssignProcessItemTaskResponse,
  ProcessItemClaimProcessItemTaskOptionalParams,
  ProcessItemClaimProcessItemTaskResponse,
  ProcessItemCompleteProcessItemTaskOptionalParams,
  ProcessItemCompleteProcessItemTaskResponse,
  ProcessItemCreateParams,
  ProcessItemCreateProcessItemOptionalParams,
  ProcessItemCreateProcessItemResponse,
  ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentOptionalParams,
  ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentResponse,
  ProcessItemFindProcessItemsOptionalParams,
  ProcessItemFindProcessItemsResponse,
  ProcessItemGenerateProcessItemAiAssistanceOptionalParams,
  ProcessItemGenerateProcessItemAiAssistanceResponse,
  ProcessItemPatchProcessItemTaskDataOptionalParams,
  ProcessItemPatchProcessItemTaskDataResponse,
  ProcessItemRetrieveProcessItemAiAssistanceOptionalParams,
  ProcessItemRetrieveProcessItemAiAssistanceResponse,
  ProcessItemRetrieveProcessItemOptionalParams,
  ProcessItemRetrieveProcessItemResponse,
  ProcessItemTaskAppendLogParams,
  ProcessItemTaskAssignParams,
  ProcessItemTaskContextDataUpdateParams,
  ProcessItemTaskDataUpdateParams,
  ProcessItemUpdateProcessItemTaskContextDataOptionalParams,
  ProcessItemUpdateProcessItemTaskContextDataResponse,
  ProcessItemUpdateProcessItemTaskDataOptionalParams,
  ProcessItemUpdateProcessItemTaskDataResponse,
} from '../models'

/** Interface representing a ProcessItemOperations. */
export interface ProcessItemOperations {
  /**
   * List all Process Items that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt, claimedAt, completedAt, cancelledAt
   *
   * @param options The options parameters.
   */
  findProcessItems: (
    options?: ProcessItemFindProcessItemsOptionalParams,
  ) => Promise<ProcessItemFindProcessItemsResponse>
  /**
   * Create a Process Item and optionally fill its value.
   *
   * To create a `TASK` or a `MESSAGE` inside a thread, set `processItemThreadId` to the id of a Process
   * Item of
   * type `THREAD` that belongs to the same Process.
   *
   * If you want to add document type elements, you can pass a reference to an existing document type
   * element
   * indicating its 'uri'. This will copy that document into the element. In case you want to add a new
   * document,
   * please use the corresponding API method.
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param processItemCreateParams Process Item to be created
   * @param options The options parameters.
   */
  createProcessItem: (
    processItemCreateParams: ProcessItemCreateParams,
    options?: ProcessItemCreateProcessItemOptionalParams,
  ) => Promise<ProcessItemCreateProcessItemResponse>
  /**
   * Allow to get a process item by ID. A deleted Process Item (the ones of a deleted Process) is
   * returned too,
   * with its `deletedAt` and `deletedBy` fields set.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  retrieveProcessItem: (
    id: string,
    options?: ProcessItemRetrieveProcessItemOptionalParams,
  ) => Promise<ProcessItemRetrieveProcessItemResponse>
  /**
   * Return the status of the latest AI assistance run for the given process item.
   *
   * Poll this endpoint after triggering `generateProcessItemAiAssistance` to determine when
   * the run has finished. Returns 404 when no run has ever been triggered for the process item.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  retrieveProcessItemAiAssistance: (
    id: string,
    options?: ProcessItemRetrieveProcessItemAiAssistanceOptionalParams,
  ) => Promise<ProcessItemRetrieveProcessItemAiAssistanceResponse>
  /**
   * Trigger an asynchronous AI assistance run for a process item and return its current state,
   * identified
   * by a client-supplied `requestId` (UUID). The `requestId` makes the call idempotent and lets a
   * client launch successive AI assistance attempts on the same process item — one at a time.
   *
   * Behavior given the latest persisted run (if any) for the process item:
   *
   * - No prior run → schedules a new run and returns the initial PENDING state (202).
   * - The stored `requestId` matches the incoming one → returns the current state of that run
   *   without scheduling a new one (200). Use this to poll your own attempt.
   * - The stored `requestId` differs and the run is in a final state (COMPLETED or FAILED) →
   *   schedules a new run on the same record, replacing the previous result (202).
   * - The stored `requestId` differs and the run is still PENDING → rejected with 409, since
   *   another AI assistance attempt is already in progress on this process item.
   *
   * The AI prompt configuration comes from the process item definition.
   *
   * @param id The resource ID.
   * @param processItemAiAssistanceGenerateParams Params identifying this AI assistance attempt.
   * @param options The options parameters.
   */
  generateProcessItemAiAssistance: (
    id: string,
    processItemAiAssistanceGenerateParams: ProcessItemAiAssistanceGenerateParams,
    options?: ProcessItemGenerateProcessItemAiAssistanceOptionalParams,
  ) => Promise<ProcessItemGenerateProcessItemAiAssistanceResponse>
  /**
   * Allow to claim a task.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  claimProcessItemTask: (
    id: string,
    options?: ProcessItemClaimProcessItemTaskOptionalParams,
  ) => Promise<ProcessItemClaimProcessItemTaskResponse>
  /**
   * Allow to assign a process item task to a user or application. Only one option will be necessary.
   * @param id The resource ID.
   * @param processItemTaskAssignParams Params to change the process item task owner.
   * @param options The options parameters.
   */
  assignProcessItemTask: (
    id: string,
    processItemTaskAssignParams: ProcessItemTaskAssignParams,
    options?: ProcessItemAssignProcessItemTaskOptionalParams,
  ) => Promise<ProcessItemAssignProcessItemTaskResponse>
  /**
   * Allow to complete a claimed task by the principal.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  completeProcessItemTask: (
    id: string,
    options?: ProcessItemCompleteProcessItemTaskOptionalParams,
  ) => Promise<ProcessItemCompleteProcessItemTaskResponse>
  /**
   * A log entry is added to the task. If the number of log entries is reached, the oldest log entry is
   * removed.
   *
   * @param id The resource ID.
   * @param processItemTaskAppendLogParams Log to be created.
   * @param options The options parameters.
   */
  appendProcessItemTaskLog: (
    id: string,
    processItemTaskAppendLogParams: ProcessItemTaskAppendLogParams,
    options?: ProcessItemAppendProcessItemTaskLogOptionalParams,
  ) => Promise<ProcessItemAppendProcessItemTaskLogResponse>
  /**
   * Allow to save a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param processItemTaskDataUpdateParams Params used to update the JSON value.
   * @param options The options parameters.
   */
  updateProcessItemTaskData: (
    id: string,
    processItemTaskDataUpdateParams: ProcessItemTaskDataUpdateParams,
    options?: ProcessItemUpdateProcessItemTaskDataOptionalParams,
  ) => Promise<ProcessItemUpdateProcessItemTaskDataResponse>
  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save the JSON value.
   * @param options The options parameters.
   */
  patchProcessItemTaskData: (
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: ProcessItemPatchProcessItemTaskDataOptionalParams,
  ) => Promise<ProcessItemPatchProcessItemTaskDataResponse>
  /**
   * Allow to save a JSON context data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param processItemTaskContextDataUpdateParams Params used to update the JSON context data value.
   * @param options The options parameters.
   */
  updateProcessItemTaskContextData: (
    id: string,
    processItemTaskContextDataUpdateParams: ProcessItemTaskContextDataUpdateParams,
    options?: ProcessItemUpdateProcessItemTaskContextDataOptionalParams,
  ) => Promise<ProcessItemUpdateProcessItemTaskContextDataResponse>
  /**
   * Given a task, generate a PDF from a Form type element with the data filled in, if any. If there are
   * multiple form values, they are packed into a ZIP.
   *
   * Important!: To use this feature, please contact to kuflow@kuflow.com
   *
   * @param id The resource ID.
   * @param propertyPath JSON pointer to the property with the error. See:
   *                     https://datatracker.ietf.org/doc/html/rfc6901
   *
   * ie: /user/name or /users/1/name
   *
   * @param options The options parameters.
   */
  downloadProcessItemTaskDataWebformsAsDocument: (
    id: string,
    propertyPath: string,
    options?: ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentOptionalParams,
  ) => Promise<ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentResponse>
}
