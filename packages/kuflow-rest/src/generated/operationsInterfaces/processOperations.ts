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

import type * as coreRestPipeline from '@azure/core-rest-pipeline'

import type {
  JsonPatchOperation,
  ProcessActionCreateParams,
  ProcessCancelProcessActionOptionalParams,
  ProcessCancelProcessActionResponse,
  ProcessCancelProcessItemsOptionalParams,
  ProcessCancelProcessItemsResponse,
  ProcessCancelProcessOptionalParams,
  ProcessCancelProcessResponse,
  ProcessChangeInitiatorParams,
  ProcessChangeProcessInitiatorOptionalParams,
  ProcessChangeProcessInitiatorResponse,
  ProcessCompleteProcessOptionalParams,
  ProcessCompleteProcessResponse,
  ProcessCreateParams,
  ProcessCreateProcessActionOptionalParams,
  ProcessCreateProcessActionResponse,
  ProcessCreateProcessOptionalParams,
  ProcessCreateProcessResponse,
  ProcessDeleteProcessOptionalParams,
  ProcessDownloadProcessDocumentOptionalParams,
  ProcessDownloadProcessDocumentResponse,
  ProcessEntityUpdateParams,
  ProcessFindProcessesOptionalParams,
  ProcessFindProcessesResponse,
  ProcessMetadataUpdateParams,
  ProcessPatchProcessEntityOptionalParams,
  ProcessPatchProcessEntityResponse,
  ProcessPatchProcessMetadataOptionalParams,
  ProcessPatchProcessMetadataResponse,
  ProcessRetrieveProcessActionOptionalParams,
  ProcessRetrieveProcessActionResponse,
  ProcessRetrieveProcessOptionalParams,
  ProcessRetrieveProcessResponse,
  ProcessUpdateProcessEntityOptionalParams,
  ProcessUpdateProcessEntityResponse,
  ProcessUpdateProcessMetadataOptionalParams,
  ProcessUpdateProcessMetadataResponse,
  ProcessUploadProcessDocumentOptionalParams,
  ProcessUploadProcessDocumentResponse,
} from '../models'

/** Interface representing a ProcessOperations. */
export interface ProcessOperations {
  /**
   * List all the Processes that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  findProcesses: (options?: ProcessFindProcessesOptionalParams) => Promise<ProcessFindProcessesResponse>
  /**
   * Creates a process. This option has direct correspondence to the action of starting a process in the
   * Kuflow GUI.
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param processCreateParams Process to create
   * @param options The options parameters.
   */
  createProcess: (
    processCreateParams: ProcessCreateParams,
    options?: ProcessCreateProcessOptionalParams,
  ) => Promise<ProcessCreateProcessResponse>
  /**
   * Returns the requested Process when has access to do it. A deleted Process is returned too, with its
   * `deletedAt` and `deletedBy` fields set.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  retrieveProcess: (
    id: string,
    options?: ProcessRetrieveProcessOptionalParams,
  ) => Promise<ProcessRetrieveProcessResponse>
  /**
   * Deletes the requested Process, and its Process Items with it. Only a finished Process (`COMPLETED`
   * or
   * `CANCELLED`) with nothing in progress, neither tasks still to be done nor workflows of its actions
   * still
   * running, can be deleted; otherwise it answers conflict. The deletion is soft: the Process is still
   * returned
   * by id and with `deleted=INCLUDE|ONLY`, with its `deletedAt` and `deletedBy` fields set, but it
   * cannot be
   * restored. Deleting a Process that is already deleted does nothing.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  deleteProcess: (id: string, options?: ProcessDeleteProcessOptionalParams) => Promise<void>
  /**
   * Invoke an action on a Process.
   *
   * Whether the call returns synchronously or asynchronously depends on the action type:
   *
   * - `START_WORKFLOW`, `DOWNLOADABLE`: dispatched to a background worker. The
   *   response returns immediately with `status=REQUESTED`. Poll
   *   `retrieveProcessAction` for the final state.
   * - `START_RELATED_PROCESS`, `CREATE_TASK`, `CREATE_PROCESS_ITEM_MESSAGE`,
   *   `CREATE_PROCESS_ITEM_THREAD`, `SEND_WORKFLOW_SIGNAL`: completed synchronously.
   *   The response returns with `status=COMPLETED` (or an error status).
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * Actions of type `SEND_WORKFLOW_SIGNAL` whose definition declares an input form accept a
   * `sendWorkflowSignal.input` payload: it is validated against the definition schema,
   * persisted on the action and delivered inside the workflow signal. The input is not part
   * of the idempotency key — replaying the same `id` with a different input returns the
   * original action untouched.
   *
   * @param id The resource ID.
   * @param processActionCreateParams Params identifying the action to invoke.
   * @param options The options parameters.
   */
  createProcessAction: (
    id: string,
    processActionCreateParams: ProcessActionCreateParams,
    options?: ProcessCreateProcessActionOptionalParams,
  ) => Promise<ProcessCreateProcessActionResponse>
  /**
   * Returns a Process action by its ID.
   * @param id The resource ID.
   * @param actionId The Process action ID.
   * @param options The options parameters.
   */
  retrieveProcessAction: (
    id: string,
    actionId: string,
    options?: ProcessRetrieveProcessActionOptionalParams,
  ) => Promise<ProcessRetrieveProcessActionResponse>
  /**
   * Cancel a Process action.
   *
   * Only meaningful for asynchronous actions still in `REQUESTED` state. The
   * action's status is set to `CANCELED`. If the action is already in a
   * terminal state, no transition occurs.
   *
   * @param id The resource ID.
   * @param actionId The Process action ID.
   * @param options The options parameters.
   */
  cancelProcessAction: (
    id: string,
    actionId: string,
    options?: ProcessCancelProcessActionOptionalParams,
  ) => Promise<ProcessCancelProcessActionResponse>
  /**
   * Complete a Process. The state of Process is set to 'completed'.
   *
   * If you are already in this state, no action is taken.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  completeProcess: (
    id: string,
    options?: ProcessCompleteProcessOptionalParams,
  ) => Promise<ProcessCompleteProcessResponse>
  /**
   * Cancel a Process. The Process state is set to 'cancelled'.
   *
   * All the active process items will be marked as cancelled too.
   *
   * If you are already in this state, no action is taken.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  cancelProcess: (id: string, options?: ProcessCancelProcessOptionalParams) => Promise<ProcessCancelProcessResponse>
  /**
   * Cancel Process Items in a Process.
   *
   * When processItemId query parameters are provided, only those specific
   * process items are cancelled. When omitted, all active process items
   * in the process are cancelled.
   *
   * For task process items, tasks in a cancellable state (ready, claimed)
   * are set to 'cancelled'. Already cancelled tasks are treated as a no-op.
   * The Process itself is not affected.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  cancelProcessItems: (
    id: string,
    options?: ProcessCancelProcessItemsOptionalParams,
  ) => Promise<ProcessCancelProcessItemsResponse>
  /**
   * Change the current initiator of a process.
   *
   * Allows you to choose a user (by email or principal identifier) or an application (principal
   * identifier).
   * Only one option will be necessary.
   *
   * @param id The resource ID.
   * @param processChangeInitiatorParams Params to change the process initiator.
   * @param options The options parameters.
   */
  changeProcessInitiator: (
    id: string,
    processChangeInitiatorParams: ProcessChangeInitiatorParams,
    options?: ProcessChangeProcessInitiatorOptionalParams,
  ) => Promise<ProcessChangeProcessInitiatorResponse>
  /**
   * Save process metadata
   * @param id The resource ID.
   * @param processMetadataUpdateParams Params to save the metadata data.
   * @param options The options parameters.
   */
  updateProcessMetadata: (
    id: string,
    processMetadataUpdateParams: ProcessMetadataUpdateParams,
    options?: ProcessUpdateProcessMetadataOptionalParams,
  ) => Promise<ProcessUpdateProcessMetadataResponse>
  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save the JSON value.
   * @param options The options parameters.
   */
  patchProcessMetadata: (
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: ProcessPatchProcessMetadataOptionalParams,
  ) => Promise<ProcessPatchProcessMetadataResponse>
  /**
   * Allow to save a JSON validating that the data follow the related schema. If the data is invalid,
   * then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param processEntityUpdateParams Params to save the JSON value.
   * @param options The options parameters.
   */
  updateProcessEntity: (
    id: string,
    processEntityUpdateParams: ProcessEntityUpdateParams,
    options?: ProcessUpdateProcessEntityOptionalParams,
  ) => Promise<ProcessUpdateProcessEntityResponse>
  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save the JSON value.
   * @param options The options parameters.
   */
  patchProcessEntity: (
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: ProcessPatchProcessEntityOptionalParams,
  ) => Promise<ProcessPatchProcessEntityResponse>
  /**
   * Upload a temporal document into the process that later on must be linked with a process domain
   * resource.
   *
   * Documents uploaded with this API will be deleted after 2 hours as long as they have not been linked
   * to a
   * process or process item.
   *
   * **Deprecated:** use the `uploadDocument` operation with `targetUri=ku:process/{processId}` instead.
   *
   * @param id The resource ID.
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param file Document to save.
   * @param options The options parameters.
   */
  uploadProcessDocument: (
    id: string,
    fileContentType: string,
    fileName: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessUploadProcessDocumentOptionalParams,
  ) => Promise<ProcessUploadProcessDocumentResponse>
  /**
   * Given a document uri download a document.
   *
   * **Deprecated:** use the `downloadDocument` operation instead; it resolves any document the
   * credentials can read without requiring the owning Process in the path.
   *
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  downloadProcessDocument: (
    id: string,
    documentUri: string,
    options?: ProcessDownloadProcessDocumentOptionalParams,
  ) => Promise<ProcessDownloadProcessDocumentResponse>
}
