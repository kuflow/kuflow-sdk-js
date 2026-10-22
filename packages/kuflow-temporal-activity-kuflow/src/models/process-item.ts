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

import type {
  DeletedQueryParam,
  JsonPatchOperation,
  JsonValue,
  ProcessItem,
  ProcessItemAiAssistance,
  ProcessItemMessageCreateParams,
  ProcessItemPage,
  ProcessItemTaskCreateParams,
  ProcessItemTaskLogLevel,
  ProcessItemTaskState,
  ProcessItemType,
} from '@kuflow/kuflow-rest'

export interface ProcessItemFindRequest {
  page?: number
  size?: number
  sorts?: string[]
  tenantIds?: string[]
  processIds?: string[]
  types?: ProcessItemType[]
  taskStates?: ProcessItemTaskState[]
  processItemDefinitionCodes?: string[]
  processDefinitionIds?: string[]
  processDefinitionCodes?: string[]
  deleted?: DeletedQueryParam
}

export interface ProcessItemFindResponse {
  processItems: ProcessItemPage
}

export interface ProcessItemRetrieveRequest {
  processItemId: string
}

export interface ProcessItemRetrieveResponse {
  processItem: ProcessItem
}

export interface ProcessItemCreateRequest {
  id: string
  type: ProcessItemType
  processId: string
  processItemThreadId?: string
  ownerId?: string
  ownerEmail?: string
  processItemDefinitionCode?: string
  task?: ProcessItemTaskCreateParams
  message?: ProcessItemMessageCreateParams
}

export interface ProcessItemCreateResponse {
  processItem: ProcessItem
}

export interface ProcessItemTaskCompleteRequest {
  processItemId: string
}

export interface ProcessItemTaskCompleteResponse {
  processItem: ProcessItem
}

export interface ProcessItemTaskClaimRequest {
  processItemId: string
}

export interface ProcessItemTaskClaimResponse {
  processItem: ProcessItem
}

export interface ProcessItemTaskDataUpdateRequest {
  processItemId: string
  data: JsonValue
}

export interface ProcessItemTaskDataUpdateResponse {
  processItem: ProcessItem
}

export interface ProcessItemTaskContextDataUpdateRequest {
  processItemId: string
  data: JsonValue
}

export interface ProcessItemTaskContextDataUpdateResponse {
  processItem: ProcessItem
}

export interface ProcessItemTaskDataPatchRequest {
  processItemId: string
  jsonPatch: JsonPatchOperation[]
}

export interface ProcessItemTaskDataPatchResponse {
  processItem: ProcessItem
}

export interface ProcessItemTaskAssignRequest {
  processItemId: string
  ownerEmail?: string
  ownerId?: string
}

export interface ProcessItemTaskAssignResponse {
  processItem: ProcessItem
}

export interface ProcessItemTaskLogAppendRequest {
  processItemId: string
  message: string
  level: ProcessItemTaskLogLevel
}

export interface ProcessItemTaskLogAppendResponse {
  processItem: ProcessItem
}

export interface ProcessItemAiAssistanceGenerateRequest {
  processItemId: string
  requestId: string
}

export interface ProcessItemAiAssistanceGenerateResponse {
  processItemAiAssistance: ProcessItemAiAssistance
}

export interface ProcessItemAiAssistanceRetrieveRequest {
  processItemId: string
}

export interface ProcessItemAiAssistanceRetrieveResponse {
  processItemAiAssistance: ProcessItemAiAssistance
}
