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
import * as coreRestPipeline from '@azure/core-rest-pipeline'

import { KuFlowRestClientGenerated } from '../kuFlowRestClientGenerated'
import {
  Log,
  Task,
  TaskActionsTaskAppendLogOptionalParams,
  TaskActionsTaskAppendLogResponse,
  TaskActionsTaskAssignOptionalParams,
  TaskActionsTaskAssignResponse,
  TaskActionsTaskClaimOptionalParams,
  TaskActionsTaskClaimResponse,
  TaskActionsTaskCompleteOptionalParams,
  TaskActionsTaskCompleteResponse,
  TaskActionsTaskDeleteElementOptionalParams,
  TaskActionsTaskDeleteElementResponse,
  TaskActionsTaskDeleteElementValueDocumentOptionalParams,
  TaskActionsTaskDeleteElementValueDocumentResponse,
  TaskActionsTaskDownloadElementValueDocumentOptionalParams,
  TaskActionsTaskDownloadElementValueDocumentResponse,
  TaskActionsTaskDownloadElementValueRenderedOptionalParams,
  TaskActionsTaskDownloadElementValueRenderedResponse,
  TaskActionsTaskSaveElementOptionalParams,
  TaskActionsTaskSaveElementResponse,
  TaskActionsTaskSaveElementValueDocumentOptionalParams,
  TaskActionsTaskSaveElementValueDocumentResponse,
  TaskAssignCommand,
  TaskCreateTaskOptionalParams,
  TaskCreateTaskResponse,
  TaskDeleteElementCommand,
  TaskDeleteElementValueDocumentCommand,
  TaskFindTasksOptionalParams,
  TaskFindTasksResponse,
  TaskRetrieveTaskOptionalParams,
  TaskRetrieveTaskResponse,
  TaskSaveElementCommand,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import { TaskOperations } from '../operationsInterfaces'

/** Class containing TaskOperations operations. */
export class TaskOperationsImpl implements TaskOperations {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class TaskOperations class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * List all Tasks that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt, claimedAt, completedAt, cancelledAt
   *
   * @param options The options parameters.
   */
  async findTasks(options?: TaskFindTasksOptionalParams): Promise<TaskFindTasksResponse> {
    return await this.client.sendOperationRequest({ options }, findTasksOperationSpec)
  }

  /**
   * Create a Task and optionally fill its elements. We can fill in any type of element except documents.
   *
   * If you want to add document type elements, you can pass a reference to an existing document type
   * element indicating its 'uri'. This will copy that document into the element. In case you want to add
   * a new document, please use the corresponding API method.
   *
   * If you want that the task created is claimed you can a valid owner using the following options:
   * * If you know the `principal ID` you can assign it to `owner.id`
   * * If you know the `user ID` you can assign it to `owner.user.id`
   * * If you know the `user email` you can assign it to `owner.user.email`
   * * If you know the `application ID` you can assign it to `owner.application.id`
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param task Task to be created
   * @param options The options parameters.
   */
  async createTask(task: Task, options?: TaskCreateTaskOptionalParams): Promise<TaskCreateTaskResponse> {
    return await this.client.sendOperationRequest({ task, options }, createTaskOperationSpec)
  }

  /**
   * Allow to get a task by ID.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrieveTask(id: string, options?: TaskRetrieveTaskOptionalParams): Promise<TaskRetrieveTaskResponse> {
    return await this.client.sendOperationRequest({ id, options }, retrieveTaskOperationSpec)
  }

  /**
   * Allow to claim a task.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async actionsTaskClaim(
    id: string,
    options?: TaskActionsTaskClaimOptionalParams,
  ): Promise<TaskActionsTaskClaimResponse> {
    return await this.client.sendOperationRequest({ id, options }, actionsTaskClaimOperationSpec)
  }

  /**
   * Allow to assign a task to a user or application. Only one option will be necessary.
   * @param id The resource ID.
   * @param command Command to change the task owner.
   * @param options The options parameters.
   */
  async actionsTaskAssign(
    id: string,
    command: TaskAssignCommand,
    options?: TaskActionsTaskAssignOptionalParams,
  ): Promise<TaskActionsTaskAssignResponse> {
    return await this.client.sendOperationRequest({ id, command, options }, actionsTaskAssignOperationSpec)
  }

  /**
   * Allow to save an element i.e., a field, a decision, a form, a principal or document.
   *
   * In the case of document type elements, this method only allows references to be made to other
   * existing document type elements for the purpose of copying that file into the element. To do this
   * you need to pass a reference to the document using the 'uri' attribute. In case you want to add a
   * new document, please use the corresponding API method. If values already exist for the provided
   * element code, it replaces them with the new ones, otherwise it creates them. The values of the
   * previous elements that no longer exist will be deleted. To remove an element, use the appropriate
   * API method.
   *
   * @param id The resource ID.
   * @param command Command to save an element.
   * @param options The options parameters.
   */
  async actionsTaskSaveElement(
    id: string,
    command: TaskSaveElementCommand,
    options?: TaskActionsTaskSaveElementOptionalParams,
  ): Promise<TaskActionsTaskSaveElementResponse> {
    return await this.client.sendOperationRequest({ id, command, options }, actionsTaskSaveElementOperationSpec)
  }

  /**
   * Allow to save an element document uploading the content.
   *
   * If it is a multiple element, and the ID referenced in the body does not exist or is empty, the
   * document will be added to the element. If the element already exists (the ID referenced in the body
   * corresponds to an existing one), it updates it.
   *
   * @param id The resource ID.
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param elementDefinitionCode Element Definition Code
   * @param file Command to save a document element value.
   * @param options The options parameters.
   */
  async actionsTaskSaveElementValueDocument(
    id: string,
    fileContentType: string,
    fileName: string,
    elementDefinitionCode: string,
    file: coreRestPipeline.RequestBodyType,
    options?: TaskActionsTaskSaveElementValueDocumentOptionalParams,
  ): Promise<TaskActionsTaskSaveElementValueDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, fileContentType, fileName, elementDefinitionCode, file, options },
      actionsTaskSaveElementValueDocumentOperationSpec,
    )
  }

  /**
   * Allow to delete task element by specifying the item definition code.
   *
   * Remove all the element values.
   *
   * @param id The resource ID.
   * @param command Command to delete an element.
   * @param options The options parameters.
   */
  async actionsTaskDeleteElement(
    id: string,
    command: TaskDeleteElementCommand,
    options?: TaskActionsTaskDeleteElementOptionalParams,
  ): Promise<TaskActionsTaskDeleteElementResponse> {
    return await this.client.sendOperationRequest({ id, command, options }, actionsTaskDeleteElementOperationSpec)
  }

  /**
   * Allow to delete a specific document from an element of document type using its id.
   *
   * Note: If it is a multiple item, it will only delete the specified document. If it is a single
   * element, in addition to the document, it will also delete the element.
   *
   * @param id The resource ID.
   * @param command Command to delete a document elemente value.
   * @param options The options parameters.
   */
  async actionsTaskDeleteElementValueDocument(
    id: string,
    command: TaskDeleteElementValueDocumentCommand,
    options?: TaskActionsTaskDeleteElementValueDocumentOptionalParams,
  ): Promise<TaskActionsTaskDeleteElementValueDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, command, options },
      actionsTaskDeleteElementValueDocumentOperationSpec,
    )
  }

  /**
   * Given a task, download a document from an element of document type.
   * @param id The resource ID.
   * @param documentId Document ID to download.
   * @param options The options parameters.
   */
  async actionsTaskDownloadElementValueDocument(
    id: string,
    documentId: string,
    options?: TaskActionsTaskDownloadElementValueDocumentOptionalParams,
  ): Promise<TaskActionsTaskDownloadElementValueDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, documentId, options },
      actionsTaskDownloadElementValueDocumentOperationSpec,
    )
  }

  /**
   * Given a task, generate a PDF from a Form type element with the data filled in, if any. If there are
   * multiple form values, they are packed into a ZIP.
   *
   * Important!: To use this feature, please contact to kuflow@kuflow.com
   *
   * @param id The resource ID.
   * @param elementDefinitionCode Element definition code of a Form Element to download.
   * @param options The options parameters.
   */
  async actionsTaskDownloadElementValueRendered(
    id: string,
    elementDefinitionCode: string,
    options?: TaskActionsTaskDownloadElementValueRenderedOptionalParams,
  ): Promise<TaskActionsTaskDownloadElementValueRenderedResponse> {
    return await this.client.sendOperationRequest(
      { id, elementDefinitionCode, options },
      actionsTaskDownloadElementValueRenderedOperationSpec,
    )
  }

  /**
   * Allow to complete a claimed task by the principal.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async actionsTaskComplete(
    id: string,
    options?: TaskActionsTaskCompleteOptionalParams,
  ): Promise<TaskActionsTaskCompleteResponse> {
    return await this.client.sendOperationRequest({ id, options }, actionsTaskCompleteOperationSpec)
  }

  /**
   * A log entry is added to the task. If the number of log entries is reached, the oldest log entry is
   * removed.
   *
   * @param id The resource ID.
   * @param log Log to be created.
   * @param options The options parameters.
   */
  async actionsTaskAppendLog(
    id: string,
    log: Log,
    options?: TaskActionsTaskAppendLogOptionalParams,
  ): Promise<TaskActionsTaskAppendLogResponse> {
    return await this.client.sendOperationRequest({ id, log, options }, actionsTaskAppendLogOperationSpec)
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const findTasksOperationSpec: coreClient.OperationSpec = {
  path: '/tasks',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.TaskPage,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [
    Parameters.size,
    Parameters.page,
    Parameters.sort,
    Parameters.processId,
    Parameters.state,
    Parameters.taskDefinitionCode,
  ],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
}
const createTaskOperationSpec: coreClient.OperationSpec = {
  path: '/tasks',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    201: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.task,
  queryParameters: [Parameters.activityToken],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
}
const retrieveTaskOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const actionsTaskClaimOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/claim',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const actionsTaskAssignOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/assign',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.command3,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
}
const actionsTaskSaveElementOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/save-element',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.command4,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
}
const actionsTaskSaveElementValueDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/save-element-value-document',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.file,
  queryParameters: [
    Parameters.fileContentType,
    Parameters.fileName,
    Parameters.elementDefinitionCode,
    Parameters.elementValueId,
    Parameters.elementValueValid,
  ],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType1, Parameters.accept1],
  mediaType: 'binary',
  serializer,
}
const actionsTaskDeleteElementOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/delete-element',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.command5,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
}
const actionsTaskDeleteElementValueDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/delete-element-value-document',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.command6,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
}
const actionsTaskDownloadElementValueDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/download-element-value-document',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: { type: { name: 'Stream' }, serializedName: 'parsedResponse' },
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.documentId],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept2],
  serializer,
}
const actionsTaskDownloadElementValueRenderedOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/download-element-value-form-rendered',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: { type: { name: 'Stream' }, serializedName: 'parsedResponse' },
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.elementDefinitionCode],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept3],
  serializer,
}
const actionsTaskCompleteOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/complete',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const actionsTaskAppendLogOperationSpec: coreClient.OperationSpec = {
  path: '/tasks/{id}/~actions/append-log',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Task,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.log,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
}
