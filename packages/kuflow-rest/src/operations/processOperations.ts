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
import { type FullOperationResponse } from '@azure/core-client'

import {
  type KuFlowRestClientGenerated,
  type Process,
  type ProcessActionsProcessCancelOptionalParams,
  type ProcessActionsProcessCancelResponse,
  type ProcessActionsProcessChangeInitiatorOptionalParams,
  type ProcessActionsProcessChangeInitiatorResponse,
  type ProcessActionsProcessCompleteOptionalParams,
  type ProcessActionsProcessCompleteResponse,
  type ProcessActionsProcessDeleteElementOptionalParams,
  type ProcessActionsProcessDeleteElementResponse,
  type ProcessActionsProcessDownloadEntityDocumentOptionalParams,
  type ProcessActionsProcessDownloadEntityDocumentResponse,
  type ProcessActionsProcessSaveElementOptionalParams,
  type ProcessActionsProcessSaveElementResponse,
  type ProcessActionsProcessSaveEntityDataOptionalParams,
  type ProcessActionsProcessSaveEntityDataResponse,
  type ProcessActionsProcessSaveEntityDocumentOptionalParams,
  type ProcessActionsProcessSaveEntityDocumentResponse,
  type ProcessActionsProcessSaveUserActionValueDocumentOptionalParams,
  type ProcessActionsProcessSaveUserActionValueDocumentResponse,
  type ProcessChangeInitiatorCommand,
  type ProcessCreateProcessOptionalParams,
  type ProcessCreateProcessResponse,
  type ProcessDeleteElementCommand,
  type ProcessFindProcessesResponse,
  type ProcessOperations as ProcessOperationsGenerated,
  type ProcessRetrieveProcessOptionalParams,
  type ProcessRetrieveProcessResponse,
  type ProcessSaveElementCommand,
  type ProcessSaveEntityDataCommand,
} from '../generated'
import {
  type Document,
  type ProcessFindProcessesOptionalExtParams,
  type ProcessSaveEntityDocumentRequestCommand,
  type ProcessSaveUserActionValueDocumentCommand,
} from '../models'

/** Class containing ProcessOperations operations. */
export class ProcessOperations {
  private readonly processOperations: ProcessOperationsGenerated

  /**
   * Initialize a new instance of the class ProcessOperations class.
   * @param clientGenerated Reference to the service client
   */
  constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.processOperations = clientGenerated.processOperations
  }

  /**
   * List all the Processes that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  async findProcesses(options?: ProcessFindProcessesOptionalExtParams): Promise<ProcessFindProcessesResponse> {
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
   * @param process Process to create
   * @param options The options parameters.
   */
  async createProcess(
    process: Process,
    options?: ProcessCreateProcessOptionalParams,
  ): Promise<ProcessCreateProcessResponse> {
    return await this.processOperations.createProcess(process, options)
  }

  /**
   * Returns the requested Process when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrieveProcess(
    id: string,
    options?: ProcessRetrieveProcessOptionalParams,
  ): Promise<ProcessRetrieveProcessResponse> {
    return await this.processOperations.retrieveProcess(id, options)
  }

  /**
   * Change the current initiator of a process.
   *
   * Allows you to choose a user (by email or principal identifier) or an application (principal identifier).
   * Only one option will be necessary.
   *
   * @param id The resource ID.
   * @param command Command to change the process initiator.
   * @param options The options parameters.
   */
  async actionsProcessChangeInitiator(
    id: string,
    command: ProcessChangeInitiatorCommand,
    options?: ProcessActionsProcessChangeInitiatorOptionalParams,
  ): Promise<ProcessActionsProcessChangeInitiatorResponse> {
    return await this.processOperations.actionsProcessChangeInitiator(id, command, options)
  }

  /**
   * Allow to save an element.
   *
   * If values already exist for the provided element code, it replaces them with the new ones, otherwise
   * it creates them. The values of the previous elements that no longer exist will be deleted.
   *
   * If the process is already finished the invocations fails with an error.
   *
   * @param id The resource ID.
   * @param command Command to save an element.
   * @param options The options parameters.
   */
  async actionsProcessSaveElement(
    id: string,
    command: ProcessSaveElementCommand,
    options?: ProcessActionsProcessSaveElementOptionalParams,
  ): Promise<ProcessActionsProcessSaveElementResponse> {
    return await this.processOperations.actionsProcessSaveElement(id, command, options)
  }

  /**
   * Allow to delete a process element by specifying the item definition code.
   *
   * Remove all the element values.
   *
   * @param id The resource ID.
   * @param command Command to delete an element.
   * @param options The options parameters.
   */
  async actionsProcessDeleteElement(
    id: string,
    command: ProcessDeleteElementCommand,
    options?: ProcessActionsProcessDeleteElementOptionalParams,
  ): Promise<ProcessActionsProcessDeleteElementResponse> {
    return await this.processOperations.actionsProcessDeleteElement(id, command, options)
  }

  /**
   * Complete a Process. The state of Process is set to 'completed'.
   *
   * If you are already in this state, no action is taken.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async actionsProcessComplete(
    id: string,
    options?: ProcessActionsProcessCompleteOptionalParams,
  ): Promise<ProcessActionsProcessCompleteResponse> {
    return await this.processOperations.actionsProcessComplete(id, options)
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
  async actionsProcessCancel(
    id: string,
    options?: ProcessActionsProcessCancelOptionalParams,
  ): Promise<ProcessActionsProcessCancelResponse> {
    return await this.processOperations.actionsProcessCancel(id, options)
  }

  /**
   * Allow saving a user action document uploading the content.
   *
   * @param id The resource ID.
   * @param command Command info
   * @param document Document to upload.
   * @param options The options parameters.
   *
   * @return the process if the document could be saved or undefined if not
   */
  async actionsProcessSaveUserActionValueDocument(
    id: string,
    command: ProcessSaveUserActionValueDocumentCommand,
    document: Document,
    options?: ProcessActionsProcessSaveUserActionValueDocumentOptionalParams,
  ): Promise<ProcessActionsProcessSaveUserActionValueDocumentResponse | undefined> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const file = document.fileContent
    const userActionValueId = command.userActionValueId

    let rawResponse: FullOperationResponse | undefined
    const optionsExt: ProcessActionsProcessSaveUserActionValueDocumentOptionalParams = {
      ...options,
      onResponse: rawResponseInner => {
        rawResponse = rawResponseInner
      },
    }

    const process = await this.processOperations.actionsProcessSaveUserActionValueDocument(
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
   * Allow to save a JSON validating that the data follow the related schema. If the data is invalid,
   * then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param command Command to save the JSON value.
   * @param options The options parameters.
   */
  async actionsProcessSaveEntityData(
    id: string,
    command: ProcessSaveEntityDataCommand,
    options?: ProcessActionsProcessSaveEntityDataOptionalParams,
  ): Promise<ProcessActionsProcessSaveEntityDataResponse> {
    return await this.processOperations.actionsProcessSaveEntityData(id, command, options)
  }

  /**
   * Save a document in the process to later be linked into the JSON data.
   *
   * @param id The resource ID.
   * @param command Command options
   * @param document Document to upload
   * @param options The options parameters.
   */
  async actionsProcessSaveEntityDocument(
    id: string,
    command: ProcessSaveEntityDocumentRequestCommand,
    document: Document,
    options?: ProcessActionsProcessSaveEntityDocumentOptionalParams,
  ): Promise<ProcessActionsProcessSaveEntityDocumentResponse> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const file = document.fileContent
    const schemaPath = command.schemaPath

    return await this.processOperations.actionsProcessSaveEntityDocument(
      id,
      fileContentType,
      fileName,
      schemaPath,
      file,
      options,
    )
  }

  /**
   * Given a process and a documentUri, download a document.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  async actionsProcessDownloadEntityDocument(
    id: string,
    documentUri: string,
    options?: ProcessActionsProcessDownloadEntityDocumentOptionalParams,
  ): Promise<ProcessActionsProcessDownloadEntityDocumentResponse> {
    return await this.processOperations.actionsProcessDownloadEntityDocument(id, documentUri, options)
  }
}
