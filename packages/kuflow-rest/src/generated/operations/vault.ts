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

import type { KuFlowRestClientGenerated } from '../kuFlowRestClientGenerated'
import type {
  VaultCodecDecodeOptionalParams,
  VaultCodecDecodeResponse,
  VaultCodecEncodeOptionalParams,
  VaultCodecEncodeResponse,
  VaultCodecPayloads,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import type { Vault } from '../operationsInterfaces'

/** Class containing Vault operations. */
export class VaultImpl implements Vault {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class Vault class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * Encode the requested payloads.
   * @param vaultCodecEncodeParams Payloads to encode.
   * @param options The options parameters.
   */
  async codecEncode(
    vaultCodecEncodeParams: VaultCodecPayloads,
    options?: VaultCodecEncodeOptionalParams,
  ): Promise<VaultCodecEncodeResponse> {
    return await this.client.sendOperationRequest({ vaultCodecEncodeParams, options }, codecEncodeOperationSpec)
  }

  /**
   * Decode the requested payloads.
   * @param vaultCodecDecodeParams Payloads to decode.
   * @param options The options parameters.
   */
  async codecDecode(
    vaultCodecDecodeParams: VaultCodecPayloads,
    options?: VaultCodecDecodeOptionalParams,
  ): Promise<VaultCodecDecodeResponse> {
    return await this.client.sendOperationRequest({ vaultCodecDecodeParams, options }, codecDecodeOperationSpec)
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const codecEncodeOperationSpec: coreClient.OperationSpec = {
  path: '/vault/codec/~actions/encode',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.VaultCodecPayloads,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.vaultCodecEncodeParams,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
const codecDecodeOperationSpec: coreClient.OperationSpec = {
  path: '/vault/codec/~actions/decode',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.VaultCodecPayloads,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.vaultCodecDecodeParams,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
