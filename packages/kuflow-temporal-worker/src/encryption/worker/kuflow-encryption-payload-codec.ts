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

import type { KuFlowRestClient, VaultCodecPayload } from '@kuflow/kuflow-rest'
import { METADATA_ENCODING_KEY, type Payload, type PayloadCodec } from '@temporalio/common'
import { decode } from '@temporalio/common/lib/encoding'

import {
  METADATA_KUFLOW_ENCODING_ENCRYPTED_NAME,
  METADATA_KUFLOW_ENCODING_KEY,
} from '../kuflow-encryption-instrumentation'

export class KuflowEncryptionPayloadCodec implements PayloadCodec {
  public constructor(private readonly restClient: KuFlowRestClient) {}

  public async encode(payloads: Payload[]): Promise<Payload[]> {
    const payloadsToEncrypt = payloads.filter(this.needPayloadBeEncrypted)

    const payloadsEncrypted = await this.encrypt(payloadsToEncrypt)

    return payloads.map((payload, i) => {
      if (!this.needPayloadBeEncrypted(payload)) {
        return payload
      }

      return payloadsEncrypted[i]
    })
  }

  public async decode(payloads: Payload[]): Promise<Payload[]> {
    const payloadsToDecrypt = payloads.filter(this.isPayloadEncrypted)

    const payloadsDecrypted = await this.decrypt(payloadsToDecrypt)

    return payloads.map((payload, i) => {
      if (!this.isPayloadEncrypted(payload)) {
        return payload
      }

      return payloadsDecrypted[i]
    })
  }

  private readonly needPayloadBeEncrypted = (payload: Payload): boolean => {
    try {
      return (
        payload.metadata != null &&
        decode(payload.metadata[METADATA_KUFLOW_ENCODING_KEY]) === METADATA_KUFLOW_ENCODING_ENCRYPTED_NAME
      )
    } catch {
      return false
    }
  }

  private readonly isPayloadEncrypted = (payload: Payload): boolean => {
    try {
      return (
        payload.metadata != null &&
        decode(payload.metadata?.[METADATA_ENCODING_KEY]) === METADATA_KUFLOW_ENCODING_ENCRYPTED_NAME
      )
    } catch {
      return false
    }
  }

  private async encrypt(payloads: Payload[]): Promise<Payload[]> {
    if (payloads.length === 0) {
      return payloads
    }

    const requestPayloads = payloads.map(this.transformPayloadToVaultCodecPayload)

    const response = await this.restClient.vaultOperations.codecEncode({
      payloads: requestPayloads,
    })

    return response.payloads.map(this.transformVaultCodecPayloadToPayload)
  }

  private async decrypt(payloads: Payload[]): Promise<Payload[]> {
    if (payloads.length === 0) {
      return payloads
    }

    const requestPayloads = payloads.map(this.transformPayloadToVaultCodecPayload)

    const response = await this.restClient.vaultOperations.codecDecode({
      payloads: requestPayloads,
    })

    return response.payloads.map(this.transformVaultCodecPayloadToPayload)
  }

  private readonly transformPayloadToVaultCodecPayload = (payload: Payload): VaultCodecPayload => {
    // TODO HAGO ESTO PORQUE LOS BINARIOS NO LOS TRANSFORMA BIEN
    // TODO HAGO ESTO PORQUE LOS BINARIOS NO LOS TRANSFORMA BIEN
    // TODO HAGO ESTO PORQUE LOS BINARIOS NO LOS TRANSFORMA BIEN
    // TODO HAGO ESTO PORQUE LOS BINARIOS NO LOS TRANSFORMA BIEN
    // TODO MIRAR ESTO: node_modules/@temporalio/common/src/converter/payload-converter.ts
    // TODO Tal vez esto lo hago en el operations ??? del rest ???? o cambio el tipo de dato?? en este SDK ????
    const metadata = Object.fromEntries(
      Object.entries(payload.metadata ?? {}).map(([key, value]) => [key, Buffer.from(value)]),
    )
    const data = Buffer.from(payload.data ?? new Uint8Array())

    return {
      metadata,
      data,
    }
  }

  private readonly transformVaultCodecPayloadToPayload = (payload: VaultCodecPayload): Payload => {
    return {
      metadata: {
        ...payload.metadata,
      },
      data: payload.data ?? new Uint8Array(),
    }
  }
}
