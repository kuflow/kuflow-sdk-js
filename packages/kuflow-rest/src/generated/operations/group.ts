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
import type { GroupFindGroupsOptionalParams, GroupFindGroupsResponse } from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import type { Group } from '../operationsInterfaces'

/** Class containing Group operations. */
export class GroupImpl implements Group {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class Group class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * List all the Groups that have been created and the used credentials has access.
   *
   * Available sort query values: id, name
   *
   * @param options The options parameters.
   */
  async findGroups(options?: GroupFindGroupsOptionalParams): Promise<GroupFindGroupsResponse> {
    return await this.client.sendOperationRequest({ options }, findGroupsOperationSpec)
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const findGroupsOperationSpec: coreClient.OperationSpec = {
  path: '/groups',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.GroupPage,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.size, Parameters.page, Parameters.sort, Parameters.tenantId, Parameters.principalId],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
}
