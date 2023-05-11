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
import { type Log, type Task, type TaskElementValueUnion, type TaskPage, type TaskState } from '@kuflow/kuflow-rest'

export interface FindTasksRequest {
  page?: number
  size?: number
  sorts?: string[]
  processIds?: string[]
  states?: TaskState[]
  taskDefinitionCodes?: string[]
}

export interface FindTasksResponse {
  tasks: TaskPage
}

export interface RetrieveTaskRequest {
  taskId: string
}

export interface RetrieveTaskResponse {
  task: Task
}

export interface CreateTaskRequest {
  task: Task
}

export interface CreateTaskResponse {
  task: Task
}

export interface CompleteTaskRequest {
  taskId: string
}

export interface CompleteTaskResponse {
  task: Task
}

export interface ClaimTaskRequest {
  taskId: string
}

export interface ClaimTaskResponse {
  task: Task
}

export interface SaveTaskElementRequest {
  taskId: string
  elementDefinitionCode: string
  elementValues?: TaskElementValueUnion[]
}

export interface SaveTaskElementResponse {
  task: Task
}

export interface DeleteTaskElementRequest {
  taskId: string
  elementDefinitionCode: string
}

export interface DeleteTaskElementResponse {
  task: Task
}

export interface DeleteTaskElementValueDocumentRequest {
  taskId: string
  documentId: string
}

export interface DeleteTaskElementValueDocumentResponse {
  task: Task
}

export interface AssignTaskRequest {
  taskId: string
  email?: string
  principalId?: string
}

export interface AssignTaskResponse {
  task: Task
}

export interface AppendTaskLogRequest {
  taskId: string
  log: Log
}

export interface AppendTaskLogResponse {
  task: Task
}
