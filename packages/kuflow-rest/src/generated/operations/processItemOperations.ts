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
  ProcessItemAppendProcessItemTaskLogOptionalParams,
  ProcessItemAppendProcessItemTaskLogResponse,
  ProcessItemAssignProcessItemTaskOptionalParams,
  ProcessItemAssignProcessItemTaskResponse,
  ProcessItemClaimProcessItemTaskOptionalParams,
  ProcessItemClaimProcessItemTaskResponse,
  ProcessItemCompleteProcessItemTaskOptionalParams,
  ProcessItemCompleteProcessItemTaskResponse,
  ProcessItemCreateParams,
  ProcessItemCreateProcessItemOptionalParams,
  ProcessItemCreateProcessItemResponse,
  ProcessItemDownloadProcessItemTaskDataDocumentOptionalParams,
  ProcessItemDownloadProcessItemTaskDataDocumentResponse,
  ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentOptionalParams,
  ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentResponse,
  ProcessItemFindProcessItemsOptionalParams,
  ProcessItemFindProcessItemsResponse,
  ProcessItemPatchProcessItemTaskDataOptionalParams,
  ProcessItemPatchProcessItemTaskDataResponse,
  ProcessItemRetrieveProcessItemOptionalParams,
  ProcessItemRetrieveProcessItemResponse,
  ProcessItemTaskAppendLogParams,
  ProcessItemTaskAssignParams,
  ProcessItemTaskDataUpdateParams,
  ProcessItemUpdateProcessItemTaskDataOptionalParams,
  ProcessItemUpdateProcessItemTaskDataResponse,
  ProcessItemUploadProcessItemTaskDataDocumentOptionalParams,
  ProcessItemUploadProcessItemTaskDataDocumentResponse,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import type { ProcessItemOperations } from '../operationsInterfaces'

/** Class containing ProcessItemOperations operations. */
export class ProcessItemOperationsImpl implements ProcessItemOperations {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class ProcessItemOperations class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * List all Process Items that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt, claimedAt, completedAt, cancelledAt
   *
   * @param options The options parameters.
   */
  async findProcessItems(
    options?: ProcessItemFindProcessItemsOptionalParams,
  ): Promise<ProcessItemFindProcessItemsResponse> {
    return await this.client.sendOperationRequest({ options }, findProcessItemsOperationSpec)
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
  async createProcessItem(
    params: ProcessItemCreateParams,
    options?: ProcessItemCreateProcessItemOptionalParams,
  ): Promise<ProcessItemCreateProcessItemResponse> {
    return await this.client.sendOperationRequest({ params, options }, createProcessItemOperationSpec)
  }

  /**
   * Allow to get a process item by ID.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrieveProcessItem(
    id: string,
    options?: ProcessItemRetrieveProcessItemOptionalParams,
  ): Promise<ProcessItemRetrieveProcessItemResponse> {
    return await this.client.sendOperationRequest({ id, options }, retrieveProcessItemOperationSpec)
  }

  /**
   * Allow to claim a task.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async claimProcessItemTask(
    id: string,
    options?: ProcessItemClaimProcessItemTaskOptionalParams,
  ): Promise<ProcessItemClaimProcessItemTaskResponse> {
    return await this.client.sendOperationRequest({ id, options }, claimProcessItemTaskOperationSpec)
  }

  /**
   * Allow to assign a process item task to a user or application. Only one option will be necessary.
   * @param id The resource ID.
   * @param params Params to change the process item task owner.
   * @param options The options parameters.
   */
  async assignProcessItemTask(
    id: string,
    params: ProcessItemTaskAssignParams,
    options?: ProcessItemAssignProcessItemTaskOptionalParams,
  ): Promise<ProcessItemAssignProcessItemTaskResponse> {
    return await this.client.sendOperationRequest({ id, params, options }, assignProcessItemTaskOperationSpec)
  }

  /**
   * Allow to complete a claimed task by the principal.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async completeProcessItemTask(
    id: string,
    options?: ProcessItemCompleteProcessItemTaskOptionalParams,
  ): Promise<ProcessItemCompleteProcessItemTaskResponse> {
    return await this.client.sendOperationRequest({ id, options }, completeProcessItemTaskOperationSpec)
  }

  /**
   * A log entry is added to the task. If the number of log entries is reached, the oldest log entry is
   * removed.
   *
   * @param id The resource ID.
   * @param params Log to be created.
   * @param options The options parameters.
   */
  async appendProcessItemTaskLog(
    id: string,
    params: ProcessItemTaskAppendLogParams,
    options?: ProcessItemAppendProcessItemTaskLogOptionalParams,
  ): Promise<ProcessItemAppendProcessItemTaskLogResponse> {
    return await this.client.sendOperationRequest({ id, params, options }, appendProcessItemTaskLogOperationSpec)
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
  async updateProcessItemTaskData(
    id: string,
    params: ProcessItemTaskDataUpdateParams,
    options?: ProcessItemUpdateProcessItemTaskDataOptionalParams,
  ): Promise<ProcessItemUpdateProcessItemTaskDataResponse> {
    return await this.client.sendOperationRequest({ id, params, options }, updateProcessItemTaskDataOperationSpec)
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
  async patchProcessItemTaskData(
    id: string,
    params: JsonPatchOperation[],
    options?: ProcessItemPatchProcessItemTaskDataOptionalParams,
  ): Promise<ProcessItemPatchProcessItemTaskDataResponse> {
    return await this.client.sendOperationRequest({ id, params, options }, patchProcessItemTaskDataOperationSpec)
  }

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
  async uploadProcessItemTaskDataDocument(
    id: string,
    fileContentType: string,
    fileName: string,
    schemaPath: string,
    file: coreRestPipeline.RequestBodyType,
    options?: ProcessItemUploadProcessItemTaskDataDocumentOptionalParams,
  ): Promise<ProcessItemUploadProcessItemTaskDataDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, fileContentType, fileName, schemaPath, file, options },
      uploadProcessItemTaskDataDocumentOperationSpec,
    )
  }

  /**
   * Given a task, download a document from a json form data.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  async downloadProcessItemTaskDataDocument(
    id: string,
    documentUri: string,
    options?: ProcessItemDownloadProcessItemTaskDataDocumentOptionalParams,
  ): Promise<ProcessItemDownloadProcessItemTaskDataDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, documentUri, options },
      downloadProcessItemTaskDataDocumentOperationSpec,
    )
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
  async downloadProcessItemTaskDataWebformsAsDocument(
    id: string,
    propertyPath: string,
    options?: ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentOptionalParams,
  ): Promise<ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, propertyPath, options },
      downloadProcessItemTaskDataWebformsAsDocumentOperationSpec,
    )
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const findProcessItemsOperationSpec: coreClient.OperationSpec = {
  path: '/process-items',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItemPage,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [
    Parameters.size,
    Parameters.page,
    Parameters.sort,
    Parameters.tenantId,
    Parameters.processId,
    Parameters.typeParam1,
    Parameters.taskState,
    Parameters.taskDefinitionCode,
  ],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
}
const createProcessItemOperationSpec: coreClient.OperationSpec = {
  path: '/process-items',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    201: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.params6,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const retrieveProcessItemOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const claimProcessItemTaskOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/~actions/claim',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const assignProcessItemTaskOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/~actions/assign',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.params7,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const completeProcessItemTaskOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/~actions/complete',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const appendProcessItemTaskLogOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/~actions/append-log',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.params8,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const updateProcessItemTaskDataOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/data',
  httpMethod: 'PUT',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.params9,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const patchProcessItemTaskDataOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/data',
  httpMethod: 'PATCH',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.params5,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType2],
  mediaType: 'json',
  serializer,
}
const uploadProcessItemTaskDataDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/data/~actions/upload-document',
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
  queryParameters: [Parameters.fileContentType, Parameters.fileName, Parameters.schemaPath],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType1, Parameters.accept1],
  mediaType: 'binary',
  serializer,
}
const downloadProcessItemTaskDataDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/data/~actions/download-document',
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
const downloadProcessItemTaskDataWebformsAsDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/data/~actions/download-webforms-as-document',
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
  queryParameters: [Parameters.propertyPath],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept3],
  serializer,
}
