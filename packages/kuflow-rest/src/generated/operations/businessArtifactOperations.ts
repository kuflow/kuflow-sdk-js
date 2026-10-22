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

import * as coreClient from '@azure/core-client'
import type * as coreRestPipeline from '@azure/core-rest-pipeline'

import type { KuFlowRestClientGenerated } from '../kuFlowRestClientGenerated'
import type {
  BusinessArtifactActionCreateArtifactPrepareParams,
  BusinessArtifactActionCreateParams,
  BusinessArtifactActionStartProcessPrepareParams,
  BusinessArtifactCancelBusinessArtifactActionOptionalParams,
  BusinessArtifactCancelBusinessArtifactActionResponse,
  BusinessArtifactCreateBusinessArtifactActionOptionalParams,
  BusinessArtifactCreateBusinessArtifactActionResponse,
  BusinessArtifactCreateBusinessArtifactOptionalParams,
  BusinessArtifactCreateBusinessArtifactResponse,
  BusinessArtifactCreateParams,
  BusinessArtifactDataUpdateParams,
  BusinessArtifactDeleteBusinessArtifactOptionalParams,
  BusinessArtifactDownloadBusinessArtifactDocumentOptionalParams,
  BusinessArtifactDownloadBusinessArtifactDocumentResponse,
  BusinessArtifactFindBusinessArtifactsOptionalParams,
  BusinessArtifactFindBusinessArtifactsResponse,
  BusinessArtifactPatchBusinessArtifactDataOptionalParams,
  BusinessArtifactPatchBusinessArtifactDataResponse,
  BusinessArtifactPrepareBusinessArtifactActionCreateArtifactOptionalParams,
  BusinessArtifactPrepareBusinessArtifactActionCreateArtifactResponse,
  BusinessArtifactPrepareBusinessArtifactActionStartProcessOptionalParams,
  BusinessArtifactPrepareBusinessArtifactActionStartProcessResponse,
  BusinessArtifactRestoreBusinessArtifactOptionalParams,
  BusinessArtifactRestoreBusinessArtifactResponse,
  BusinessArtifactRetrieveBusinessArtifactActionOptionalParams,
  BusinessArtifactRetrieveBusinessArtifactActionResponse,
  BusinessArtifactRetrieveBusinessArtifactOptionalParams,
  BusinessArtifactRetrieveBusinessArtifactResponse,
  BusinessArtifactUpdateBusinessArtifactDataOptionalParams,
  BusinessArtifactUpdateBusinessArtifactDataResponse,
  BusinessArtifactUploadBusinessArtifactDocumentOptionalParams,
  BusinessArtifactUploadBusinessArtifactDocumentResponse,
  JsonPatchOperation,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import type { BusinessArtifactOperations } from '../operationsInterfaces'

/** Class containing BusinessArtifactOperations operations. */
export class BusinessArtifactOperationsImpl implements BusinessArtifactOperations {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class BusinessArtifactOperations class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * List all the Business Artifacts that have been created and the credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  async findBusinessArtifacts(
    options?: BusinessArtifactFindBusinessArtifactsOptionalParams,
  ): Promise<BusinessArtifactFindBusinessArtifactsResponse> {
    return await this.client.sendOperationRequest({ options }, findBusinessArtifactsOperationSpec)
  }

  /**
   * Creates a Business Artifact.
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param businessArtifactCreateParams Business Artifact to create
   * @param options The options parameters.
   */
  async createBusinessArtifact(
    businessArtifactCreateParams: BusinessArtifactCreateParams,
    options?: BusinessArtifactCreateBusinessArtifactOptionalParams,
  ): Promise<BusinessArtifactCreateBusinessArtifactResponse> {
    return await this.client.sendOperationRequest(
      { businessArtifactCreateParams, options },
      createBusinessArtifactOperationSpec,
    )
  }

  /**
   * Returns the requested Business Artifact when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrieveBusinessArtifact(
    id: string,
    options?: BusinessArtifactRetrieveBusinessArtifactOptionalParams,
  ): Promise<BusinessArtifactRetrieveBusinessArtifactResponse> {
    return await this.client.sendOperationRequest({ id, options }, retrieveBusinessArtifactOperationSpec)
  }

  /**
   * Deletes the requested Business Artifact. The deletion is soft: the Business Artifact can be
   * brought back with the `restoreBusinessArtifact` operation.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async deleteBusinessArtifact(
    id: string,
    options?: BusinessArtifactDeleteBusinessArtifactOptionalParams,
  ): Promise<void> {
    await this.client.sendOperationRequest({ id, options }, deleteBusinessArtifactOperationSpec)
  }

  /**
   * Restore a previously deleted Business Artifact, the undo of the `deleteBusinessArtifact`
   * operation. If the Business Artifact is not deleted, no action is taken.
   *
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async restoreBusinessArtifact(
    id: string,
    options?: BusinessArtifactRestoreBusinessArtifactOptionalParams,
  ): Promise<BusinessArtifactRestoreBusinessArtifactResponse> {
    return await this.client.sendOperationRequest({ id, options }, restoreBusinessArtifactOperationSpec)
  }

  /**
   * Allow to save a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param businessArtifactDataUpdateParams Params used to update the JSON value.
   * @param options The options parameters.
   */
  async updateBusinessArtifactData(
    id: string,
    businessArtifactDataUpdateParams: BusinessArtifactDataUpdateParams,
    options?: BusinessArtifactUpdateBusinessArtifactDataOptionalParams,
  ): Promise<BusinessArtifactUpdateBusinessArtifactDataResponse> {
    return await this.client.sendOperationRequest(
      { id, businessArtifactDataUpdateParams, options },
      updateBusinessArtifactDataOperationSpec,
    )
  }

  /**
   * Allow to patch a JSON data validating that the data follow the related schema. If the data is
   * invalid, then
   * the json is marked as invalid.
   *
   * @param id The resource ID.
   * @param jsonPatch Params to save the JSON value.
   * @param options The options parameters.
   */
  async patchBusinessArtifactData(
    id: string,
    jsonPatch: JsonPatchOperation[],
    options?: BusinessArtifactPatchBusinessArtifactDataOptionalParams,
  ): Promise<BusinessArtifactPatchBusinessArtifactDataResponse> {
    return await this.client.sendOperationRequest({ id, jsonPatch, options }, patchBusinessArtifactDataOperationSpec)
  }

  /**
   * Invoke an action on a Business Artifact.
   *
   * Whether the call returns synchronously or asynchronously depends on the action type:
   *
   * - `START_WORKFLOW`, `DOWNLOADABLE`: dispatched to a background worker. The
   *   response returns immediately with `status=REQUESTED`. Poll
   *   `retrieveBusinessArtifactAction` for the final state.
   * - `START_PROCESS`, `CREATE_BUSINESS_ARTIFACT`: completed synchronously. The
   *   response returns with `status=COMPLETED` (or an error status).
   *
   * If you want the method to be idempotent, please specify the `id` field in the request body.
   *
   * @param id The resource ID.
   * @param businessArtifactActionCreateParams Params identifying the action to invoke.
   * @param options The options parameters.
   */
  async createBusinessArtifactAction(
    id: string,
    businessArtifactActionCreateParams: BusinessArtifactActionCreateParams,
    options?: BusinessArtifactCreateBusinessArtifactActionOptionalParams,
  ): Promise<BusinessArtifactCreateBusinessArtifactActionResponse> {
    return await this.client.sendOperationRequest(
      { id, businessArtifactActionCreateParams, options },
      createBusinessArtifactActionOperationSpec,
    )
  }

  /**
   * Returns a Business Artifact action by its ID.
   * @param id The resource ID.
   * @param actionId The Business Artifact action ID.
   * @param options The options parameters.
   */
  async retrieveBusinessArtifactAction(
    id: string,
    actionId: string,
    options?: BusinessArtifactRetrieveBusinessArtifactActionOptionalParams,
  ): Promise<BusinessArtifactRetrieveBusinessArtifactActionResponse> {
    return await this.client.sendOperationRequest(
      { id, actionId, options },
      retrieveBusinessArtifactActionOperationSpec,
    )
  }

  /**
   * Cancel a Business Artifact action.
   *
   * Only meaningful for asynchronous actions still in `REQUESTED` state. The
   * action's status is set to `CANCELED`. If the action is already in a
   * terminal state, no transition occurs.
   *
   * @param id The resource ID.
   * @param actionId The Business Artifact action ID.
   * @param options The options parameters.
   */
  async cancelBusinessArtifactAction(
    id: string,
    actionId: string,
    options?: BusinessArtifactCancelBusinessArtifactActionOptionalParams,
  ): Promise<BusinessArtifactCancelBusinessArtifactActionResponse> {
    return await this.client.sendOperationRequest({ id, actionId, options }, cancelBusinessArtifactActionOperationSpec)
  }

  /**
   * Compute the pre-filled value that a `CREATE_BUSINESS_ARTIFACT` action would produce
   * for this Business Artifact, without invoking the action or persisting any state.
   *
   * Use it to populate a form that the user can review and edit. Once the user submits,
   * the filled value is sent back via `createBusinessArtifactAction` (in the
   * `createArtifact.value` field).
   *
   * @param id The resource ID.
   * @param businessArtifactActionCreateArtifactPrepareParams Params identifying the
   *                                                          CREATE_BUSINESS_ARTIFACT action to prepare.
   * @param options The options parameters.
   */
  async prepareBusinessArtifactActionCreateArtifact(
    id: string,
    businessArtifactActionCreateArtifactPrepareParams: BusinessArtifactActionCreateArtifactPrepareParams,
    options?: BusinessArtifactPrepareBusinessArtifactActionCreateArtifactOptionalParams,
  ): Promise<BusinessArtifactPrepareBusinessArtifactActionCreateArtifactResponse> {
    return await this.client.sendOperationRequest(
      { id, businessArtifactActionCreateArtifactPrepareParams, options },
      prepareBusinessArtifactActionCreateArtifactOperationSpec,
    )
  }

  /**
   * Compute the pre-filled metadata that a `START_PROCESS` action would apply to the
   * process it creates, without invoking the action or persisting any state.
   *
   * Use it to populate a form that the user can review and edit. Once the user submits,
   * the filled metadata is sent back via `createBusinessArtifactAction` (in the
   * `startProcess.metadata` field).
   *
   * @param id The resource ID.
   * @param businessArtifactActionStartProcessPrepareParams Params identifying the START_PROCESS action
   *                                                        to prepare.
   * @param options The options parameters.
   */
  async prepareBusinessArtifactActionStartProcess(
    id: string,
    businessArtifactActionStartProcessPrepareParams: BusinessArtifactActionStartProcessPrepareParams,
    options?: BusinessArtifactPrepareBusinessArtifactActionStartProcessOptionalParams,
  ): Promise<BusinessArtifactPrepareBusinessArtifactActionStartProcessResponse> {
    return await this.client.sendOperationRequest(
      { id, businessArtifactActionStartProcessPrepareParams, options },
      prepareBusinessArtifactActionStartProcessOperationSpec,
    )
  }

  /**
   * Upload a temporal document into the business artifact that later on must be linked with a business
   * artifact
   * domain resource.
   *
   * Documents uploaded with this API will be deleted after 2 hours as long as they have not been linked
   * to a
   * business artifact.
   *
   * **Deprecated:** use the `uploadDocument` operation with
   * `targetUri=ku:business-artifact/{businessArtifactId}`
   * instead.
   *
   * @param id The resource ID.
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param file Document to save.
   * @param options The options parameters.
   */
  async uploadBusinessArtifactDocument(
    id: string,
    fileContentType: string,
    fileName: string,
    file: coreRestPipeline.RequestBodyType,
    options?: BusinessArtifactUploadBusinessArtifactDocumentOptionalParams,
  ): Promise<BusinessArtifactUploadBusinessArtifactDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, fileContentType, fileName, file, options },
      uploadBusinessArtifactDocumentOperationSpec,
    )
  }

  /**
   * Given a document uri download a document.
   *
   * **Deprecated:** use the `downloadDocument` operation instead; it resolves any document the
   * credentials can read without requiring the owning Business Artifact in the path.
   *
   * @param id The resource ID.
   * @param documentUri Document URI to download.
   * @param options The options parameters.
   */
  async downloadBusinessArtifactDocument(
    id: string,
    documentUri: string,
    options?: BusinessArtifactDownloadBusinessArtifactDocumentOptionalParams,
  ): Promise<BusinessArtifactDownloadBusinessArtifactDocumentResponse> {
    return await this.client.sendOperationRequest(
      { id, documentUri, options },
      downloadBusinessArtifactDocumentOperationSpec,
    )
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const findBusinessArtifactsOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifactPage,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [
    Parameters.size,
    Parameters.page,
    Parameters.sort,
    Parameters.tenantId,
    Parameters.deleted,
    Parameters.businessArtifactDefinitionId,
    Parameters.businessArtifactDefinitionCode,
    Parameters.value,
  ],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
}
const createBusinessArtifactOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifact,
    },
    201: {
      bodyMapper: Mappers.BusinessArtifact,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.businessArtifactCreateParams,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const retrieveBusinessArtifactOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifact,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const deleteBusinessArtifactOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}',
  httpMethod: 'DELETE',
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const restoreBusinessArtifactOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/~actions/restore',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifact,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const updateBusinessArtifactDataOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/data',
  httpMethod: 'PUT',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifact,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.businessArtifactDataUpdateParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const patchBusinessArtifactDataOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/data',
  httpMethod: 'PATCH',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifact,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.jsonPatch,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept, Parameters.contentType1],
  mediaType: 'json',
  serializer,
}
const createBusinessArtifactActionOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/actions',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifactAction,
    },
    201: {
      bodyMapper: Mappers.BusinessArtifactAction,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.businessArtifactActionCreateParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const retrieveBusinessArtifactActionOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/actions/{actionId}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifactAction,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id, Parameters.actionId],
  headerParameters: [Parameters.accept],
  serializer,
}
const cancelBusinessArtifactActionOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/actions/{actionId}/~actions/cancel',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifactAction,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id, Parameters.actionId],
  headerParameters: [Parameters.accept],
  serializer,
}
const prepareBusinessArtifactActionCreateArtifactOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/~actions/prepare-create-artifact',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifactActionCreateArtifactPrepare,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.businessArtifactActionCreateArtifactPrepareParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const prepareBusinessArtifactActionStartProcessOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/~actions/prepare-start-process',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.BusinessArtifactActionStartProcessPrepare,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.businessArtifactActionStartProcessPrepareParams,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const uploadBusinessArtifactDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/~actions/upload-document',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.DocumentReference,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.file,
  queryParameters: [Parameters.fileContentType, Parameters.fileName],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType2, Parameters.accept1],
  mediaType: 'binary',
  serializer,
}
const downloadBusinessArtifactDocumentOperationSpec: coreClient.OperationSpec = {
  path: '/business-artifacts/{id}/~actions/download-document',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: {
        type: { name: 'Stream' },
        serializedName: 'parsedResponse',
      },
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.documentUri],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept2],
  serializer,
}
