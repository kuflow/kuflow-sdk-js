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

import type { JsonPatchOperation, JsonValue, Process, ProcessPage } from '@kuflow/kuflow-rest'

export interface ProcessFindRequest {
  page?: number
  size?: number
  sorts?: string[]
}

export interface ProcessFindResponse {
  processes: ProcessPage
}

export interface ProcessRetrieveRequest {
  processId: string
}

export interface ProcessRetrieveResponse {
  process: Process
}

export interface ProcessEntityUpdateRequest {
  processId: string
  entity: JsonValue
}

export interface ProcessEntityUpdateResponse {
  process: Process
}

export interface ProcessEntityPatchRequest {
  processId: string
  jsonPatch: JsonPatchOperation[]
}

export interface ProcessEntityPatchResponse {
  process: Process
}

export interface ProcessMetadataUpdateRequest {
  processId: string
  metadata: JsonValue
}

export interface ProcessMetadataUpdateResponse {
  process: Process
}

export interface ProcessMetadataPatchRequest {
  processId: string
  jsonPatch: JsonPatchOperation[]
}

export interface ProcessMetadataPatchResponse {
  process: Process
}

export interface ProcessInitiatorChangeRequest {
  processId: string
  initiatorId?: string
  initiatorEmail?: string
}

export interface ProcessInitiatorChangeResponse {
  process: Process
}
