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
  ProcessCancelProcessOptionalParams,
  ProcessCancelProcessResponse,
  ProcessChangeInitiatorParams,
  ProcessChangeProcessInitiatorOptionalParams,
  ProcessChangeProcessInitiatorResponse,
  ProcessCompleteProcessOptionalParams,
  ProcessCompleteProcessResponse,
  ProcessCreateParams,
  ProcessCreateProcessOptionalParams,
  ProcessCreateProcessResponse,
  ProcessDownloadProcessEntityDocumentOptionalParams,
  ProcessDownloadProcessEntityDocumentResponse,
  ProcessEntityUpdateParams,
  ProcessFindProcessesOptionalParams,
  ProcessFindProcessesResponse,
  ProcessMetadataUpdateParams,
  ProcessPatchProcessEntityOptionalParams,
  ProcessPatchProcessEntityResponse,
  ProcessPatchProcessMetadataOptionalParams,
  ProcessPatchProcessMetadataResponse,
  ProcessRetrieveProcessOptionalParams,
  ProcessRetrieveProcessResponse,
  ProcessUpdateProcessEntityOptionalParams,
  ProcessUpdateProcessEntityResponse,
  ProcessUpdateProcessMetadataOptionalParams,
  ProcessUpdateProcessMetadataResponse,
  ProcessUploadProcessEntityDocumentOptionalParams,
  ProcessUploadProcessEntityDocumentResponse,
  ProcessUploadProcessUserActionDocumentOptionalParams,
  ProcessUploadProcessUserActionDocumentResponse,
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
   * Returns the requested Process when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  retrieveProcess: (
    id: string,
    options?: ProcessRetrieveProcessOptionalParams,
  ) => Promise<ProcessRetrieveProcessResponse>
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
   * Allow saving a user action document uploading the content.
   *
   * @param id The resource ID.
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param userActionValueId User action value ID related to de document
   * @param file Document to save.
   * @param options The options parameters.
   */
  uploadProcessUserActionDocument: (
    id: string,
    fileContentType: string,
    fileName: string,
    userActionValueId: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessUploadProcessUserActionDocumentOptionalParams,
  ) => Promise<ProcessUploadProcessUserActionDocumentResponse>
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
   * Save a document in the process to later be linked into the JSON data.
   *
   * @param id The resource ID.
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param schemaPath JSON Schema path related to the document. The uploaded document will be validated
   *                   by the passed schema path.
   *
   * ie: "#/properties/file", "#/definitions/UserType/name"
   *
   * @param file Document to save.
   * @param options The options parameters.
   */
  uploadProcessEntityDocument: (
    id: string,
    fileContentType: string,
    fileName: string,
    schemaPath: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessUploadProcessEntityDocumentOptionalParams,
  ) => Promise<ProcessUploadProcessEntityDocumentResponse>
  /**
   * Given a process and a documentUri, download a document.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  downloadProcessEntityDocument: (
    id: string,
    documentUri: string,
    options?: ProcessDownloadProcessEntityDocumentOptionalParams,
  ) => Promise<ProcessDownloadProcessEntityDocumentResponse>
}
