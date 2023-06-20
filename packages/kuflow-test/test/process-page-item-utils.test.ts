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

import { describe, expect, test } from '@jest/globals'
import {
  type ProcessElementValueNumber,
  type ProcessElementValueString,
  type ProcessPageItem,
  ProcessPageItemUtils,
} from '@kuflow/kuflow-rest'

describe('Process Page Item Utils', () => {
  test('getElementValueValid', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValueValid = ProcessPageItemUtils.getElementValueValid(processPageItem, 'EV_STRING')

    expect(elementValueValid).toBeFalsy()
  })

  test('getElementValueValidAt', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValueValid0 = ProcessPageItemUtils.getElementValueValidAt(processPageItem, 'EV_STRING', 0)
    expect(elementValueValid0).not.toBeUndefined()
    expect(elementValueValid0).toBeTruthy()

    const elementValueValid1 = ProcessPageItemUtils.getElementValueValidAt(processPageItem, 'EV_STRING', 1)
    expect(elementValueValid1).not.toBeUndefined()
    expect(elementValueValid1).toBeFalsy()
  })

  test('setElementValueValid', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.setElementValueValid(processPageItem, 'EV_STRING', true)

    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])

    ProcessPageItemUtils.setElementValueValid(processPageItem, 'EV_STRING', false)

    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
    ])
  })

  test('setElementValueValidAt', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.setElementValueValidAt(processPageItem, 'EV_STRING', false, 0)
    ProcessPageItemUtils.setElementValueValidAt(processPageItem, 'EV_STRING', true, 1)

    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])
  })

  test('getElementValueAsString', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValue = ProcessPageItemUtils.getElementValueAsString(processPageItem, 'EV_STRING')
    expect(elementValue).toStrictEqual('MY TEXT 1')

    expect(() => {
      ProcessPageItemUtils.getElementValueAsString(processPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsString', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValue0 = ProcessPageItemUtils.findElementValueAsString(processPageItem, 'EV_STRING')
    expect(elementValue0).toStrictEqual('MY TEXT 1')

    const elementValue1 = ProcessPageItemUtils.findElementValueAsString(processPageItem, 'OTHER')
    expect(elementValue1).toBeUndefined()
  })

  test('getElementValueAsStringList', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValues0 = ProcessPageItemUtils.getElementValueAsStringList(processPageItem, 'EV_STRING')
    expect(elementValues0).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])

    const elementValues1 = ProcessPageItemUtils.getElementValueAsStringList(processPageItem, 'OTHER')
    expect(elementValues1).toStrictEqual([])
  })

  test('setElementValueAsString', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.setElementValueAsString(processPageItem, 'EV_STRING', 'MY TEXT 2')

    const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.setElementValueAsString(processPageItem, 'EV_STRING', undefined)

    expect(processPageItem.elementValues?.EV_STRING).toBeFalsy()
  })

  test('setElementValueAsStringList', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.setElementValueAsStringList(processPageItem, 'EV_STRING', ['MY TEXT 1', 'MY TEXT 2'])

    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.setElementValueAsStringList(processPageItem, 'EV_STRING', undefined)

    expect(processPageItem.elementValues?.EV_STRING).toBeFalsy()
  })

  test('addElementValueAsString', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.addElementValueAsString(processPageItem, 'EV_STRING', 'MY TEXT 2')

    const expectedElementValues2: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)

    ProcessPageItemUtils.addElementValueAsString(processPageItem, 'EV_STRING', undefined)

    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)
  })

  test('addElementValueAsStringList', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.addElementValueAsStringList(processPageItem, 'EV_STRING', ['MY TEXT', 'MY TEXT 2'])

    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.addElementValueAsStringList(processPageItem, 'EV_STRING', [])
    expect(processPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsNumber', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValue = ProcessPageItemUtils.getElementValueAsNumber(processPageItem, 'EV_NUMBER')
    expect(elementValue).toStrictEqual(500)

    expect(() => {
      ProcessPageItemUtils.getElementValueAsNumber(processPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsNumber', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValue1 = ProcessPageItemUtils.findElementValueAsNumber(processPageItem, 'EV_NUMBER')
    expect(elementValue1).toStrictEqual(500)

    const elementValue2 = ProcessPageItemUtils.findElementValueAsNumber(processPageItem, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsNumberList', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValues1 = ProcessPageItemUtils.getElementValueAsNumberList(processPageItem, 'EV_NUMBER')
    expect(elementValues1).toStrictEqual([500, 600])

    const elementValues2 = ProcessPageItemUtils.getElementValueAsNumberList(processPageItem, 'OTHER')
    expect(elementValues2).toStrictEqual([])
  })

  test('setElementValueAsNumber', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.setElementValueAsNumber(processPageItem, 'EV_NUMBER', 1234)

    const expectedElementValues1: ProcessElementValueNumber[] = [{ type: 'NUMBER', value: 1234 }]
    expect(processPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.setElementValueAsString(processPageItem, 'EV_NUMBER', undefined)

    expect(processPageItem.elementValues?.EV_NUMBER).toBeFalsy()
  })

  test('setElementValueAsNumberList', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.setElementValueAsNumberList(processPageItem, 'EV_NUMBER', [1234, 5678])

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(processPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.setElementValueAsString(processPageItem, 'EV_NUMBER', undefined)

    expect(processPageItem.elementValues?.EV_NUMBER).toBeFalsy()
  })

  test('addElementValueAsNumber', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.addElementValueAsNumber(processPageItem, 'EV_NUMBER', 1234)

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
    ]
    expect(processPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.addElementValueAsNumber(processPageItem, 'EV_NUMBER', undefined)

    expect(processPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsNumberList', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.addElementValueAsNumberList(processPageItem, 'EV_NUMBER', [1234, 5678])

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(processPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.addElementValueAsNumberList(processPageItem, 'EV_NUMBER', undefined)

    expect(processPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.addElementValueAsNumberList(processPageItem, 'EV_NUMBER', [])

    expect(processPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDate', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValue = ProcessPageItemUtils.getElementValueAsDate(processPageItem, 'EV_DATE')
    expect(elementValue).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      ProcessPageItemUtils.getElementValueAsDate(processPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsDate', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValue1 = ProcessPageItemUtils.findElementValueAsDate(processPageItem, 'EV_DATE')
    expect(elementValue1).toStrictEqual(new Date('2000-01-01'))

    const elementValue2 = ProcessPageItemUtils.findElementValueAsDate(processPageItem, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDateList', () => {
    const processPageItem = prepareProcessPageItem()

    const elementValue1 = ProcessPageItemUtils.getElementValueAsDateList(processPageItem, 'EV_DATE')
    expect(elementValue1).toStrictEqual([new Date('2000-01-01'), new Date('1980-01-01')])

    const elementValue2 = ProcessPageItemUtils.getElementValueAsDateList(processPageItem, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDate', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.setElementValueAsDate(processPageItem, 'EV_DATE', new Date('3000-01-01'))
    const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: '3000-01-01' }]
    expect(processPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.setElementValueAsDate(processPageItem, 'EV_DATE', undefined)
    expect(processPageItem.elementValues?.EV_DATE).toBeUndefined()
  })

  test('setElementValueAsDateList', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.setElementValueAsDateList(processPageItem, 'EV_DATE', [
      new Date('3000-01-01'),
      new Date('3020-01-01'),
    ])
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3020-01-01' },
    ]
    expect(processPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.setElementValueAsDateList(processPageItem, 'EV_DATE', undefined)
    expect(processPageItem.elementValues?.EV_DATE).toBeUndefined()
  })

  test('addElementValueAsDate', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.addElementValueAsDate(processPageItem, 'EV_DATE', new Date('3000-01-01'))
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
    ]
    expect(processPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.addElementValueAsDate(processPageItem, 'EV_DATE', undefined)
    expect(processPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDateList', () => {
    const processPageItem = prepareProcessPageItem()

    ProcessPageItemUtils.addElementValueAsDateList(processPageItem, 'EV_DATE', [
      new Date('3000-01-01'),
      new Date('3030-01-01'),
    ])
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3030-01-01' },
    ]
    expect(processPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.addElementValueAsDateList(processPageItem, 'EV_DATE', undefined)
    expect(processPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessPageItemUtils.addElementValueAsDateList(processPageItem, 'EV_DATE', [])
    expect(processPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
  })
})

function prepareProcessPageItem(): ProcessPageItem {
  return {
    objectType: 'PROCESS_PAGE_ITEM',
    processDefinition: {
      id: 'e68d8136-1166-455c-93d6-d106201c1856',
    },
    elementValues: {
      EV_STRING: [
        { type: 'STRING', value: 'MY TEXT 1', valid: true },
        { type: 'STRING', value: 'MY TEXT 2', valid: false },
      ],
      EV_NUMBER: [
        { type: 'NUMBER', value: 500, valid: true },
        { type: 'NUMBER', value: 600, valid: false },
      ],
      EV_DATE: [
        { type: 'STRING', value: '2000-01-01', valid: true },
        { type: 'STRING', value: '1980-01-01', valid: false },
      ],
    },
  }
}
