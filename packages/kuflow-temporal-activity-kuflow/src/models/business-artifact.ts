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
  BusinessArtifact,
  BusinessArtifactAction,
  BusinessArtifactActionCreateArtifactPrepare,
  BusinessArtifactActionCreateParamsCreateArtifact,
  BusinessArtifactActionCreateParamsDownloadable,
  BusinessArtifactActionCreateParamsStartProcess,
  BusinessArtifactActionCreateParamsStartWorkflow,
  BusinessArtifactActionStartProcessPrepare,
  BusinessArtifactPage,
  DeletedQueryParam,
  JsonPatchOperation,
  JsonValue,
} from '@kuflow/kuflow-rest'

export interface BusinessArtifactFindRequest {
  size?: number
  page?: number
  sorts?: string[]
  tenantIds?: string[]
  businessArtifactDefinitionIds?: string[]
  businessArtifactDefinitionCodes?: string[]
  values?: string[]
  deleted?: DeletedQueryParam
}

export interface BusinessArtifactFindResponse {
  businessArtifacts: BusinessArtifactPage
}

export interface BusinessArtifactCreateRequest {
  id?: string
  businessArtifactDefinitionId?: string
  tenantId?: string
  businessArtifactDefinitionCode?: string
  data?: JsonValue
}

export interface BusinessArtifactCreateResponse {
  businessArtifact: BusinessArtifact
}

export interface BusinessArtifactRetrieveRequest {
  businessArtifactId: string
}

export interface BusinessArtifactRetrieveResponse {
  businessArtifact: BusinessArtifact
}

export interface BusinessArtifactDeleteRequest {
  businessArtifactId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BusinessArtifactDeleteResponse {}

export interface BusinessArtifactUpdateRequest {
  businessArtifactId: string
  data: JsonValue
}

export interface BusinessArtifactUpdateResponse {
  businessArtifact: BusinessArtifact
}

export interface BusinessArtifactPatchRequest {
  businessArtifactId: string
  jsonPatch: JsonPatchOperation[]
}

export interface BusinessArtifactPatchResponse {
  businessArtifact: BusinessArtifact
}

export interface BusinessArtifactActionCreateRequest {
  businessArtifactId: string
  id?: string
  businessArtifactActionDefinitionCode: string
  startWorkflow?: BusinessArtifactActionCreateParamsStartWorkflow
  downloadable?: BusinessArtifactActionCreateParamsDownloadable
  startProcess?: BusinessArtifactActionCreateParamsStartProcess
  createArtifact?: BusinessArtifactActionCreateParamsCreateArtifact
}

export interface BusinessArtifactActionCreateResponse {
  businessArtifactAction: BusinessArtifactAction
}

export interface BusinessArtifactActionRetrieveRequest {
  businessArtifactId: string
  businessArtifactActionId: string
}

export interface BusinessArtifactActionRetrieveResponse {
  businessArtifactAction: BusinessArtifactAction
}

export interface BusinessArtifactActionCancelRequest {
  businessArtifactId: string
  businessArtifactActionId: string
}

export interface BusinessArtifactActionCancelResponse {
  businessArtifactAction: BusinessArtifactAction
}

export interface BusinessArtifactActionCreateArtifactPrepareRequest {
  businessArtifactId: string
  businessArtifactActionDefinitionCode: string
}

export interface BusinessArtifactActionCreateArtifactPrepareResponse {
  businessArtifactActionCreateArtifactPrepare: BusinessArtifactActionCreateArtifactPrepare
}

export interface BusinessArtifactActionStartProcessPrepareRequest {
  businessArtifactId: string
  businessArtifactActionDefinitionCode: string
}

export interface BusinessArtifactActionStartProcessPrepareResponse {
  businessArtifactActionStartProcessPrepare: BusinessArtifactActionStartProcessPrepare
}
