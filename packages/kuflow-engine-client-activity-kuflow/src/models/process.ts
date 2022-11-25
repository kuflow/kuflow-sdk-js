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
import { Process, ProcessElementValueNumber, ProcessElementValueString, ProcessPage } from '@kuflow/kuflow-rest-client'

export interface FindProcessesRequest {
  page?: number
  size?: number
  sort?: string[]
}

export interface FindProcessesResponse {
  processes: ProcessPage
}

export interface RetrieveProcessRequest {
  processId: string
}

export interface RetrieveProcessResponse {
  process: Process
}

export type ProcessElementValues = ProcessElementValueString[] | ProcessElementValueNumber[]

export interface SaveProcessElementRequest {
  processId: string
  elementDefinitionCode: string
  elementValues: ProcessElementValues
}

export interface SaveProcessElementResponse {
  process: Process
}

export interface DeleteProcessElementRequest {
  processId: string
  elementDefinitionCode: string
}

export interface DeleteProcessElementResponse {
  process: Process
}

export interface CompleteProcessRequest {
  processId: string
}

export interface CompleteProcessResponse {
  process: Process
}

export interface ChangeProcessInitiatorRequest {
  processId: string
  email?: string
  principalId?: string
}

export interface ChangeProcessInitiatorResponse {
  process: Process
}
