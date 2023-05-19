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
import {
  type KuFlowRestClientGenerated,
  type Log,
  type Task,
  type TaskActionsTaskAppendLogOptionalParams,
  type TaskActionsTaskAppendLogResponse,
  type TaskActionsTaskAssignOptionalParams,
  type TaskActionsTaskAssignResponse,
  type TaskActionsTaskClaimOptionalParams,
  type TaskActionsTaskClaimResponse,
  type TaskActionsTaskCompleteOptionalParams,
  type TaskActionsTaskCompleteResponse,
  type TaskActionsTaskDeleteElementOptionalParams,
  type TaskActionsTaskDeleteElementResponse,
  type TaskActionsTaskDeleteElementValueDocumentOptionalParams,
  type TaskActionsTaskDeleteElementValueDocumentResponse,
  type TaskActionsTaskDownloadElementValueDocumentOptionalParams,
  type TaskActionsTaskDownloadElementValueDocumentResponse,
  type TaskActionsTaskDownloadElementValueRenderedOptionalParams,
  type TaskActionsTaskDownloadElementValueRenderedResponse,
  type TaskActionsTaskDownloadJsonFormsValueDocumentOptionalParams,
  type TaskActionsTaskDownloadJsonFormsValueDocumentResponse,
  type TaskActionsTaskSaveElementOptionalParams,
  type TaskActionsTaskSaveElementResponse,
  type TaskActionsTaskSaveElementValueDocumentOptionalParams,
  type TaskActionsTaskSaveElementValueDocumentResponse,
  type TaskActionsTaskSaveJsonFormsValueDataOptionalParams,
  type TaskActionsTaskSaveJsonFormsValueDataResponse,
  type TaskActionsTaskSaveJsonFormsValueDocumentOptionalParams,
  type TaskActionsTaskSaveJsonFormsValueDocumentResponse,
  type TaskAssignCommand,
  type TaskCreateTaskOptionalParams,
  type TaskCreateTaskResponse,
  type TaskDeleteElementCommand,
  type TaskDeleteElementValueDocumentCommand,
  type TaskFindTasksResponse,
  type TaskOperations as TaskOperationsGenerated,
  type TaskRetrieveTaskOptionalParams,
  type TaskRetrieveTaskResponse,
  type TaskSaveElementCommand,
  type TaskSaveJsonFormsValueDataCommand,
} from '../generated'
import {
  type Document,
  type TaskFindTasksOptionalExtParams,
  type TaskSaveElementValueDocumentCommand,
  type TaskSaveJsonFormsValueDocumentRequestCommand,
} from '../models'

/** Class containing TaskOperations operations. */
export class TaskOperations {
  private readonly taskOperations: TaskOperationsGenerated

  /**
   * Initialize a new instance of the class TaskOperations class.
   * @param clientGenerated Reference to the service client
   */
  constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.taskOperations = clientGenerated.taskOperations
  }

  /**
   * List all Tasks that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt, claimedAt, completedAt, cancelledAt
   *
   * @param options The options parameters.
   */
  public async findTasks(options?: TaskFindTasksOptionalExtParams): Promise<TaskFindTasksResponse> {
    const { sort, processId, state, taskDefinitionCode, ...optionsRest } = options ?? {}

    return await this.taskOperations.findTasks({
      ...optionsRest,
      sort: typeof sort === 'string' ? [sort] : sort,
      processId: typeof processId === 'string' ? [processId] : processId,
      state: typeof state === 'string' ? [state] : state,
      taskDefinitionCode: typeof taskDefinitionCode === 'string' ? [taskDefinitionCode] : taskDefinitionCode,
    })
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
  public async createTask(task: Task, options?: TaskCreateTaskOptionalParams): Promise<TaskCreateTaskResponse> {
    return await this.taskOperations.createTask(task, options)
  }

  /**
   * Allow to get a task by ID.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async retrieveTask(id: string, options?: TaskRetrieveTaskOptionalParams): Promise<TaskRetrieveTaskResponse> {
    return await this.taskOperations.retrieveTask(id, options)
  }

  /**
   * Allow to claim a task.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async actionsTaskClaim(
    id: string,
    options?: TaskActionsTaskClaimOptionalParams,
  ): Promise<TaskActionsTaskClaimResponse> {
    return await this.taskOperations.actionsTaskClaim(id, options)
  }

  /**
   * Allow to assign a task to a user or application. Only one option will be necessary.
   * @param id The resource ID.
   * @param command Command to change the task owner.
   * @param options The options parameters.
   */
  public async actionsTaskAssign(
    id: string,
    command: TaskAssignCommand,
    options?: TaskActionsTaskAssignOptionalParams,
  ): Promise<TaskActionsTaskAssignResponse> {
    return await this.taskOperations.actionsTaskAssign(id, command, options)
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
  public async actionsTaskSaveElement(
    id: string,
    command: TaskSaveElementCommand,
    options?: TaskActionsTaskSaveElementOptionalParams,
  ): Promise<TaskActionsTaskSaveElementResponse> {
    return await this.taskOperations.actionsTaskSaveElement(id, command, options)
  }

  /**
   * Allow to save an element document uploading the content.
   *
   * If it is a multiple element, and the ID referenced in the body does not exist or is empty, the
   * document will be added to the element. If the element already exists (the ID referenced in the body
   * corresponds to an existing one), it updates it.
   *
   * @param id The resource ID.
   * @param command Command info.
   * @param document Document to upload.
   * @param options The options parameters.
   */
  public async actionsTaskSaveElementValueDocument(
    id: string,
    command: TaskSaveElementValueDocumentCommand,
    document: Document,
    options?: TaskActionsTaskSaveElementValueDocumentOptionalParams,
  ): Promise<TaskActionsTaskSaveElementValueDocumentResponse> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const elementDefinitionCode = command.elementDefinitionCode
    const file = document.fileContent
    const elementValueId = command.elementValueId ?? options?.elementValueId
    const elementValueValid = command.elementValueValid ?? options?.elementValueValid
    options = {
      ...options,
      elementValueId,
      elementValueValid,
    }

    return await this.taskOperations.actionsTaskSaveElementValueDocument(
      id,
      fileContentType,
      fileName,
      elementDefinitionCode,
      file,
      options,
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
  public async actionsTaskDeleteElement(
    id: string,
    command: TaskDeleteElementCommand,
    options?: TaskActionsTaskDeleteElementOptionalParams,
  ): Promise<TaskActionsTaskDeleteElementResponse> {
    return await this.taskOperations.actionsTaskDeleteElement(id, command, options)
  }

  /**
   * Allow to delete a specific document from an element of document type using its id.
   *
   * Note: If it is a multiple item, it will only delete the specified document. If it is a single
   * element, in addition to the document, it will also delete the element.
   *
   * @param id The resource ID.
   * @param command Command to delete a document element value.
   * @param options The options parameters.
   */
  public async actionsTaskDeleteElementValueDocument(
    id: string,
    command: TaskDeleteElementValueDocumentCommand,
    options?: TaskActionsTaskDeleteElementValueDocumentOptionalParams,
  ): Promise<TaskActionsTaskDeleteElementValueDocumentResponse> {
    return await this.taskOperations.actionsTaskDeleteElementValueDocument(id, command, options)
  }

  /**
   * Given a task, download a document from an element of document type.
   * @param id The resource ID.
   * @param documentId Document ID to download.
   * @param options The options parameters.
   */
  public async actionsTaskDownloadElementValueDocument(
    id: string,
    documentId: string,
    options?: TaskActionsTaskDownloadElementValueDocumentOptionalParams,
  ): Promise<TaskActionsTaskDownloadElementValueDocumentResponse> {
    return await this.taskOperations.actionsTaskDownloadElementValueDocument(id, documentId, options)
  }

  /**
   * Allow to save a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json form is marked as invalid.
   *
   * @param id The resource ID.
   * @param command Command to save the JSON value.
   * @param options The options parameters.
   */
  public async actionsTaskSaveJsonFormsValueData(
    id: string,
    command: TaskSaveJsonFormsValueDataCommand,
    options?: TaskActionsTaskSaveJsonFormsValueDataOptionalParams,
  ): Promise<TaskActionsTaskSaveJsonFormsValueDataResponse> {
    return await this.taskOperations.actionsTaskSaveJsonFormsValueData(id, command, options)
  }

  /**
   * Save a document in the task to later be linked into the JSON data.
   *
   * @param id The resource ID.
   * @param command Command options
   * @param document Document to upload
   * @param options The options parameters.
   */
  public async actionsTaskSaveJsonFormsValueDocument(
    id: string,
    command: TaskSaveJsonFormsValueDocumentRequestCommand,
    document: Document,
    options?: TaskActionsTaskSaveJsonFormsValueDocumentOptionalParams,
  ): Promise<TaskActionsTaskSaveJsonFormsValueDocumentResponse> {
    const fileContentType = document.contentType
    const fileName = document.fileName
    const file = document.fileContent
    const schemaPath = command.schemaPath

    return await this.taskOperations.actionsTaskSaveJsonFormsValueDocument(
      id,
      fileContentType,
      fileName,
      schemaPath,
      file,
      options,
    )
  }

  /**
   * Given a task, download a document from a json form data.
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  public async actionsTaskDownloadJsonFormsValueDocument(
    id: string,
    documentUri: string,
    options?: TaskActionsTaskDownloadJsonFormsValueDocumentOptionalParams,
  ): Promise<TaskActionsTaskDownloadJsonFormsValueDocumentResponse> {
    return await this.taskOperations.actionsTaskDownloadJsonFormsValueDocument(id, documentUri, options)
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
  public async actionsTaskDownloadElementValueRendered(
    id: string,
    elementDefinitionCode: string,
    options?: TaskActionsTaskDownloadElementValueRenderedOptionalParams,
  ): Promise<TaskActionsTaskDownloadElementValueRenderedResponse> {
    return await this.taskOperations.actionsTaskDownloadElementValueRendered(id, elementDefinitionCode, options)
  }

  /**
   * Allow to complete a claimed task by the principal.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async actionsTaskComplete(
    id: string,
    options?: TaskActionsTaskCompleteOptionalParams,
  ): Promise<TaskActionsTaskCompleteResponse> {
    return await this.taskOperations.actionsTaskComplete(id, options)
  }

  /**
   * A log entry is added to the task. If the number of log entries is reached, the oldest log entry is
   * removed.
   *
   * @param id The resource ID.
   * @param log Log to be created.
   * @param options The options parameters.
   */
  public async actionsTaskAppendLog(
    id: string,
    log: Log,
    options?: TaskActionsTaskAppendLogOptionalParams,
  ): Promise<TaskActionsTaskAppendLogResponse> {
    return await this.taskOperations.actionsTaskAppendLog(id, log, options)
  }
}
