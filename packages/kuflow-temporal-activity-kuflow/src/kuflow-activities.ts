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
/* eslint-disable @typescript-eslint/naming-convention */
import {
  type KuFlowRestClient,
  type Process,
  type ProcessChangeInitiatorCommand,
  type ProcessDeleteElementCommand,
  type ProcessSaveElementCommand,
  type TaskAssignCommand,
  type TaskDeleteElementCommand,
  type TaskDeleteElementValueDocumentCommand,
  type TaskSaveElementCommand,
  type TaskSaveJsonFormsValueDataCommand,
} from '@kuflow/kuflow-rest'

import { catchAllErrors } from './kuflow-activities-failure'
import {
  type AppendTaskLogRequest,
  type AppendTaskLogResponse,
  type AssignTaskRequest,
  type AssignTaskResponse,
  type ChangeProcessInitiatorRequest,
  type ChangeProcessInitiatorResponse,
  type ClaimTaskRequest,
  type ClaimTaskResponse,
  type CompleteTaskRequest,
  type CompleteTaskResponse,
  type CreateTaskRequest,
  type CreateTaskResponse,
  type DeleteProcessElementRequest,
  type DeleteProcessElementResponse,
  type DeleteTaskElementRequest,
  type DeleteTaskElementResponse,
  type DeleteTaskElementValueDocumentRequest,
  type DeleteTaskElementValueDocumentResponse,
  type FindProcessesRequest,
  type FindProcessesResponse,
  type FindTasksRequest,
  type FindTasksResponse,
  type RetrievePrincipalRequest,
  type RetrievePrincipalResponse,
  type RetrieveProcessRequest,
  type RetrieveProcessResponse,
  type RetrieveTaskRequest,
  type RetrieveTaskResponse,
  type RetrieveTenantUserRequest,
  type RetrieveTenantUserResponse,
  type SaveProcessElementRequest,
  type SaveProcessElementResponse,
  type SaveTaskElementRequest,
  type SaveTaskElementResponse,
  type SaveTaskJsonFormsValueDataRequest,
  type SaveTaskJsonFormsValueDataResponse,
} from './models'
import {
  validateAppendTaskLogRequest,
  validateAssignTaskRequest,
  validateChangeProcessInitiatorRequest,
  validateClaimTaskRequest,
  validateCompleteTaskRequest,
  validateCreateTaskRequest,
  validateDeleteProcessElementRequest,
  validateDeleteTaskElementRequest,
  validateDeleteTaskElementValueDocumentRequest,
  validateRetrievePrincipalRequest,
  validateRetrieveProcessRequest,
  validateRetrieveTaskRequest,
  validateRetrieveTenantUserRequest,
  validateSaveProcessElementRequest,
  validateSaveTaskElementRequest,
  validateSaveTaskJsonFormsValueData,
} from './validations'

export interface KuFlowActivities {
  /**
   * Retrieve a Principal.
   * @param request must not be {@literal undefined}.
   * @return principal
   */
  KuFlow_Engine_retrievePrincipal: (request: RetrievePrincipalRequest) => Promise<RetrievePrincipalResponse>

  /**
   * Retrieve a Tenant User.
   * @param request must not be {@literal undefined}.
   * @return tenant user
   */
  KuFlow_Engine_retrieveTenantUser: (request: RetrieveTenantUserRequest) => Promise<RetrieveTenantUserResponse>

  /**
   * Find all accessible Processes
   *
   * @param request must not be {@literal undefined}.
   * @return processes
   */
  KuFlow_Engine_findProcesses: (request: FindProcessesRequest) => Promise<FindProcessesResponse>

  /**
   * Retrieve a Process.
   *
   * @param request must not be {@literal undefined}.
   * @return process
   */
  KuFlow_Engine_retrieveProcess: (request: RetrieveProcessRequest) => Promise<RetrieveProcessResponse>

  /**
   *  Allow to save an element.
   *  If values already exist for the provided element code, it replaces them with the new ones, otherwise it creates them.
   *  The values of the previous elements that no longer exist will be deleted.
   *
   *  <p>If the process is already finished the invocations fails with an error.
   *
   * @param request must not be {@literal undefined}.
   * @return process completed
   */
  KuFlow_Engine_saveProcessElement: (request: SaveProcessElementRequest) => Promise<SaveProcessElementResponse>

  /**
   *  Allow to delete a process element by specifying the item definition code.
   *  Remove all the element values.
   *
   * @param request must not be {@literal undefined}.
   * @return process deleted
   */
  KuFlow_Engine_deleteProcessElement: (request: DeleteProcessElementRequest) => Promise<DeleteProcessElementResponse>

  /**
   * Change the current initiator of a process. Allows you to choose a user (by email or principal
   * identifier) or an application (principal identifier).
   *
   * @param request must not be {@literal undefined}.
   * @return task assigned
   */
  KuFlow_Engine_changeProcessInitiator: (
    request: ChangeProcessInitiatorRequest,
  ) => Promise<ChangeProcessInitiatorResponse>

  /**
   * List all the Processes that have been created and the credentials has access.
   *
   * @param request must not be {@literal undefined}.
   * @return Processes found paginated
   */
  KuFlow_Engine_findTasks: (request: FindTasksRequest) => Promise<FindTasksResponse>

  /**
   * Retrieve a Task.
   *
   * @param request must not be {@literal undefined}.
   * @return process completed
   */
  KuFlow_Engine_retrieveTask: (request: RetrieveTaskRequest) => Promise<RetrieveTaskResponse>

  /**
   * Create a Task and optionally fill its elements.
   *
   * @param request must not be {@literal undefined}.
   * @return task created
   */
  KuFlow_Engine_createTask: (request: CreateTaskRequest) => Promise<CreateTaskResponse>

  /**
   * Complete a task.
   *
   * <p>Allow to complete a claimed task by the principal.
   *
   * @param request must not be {@literal undefined}.
   * @return task completed
   */
  KuFlow_Engine_completeTask: (request: CompleteTaskRequest) => Promise<CompleteTaskResponse>

  /**
   * Claim a task.
   *
   * @param request must not be {@literal undefined}.
   * @return task claimed
   */
  KuFlow_Engine_claimTask: (request: ClaimTaskRequest) => Promise<ClaimTaskResponse>

  /**
   * Assign a task to a user or application using their email or principalId
   *
   * @param request must not be {@literal undefined}.
   * @return task assigned
   */
  KuFlow_Engine_assignTask: (request: AssignTaskRequest) => Promise<AssignTaskResponse>

  /**
   * Allow to save an element i.e., a field, a decision, a form, a principal or document.
   *
   * In the case of document type elements, this method only allows references to be made to other existing document
   * type elements for the purpose of copying that file into the element. To do this you need to pass a reference to the
   * document using the 'uri' attribute. In case you want to add a new document, you should create a Temporal activity
   * specific to your needs and use our rest client to upload the document. This is because it is not recommended to save
   * binaries in the history of Temporal.
   *
   * If values already exist for the provided element code, it replaces them with the new ones, otherwise it
   * creates them. The values of the previous elements that no longer exist will be deleted. To remove an element, use
   * the appropriate API method.
   *
   * @param request must not be {@literal undefined}.
   * @return task updated
   */
  KuFlow_Engine_saveTaskElement: (request: SaveTaskElementRequest) => Promise<SaveTaskElementResponse>

  /**
   * Allow to delete task element by specifying the item definition code.
   *
   * Remove all the element values.
   *
   * @param request must not be {@literal undefined}.
   * @return task updated
   */
  KuFlow_Engine_deleteTaskElement: (request: DeleteTaskElementRequest) => Promise<DeleteTaskElementResponse>

  /**
   * Allow to delete a specific document from an element of document type using its id.
   *
   * Note: If it is a multiple item, it will only delete the specified document. If it is a single element, in addition to the document, it will also delete the element.
   *
   * @param request must not be {@literal undefined}.
   * @return task updated
   */
  KuFlow_Engine_deleteTaskElementValueDocument: (
    request: DeleteTaskElementValueDocumentRequest,
  ) => Promise<DeleteTaskElementValueDocumentResponse>

  /**
   * Allow to save a JSON data validating that the data follow the related schema. If the data is invalid, then the json
   * form is marked as invalid.
   *
   * @param request must not be {@literal undefined}.
   * @return task updated
   */
  KuFlow_Engine_saveTaskJsonFormsValueData: (
    request: SaveTaskJsonFormsValueDataRequest,
  ) => Promise<SaveTaskJsonFormsValueDataResponse>

  /**
   * Append a log to the task.
   *
   * <p>A log entry is added to the task. If the number of log entries is reached, the oldest log entry is removed.
   *
   * @param request must not be {@literal undefined}.
   * @return log appended
   */
  KuFlow_Engine_appendTaskLog: (request: AppendTaskLogRequest) => Promise<AppendTaskLogResponse>
}

/**
 * KuFlow activities to be used in Temporal.
 */
export const createKuFlowActivities = (kuFlowRestClient: KuFlowRestClient): KuFlowActivities => {
  return {
    KuFlow_Engine_retrievePrincipal: catchAllErrors(KuFlow_Engine_retrievePrincipal),
    KuFlow_Engine_retrieveTenantUser: catchAllErrors(KuFlow_Engine_retrieveTenantUser),
    KuFlow_Engine_findProcesses: catchAllErrors(KuFlow_Engine_findProcesses),
    KuFlow_Engine_retrieveProcess: catchAllErrors(KuFlow_Engine_retrieveProcess),
    KuFlow_Engine_saveProcessElement: catchAllErrors(KuFlow_Engine_saveProcessElement),
    KuFlow_Engine_deleteProcessElement: catchAllErrors(KuFlow_Engine_deleteProcessElement),
    KuFlow_Engine_changeProcessInitiator: catchAllErrors(KuFlow_Engine_changeProcessInitiator),
    KuFlow_Engine_findTasks: catchAllErrors(KuFlow_Engine_findTasks),
    KuFlow_Engine_retrieveTask: catchAllErrors(KuFlow_Engine_retrieveTask),
    KuFlow_Engine_createTask: catchAllErrors(KuFlow_Engine_createTask),
    KuFlow_Engine_completeTask: catchAllErrors(KuFlow_Engine_completeTask),
    KuFlow_Engine_claimTask: catchAllErrors(KuFlow_Engine_claimTask),
    KuFlow_Engine_assignTask: catchAllErrors(KuFlow_Engine_assignTask),
    KuFlow_Engine_saveTaskElement: catchAllErrors(KuFlow_Engine_saveTaskElement),
    KuFlow_Engine_deleteTaskElement: catchAllErrors(KuFlow_Engine_deleteTaskElement),
    KuFlow_Engine_deleteTaskElementValueDocument: catchAllErrors(KuFlow_Engine_deleteTaskElementValueDocument),
    KuFlow_Engine_saveTaskJsonFormsValueData: catchAllErrors(KuFlow_Engine_saveTaskJsonFormsValueData),
    KuFlow_Engine_appendTaskLog: catchAllErrors(KuFlow_Engine_appendTaskLog),
  }

  async function KuFlow_Engine_retrievePrincipal(
    request: RetrievePrincipalRequest,
  ): Promise<RetrievePrincipalResponse> {
    validateRetrievePrincipalRequest(request)

    const principal = await kuFlowRestClient.principalOperations.retrievePrincipal(request.principalId)

    return {
      principal,
    }
  }

  async function KuFlow_Engine_retrieveTenantUser(
    request: RetrieveTenantUserRequest,
  ): Promise<RetrieveTenantUserResponse> {
    validateRetrieveTenantUserRequest(request)

    const tenantUser = await kuFlowRestClient.tenantUserOperations.retrieveTenantUser(request.tenantUserId)

    return {
      tenantUser,
    }
  }

  async function KuFlow_Engine_findProcesses(request: FindProcessesRequest): Promise<FindProcessesResponse> {
    const processes = await kuFlowRestClient.processOperations.findProcesses({
      ...request,
    })

    return {
      processes,
    }
  }

  async function KuFlow_Engine_retrieveProcess(request: RetrieveProcessRequest): Promise<RetrieveProcessResponse> {
    validateRetrieveProcessRequest(request)

    const process: Process = await kuFlowRestClient.processOperations.retrieveProcess(request.processId)

    return {
      process,
    }
  }

  async function KuFlow_Engine_saveProcessElement(
    request: SaveProcessElementRequest,
  ): Promise<SaveProcessElementResponse> {
    validateSaveProcessElementRequest(request)

    const command: ProcessSaveElementCommand = {
      elementDefinitionCode: request.elementDefinitionCode,
      elementValues: request.elementValues,
    }
    const process = await kuFlowRestClient.processOperations.actionsProcessSaveElement(request.processId, command)

    return {
      process,
    }
  }

  async function KuFlow_Engine_deleteProcessElement(
    request: DeleteProcessElementRequest,
  ): Promise<DeleteProcessElementResponse> {
    validateDeleteProcessElementRequest(request)

    const command: ProcessDeleteElementCommand = {
      elementDefinitionCode: request.elementDefinitionCode,
    }
    const process = await kuFlowRestClient.processOperations.actionsProcessDeleteElement(request.processId, command)

    return {
      process,
    }
  }

  async function KuFlow_Engine_changeProcessInitiator(
    request: ChangeProcessInitiatorRequest,
  ): Promise<ChangeProcessInitiatorResponse> {
    validateChangeProcessInitiatorRequest(request)

    const command: ProcessChangeInitiatorCommand = {
      email: request.email,
      principalId: request.principalId,
    }
    const process = await kuFlowRestClient.processOperations.actionsProcessChangeInitiator(request.processId, command)

    return {
      process,
    }
  }

  async function KuFlow_Engine_findTasks(request: FindTasksRequest): Promise<FindTasksResponse> {
    const tasks = await kuFlowRestClient.taskOperations.findTasks({
      ...request,
    })

    return {
      tasks,
    }
  }

  async function KuFlow_Engine_retrieveTask(request: RetrieveTaskRequest): Promise<RetrieveTaskResponse> {
    validateRetrieveTaskRequest(request)

    const task = await kuFlowRestClient.taskOperations.retrieveTask(request.taskId)

    return {
      task,
    }
  }

  async function KuFlow_Engine_createTask(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    validateCreateTaskRequest(request)

    const task = await kuFlowRestClient.taskOperations.createTask(request.task)

    return {
      task,
    }
  }

  async function KuFlow_Engine_completeTask(request: CompleteTaskRequest): Promise<CompleteTaskResponse> {
    validateCompleteTaskRequest(request)

    const task = await kuFlowRestClient.taskOperations.actionsTaskComplete(request.taskId)

    return {
      task,
    }
  }

  async function KuFlow_Engine_claimTask(request: ClaimTaskRequest): Promise<ClaimTaskResponse> {
    validateClaimTaskRequest(request)

    const task = await kuFlowRestClient.taskOperations.actionsTaskClaim(request.taskId)

    return {
      task,
    }
  }

  async function KuFlow_Engine_assignTask(request: AssignTaskRequest): Promise<AssignTaskResponse> {
    validateAssignTaskRequest(request)

    const command: TaskAssignCommand = {
      email: request.email,
      principalId: request.principalId,
    }
    const task = await kuFlowRestClient.taskOperations.actionsTaskAssign(request.taskId, command)

    return {
      task,
    }
  }

  async function KuFlow_Engine_saveTaskElement(request: SaveTaskElementRequest): Promise<SaveTaskElementResponse> {
    validateSaveTaskElementRequest(request)

    const command: TaskSaveElementCommand = {
      elementDefinitionCode: request.elementDefinitionCode,
      elementValues: request.elementValues,
    }
    const task = await kuFlowRestClient.taskOperations.actionsTaskSaveElement(request.taskId, command)

    return {
      task,
    }
  }

  async function KuFlow_Engine_deleteTaskElement(
    request: DeleteTaskElementRequest,
  ): Promise<DeleteTaskElementResponse> {
    validateDeleteTaskElementRequest(request)

    const command: TaskDeleteElementCommand = {
      elementDefinitionCode: request.elementDefinitionCode,
    }
    const task = await kuFlowRestClient.taskOperations.actionsTaskDeleteElement(request.taskId, command)

    return {
      task,
    }
  }

  async function KuFlow_Engine_deleteTaskElementValueDocument(
    request: DeleteTaskElementValueDocumentRequest,
  ): Promise<DeleteTaskElementValueDocumentResponse> {
    validateDeleteTaskElementValueDocumentRequest(request)

    const command: TaskDeleteElementValueDocumentCommand = {
      documentId: request.documentId,
    }
    const task = await kuFlowRestClient.taskOperations.actionsTaskDeleteElementValueDocument(request.taskId, command)

    return {
      task,
    }
  }

  async function KuFlow_Engine_saveTaskJsonFormsValueData(
    request: SaveTaskJsonFormsValueDataRequest,
  ): Promise<SaveTaskJsonFormsValueDataResponse> {
    validateSaveTaskJsonFormsValueData(request)

    const command: TaskSaveJsonFormsValueDataCommand = {
      data: request.data,
    }
    const task = await kuFlowRestClient.taskOperations.actionsTaskSaveJsonFormsValueData(request.taskId, command)

    return {
      task,
    }
  }

  async function KuFlow_Engine_appendTaskLog(request: AppendTaskLogRequest): Promise<AppendTaskLogResponse> {
    validateAppendTaskLogRequest(request)

    const task = await kuFlowRestClient.taskOperations.actionsTaskAppendLog(request.taskId, request.log)

    return {
      task,
    }
  }
}
