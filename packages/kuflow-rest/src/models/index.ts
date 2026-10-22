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

import type {
  DeletedQueryParam,
  PrincipalType,
  ProcessItemTaskState,
  ProcessItemType,
  ProcessState,
  RobotFilterContext,
} from '../generated'

export interface Document {
  fileName: string

  contentType: string

  fileContent: coreRestPipeline.RequestBodyType
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
  /** Filter by tenantId. */
  tenantId?: string | string[]
  /** Filter by process definition ids. */
  processDefinitionId?: string | string[]
  /** Filter by process definition codes. */
  processDefinitionCode?: string | string[]
  /** Filter by an array of process states. */
  state?: ProcessState | ProcessState[]
  /** Filter by an array of initiator ids, Principal ID. */
  initiatorId?: string | string[]
  /** Filter by an array of initiator emails. */
  initiatorEmail?: string | string[]
  /**
   * Filter by process metadata field values. Each value is an expression with the format
   * `fieldCode operation value1 value2...` (space-separated).
   *
   * Supported operations: `eq`, `le`, `ge`, `between`, `contains`, `in`.
   *
   * Filtering by metadata requires specifying exactly one `processDefinitionId` or `processDefinitionCode`.
   */
  metadata?: string | string[]
  /**
   * Deleted Processes filtering mode; when omitted, `EXCLUDE` applies. With `INCLUDE` or `ONLY`, deleted
   * Processes are returned with their `deletedAt` and `deletedBy` fields set. They are only returned when the
   * request identifies exactly one Process Definition — by exactly one `processDefinitionId`, or by exactly one
   * `processDefinitionCode` together with exactly one `tenantId` (codes are unique per tenant) — and the
   * credentials can delete any Process of that definition; otherwise they are silently left out.
   */
  deleted?: DeletedQueryParam
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
  /** Filter principals that exists in one of group codes. */
  groupCode?: string | string[]
  /** Filter by tenantId. */
  tenantId?: string | string[]
}

/** Optional parameters. */
export interface GroupFindGroupsOptionalExtParams extends coreClient.OperationOptions {
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
  /** Filter groups where the principalId exists. */
  principalId?: string
  /** Filter by tenantId. */
  tenantId?: string | string[]
  /** Filter by group ids. */
  groupId?: string | string[]
  /** Filter by group codes. */
  groupCode?: string | string[]
}

/** Optional parameters. */
export interface TenantFindTenantOptionalExtParams extends coreClient.OperationOptions {
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
  /** Filter by tenantId. */
  tenantId?: string | string[]
}

/** Optional parameters. */
export interface TenantUserFindTenantUsersOptionalExtParams extends coreClient.OperationOptions {
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
  /** Filter by group ids. */
  groupId?: string | string[]
  /** Filter by group codes. */
  groupCode?: string | string[]
  /** Filter by tenantId. */
  tenantId?: string | string[]
  /** Filter by email. */
  email?: string | string[]
}

/** Optional parameters. */
export interface ProcessItemFindProcessItemsOptionalExtParams extends coreClient.OperationOptions {
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
  /** Filter by tenantId. */
  tenantId?: string | string[]
  /** Filter by process definition ids. */
  processDefinitionId?: string | string[]
  /** Filter by process definition codes. */
  processDefinitionCode?: string | string[]
  /**
   * Deleted Process Items filtering mode; when omitted, `EXCLUDE` applies. The Process Items of a deleted
   * Process are deleted with it. With `INCLUDE` or `ONLY`, deleted Process Items are returned with their
   * `deletedAt` and `deletedBy` fields set. They are only returned when the request identifies exactly one
   * Process Definition — by exactly one `processDefinitionId`, or by exactly one `processDefinitionCode`
   * together with exactly one `tenantId` (codes are unique per tenant) — and the credentials can delete any
   * Process of that definition; otherwise they are silently left out.
   */
  deleted?: DeletedQueryParam
  /** Filter by an array of process ids. */
  processId?: string | string[]
  /** Filter by an array of task states. */
  type?: ProcessItemType | ProcessItemType[]
  /** Filter by an array of task states. */
  taskState?: ProcessItemTaskState | ProcessItemTaskState[]
  /** Filter by an array of process item definition codes. */
  processItemDefinitionCode?: string | string[]
}

/** Optional parameters. */
export interface BusinessArtifactFindBusinessArtifactsOptionalExtParams extends coreClient.OperationOptions {
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
  /** Filter by tenantId. */
  tenantId?: string | string[]
  /**
   * Soft-deleted Business Artifacts filtering mode; when omitted, `EXCLUDE` applies. With `INCLUDE` or `ONLY`,
   * deleted Business Artifacts are returned with their `deletedAt` and `deletedBy` fields set. They are only
   * returned when the request identifies exactly one Business Artifact Definition — by exactly one
   * `businessArtifactDefinitionId`, or by exactly one `businessArtifactDefinitionCode` together with exactly one
   * `tenantId` (codes are unique per tenant) — and the credentials can archive or supervise its Business
   * Artifacts; otherwise they are silently left out.
   */
  deleted?: DeletedQueryParam
  /** Filter by an array of business artifact definition ids. */
  businessArtifactDefinitionId?: string | string[]
  /** Filter by an array of business artifact definition codes. */
  businessArtifactDefinitionCode?: string | string[]
  /**
   * Filter by indexed field values. Each value is an expression with the format
   * `fieldCode operation value1 value2...` (space-separated).
   *
   * Supported operations: `eq`, `le`, `ge`, `between`, `contains`, `in`.
   */
  value?: string | string[]
}

/** Optional parameters. */
export interface ProcessCancelProcessItemsOptionalExtParams extends coreClient.OperationOptions {
  /** Optional list of process item IDs to cancel. If omitted, all active process items are cancelled. */
  processItemId?: string | string[]
}

/** Optional parameters. */
export interface RobotFindRobotExtParams extends coreClient.OperationOptions {
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
  /** Filter by tenantId. */
  tenantId?: string | string[]
  /** Filter by the specified context. */
  filterContext?: RobotFilterContext
}
