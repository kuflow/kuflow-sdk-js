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
  KuFlowRestClientGenerated,
  TenantUserFindTenantUsersResponse,
  TenantUserOperations as TenantUserOperationsGenerated,
  TenantUserRetrieveTenantUserOptionalParams,
  TenantUserRetrieveTenantUserResponse,
} from '../generated'
import type { TenantUserFindTenantUsersOptionalExtParams } from '../models'

export class TenantUserOperations {
  private readonly tenantUserOperations: TenantUserOperationsGenerated

  /**
   * Initialize a new instance of the class TenantUserOperations class.
   * @param clientGenerated Reference to the service client
   */
  public constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.tenantUserOperations = clientGenerated.tenantUserOperations
  }

  /**
   * List all the Tenant Users that have been created and the used credentials has access.
   *
   * Available sort query values: id, name
   *
   * @param options The options parameters.
   */
  public async findTenantUsers(
    options?: TenantUserFindTenantUsersOptionalExtParams,
  ): Promise<TenantUserFindTenantUsersResponse> {
    const { sort, groupId, tenantId, email, ...optionsRest } = options ?? {}

    return await this.tenantUserOperations.findTenantUsers({
      ...optionsRest,
      sort: typeof sort === 'string' ? [sort] : sort,
      groupId: typeof groupId === 'string' ? [groupId] : groupId,
      tenantId: typeof tenantId === 'string' ? [tenantId] : tenantId,
      email: typeof email === 'string' ? [email] : email,
    })
  }

  /**
   * Returns the requested TenantUser when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async retrieveTenantUser(
    id: string,
    options?: TenantUserRetrieveTenantUserOptionalParams,
  ): Promise<TenantUserRetrieveTenantUserResponse> {
    return await this.tenantUserOperations.retrieveTenantUser(id, options)
  }
}
