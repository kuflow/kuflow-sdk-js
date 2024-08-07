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
  ProcessDownloadProcessEntityDocumentOptionalParams,
  ProcessDownloadProcessEntityDocumentResponse,
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
  ProcessUploadProcessEntityDocumentOptionalParams,
  ProcessUploadProcessEntityDocumentResponse,
  ProcessUploadProcessUserActionDocumentOptionalParams,
  ProcessUploadProcessUserActionDocumentResponse,
} from '../generated'
import type {
  Document,
  ProcessFindProcessesOptionalExtParams,
  ProcessUploadProcessEntityDocumentParams,
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
   * @param params Process to create
   * @param options The options parameters.
   */
  public async createProcess(
    params: ProcessCreateParams,
    options?: ProcessCreateProcessOptionalParams,
  ): Promise<ProcessCreateProcessResponse> {
    return await this.processOperations.createProcess(params, options)
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
   * @param params Params to change the process initiator.
   * @param options The options parameters.
   */
  public async changeProcessInitiator(
    id: string,
    params: ProcessChangeInitiatorParams,
    options?: ProcessChangeProcessInitiatorOptionalParams,
  ): Promise<ProcessChangeProcessInitiatorResponse> {
    return await this.processOperations.changeProcessInitiator(id, params, options)
  }

  /**
   * Allow saving a user action document uploading the content.
   *
   * @param id The resource ID.
   * @param params Params info
   * @param document Document to upload.
   * @param options The options parameters.
   *
   * @return the process if the document could be saved or undefined if not
   */
  public async uploadProcessUserActionDocument(
    id: string,
    params: ProcessUploadProcessUserActionDocumentParams,
    document: Document,
    options?: ProcessUploadProcessUserActionDocumentOptionalParams,
  ): Promise<ProcessUploadProcessUserActionDocumentResponse | undefined> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const file = document.fileContent
    const userActionValueId = params.userActionValueId

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
   * @param params Params to save de entity data.
   * @param options The options parameters.
   */
  public async updateProcessMetadata(
    id: string,
    params: ProcessMetadataUpdateParams,
    options?: ProcessUpdateProcessMetadataOptionalParams,
  ): Promise<ProcessUpdateProcessMetadataResponse> {
    return await this.processOperations.updateProcessMetadata(id, params, options)
  }

  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param params Params to save de entity data.
   * @param options The options parameters.
   */
  public async patchProcessMetadata(
    id: string,
    params: JsonPatchOperation[],
    options?: ProcessPatchProcessMetadataOptionalParams,
  ): Promise<ProcessPatchProcessMetadataResponse> {
    return await this.processOperations.patchProcessMetadata(id, params, options)
  }

  /**
   * Allow to save a JSON validating that the data follow the related schema. If the data is invalid,
   * then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param params Params to save the JSON value.
   * @param options The options parameters.
   */
  public async updateProcessEntity(
    id: string,
    params: ProcessEntityUpdateParams,
    options?: ProcessUpdateProcessEntityOptionalParams,
  ): Promise<ProcessUpdateProcessEntityResponse> {
    return await this.processOperations.updateProcessEntity(id, params, options)
  }

  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param params Params to save the JSON value.
   * @param options The options parameters.
   */
  public async patchProcessEntity(
    id: string,
    params: JsonPatchOperation[],
    options?: ProcessPatchProcessEntityOptionalParams,
  ): Promise<ProcessPatchProcessEntityResponse> {
    return await this.processOperations.patchProcessEntity(id, params, options)
  }

  /**
   * Save a document in the process to later be linked into the JSON data.
   *
   * @param id The resource ID.
   * @param params Params info
   * @param document Document to upload.
   * @param options The options parameters.
   */
  public async uploadProcessEntityDocument(
    id: string,
    params: ProcessUploadProcessEntityDocumentParams,
    document: Document,
    options?: ProcessUploadProcessEntityDocumentOptionalParams,
  ): Promise<ProcessUploadProcessEntityDocumentResponse | undefined> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const file = document.fileContent
    const schemaPath = params.schemaPath

    let rawResponse: FullOperationResponse | undefined = undefined as FullOperationResponse | undefined
    const optionsExt: ProcessUploadProcessUserActionDocumentOptionalParams = {
      ...options,
      onResponse: rawResponseInner => {
        rawResponse = rawResponseInner
      },
    }

    const process = await this.processOperations.uploadProcessEntityDocument(
      id,
      fileContentType,
      fileName,
      schemaPath,
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
   * Given a process and a documentUri, download a document.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  public async downloadProcessEntityDocument(
    id: string,
    documentUri: string,
    options?: ProcessDownloadProcessEntityDocumentOptionalParams,
  ): Promise<ProcessDownloadProcessEntityDocumentResponse> {
    return await this.processOperations.downloadProcessEntityDocument(id, documentUri, options)
  }
}
