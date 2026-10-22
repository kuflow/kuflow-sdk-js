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

import { ApplicationFailure } from '@temporalio/activity'

import { KuFlowFailureType } from './kuflow-failure-type'
import type {
  BusinessArtifactActionCancelRequest,
  BusinessArtifactActionCreateArtifactPrepareRequest,
  BusinessArtifactActionCreateRequest,
  BusinessArtifactActionRetrieveRequest,
  BusinessArtifactActionStartProcessPrepareRequest,
  BusinessArtifactCreateRequest,
  BusinessArtifactDeleteRequest,
  BusinessArtifactPatchRequest,
  BusinessArtifactRetrieveRequest,
  BusinessArtifactUpdateRequest,
  PrincipalRetrieveRequest,
  ProcessActionCancelRequest,
  ProcessActionCreateRequest,
  ProcessActionRetrieveRequest,
  ProcessDeleteRequest,
  ProcessEntityPatchRequest,
  ProcessEntityUpdateRequest,
  ProcessInitiatorChangeRequest,
  ProcessItemAiAssistanceGenerateRequest,
  ProcessItemAiAssistanceRetrieveRequest,
  ProcessItemCreateRequest,
  ProcessItemRetrieveRequest,
  ProcessItemsCancelRequest,
  ProcessItemTaskAssignRequest,
  ProcessItemTaskClaimRequest,
  ProcessItemTaskCompleteRequest,
  ProcessItemTaskContextDataUpdateRequest,
  ProcessItemTaskDataPatchRequest,
  ProcessItemTaskDataUpdateRequest,
  ProcessItemTaskLogAppendRequest,
  ProcessMetadataPatchRequest,
  ProcessMetadataUpdateRequest,
  ProcessRetrieveRequest,
  TenantUserRetrieveRequest,
} from './models'

export function validateRetrievePrincipalRequest(request: PrincipalRetrieveRequest): void {
  requirePrincipalId(request.principalId)
}

export function validateRetrieveTenantUserRequest(request: TenantUserRetrieveRequest): void {
  requireTenantUserId(request.tenantUserId)
}

export function validateRetrieveProcessRequest(request: ProcessRetrieveRequest): void {
  requireProcessId(request.processId)
}

export function validateProcessDeleteRequest(request: ProcessDeleteRequest): void {
  requireProcessId(request.processId)
}

export function validateProcessEntityUpdateRequest(request: ProcessEntityUpdateRequest): void {
  requireProcessId(request.processId)
  requireEntity(request.entity)
}

export function validateProcessEntityPatchRequest(request: ProcessEntityPatchRequest): void {
  requireProcessId(request.processId)
  requireJsonPatch(request.jsonPatch)
}

export function validateProcessMetadataUpdateRequest(request: ProcessMetadataUpdateRequest): void {
  requireProcessId(request.processId)
  requireMetadata(request.metadata)
}

export function validateProcessMetadataPatchRequest(request: ProcessMetadataPatchRequest): void {
  requireProcessId(request.processId)
  requireJsonPatch(request.jsonPatch)
}

export function validateProcessInitiatorChangeRequest(request: ProcessInitiatorChangeRequest): void {
  requireProcessId(request.processId)
  if (request.initiatorId == null && request.initiatorEmail == null) {
    fail("'initiatorId' or 'initiatorEmail' is required")
  }
}

export function validateProcessActionCreateRequest(request: ProcessActionCreateRequest): void {
  requireProcessId(request.processId)
  requireProcessActionDefinitionCode(request.processActionDefinitionCode)
}

export function validateProcessActionRetrieveRequest(request: ProcessActionRetrieveRequest): void {
  requireProcessId(request.processId)
  requireProcessActionId(request.processActionId)
}

export function validateProcessActionCancelRequest(request: ProcessActionCancelRequest): void {
  requireProcessId(request.processId)
  requireProcessActionId(request.processActionId)
}

export function validateProcessItemsCancelRequest(request: ProcessItemsCancelRequest): void {
  requireProcessId(request.processId)
}

export function validateProcessItemRetrieveRequest(request: ProcessItemRetrieveRequest): void {
  requireProcessItemId(request.processItemId)
}

export function validateProcessItemCreateRequest(request: ProcessItemCreateRequest): void {
  requireId(request.id)
  requireProcessId(request.processId)
  requireType(request.type)

  if (request.type === 'TASK' && request.processItemDefinitionCode == null) {
    fail("'processItemDefinitionCode' is required for task items")
  }

  if (request.type === 'MESSAGE') {
    if (request.message == null) {
      fail("'message' is required for message items")
    }

    if (request.message.text == null && request.message.data == null) {
      fail("'message.text' and/or 'message.data' is required for message items")
    }

    if (request.message.data != null && request.message.dataStructureDataDefinitionCode == null) {
      fail("'message.dataStructureDataDefinitionCode' is required for message items when 'message.data' is set")
    }
  }

  if (request.type === 'THREAD') {
    if (request.processItemDefinitionCode == null) {
      fail("'processItemDefinitionCode' is required for thread items")
    }

    if (request.processItemThreadId != null) {
      fail("'processItemThreadId' is not allowed for thread items, threads cannot be nested")
    }
  }
}

export function validateProcessItemTaskCompleteRequest(request: ProcessItemTaskCompleteRequest): void {
  requireProcessItemId(request.processItemId)
}

export function validateProcessItemTaskClaimRequest(request: ProcessItemTaskClaimRequest): void {
  requireProcessItemId(request.processItemId)
}

export function validateProcessItemTaskAssignRequest(request: ProcessItemTaskAssignRequest): void {
  requireProcessItemId(request.processItemId)
  if (request.ownerEmail == null && request.ownerId == null) {
    fail("'ownerEmail' or 'ownerId' is required")
  }
}

export function validateProcessItemTaskDataUpdateRequest(request: ProcessItemTaskDataUpdateRequest): void {
  requireProcessItemId(request.processItemId)
  requireData(request.data)
}

export function validateProcessItemTaskContextDataUpdateRequest(
  request: ProcessItemTaskContextDataUpdateRequest,
): void {
  requireProcessItemId(request.processItemId)
  requireData(request.data)
}

export function validateProcessItemTaskDataPatchRequest(request: ProcessItemTaskDataPatchRequest): void {
  requireProcessItemId(request.processItemId)
  requireJsonPatch(request.jsonPatch)
}

export function validateProcessItemTaskLogAppendRequest(request: ProcessItemTaskLogAppendRequest): void {
  requireProcessItemId(request.processItemId)
  requireMessage(request.message)
  requireLevel(request.level)
}

export function validateProcessItemAiAssistanceGenerateRequest(request: ProcessItemAiAssistanceGenerateRequest): void {
  requireProcessItemId(request.processItemId)
  requireRequestId(request.requestId)
}

export function validateProcessItemAiAssistanceRetrieveRequest(request: ProcessItemAiAssistanceRetrieveRequest): void {
  requireProcessItemId(request.processItemId)
}

export function validateBusinessArtifactCreateRequest(request: BusinessArtifactCreateRequest): void {
  if (request.businessArtifactDefinitionId == null && request.businessArtifactDefinitionCode == null) {
    fail("'businessArtifactDefinitionId' or 'businessArtifactDefinitionCode' is required")
  }
}

export function validateBusinessArtifactRetrieveRequest(request: BusinessArtifactRetrieveRequest): void {
  requireBusinessArtifactId(request.businessArtifactId)
}

export function validateBusinessArtifactDeleteRequest(request: BusinessArtifactDeleteRequest): void {
  requireBusinessArtifactId(request.businessArtifactId)
}

export function validateBusinessArtifactUpdateRequest(request: BusinessArtifactUpdateRequest): void {
  requireBusinessArtifactId(request.businessArtifactId)
  requireData(request.data)
}

export function validateBusinessArtifactPatchRequest(request: BusinessArtifactPatchRequest): void {
  requireBusinessArtifactId(request.businessArtifactId)
  requireJsonPatch(request.jsonPatch)
}

export function validateBusinessArtifactActionCreateRequest(request: BusinessArtifactActionCreateRequest): void {
  requireBusinessArtifactId(request.businessArtifactId)
  requireBusinessArtifactActionDefinitionCode(request.businessArtifactActionDefinitionCode)
}

export function validateBusinessArtifactActionRetrieveRequest(request: BusinessArtifactActionRetrieveRequest): void {
  requireBusinessArtifactId(request.businessArtifactId)
  requireBusinessArtifactActionId(request.businessArtifactActionId)
}

export function validateBusinessArtifactActionCancelRequest(request: BusinessArtifactActionCancelRequest): void {
  requireBusinessArtifactId(request.businessArtifactId)
  requireBusinessArtifactActionId(request.businessArtifactActionId)
}

export function validateBusinessArtifactActionCreateArtifactPrepareRequest(
  request: BusinessArtifactActionCreateArtifactPrepareRequest,
): void {
  requireBusinessArtifactId(request.businessArtifactId)
  requireBusinessArtifactActionDefinitionCode(request.businessArtifactActionDefinitionCode)
}

export function validateBusinessArtifactActionStartProcessPrepareRequest(
  request: BusinessArtifactActionStartProcessPrepareRequest,
): void {
  requireBusinessArtifactId(request.businessArtifactId)
  requireBusinessArtifactActionDefinitionCode(request.businessArtifactActionDefinitionCode)
}

function requireId(id: unknown): void {
  requireField(id, 'id')
}

function requireType(type: unknown): void {
  requireField(type, 'type')
}

function requirePrincipalId(principalId: unknown): void {
  requireField(principalId, 'principalId')
}

function requireTenantUserId(tenantUserId: unknown): void {
  requireField(tenantUserId, 'tenantUserId')
}

function requireProcessId(processId: unknown): void {
  requireField(processId, 'processId')
}

function requireProcessActionId(processActionId: unknown): void {
  requireField(processActionId, 'processActionId')
}

function requireProcessActionDefinitionCode(processActionDefinitionCode: unknown): void {
  requireField(processActionDefinitionCode, 'processActionDefinitionCode')
}

function requireProcessItemId(processItemId: unknown): void {
  requireField(processItemId, 'processItemId')
}

function requireBusinessArtifactId(businessArtifactId: unknown): void {
  requireField(businessArtifactId, 'businessArtifactId')
}

function requireBusinessArtifactActionId(businessArtifactActionId: unknown): void {
  requireField(businessArtifactActionId, 'businessArtifactActionId')
}

function requireBusinessArtifactActionDefinitionCode(businessArtifactActionDefinitionCode: unknown): void {
  requireField(businessArtifactActionDefinitionCode, 'businessArtifactActionDefinitionCode')
}

function requireEntity(entity: unknown): void {
  requireField(entity, 'entity')
}

function requireMetadata(metadata: unknown): void {
  requireField(metadata, 'metadata')
}

function requireData(data: unknown): void {
  requireField(data, 'data')
}

function requireJsonPatch(jsonPatch: unknown): void {
  requireField(jsonPatch, 'jsonPatch')
}

function requireMessage(message: unknown): void {
  requireField(message, 'message')
}

function requireLevel(level: unknown): void {
  requireField(level, 'level')
}

function requireRequestId(requestId: unknown): void {
  requireField(requestId, 'requestId')
}

function requireField(value: unknown, fieldName: string): void {
  if (value == null) {
    fail(`'${fieldName}' is required`)
  }
}

function fail(message: string): never {
  throw ApplicationFailure.nonRetryable(message, KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
}
