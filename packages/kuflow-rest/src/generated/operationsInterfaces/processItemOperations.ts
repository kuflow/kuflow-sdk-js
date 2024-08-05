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

import {
  type JsonPatchOperation,
  type ProcessItemAppendProcessItemTaskLogOptionalParams,
  type ProcessItemAppendProcessItemTaskLogResponse,
  type ProcessItemAssignProcessItemTaskOptionalParams,
  type ProcessItemAssignProcessItemTaskResponse,
  type ProcessItemClaimProcessItemTaskOptionalParams,
  type ProcessItemClaimProcessItemTaskResponse,
  type ProcessItemCompleteProcessItemTaskOptionalParams,
  type ProcessItemCompleteProcessItemTaskResponse,
  type ProcessItemCreateParams,
  type ProcessItemCreateProcessItemOptionalParams,
  type ProcessItemCreateProcessItemResponse,
  type ProcessItemDownloadProcessItemTaskDataDocumentOptionalParams,
  type ProcessItemDownloadProcessItemTaskDataDocumentResponse,
  type ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentOptionalParams,
  type ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentResponse,
  type ProcessItemFindProcessItemsOptionalParams,
  type ProcessItemFindProcessItemsResponse,
  type ProcessItemPatchProcessItemTaskDataOptionalParams,
  type ProcessItemPatchProcessItemTaskDataResponse,
  type ProcessItemRetrieveProcessItemOptionalParams,
  type ProcessItemRetrieveProcessItemResponse,
  type ProcessItemTaskAppendLogParams,
  type ProcessItemTaskAssignParams,
  type ProcessItemTaskDataUpdateParams,
  type ProcessItemUpdateProcessItemTaskDataOptionalParams,
  type ProcessItemUpdateProcessItemTaskDataResponse,
  type ProcessItemUploadProcessItemTaskDataDocumentOptionalParams,
  type ProcessItemUploadProcessItemTaskDataDocumentResponse,
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
   * If you want to add document type elements, you can pass a reference to an existing document type
   * element
   * indicating its 'uri'. This will copy that document into the element. In case you want to add a new
   * document,
   * please use the corresponding API method.
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param params Process Item to be created
   * @param options The options parameters.
   */
  createProcessItem: (
    params: ProcessItemCreateParams,
    options?: ProcessItemCreateProcessItemOptionalParams,
  ) => Promise<ProcessItemCreateProcessItemResponse>
  /**
   * Allow to get a process item by ID.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  retrieveProcessItem: (
    id: string,
    options?: ProcessItemRetrieveProcessItemOptionalParams,
  ) => Promise<ProcessItemRetrieveProcessItemResponse>
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
   * @param params Params to change the process item task owner.
   * @param options The options parameters.
   */
  assignProcessItemTask: (
    id: string,
    params: ProcessItemTaskAssignParams,
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
   * @param params Log to be created.
   * @param options The options parameters.
   */
  appendProcessItemTaskLog: (
    id: string,
    params: ProcessItemTaskAppendLogParams,
    options?: ProcessItemAppendProcessItemTaskLogOptionalParams,
  ) => Promise<ProcessItemAppendProcessItemTaskLogResponse>
  /**
   * Allow to save a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param params Params used to update the JSON value.
   * @param options The options parameters.
   */
  updateProcessItemTaskData: (
    id: string,
    params: ProcessItemTaskDataUpdateParams,
    options?: ProcessItemUpdateProcessItemTaskDataOptionalParams,
  ) => Promise<ProcessItemUpdateProcessItemTaskDataResponse>
  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param params Params to save the JSON value.
   * @param options The options parameters.
   */
  patchProcessItemTaskData: (
    id: string,
    params: JsonPatchOperation[],
    options?: ProcessItemPatchProcessItemTaskDataOptionalParams,
  ) => Promise<ProcessItemPatchProcessItemTaskDataResponse>
  /**
   * Save a document in the task to later be linked into the JSON data.
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
  uploadProcessItemTaskDataDocument: (
    id: string,
    fileContentType: string,
    fileName: string,
    schemaPath: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessItemUploadProcessItemTaskDataDocumentOptionalParams,
  ) => Promise<ProcessItemUploadProcessItemTaskDataDocumentResponse>
  /**
   * Given a task, download a document from a json form data.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  downloadProcessItemTaskDataDocument: (
    id: string,
    documentUri: string,
    options?: ProcessItemDownloadProcessItemTaskDataDocumentOptionalParams,
  ) => Promise<ProcessItemDownloadProcessItemTaskDataDocumentResponse>
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
