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
  PrincipalRetrieveRequest,
  ProcessEntityPatchRequest,
  ProcessEntityUpdateRequest,
  ProcessInitiatorChangeRequest,
  ProcessItemRetrieveRequest,
  ProcessItemTaskAssignRequest,
  ProcessItemTaskClaimRequest,
  ProcessItemTaskCompleteRequest,
  ProcessItemTaskCreateRequest,
  ProcessItemTaskDataPatchRequest,
  ProcessItemTaskDataUpdateRequest,
  ProcessItemTaskLogAppendRequest,
  ProcessMetadataPatchRequest,
  ProcessMetadataUpdateRequest,
  ProcessRetrieveRequest,
  TenantUserRetrieveRequest,
} from './models'

export function validateRetrievePrincipalRequest(request: PrincipalRetrieveRequest): void {
  if (request.principalId == null) {
    throw ApplicationFailure.nonRetryable("'principalId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateRetrieveTenantUserRequest(request: TenantUserRetrieveRequest): void {
  if (request.tenantUserId == null) {
    throw ApplicationFailure.nonRetryable("'tenantUserId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateRetrieveProcessRequest(request: ProcessRetrieveRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateProcessEntityUpdateRequest(request: ProcessEntityUpdateRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }

  if (request.entity == null) {
    throw ApplicationFailure.nonRetryable("'entity' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateProcessEntityPatchRequest(request: ProcessEntityPatchRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }

  if (request.jsonPatch == null) {
    throw ApplicationFailure.nonRetryable("'jsonPatch' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateProcessMetadataUpdateRequest(request: ProcessMetadataUpdateRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }

  if (request.metadata == null) {
    throw ApplicationFailure.nonRetryable("'metadata' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateProcessMetadataPatchRequest(request: ProcessMetadataPatchRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }

  if (request.jsonPatch == null) {
    throw ApplicationFailure.nonRetryable("'jsonPatch' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateProcessInitiatorChangeRequest(request: ProcessInitiatorChangeRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.initiatorId == null || request.initiatorEmail == null) {
    throw ApplicationFailure.nonRetryable(
      "'initiatorId' or 'initiatorEmail' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateProcessItemRetrieveRequest(request: ProcessItemRetrieveRequest): void {
  if (request.processItemId == null) {
    throw ApplicationFailure.nonRetryable(
      "'processItemId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateProcessItemTaskCreateRequest(request: ProcessItemTaskCreateRequest): void {
  if (request.type === 'TASK' && request.task == null) {
    throw ApplicationFailure.nonRetryable("'task' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateProcessItemTaskCompleteRequest(request: ProcessItemTaskCompleteRequest): void {
  if (request.processItemId == null) {
    throw ApplicationFailure.nonRetryable(
      "'processItemId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateProcessItemTaskClaimRequest(request: ProcessItemTaskClaimRequest): void {
  if (request.processItemId == null) {
    throw ApplicationFailure.nonRetryable(
      "'processItemId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateProcessItemTaskAssignRequest(request: ProcessItemTaskAssignRequest): void {
  if (request.processItemId == null) {
    throw ApplicationFailure.nonRetryable(
      "'processItemId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
  if (request.ownerEmail == null && request.ownerId == null) {
    throw ApplicationFailure.nonRetryable(
      "'ownerEmail' or 'ownerId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateProcessItemTaskDataUpdateRequest(request: ProcessItemTaskDataUpdateRequest): void {
  if (request.processItemId == null) {
    throw ApplicationFailure.nonRetryable(
      "'processItemId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
  if (request.data == null) {
    throw ApplicationFailure.nonRetryable("'data' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateProcessItemTaskDataPatchRequest(request: ProcessItemTaskDataPatchRequest): void {
  if (request.processItemId == null) {
    throw ApplicationFailure.nonRetryable(
      "'processItemId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
  if (request.jsonPatch == null) {
    throw ApplicationFailure.nonRetryable("'jsonPatch' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateProcessItemTaskLogAppendRequest(request: ProcessItemTaskLogAppendRequest): void {
  if (request.processItemId == null) {
    throw ApplicationFailure.nonRetryable(
      "'processItemId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
  if (request.message == null) {
    throw ApplicationFailure.nonRetryable("'message' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.level == null) {
    throw ApplicationFailure.nonRetryable("'level' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}
