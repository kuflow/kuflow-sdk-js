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
import {
  KuFlowRestClientGenerated,
  PrincipalFindPrincipalsResponse,
  PrincipalOperations as PrincipalOperationsGenerated,
  PrincipalRetrievePrincipalOptionalParams,
  PrincipalRetrievePrincipalResponse,
} from '../generated'
import { PrincipalFindPrincipalsOptionalExtParams } from '../models'

export class PrincipalOperations {
  private readonly principalOperations: PrincipalOperationsGenerated

  /**
   * Initialize a new instance of the class PrincipalOperations class.
   * @param clientGenerated Reference to the service client
   */
  constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.principalOperations = clientGenerated.principalOperations
  }

  /**
   * List all the Principals that have been created and the used credentials has access.
   *
   * Available sort query values: id, name
   *
   * @param options The options parameters.
   */
  async findPrincipals(options?: PrincipalFindPrincipalsOptionalExtParams): Promise<PrincipalFindPrincipalsResponse> {
    const { sort, groupId, ...optionsRest } = options ?? {}

    // *Note:* the method this.principalOperations.findPrincipals expect a 'typeParam' option that is WRONG and
    // is never considered when the URL is generated (see: Parameters.typeParam). We had solved this thanks
    // this method expects a 'type' option and then is spread, so when the URL is generated, the param is found.
    // Typescript doesn't fail because it is not totally strict

    return await this.principalOperations.findPrincipals({
      ...optionsRest,
      sort: typeof sort === 'string' ? [sort] : sort,
      groupId: typeof groupId === 'string' ? [groupId] : groupId,
    })
  }

  /**
   * Returns the requested Principal when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrievePrincipal(
    id: string,
    options?: PrincipalRetrievePrincipalOptionalParams,
  ): Promise<PrincipalRetrievePrincipalResponse> {
    return await this.principalOperations.retrievePrincipal(id, options)
  }
}