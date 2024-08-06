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

export interface KuFlowFile {
  source: string

  uri: string

  type: string

  name: string

  size: number

  originalName: string | undefined
}

export function parseKuFlowFile(source: unknown): KuFlowFile | undefined {
  if (source == null) {
    return undefined
  }

  if (typeof source !== 'string') {
    return undefined
  }

  if (!source.toLowerCase().startsWith('kuflow-file:')) {
    return undefined
  }

  const sourceWithoutPrefix = source.slice('kuflow-file:'.length)

  const keyValuePairs = sourceWithoutPrefix.split(';')
  const keyValueObject: Record<string, string | undefined> = {}

  for (const pair of keyValuePairs) {
    const [key, value] = pair.split('=')
    keyValueObject[key] = decodeURIComponent(value)
  }

  const uri = keyValueObject.uri
  const type = keyValueObject.type
  const name = keyValueObject.name
  const size = parseNumber(keyValueObject.size)

  if (uri == null || type == null || name == null || size == null) {
    return
  }

  const originalName = keyValueObject['original-name']

  return { source, uri, type, name, size, originalName }
}

function parseNumber(value: string | undefined): number | undefined {
  try {
    if (value == null) {
      return
    }
    return Number.parseInt(value)
  } catch (ignored) {
    return undefined
  }
}
