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
  Kms as KmsOperationsGenerated,
  KmsRetrieveKmsKeyOptionalParams,
  KmsRetrieveKmsKeyResponse,
  KuFlowRestClientGenerated,
} from '../generated'

/** Class containing KmsOperations operations. */
export class KmsOperations {
  private readonly kmsOperations: KmsOperationsGenerated

  /**
   * Initialize a new instance of the class KmsOperations class.
   * @param clientGenerated Reference to the service client
   */
  public constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.kmsOperations = clientGenerated.kms
  }

  /**
   * Get the requested key id.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async retrieveKmsKey(
    id: string,
    options?: KmsRetrieveKmsKeyOptionalParams,
  ): Promise<KmsRetrieveKmsKeyResponse> {
    return await this.kmsOperations.retrieveKmsKey(id, options)
  }
}
