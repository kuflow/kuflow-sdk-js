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
import {
  type JsonPatchOperation,
  type KuFlowRestClientGenerated,
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
  type ProcessItemFindProcessItemsResponse,
  type ProcessItemOperations as ProcessItemOperationsGenerated,
  type ProcessItemPatchProcessItemTaskDataOptionalParams,
  type ProcessItemRetrieveProcessItemOptionalParams,
  type ProcessItemRetrieveProcessItemResponse,
  type ProcessItemTaskAppendLogParams,
  type ProcessItemTaskAssignParams,
  type ProcessItemTaskDataUpdateParams,
  type ProcessItemUpdateProcessItemTaskDataOptionalParams,
  type ProcessItemUpdateProcessItemTaskDataResponse,
  type ProcessItemUploadProcessItemTaskDataDocumentOptionalParams,
  type ProcessItemUploadProcessItemTaskDataDocumentResponse,
} from '../generated'
import {
  type Document,
  type ProcessItemFindProcessItemsOptionalExtParams,
  type ProcessItemUploadProcessItemTaskDataDocumentParams,
} from '../models'

/** Class containing TaskOperations operations. */
export class ProcessItemOperations {
  private readonly processItemOperations: ProcessItemOperationsGenerated

  /**
   * Initialize a new instance of the class TaskOperations class.
   * @param clientGenerated Reference to the service client
   */
  constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.processItemOperations = clientGenerated.processItemOperations
  }

  /**
   * List all Tasks that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt, claimedAt, completedAt, cancelledAt
   *
   * @param options The options parameters.
   */
  public async findProcessItems(
    options?: ProcessItemFindProcessItemsOptionalExtParams,
  ): Promise<ProcessItemFindProcessItemsResponse> {
    const { sort, tenantId, processId, type, taskState, taskDefinitionCode, ...optionsRest } = options ?? {}

    return await this.processItemOperations.findProcessItems({
      ...optionsRest,
      sort: typeof sort === 'string' ? [sort] : sort,
      tenantId: typeof tenantId === 'string' ? [tenantId] : tenantId,
      processId: typeof processId === 'string' ? [processId] : processId,
      type: typeof type === 'string' ? [type] : type,
      taskState: typeof taskState === 'string' ? [taskState] : taskState,
      taskDefinitionCode: typeof taskDefinitionCode === 'string' ? [taskDefinitionCode] : taskDefinitionCode,
    })
  }

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
  public async createProcessItem(
    params: ProcessItemCreateParams,
    options?: ProcessItemCreateProcessItemOptionalParams,
  ): Promise<ProcessItemCreateProcessItemResponse> {
    return await this.processItemOperations.createProcessItem(params, options)
  }

  /**
   * Allow to get a task by ID.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async retrieveProcessItem(
    id: string,
    options?: ProcessItemRetrieveProcessItemOptionalParams,
  ): Promise<ProcessItemRetrieveProcessItemResponse> {
    return await this.processItemOperations.retrieveProcessItem(id, options)
  }

  /**
   * Allow to claim a task.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async claimProcessItemTask(
    id: string,
    options?: ProcessItemClaimProcessItemTaskOptionalParams,
  ): Promise<ProcessItemClaimProcessItemTaskResponse> {
    return await this.processItemOperations.claimProcessItemTask(id, options)
  }

  /**
   * Allow to assign a task to a user or application. Only one option will be necessary.
   * @param id The resource ID.
   * @param params Params to change the process item task owner.
   * @param options The options parameters.
   */
  public async assignProcessItemTask(
    id: string,
    params: ProcessItemTaskAssignParams,
    options?: ProcessItemAssignProcessItemTaskOptionalParams,
  ): Promise<ProcessItemAssignProcessItemTaskResponse> {
    return await this.processItemOperations.assignProcessItemTask(id, params, options)
  }

  /**
   * Allow to complete a claimed task by the principal.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async completeProcessItemTask(
    id: string,
    options?: ProcessItemCompleteProcessItemTaskOptionalParams,
  ): Promise<ProcessItemCompleteProcessItemTaskResponse> {
    return await this.processItemOperations.completeProcessItemTask(id, options)
  }

  /**
   * A log entry is added to the task. If the number of log entries is reached, the oldest log entry is
   * removed.
   *
   * @param id The resource ID.
   * @param params Log to be created.
   * @param options The options parameters.
   */
  public async appendProcessItemTaskLog(
    id: string,
    params: ProcessItemTaskAppendLogParams,
    options?: ProcessItemAppendProcessItemTaskLogOptionalParams,
  ): Promise<ProcessItemAppendProcessItemTaskLogResponse> {
    return await this.processItemOperations.appendProcessItemTaskLog(id, params, options)
  }

  /**
   * Allow to save a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param params Params used to update the JSON value.
   * @param options The options parameters.
   */
  public async updateProcessItemTaskData(
    id: string,
    params: ProcessItemTaskDataUpdateParams,
    options?: ProcessItemUpdateProcessItemTaskDataOptionalParams,
  ): Promise<ProcessItemUpdateProcessItemTaskDataResponse> {
    return await this.processItemOperations.updateProcessItemTaskData(id, params, options)
  }

  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param params Params to save the JSON value.
   * @param options The options parameters.
   */
  public async patchProcessItemTaskData(
    id: string,
    params: JsonPatchOperation[],
    options?: ProcessItemPatchProcessItemTaskDataOptionalParams,
  ): Promise<ProcessItemUpdateProcessItemTaskDataResponse> {
    return await this.processItemOperations.patchProcessItemTaskData(id, params, options)
  }

  /**
   * Save a document in the task to later be linked into the JSON data.
   *
   * @param id The resource ID.
   * @param params Params info.
   * @param document Document to upload.
   * @param options The options parameters.
   */
  public async uploadProcessItemTaskDataDocument(
    id: string,
    params: ProcessItemUploadProcessItemTaskDataDocumentParams,
    document: Document,
    options?: ProcessItemUploadProcessItemTaskDataDocumentOptionalParams,
  ): Promise<ProcessItemUploadProcessItemTaskDataDocumentResponse> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const schemaPath = params.schemaPath
    const file = document.fileContent

    return await this.processItemOperations.uploadProcessItemTaskDataDocument(
      id,
      fileContentType,
      fileName,
      schemaPath,
      file,
      options,
    )
  }

  /**
   * Given a task, download a document from a json form data.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  public async downloadProcessItemTaskDataDocument(
    id: string,
    documentUri: string,
    options?: ProcessItemDownloadProcessItemTaskDataDocumentOptionalParams,
  ): Promise<ProcessItemDownloadProcessItemTaskDataDocumentResponse> {
    return await this.processItemOperations.downloadProcessItemTaskDataDocument(id, documentUri, options)
  }

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
  public async downloadProcessItemTaskDataWebformsAsDocument(
    id: string,
    propertyPath: string,
    options?: ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentOptionalParams,
  ): Promise<ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentResponse> {
    return await this.processItemOperations.downloadProcessItemTaskDataWebformsAsDocument(id, propertyPath, options)
  }
}
