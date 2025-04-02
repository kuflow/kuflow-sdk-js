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

import type { KuFlowRestClient } from '@kuflow/kuflow-rest'
import { METADATA_ENCODING_KEY, type Payload, type PayloadCodec, ValueError } from '@temporalio/common'
import { decode, encode } from '@temporalio/common/lib/encoding'
import { temporal } from '@temporalio/proto'
import type crypto from 'crypto'

import {
  METADATA_KEY_ENCODING_ENCRYPTED_KEY_ID,
  METADATA_VALUE_KUFLOW_ENCODING_ENCRYPTED_NAME,
} from '../kuflow-encryption-instrumentation'
import { type Cache, CacheBuilder } from './kuflow-cache'
import { Ciphers } from './kuflow-crypto'

interface KuflowEncryptionPayloadCodecCto {
  restClient: KuFlowRestClient
}

export class KuflowEncryptionPayloadCodec implements PayloadCodec {
  private readonly kmsKeyCache: Cache<string, crypto.webcrypto.CryptoKey> = new CacheBuilder()
    .withExpireAfterAccess(1, 'hours')
    .build()

  private readonly restClient: KuFlowRestClient

  public constructor({ restClient }: KuflowEncryptionPayloadCodecCto) {
    this.restClient = restClient
  }

  public async encode(payloads: Payload[]): Promise<Payload[]> {
    return await Promise.all(payloads.map(this.encrypt))
  }

  public async decode(payloads: Payload[]): Promise<Payload[]> {
    return await Promise.all(payloads.map(this.decrypt))
  }

  private readonly encrypt = async (payload: Payload): Promise<Payload> => {
    if (payload.metadata?.[METADATA_KEY_ENCODING_ENCRYPTED_KEY_ID] == null) {
      return payload
    }

    const keyId = decode(payload.metadata[METADATA_KEY_ENCODING_ENCRYPTED_KEY_ID])

    const keyValue = await this.retrieveKey(keyId)

    const cipherTextBytes = await Ciphers.AES_256_GCM.encrypt(
      keyValue,
      temporal.api.common.v1.Payload.encode(payload).finish(),
    )

    const cipherTextValue = Buffer.from(cipherTextBytes).toString('base64')

    return {
      metadata: {
        [METADATA_ENCODING_KEY]: encode(METADATA_VALUE_KUFLOW_ENCODING_ENCRYPTED_NAME),
        [METADATA_KEY_ENCODING_ENCRYPTED_KEY_ID]: encode(keyId),
      },
      data: encode(`${Ciphers.AES_256_GCM.algorithm}:${cipherTextValue}`),
    }
  }

  private readonly decrypt = async (payload: Payload): Promise<Payload> => {
    if (
      payload.metadata == null ||
      decode(payload.metadata?.[METADATA_ENCODING_KEY]) !== METADATA_VALUE_KUFLOW_ENCODING_ENCRYPTED_NAME
    ) {
      return payload
    }

    if (payload.data == null) {
      throw new ValueError('Payload data is missing')
    }

    const keyIdBytes = payload.metadata[METADATA_KEY_ENCODING_ENCRYPTED_KEY_ID]
    if (keyIdBytes == null) {
      throw new ValueError('Unable to decrypt Payload without encryption key id')
    }

    const keyId = decode(keyIdBytes)

    const keyValue = await this.retrieveKey(keyId)

    const cipherText = decode(payload.data)

    const [cipherTextAlgorithm, cipherTextValue] = cipherText.split(':')
    if (cipherTextAlgorithm == null || cipherTextValue == null) {
      throw new ValueError('Invalid cipherText format')
    }

    if (cipherTextAlgorithm !== Ciphers.AES_256_GCM.algorithm) {
      throw new ValueError(`Invalid cipherText algorithm: ${cipherTextAlgorithm}`)
    }

    const cipherTextValueBuffer: Uint8Array = Buffer.from(cipherTextValue, 'base64')

    const plainText = await Ciphers.AES_256_GCM.decrypt(keyValue, cipherTextValueBuffer)

    return temporal.api.common.v1.Payload.decode(plainText)
  }

  private async retrieveKey(keyId: string): Promise<crypto.webcrypto.CryptoKey> {
    return await this.kmsKeyCache.get(keyId, async () => {
      const key = await this.restClient.kmsOperations.retrieveKmsKey(keyId)

      return await Ciphers.AES_256_GCM.importKey(key.value)
    })
  }
}
