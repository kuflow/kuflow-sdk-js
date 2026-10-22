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

import type { KuFlowRestClientGenerated } from '../kuFlowRestClientGenerated'
import type {
  JsonPatchOperation,
  ProcessItemAiAssistanceGenerateParams,
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
  ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentOptionalParams,
  ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentResponse,
  ProcessItemFindProcessItemsOptionalParams,
  ProcessItemFindProcessItemsResponse,
  ProcessItemGenerateProcessItemAiAssistanceOptionalParams,
  ProcessItemGenerateProcessItemAiAssistanceResponse,
  ProcessItemPatchProcessItemTaskDataOptionalParams,
  ProcessItemPatchProcessItemTaskDataResponse,
  ProcessItemRetrieveProcessItemAiAssistanceOptionalParams,
  ProcessItemRetrieveProcessItemAiAssistanceResponse,
  ProcessItemRetrieveProcessItemOptionalParams,
  ProcessItemRetrieveProcessItemResponse,
  ProcessItemTaskAppendLogParams,
  ProcessItemTaskAssignParams,
  ProcessItemTaskContextDataUpdateParams,
  ProcessItemTaskDataUpdateParams,
  ProcessItemUpdateProcessItemTaskContextDataOptionalParams,
  ProcessItemUpdateProcessItemTaskContextDataResponse,
  ProcessItemUpdateProcessItemTaskDataOptionalParams,
  ProcessItemUpdateProcessItemTaskDataResponse,
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
   * To create a `TASK` or a `MESSAGE` inside a thread, set `processItemThreadId` to the id of a Process
   * Item of
   * type `THREAD` that belongs to the same Process.
   *
   * If you want to add document type elements, you can pass a reference to an existing document type
   * element
   * indicating its 'uri'. This will copy that document into the element. In case you want to add a new
   * document,
   * please use the corresponding API method.
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param processItemCreateParams Process Item to be created
   * @param options The options parameters.
   */
  async createProcessItem(
    processItemCreateParams: ProcessItemCreateParams,
    options?: ProcessItemCreateProcessItemOptionalParams,
  ): Promise<ProcessItemCreateProcessItemResponse> {
    return await this.client.sendOperationRequest({ processItemCreateParams, options }, createProcessItemOperationSpec)
  }

  /**
   * Allow to get a process item by ID. A deleted Process Item (the ones of a deleted Process) is
   * returned too,
   * with its `deletedAt` and `deletedBy` fields set.
   *
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
   * Return the status of the latest AI assistance run for the given process item.
   *
   * Poll this endpoint after triggering `generateProcessItemAiAssistance` to determine when
   * the run has finished. Returns 404 when no run has ever been triggered for the process item.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrieveProcessItemAiAssistance(
    id: string,
    options?: ProcessItemRetrieveProcessItemAiAssistanceOptionalParams,
  ): Promise<ProcessItemRetrieveProcessItemAiAssistanceResponse> {
    return await this.client.sendOperationRequest({ id, options }, retrieveProcessItemAiAssistanceOperationSpec)
  }

  /**
   * Trigger an asynchronous AI assistance run for a process item and return its current state,
   * identified
   * by a client-supplied `requestId` (UUID). The `requestId` makes the call idempotent and lets a
   * client launch successive AI assistance attempts on the same process item — one at a time.
   *
   * Behavior given the latest persisted run (if any) for the process item:
   *
   * - No prior run → schedules a new run and returns the initial PENDING state (202).
   * - The stored `requestId` matches the incoming one → returns the current state of that run
   *   without scheduling a new one (200). Use this to poll your own attempt.
   * - The stored `requestId` differs and the run is in a final state (COMPLETED or FAILED) →
   *   schedules a new run on the same record, replacing the previous result (202).
   * - The stored `requestId` differs and the run is still PENDING → rejected with 409, since
   *   another AI assistance attempt is already in progress on this process item.
   *
   * The AI prompt configuration comes from the process item definition.
   *
   * @param id The resource ID.
   * @param processItemAiAssistanceGenerateParams Params identifying this AI assistance attempt.
   * @param options The options parameters.
   */
  async generateProcessItemAiAssistance(
    id: string,
    processItemAiAssistanceGenerateParams: ProcessItemAiAssistanceGenerateParams,
    options?: ProcessItemGenerateProcessItemAiAssistanceOptionalParams,
  ): Promise<ProcessItemGenerateProcessItemAiAssistanceResponse> {
    return await this.client.sendOperationRequest(
      { id, processItemAiAssistanceGenerateParams, options },
      generateProcessItemAiAssistanceOperationSpec,
    )
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
   * @param processItemTaskAssignParams Params to change the process item task owner.
   * @param options The options parameters.
   */
  async assignProcessItemTask(
    id: string,
    processItemTaskAssignParams: ProcessItemTaskAssignParams,
    options?: ProcessItemAssignProcessItemTaskOptionalParams,
  ): Promise<ProcessItemAssignProcessItemTaskResponse> {
    return await this.client.sendOperationRequest(
      { id, processItemTaskAssignParams, options },
      assignProcessItemTaskOperationSpec,
    )
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
   * @param processItemTaskAppendLogParams Log to be created.
   * @param options The options parameters.
   */
  async appendProcessItemTaskLog(
    id: string,
    processItemTaskAppendLogParams: ProcessItemTaskAppendLogParams,
    options?: ProcessItemAppendProcessItemTaskLogOptionalParams,
  ): Promise<ProcessItemAppendProcessItemTaskLogResponse> {
    return await this.client.sendOperationRequest(
      { id, processItemTaskAppendLogParams, options },
      appendProcessItemTaskLogOperationSpec,
    )
  }

  /**
   * Allow to save a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param processItemTaskDataUpdateParams Params used to update the JSON value.
   * @param options The options parameters.
   */
  async updateProcessItemTaskData(
    id: string,
    processItemTaskDataUpdateParams: ProcessItemTaskDataUpdateParams,
    options?: ProcessItemUpdateProcessItemTaskDataOptionalParams,
  ): Promise<ProcessItemUpdateProcessItemTaskDataResponse> {
    return await this.client.sendOperationRequest(
      { id, processItemTaskDataUpdateParams, options },
      updateProcessItemTaskDataOperationSpec,
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
  async patchProcessItemTaskData(
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: ProcessItemPatchProcessItemTaskDataOptionalParams,
  ): Promise<ProcessItemPatchProcessItemTaskDataResponse> {
    return await this.client.sendOperationRequest({ id, jsonPatch, options }, patchProcessItemTaskDataOperationSpec)
  }

  /**
   * Allow to save a JSON context data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param processItemTaskContextDataUpdateParams Params used to update the JSON context data value.
   * @param options The options parameters.
   */
  async updateProcessItemTaskContextData(
    id: string,
    processItemTaskContextDataUpdateParams: ProcessItemTaskContextDataUpdateParams,
    options?: ProcessItemUpdateProcessItemTaskContextDataOptionalParams,
  ): Promise<ProcessItemUpdateProcessItemTaskContextDataResponse> {
    return await this.client.sendOperationRequest(
      { id, processItemTaskContextDataUpdateParams, options },
      updateProcessItemTaskContextDataOperationSpec,
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
    Parameters.processDefinitionId,
    Parameters.processDefinitionCode,
    Parameters.deleted,
    Parameters.processId,
    Parameters.typeParam1,
    Parameters.taskState,
    Parameters.processItemDefinitionCode,
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
  requestBody: Parameters.processItemCreateParams,
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
const retrieveProcessItemAiAssistanceOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/~actions/ai-assistance',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItemAiAssistance,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const generateProcessItemAiAssistanceOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/~actions/ai-assistance',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItemAiAssistance,
    },
    202: {
      bodyMapper: Mappers.ProcessItemAiAssistance,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.processItemAiAssistanceGenerateParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
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
  requestBody: Parameters.processItemTaskAssignParams,
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
  requestBody: Parameters.processItemTaskAppendLogParams,
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
  requestBody: Parameters.processItemTaskDataUpdateParams,
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
  requestBody: Parameters.jsonPatch,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType1],
  mediaType: 'json',
  serializer,
}
const updateProcessItemTaskContextDataOperationSpec: coreClient.OperationSpec = {
  path: '/process-items/{id}/task/context-data',
  httpMethod: 'PUT',
  responses: {
    200: {
      bodyMapper: Mappers.ProcessItem,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.processItemTaskContextDataUpdateParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
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
