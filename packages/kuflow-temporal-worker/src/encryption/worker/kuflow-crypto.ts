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

import crypto from 'crypto'

const CIPHER = 'AES-GCM'
const IV_LENGTH_BYTES = 12
const TAG_LENGTH_BYTES = 16

interface Cipher {
  readonly algorithm: string
  importKey: (key: crypto.webcrypto.BufferSource) => Promise<crypto.webcrypto.CryptoKey>
  encrypt: (key: crypto.webcrypto.CryptoKey, plainText: Uint8Array) => Promise<Uint8Array>
  decrypt: (key: crypto.webcrypto.CryptoKey, cipherText: Uint8Array) => Promise<Uint8Array>
}

class CipherAes256GCM implements Cipher {
  public readonly algorithm = 'AES-256-GCM'

  public async importKey(key: crypto.webcrypto.BufferSource): Promise<crypto.webcrypto.CryptoKey> {
    return await crypto.subtle.importKey(
      'raw',
      key,
      {
        name: 'AES-GCM',
      },
      true,
      ['encrypt', 'decrypt'],
    )
  }

  public async encrypt(key: crypto.webcrypto.CryptoKey, plainText: Uint8Array): Promise<Uint8Array> {
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH_BYTES))
    const encrypted = await crypto.subtle.encrypt(
      {
        name: CIPHER,
        iv,
        tagLength: TAG_LENGTH_BYTES * 8,
      },
      key,
      plainText,
    )

    return Buffer.concat([iv, new Uint8Array(encrypted)])
  }

  public async decrypt(key: crypto.webcrypto.CryptoKey, cipherText: Uint8Array): Promise<Uint8Array> {
    const iv = cipherText.subarray(0, IV_LENGTH_BYTES)
    const cipherTextData = cipherText.subarray(IV_LENGTH_BYTES)
    const decrypted = await crypto.subtle.decrypt(
      {
        name: CIPHER,
        iv,
        tagLength: TAG_LENGTH_BYTES * 8,
      },
      key,
      cipherTextData,
    )

    return new Uint8Array(decrypted)
  }
}

export const Ciphers = {
  AES_256_GCM: new CipherAes256GCM(),
}
