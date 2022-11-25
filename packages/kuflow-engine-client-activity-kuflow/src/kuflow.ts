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
import { KuFlowEngineConnection } from '@kuflow/kuflow-engine-client-core'
import {
  Process,
  ProcessChangeInitiatorCommand,
  ProcessDeleteElementCommand,
  ProcessSaveElementCommand,
  TaskAssignCommand,
} from '@kuflow/kuflow-rest-client'
import { CompleteAsyncError, Context } from '@temporalio/activity'

import {
  AppendTaskLogRequest,
  AppendTaskLogResponse,
  AssignTaskRequest,
  AssignTaskResponse,
  ChangeProcessInitiatorRequest,
  ChangeProcessInitiatorResponse,
  ClaimTaskRequest,
  ClaimTaskResponse,
  CompleteProcessRequest,
  CompleteProcessResponse,
  CompleteTaskRequest,
  CompleteTaskResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteProcessElementRequest,
  DeleteProcessElementResponse,
  FindProcessesRequest,
  FindProcessesResponse,
  FindTasksRequest,
  FindTasksResponse,
  RetrievePrincipalRequest,
  RetrievePrincipalResponse,
  RetrieveProcessRequest,
  RetrieveProcessResponse,
  RetrieveTaskRequest,
  RetrieveTaskResponse,
  SaveProcessElementRequest,
  SaveProcessElementResponse,
} from './models'

export interface KuFlowActivities {
  /**
   * Retrieve a Principal.
   * @param request must not be {@literal null}.
   * @return principal
   */
  KuFlow_Engine_retrievePrincipal: (request: RetrievePrincipalRequest) => Promise<RetrievePrincipalResponse>

  /**
   * Find all accessible Processes
   *
   * @param request must not be {@literal null}.
   * @return processes
   */
  KuFlow_Engine_findProcesses: (request: FindProcessesRequest) => Promise<FindProcessesResponse>

  /**
   * Retrieve a Process.
   *
   * @param request must not be {@literal null}.
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
   * @param request must not be {@literal null}.
   * @return process completed
   */
  KuFlow_Engine_saveProcessElement: (request: SaveProcessElementRequest) => Promise<SaveProcessElementResponse>

  /**
   *  Allow to delete a process element by specifying the item definition code.
   *  Remove all the element values.
   *
   * @param request must not be {@literal null}.
   * @return process deleted
   */
  KuFlow_Engine_deleteProcessElement: (request: DeleteProcessElementRequest) => Promise<DeleteProcessElementResponse>

  /**
   * Complete a Process. The state of Process is set to "COMPLETED".
   *
   * @param request must not be {@literal null}.
   * @return process completed
   */
  KuFlow_Engine_completeProcess: (request: CompleteProcessRequest) => Promise<CompleteProcessResponse>
  /**
   * Change the current initiator of a process. Allows you to choose a user (by email or principal
   * identifier) or an application (principal identifier).
   *
   * @param request must not be {@literal null}.
   * @return task assigned
   */
  KuFlow_Engine_changeProcessInitiator: (
    request: ChangeProcessInitiatorRequest,
  ) => Promise<ChangeProcessInitiatorResponse>

  /**
   * List all the Processes that have been created and the credentials has access.
   *
   * @param request must not be {@literal null}.
   * @return Processes found paginated
   */
  KuFlow_Engine_findTasks: (request: FindTasksRequest) => Promise<FindTasksResponse>

  /**
   * Retrieve a Task.
   *
   * @param request must not be {@literal null}.
   * @return process completed
   */
  KuFlow_Engine_retrieveTask: (request: RetrieveTaskRequest) => Promise<RetrieveTaskResponse>

  /**
   * Create a Task and optionally fill its elements.
   *
   * @param request must not be {@literal null}.
   * @return task created
   */
  KuFlow_Engine_createTask: (request: CreateTaskRequest) => Promise<CreateTaskResponse>

  /**
   * Create a Task and optionally fill its elements. The activity is finished when the <strong>"COMPLETED"</strong> or
   * <strong>"CANCELLED"</strong> event is received from KuFlow. This is useful in KuFlow tasks where you have to wait for an external
   * agent, usually a human, to complete it.
   *
   * @param request must not be {@literal null}.
   */
  KuFlow_Engine_createTaskAndWaitFinished: (request: CreateTaskRequest) => Promise<void>
  /**
   * Complete a task.
   *
   * <p>Allow to complete a claimed task by the principal.
   *
   * @param request must not be {@literal null}.
   * @return task completed
   */
  KuFlow_Engine_completeTask: (request: CompleteTaskRequest) => Promise<CompleteTaskResponse>

  /**
   * Claim a task.
   *
   * @param request must not be {@literal null}.
   * @return task claimed
   */
  KuFlow_Engine_claimTask: (request: ClaimTaskRequest) => Promise<ClaimTaskResponse>

  /**
   * Assign a task to a user or application using their email or principalId
   *
   * @param request must not be {@literal null}.
   * @return task assigned
   */
  KuFlow_Engine_assignTask: (request: AssignTaskRequest) => Promise<AssignTaskResponse>
  /**
   * Append a log to the task.
   *
   * <p>A log entry is added to the task. If the number of log entries is reached, the oldest log entry is removed.
   *
   * @param request must not be {@literal null}.
   * @return log appended
   */
  KuFlow_Engine_appendTaskLog: (request: AppendTaskLogRequest) => Promise<AppendTaskLogResponse>
}

/**
 * KuFlow activities to be used in Temporal.
 */
export const createKuFlowActivities = (kuFlowEngine: KuFlowEngineConnection): KuFlowActivities => {
  const kuflowRestClient = kuFlowEngine.kuflowRestClient

  return {
    KuFlow_Engine_retrievePrincipal,
    KuFlow_Engine_findProcesses,
    KuFlow_Engine_retrieveProcess,
    KuFlow_Engine_saveProcessElement,
    KuFlow_Engine_deleteProcessElement,
    KuFlow_Engine_completeProcess,
    KuFlow_Engine_changeProcessInitiator,
    KuFlow_Engine_findTasks,
    KuFlow_Engine_retrieveTask,
    KuFlow_Engine_createTask,
    KuFlow_Engine_createTaskAndWaitFinished,
    KuFlow_Engine_completeTask,
    KuFlow_Engine_claimTask,
    KuFlow_Engine_assignTask,
    KuFlow_Engine_appendTaskLog,
  }

  async function KuFlow_Engine_retrievePrincipal(
    request: RetrievePrincipalRequest,
  ): Promise<RetrievePrincipalResponse> {
    const principal = await kuflowRestClient.principalOperations.retrievePrincipal(request.principalId)

    return {
      principal,
    }
  }

  async function KuFlow_Engine_findProcesses(request: FindProcessesRequest): Promise<FindProcessesResponse> {
    const processes = await kuflowRestClient.processOperations.findProcesses({
      ...request,
    })

    return {
      processes,
    }
  }

  async function KuFlow_Engine_retrieveProcess(request: RetrieveProcessRequest): Promise<RetrieveProcessResponse> {
    const process: Process = await kuflowRestClient.processOperations.retrieveProcess(request.processId)

    return {
      process,
    }
  }

  async function KuFlow_Engine_saveProcessElement(
    request: SaveProcessElementRequest,
  ): Promise<SaveProcessElementResponse> {
    const command: ProcessSaveElementCommand = {
      elementDefinitionCode: request.elementDefinitionCode,
      elementValues: request.elementValues,
    }
    const process = await kuflowRestClient.processOperations.actionsProcessSaveElement(request.processId, command)

    return {
      process,
    }
  }

  async function KuFlow_Engine_deleteProcessElement(
    request: DeleteProcessElementRequest,
  ): Promise<DeleteProcessElementResponse> {
    const command: ProcessDeleteElementCommand = {
      elementDefinitionCode: request.elementDefinitionCode,
    }
    const process = await kuflowRestClient.processOperations.actionsProcessDeleteElement(request.processId, command)

    return {
      process,
    }
  }

  async function KuFlow_Engine_completeProcess(request: CompleteProcessRequest): Promise<CompleteProcessResponse> {
    const process = await kuflowRestClient.processOperations.actionsProcessComplete(request.processId)

    return {
      process,
    }
  }

  async function KuFlow_Engine_changeProcessInitiator(
    request: ChangeProcessInitiatorRequest,
  ): Promise<ChangeProcessInitiatorResponse> {
    const command: ProcessChangeInitiatorCommand = {
      email: request.email,
      principalId: request.principalId,
    }
    const process = await kuflowRestClient.processOperations.actionsProcessChangeInitiator(request.processId, command)

    return {
      process,
    }
  }

  async function KuFlow_Engine_findTasks(request: FindTasksRequest): Promise<FindTasksResponse> {
    const tasks = await kuflowRestClient.taskOperations.findTasks({
      ...request,
    })

    return {
      tasks,
    }
  }

  async function KuFlow_Engine_retrieveTask(request: RetrieveTaskRequest): Promise<RetrieveTaskResponse> {
    const task = await kuflowRestClient.taskOperations.retrieveTask(request.taskId)

    return {
      task,
    }
  }

  async function KuFlow_Engine_createTask(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    const task = await kuflowRestClient.taskOperations.createTask(request.task)

    return {
      task,
    }
  }

  async function KuFlow_Engine_createTaskAndWaitFinished(request: CreateTaskRequest): Promise<void> {
    const activityToken = Context.current().info.base64TaskToken
    await kuflowRestClient.taskOperations.createTask(request.task, { activityToken })

    throw new CompleteAsyncError()
  }

  async function KuFlow_Engine_completeTask(request: CompleteTaskRequest): Promise<CompleteTaskResponse> {
    const task = await kuflowRestClient.taskOperations.actionsTaskComplete(request.taskId)

    return {
      task,
    }
  }

  async function KuFlow_Engine_claimTask(request: ClaimTaskRequest): Promise<ClaimTaskResponse> {
    const task = await kuflowRestClient.taskOperations.actionsTaskClaim(request.taskId)

    return {
      task,
    }
  }

  async function KuFlow_Engine_assignTask(request: AssignTaskRequest): Promise<AssignTaskResponse> {
    const command: TaskAssignCommand = {
      email: request.email,
      principalId: request.principalId,
    }
    const task = await kuflowRestClient.taskOperations.actionsTaskAssign(request.taskId, command)

    return {
      task,
    }
  }

  async function KuFlow_Engine_appendTaskLog(request: AppendTaskLogRequest): Promise<AppendTaskLogResponse> {
    const task = await kuflowRestClient.taskOperations.actionsTaskAppendLog(request.taskId, request.log)

    return {
      task,
    }
  }
}
