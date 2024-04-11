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
import * as coreClient from '@azure/core-client'
import type * as coreRestPipeline from '@azure/core-rest-pipeline'

import { type KuFlowRestClientGenerated } from '../kuFlowRestClientGenerated'
import {
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
  type ProcessFindProcessesOptionalParams,
  type ProcessFindProcessesResponse,
  type ProcessRetrieveProcessOptionalParams,
  type ProcessRetrieveProcessResponse,
  type ProcessSaveElementCommand,
  type ProcessSaveEntityDataCommand,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import { type ProcessOperations } from '../operationsInterfaces'

/** Class containing ProcessOperations operations. */
export class ProcessOperationsImpl implements ProcessOperations {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class ProcessOperations class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * List all the Processes that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  async findProcesses(options?: ProcessFindProcessesOptionalParams): Promise<ProcessFindProcessesResponse> {
    return await this.client.sendOperationRequest({ options }, findProcessesOperationSpec)
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
    return await this.client.sendOperationRequest({ process, options }, createProcessOperationSpec)
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
    return await this.client.sendOperationRequest({ id, options }, retrieveProcessOperationSpec)
  }

  /**
   * Change the current initiator of a process.
   *
   * Allows you to choose a user (by email or principal identifier) or an application (principal
   * identifier).
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
    return await this.client.sendOperationRequest({ id, command, options }, actionsProcessChangeInitiatorOperationSpec)
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
    return await this.client.sendOperationRequest({ id, command, options }, actionsProcessSaveElementOperationSpec)
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
    return await this.client.sendOperationRequest({ id, command, options }, actionsProcessDeleteElementOperationSpec)
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
    return await this.client.sendOperationRequest({ id, options }, actionsProcessCompleteOperationSpec)
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
    return await this.client.sendOperationRequest({ id, options }, actionsProcessCancelOperationSpec)
  }

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
  async actionsProcessSaveUserActionValueDocument(
    id: string,
    fileContentType: string,
    fileName: string,
    userActionValueId: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessActionsProcessSaveUserActionValueDocumentOptionalParams,
  ): Promise<ProcessActionsProcessSaveUserActionValueDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, fileContentType, fileName, userActionValueId, file, options },
      actionsProcessSaveUserActionValueDocumentOperationSpec,
    )
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
    return await this.client.sendOperationRequest({ id, command, options }, actionsProcessSaveEntityDataOperationSpec)
  }

  /**
   * Save a document in the process to later be linked into the JSON data.
   *
   * @param id The resource ID.
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param schemaPath JSON Schema path related to the document. The uploaded document will be validated
   *                   by the passed schema path.
   *
   * @param file Document to save.
   * @param options The options parameters.
   */
  async actionsProcessSaveEntityDocument(
    id: string,
    fileContentType: string,
    fileName: string,
    schemaPath: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessActionsProcessSaveEntityDocumentOptionalParams,
  ): Promise<ProcessActionsProcessSaveEntityDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, fileContentType, fileName, schemaPath, file, options },
      actionsProcessSaveEntityDocumentOperationSpec,
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
    return await this.client.sendOperationRequest(
      { id, documentUri, options },
      actionsProcessDownloadEntityDocumentOperationSpec,
    )
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const findProcessesOperationSpec: coreClient.OperationSpec = {
  path: '/processes',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessPage,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.size, Parameters.page, Parameters.sort, Parameters.tenantId],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
}
const createProcessOperationSpec: coreClient.OperationSpec = {
  path: '/processes',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    201: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.process,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const retrieveProcessOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const actionsProcessChangeInitiatorOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/change-initiator',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.command,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const actionsProcessSaveElementOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/save-element',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.command1,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const actionsProcessDeleteElementOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/delete-element',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.command2,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const actionsProcessCompleteOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/complete',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const actionsProcessCancelOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/cancel',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const actionsProcessSaveUserActionValueDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/save-user-action-value-document',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    304: {},
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.file,
  queryParameters: [Parameters.fileContentType, Parameters.fileName, Parameters.userActionValueId],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType1, Parameters.accept1],
  mediaType: 'binary',
  serializer,
}
const actionsProcessSaveEntityDataOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/save-entity-data',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.command3,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const actionsProcessSaveEntityDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/save-entity-document',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessSaveEntityDocumentResponseCommand,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.file,
  queryParameters: [Parameters.fileContentType, Parameters.fileName, Parameters.schemaPath],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType1, Parameters.accept1],
  mediaType: 'binary',
  serializer,
}
const actionsProcessDownloadEntityDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/download-entity-document',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: {
        type: { name: 'Stream' },
        serializedName: 'parsedResponse',
      },
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.documentUri],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept2],
  serializer,
}
