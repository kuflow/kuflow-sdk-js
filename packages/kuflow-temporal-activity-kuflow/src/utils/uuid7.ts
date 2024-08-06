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

export function uuid7(): string {
  // Return the hexadecimal text representation of number `n`, padded with zeroes to be of length `p`
  const hx = (n: number, p: number): string => n.toString(16).padStart(p, '0')

  // Current timestamp in ms, we only take into account only the first 48bits
  const now = Date.now()
  if (!Number.isInteger(now) || now < 1 || now > 0xffff_ffff_ffffn) {
    throw new RangeError('`timestamp` must be a 48-bit positive integer')
  }
  const timestamp = BigInt(now)

  // Create a view backed by a 16-byte buffer
  const view = new DataView(new ArrayBuffer(16))

  // Timestamp (store timestamp using 48bits)
  view.setUint32(0, Number((timestamp >> 16n) & 0xffffffffn))
  view.setUint16(4, Number(timestamp & 0xffffn))

  // Random bytes
  view.setUint32(6, (Math.random() * 0x100000000) >>> 0) // 4 bytes - 32 bits random number
  view.setUint32(10, (Math.random() * 0x100000000) >>> 0) // 4 bytes - 32 bits random number
  view.setUint16(14, (Math.random() * 0x10000) >>> 0) // 2 bytes - 16 bits random number

  // Patch the 6th byte to reflect a version 7 UUID
  view.setUint8(6, (view.getUint8(6) & 0xf) | 0x70)

  // Patch the 8th byte to reflect a variant 1 UUID (version 4 UUIDs are)
  view.setUint8(8, (view.getUint8(8) & 0x3f) | 0x80)

  // Compile the canonical textual form from the array data
  return `${hx(view.getUint32(0), 8)}-${hx(view.getUint16(4), 4)}-${hx(view.getUint16(6), 4)}-${hx(view.getUint16(8), 4)}-${hx(view.getUint32(10), 8)}${hx(view.getUint16(14), 4)}`
}
