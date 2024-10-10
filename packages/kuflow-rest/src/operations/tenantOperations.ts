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
  TenantFindTenantsResponse,
  TenantOperations as TenantOperationsGenerated,
  TenantRetrieveTenantOptionalParams,
  TenantRetrieveTenantResponse,
} from '../generated'
import type { TenantFindTenantOptionalExtParams } from '../models'

/** Interface representing a TenantOperations. */
export class TenantOperations {
  private readonly tenantOperations: TenantOperationsGenerated

  /**
   * Initialize a new instance of the class TenantOperations class.
   * @param clientGenerated Reference to the service client
   */
  public constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.tenantOperations = clientGenerated.tenantOperations
  }

  /**
   * List all the Tenant that have been created and the used credentials has access.
   *
   * Available sort query values: id, createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  public async findTenants(options?: TenantFindTenantOptionalExtParams): Promise<TenantFindTenantsResponse> {
    const { sort, tenantId, ...optionsRest } = options ?? {}

    return await this.tenantOperations.findTenants({
      ...optionsRest,
      sort: typeof sort === 'string' ? [sort] : sort,
      tenantId: typeof tenantId === 'string' ? [tenantId] : tenantId,
    })
  }

  /**
   * Returns the requested Tenant when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async retrieveTenant(
    id: string,
    options?: TenantRetrieveTenantOptionalParams,
  ): Promise<TenantRetrieveTenantResponse> {
    return await this.tenantOperations.retrieveTenant(id, options)
  }
}
