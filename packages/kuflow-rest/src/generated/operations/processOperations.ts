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

import type { KuFlowRestClientGenerated } from '../kuFlowRestClientGenerated'
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
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import type { ProcessOperations } from '../operationsInterfaces'

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
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param processCreateParams Process to create
   * @param options The options parameters.
   */
  async createProcess(
    processCreateParams: ProcessCreateParams,
    options?: ProcessCreateProcessOptionalParams,
  ): Promise<ProcessCreateProcessResponse> {
    return await this.client.sendOperationRequest({ processCreateParams, options }, createProcessOperationSpec)
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
   * Complete a Process. The state of Process is set to 'completed'.
   *
   * If you are already in this state, no action is taken.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async completeProcess(
    id: string,
    options?: ProcessCompleteProcessOptionalParams,
  ): Promise<ProcessCompleteProcessResponse> {
    return await this.client.sendOperationRequest({ id, options }, completeProcessOperationSpec)
  }

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
  async cancelProcess(id: string, options?: ProcessCancelProcessOptionalParams): Promise<ProcessCancelProcessResponse> {
    return await this.client.sendOperationRequest({ id, options }, cancelProcessOperationSpec)
  }

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
  async changeProcessInitiator(
    id: string,
    processChangeInitiatorParams: ProcessChangeInitiatorParams,
    options?: ProcessChangeProcessInitiatorOptionalParams,
  ): Promise<ProcessChangeProcessInitiatorResponse> {
    return await this.client.sendOperationRequest(
      { id, processChangeInitiatorParams, options },
      changeProcessInitiatorOperationSpec,
    )
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
  async uploadProcessUserActionDocument(
    id: string,
    fileContentType: string,
    fileName: string,
    userActionValueId: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessUploadProcessUserActionDocumentOptionalParams,
  ): Promise<ProcessUploadProcessUserActionDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, fileContentType, fileName, userActionValueId, file, options },
      uploadProcessUserActionDocumentOperationSpec,
    )
  }

  /**
   * Save process metadata
   * @param id The resource ID.
   * @param processMetadataUpdateParams Params to save the metadata data.
   * @param options The options parameters.
   */
  async updateProcessMetadata(
    id: string,
    processMetadataUpdateParams: ProcessMetadataUpdateParams,
    options?: ProcessUpdateProcessMetadataOptionalParams,
  ): Promise<ProcessUpdateProcessMetadataResponse> {
    return await this.client.sendOperationRequest(
      { id, processMetadataUpdateParams, options },
      updateProcessMetadataOperationSpec,
    )
  }

  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save the JSON value.
   * @param options The options parameters.
   */
  async patchProcessMetadata(
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: ProcessPatchProcessMetadataOptionalParams,
  ): Promise<ProcessPatchProcessMetadataResponse> {
    return await this.client.sendOperationRequest({ id, jsonPatch, options }, patchProcessMetadataOperationSpec)
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
  async updateProcessEntity(
    id: string,
    processEntityUpdateParams: ProcessEntityUpdateParams,
    options?: ProcessUpdateProcessEntityOptionalParams,
  ): Promise<ProcessUpdateProcessEntityResponse> {
    return await this.client.sendOperationRequest(
      { id, processEntityUpdateParams, options },
      updateProcessEntityOperationSpec,
    )
  }

  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save the JSON value.
   * @param options The options parameters.
   */
  async patchProcessEntity(
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: ProcessPatchProcessEntityOptionalParams,
  ): Promise<ProcessPatchProcessEntityResponse> {
    return await this.client.sendOperationRequest({ id, jsonPatch, options }, patchProcessEntityOperationSpec)
  }

  /**
   * Upload a temporal document into the process that later on must be linked with a process domain
   * resource.
   *
   * Documents uploaded with this API will be deleted after 24 hours as long as they have not been linked
   * to a
   * process or process item..
   *
   * @param id The resource ID.
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param file Document to save.
   * @param options The options parameters.
   */
  async uploadProcessDocument(
    id: string,
    fileContentType: string,
    fileName: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessUploadProcessDocumentOptionalParams,
  ): Promise<ProcessUploadProcessDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, fileContentType, fileName, file, options },
      uploadProcessDocumentOperationSpec,
    )
  }

  /**
   * Given a document uri download a document.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  async downloadProcessDocument(
    id: string,
    documentUri: string,
    options?: ProcessDownloadProcessDocumentOptionalParams,
  ): Promise<ProcessDownloadProcessDocumentResponse> {
    return await this.client.sendOperationRequest({ id, documentUri, options }, downloadProcessDocumentOperationSpec)
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
  requestBody: Parameters.processCreateParams,
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
const completeProcessOperationSpec: coreClient.OperationSpec = {
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
const cancelProcessOperationSpec: coreClient.OperationSpec = {
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
const changeProcessInitiatorOperationSpec: coreClient.OperationSpec = {
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
  requestBody: Parameters.processChangeInitiatorParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const uploadProcessUserActionDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/upload-user-action-document',
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
const updateProcessMetadataOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/metadata',
  httpMethod: 'PUT',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.processMetadataUpdateParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const patchProcessMetadataOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/metadata',
  httpMethod: 'PATCH',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.jsonPatch,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType2],
  mediaType: 'json',
  serializer,
}
const updateProcessEntityOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/entity',
  httpMethod: 'PUT',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.processEntityUpdateParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const patchProcessEntityOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/entity',
  httpMethod: 'PATCH',
  responses: {
    200: {
      bodyMapper: Mappers.Process,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.jsonPatch,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType2],
  mediaType: 'json',
  serializer,
}
const uploadProcessDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/upload-document',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.DocumentReference,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.file,
  queryParameters: [Parameters.fileContentType, Parameters.fileName],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType1, Parameters.accept1],
  mediaType: 'binary',
  serializer,
}
const downloadProcessDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/processes/{id}/~actions/download-document',
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
