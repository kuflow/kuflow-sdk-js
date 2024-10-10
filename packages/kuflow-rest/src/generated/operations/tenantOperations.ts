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
  TenantFindTenantsOptionalParams,
  TenantFindTenantsResponse,
  TenantRetrieveTenantOptionalParams,
  TenantRetrieveTenantResponse,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import type { TenantOperations } from '../operationsInterfaces'

/** Class containing TenantOperations operations. */
export class TenantOperationsImpl implements TenantOperations {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class TenantOperations class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * List all the Tenants that the credentials used has access to.
   *
   * Available sort query values: id, name
   *
   * @param options The options parameters.
   */
  async findTenants(options?: TenantFindTenantsOptionalParams): Promise<TenantFindTenantsResponse> {
    return await this.client.sendOperationRequest({ options }, findTenantsOperationSpec)
  }

  /**
   * Returns the requested Tenant when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrieveTenant(
    id: string,
    options?: TenantRetrieveTenantOptionalParams,
  ): Promise<TenantRetrieveTenantResponse> {
    return await this.client.sendOperationRequest({ id, options }, retrieveTenantOperationSpec)
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const findTenantsOperationSpec: coreClient.OperationSpec = {
  path: '/tenants',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.TenantPage,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.size, Parameters.page, Parameters.sort, Parameters.tenantId],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
}
const retrieveTenantOperationSpec: coreClient.OperationSpec = {
  path: '/tenants/{id}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.Tenant,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
