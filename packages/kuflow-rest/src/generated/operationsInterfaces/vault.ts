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
  VaultCodecDecodeOptionalParams,
  VaultCodecDecodeResponse,
  VaultCodecEncodeOptionalParams,
  VaultCodecEncodeResponse,
  VaultCodecPayloads,
} from '../models'

/** Interface representing a Vault. */
export interface Vault {
  /**
   * Encode the requested payloads.
   * @param vaultCodecEncodeParams Payloads to encode.
   * @param options The options parameters.
   */
  codecEncode: (
    vaultCodecEncodeParams: VaultCodecPayloads,
    options?: VaultCodecEncodeOptionalParams,
  ) => Promise<VaultCodecEncodeResponse>
  /**
   * Decode the requested payloads.
   * @param vaultCodecDecodeParams Payloads to decode.
   * @param options The options parameters.
   */
  codecDecode: (
    vaultCodecDecodeParams: VaultCodecPayloads,
    options?: VaultCodecDecodeOptionalParams,
  ) => Promise<VaultCodecDecodeResponse>
}
