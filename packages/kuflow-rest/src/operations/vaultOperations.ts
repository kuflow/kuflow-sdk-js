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
  Vault as VaultOperationsGenerated,
  VaultCodecDecodeOptionalParams,
  VaultCodecDecodeResponse,
  VaultCodecEncodeOptionalParams,
  VaultCodecEncodeResponse,
  VaultCodecPayload,
  VaultCodecPayloads,
} from '../generated'

/** Class containing VaultOperations operations. */
export class VaultOperations {
  private readonly vaultOperations: VaultOperationsGenerated

  /**
   * Initialize a new instance of the class VaultOperations class.
   * @param clientGenerated Reference to the service client
   */
  public constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.vaultOperations = clientGenerated.vault
  }

  /**
   * Encode the requested payloads.
   * @param vaultCodecEncodeParams Payloads to encode.
   * @param options The options parameters.
   */
  public async codecEncode(
    vaultCodecEncodeParams: VaultCodecPayloads,
    options?: VaultCodecEncodeOptionalParams,
  ): Promise<VaultCodecEncodeResponse> {
    const payloads = vaultCodecEncodeParams.payloads.map(payload => {
      return this.workaround(payload)
    })

    return await this.vaultOperations.codecEncode({ ...vaultCodecEncodeParams, payloads }, options)
  }

  /**
   * Decode the requested payloads.
   * @param vaultCodecDecodeParams Payloads to decode.
   * @param options The options parameters.
   */
  public async codecDecode(
    vaultCodecDecodeParams: VaultCodecPayloads,
    options?: VaultCodecDecodeOptionalParams,
  ): Promise<VaultCodecDecodeResponse> {
    const payloads = vaultCodecDecodeParams.payloads.map(payload => {
      return this.workaround(payload)
    })

    return await this.vaultOperations.codecDecode({ ...vaultCodecDecodeParams, payloads }, options)
  }

  /**
   * Workaround for an issue in @azure/core-client (base64.js) where `encodeByteArray`
   * incorrectly converts a `Uint8Array` to Base64. The issue occurs when `value`
   * is not an instance of `Buffer`, leading to an incorrect conversion with `Buffer.from(value.buffer)`.
   * This method ensures `value` is used instead for proper encoding.
   *
   * Related file: @azure/core-client/dist/commonjs/base64.js
   * Affected function: encodeByteArray(value)
   *
   * Remove this workaround once the issue is fixed upstream.
   */
  private workaround(payload: VaultCodecPayload): VaultCodecPayload {
    let metadata: Record<string, Uint8Array> | undefined = undefined
    if (payload.metadata != null) {
      metadata = Object.fromEntries(
        Object.entries(payload.metadata).map(([key, value]) => [
          key,
          value instanceof Buffer ? value : Buffer.from(value),
        ]),
      )
    }
    const data = Buffer.from(payload.data)

    return {
      metadata,
      data,
    }
  }
}
