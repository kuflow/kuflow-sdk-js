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

export type ProcessElementValueUnion = ProcessElementValueString | ProcessElementValueNumber
export type TaskElementValueUnion =
  | TaskElementValueString
  | TaskElementValueNumber
  | TaskElementValueObject
  | TaskElementValueDocument
  | TaskElementValuePrincipal
export type WebhookEventUnion = WebhookEventProcessStateChanged | WebhookEventTaskStateChanged

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
  /** Audited object Types. */
  objectType?: AuditedObjectType
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

export interface Page {
  /** Paged Model types. */
  objectType?: PagedObjectType
  metadata: PageMetadata
}

export interface PageMetadata {
  size: number
  page: number
  totalElements: number
  totalPages: number
}

export interface TenantUserMetadata {
  valid: boolean
  /** Dictionary of <any> */
  value: Record<string, any>
}

export interface ProcessDefinitionSummary {
  id: string
  version?: string
  name?: string
}

export interface ProcessElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'STRING' | 'NUMBER'
  valid?: boolean
}

/**
 * Json form values, used when the render type selected is JSON Forms.
 *
 */
export interface JsonFormsValue {
  /** true if the data complain the related json schema. */
  valid?: boolean
  /** json value filled that complain with the related json schema. */
  data?: Record<string, any>
}

export interface RelatedProcess {
  /** Processes whose relationship target is the current process. */
  incoming?: string[]
  /** Processes to which the current process relates. */
  outcoming?: string[]
}

/** Command to change the process initiator, only one option is required. */
export interface ProcessChangeInitiatorCommand {
  principalId?: string
  email?: string
}

/** Command to save process element. */
export interface ProcessSaveElementCommand {
  elementDefinitionCode: string
  elementValues?: ProcessElementValueUnion[]
}

export interface ProcessDeleteElementCommand {
  /** Code of task element to delete. */
  elementDefinitionCode: string
}

export interface ProcessSaveEntityDataCommand {
  /** json value filled that complain with the related json schema. */
  data: Record<string, any>
}

export interface ProcessSaveEntityDocumentResponseCommand {
  /**
   * JSON value representing the uploaded file.
   *
   * Example: `kuflow-file:uri=xxx-yyy-zzz;type=application/json;size=500;name=file.json;`
   *
   */
  value: string
}

/** In creation task, one of 'id, version or code' is mandatory. */
export interface TaskDefinitionSummary {
  id?: string
  version?: string
  code?: string
  name?: string
}

export interface TaskElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'STRING' | 'NUMBER' | 'OBJECT' | 'DOCUMENT' | 'PRINCIPAL'
  valid?: boolean
}

export interface Log {
  id?: string
  /** When this model was created. - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  createdAt?: string
  message: string
  level: LogLevel
}

/** Command to assign task, only one option is required. */
export interface TaskAssignCommand {
  principalId?: string
  email?: string
}

export interface TaskSaveElementCommand {
  elementDefinitionCode: string
  elementValues?: TaskElementValueUnion[]
}

export interface TaskDeleteElementCommand {
  /** Code of task element to delete. */
  elementDefinitionCode: string
}

export interface TaskDeleteElementValueDocumentCommand {
  /** Document ID to delete. */
  documentId: string
}

export interface TaskSaveJsonFormsValueDataCommand {
  /** json value filled that complain with the related json schema. */
  data?: Record<string, any>
}

export interface TaskSaveJsonFormsValueDocumentResponseCommand {
  /**
   * JSON value representing the uploaded file.
   *
   * Example: `kuflow-file:uri=xxx-yyy-zzz;type=application/json;size=500;name=file.json;`
   *
   */
  value: string
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

export interface WebhookEventProcessStateChangedData {
  processId: string
  /** Process state */
  processState: ProcessState
}

export interface WebhookEventTaskStateChangedData {
  processId: string
  taskId: string
  taskCode: string
  /** Task state */
  taskState: TaskState
}

export interface WebhookEvent {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'PROCESS.STATE_CHANGED' | 'TASK.STATE_CHANGED'
  id: string
  /** date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  timestamp: string
}

export interface TaskElementValueDocumentItem {
  id?: string
  uri?: string
  name?: string
  contentPath?: string
  contentType?: string
  contentLength?: number
}

export interface TaskElementValuePrincipalItem {
  id: string
  type: PrincipalType
  name?: string
}

export interface Authentication extends AbstractAudited {
  id?: string
  type?: AuthenticationType
  /** Tenant id. This attribute is required when an OAuth2 authentication is used. */
  tenantId?: string
  /**
   * Engine authentication token.
   *
   * @deprecated use engineToken.token
   *
   */
  token?: string
  /**
   * Engine authentication token expiration.
   *
   * @deprecated use engineToken.expiredAt
   *  - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z
   */
  expiredAt?: string
  engineToken?: AuthenticationEngineToken
  engineCertificate?: AuthenticationEngineCertificate
}

export interface TenantUser extends AbstractAudited {
  id: string
  metadata?: TenantUserMetadata
  principal: Principal
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly tenantId: string
}

export interface ProcessPageItem extends AbstractAudited {
  /** Process ID. */
  id?: string
  /** Process subject. */
  subject?: string
  /** Process state */
  state?: ProcessState
  processDefinition: ProcessDefinitionSummary
  /** Process element values, an ElementValueDocument is not allowed. */
  elementValues?: Record<string, ProcessElementValueUnion[]>
  initiator?: Principal
  /** Tenant ID. */
  tenantId?: string
}

export interface Process extends AbstractAudited {
  /** Process ID. */
  id?: string
  /** Process subject. */
  subject?: string
  /** Process state */
  state?: ProcessState
  processDefinition: ProcessDefinitionSummary
  /** Process element values, an ElementValueDocument is not allowed. */
  elementValues?: Record<string, ProcessElementValueUnion[]>
  /**
   * Json form values, used when the render type selected is JSON Forms.
   *
   */
  entity?: JsonFormsValue
  initiator?: Principal
  relatedProcess?: RelatedProcess
  /** Tenant ID. */
  tenantId?: string
}

export interface TaskPageItem extends AbstractAudited {
  id?: string
  /** Task state */
  state?: TaskState
  /** In creation task, one of 'id, version or code' is mandatory. */
  taskDefinition: TaskDefinitionSummary
  processId: string
  /** Task element values, en ElementValueDocument is not allowed. */
  elementValues?: Record<string, TaskElementValueUnion[]>
  /**
   * Json form values, used when the render type selected is JSON Forms.
   *
   */
  jsonFormsValue?: JsonFormsValue
  owner?: Principal
  /** Tenant ID. */
  tenantId?: string
}

export interface Task extends AbstractAudited {
  id?: string
  /** Task state */
  state?: TaskState
  /** In creation task, one of 'id, version or code' is mandatory. */
  taskDefinition: TaskDefinitionSummary
  processId: string
  /**
   * Task element values, en ElementValueDocument is not allowed, used when the task render type selected is
   * JSON Forms
   *
   */
  elementValues?: Record<string, TaskElementValueUnion[]>
  /**
   * Json form values, used when the render type selected is JSON Forms.
   *
   */
  jsonFormsValue?: JsonFormsValue
  logs?: Log[]
  owner?: Principal
  /** Tenant ID. */
  tenantId?: string
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
  sourceFile?: RobotSourceFile
  /** Environment variables to load when the robot is executed. */
  environmentVariables?: Record<string, string>
  /** Tenant ID. */
  tenantId?: string
}

export interface PrincipalPage extends Page {
  content: Principal[]
}

export interface TenantUserPage extends Page {
  content: TenantUser[]
}

export interface ProcessPage extends Page {
  content: ProcessPageItem[]
}

export interface TaskPage extends Page {
  content: TaskPageItem[]
}

export interface RobotPage extends Page {
  content: Robot[]
}

export interface ProcessElementValueString extends ProcessElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'STRING'
  value?: string
}

export interface ProcessElementValueNumber extends ProcessElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'NUMBER'
  value?: number
}

export interface TaskElementValueString extends TaskElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'STRING'
  value?: string
}

export interface TaskElementValueNumber extends TaskElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'NUMBER'
  value?: number
}

export interface TaskElementValueObject extends TaskElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'OBJECT'
  /** Dictionary of <any> */
  value?: Record<string, any>
}

export interface TaskElementValueDocument extends TaskElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'DOCUMENT'
  value?: TaskElementValueDocumentItem
}

export interface TaskElementValuePrincipal extends TaskElementValue {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'PRINCIPAL'
  value?: TaskElementValuePrincipalItem
}

/** Process Events */
export interface WebhookEventProcessStateChanged extends WebhookEvent {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'PROCESS.STATE_CHANGED'
  data: WebhookEventProcessStateChangedData
}

/** Process Events */
export interface WebhookEventTaskStateChanged extends WebhookEvent {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  type: 'TASK.STATE_CHANGED'
  data: WebhookEventTaskStateChangedData
}

/** Defines values for AuthenticationType. */
export type AuthenticationType = 'ENGINE' | 'ENGINE_TOKEN' | 'ENGINE_CERTIFICATE'
/** Defines values for AuditedObjectType. */
export type AuditedObjectType =
  | 'AUTHENTICATION'
  | 'TENANT_USER'
  | 'PROCESS'
  | 'PROCESS_PAGE_ITEM'
  | 'TASK'
  | 'TASK_PAGE_ITEM'
  | 'WORKER'
  | 'ROBOT'
/** Defines values for PrincipalType. */
export type PrincipalType = 'USER' | 'APPLICATION' | 'SYSTEM'
/** Defines values for PagedObjectType. */
export type PagedObjectType = 'PRINCIPAL_PAGE' | 'TENANT_USER_PAGE' | 'PROCESS_PAGE' | 'TASK_PAGE' | 'ROBOT_PAGE'
/** Defines values for ProcessState. */
export type ProcessState = 'RUNNING' | 'COMPLETED' | 'CANCELLED'
/** Defines values for ProcessElementValueType. */
export type ProcessElementValueType = 'STRING' | 'NUMBER'
/** Defines values for TaskState. */
export type TaskState = 'READY' | 'CLAIMED' | 'COMPLETED' | 'CANCELLED'
/** Defines values for TaskElementValueType. */
export type TaskElementValueType = 'STRING' | 'NUMBER' | 'OBJECT' | 'DOCUMENT' | 'PRINCIPAL'
/** Defines values for LogLevel. */
export type LogLevel = 'INFO' | 'WARN' | 'ERROR'
/** Defines values for RobotFilterContext. */
export type RobotFilterContext = 'READY' | 'DEFAULT'
/** Defines values for RobotSourceType. */
export type RobotSourceType = 'PACKAGE' | 'ROBOT_FRAMEWORK_PYTHON_WHEEL'
/** Defines values for RobotAssetType. */
export type RobotAssetType = 'PYTHON' | 'PYTHON_PIP' | 'NODEJS'
/** Defines values for RobotAssetPlatform. */
export type RobotAssetPlatform = 'WINDOWS' | 'MAC_OS' | 'LINUX'
/** Defines values for RobotAssetArchitecture. */
export type RobotAssetArchitecture = 'X86_32' | 'X86_64'
/** Defines values for WebhookType. */
export type WebhookType = 'PROCESS.STATE_CHANGED' | 'TASK.STATE_CHANGED'

/** Optional parameters. */
export interface AuthenticationCreateAuthenticationOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the createAuthentication operation. */
export type AuthenticationCreateAuthenticationResponse = Authentication

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
export interface ProcessActionsProcessChangeInitiatorOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessChangeInitiator operation. */
export type ProcessActionsProcessChangeInitiatorResponse = Process

/** Optional parameters. */
export interface ProcessActionsProcessSaveElementOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessSaveElement operation. */
export type ProcessActionsProcessSaveElementResponse = Process

/** Optional parameters. */
export interface ProcessActionsProcessDeleteElementOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessDeleteElement operation. */
export type ProcessActionsProcessDeleteElementResponse = Process

/** Optional parameters. */
export interface ProcessActionsProcessCompleteOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessComplete operation. */
export type ProcessActionsProcessCompleteResponse = Process

/** Optional parameters. */
export interface ProcessActionsProcessCancelOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessCancel operation. */
export type ProcessActionsProcessCancelResponse = Process

/** Optional parameters. */
export interface ProcessActionsProcessSaveUserActionValueDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessSaveUserActionValueDocument operation. */
export type ProcessActionsProcessSaveUserActionValueDocumentResponse = Process

/** Optional parameters. */
export interface ProcessActionsProcessSaveEntityDataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessSaveEntityData operation. */
export type ProcessActionsProcessSaveEntityDataResponse = Process

/** Optional parameters. */
export interface ProcessActionsProcessSaveEntityDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessSaveEntityDocument operation. */
export type ProcessActionsProcessSaveEntityDocumentResponse = ProcessSaveEntityDocumentResponseCommand

/** Optional parameters. */
export interface ProcessActionsProcessDownloadEntityDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsProcessDownloadEntityDocument operation. */
export interface ProcessActionsProcessDownloadEntityDocumentResponse {
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
export interface TaskFindTasksOptionalParams extends coreClient.OperationOptions {
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
  /** Filter by an array of task states. */
  state?: TaskState[]
  /** Filter by an array of task definition codes. */
  taskDefinitionCode?: string[]
}

/** Contains response data for the findTasks operation. */
export type TaskFindTasksResponse = TaskPage

/** Optional parameters. */
export interface TaskCreateTaskOptionalParams extends coreClient.OperationOptions {
  /**
   * [DEPRECATED] When create a KuFlow Task backed with a Temporal.io servers, this value is required and must be
   * set with the context task token of Temporal.io activity. It is no longer necessary because it will be never
   * used for the latest SDKs versions
   *
   */
  activityToken?: string
}

/** Contains response data for the createTask operation. */
export type TaskCreateTaskResponse = Task

/** Optional parameters. */
export interface TaskRetrieveTaskOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveTask operation. */
export type TaskRetrieveTaskResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskClaimOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskClaim operation. */
export type TaskActionsTaskClaimResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskAssignOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskAssign operation. */
export type TaskActionsTaskAssignResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskSaveElementOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskSaveElement operation. */
export type TaskActionsTaskSaveElementResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskSaveElementValueDocumentOptionalParams extends coreClient.OperationOptions {
  /** Element Value ID */
  elementValueId?: string
  /** Element Value ID */
  elementValueValid?: boolean
}

/** Contains response data for the actionsTaskSaveElementValueDocument operation. */
export type TaskActionsTaskSaveElementValueDocumentResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskDeleteElementOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskDeleteElement operation. */
export type TaskActionsTaskDeleteElementResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskDeleteElementValueDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskDeleteElementValueDocument operation. */
export type TaskActionsTaskDeleteElementValueDocumentResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskDownloadElementValueDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskDownloadElementValueDocument operation. */
export interface TaskActionsTaskDownloadElementValueDocumentResponse {
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
export interface TaskActionsTaskDownloadElementValueRenderedOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskDownloadElementValueRendered operation. */
export interface TaskActionsTaskDownloadElementValueRenderedResponse {
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
export interface TaskActionsTaskSaveJsonFormsValueDataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskSaveJsonFormsValueData operation. */
export type TaskActionsTaskSaveJsonFormsValueDataResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskSaveJsonFormsValueDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskSaveJsonFormsValueDocument operation. */
export type TaskActionsTaskSaveJsonFormsValueDocumentResponse = TaskSaveJsonFormsValueDocumentResponseCommand

/** Optional parameters. */
export interface TaskActionsTaskDownloadJsonFormsValueDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskDownloadJsonFormsValueDocument operation. */
export interface TaskActionsTaskDownloadJsonFormsValueDocumentResponse {
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
export interface TaskActionsTaskCompleteOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskComplete operation. */
export type TaskActionsTaskCompleteResponse = Task

/** Optional parameters. */
export interface TaskActionsTaskAppendLogOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsTaskAppendLog operation. */
export type TaskActionsTaskAppendLogResponse = Task

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
export interface RobotActionsRobotDownloadSourceCodeOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsRobotDownloadSourceCode operation. */
export interface RobotActionsRobotDownloadSourceCodeResponse {
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
export interface RobotActionsRobotDownloadAssetOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the actionsRobotDownloadAsset operation. */
export interface RobotActionsRobotDownloadAssetResponse {
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
