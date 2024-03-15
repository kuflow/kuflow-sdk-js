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

import { type KuFlowRestClientGenerated } from '../kuFlowRestClientGenerated'
import {
  type TenantUserFindTenantUsersOptionalParams,
  type TenantUserFindTenantUsersResponse,
  type TenantUserRetrieveTenantUserOptionalParams,
  type TenantUserRetrieveTenantUserResponse,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import { type TenantUserOperations } from '../operationsInterfaces'

/** Class containing TenantUserOperations operations. */
export class TenantUserOperationsImpl implements TenantUserOperations {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class TenantUserOperations class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * List all the Tenant Users that have been created and the used credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  async findTenantUsers(options?: TenantUserFindTenantUsersOptionalParams): Promise<TenantUserFindTenantUsersResponse> {
    return await this.client.sendOperationRequest({ options }, findTenantUsersOperationSpec)
  }

  /**
   * Returns the requested TenantUser when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrieveTenantUser(
    id: string,
    options?: TenantUserRetrieveTenantUserOptionalParams,
  ): Promise<TenantUserRetrieveTenantUserResponse> {
    return await this.client.sendOperationRequest({ id, options }, retrieveTenantUserOperationSpec)
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const findTenantUsersOperationSpec: coreClient.OperationSpec = {
  path: '/tenant-users',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.TenantUserPage,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [
    Parameters.size,
    Parameters.page,
    Parameters.sort,
    Parameters.groupId,
    Parameters.tenantId,
    Parameters.email,
  ],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
}
const retrieveTenantUserOperationSpec: coreClient.OperationSpec = {
  path: '/tenant-users/{id}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.TenantUser,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
