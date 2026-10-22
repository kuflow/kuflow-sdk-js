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

export interface KmsKey {
  /** Key Id */
  id: string
  /** Encryption/decryption key */
  value: Uint8Array
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

export interface GroupPageItem {
  id: string
  name: string
  code: string
  /** Tenant ID. */
  tenantId: string
}

export interface TenantPageItem {
  id: string
  name: string
}

/** Json value. */
export interface JsonValue {
  /** true if the data complain the related json schema. */
  valid?: boolean
  /** json value filled that complain with the related json schema. */
  value: Record<string, any>
  errors?: JsonValueError[]
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
  code: string
}

/**
 * Params to create a Process. Either `processDefinitionId` or
 * `processDefinitionCode` (with `tenantId`) must be provided.
 *
 */
export interface ProcessCreateParams {
  id?: string
  processDefinitionId?: string
  tenantId?: string
  processDefinitionCode?: string
  /** Json value. */
  metadata?: JsonValue
  /** Json value. */
  entity?: JsonValue
  initiatorId?: string
  initiatorEmail?: string
  /**
   * Optional id of another process to which the created process is
   * related. Surfaced on read as `Process.processRelated.outcoming`.
   *
   */
  relatedProcessId?: string
}

export interface ProcessRelated {
  /** Processes whose relationship target is the current process. */
  incoming?: string[]
  /** Processes to which the current process relates. */
  outcoming?: string[]
}

/**
 * Params to invoke an action on a Process. The populated sub-field
 * (`createTask`, `createProcessItemMessage`, `startRelatedProcess`,
 * `sendWorkflowSignal`) must match the type of the action identified by
 * `processActionDefinitionCode`; the remaining action types take no
 * params.
 *
 */
export interface ProcessActionCreateParams {
  id?: string
  processActionDefinitionCode: string
  /** Params for invoking an action of type CREATE_TASK. */
  createTask?: ProcessActionCreateParamsCreateTask
  /**
   * Params for invoking an action of type CREATE_PROCESS_ITEM_MESSAGE.
   * Messages are created through the built-in `__KF_MESSAGE__` action
   * definition code.
   *
   */
  createProcessItemMessage?: ProcessActionCreateParamsCreateProcessItemMessage
  /** Params for invoking an action of type START_RELATED_PROCESS. */
  startRelatedProcess?: ProcessActionCreateParamsStartRelatedProcess
  /** Params for invoking an action of type SEND_WORKFLOW_SIGNAL. */
  sendWorkflowSignal?: ProcessActionCreateParamsSendWorkflowSignal
}

/** Params for invoking an action of type CREATE_TASK. */
export interface ProcessActionCreateParamsCreateTask {
  /** ID of the thread Process Item the created task is attached to. */
  processItemThreadId?: string
}

/**
 * Params for invoking an action of type CREATE_PROCESS_ITEM_MESSAGE.
 * Messages are created through the built-in `__KF_MESSAGE__` action
 * definition code.
 *
 */
export interface ProcessActionCreateParamsCreateProcessItemMessage {
  /** Text of the message to create. */
  text: string
  /** ID of the thread Process Item the created message is attached to. */
  processItemThreadId?: string
}

/** Params for invoking an action of type START_RELATED_PROCESS. */
export interface ProcessActionCreateParamsStartRelatedProcess {
  /** Metadata applied to the process created by this action. */
  metadata?: Record<string, any>
  /**
   * Entity data applied to the process created by this action. Validated
   * against the process definition entity schema; validation errors are
   * recorded on the process entity value. Ignored if empty or if the
   * process definition has no entity structure.
   *
   */
  entity?: Record<string, any>
}

/** Params for invoking an action of type SEND_WORKFLOW_SIGNAL. */
export interface ProcessActionCreateParamsSendWorkflowSignal {
  /**
   * Input delivered inside the workflow signal. Validated against the
   * action's input schema; only accepted when the action definition
   * declares one. The serialized input is limited to 200 KB.
   *
   */
  input?: Record<string, any>
}

export interface ProcessActionDefinitionRef {
  /** Not present when the action definition was removed from the process definition after the invocation. */
  id?: string
  code: string
}

/** Action details for actions of type DOWNLOADABLE. */
export interface ProcessActionDownloadable {
  /** URI of the generated document. Only present when status is COMPLETED. */
  documentUri?: string
  /** Whether the generated document has expired. Only present when status is COMPLETED. */
  documentExpired?: boolean
}

/**
 * Action details for actions of type START_RELATED_PROCESS. Actions of
 * this type complete synchronously, so all fields are present in the
 * invoke response.
 *
 */
export interface ProcessActionStartRelatedProcess {
  /** ID of the Process Definition that was instantiated. */
  processDefinitionId: string
  /** ID of the Process created by this action. */
  processId: string
}

/**
 * Action details for actions of type CREATE_TASK. Actions of this type
 * complete synchronously, so the created Process Item ID is present in
 * the invoke response.
 *
 */
export interface ProcessActionCreateTask {
  /** ID of the task Process Item created by this action. */
  processItemId?: string
}

/**
 * Action details for actions of type CREATE_PROCESS_ITEM_MESSAGE. Actions
 * of this type complete synchronously, so the created Process Item ID is
 * present in the invoke response.
 *
 */
export interface ProcessActionCreateProcessItemMessage {
  /** ID of the message Process Item created by this action. */
  processItemId?: string
}

/**
 * Action details for actions of type CREATE_PROCESS_ITEM_THREAD. Actions
 * of this type complete synchronously, so the created Process Item ID is
 * present in the invoke response.
 *
 */
export interface ProcessActionCreateProcessItemThread {
  /** ID of the thread Process Item created by this action. */
  processItemId?: string
}

/** Action details for actions of type SEND_WORKFLOW_SIGNAL. */
export interface ProcessActionSendWorkflowSignal {
  /** Name of the signal sent to the Process workflow. */
  signalName?: string
  /** Json value. */
  input?: JsonValue
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
  value?: any
}

export interface ProcessEntityUpdateParams {
  /** Json value. */
  entity: JsonValue
}

export interface DocumentReference {
  /**
   * Reference to the uploaded file.
   *
   * Format: `kuflow-file:uri=<ku-uri>;type=<media-type>;size=<bytes>;name=<file-name>;`
   *
   * Example: `kuflow-file:uri=ku:process/xxx/document/yyy;type=application/json;size=500;name=file.json;`
   *
   * Operations that receive a document uri accept both this full form and the inner `ku:`
   * document uri.
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
  /**
   * ID of the thread Process Item the created item is attached to. Only allowed for items
   * of type `TASK` or `MESSAGE`; it must reference a Process Item of type `THREAD` that
   * belongs to the same Process. It is not part of the idempotency key.
   *
   */
  processItemThreadId?: string
  ownerId?: string
  ownerEmail?: string
  processItemDefinitionCode?: string
  task?: ProcessItemTaskCreateParams
  message?: ProcessItemMessageCreateParams
}

export interface ProcessItemTaskCreateParams {
  /** Json value. */
  data?: JsonValue
  /** Json value. */
  contextData?: JsonValue
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
  /** Json value. */
  contextData?: JsonValue
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

/** Status of the latest AI assistance run for a process item. */
export interface ProcessItemAiAssistance {
  /**
   * Client-supplied UUID identifying the logical AI assistance attempt this run represents.
   *
   */
  requestId: string
  /** State of an AI assistance run. */
  state: ProcessItemAiAssistanceState
  /** Number of document embeddings still queued. Only present when state is PENDING. */
  embeddingPending?: number
  /** Number of document embeddings actively processing. Only present when state is PENDING. */
  embeddingProcessing?: number
  /** Suggested number of seconds to wait before polling again. Only present when state is PENDING. */
  retryAfterSeconds?: number
  /** The AI model used for the assistance. Only present when state is COMPLETED. */
  model?: string
  /** The reason the AI model stopped generating. Only present when state is COMPLETED. */
  finishReason?: string
  /** Error code. Only present when state is FAILED. */
  errorCode?: string
  /** Human-readable error description. Only present when state is FAILED. */
  errorMessage?: string
  /** When this run was started. - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  startedAt: string
  /** When this run finished (COMPLETED or FAILED). Absent while PENDING. - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  finishedAt?: string
}

/** Params identifying a logical AI assistance attempt for a process item. */
export interface ProcessItemAiAssistanceGenerateParams {
  /**
   * Client-supplied UUID identifying this logical AI assistance attempt. Use the same
   * `requestId` to poll an in-flight or completed run. Use a new `requestId` to start a
   * fresh run once the previous one has reached a final state. While a run is PENDING,
   * calling this endpoint with a different `requestId` is rejected with 409.
   *
   */
  requestId: string
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

export interface ProcessItemTaskContextDataUpdateParams {
  /** Json value. */
  data: JsonValue
}

export interface BusinessArtifactDefinitionRef {
  id: string
  code: string
}

/**
 * Params to create a Business Artifact. Either `businessArtifactDefinitionId` or
 * `businessArtifactDefinitionCode` (with `tenantId`) must be provided.
 *
 */
export interface BusinessArtifactCreateParams {
  id?: string
  businessArtifactDefinitionId?: string
  tenantId?: string
  businessArtifactDefinitionCode?: string
  /** Json value. */
  data?: JsonValue
}

export interface BusinessArtifactDataUpdateParams {
  /** Json value. */
  data: JsonValue
}

/**
 * Params to invoke an action on a Business Artifact. The populated
 * sub-field (`startWorkflow`, `downloadable`, `startProcess`,
 * `createArtifact`) must match the type of the action identified by
 * `businessArtifactActionDefinitionCode`.
 *
 */
export interface BusinessArtifactActionCreateParams {
  id?: string
  businessArtifactActionDefinitionCode: string
  /** Params for invoking an action of type START_WORKFLOW. */
  startWorkflow?: BusinessArtifactActionCreateParamsStartWorkflow
  /** Params for invoking an action of type DOWNLOADABLE. */
  downloadable?: BusinessArtifactActionCreateParamsDownloadable
  /** Params for invoking an action of type START_PROCESS. */
  startProcess?: BusinessArtifactActionCreateParamsStartProcess
  /**
   * Params for invoking an action of type CREATE_BUSINESS_ARTIFACT. The `value` is
   * the (potentially user-edited) form previously obtained via the
   * `prepareBusinessArtifactActionCreateArtifact` operation.
   *
   */
  createArtifact?: BusinessArtifactActionCreateParamsCreateArtifact
}

/** Params for invoking an action of type START_WORKFLOW. */
export interface BusinessArtifactActionCreateParamsStartWorkflow {
  /** Input passed to the workflow. Validated against the action's input schema. */
  input?: Record<string, any>
}

/** Params for invoking an action of type DOWNLOADABLE. */
export interface BusinessArtifactActionCreateParamsDownloadable {
  /** Input passed to the workflow that produces the downloadable. Validated against the action's input schema. */
  input?: Record<string, any>
}

/** Params for invoking an action of type START_PROCESS. */
export interface BusinessArtifactActionCreateParamsStartProcess {
  /**
   * Metadata applied to the process created by this action. If empty or omitted, the
   * action's metadata expression (if any) is evaluated against this Business Artifact
   * and its result is applied instead. A non-empty value is applied as provided, with
   * no merging.
   *
   */
  metadata?: Record<string, any>
  /**
   * Entity data applied to the process created by this action. Validated
   * against the process definition entity schema; validation errors are
   * recorded on the process entity value. Ignored if empty or if the
   * process definition has no entity structure.
   *
   */
  entity?: Record<string, any>
}

/**
 * Params for invoking an action of type CREATE_BUSINESS_ARTIFACT. The `value` is
 * the (potentially user-edited) form previously obtained via the
 * `prepareBusinessArtifactActionCreateArtifact` operation.
 *
 */
export interface BusinessArtifactActionCreateParamsCreateArtifact {
  /** Form value to be applied to the new Business Artifact. */
  value?: Record<string, any>
}

export interface BusinessArtifactActionDefinitionRef {
  id: string
  code: string
}

/** Action details for actions of type START_WORKFLOW. */
export interface BusinessArtifactActionStartWorkflow {
  /** Json value. */
  input?: JsonValue
}

/**
 * Action details for actions of type START_PROCESS. Actions of this
 * type complete synchronously, so all fields are present in the invoke
 * response.
 *
 */
export interface BusinessArtifactActionStartProcess {
  /** ID of the Process Definition that was instantiated. */
  processDefinitionId: string
  /** ID of the Process created by this action. */
  processId: string
}

/** Action details for actions of type DOWNLOADABLE. */
export interface BusinessArtifactActionDownloadable {
  /** Json value. */
  input?: JsonValue
  /** URI of the generated document. Only present when status is COMPLETED. */
  documentUri?: string
  /** Whether the generated document has expired. Only present when status is COMPLETED. */
  documentExpired?: boolean
}

/**
 * Action details for actions of type CREATE_BUSINESS_ARTIFACT.
 * Actions of this type complete synchronously, so the populated value and
 * the created Business Artifact ID are present in the invoke response.
 *
 */
export interface BusinessArtifactActionCreateArtifact {
  businessArtifactDefinitionRef: BusinessArtifactDefinitionRef
  /** ID of the Business Artifact created by this action. Only present when status is COMPLETED. */
  businessArtifactId?: string
  /** Form value applied to the new Business Artifact. */
  value?: Record<string, any>
}

/** Params identifying a CREATE_BUSINESS_ARTIFACT action to prepare. */
export interface BusinessArtifactActionCreateArtifactPrepareParams {
  businessArtifactActionDefinitionCode: string
}

/**
 * Pre-filled value for a CREATE_BUSINESS_ARTIFACT action. Returned by the
 * prepare operation; nothing is persisted on the server.
 *
 */
export interface BusinessArtifactActionCreateArtifactPrepare {
  businessArtifactDefinitionRef: BusinessArtifactDefinitionRef
  /** Pre-filled form value computed from the action definition. */
  value?: Record<string, any>
}

/** Params identifying a START_PROCESS action to prepare. */
export interface BusinessArtifactActionStartProcessPrepareParams {
  businessArtifactActionDefinitionCode: string
}

/**
 * Pre-filled metadata for a START_PROCESS action. Returned by the prepare
 * operation; nothing is persisted on the server.
 *
 */
export interface BusinessArtifactActionStartProcessPrepare {
  /** Process Definition the action will start. */
  processDefinitionId: string
  /** Pre-filled process metadata computed from the action definition. */
  metadata?: Record<string, any>
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
  id: string
  principalId: string
  tenantId: string
}

export interface TenantUser extends AbstractAudited {
  id: string
  /** Json value. */
  metadata?: JsonValue
  principal: Principal
  tenantId: string
}

export interface AbstractDeleted extends AbstractAudited {
  /** Who deleted this model, present only when it is deleted. */
  deletedBy?: string
  /** When this model was deleted, present only when it is deleted. - date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z */
  deletedAt?: string
}

/**
 * A Process action invocation. The populated sub-field (`downloadable`,
 * `startRelatedProcess`, `createTask`, `createProcessItemMessage`,
 * `createProcessItemThread`, `sendWorkflowSignal`) is dictated by `type`.
 * Actions of type START_WORKFLOW carry no additional details.
 *
 */
export interface ProcessAction extends AbstractAudited {
  id: string
  /** Type of a Process action. */
  type: ProcessActionType
  /** Status of a Process action. */
  status: ProcessActionStatus
  processActionDefinitionRef: ProcessActionDefinitionRef
  /** Action details for actions of type DOWNLOADABLE. */
  downloadable?: ProcessActionDownloadable
  /**
   * Action details for actions of type START_RELATED_PROCESS. Actions of
   * this type complete synchronously, so all fields are present in the
   * invoke response.
   *
   */
  startRelatedProcess?: ProcessActionStartRelatedProcess
  /**
   * Action details for actions of type CREATE_TASK. Actions of this type
   * complete synchronously, so the created Process Item ID is present in
   * the invoke response.
   *
   */
  createTask?: ProcessActionCreateTask
  /**
   * Action details for actions of type CREATE_PROCESS_ITEM_MESSAGE. Actions
   * of this type complete synchronously, so the created Process Item ID is
   * present in the invoke response.
   *
   */
  createProcessItemMessage?: ProcessActionCreateProcessItemMessage
  /**
   * Action details for actions of type CREATE_PROCESS_ITEM_THREAD. Actions
   * of this type complete synchronously, so the created Process Item ID is
   * present in the invoke response.
   *
   */
  createProcessItemThread?: ProcessActionCreateProcessItemThread
  /** Action details for actions of type SEND_WORKFLOW_SIGNAL. */
  sendWorkflowSignal?: ProcessActionSendWorkflowSignal
}

/**
 * A Business Artifact action invocation. The populated sub-field
 * (`startWorkflow`, `startProcess`, `downloadable`, `createArtifact`) is
 * dictated by `type`.
 *
 */
export interface BusinessArtifactAction extends AbstractAudited {
  id: string
  /** Type of a Business Artifact action. */
  type: BusinessArtifactActionType
  /** Status of a Business Artifact action. */
  status: BusinessArtifactActionStatus
  businessArtifactActionDefinitionRef: BusinessArtifactActionDefinitionRef
  /** Action details for actions of type START_WORKFLOW. */
  startWorkflow?: BusinessArtifactActionStartWorkflow
  /**
   * Action details for actions of type START_PROCESS. Actions of this
   * type complete synchronously, so all fields are present in the invoke
   * response.
   *
   */
  startProcess?: BusinessArtifactActionStartProcess
  /** Action details for actions of type DOWNLOADABLE. */
  downloadable?: BusinessArtifactActionDownloadable
  /**
   * Action details for actions of type CREATE_BUSINESS_ARTIFACT.
   * Actions of this type complete synchronously, so the populated value and
   * the created Business Artifact ID are present in the invoke response.
   *
   */
  createArtifact?: BusinessArtifactActionCreateArtifact
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

export interface GroupPage extends Page {
  content: GroupPageItem[]
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

export interface BusinessArtifactPage extends Page {
  content: BusinessArtifactPageItem[]
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

export interface ProcessPageItem extends AbstractDeleted {
  /** Process ID. */
  id: string
  /**
   * Process resource URI, e.g. usable as `targetUri` of the `uploadDocument` operation.
   * Format `ku:process/{id}`.
   *
   */
  uri?: string
  /** Process state */
  state: ProcessState
  processDefinitionRef: ProcessDefinitionRef
  /** Principal ID. */
  initiatorId?: string
  /** Tenant ID. */
  tenantId: string
}

export interface Process extends AbstractDeleted {
  /** Process ID. */
  id: string
  /**
   * Process resource URI, e.g. usable as `targetUri` of the `uploadDocument` operation.
   * Format `ku:process/{id}`.
   *
   */
  uri?: string
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

export interface ProcessItemPageItem extends AbstractDeleted {
  id: string
  /** Process Item resource URI. Format `ku:process-item/{id}`. */
  uri?: string
  /** Process Item Type */
  type: ProcessItemType
  processId: string
  /** ID of the thread Process Item this item is attached to, if any. */
  processItemThreadId?: string
  /** Principal ID. */
  ownerId?: string
  /** Tenant ID. */
  tenantId: string
  processItemDefinitionRef?: ProcessItemDefinitionRef
  task?: ProcessItemTaskPageItem
  message?: ProcessItemMessagePageItem
}

export interface ProcessItem extends AbstractDeleted {
  id: string
  /** Process Item resource URI. Format `ku:process-item/{id}`. */
  uri?: string
  /** Process Item Type */
  type: ProcessItemType
  processId: string
  /** ID of the thread Process Item this item is attached to, if any. */
  processItemThreadId?: string
  /** Owner Principal ID. */
  ownerId?: string
  /** Tenant ID. */
  tenantId?: string
  processItemDefinitionRef?: ProcessItemDefinitionRef
  task?: ProcessItemTask
  message?: ProcessItemMessage
}

export interface BusinessArtifactPageItem extends AbstractDeleted {
  /** Business Artifact ID. */
  id: string
  /**
   * Business Artifact resource URI, e.g. usable as `targetUri` of the `uploadDocument`
   * operation. Format `ku:business-artifact/{id}`.
   *
   */
  uri?: string
  /** Tenant ID. */
  tenantId: string
  businessArtifactDefinitionRef: BusinessArtifactDefinitionRef
}

export interface BusinessArtifact extends AbstractDeleted {
  /** Business Artifact ID. */
  id: string
  /**
   * Business Artifact resource URI, e.g. usable as `targetUri` of the `uploadDocument`
   * operation. Format `ku:business-artifact/{id}`.
   *
   */
  uri?: string
  /** Tenant ID. */
  tenantId: string
  businessArtifactDefinitionRef: BusinessArtifactDefinitionRef
  /** Json value. */
  data?: JsonValue
}

/** Defines values for AuthenticationType. */
export type AuthenticationType = 'ENGINE_TOKEN' | 'ENGINE_CERTIFICATE'
/** Defines values for PrincipalType. */
export type PrincipalType = 'USER' | 'APPLICATION' | 'SYSTEM'
/** Defines values for TenantPricingPlan. */
export type TenantPricingPlan = 'FREE' | 'PREMIUM' | 'UNLIMITED'
/** Defines values for ProcessState. */
export type ProcessState = 'RUNNING' | 'COMPLETED' | 'CANCELLED'
/** Defines values for DeletedQueryParam. */
export type DeletedQueryParam = 'EXCLUDE' | 'INCLUDE' | 'ONLY'
/** Defines values for ProcessActionType. */
export type ProcessActionType =
  | 'DOWNLOADABLE'
  | 'START_RELATED_PROCESS'
  | 'START_WORKFLOW'
  | 'CREATE_TASK'
  | 'CREATE_PROCESS_ITEM_MESSAGE'
  | 'CREATE_PROCESS_ITEM_THREAD'
  | 'SEND_WORKFLOW_SIGNAL'
/** Defines values for ProcessActionStatus. */
export type ProcessActionStatus = 'REQUESTED' | 'COMPLETED' | 'CANCELED' | 'ERROR'
/** Defines values for JsonPatchOperationType. */
export type JsonPatchOperationType = 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test'
/** Defines values for ProcessItemType. */
export type ProcessItemType = 'TASK' | 'MESSAGE' | 'THREAD'
/** Defines values for ProcessItemTaskState. */
export type ProcessItemTaskState = 'READY' | 'CLAIMED' | 'COMPLETED' | 'CANCELLED'
/** Defines values for ProcessItemTaskLogLevel. */
export type ProcessItemTaskLogLevel = 'INFO' | 'WARN' | 'ERROR'
/** Defines values for ProcessItemAiAssistanceState. */
export type ProcessItemAiAssistanceState = 'PENDING' | 'COMPLETED' | 'FAILED'
/** Defines values for BusinessArtifactActionType. */
export type BusinessArtifactActionType =
  | 'START_WORKFLOW'
  | 'START_PROCESS'
  | 'DOWNLOADABLE'
  | 'CREATE_BUSINESS_ARTIFACT'
/** Defines values for BusinessArtifactActionStatus. */
export type BusinessArtifactActionStatus = 'REQUESTED' | 'COMPLETED' | 'CANCELED' | 'ERROR'
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
export interface KmsRetrieveKmsKeyOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveKmsKey operation. */
export type KmsRetrieveKmsKeyResponse = KmsKey

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
  /** Filter by group codes. */
  groupCode?: string[]
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
export interface GroupFindGroupsOptionalParams extends coreClient.OperationOptions {
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
  /** Filter by group codes. */
  groupCode?: string[]
  /** Filter by tenantId. */
  tenantId?: string[]
  /** Filter by principalId. */
  principalId?: string
}

/** Contains response data for the findGroups operation. */
export type GroupFindGroupsResponse = GroupPage

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
  /** Filter by group codes. */
  groupCode?: string[]
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
  /** Filter by process definition ids. */
  processDefinitionId?: string[]
  /** Filter by process definition codes. */
  processDefinitionCode?: string[]
  /** Filter by an array of process states. */
  state?: ProcessState[]
  /** Filter by an array of initiator ids, Principal ID. */
  initiatorId?: string[]
  /** Filter by an array of initiator emails. */
  initiatorEmail?: string[]
  /**
   * Filter by process metadata field values. Each value is an expression with the format
   * `fieldCode operation value1 value2...` (space-separated).
   *
   * Supported operations: `eq`, `le`, `ge`, `between`, `contains`, `in`.
   *
   * Filtering by metadata requires specifying exactly one `processDefinitionId` or `processDefinitionCode`.
   *
   */
  metadata?: string[]
  /**
   * Deleted Processes filtering mode; when omitted, `EXCLUDE` applies. With `INCLUDE` or `ONLY`, deleted
   * Processes are returned with their `deletedAt` and `deletedBy` fields set. They are only returned when the
   * request identifies exactly one Process Definition — by exactly one `processDefinitionId`, or by exactly one
   * `processDefinitionCode` together with exactly one `tenantId` (codes are unique per tenant) — and the
   * credentials can delete any Process of that definition; otherwise they are silently left out.
   *
   */
  deleted?: DeletedQueryParam
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
export interface ProcessDeleteProcessOptionalParams extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface ProcessCreateProcessActionOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the createProcessAction operation. */
export type ProcessCreateProcessActionResponse = ProcessAction

/** Optional parameters. */
export interface ProcessRetrieveProcessActionOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveProcessAction operation. */
export type ProcessRetrieveProcessActionResponse = ProcessAction

/** Optional parameters. */
export interface ProcessCancelProcessActionOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the cancelProcessAction operation. */
export type ProcessCancelProcessActionResponse = ProcessAction

/** Optional parameters. */
export interface ProcessCompleteProcessOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the completeProcess operation. */
export type ProcessCompleteProcessResponse = Process

/** Optional parameters. */
export interface ProcessCancelProcessOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the cancelProcess operation. */
export type ProcessCancelProcessResponse = Process

/** Optional parameters. */
export interface ProcessCancelProcessItemsOptionalParams extends coreClient.OperationOptions {
  /** Optional list of process item IDs to cancel. If omitted, all active process items are cancelled. */
  processItemId?: string[]
}

/** Contains response data for the cancelProcessItems operation. */
export type ProcessCancelProcessItemsResponse = Process

/** Optional parameters. */
export interface ProcessChangeProcessInitiatorOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the changeProcessInitiator operation. */
export type ProcessChangeProcessInitiatorResponse = Process

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
  /** Filter by process definition ids. */
  processDefinitionId?: string[]
  /** Filter by process definition codes. */
  processDefinitionCode?: string[]
  /**
   * Deleted Process Items filtering mode; when omitted, `EXCLUDE` applies. The Process Items of a deleted
   * Process are deleted with it. With `INCLUDE` or `ONLY`, deleted Process Items are returned with their
   * `deletedAt` and `deletedBy` fields set. They are only returned when the request identifies exactly one
   * Process Definition — by exactly one `processDefinitionId`, or by exactly one `processDefinitionCode`
   * together with exactly one `tenantId` (codes are unique per tenant) — and the credentials can delete any
   * Process of that definition; otherwise they are silently left out.
   *
   */
  deleted?: DeletedQueryParam
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
export interface ProcessItemRetrieveProcessItemAiAssistanceOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveProcessItemAiAssistance operation. */
export type ProcessItemRetrieveProcessItemAiAssistanceResponse = ProcessItemAiAssistance

/** Optional parameters. */
export interface ProcessItemGenerateProcessItemAiAssistanceOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the generateProcessItemAiAssistance operation. */
export type ProcessItemGenerateProcessItemAiAssistanceResponse = ProcessItemAiAssistance

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
export interface ProcessItemUpdateProcessItemTaskContextDataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the updateProcessItemTaskContextData operation. */
export type ProcessItemUpdateProcessItemTaskContextDataResponse = ProcessItem

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
export interface BusinessArtifactFindBusinessArtifactsOptionalParams extends coreClient.OperationOptions {
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
  /**
   * Soft-deleted Business Artifacts filtering mode; when omitted, `EXCLUDE` applies. With `INCLUDE` or `ONLY`,
   * deleted Business Artifacts are returned with their `deletedAt` and `deletedBy` fields set. They are only
   * returned when the request identifies exactly one Business Artifact Definition — by exactly one
   * `businessArtifactDefinitionId`, or by exactly one `businessArtifactDefinitionCode` together with exactly one
   * `tenantId` (codes are unique per tenant) — and the credentials can archive or supervise its Business
   * Artifacts; otherwise they are silently left out.
   *
   */
  deleted?: DeletedQueryParam
  /** Filter by an array of business artifact definition ids. */
  businessArtifactDefinitionId?: string[]
  /** Filter by an array of business artifact definition codes. */
  businessArtifactDefinitionCode?: string[]
  /**
   * Filter by indexed field values. Each value is an expression with the format
   * `fieldCode operation value1 value2...` (space-separated).
   *
   * Supported operations: `eq`, `le`, `ge`, `between`, `contains`, `in`.
   *
   */
  value?: string[]
}

/** Contains response data for the findBusinessArtifacts operation. */
export type BusinessArtifactFindBusinessArtifactsResponse = BusinessArtifactPage

/** Optional parameters. */
export interface BusinessArtifactCreateBusinessArtifactOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the createBusinessArtifact operation. */
export type BusinessArtifactCreateBusinessArtifactResponse = BusinessArtifact

/** Optional parameters. */
export interface BusinessArtifactRetrieveBusinessArtifactOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveBusinessArtifact operation. */
export type BusinessArtifactRetrieveBusinessArtifactResponse = BusinessArtifact

/** Optional parameters. */
export interface BusinessArtifactDeleteBusinessArtifactOptionalParams extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface BusinessArtifactRestoreBusinessArtifactOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the restoreBusinessArtifact operation. */
export type BusinessArtifactRestoreBusinessArtifactResponse = BusinessArtifact

/** Optional parameters. */
export interface BusinessArtifactUpdateBusinessArtifactDataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the updateBusinessArtifactData operation. */
export type BusinessArtifactUpdateBusinessArtifactDataResponse = BusinessArtifact

/** Optional parameters. */
export interface BusinessArtifactPatchBusinessArtifactDataOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the patchBusinessArtifactData operation. */
export type BusinessArtifactPatchBusinessArtifactDataResponse = BusinessArtifact

/** Optional parameters. */
export interface BusinessArtifactCreateBusinessArtifactActionOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the createBusinessArtifactAction operation. */
export type BusinessArtifactCreateBusinessArtifactActionResponse = BusinessArtifactAction

/** Optional parameters. */
export interface BusinessArtifactRetrieveBusinessArtifactActionOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the retrieveBusinessArtifactAction operation. */
export type BusinessArtifactRetrieveBusinessArtifactActionResponse = BusinessArtifactAction

/** Optional parameters. */
export interface BusinessArtifactCancelBusinessArtifactActionOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the cancelBusinessArtifactAction operation. */
export type BusinessArtifactCancelBusinessArtifactActionResponse = BusinessArtifactAction

/** Optional parameters. */
export interface BusinessArtifactPrepareBusinessArtifactActionCreateArtifactOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the prepareBusinessArtifactActionCreateArtifact operation. */
export type BusinessArtifactPrepareBusinessArtifactActionCreateArtifactResponse =
  BusinessArtifactActionCreateArtifactPrepare

/** Optional parameters. */
export interface BusinessArtifactPrepareBusinessArtifactActionStartProcessOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the prepareBusinessArtifactActionStartProcess operation. */
export type BusinessArtifactPrepareBusinessArtifactActionStartProcessResponse =
  BusinessArtifactActionStartProcessPrepare

/** Optional parameters. */
export interface BusinessArtifactUploadBusinessArtifactDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the uploadBusinessArtifactDocument operation. */
export type BusinessArtifactUploadBusinessArtifactDocumentResponse = DocumentReference

/** Optional parameters. */
export interface BusinessArtifactDownloadBusinessArtifactDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the downloadBusinessArtifactDocument operation. */
export interface BusinessArtifactDownloadBusinessArtifactDocumentResponse {
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
export interface DocumentUploadDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the uploadDocument operation. */
export type DocumentUploadDocumentResponse = DocumentReference

/** Optional parameters. */
export interface DocumentDownloadDocumentOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the downloadDocument operation. */
export interface DocumentDownloadDocumentResponse {
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
