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
  AuthenticationCreateAuthenticationOptionalParams,
  AuthenticationCreateAuthenticationResponse,
  AuthenticationCreateParams,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import type { AuthenticationOperations } from '../operationsInterfaces'

/** Class containing AuthenticationOperations operations. */
export class AuthenticationOperationsImpl implements AuthenticationOperations {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class AuthenticationOperations class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * Create an authentication for the current principal.
   * @param authenticationCreateParams Authentication to be created.
   * @param options The options parameters.
   */
  async createAuthentication(
    authenticationCreateParams: AuthenticationCreateParams,
    options?: AuthenticationCreateAuthenticationOptionalParams,
  ): Promise<AuthenticationCreateAuthenticationResponse> {
    return await this.client.sendOperationRequest(
      { authenticationCreateParams, options },
      createAuthenticationOperationSpec,
    )
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const createAuthenticationOperationSpec: coreClient.OperationSpec = {
  path: '/authentications',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.Authentication,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  requestBody: Parameters.authenticationCreateParams,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: 'json',
  serializer,
}
