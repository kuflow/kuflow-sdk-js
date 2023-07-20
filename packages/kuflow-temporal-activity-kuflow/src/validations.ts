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
import {
  type AppendTaskLogRequest,
  type AssignTaskRequest,
  type ChangeProcessInitiatorRequest,
  type ClaimTaskRequest,
  type CompleteTaskRequest,
  type CreateTaskRequest,
  type DeleteProcessElementRequest,
  type DeleteTaskElementRequest,
  type DeleteTaskElementValueDocumentRequest,
  type RetrievePrincipalRequest,
  type RetrieveProcessRequest,
  type RetrieveTaskRequest,
  type SaveProcessElementRequest,
  type SaveTaskElementRequest,
  type SaveTaskJsonFormsValueDataRequest,
} from './models'

export function validateRetrievePrincipalRequest(request: RetrievePrincipalRequest): void {
  if (request.principalId == null) {
    throw ApplicationFailure.nonRetryable("'principalId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateRetrieveProcessRequest(request: RetrieveProcessRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateSaveProcessElementRequest(request: SaveProcessElementRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.elementDefinitionCode == null) {
    throw ApplicationFailure.nonRetryable(
      "'elementDefinitionCode' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateDeleteProcessElementRequest(request: DeleteProcessElementRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.elementDefinitionCode == null) {
    throw ApplicationFailure.nonRetryable(
      "'elementDefinitionCode' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateChangeProcessInitiatorRequest(request: ChangeProcessInitiatorRequest): void {
  if (request.processId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.email == null && request.principalId == null) {
    throw ApplicationFailure.nonRetryable(
      "'email' or 'principalId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateRetrieveTaskRequest(request: RetrieveTaskRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'taskId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateCreateTaskRequest(request: CreateTaskRequest): void {
  if (request.task.id == null) {
    throw ApplicationFailure.nonRetryable("'task.id' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.task.processId == null) {
    throw ApplicationFailure.nonRetryable(
      "'task.processId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
  if (request.task.taskDefinition.code == null) {
    throw ApplicationFailure.nonRetryable(
      "'task.taskDefinition.code' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateCompleteTaskRequest(request: CompleteTaskRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'taskId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateClaimTaskRequest(request: ClaimTaskRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'taskId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateAssignTaskRequest(request: AssignTaskRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'taskId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.email == null && request.principalId == null) {
    throw ApplicationFailure.nonRetryable(
      "'email' or 'principalId' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateSaveTaskElementRequest(request: SaveTaskElementRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'taskId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.elementDefinitionCode == null) {
    throw ApplicationFailure.nonRetryable(
      "'elementDefinitionCode' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateDeleteTaskElementRequest(request: DeleteTaskElementRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'taskId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.elementDefinitionCode == null) {
    throw ApplicationFailure.nonRetryable(
      "'elementDefinitionCode' is required",
      KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE,
    )
  }
}

export function validateDeleteTaskElementValueDocumentRequest(request: DeleteTaskElementValueDocumentRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'taskId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.documentId == null) {
    throw ApplicationFailure.nonRetryable("'documentId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateSaveTaskJsonFormsValueData(request: SaveTaskJsonFormsValueDataRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'taskId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.data == null) {
    throw ApplicationFailure.nonRetryable("'data' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}

export function validateAppendTaskLogRequest(request: AppendTaskLogRequest): void {
  if (request.taskId == null) {
    throw ApplicationFailure.nonRetryable("'processId' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.log.level == null) {
    throw ApplicationFailure.nonRetryable("'log.level' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
  if (request.log.message == null) {
    throw ApplicationFailure.nonRetryable("'log.message' is required", KuFlowFailureType.ACTIVITIES_VALIDATION_FAILURE)
  }
}
