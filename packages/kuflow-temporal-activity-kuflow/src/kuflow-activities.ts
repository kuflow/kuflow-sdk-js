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
import type {
  BusinessArtifactFindBusinessArtifactsOptionalExtParams,
  KuFlowRestClient,
  Process,
  ProcessFindProcessesOptionalExtParams,
  ProcessItemFindProcessItemsOptionalExtParams,
} from '@kuflow/kuflow-rest'

import { catchAllErrors } from './kuflow-activities-failure'
import type {
  BusinessArtifactActionCancelRequest,
  BusinessArtifactActionCancelResponse,
  BusinessArtifactActionCreateArtifactPrepareRequest,
  BusinessArtifactActionCreateArtifactPrepareResponse,
  BusinessArtifactActionCreateRequest,
  BusinessArtifactActionCreateResponse,
  BusinessArtifactActionRetrieveRequest,
  BusinessArtifactActionRetrieveResponse,
  BusinessArtifactActionStartProcessPrepareRequest,
  BusinessArtifactActionStartProcessPrepareResponse,
  BusinessArtifactCreateRequest,
  BusinessArtifactCreateResponse,
  BusinessArtifactDeleteRequest,
  BusinessArtifactDeleteResponse,
  BusinessArtifactFindRequest,
  BusinessArtifactFindResponse,
  BusinessArtifactPatchRequest,
  BusinessArtifactPatchResponse,
  BusinessArtifactRetrieveRequest,
  BusinessArtifactRetrieveResponse,
  BusinessArtifactUpdateRequest,
  BusinessArtifactUpdateResponse,
  PrincipalRetrieveRequest,
  PrincipalRetrieveResponse,
  ProcessActionCancelRequest,
  ProcessActionCancelResponse,
  ProcessActionCreateRequest,
  ProcessActionCreateResponse,
  ProcessActionRetrieveRequest,
  ProcessActionRetrieveResponse,
  ProcessDeleteRequest,
  ProcessDeleteResponse,
  ProcessEntityPatchRequest,
  ProcessEntityPatchResponse,
  ProcessEntityUpdateRequest,
  ProcessEntityUpdateResponse,
  ProcessFindRequest,
  ProcessFindResponse,
  ProcessInitiatorChangeRequest,
  ProcessInitiatorChangeResponse,
  ProcessItemAiAssistanceGenerateRequest,
  ProcessItemAiAssistanceGenerateResponse,
  ProcessItemAiAssistanceRetrieveRequest,
  ProcessItemAiAssistanceRetrieveResponse,
  ProcessItemCreateRequest,
  ProcessItemCreateResponse,
  ProcessItemFindRequest,
  ProcessItemFindResponse,
  ProcessItemRetrieveRequest,
  ProcessItemRetrieveResponse,
  ProcessItemsCancelRequest,
  ProcessItemsCancelResponse,
  ProcessItemTaskAssignRequest,
  ProcessItemTaskAssignResponse,
  ProcessItemTaskClaimRequest,
  ProcessItemTaskClaimResponse,
  ProcessItemTaskCompleteRequest,
  ProcessItemTaskCompleteResponse,
  ProcessItemTaskContextDataUpdateRequest,
  ProcessItemTaskContextDataUpdateResponse,
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
  validateBusinessArtifactActionCancelRequest,
  validateBusinessArtifactActionCreateArtifactPrepareRequest,
  validateBusinessArtifactActionCreateRequest,
  validateBusinessArtifactActionRetrieveRequest,
  validateBusinessArtifactActionStartProcessPrepareRequest,
  validateBusinessArtifactCreateRequest,
  validateBusinessArtifactDeleteRequest,
  validateBusinessArtifactPatchRequest,
  validateBusinessArtifactRetrieveRequest,
  validateBusinessArtifactUpdateRequest,
  validateProcessActionCancelRequest,
  validateProcessActionCreateRequest,
  validateProcessActionRetrieveRequest,
  validateProcessDeleteRequest,
  validateProcessEntityPatchRequest,
  validateProcessEntityUpdateRequest,
  validateProcessInitiatorChangeRequest,
  validateProcessItemAiAssistanceGenerateRequest,
  validateProcessItemAiAssistanceRetrieveRequest,
  validateProcessItemCreateRequest,
  validateProcessItemRetrieveRequest,
  validateProcessItemsCancelRequest,
  validateProcessItemTaskAssignRequest,
  validateProcessItemTaskClaimRequest,
  validateProcessItemTaskCompleteRequest,
  validateProcessItemTaskContextDataUpdateRequest,
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
   * Delete a Process, and its Process Items with it. Only a finished Process with nothing in progress can be
   * deleted. The deletion is soft and cannot be undone.
   *
   * @param request must not be {@literal undefined}.
   * @return empty response
   */
  KuFlow_Engine_deleteProcess: (request: ProcessDeleteRequest) => Promise<ProcessDeleteResponse>

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
   * Invoke an action on a Process.
   *
   * <p>Whether the action completes synchronously or asynchronously depends on its type. Asynchronous actions
   * are returned with `status=REQUESTED`; use `KuFlow_Engine_retrieveProcessAction` to poll the final state.
   *
   * @param request must not be {@literal undefined}.
   * @return process action created
   */
  KuFlow_Engine_createProcessAction: (request: ProcessActionCreateRequest) => Promise<ProcessActionCreateResponse>

  /**
   * Retrieve a Process action.
   *
   * @param request must not be {@literal undefined}.
   * @return process action
   */
  KuFlow_Engine_retrieveProcessAction: (request: ProcessActionRetrieveRequest) => Promise<ProcessActionRetrieveResponse>

  /**
   * Cancel a Process action.
   *
   * <p>Only meaningful for asynchronous actions still in `REQUESTED` state.
   *
   * @param request must not be {@literal undefined}.
   * @return process action cancelled
   */
  KuFlow_Engine_cancelProcessAction: (request: ProcessActionCancelRequest) => Promise<ProcessActionCancelResponse>

  /**
   * Cancel Process Items in a Process. When `processItemIds` is omitted, all the active process items are
   * cancelled. The Process itself is not affected.
   *
   * @param request must not be {@literal undefined}.
   * @return process
   */
  KuFlow_Engine_cancelProcessItems: (request: ProcessItemsCancelRequest) => Promise<ProcessItemsCancelResponse>

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
  KuFlow_Engine_createProcessItem: (request: ProcessItemCreateRequest) => Promise<ProcessItemCreateResponse>

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
   * Save JSON context data
   *
   * Allow to save a JSON context data validating that the data follow the related schema. If the data is
   * invalid, then the json form is marked as invalid.
   *
   * @param request must not be {@literal undefined}.
   * @return task updated
   */
  KuFlow_Engine_updateProcessItemTaskContextData: (
    request: ProcessItemTaskContextDataUpdateRequest,
  ) => Promise<ProcessItemTaskContextDataUpdateResponse>

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

  /**
   * Trigger an asynchronous AI assistance run for a Process Item, identified by a client-supplied `requestId`
   * that makes the call idempotent.
   *
   * @param request must not be {@literal undefined}.
   * @return AI assistance state
   */
  KuFlow_Engine_generateProcessItemAiAssistance: (
    request: ProcessItemAiAssistanceGenerateRequest,
  ) => Promise<ProcessItemAiAssistanceGenerateResponse>

  /**
   * Retrieve the status of the latest AI assistance run of a Process Item.
   *
   * @param request must not be {@literal undefined}.
   * @return AI assistance state
   */
  KuFlow_Engine_retrieveProcessItemAiAssistance: (
    request: ProcessItemAiAssistanceRetrieveRequest,
  ) => Promise<ProcessItemAiAssistanceRetrieveResponse>

  /**
   * List all the Business Artifacts that have been created and the credentials has access.
   *
   * @param request must not be {@literal undefined}.
   * @return business artifacts found paginated
   */
  KuFlow_Engine_findBusinessArtifacts: (request: BusinessArtifactFindRequest) => Promise<BusinessArtifactFindResponse>

  /**
   * Create a Business Artifact.
   *
   * <p>If you want the method to be idempotent, please specify the `id` field in the request.
   *
   * @param request must not be {@literal undefined}.
   * @return business artifact created
   */
  KuFlow_Engine_createBusinessArtifact: (
    request: BusinessArtifactCreateRequest,
  ) => Promise<BusinessArtifactCreateResponse>

  /**
   * Retrieve a Business Artifact.
   *
   * @param request must not be {@literal undefined}.
   * @return business artifact
   */
  KuFlow_Engine_retrieveBusinessArtifact: (
    request: BusinessArtifactRetrieveRequest,
  ) => Promise<BusinessArtifactRetrieveResponse>

  /**
   * Delete a Business Artifact. The deletion is soft.
   *
   * @param request must not be {@literal undefined}.
   * @return empty response
   */
  KuFlow_Engine_deleteBusinessArtifact: (
    request: BusinessArtifactDeleteRequest,
  ) => Promise<BusinessArtifactDeleteResponse>

  /**
   * Save the JSON data of a Business Artifact.
   *
   * <p>Allow to save a JSON data validating that the data follow the related schema. If the data is invalid,
   * then the json is marked as invalid.
   *
   * @param request must not be {@literal undefined}.
   * @return business artifact updated
   */
  KuFlow_Engine_updateBusinessArtifact: (
    request: BusinessArtifactUpdateRequest,
  ) => Promise<BusinessArtifactUpdateResponse>

  /**
   * Patch the JSON data of a Business Artifact.
   *
   * <p>Allow to patch a JSON data validating that the data follow the related schema. If the data is invalid,
   * then the json is marked as invalid.
   *
   * @param request must not be {@literal undefined}.
   * @return business artifact updated
   */
  KuFlow_Engine_patchBusinessArtifact: (request: BusinessArtifactPatchRequest) => Promise<BusinessArtifactPatchResponse>

  /**
   * Invoke an action on a Business Artifact.
   *
   * <p>Whether the action completes synchronously or asynchronously depends on its type. Asynchronous actions
   * are returned with `status=REQUESTED`; use `KuFlow_Engine_retrieveBusinessArtifactAction` to poll the final
   * state.
   *
   * @param request must not be {@literal undefined}.
   * @return business artifact action created
   */
  KuFlow_Engine_createBusinessArtifactAction: (
    request: BusinessArtifactActionCreateRequest,
  ) => Promise<BusinessArtifactActionCreateResponse>

  /**
   * Retrieve a Business Artifact action.
   *
   * @param request must not be {@literal undefined}.
   * @return business artifact action
   */
  KuFlow_Engine_retrieveBusinessArtifactAction: (
    request: BusinessArtifactActionRetrieveRequest,
  ) => Promise<BusinessArtifactActionRetrieveResponse>

  /**
   * Cancel a Business Artifact action.
   *
   * <p>Only meaningful for asynchronous actions still in `REQUESTED` state.
   *
   * @param request must not be {@literal undefined}.
   * @return business artifact action cancelled
   */
  KuFlow_Engine_cancelBusinessArtifactAction: (
    request: BusinessArtifactActionCancelRequest,
  ) => Promise<BusinessArtifactActionCancelResponse>

  /**
   * Compute the pre-filled value that a `CREATE_BUSINESS_ARTIFACT` action would produce, without invoking the
   * action or persisting any state.
   *
   * @param request must not be {@literal undefined}.
   * @return prepared value
   */
  KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact: (
    request: BusinessArtifactActionCreateArtifactPrepareRequest,
  ) => Promise<BusinessArtifactActionCreateArtifactPrepareResponse>

  /**
   * Compute the pre-filled metadata that a `START_PROCESS` action would apply to the process it creates,
   * without invoking the action or persisting any state.
   *
   * @param request must not be {@literal undefined}.
   * @return prepared metadata
   */
  KuFlow_Engine_prepareBusinessArtifactActionStartProcess: (
    request: BusinessArtifactActionStartProcessPrepareRequest,
  ) => Promise<BusinessArtifactActionStartProcessPrepareResponse>
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
    KuFlow_Engine_deleteProcess: catchAllErrors(KuFlow_Engine_deleteProcess),
    KuFlow_Engine_updateProcessEntity: catchAllErrors(KuFlow_Engine_updateProcessEntity),
    KuFlow_Engine_patchProcessEntity: catchAllErrors(KuFlow_Engine_patchProcessEntity),
    KuFlow_Engine_updateProcessMetadata: catchAllErrors(KuFlow_Engine_updateProcessMetadata),
    KuFlow_Engine_patchProcessMetadata: catchAllErrors(KuFlow_Engine_patchProcessMetadata),
    KuFlow_Engine_changeProcessInitiator: catchAllErrors(KuFlow_Engine_changeProcessInitiator),
    KuFlow_Engine_createProcessAction: catchAllErrors(KuFlow_Engine_createProcessAction),
    KuFlow_Engine_retrieveProcessAction: catchAllErrors(KuFlow_Engine_retrieveProcessAction),
    KuFlow_Engine_cancelProcessAction: catchAllErrors(KuFlow_Engine_cancelProcessAction),
    KuFlow_Engine_cancelProcessItems: catchAllErrors(KuFlow_Engine_cancelProcessItems),
    KuFlow_Engine_findProcessItems: catchAllErrors(KuFlow_Engine_findProcessItems),
    KuFlow_Engine_retrieveProcessItem: catchAllErrors(KuFlow_Engine_retrieveProcessItem),
    KuFlow_Engine_createProcessItem: catchAllErrors(KuFlow_Engine_createProcessItem),
    KuFlow_Engine_completeProcessItemTask: catchAllErrors(KuFlow_Engine_completeProcessItemTask),
    KuFlow_Engine_claimProcessItemTask: catchAllErrors(KuFlow_Engine_claimProcessItemTask),
    KuFlow_Engine_assignProcessItemTask: catchAllErrors(KuFlow_Engine_assignProcessItemTask),
    KuFlow_Engine_updateProcessItemTaskData: catchAllErrors(KuFlow_Engine_updateProcessItemTaskData),
    KuFlow_Engine_updateProcessItemTaskContextData: catchAllErrors(KuFlow_Engine_updateProcessItemTaskContextData),
    KuFlow_Engine_patchProcessItemTaskData: catchAllErrors(KuFlow_Engine_patchProcessItemTaskData),
    KuFlow_Engine_appendProcessItemTaskLog: catchAllErrors(KuFlow_Engine_appendProcessItemTaskLog),
    KuFlow_Engine_generateProcessItemAiAssistance: catchAllErrors(KuFlow_Engine_generateProcessItemAiAssistance),
    KuFlow_Engine_retrieveProcessItemAiAssistance: catchAllErrors(KuFlow_Engine_retrieveProcessItemAiAssistance),
    KuFlow_Engine_findBusinessArtifacts: catchAllErrors(KuFlow_Engine_findBusinessArtifacts),
    KuFlow_Engine_createBusinessArtifact: catchAllErrors(KuFlow_Engine_createBusinessArtifact),
    KuFlow_Engine_retrieveBusinessArtifact: catchAllErrors(KuFlow_Engine_retrieveBusinessArtifact),
    KuFlow_Engine_deleteBusinessArtifact: catchAllErrors(KuFlow_Engine_deleteBusinessArtifact),
    KuFlow_Engine_updateBusinessArtifact: catchAllErrors(KuFlow_Engine_updateBusinessArtifact),
    KuFlow_Engine_patchBusinessArtifact: catchAllErrors(KuFlow_Engine_patchBusinessArtifact),
    KuFlow_Engine_createBusinessArtifactAction: catchAllErrors(KuFlow_Engine_createBusinessArtifactAction),
    KuFlow_Engine_retrieveBusinessArtifactAction: catchAllErrors(KuFlow_Engine_retrieveBusinessArtifactAction),
    KuFlow_Engine_cancelBusinessArtifactAction: catchAllErrors(KuFlow_Engine_cancelBusinessArtifactAction),
    KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact: catchAllErrors(
      KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact,
    ),
    KuFlow_Engine_prepareBusinessArtifactActionStartProcess: catchAllErrors(
      KuFlow_Engine_prepareBusinessArtifactActionStartProcess,
    ),
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
    const options: ProcessFindProcessesOptionalExtParams = {
      page: request.page,
      size: request.size,
      sort: request.sorts,
      tenantId: request.tenantIds,
      processDefinitionId: request.processDefinitionIds,
      processDefinitionCode: request.processDefinitionCodes,
      state: request.states,
      initiatorId: request.initiatorIds,
      initiatorEmail: request.initiatorEmails,
      metadata: request.metadata,
      deleted: request.deleted,
    }
    const processes = await kuFlowRestClient.processOperations.findProcesses(options)

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

  async function KuFlow_Engine_deleteProcess(request: ProcessDeleteRequest): Promise<ProcessDeleteResponse> {
    validateProcessDeleteRequest(request)

    await kuFlowRestClient.processOperations.deleteProcess(request.processId)

    return {}
  }

  async function KuFlow_Engine_updateProcessEntity(
    request: ProcessEntityUpdateRequest,
  ): Promise<ProcessEntityUpdateResponse> {
    validateProcessEntityUpdateRequest(request)

    const process: Process = await kuFlowRestClient.processOperations.updateProcessEntity(request.processId, {
      entity: request.entity,
    })

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
      request.jsonPatch,
    )

    return {
      process,
    }
  }

  async function KuFlow_Engine_updateProcessMetadata(
    request: ProcessMetadataUpdateRequest,
  ): Promise<ProcessMetadataUpdateResponse> {
    validateProcessMetadataUpdateRequest(request)

    const process: Process = await kuFlowRestClient.processOperations.updateProcessMetadata(request.processId, {
      metadata: request.metadata,
    })

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
      request.jsonPatch,
    )

    return {
      process,
    }
  }

  async function KuFlow_Engine_changeProcessInitiator(
    request: ProcessInitiatorChangeRequest,
  ): Promise<ProcessInitiatorChangeResponse> {
    validateProcessInitiatorChangeRequest(request)

    const process = await kuFlowRestClient.processOperations.changeProcessInitiator(request.processId, {
      initiatorId: request.initiatorId,
      initiatorEmail: request.initiatorEmail,
    })

    return {
      process,
    }
  }

  async function KuFlow_Engine_createProcessAction(
    request: ProcessActionCreateRequest,
  ): Promise<ProcessActionCreateResponse> {
    validateProcessActionCreateRequest(request)

    const processAction = await kuFlowRestClient.processOperations.createProcessAction(request.processId, {
      id: request.id,
      processActionDefinitionCode: request.processActionDefinitionCode,
      createTask: request.createTask,
      createProcessItemMessage: request.createProcessItemMessage,
      startRelatedProcess: request.startRelatedProcess,
      sendWorkflowSignal: request.sendWorkflowSignal,
    })

    return {
      processAction,
    }
  }

  async function KuFlow_Engine_retrieveProcessAction(
    request: ProcessActionRetrieveRequest,
  ): Promise<ProcessActionRetrieveResponse> {
    validateProcessActionRetrieveRequest(request)

    const processAction = await kuFlowRestClient.processOperations.retrieveProcessAction(
      request.processId,
      request.processActionId,
    )

    return {
      processAction,
    }
  }

  async function KuFlow_Engine_cancelProcessAction(
    request: ProcessActionCancelRequest,
  ): Promise<ProcessActionCancelResponse> {
    validateProcessActionCancelRequest(request)

    const processAction = await kuFlowRestClient.processOperations.cancelProcessAction(
      request.processId,
      request.processActionId,
    )

    return {
      processAction,
    }
  }

  async function KuFlow_Engine_cancelProcessItems(
    request: ProcessItemsCancelRequest,
  ): Promise<ProcessItemsCancelResponse> {
    validateProcessItemsCancelRequest(request)

    const process = await kuFlowRestClient.processOperations.cancelProcessItems(request.processId, {
      processItemId: request.processItemIds,
    })

    return {
      process,
    }
  }

  async function KuFlow_Engine_findProcessItems(request: ProcessItemFindRequest): Promise<ProcessItemFindResponse> {
    const options: ProcessItemFindProcessItemsOptionalExtParams = {
      page: request.page,
      size: request.size,
      sort: request.sorts,
      tenantId: request.tenantIds,
      processId: request.processIds,
      type: request.types,
      taskState: request.taskStates,
      processItemDefinitionCode: request.processItemDefinitionCodes,
      processDefinitionId: request.processDefinitionIds,
      processDefinitionCode: request.processDefinitionCodes,
      deleted: request.deleted,
    }
    const processItems = await kuFlowRestClient.processItemOperations.findProcessItems(options)

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
    request: ProcessItemCreateRequest,
  ): Promise<ProcessItemCreateResponse> {
    validateProcessItemCreateRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.createProcessItem({
      id: request.id,
      type: request.type,
      processId: request.processId,
      processItemThreadId: request.processItemThreadId,
      ownerId: request.ownerId,
      ownerEmail: request.ownerEmail,
      processItemDefinitionCode: request.processItemDefinitionCode,
      task: request.task,
      message: request.message,
    })

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

    const processItem = await kuFlowRestClient.processItemOperations.assignProcessItemTask(request.processItemId, {
      ownerEmail: request.ownerEmail,
      ownerId: request.ownerId,
    })

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_updateProcessItemTaskData(
    request: ProcessItemTaskDataUpdateRequest,
  ): Promise<ProcessItemTaskDataUpdateResponse> {
    validateProcessItemTaskDataUpdateRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.updateProcessItemTaskData(request.processItemId, {
      data: request.data,
    })

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_updateProcessItemTaskContextData(
    request: ProcessItemTaskContextDataUpdateRequest,
  ): Promise<ProcessItemTaskContextDataUpdateResponse> {
    validateProcessItemTaskContextDataUpdateRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.updateProcessItemTaskContextData(
      request.processItemId,
      {
        data: request.data,
      },
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
      request.jsonPatch,
    )

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_appendProcessItemTaskLog(
    request: ProcessItemTaskLogAppendRequest,
  ): Promise<ProcessItemTaskLogAppendResponse> {
    validateProcessItemTaskLogAppendRequest(request)

    const processItem = await kuFlowRestClient.processItemOperations.appendProcessItemTaskLog(request.processItemId, {
      level: request.level,
      message: request.message,
    })

    return {
      processItem,
    }
  }

  async function KuFlow_Engine_generateProcessItemAiAssistance(
    request: ProcessItemAiAssistanceGenerateRequest,
  ): Promise<ProcessItemAiAssistanceGenerateResponse> {
    validateProcessItemAiAssistanceGenerateRequest(request)

    const processItemAiAssistance = await kuFlowRestClient.processItemOperations.generateProcessItemAiAssistance(
      request.processItemId,
      {
        requestId: request.requestId,
      },
    )

    return {
      processItemAiAssistance,
    }
  }

  async function KuFlow_Engine_retrieveProcessItemAiAssistance(
    request: ProcessItemAiAssistanceRetrieveRequest,
  ): Promise<ProcessItemAiAssistanceRetrieveResponse> {
    validateProcessItemAiAssistanceRetrieveRequest(request)

    const processItemAiAssistance = await kuFlowRestClient.processItemOperations.retrieveProcessItemAiAssistance(
      request.processItemId,
    )

    return {
      processItemAiAssistance,
    }
  }

  async function KuFlow_Engine_findBusinessArtifacts(
    request: BusinessArtifactFindRequest,
  ): Promise<BusinessArtifactFindResponse> {
    const options: BusinessArtifactFindBusinessArtifactsOptionalExtParams = {
      size: request.size,
      page: request.page,
      sort: request.sorts,
      tenantId: request.tenantIds,
      businessArtifactDefinitionId: request.businessArtifactDefinitionIds,
      businessArtifactDefinitionCode: request.businessArtifactDefinitionCodes,
      value: request.values,
      deleted: request.deleted,
    }
    const businessArtifacts = await kuFlowRestClient.businessArtifactOperations.findBusinessArtifacts(options)

    return {
      businessArtifacts,
    }
  }

  async function KuFlow_Engine_createBusinessArtifact(
    request: BusinessArtifactCreateRequest,
  ): Promise<BusinessArtifactCreateResponse> {
    validateBusinessArtifactCreateRequest(request)

    const businessArtifact = await kuFlowRestClient.businessArtifactOperations.createBusinessArtifact({
      id: request.id,
      businessArtifactDefinitionId: request.businessArtifactDefinitionId,
      tenantId: request.tenantId,
      businessArtifactDefinitionCode: request.businessArtifactDefinitionCode,
      data: request.data,
    })

    return {
      businessArtifact,
    }
  }

  async function KuFlow_Engine_retrieveBusinessArtifact(
    request: BusinessArtifactRetrieveRequest,
  ): Promise<BusinessArtifactRetrieveResponse> {
    validateBusinessArtifactRetrieveRequest(request)

    const businessArtifact = await kuFlowRestClient.businessArtifactOperations.retrieveBusinessArtifact(
      request.businessArtifactId,
    )

    return {
      businessArtifact,
    }
  }

  async function KuFlow_Engine_deleteBusinessArtifact(
    request: BusinessArtifactDeleteRequest,
  ): Promise<BusinessArtifactDeleteResponse> {
    validateBusinessArtifactDeleteRequest(request)

    await kuFlowRestClient.businessArtifactOperations.deleteBusinessArtifact(request.businessArtifactId)

    return {}
  }

  async function KuFlow_Engine_updateBusinessArtifact(
    request: BusinessArtifactUpdateRequest,
  ): Promise<BusinessArtifactUpdateResponse> {
    validateBusinessArtifactUpdateRequest(request)

    const businessArtifact = await kuFlowRestClient.businessArtifactOperations.updateBusinessArtifactData(
      request.businessArtifactId,
      {
        data: request.data,
      },
    )

    return {
      businessArtifact,
    }
  }

  async function KuFlow_Engine_patchBusinessArtifact(
    request: BusinessArtifactPatchRequest,
  ): Promise<BusinessArtifactPatchResponse> {
    validateBusinessArtifactPatchRequest(request)

    const businessArtifact = await kuFlowRestClient.businessArtifactOperations.patchBusinessArtifactData(
      request.businessArtifactId,
      request.jsonPatch,
    )

    return {
      businessArtifact,
    }
  }

  async function KuFlow_Engine_createBusinessArtifactAction(
    request: BusinessArtifactActionCreateRequest,
  ): Promise<BusinessArtifactActionCreateResponse> {
    validateBusinessArtifactActionCreateRequest(request)

    const businessArtifactAction = await kuFlowRestClient.businessArtifactOperations.createBusinessArtifactAction(
      request.businessArtifactId,
      {
        id: request.id,
        businessArtifactActionDefinitionCode: request.businessArtifactActionDefinitionCode,
        startWorkflow: request.startWorkflow,
        downloadable: request.downloadable,
        startProcess: request.startProcess,
        createArtifact: request.createArtifact,
      },
    )

    return {
      businessArtifactAction,
    }
  }

  async function KuFlow_Engine_retrieveBusinessArtifactAction(
    request: BusinessArtifactActionRetrieveRequest,
  ): Promise<BusinessArtifactActionRetrieveResponse> {
    validateBusinessArtifactActionRetrieveRequest(request)

    const businessArtifactAction = await kuFlowRestClient.businessArtifactOperations.retrieveBusinessArtifactAction(
      request.businessArtifactId,
      request.businessArtifactActionId,
    )

    return {
      businessArtifactAction,
    }
  }

  async function KuFlow_Engine_cancelBusinessArtifactAction(
    request: BusinessArtifactActionCancelRequest,
  ): Promise<BusinessArtifactActionCancelResponse> {
    validateBusinessArtifactActionCancelRequest(request)

    const businessArtifactAction = await kuFlowRestClient.businessArtifactOperations.cancelBusinessArtifactAction(
      request.businessArtifactId,
      request.businessArtifactActionId,
    )

    return {
      businessArtifactAction,
    }
  }

  async function KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact(
    request: BusinessArtifactActionCreateArtifactPrepareRequest,
  ): Promise<BusinessArtifactActionCreateArtifactPrepareResponse> {
    validateBusinessArtifactActionCreateArtifactPrepareRequest(request)

    const businessArtifactActionCreateArtifactPrepare =
      await kuFlowRestClient.businessArtifactOperations.prepareBusinessArtifactActionCreateArtifact(
        request.businessArtifactId,
        {
          businessArtifactActionDefinitionCode: request.businessArtifactActionDefinitionCode,
        },
      )

    return {
      businessArtifactActionCreateArtifactPrepare,
    }
  }

  async function KuFlow_Engine_prepareBusinessArtifactActionStartProcess(
    request: BusinessArtifactActionStartProcessPrepareRequest,
  ): Promise<BusinessArtifactActionStartProcessPrepareResponse> {
    validateBusinessArtifactActionStartProcessPrepareRequest(request)

    const businessArtifactActionStartProcessPrepare =
      await kuFlowRestClient.businessArtifactOperations.prepareBusinessArtifactActionStartProcess(
        request.businessArtifactId,
        {
          businessArtifactActionDefinitionCode: request.businessArtifactActionDefinitionCode,
        },
      )

    return {
      businessArtifactActionStartProcessPrepare,
    }
  }
}
