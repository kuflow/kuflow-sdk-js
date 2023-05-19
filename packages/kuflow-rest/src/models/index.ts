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
import type * as coreClient from '@azure/core-client'
import type * as coreRestPipeline from '@azure/core-rest-pipeline'

import { type PrincipalType, type TaskState } from '../generated'

export interface Document {
  fileName: string

  contentType: string

  fileContent: coreRestPipeline.RequestBodyType
}

export interface TaskSaveElementValueDocumentCommand {
  elementDefinitionCode: string
  elementValueId?: string
  elementValueValid?: boolean
}

export interface TaskSaveJsonFormsValueDocumentRequestCommand {
  schemaPath: string
}

export interface ProcessSaveUserActionValueDocumentCommand {
  userActionValueId: string
}

export interface JsonFormsPrincipal {
  id: string
  type: PrincipalType
  name: string
}

export interface JsonFormsFile {
  uri: string
  type: string
  name: string
  size: number
}

/** Optional parameters. */
export interface PrincipalFindPrincipalsOptionalExtParams extends coreClient.OperationOptions {
  /** The number of records returned within a single API call. */
  size?: number
  /** The page number of the current page in the returned records, 0 is the first page. */
  page?: number
  /**
   * Sorting criteria in the format: property{,asc|desc}. Example: createdAt,desc
   *
   * Default sort order is ascending. Multiple sort criteria are supported.
   *
   * Please refer to the method description for supported properties.
   *
   */
  sort?: string | string[]
  /** Filter principals by type. */
  type?: PrincipalType
  /** Filter principals that exists in one of group ids. */
  groupId?: string | string[]
}

/** Optional parameters. */
export interface ProcessFindProcessesOptionalExtParams extends coreClient.OperationOptions {
  /** The number of records returned within a single API call. */
  size?: number
  /** The page number of the current page in the returned records, 0 is the first page. */
  page?: number
  /**
   * Sorting criteria in the format: property{,asc|desc}. Example: createdAt,desc
   *
   * Default sort order is ascending. Multiple sort criteria are supported.
   *
   * Please refer to the method description for supported properties.
   *
   */
  sort?: string | string[]
}

/** Optional parameters. */
export interface TaskFindTasksOptionalExtParams extends coreClient.OperationOptions {
  /** The number of records returned within a single API call. */
  size?: number
  /** The page number of the current page in the returned records, 0 is the first page. */
  page?: number
  /**
   * Sorting criteria in the format: property{,asc|desc}. Example: createdAt,desc
   *
   * Default sort order is ascending. Multiple sort criteria are supported.
   *
   * Please refer to the method description for supported properties.
   *
   */
  sort?: string | string[]
  /** Filter by an array of process ids. */
  processId?: string | string[]
  /** Filter by an array of task states. */
  state?: TaskState | TaskState[]
  /** Filter by an array of task definition codes. */
  taskDefinitionCode?: string | string[]
}
