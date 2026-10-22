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
  BusinessArtifactActionCreateArtifactPrepareParams,
  BusinessArtifactActionCreateParams,
  BusinessArtifactActionStartProcessPrepareParams,
  BusinessArtifactCancelBusinessArtifactActionOptionalParams,
  BusinessArtifactCancelBusinessArtifactActionResponse,
  BusinessArtifactCreateBusinessArtifactActionOptionalParams,
  BusinessArtifactCreateBusinessArtifactActionResponse,
  BusinessArtifactCreateBusinessArtifactOptionalParams,
  BusinessArtifactCreateBusinessArtifactResponse,
  BusinessArtifactCreateParams,
  BusinessArtifactDataUpdateParams,
  BusinessArtifactDeleteBusinessArtifactOptionalParams,
  BusinessArtifactDownloadBusinessArtifactDocumentOptionalParams,
  BusinessArtifactDownloadBusinessArtifactDocumentResponse,
  BusinessArtifactFindBusinessArtifactsOptionalParams,
  BusinessArtifactFindBusinessArtifactsResponse,
  BusinessArtifactPatchBusinessArtifactDataOptionalParams,
  BusinessArtifactPatchBusinessArtifactDataResponse,
  BusinessArtifactPrepareBusinessArtifactActionCreateArtifactOptionalParams,
  BusinessArtifactPrepareBusinessArtifactActionCreateArtifactResponse,
  BusinessArtifactPrepareBusinessArtifactActionStartProcessOptionalParams,
  BusinessArtifactPrepareBusinessArtifactActionStartProcessResponse,
  BusinessArtifactRestoreBusinessArtifactOptionalParams,
  BusinessArtifactRestoreBusinessArtifactResponse,
  BusinessArtifactRetrieveBusinessArtifactActionOptionalParams,
  BusinessArtifactRetrieveBusinessArtifactActionResponse,
  BusinessArtifactRetrieveBusinessArtifactOptionalParams,
  BusinessArtifactRetrieveBusinessArtifactResponse,
  BusinessArtifactUpdateBusinessArtifactDataOptionalParams,
  BusinessArtifactUpdateBusinessArtifactDataResponse,
  BusinessArtifactUploadBusinessArtifactDocumentOptionalParams,
  BusinessArtifactUploadBusinessArtifactDocumentResponse,
  JsonPatchOperation,
} from '../models'

/** Interface representing a BusinessArtifactOperations. */
export interface BusinessArtifactOperations {
  /**
   * List all the Business Artifacts that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  findBusinessArtifacts: (
    options?: BusinessArtifactFindBusinessArtifactsOptionalParams,
  ) => Promise<BusinessArtifactFindBusinessArtifactsResponse>
  /**
   * Creates a Business Artifact.
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param businessArtifactCreateParams Business Artifact to create
   * @param options The options parameters.
   */
  createBusinessArtifact: (
    businessArtifactCreateParams: BusinessArtifactCreateParams,
    options?: BusinessArtifactCreateBusinessArtifactOptionalParams,
  ) => Promise<BusinessArtifactCreateBusinessArtifactResponse>
  /**
   * Returns the requested Business Artifact when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  retrieveBusinessArtifact: (
    id: string,
    options?: BusinessArtifactRetrieveBusinessArtifactOptionalParams,
  ) => Promise<BusinessArtifactRetrieveBusinessArtifactResponse>
  /**
   * Deletes the requested Business Artifact. The deletion is soft: the Business Artifact can be
   * brought back with the `restoreBusinessArtifact` operation.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  deleteBusinessArtifact: (id: string, options?: BusinessArtifactDeleteBusinessArtifactOptionalParams) => Promise<void>
  /**
   * Restore a previously deleted Business Artifact, the undo of the `deleteBusinessArtifact`
   * operation. If the Business Artifact is not deleted, no action is taken.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  restoreBusinessArtifact: (
    id: string,
    options?: BusinessArtifactRestoreBusinessArtifactOptionalParams,
  ) => Promise<BusinessArtifactRestoreBusinessArtifactResponse>
  /**
   * Allow to save a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param businessArtifactDataUpdateParams Params used to update the JSON value.
   * @param options The options parameters.
   */
  updateBusinessArtifactData: (
    id: string,
    businessArtifactDataUpdateParams: BusinessArtifactDataUpdateParams,
    options?: BusinessArtifactUpdateBusinessArtifactDataOptionalParams,
  ) => Promise<BusinessArtifactUpdateBusinessArtifactDataResponse>
  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save the JSON value.
   * @param options The options parameters.
   */
  patchBusinessArtifactData: (
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: BusinessArtifactPatchBusinessArtifactDataOptionalParams,
  ) => Promise<BusinessArtifactPatchBusinessArtifactDataResponse>
  /**
   * Invoke an action on a Business Artifact.
   *
   * Whether the call returns synchronously or asynchronously depends on the action type:
   *
   * - `START_WORKFLOW`, `DOWNLOADABLE`: dispatched to a background worker. The
   *   response returns immediately with `status=REQUESTED`. Poll
   *   `retrieveBusinessArtifactAction` for the final state.
   * - `START_PROCESS`, `CREATE_BUSINESS_ARTIFACT`: completed synchronously. The
   *   response returns with `status=COMPLETED` (or an error status).
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param id The resource ID.
   * @param businessArtifactActionCreateParams Params identifying the action to invoke.
   * @param options The options parameters.
   */
  createBusinessArtifactAction: (
    id: string,
    businessArtifactActionCreateParams: BusinessArtifactActionCreateParams,
    options?: BusinessArtifactCreateBusinessArtifactActionOptionalParams,
  ) => Promise<BusinessArtifactCreateBusinessArtifactActionResponse>
  /**
   * Returns a Business Artifact action by its ID.
   * @param id The resource ID.
   * @param actionId The Business Artifact action ID.
   * @param options The options parameters.
   */
  retrieveBusinessArtifactAction: (
    id: string,
    actionId: string,
    options?: BusinessArtifactRetrieveBusinessArtifactActionOptionalParams,
  ) => Promise<BusinessArtifactRetrieveBusinessArtifactActionResponse>
  /**
   * Cancel a Business Artifact action.
   *
   * Only meaningful for asynchronous actions still in `REQUESTED` state. The
   * action's status is set to `CANCELED`. If the action is already in a
   * terminal state, no transition occurs.
   *
   * @param id The resource ID.
   * @param actionId The Business Artifact action ID.
   * @param options The options parameters.
   */
  cancelBusinessArtifactAction: (
    id: string,
    actionId: string,
    options?: BusinessArtifactCancelBusinessArtifactActionOptionalParams,
  ) => Promise<BusinessArtifactCancelBusinessArtifactActionResponse>
  /**
   * Compute the pre-filled value that a `CREATE_BUSINESS_ARTIFACT` action would produce
   * for this Business Artifact, without invoking the action or persisting any state.
   *
   * Use it to populate a form that the user can review and edit. Once the user submits,
   * the filled value is sent back via `createBusinessArtifactAction` (in the
   * `createArtifact.value` field).
   *
   * @param id The resource ID.
   * @param businessArtifactActionCreateArtifactPrepareParams Params identifying the
   *                                                          CREATE_BUSINESS_ARTIFACT action to prepare.
   * @param options The options parameters.
   */
  prepareBusinessArtifactActionCreateArtifact: (
    id: string,
    businessArtifactActionCreateArtifactPrepareParams: BusinessArtifactActionCreateArtifactPrepareParams,
    options?: BusinessArtifactPrepareBusinessArtifactActionCreateArtifactOptionalParams,
  ) => Promise<BusinessArtifactPrepareBusinessArtifactActionCreateArtifactResponse>
  /**
   * Compute the pre-filled metadata that a `START_PROCESS` action would apply to the
   * process it creates, without invoking the action or persisting any state.
   *
   * Use it to populate a form that the user can review and edit. Once the user submits,
   * the filled metadata is sent back via `createBusinessArtifactAction` (in the
   * `startProcess.metadata` field).
   *
   * @param id The resource ID.
   * @param businessArtifactActionStartProcessPrepareParams Params identifying the START_PROCESS action
   *                                                        to prepare.
   * @param options The options parameters.
   */
  prepareBusinessArtifactActionStartProcess: (
    id: string,
    businessArtifactActionStartProcessPrepareParams: BusinessArtifactActionStartProcessPrepareParams,
    options?: BusinessArtifactPrepareBusinessArtifactActionStartProcessOptionalParams,
  ) => Promise<BusinessArtifactPrepareBusinessArtifactActionStartProcessResponse>
  /**
   * Upload a temporal document into the business artifact that later on must be linked with a business
   * artifact
   * domain resource.
   *
   * Documents uploaded with this API will be deleted after 2 hours as long as they have not been linked
   * to a
   * business artifact.
   *
   * **Deprecated:** use the `uploadDocument` operation with
   * `targetUri=ku:business-artifact/{businessArtifactId}`
   * instead.
   *
   * @param id The resource ID.
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param file Document to save.
   * @param options The options parameters.
   */
  uploadBusinessArtifactDocument: (
    id: string,
    fileContentType: string,
    fileName: string,
    file: coreRestPipeline.RequestBodyType,
    options?: BusinessArtifactUploadBusinessArtifactDocumentOptionalParams,
  ) => Promise<BusinessArtifactUploadBusinessArtifactDocumentResponse>
  /**
   * Given a document uri download a document.
   *
   * **Deprecated:** use the `downloadDocument` operation instead; it resolves any document the
   * credentials can read without requiring the owning Business Artifact in the path.
   *
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  downloadBusinessArtifactDocument: (
    id: string,
    documentUri: string,
    options?: BusinessArtifactDownloadBusinessArtifactDocumentOptionalParams,
  ) => Promise<BusinessArtifactDownloadBusinessArtifactDocumentResponse>
}
