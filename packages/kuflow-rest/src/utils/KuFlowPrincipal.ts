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

const PREFIX = 'kuflow-principal:'
const METADATA_ID = 'id'
const METADATA_TYPE = 'type'
const METADATA_NAME = 'name'

export interface KuFlowPrincipal {
  source: string

  id: string

  type: string

  name: string
}

export function parseKuFlowPrincipal(source: unknown): KuFlowPrincipal | undefined {
  if (source == null) {
    return undefined
  }

  if (typeof source !== 'string') {
    return undefined
  }

  if (!source.toLowerCase().startsWith('kuflow-principal:')) {
    return undefined
  }

  const sourceWithoutPrefix = source.slice('kuflow-principal:'.length)

  const keyValuePairs = sourceWithoutPrefix.split(';')
  const keyValueObject: Record<string, string | undefined> = {}

  for (const pair of keyValuePairs) {
    const [key, value] = pair.split('=')
    keyValueObject[key] = decodeURIComponent(value)
  }

  const id = keyValueObject.id
  const type = keyValueObject.type
  const name = keyValueObject.name

  if (id == null || type == null || name == null) {
    return
  }

  return { source, id, type, name }
}

export function generateKuflowPrincipalString(id: string, principalType: string, name: string): string {
  return (
    `${PREFIX}${METADATA_ID}=${encode(id)};` +
    `${METADATA_TYPE}=${encode(principalType)};` +
    `${METADATA_NAME}=${encode(name)};`
  )
}

function encode(value: string | null): string {
  if (value == null) {
    return ''
  }

  return encodeURIComponent(value.trim()).replace(/\+/g, '%20')
}
