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
import type { KuFlowRestClient, Process, ProcessItemTaskAssignParams } from '@kuflow/kuflow-rest'

import { catchAllErrors } from './kuflow-activities-failure'
import type {
  PrincipalRetrieveRequest,
  PrincipalRetrieveResponse,
  ProcessEntityPatchRequest,
  ProcessEntityPatchResponse,
  ProcessEntityUpdateRequest,
  ProcessEntityUpdateResponse,
  ProcessFindRequest,
  ProcessFindResponse,
  ProcessInitiatorChangeRequest,
  ProcessInitiatorChangeResponse,
  ProcessItemFindRequest,
  ProcessItemFindResponse,
  ProcessItemRetrieveRequest,
  ProcessItemRetrieveResponse,
  ProcessItemTaskAssignRequest,
  ProcessItemTaskAssignResponse,
  ProcessItemTaskClaimRequest,
  ProcessItemTaskClaimResponse,
  ProcessItemTaskCompleteRequest,
  ProcessItemTaskCompleteResponse,
  ProcessItemTaskCreateRequest,
  ProcessItemTaskCreateResponse,
  ProcessItemTaskDataPatchRequest,
  ProcessItemTaskDataPatchResponse,
  ProcessItemTaskDataUpdateRequest,
  ProcessItemTaskDataUpdateResponse,
  ProcessItemTaskLogAppendRequest,
  ProcessItemTaskLogAppendResponse,
  ProcessMetadataPatchRequest,
  ProcessMetadataPatchResponse,
  ProcessMetadataUpdateRequest,
  ProcessMetadataUpdateResponse,
  ProcessRetrieveRequest,
  ProcessRetrieveResponse,
  TenantUserRetrieveRequest,
  TenantUserRetrieveResponse,
} from './models'
import {
  validateProcessEntityPatchRequest,
  validateProcessEntityUpdateRequest,
  validateProcessInitiatorChangeRequest,
  validateProcessItemRetrieveRequest,
  validateProcessItemTaskAssignRequest,
  validateProcessItemTaskClaimRequest,
  validateProcessItemTaskCompleteRequest,
  validateProcessItemTaskCreateRequest,
  validateProcessItemTaskDataPatchRequest,
  validateProcessItemTaskDataUpdateRequest,
  validateProcessItemTaskLogAppendRequest,
  validateProcessMetadataPatchRequest,
  validateProcessMetadataUpdateRequest,
  validateRetrievePrincipalRequest,
  validateRetrieveProcessRequest,
  validateRetrieveTenantUserRequest,
} from './validations'

export interface KuFlowActivities {
  /**
   * Retrieve a Principal.
   * @param request must not be {@literal undefined}.
   * @return principal
   */
  KuFlow_Engine_retrievePrincipal: (request: PrincipalRetrieveRequest) => Promise<PrincipalRetrieveResponse>

  /**
   * Retrieve a Tenant User.
   * @param request must not be {@literal undefined}.
   * @return tenant user
   */
  KuFlow_Engine_retrieveTenantUser: (request: TenantUserRetrieveRequest) => Promise<TenantUserRetrieveResponse>

  /**
   * Find all accessible Processes
   *
   * @param request must not be {@literal undefined}.
   * @return processes
   */
  KuFlow_Engine_findProcesses: (request: ProcessFindRequest) => Promise<ProcessFindResponse>

  /**
   * Retrieve a Process.
   *
   * @param request must not be {@literal undefined}.
   * @return process
   */
  KuFlow_Engine_retrieveProcess: (request: ProcessRetrieveRequest) => Promise<ProcessRetrieveResponse>

  /**
   * Update a Process Entity.
   *
   * @param request must not be {@literal undefined}.
   * @return process completed
   */
  KuFlow_Engine_updateProcessEntity: (request: ProcessEntityUpdateRequest) => Promise<ProcessEntityUpdateResponse>

  /**
   * Patch a Process Entity.
   *
   * @param request must not be {@literal undefined}.
   * @return process completed
   */
  KuFlow_Engine_patchProcessEntity: (request: ProcessEntityPatchRequest) => Promise<ProcessEntityPatchResponse>

  /**
   * Update a Process Metadata.
   *
   * @param request must not be {@literal undefined}.
   * @return process completed
   */
  KuFlow_Engine_updateProcessMetadata: (request: ProcessMetadataUpdateRequest) => Promise<ProcessMetadataUpdateResponse>

  /**
   * Patch a Process Metadata.
   *
   * @param request must not be {@literal undefined}.
   * @return process completed
   */
  KuFlow_Engine_patchProcessMetadata: (request: ProcessMetadataPatchRequest) => Promise<ProcessMetadataPatchResponse>

  /**
   * Change the current initiator of a process. Allows you to choose a user (by email or principal
   * identifier) or an application (principal identifier).
   *
   * @param request must not be {@literal undefined}.
   * @return task assigned
   */
  KuFlow_Engine_changeProcessInitiator: (
    request: ProcessInitiatorChangeRequest,
  ) => Promise<ProcessInitiatorChangeResponse>

  /**
   * List all the Process Items that have been created and the credentials has access.
   *
   * @param request must not be {@literal undefined}.
   * @return Processes found paginated
   */
  KuFlow_Engine_findProcessItems: (request: ProcessItemFindRequest) => Promise<ProcessItemFindResponse>

  /**
   * Retrieve a Process Item Task.
   *
   * @param request must not be {@literal undefined}.
   * @return process completed
   */
  KuFlow_Engine_retrieveProcessItem: (request: ProcessItemRetrieveRequest) => Promise<ProcessItemRetrieveResponse>

  /**
   * Create a Process Item.
   *
   * @param request must not be {@literal undefined}.
   * @return process item created
   */
  KuFlow_Engine_createProcessItem: (request: ProcessItemTaskCreateRequest) => Promise<ProcessItemTaskCreateResponse>

  /**
   * Complete a Process Item Task.
   *
   * <p>Allow to complete a claimed task by the principal.
   *
   * @param request must not be {@literal undefined}.
   * @return process item with task completed
   */
  KuFlow_Engine_completeProcessItemTask: (
    request: ProcessItemTaskCompleteRequest,
  ) => Promise<ProcessItemTaskCompleteResponse>

  /**
   * Claim a Process Item Task.
   *
   * @param request must not be {@literal undefined}.
   * @return process item with task claimed
   */
  KuFlow_Engine_claimProcessItemTask: (request: ProcessItemTaskClaimRequest) => Promise<ProcessItemTaskClaimResponse>

  /**
   * Assign a Process Item Task to a user or application using their email or principalId
   *
   * @param request must not be {@literal undefined}.
   * @return process item with task assigned
   */
  KuFlow_Engine_assignProcessItemTask: (request: ProcessItemTaskAssignRequest) => Promise<ProcessItemTaskAssignResponse>

  /**
   * Save JSON data
   *
   * Allow to save a JSON data validating that the data follow the related schema. If the data is invalid, then the
   * json form is marked as invalid.
   *
   * @param request must not be {@literal undefined}.
   * @return task updated
   */
  KuFlow_Engine_updateProcessItemTaskData: (
    request: ProcessItemTaskDataUpdateRequest,
  ) => Promise<ProcessItemTaskDataUpdateResponse>

  /**
   * Patch JSON data
   *
   * Allow to save a JSON data validating that the data follow the related schema. If the data is invalid, then the
   * json form is marked as invalid.
   *
   * @param request must not be {@literal undefined}.
   * @return task updated
   */
  KuFlow_Engine_patchProcessItemTaskData: (
    request: ProcessItemTaskDataPatchRequest,
  ) => Promise<ProcessItemTaskDataPatchResponse>

  /**
   * Append a log to the Process Item Task.
   *
   * <p>A log entry is added to the task. If the number of log entries is reached, the oldest log entry is removed.
   *
   * @param request must not be {@literal undefined}.
   * @return log appended
   */
  KuFlow_Engine_appendProcessItemTaskLog: (
    request: ProcessItemTaskLogAppendRequest,
  ) => Promise<ProcessItemTaskLogAppendResponse>
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
    KuFlow_Engine_updateProcessEntity: catchAllErrors(KuFlow_Engine_updateProcessEntity),
    KuFlow_Engine_patchProcessEntity: catchAllErrors(KuFlow_Engine_patchProcessEntity),
    KuFlow_Engine_updateProcessMetadata: catchAllErrors(KuFlow_Engine_updateProcessMetadata),
    KuFlow_Engine_patchProcessMetadata: catchAllErrors(KuFlow_Engine_patchProcessMetadata),
    KuFlow_Engine_changeProcessInitiator: catchAllErrors(KuFlow_Engine_changeProcessInitiator),
    KuFlow_Engine_findProcessItems: catchAllErrors(KuFlow_Engine_findProcessItems),
    KuFlow_Engine_retrieveProcessItem: catchAllErrors(KuFlow_Engine_retrieveProcessItem),
    KuFlow_Engine_createProcessItem: catchAllErrors(KuFlow_Engine_createProcessItem),
    KuFlow_Engine_completeProcessItemTask: catchAllErrors(KuFlow_Engine_completeProcessItemTask),
    KuFlow_Engine_claimProcessItemTask: catchAllErrors(KuFlow_Engine_claimProcessItemTask),
    KuFlow_Engine_assignProcessItemTask: catchAllErrors(KuFlow_Engine_assignProcessItemTask),
    KuFlow_Engine_updateProcessItemTaskData: catchAllErrors(KuFlow_Engine_updateProcessItemTaskData),
    KuFlow_Engine_patchProcessItemTaskData: catchAllErrors(KuFlow_Engine_patchProcessItemTaskData),
    KuFlow_Engine_appendProcessItemTaskLog: catchAllErrors(KuFlow_Engine_appendProcessItemTaskLog),
  }

  async function KuFlow_Engine_retrievePrincipal(
    request: PrincipalRetrieveRequest,
  ): Promise<PrincipalRetrieveResponse> {
    validateRetrievePrincipalRequest(request)

    const principal = await kuFlowRestClient.principalOperations.retrievePrincipal(request.principalId)

    return {
      principal,
    }
  }

  async function KuFlow_Engine_retrieveTenantUser(
    request: TenantUserRetrieveRequest,
  ): Promise<TenantUserRetrieveResponse> {
    validateRetrieveTenantUserRequest(request)

    const tenantUser = await kuFlowRestClient.tenantUserOperations.retrieveTenantUser(request.tenantUserId)

    return {
      tenantUser,
    }
  }

  async function KuFlow_Engine_findProcesses(request: ProcessFindRequest): Promise<ProcessFindResponse> {
    const processes = await kuFlowRestClient.processOperations.findProcesses({
      ...request,
    })

    return {
      processes,
    }
  }

  async function KuFlow_Engine_retrieveProcess(request: ProcessRetrieveRequest): Promise<ProcessRetrieveResponse> {
    validateRetrieveProcessRequest(request)

    const process: Process = await kuFlowRestClient.processOperations.retrieveProcess(request.processId)

    return {
      process,
    }
  }

  async function KuFlow_Engine_updateProcessEntity(
    request: ProcessEntityUpdateRequest,
  ): Promise<ProcessEntityUpdateResponse> {
    validateProcessEntityUpdateRequest(request)

    const process: Process = await kuFlowRestClient.processOperations.updateProcessEntity(
      request.processId,
      request.params,
    )

    return {
      process,
    }
  }

  async function KuFlow_Engine_patchProcessEntity(
    request: ProcessEntityPatchRequest,
  ): Promise<ProcessEntityPatchResponse> {
    validateProcessEntityPatchRequest(request)

    const process: Process = await kuFlowRestClient.processOperations.patchProcessEntity(
      request.processId,
      request.params,
    )

    return {
      process,
    }
  }

  async function KuFlow_Engine_updateProcessMetadata(
    request: ProcessMetadataUpdateRequest,
  ): Promise<ProcessMetadataUpdateResponse> {
    validateProcessMetadataUpdateRequest(request)

    const process: Process = await kuFlowRestClient.processOperations.updateProcessMetadata(
      request.processId,
      request.params,
    )

    return {
      process,
    }
  }

  async function KuFlow_Engine_patchProcessMetadata(
    request: ProcessMetadataPatchRequest,
  ): Promise<ProcessMetadataPatchResponse> {
    validateProcessMetadataPatchRequest(request)

    const process: Process = await kuFlowRestClient.processOperations.patchProcessMetadata(
      request.processId,
      request.params,
    )

    return {
      process,
    }
  }

  async function KuFlow_Engine_changeProcessInitiator(
    request: ProcessInitiatorChangeRequest,
  ): Promise<ProcessInitiatorChangeResponse> {
    validateProcessInitiatorChangeRequest(request)

    const process = await kuFlowRestClient.processOperations.changeProcessInitiator(request.processId, request.params)

    return {
      process,
    }
  }

  async function KuFlow_Engine_findProcessItems(request: ProcessItemFindRequest): Promise<ProcessItemFindResponse> {
    const processItems = await kuFlowRestClient.processItemOperations.findProcessItems({
      ...request,
    })

    return {
      processItems,
    }
  }

  async function KuFlow_Engine_retrieveProcessItem(
    request: ProcessItemRetrieveRequest,
  ): Promise<ProcessItemRetrieveResponse> {
    validateProcessItemRetrieveRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.retrieveProcessItem(request.processItemId)

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_createProcessItem(
    request: ProcessItemTaskCreateRequest,
  ): Promise<ProcessItemTaskCreateResponse> {
    validateProcessItemTaskCreateRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.createProcessItem(request.params)

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_completeProcessItemTask(
    request: ProcessItemTaskCompleteRequest,
  ): Promise<ProcessItemTaskCompleteResponse> {
    validateProcessItemTaskCompleteRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.completeProcessItemTask(request.processItemId)

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_claimProcessItemTask(
    request: ProcessItemTaskClaimRequest,
  ): Promise<ProcessItemTaskClaimResponse> {
    validateProcessItemTaskClaimRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.claimProcessItemTask(request.processItemId)

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_assignProcessItemTask(
    request: ProcessItemTaskAssignRequest,
  ): Promise<ProcessItemTaskAssignResponse> {
    validateProcessItemTaskAssignRequest(request)

    const params: ProcessItemTaskAssignParams = {
      ownerEmail: request.ownerEmail,
      ownerId: request.ownerId,
    }
    const processItem = await kuFlowRestClient.processItemOperations.assignProcessItemTask(
      request.processItemId,
      params,
    )

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_updateProcessItemTaskData(
    request: ProcessItemTaskDataUpdateRequest,
  ): Promise<ProcessItemTaskDataUpdateResponse> {
    validateProcessItemTaskDataUpdateRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.updateProcessItemTaskData(
      request.processItemId,
      request.params,
    )

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_patchProcessItemTaskData(
    request: ProcessItemTaskDataPatchRequest,
  ): Promise<ProcessItemTaskDataPatchResponse> {
    validateProcessItemTaskDataPatchRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.patchProcessItemTaskData(
      request.processItemId,
      request.params,
    )

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_appendProcessItemTaskLog(
    request: ProcessItemTaskLogAppendRequest,
  ): Promise<ProcessItemTaskLogAppendResponse> {
    validateProcessItemTaskLogAppendRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.appendProcessItemTaskLog(
      request.processItemId,
      request.params,
    )

    return {
      processItem,
    }
  }
}
