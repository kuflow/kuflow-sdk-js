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
import type { KmsRetrieveKmsKeyOptionalParams, KmsRetrieveKmsKeyResponse } from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import type { Kms } from '../operationsInterfaces'

/** Class containing Kms operations. */
export class KmsImpl implements Kms {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class Kms class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * Get the requested key id.
   * @param keyId The resource ID.
   * @param options The options parameters.
   */
  async retrieveKmsKey(keyId: string, options?: KmsRetrieveKmsKeyOptionalParams): Promise<KmsRetrieveKmsKeyResponse> {
    return await this.client.sendOperationRequest({ keyId, options }, retrieveKmsKeyOperationSpec)
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const retrieveKmsKeyOperationSpec: coreClient.OperationSpec = {
  path: '/kms/keys/{keyId}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.KmsKey,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.keyId],
  headerParameters: [Parameters.accept],
  serializer,
}
