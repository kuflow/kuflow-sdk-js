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
import * as coreRestPipeline from '@azure/core-rest-pipeline'

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

/** Interface representing a TaskOperations. */
export interface TaskOperations {
  /**
   * List all Tasks that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt, claimedAt, completedAt, cancelledAt
   *
   * @param options The options parameters.
   */
  findTasks: (options?: TaskFindTasksOptionalParams) => Promise<TaskFindTasksResponse>
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
  createTask: (task: Task, options?: TaskCreateTaskOptionalParams) => Promise<TaskCreateTaskResponse>
  /**
   * Allow to get a task by ID.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  retrieveTask: (id: string, options?: TaskRetrieveTaskOptionalParams) => Promise<TaskRetrieveTaskResponse>
  /**
   * Allow to claim a task.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  actionsTaskClaim: (id: string, options?: TaskActionsTaskClaimOptionalParams) => Promise<TaskActionsTaskClaimResponse>
  /**
   * Allow to assign a task to a user or application. Only one option will be necessary.
   * @param id The resource ID.
   * @param command Command to change the task owner.
   * @param options The options parameters.
   */
  actionsTaskAssign: (
    id: string,
    command: TaskAssignCommand,
    options?: TaskActionsTaskAssignOptionalParams,
  ) => Promise<TaskActionsTaskAssignResponse>
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
  actionsTaskSaveElement: (
    id: string,
    command: TaskSaveElementCommand,
    options?: TaskActionsTaskSaveElementOptionalParams,
  ) => Promise<TaskActionsTaskSaveElementResponse>
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
  actionsTaskSaveElementValueDocument: (
    id: string,
    fileContentType: string,
    fileName: string,
    elementDefinitionCode: string,
    file: coreRestPipeline.RequestBodyType,
    options?: TaskActionsTaskSaveElementValueDocumentOptionalParams,
  ) => Promise<TaskActionsTaskSaveElementValueDocumentResponse>
  /**
   * Allow to delete task element by specifying the item definition code.
   *
   * Remove all the element values.
   *
   * @param id The resource ID.
   * @param command Command to delete an element.
   * @param options The options parameters.
   */
  actionsTaskDeleteElement: (
    id: string,
    command: TaskDeleteElementCommand,
    options?: TaskActionsTaskDeleteElementOptionalParams,
  ) => Promise<TaskActionsTaskDeleteElementResponse>
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
  actionsTaskDeleteElementValueDocument: (
    id: string,
    command: TaskDeleteElementValueDocumentCommand,
    options?: TaskActionsTaskDeleteElementValueDocumentOptionalParams,
  ) => Promise<TaskActionsTaskDeleteElementValueDocumentResponse>
  /**
   * Given a task, download a document from an element of document type.
   * @param id The resource ID.
   * @param documentId Document ID to download.
   * @param options The options parameters.
   */
  actionsTaskDownloadElementValueDocument: (
    id: string,
    documentId: string,
    options?: TaskActionsTaskDownloadElementValueDocumentOptionalParams,
  ) => Promise<TaskActionsTaskDownloadElementValueDocumentResponse>
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
  actionsTaskDownloadElementValueRendered: (
    id: string,
    elementDefinitionCode: string,
    options?: TaskActionsTaskDownloadElementValueRenderedOptionalParams,
  ) => Promise<TaskActionsTaskDownloadElementValueRenderedResponse>
  /**
   * Allow to complete a claimed task by the principal.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  actionsTaskComplete: (
    id: string,
    options?: TaskActionsTaskCompleteOptionalParams,
  ) => Promise<TaskActionsTaskCompleteResponse>
  /**
   * A log entry is added to the task. If the number of log entries is reached, the oldest log entry is
   * removed.
   *
   * @param id The resource ID.
   * @param log Log to be created.
   * @param options The options parameters.
   */
  actionsTaskAppendLog: (
    id: string,
    log: Log,
    options?: TaskActionsTaskAppendLogOptionalParams,
  ) => Promise<TaskActionsTaskAppendLogResponse>
}
