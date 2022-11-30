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
import { FullOperationResponse } from '@azure/core-client'

import {
  KuFlowRestClientGenerated,
  Process,
  ProcessActionsProcessCancelOptionalParams,
  ProcessActionsProcessCancelResponse,
  ProcessActionsProcessChangeInitiatorOptionalParams,
  ProcessActionsProcessChangeInitiatorResponse,
  ProcessActionsProcessCompleteOptionalParams,
  ProcessActionsProcessCompleteResponse,
  ProcessActionsProcessDeleteElementOptionalParams,
  ProcessActionsProcessDeleteElementResponse,
  ProcessActionsProcessSaveElementOptionalParams,
  ProcessActionsProcessSaveElementResponse,
  ProcessActionsProcessSaveUserActionValueDocumentOptionalParams,
  ProcessActionsProcessSaveUserActionValueDocumentResponse,
  ProcessChangeInitiatorCommand,
  ProcessCreateProcessOptionalParams,
  ProcessCreateProcessResponse,
  ProcessDeleteElementCommand,
  ProcessFindProcessesResponse,
  ProcessOperations as ProcessOperationsGenerated,
  ProcessRetrieveProcessOptionalParams,
  ProcessRetrieveProcessResponse,
  ProcessSaveElementCommand,
} from '../generated'
import { Document, ProcessFindProcessesOptionalExtParams, ProcessSaveUserActionValueDocumentCommand } from '../models'

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
    const { sort, ...optionsRest } = options ?? {}

    return await this.processOperations.findProcesses({
      ...optionsRest,
      sort: typeof sort === 'string' ? [sort] : sort,
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
}
