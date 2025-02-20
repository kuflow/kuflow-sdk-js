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

import { defaultPayloadConverter } from '@temporalio/common'
import type { Headers } from '@temporalio/workflow'

export const METADATA_KUFLOW_ENCODING_KEY = 'x-kuflow-encoding'

export const METADATA_KUFLOW_ENCODING_ENCRYPTED_NAME = 'binary/encrypted?vendor=KuFlow'

export function isEncryptionRequired(header: Headers): boolean {
  if (header[METADATA_KUFLOW_ENCODING_KEY] == null) {
    return false
  }

  const value = defaultPayloadConverter.fromPayload(header[METADATA_KUFLOW_ENCODING_KEY])

  return value === METADATA_KUFLOW_ENCODING_ENCRYPTED_NAME
}

export function addEncryptionEncoding(headers: Headers): Headers {
  return {
    ...headers,
    [METADATA_KUFLOW_ENCODING_KEY]: defaultPayloadConverter.toPayload(METADATA_KUFLOW_ENCODING_ENCRYPTED_NAME),
  }
}

export function markObjectsToBeEncrypted(args: unknown[]): unknown[] {
  return args.map(arg => EncryptionWrapper.of(arg))
}

export class EncryptionWrapper<T = unknown> {
  public static of<T = unknown>(value: T): EncryptionWrapper<T> {
    return new EncryptionWrapper(value)
  }

  public readonly value: T

  protected constructor(value: T) {
    this.value = value
  }
}
