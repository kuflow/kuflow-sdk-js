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

import { defaultPayloadConverter, METADATA_ENCODING_KEY, ValueError } from '@temporalio/common'
import type { Headers } from '@temporalio/workflow'

export const HEADER_KEY_KUFLOW_ENCODING = 'x-kuflow-encoding'

export const HEADER_KEY_KUFLOW_ENCODING_ENCRYPTED_KEY_ID = 'x-kuflow-encoding-encrypted-key-id'

export const HEADER_VALUE_KUFLOW_ENCODING_ENCRYPTED = 'binary/encrypted?vendor=KuFlow'

export const METADATA_KEY_ENCODING = METADATA_ENCODING_KEY

export const METADATA_KEY_ENCODING_ENCRYPTED_KEY_ID = METADATA_ENCODING_KEY + '-encrypted-key-id'

export const METADATA_VALUE_KUFLOW_ENCODING_ENCRYPTED = 'binary/encrypted?vendor=KuFlow'

export class EncryptionState {
  public static empty(): EncryptionState {
    return new EncryptionState(undefined)
  }

  public static of(keyId: string | undefined): EncryptionState {
    return new EncryptionState(keyId)
  }

  private _keyId: string | undefined = undefined

  public get keyId(): string | undefined {
    return this._keyId
  }

  public set keyId(value: string | undefined) {
    this._keyId = value
  }

  protected constructor(keyId: string | undefined) {
    this._keyId = keyId
  }

  public merge(other: EncryptionState | undefined): void {
    if (other != null) {
      this._keyId = other.keyId
    } else {
      this._keyId = undefined
    }
  }
}

export function retrieveEncryptionState(header: Headers): EncryptionState {
  if (!isEncryptionRequired(header)) {
    return EncryptionState.empty()
  }

  const keyIdPayload = header[HEADER_KEY_KUFLOW_ENCODING_ENCRYPTED_KEY_ID]
  if (keyIdPayload == null) {
    throw new ValueError(`Header ${HEADER_KEY_KUFLOW_ENCODING_ENCRYPTED_KEY_ID} is required`)
  }

  const keyId: string = defaultPayloadConverter.fromPayload(keyIdPayload)

  return EncryptionState.of(keyId)
}

export function isEncryptionRequired(header: Headers): boolean {
  if (header[HEADER_KEY_KUFLOW_ENCODING] == null) {
    return false
  }

  const value = defaultPayloadConverter.fromPayload(header[HEADER_KEY_KUFLOW_ENCODING])

  return value === HEADER_VALUE_KUFLOW_ENCODING_ENCRYPTED
}

export function addEncryptionEncoding(encryptionState: EncryptionState, headers: Headers): Headers {
  if (encryptionState.keyId == null) {
    return headers
  }

  return {
    ...headers,
    [HEADER_KEY_KUFLOW_ENCODING]: defaultPayloadConverter.toPayload(HEADER_VALUE_KUFLOW_ENCODING_ENCRYPTED),
    [HEADER_KEY_KUFLOW_ENCODING_ENCRYPTED_KEY_ID]: defaultPayloadConverter.toPayload(encryptionState.keyId),
  }
}

export function markObjectsToBeEncrypted(encryptionState: EncryptionState, args: unknown[]): unknown[] {
  if (encryptionState.keyId == null) {
    return args
  }

  return args.map(arg => EncryptionWrapper.of(encryptionState, arg))
}

export class EncryptionWrapper<T = unknown> {
  public static of<T = unknown>(encryptionState: EncryptionState, value: T): EncryptionWrapper<T> {
    return new EncryptionWrapper(encryptionState, value)
  }

  protected constructor(
    public readonly encryptionState: EncryptionState,
    public readonly value: T,
  ) {}
}

export const encryptionState = EncryptionState.empty()
