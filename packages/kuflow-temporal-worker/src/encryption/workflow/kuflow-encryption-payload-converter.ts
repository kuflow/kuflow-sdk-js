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

import type { Payload, PayloadConverterWithEncoding } from '@temporalio/common'
import { encode } from '@temporalio/common/lib/encoding'

import {
  EncryptionWrapper,
  METADATA_KUFLOW_ENCODING_ENCRYPTED_NAME,
  METADATA_KUFLOW_ENCODING_KEY,
} from '../kuflow-encryption-instrumentation'

export class EncryptionPayloadConverter implements PayloadConverterWithEncoding {
  public readonly encodingType: string

  public constructor(private readonly delegate: PayloadConverterWithEncoding) {
    this.encodingType = this.delegate.encodingType
  }

  public toPayload<T>(value: T): Payload | undefined {
    let needEncryption = false
    if (value instanceof EncryptionWrapper) {
      value = value.value
      needEncryption = true
    }

    let payload = this.delegate.toPayload(value)

    if (payload != null && needEncryption) {
      payload = {
        metadata: {
          ...payload.metadata,
          [METADATA_KUFLOW_ENCODING_KEY]: encode(METADATA_KUFLOW_ENCODING_ENCRYPTED_NAME),
        },
        data: payload.data,
      }
    }

    return payload
  }

  public fromPayload<T>(payload: Payload): T {
    return this.delegate.fromPayload(payload)
  }
}
