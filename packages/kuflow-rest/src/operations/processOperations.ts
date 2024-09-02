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

import type { FullOperationResponse } from '@azure/core-client'

import type {
  JsonPatchOperation,
  KuFlowRestClientGenerated,
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
  ProcessDownloadProcessDocumentOptionalParams,
  ProcessDownloadProcessDocumentResponse,
  ProcessEntityUpdateParams,
  ProcessFindProcessesResponse,
  ProcessMetadataUpdateParams,
  ProcessOperations as ProcessOperationsGenerated,
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
  ProcessUploadProcessDocumentOptionalParams,
  ProcessUploadProcessDocumentResponse,
  ProcessUploadProcessUserActionDocumentOptionalParams,
  ProcessUploadProcessUserActionDocumentResponse,
} from '../generated'
import type {
  Document,
  ProcessFindProcessesOptionalExtParams,
  ProcessUploadProcessUserActionDocumentParams,
} from '../models'

/** Class containing ProcessOperations operations. */
export class ProcessOperations {
  private readonly processOperations: ProcessOperationsGenerated

  /**
   * Initialize a new instance of the class ProcessOperations class.
   * @param clientGenerated Reference to the service client
   */
  public constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.processOperations = clientGenerated.processOperations
  }

  /**
   * List all the Processes that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  public async findProcesses(options?: ProcessFindProcessesOptionalExtParams): Promise<ProcessFindProcessesResponse> {
    const { sort, tenantId, ...optionsRest } = options ?? {}

    return await this.processOperations.findProcesses({
      ...optionsRest,
      sort: typeof sort === 'string' ? [sort] : sort,
      tenantId: typeof tenantId === 'string' ? [tenantId] : tenantId,
    })
  }

  /**
   * Creates a process. This option has direct correspondence to the action of starting a process in the
   * Kuflow GUI.
   *
   * When a process is created, the current user is assigned as the process initiator, if you want to
   * change it, you can pass a valid initiator using the following options:
   *
   * * If you know the `principal ID` you can assign it to `initiator.id`
   * * If you know the `user ID` you can assign it to `initiator.user.id`
   * * If you know the `user email` you can assign it to `initiator.user.email`
   * * If you know the `application ID` you can assign it to `initiator.application.id`
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param processCreateParams Process to create
   * @param options The options parameters.
   */
  public async createProcess(
    processCreateParams: ProcessCreateParams,
    options?: ProcessCreateProcessOptionalParams,
  ): Promise<ProcessCreateProcessResponse> {
    return await this.processOperations.createProcess(processCreateParams, options)
  }

  /**
   * Returns the requested Process when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async retrieveProcess(
    id: string,
    options?: ProcessRetrieveProcessOptionalParams,
  ): Promise<ProcessRetrieveProcessResponse> {
    return await this.processOperations.retrieveProcess(id, options)
  }

  /**
   * Complete a Process. The state of Process is set to 'completed'.
   *
   * If you are already in this state, no action is taken.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async completeProcess(
    id: string,
    options?: ProcessCompleteProcessOptionalParams,
  ): Promise<ProcessCompleteProcessResponse> {
    return await this.processOperations.completeProcess(id, options)
  }

  /**
   * Cancel a Process. The Process state is set to 'cancelled'.
   *
   * All the active tasks will be marked as cancelled too.
   *
   * If you are already in this state, no action is taken.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async cancelProcess(
    id: string,
    options?: ProcessCancelProcessOptionalParams,
  ): Promise<ProcessCancelProcessResponse> {
    return await this.processOperations.cancelProcess(id, options)
  }

  /**
   * Change the current initiator of a process.
   *
   * Allows you to choose a user (by email or principal identifier) or an application (principal identifier).
   * Only one option will be necessary.
   *
   * @param id The resource ID.
   * @param processChangeInitiatorParams Params to change the process initiator.
   * @param options The options parameters.
   */
  public async changeProcessInitiator(
    id: string,
    processChangeInitiatorParams: ProcessChangeInitiatorParams,
    options?: ProcessChangeProcessInitiatorOptionalParams,
  ): Promise<ProcessChangeProcessInitiatorResponse> {
    return await this.processOperations.changeProcessInitiator(id, processChangeInitiatorParams, options)
  }

  /**
   * Allow saving a user action document uploading the content.
   *
   * @param id The resource ID.
   * @param processUploadProcessUserActionDocumentParams Params info
   * @param document Document to upload.
   * @param options The options parameters.
   *
   * @return the process if the document could be saved or undefined if not
   */
  public async uploadProcessUserActionDocument(
    id: string,
    processUploadProcessUserActionDocumentParams: ProcessUploadProcessUserActionDocumentParams,
    document: Document,
    options?: ProcessUploadProcessUserActionDocumentOptionalParams,
  ): Promise<ProcessUploadProcessUserActionDocumentResponse | undefined> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const file = document.fileContent
    const userActionValueId = processUploadProcessUserActionDocumentParams.userActionValueId

    let rawResponse: FullOperationResponse | undefined = undefined as FullOperationResponse | undefined
    const optionsExt: ProcessUploadProcessUserActionDocumentOptionalParams = {
      ...options,
      onResponse: rawResponseInner => {
        rawResponse = rawResponseInner
      },
    }

    const process = await this.processOperations.uploadProcessUserActionDocument(
      id,
      fileContentType,
      fileName,
      userActionValueId,
      file,
      optionsExt,
    )

    if (rawResponse == null) {
      return
    }

    if (options?.onResponse != null) {
      options.onResponse(rawResponse, process)
    }

    if (rawResponse.status === 304) {
      return
    }

    return process
  }

  /**
   * Save process metadata validating the data following the related schema.
   *
   * @param id The resource ID.
   * @param processMetadataUpdateParams Params to save de entity data.
   * @param options The options parameters.
   */
  public async updateProcessMetadata(
    id: string,
    processMetadataUpdateParams: ProcessMetadataUpdateParams,
    options?: ProcessUpdateProcessMetadataOptionalParams,
  ): Promise<ProcessUpdateProcessMetadataResponse> {
    return await this.processOperations.updateProcessMetadata(id, processMetadataUpdateParams, options)
  }

  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save de entity data.
   * @param options The options parameters.
   */
  public async patchProcessMetadata(
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: ProcessPatchProcessMetadataOptionalParams,
  ): Promise<ProcessPatchProcessMetadataResponse> {
    return await this.processOperations.patchProcessMetadata(id, jsonPatch, options)
  }

  /**
   * Allow to save a JSON validating that the data follow the related schema. If the data is invalid,
   * then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param processEntityUpdateParams Params to save the JSON value.
   * @param options The options parameters.
   */
  public async updateProcessEntity(
    id: string,
    processEntityUpdateParams: ProcessEntityUpdateParams,
    options?: ProcessUpdateProcessEntityOptionalParams,
  ): Promise<ProcessUpdateProcessEntityResponse> {
    return await this.processOperations.updateProcessEntity(id, processEntityUpdateParams, options)
  }

  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save the JSON value.
   * @param options The options parameters.
   */
  public async patchProcessEntity(
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: ProcessPatchProcessEntityOptionalParams,
  ): Promise<ProcessPatchProcessEntityResponse> {
    return await this.processOperations.patchProcessEntity(id, jsonPatch, options)
  }

  /**
   * Upload a temporal document into the process that later on must be linked with a process domain
   * resource.
   * <p>
   * Documents uploaded with this API will be deleted after 24 hours as long as they have not been linked
   * to a process or process item.
   *
   * @param id The resource ID.
   * @param document Document to upload.
   * @param options The options parameters.
   */
  public async uploadProcessDocument(
    id: string,
    document: Document,
    options?: ProcessUploadProcessDocumentOptionalParams,
  ): Promise<ProcessUploadProcessDocumentResponse | undefined> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const file = document.fileContent

    let rawResponse: FullOperationResponse | undefined = undefined as FullOperationResponse | undefined
    const optionsExt: ProcessUploadProcessDocumentOptionalParams = {
      ...options,
      onResponse: rawResponseInner => {
        rawResponse = rawResponseInner
      },
    }

    const process = await this.processOperations.uploadProcessDocument(id, fileContentType, fileName, file, optionsExt)

    if (rawResponse == null) {
      return
    }

    if (options?.onResponse != null) {
      options.onResponse(rawResponse, process)
    }

    if (rawResponse.status === 304) {
      return
    }

    return process
  }

  /**
   * Given a process and a documentUri, download a document.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  public async downloadProcessDocument(
    id: string,
    documentUri: string,
    options?: ProcessDownloadProcessDocumentOptionalParams,
  ): Promise<ProcessDownloadProcessDocumentResponse> {
    return await this.processOperations.downloadProcessDocument(id, documentUri, options)
  }
}
