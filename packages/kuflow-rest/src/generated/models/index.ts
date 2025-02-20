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

export type WebhookEventUnion =
  | WebhookEventProcessCreated
  | WebhookEventProcessStateChanged
  | WebhookEventProcessItemCreated
  | WebhookEventProcessItemTaskStateChanged

export interface AuthenticationCreateParams {
  type: AuthenticationType
  /** Tenant id. This attribute is required when an OAuth2 authentication is used. */
  tenantId?: string
}

export interface AuthenticationEngineToken {
  /** Engine authentication token */
  token: string
  /** date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  expiredAt: string
}

export interface AuthenticationEngineCertificate {
  namespace: string
  tls: AuthenticationEngineCertificateTls
}

export interface AuthenticationEngineCertificateTls {
  serverRootCaCertificate: string
  clientCertificate: string
  clientPrivateKey: string
}

export interface AbstractAudited {
  /** Who create this model. */
  createdBy?: string
  /** When this model was created. - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  createdAt?: string
  /** Who was last update this model. */
  lastModifiedBy?: string
  /** When this model type was last updated. - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  lastModifiedAt?: string
}

/** Default error */
export interface DefaultError {
  /** Timestamp indicating when the error happened. - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  timestamp: string
  /** HTTP Status */
  status: number
  /** Message Status */
  message: string
  /** Related error information. */
  errors?: DefaultErrorInfo[]
}

export interface DefaultErrorInfo {
  code: string
  message: string
  location?: string
  locationType?: string
}

export interface VaultCodecPayloads {
  payloads: VaultCodecPayload[]
}

export interface VaultCodecPayload {
  /** Payload data. */
  metadata?: Record<string, Uint8Array>
  /** Payload data */
  data: Uint8Array
}

export interface PrincipalPageItem {
  id?: string
  type?: PrincipalType
  name?: string
}

export interface Page {
  metadata: PageMetadata
}

export interface PageMetadata {
  size: number
  page: number
  totalElements: number
  totalPages: number
}

export interface Principal {
  id?: string
  type?: PrincipalType
  name?: string
  user?: PrincipalUser
  application?: PrincipalApplication
}

export interface PrincipalUser {
  id?: string
  email?: string
}

export interface PrincipalApplication {
  id?: string
}

export interface TenantPageItem {
  id: string
  name: string
}

/** Json value. */
export interface JsonValue {
  /**
   * true if the data complain the related json schema.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly valid?: boolean
  /** json value filled that complain with the related json schema. */
  value: Record<string, any>
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly errors?: JsonValueError[]
}

/** Json value. */
export interface JsonValueError {
  /**
   * JSON pointer to the property with the error. See: https://datatracker.ietf.org/doc/html/rfc6901
   *
   * ie: /user/name or /users/1/name
   *
   */
  propertyPath?: string
  /** Error type. */
  type?: string
}

export interface ProcessDefinitionRef {
  id: string
  version: string
}

export interface ProcessCreateParams {
  id?: string
  processDefinitionId: string
  /** Json value. */
  metadata?: JsonValue
  initiatorId?: string
  initiatorEmail?: string
}

export interface ProcessRelated {
  /** Processes whose relationship target is the current process. */
  incoming?: string[]
  /** Processes to which the current process relates. */
  outcoming?: string[]
}

/** Params to change the process initiator, only one option is required. */
export interface ProcessChangeInitiatorParams {
  initiatorId?: string
  initiatorEmail?: string
}

/** Params to save metadata data. */
export interface ProcessMetadataUpdateParams {
  /** Json value. */
  metadata: JsonValue
}

export interface JsonPatchOperation {
  /** The operation to perform. */
  op: JsonPatchOperationType
  /** A JSON Pointer path used when op is "copy" or "move". */
  from?: string
  /** A JSON Pointer path. */
  path: string
  /** The value to "add", "replace" or "test". */
  value?: any | null
}

export interface ProcessEntityUpdateParams {
  /** Json value. */
  entity: JsonValue
}

export interface DocumentReference {
  /**
   * JSON value representing the uploaded file.
   *
   * Example: `kuflow-file:uri=xxx-yyy-zzz;type=application/json;size=500;name=file.json;`
   *
   */
  documentUri: string
}

export interface ProcessItemDefinitionRef {
  id: string
  version: string
  code: string
}

export interface ProcessItemTaskPageItem {
  /** Process Item Task state */
  state: ProcessItemTaskState
}

export interface ProcessItemMessagePageItem {
  /** Message text in Markdown format according to the specification https://spec.commonmark.org/ */
  text?: string
  dataStructureDataDefinitionCode?: string
}

export interface ProcessItemCreateParams {
  id?: string
  /** Process Item Type */
  type: ProcessItemType
  processId: string
  ownerId?: string
  ownerEmail?: string
  processItemDefinitionCode?: string
  task?: ProcessItemTaskCreateParams
  message?: ProcessItemMessageCreateParams
}

export interface ProcessItemTaskCreateParams {
  /** Json value. */
  data?: JsonValue
}

export interface ProcessItemMessageCreateParams {
  /** Message text in Markdown format according to the specification https://spec.commonmark.org/ */
  text?: string
  /** Json value. */
  data?: JsonValue
  dataStructureDataDefinitionCode?: string
}

export interface ProcessItemTask {
  /** Process Item Task state */
  state: ProcessItemTaskState
  /** Json value. */
  data?: JsonValue
  logs?: ProcessItemTaskLog[]
}

export interface ProcessItemTaskLog {
  id: string
  /** When this model was created. - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  timestamp: string
  message: string
  level: ProcessItemTaskLogLevel
}

export interface ProcessItemMessage {
  /** Message text in Markdown format according to the specification https://spec.commonmark.org/ */
  text?: string
  /** Json value. */
  data?: JsonValue
  dataStructureDataDefinitionCode?: string
}

/** Params to assign a process item task, only one option is required. */
export interface ProcessItemTaskAssignParams {
  ownerId?: string
  ownerEmail?: string
}

export interface ProcessItemTaskAppendLogParams {
  message: string
  level: ProcessItemTaskLogLevel
}

export interface ProcessItemTaskDataUpdateParams {
  /** Json value. */
  data: JsonValue
}

export interface WorkerCreateParams {
  identity: string
  taskQueue: string
  workflowTypes?: string[]
  activityTypes?: string[]
  hostname: string
  ip: string
  /** Installation Id. */
  installationId?: string
  /** Robot Ids that this worker implements. */
  robotIds?: string[]
  /** Tenant ID. */
  tenantId?: string
}

/** Robot source type */
export interface RobotSourceFile {
  /** Robot ID. */
  id: string
  /** Source file name. */
  name: string
  /** Source file content type. */
  contentType: string
  /** Source file length. */
  contentLength: number
  /** Source file to check the integrity. */
  contentHash: string
}

export interface WebhookEvent {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'PROCESS.CREATED' | 'PROCESS.STATE_CHANGED' | 'PROCESS_ITEM.CREATED' | 'PROCESS_ITEM.TASK_STATE_CHANGED'
  id: string
  version: string
  /** date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  timestamp: string
}

export interface WebhookEventProcessCreatedData {
  processId: string
  /** Process state */
  processState: ProcessState
}

export interface WebhookEventProcessStateChangedData {
  processId: string
  /** Process state */
  processState: ProcessState
}

export interface WebhookEventProcessItemCreatedData {
  processId: string
  processItemId: string
  /** Process Item Type */
  processItemType: ProcessItemType
  /** Process Item Task state */
  processItemState?: ProcessItemTaskState
  processItemDefinitionCode?: string
}

export interface WebhookEventProcessItemTaskStateChangedData {
  processId: string
  processItemId: string
  /** Process Item Type */
  processItemType: ProcessItemType
  /** Process Item Task state */
  processItemState: ProcessItemTaskState
  processItemDefinitionCode: string
}

export interface Authentication extends AbstractAudited {
  id?: string
  type?: AuthenticationType
  /** Tenant id. This attribute is required when an OAuth2 authentication is used. */
  tenantId?: string
  engineToken?: AuthenticationEngineToken
  engineCertificate?: AuthenticationEngineCertificate
}

export interface Tenant extends AbstractAudited {
  id: string
  name: string
  /** Tenant pricing plan */
  plan: TenantPricingPlan
}

export interface TenantUserPageItem extends AbstractAudited {
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly id: string
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly principalId: string
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly tenantId: string
}

export interface TenantUser extends AbstractAudited {
  id: string
  /** Json value. */
  metadata?: JsonValue
  principal: Principal
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly tenantId: string
}

export interface ProcessPageItem extends AbstractAudited {
  /** Process ID. */
  id: string
  /** Process state */
  state: ProcessState
  processDefinitionRef: ProcessDefinitionRef
  /** Principal ID. */
  initiatorId?: string
  /** Tenant ID. */
  tenantId: string
}

export interface Process extends AbstractAudited {
  /** Process ID. */
  id: string
  /** Process state */
  state: ProcessState
  processDefinitionRef?: ProcessDefinitionRef
  /** Json value. */
  metadata?: JsonValue
  /** Json value. */
  entity?: JsonValue
  processRelated?: ProcessRelated
  /** Process initiator id, Principal ID. */
  initiatorId?: string
  /** Tenant ID. */
  tenantId: string
}

export interface ProcessItemPageItem extends AbstractAudited {
  id: string
  /** Process Item Type */
  type: ProcessItemType
  processId: string
  /** Principal ID. */
  ownerId?: string
  /** Tenant ID. */
  tenantId: string
  processItemDefinitionRef?: ProcessItemDefinitionRef
  task?: ProcessItemTaskPageItem
  message?: ProcessItemMessagePageItem
}

export interface ProcessItem extends AbstractAudited {
  id: string
  /** Process Item Type */
  type: ProcessItemType
  processId: string
  /** Owner Principal ID. */
  ownerId?: string
  /** Tenant ID. */
  tenantId?: string
  processItemDefinitionRef?: ProcessItemDefinitionRef
  task?: ProcessItemTask
  message?: ProcessItemMessage
}

export interface Worker extends AbstractAudited {
  id?: string
  identity: string
  taskQueue: string
  workflowTypes?: string[]
  activityTypes?: string[]
  hostname: string
  ip: string
  /** Installation Id. */
  installationId?: string
  /** Robot Ids that this worker implements. */
  robotIds?: string[]
  /** Tenant ID. */
  tenantId?: string
}

export interface RobotPageItem extends AbstractAudited {
  /** Robot ID. */
  id: string
  /** Robot Code. */
  code: string
  /** Robot name. */
  name: string
  /** Robot description. */
  description?: string
  /** Robot source type */
  sourceType: RobotSourceType
  /** Robot source type */
  sourceFile: RobotSourceFile
  /** Tenant ID. */
  tenantId: string
}

export interface Robot extends AbstractAudited {
  /** Robot ID. */
  id: string
  /** Robot Code. */
  code: string
  /** Robot name. */
  name: string
  /** Robot description. */
  description?: string
  /** Robot source type */
  sourceType: RobotSourceType
  /** Robot source type */
  sourceFile: RobotSourceFile
  /** Environment variables to load when the robot is executed. */
  environmentVariables?: Record<string, string>
  /** Tenant ID. */
  tenantId: string
}

export interface PrincipalPage extends Page {
  content: PrincipalPageItem[]
}

export interface TenantPage extends Page {
  content: TenantPageItem[]
}

export interface TenantUserPage extends Page {
  content: TenantUserPageItem[]
}

export interface ProcessPage extends Page {
  content: ProcessPageItem[]
}

export interface ProcessItemPage extends Page {
  content: ProcessItemPageItem[]
}

export interface RobotPage extends Page {
  content: RobotPageItem[]
}

/** Process Events */
export interface WebhookEventProcessCreated extends WebhookEvent {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'PROCESS.CREATED'
  data: WebhookEventProcessCreatedData
}

/** Process Events */
export interface WebhookEventProcessStateChanged extends WebhookEvent {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'PROCESS.STATE_CHANGED'
  data: WebhookEventProcessStateChangedData
}

/** Process Events */
export interface WebhookEventProcessItemCreated extends WebhookEvent {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'PROCESS_ITEM.CREATED'
  data: WebhookEventProcessItemCreatedData
}

/** Process Events */
export interface WebhookEventProcessItemTaskStateChanged extends WebhookEvent {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'PROCESS_ITEM.TASK_STATE_CHANGED'
  data: WebhookEventProcessItemTaskStateChangedData
}

/** Defines values for AuthenticationType. */
export type AuthenticationType = 'ENGINE_TOKEN' | 'ENGINE_CERTIFICATE'
/** Defines values for PrincipalType. */
export type PrincipalType = 'USER' | 'APPLICATION' | 'SYSTEM'
/** Defines values for TenantPricingPlan. */
export type TenantPricingPlan = 'FREE' | 'PREMIUM' | 'UNLIMITED'
/** Defines values for ProcessState. */
export type ProcessState = 'RUNNING' | 'COMPLETED' | 'CANCELLED'
/** Defines values for JsonPatchOperationType. */
export type JsonPatchOperationType = 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test'
/** Defines values for ProcessItemType. */
export type ProcessItemType = 'TASK' | 'MESSAGE' | 'THREAD'
/** Defines values for ProcessItemTaskState. */
export type ProcessItemTaskState = 'READY' | 'CLAIMED' | 'COMPLETED' | 'CANCELLED'
/** Defines values for ProcessItemTaskLogLevel. */
export type ProcessItemTaskLogLevel = 'INFO' | 'WARN' | 'ERROR'
/** Defines values for RobotFilterContext. */
export type RobotFilterContext = 'READY' | 'DEFAULT'
/** Defines values for RobotSourceType. */
export type RobotSourceType = 'PACKAGE' | 'UNKNOWN'
/** Defines values for RobotAssetType. */
export type RobotAssetType = 'PYTHON' | 'PYTHON_PIP' | 'NODEJS'
/** Defines values for RobotAssetPlatform. */
export type RobotAssetPlatform = 'WINDOWS' | 'MAC_OS' | 'LINUX'
/** Defines values for RobotAssetArchitecture. */
export type RobotAssetArchitecture = 'X86_32' | 'X86_64'
/** Defines values for WebhookType. */
export type WebhookType =
  | 'PROCESS.CREATED'
  | 'PROCESS.STATE_CHANGED'
  | 'PROCESS_ITEM.CREATED'
  | 'PROCESS_ITEM.TASK_STATE_CHANGED'

/** Optional parameters. */
export interface AuthenticationCreateAuthenticationOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the createAuthentication operation. */
export type AuthenticationCreateAuthenticationResponse = Authentication

/** Optional parameters. */
export interface VaultCodecEncodeOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the codecEncode operation. */
export type VaultCodecEncodeResponse = VaultCodecPayloads

/** Optional parameters. */
export interface VaultCodecDecodeOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the codecDecode operation. */
export type VaultCodecDecodeResponse = VaultCodecPayloads

/** Optional parameters. */
export interface PrincipalFindPrincipalsOptionalParams extends coreClient.OperationOptions {
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
  sort?: string[]
  /** Filter principals by type. */
  type?: PrincipalType
  /** Filter by group ids. */
  groupId?: string[]
  /** Filter by tenantId. */
  tenantId?: string[]
}

/** Contains response data for the findPrincipals operation. */
export type PrincipalFindPrincipalsResponse = PrincipalPage

/** Optional parameters. */
export interface PrincipalRetrievePrincipalOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrievePrincipal operation. */
export type PrincipalRetrievePrincipalResponse = Principal

/** Optional parameters. */
export interface TenantFindTenantsOptionalParams extends coreClient.OperationOptions {
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
  sort?: string[]
  /** Filter by tenantId. */
  tenantId?: string[]
}

/** Contains response data for the findTenants operation. */
export type TenantFindTenantsResponse = TenantPage

/** Optional parameters. */
export interface TenantRetrieveTenantOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveTenant operation. */
export type TenantRetrieveTenantResponse = Tenant

/** Optional parameters. */
export interface TenantUserFindTenantUsersOptionalParams extends coreClient.OperationOptions {
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
  sort?: string[]
  /** Filter by group ids. */
  groupId?: string[]
  /** Filter by tenantId. */
  tenantId?: string[]
  /** Filter by email. */
  email?: string[]
}

/** Contains response data for the findTenantUsers operation. */
export type TenantUserFindTenantUsersResponse = TenantUserPage

/** Optional parameters. */
export interface TenantUserRetrieveTenantUserOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveTenantUser operation. */
export type TenantUserRetrieveTenantUserResponse = TenantUser

/** Optional parameters. */
export interface ProcessFindProcessesOptionalParams extends coreClient.OperationOptions {
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
  sort?: string[]
  /** Filter by tenantId. */
  tenantId?: string[]
}

/** Contains response data for the findProcesses operation. */
export type ProcessFindProcessesResponse = ProcessPage

/** Optional parameters. */
export interface ProcessCreateProcessOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the createProcess operation. */
export type ProcessCreateProcessResponse = Process

/** Optional parameters. */
export interface ProcessRetrieveProcessOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveProcess operation. */
export type ProcessRetrieveProcessResponse = Process

/** Optional parameters. */
export interface ProcessCompleteProcessOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the completeProcess operation. */
export type ProcessCompleteProcessResponse = Process

/** Optional parameters. */
export interface ProcessCancelProcessOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the cancelProcess operation. */
export type ProcessCancelProcessResponse = Process

/** Optional parameters. */
export interface ProcessChangeProcessInitiatorOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the changeProcessInitiator operation. */
export type ProcessChangeProcessInitiatorResponse = Process

/** Optional parameters. */
export interface ProcessUploadProcessUserActionDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the uploadProcessUserActionDocument operation. */
export type ProcessUploadProcessUserActionDocumentResponse = Process

/** Optional parameters. */
export interface ProcessUpdateProcessMetadataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the updateProcessMetadata operation. */
export type ProcessUpdateProcessMetadataResponse = Process

/** Optional parameters. */
export interface ProcessPatchProcessMetadataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the patchProcessMetadata operation. */
export type ProcessPatchProcessMetadataResponse = Process

/** Optional parameters. */
export interface ProcessUpdateProcessEntityOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the updateProcessEntity operation. */
export type ProcessUpdateProcessEntityResponse = Process

/** Optional parameters. */
export interface ProcessPatchProcessEntityOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the patchProcessEntity operation. */
export type ProcessPatchProcessEntityResponse = Process

/** Optional parameters. */
export interface ProcessUploadProcessDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the uploadProcessDocument operation. */
export type ProcessUploadProcessDocumentResponse = DocumentReference

/** Optional parameters. */
export interface ProcessDownloadProcessDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the downloadProcessDocument operation. */
export interface ProcessDownloadProcessDocumentResponse {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream
}

/** Optional parameters. */
export interface ProcessItemFindProcessItemsOptionalParams extends coreClient.OperationOptions {
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
  sort?: string[]
  /** Filter by tenantId. */
  tenantId?: string[]
  /** Filter by an array of process ids. */
  processId?: string[]
  /** Filter by an array of type. */
  type?: ProcessItemType[]
  /** Filter by an array of task states. */
  taskState?: ProcessItemTaskState[]
  /** Filter by an array of task definition codes. */
  processItemDefinitionCode?: string[]
}

/** Contains response data for the findProcessItems operation. */
export type ProcessItemFindProcessItemsResponse = ProcessItemPage

/** Optional parameters. */
export interface ProcessItemCreateProcessItemOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the createProcessItem operation. */
export type ProcessItemCreateProcessItemResponse = ProcessItem

/** Optional parameters. */
export interface ProcessItemRetrieveProcessItemOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveProcessItem operation. */
export type ProcessItemRetrieveProcessItemResponse = ProcessItem

/** Optional parameters. */
export interface ProcessItemClaimProcessItemTaskOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the claimProcessItemTask operation. */
export type ProcessItemClaimProcessItemTaskResponse = ProcessItem

/** Optional parameters. */
export interface ProcessItemAssignProcessItemTaskOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the assignProcessItemTask operation. */
export type ProcessItemAssignProcessItemTaskResponse = ProcessItem

/** Optional parameters. */
export interface ProcessItemCompleteProcessItemTaskOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the completeProcessItemTask operation. */
export type ProcessItemCompleteProcessItemTaskResponse = ProcessItem

/** Optional parameters. */
export interface ProcessItemAppendProcessItemTaskLogOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the appendProcessItemTaskLog operation. */
export type ProcessItemAppendProcessItemTaskLogResponse = ProcessItem

/** Optional parameters. */
export interface ProcessItemUpdateProcessItemTaskDataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the updateProcessItemTaskData operation. */
export type ProcessItemUpdateProcessItemTaskDataResponse = ProcessItem

/** Optional parameters. */
export interface ProcessItemPatchProcessItemTaskDataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the patchProcessItemTaskData operation. */
export type ProcessItemPatchProcessItemTaskDataResponse = ProcessItem

/** Optional parameters. */
export interface ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the downloadProcessItemTaskDataWebformsAsDocument operation. */
export interface ProcessItemDownloadProcessItemTaskDataWebformsAsDocumentResponse {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream
}

/** Optional parameters. */
export interface WorkerCreateWorkerOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the createWorker operation. */
export type WorkerCreateWorkerResponse = Worker

/** Optional parameters. */
export interface RobotFindRobotsOptionalParams extends coreClient.OperationOptions {
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
  sort?: string[]
  /** Filter by tenantId. */
  tenantId?: string[]
  /** Filter by the specified context. */
  filterContext?: RobotFilterContext
}

/** Contains response data for the findRobots operation. */
export type RobotFindRobotsResponse = RobotPage

/** Optional parameters. */
export interface RobotRetrieveRobotOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveRobot operation. */
export type RobotRetrieveRobotResponse = Robot

/** Optional parameters. */
export interface RobotDownloadRobotSourceCodeOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the downloadRobotSourceCode operation. */
export interface RobotDownloadRobotSourceCodeResponse {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream
}

/** Optional parameters. */
export interface RobotDownloadRobotAssetOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the downloadRobotAsset operation. */
export interface RobotDownloadRobotAssetResponse {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream
}

/** Optional parameters. */
export interface KuFlowRestClientGeneratedOptionalParams extends coreClient.ServiceClientOptions {
  /** server parameter */
  $host?: string
  /** Overrides client endpoint. */
  endpoint?: string
}
