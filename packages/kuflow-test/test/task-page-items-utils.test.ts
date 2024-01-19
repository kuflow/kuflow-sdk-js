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
  type JsonFormsFile,
  type JsonFormsPrincipal,
  type TaskElementValueDocument,
  type TaskElementValueDocumentItem,
  type TaskElementValueNumber,
  type TaskElementValueObject,
  type TaskElementValuePrincipal,
  type TaskElementValuePrincipalItem,
  type TaskElementValueString,
  type TaskPageItem,
  TaskPageItemUtils,
} from '@kuflow/kuflow-rest'

describe('Task Page Items Utils', () => {
  test('getElementValueValid', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValueValid = TaskPageItemUtils.getElementValueValid(taskPageItem, 'EV_STRING')

    expect(elementValueValid).toBeFalsy()
  })

  test('getElementValueValidAt', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValueValid0 = TaskPageItemUtils.getElementValueValidAt(taskPageItem, 'EV_STRING', 0)
    expect(elementValueValid0).not.toBeUndefined()
    expect(elementValueValid0).toBeTruthy()

    const elementValueValid1 = TaskPageItemUtils.getElementValueValidAt(taskPageItem, 'EV_STRING', 1)
    expect(elementValueValid1).not.toBeUndefined()
    expect(elementValueValid1).toBeFalsy()
  })

  test('setElementValueValid', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueValid(taskPageItem, 'EV_STRING', true)

    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])

    TaskPageItemUtils.setElementValueValid(taskPageItem, 'EV_STRING', false)

    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
    ])
  })

  test('setElementValueValidAt', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueValidAt(taskPageItem, 'EV_STRING', false, 0)
    TaskPageItemUtils.setElementValueValidAt(taskPageItem, 'EV_STRING', true, 1)

    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])
  })

  test('getElementValueAsString', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue = TaskPageItemUtils.getElementValueAsString(taskPageItem, 'EV_STRING')
    expect(elementValue).toStrictEqual('MY TEXT 1')

    expect(() => {
      TaskPageItemUtils.getElementValueAsString(taskPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsString', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue0 = TaskPageItemUtils.findElementValueAsString(taskPageItem, 'EV_STRING')
    expect(elementValue0).toStrictEqual('MY TEXT 1')

    const elementValue1 = TaskPageItemUtils.findElementValueAsString(taskPageItem, 'OTHER')
    expect(elementValue1).toBeUndefined()
  })

  test('getElementValueAsStringList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValues0 = TaskPageItemUtils.getElementValueAsStringList(taskPageItem, 'EV_STRING')
    expect(elementValues0).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])

    const elementValues1 = TaskPageItemUtils.getElementValueAsStringList(taskPageItem, 'OTHER')
    expect(elementValues1).toStrictEqual([])
  })

  test('setElementValueAsString', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsString(taskPageItem, 'EV_STRING', 'MY TEXT 2')

    const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsString(taskPageItem, 'EV_STRING', undefined)

    expect(taskPageItem.elementValues?.EV_STRING).toBeFalsy()
  })

  test('setElementValueAsStringList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsStringList(taskPageItem, 'EV_STRING', ['MY TEXT 1', 'MY TEXT 2'])

    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsStringList(taskPageItem, 'EV_STRING', undefined)

    expect(taskPageItem.elementValues?.EV_STRING).toBeFalsy()
  })

  test('addElementValueAsString', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsString(taskPageItem, 'EV_STRING', 'MY TEXT 2')

    const expectedElementValues2: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)

    TaskPageItemUtils.addElementValueAsString(taskPageItem, 'EV_STRING', undefined)

    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)
  })

  test('addElementValueAsStringList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsStringList(taskPageItem, 'EV_STRING', ['MY TEXT', 'MY TEXT 2'])

    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsStringList(taskPageItem, 'EV_STRING', [])
    expect(taskPageItem.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsNumber', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue = TaskPageItemUtils.getElementValueAsNumber(taskPageItem, 'EV_NUMBER')
    expect(elementValue).toStrictEqual(500)

    expect(() => {
      TaskPageItemUtils.getElementValueAsNumber(taskPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsNumber', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.findElementValueAsNumber(taskPageItem, 'EV_NUMBER')
    expect(elementValue1).toStrictEqual(500)

    const elementValue2 = TaskPageItemUtils.findElementValueAsNumber(taskPageItem, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsNumberList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValues1 = TaskPageItemUtils.getElementValueAsNumberList(taskPageItem, 'EV_NUMBER')
    expect(elementValues1).toStrictEqual([500, 600])

    const elementValues2 = TaskPageItemUtils.getElementValueAsNumberList(taskPageItem, 'OTHER')
    expect(elementValues2).toStrictEqual([])
  })

  test('setElementValueAsNumber', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsNumber(taskPageItem, 'EV_NUMBER', 1234)

    const expectedElementValues1: TaskElementValueNumber[] = [{ type: 'NUMBER', value: 1234 }]
    expect(taskPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsString(taskPageItem, 'EV_NUMBER', undefined)

    expect(taskPageItem.elementValues?.EV_NUMBER).toBeFalsy()
  })

  test('setElementValueAsNumberList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsNumberList(taskPageItem, 'EV_NUMBER', [1234, 5678])

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(taskPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsString(taskPageItem, 'EV_NUMBER', undefined)

    expect(taskPageItem.elementValues?.EV_NUMBER).toBeFalsy()
  })

  test('addElementValueAsNumber', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsNumber(taskPageItem, 'EV_NUMBER', 1234)

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
    ]
    expect(taskPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsNumber(taskPageItem, 'EV_NUMBER', undefined)

    expect(taskPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsNumberList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsNumberList(taskPageItem, 'EV_NUMBER', [1234, 5678])

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(taskPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsNumberList(taskPageItem, 'EV_NUMBER', undefined)

    expect(taskPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsNumberList(taskPageItem, 'EV_NUMBER', [])

    expect(taskPageItem.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDate', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue = TaskPageItemUtils.getElementValueAsDate(taskPageItem, 'EV_DATE')
    expect(elementValue).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      TaskPageItemUtils.getElementValueAsDate(taskPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsDate', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.findElementValueAsDate(taskPageItem, 'EV_DATE')
    expect(elementValue1).toStrictEqual(new Date('2000-01-01'))

    const elementValue2 = TaskPageItemUtils.findElementValueAsDate(taskPageItem, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDateList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.getElementValueAsDateList(taskPageItem, 'EV_DATE')
    expect(elementValue1).toStrictEqual([new Date('2000-01-01'), new Date('1980-01-01')])

    const elementValue2 = TaskPageItemUtils.getElementValueAsDateList(taskPageItem, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDate', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsDate(taskPageItem, 'EV_DATE', new Date('3000-01-01'))
    const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: '3000-01-01' }]
    expect(taskPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsDate(taskPageItem, 'EV_DATE', undefined)
    expect(taskPageItem.elementValues?.EV_DATE).toBeUndefined()
  })

  test('setElementValueAsDateList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsDateList(taskPageItem, 'EV_DATE', [
      new Date('3000-01-01'),
      new Date('3020-01-01'),
    ])
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3020-01-01' },
    ]
    expect(taskPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsDateList(taskPageItem, 'EV_DATE', undefined)
    expect(taskPageItem.elementValues?.EV_DATE).toBeUndefined()
  })

  test('addElementValueAsDate', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsDate(taskPageItem, 'EV_DATE', new Date('3000-01-01'))
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
    ]
    expect(taskPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsDate(taskPageItem, 'EV_DATE', undefined)
    expect(taskPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDateList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsDateList(taskPageItem, 'EV_DATE', [
      new Date('3000-01-01'),
      new Date('3030-01-01'),
    ])
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3030-01-01' },
    ]
    expect(taskPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsDateList(taskPageItem, 'EV_DATE', undefined)
    expect(taskPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsDateList(taskPageItem, 'EV_DATE', [])
    expect(taskPageItem.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsObject', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue = TaskPageItemUtils.getElementValueAsObject(taskPageItem, 'EV_OBJECT')
    expect(elementValue).toStrictEqual({ key: 'value 1' })

    expect(() => {
      TaskPageItemUtils.getElementValueAsObject(taskPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsObject', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.findElementValueAsObject(taskPageItem, 'EV_OBJECT')
    expect(elementValue1).toStrictEqual({ key: 'value 1' })

    const elementValue2 = TaskPageItemUtils.findElementValueAsObject(taskPageItem, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsObjectList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.getElementValueAsObjectList(taskPageItem, 'EV_OBJECT')
    expect(elementValue1).toStrictEqual([{ key: 'value 1' }, { key: 'value 2' }])

    const elementValue2 = TaskPageItemUtils.getElementValueAsObjectList(taskPageItem, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsObject', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsObject(taskPageItem, 'EV_OBJECT', { key: 'value 3' })
    const expectedElementValues1: TaskElementValueObject[] = [{ type: 'OBJECT', value: { key: 'value 3' } }]
    expect(taskPageItem.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsObject(taskPageItem, 'EV_OBJECT', undefined)
    expect(taskPageItem.elementValues?.EV_OBJECT).toBeUndefined()
  })

  test('setElementValueAsObjectList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsObjectList(taskPageItem, 'EV_OBJECT', [{ key: 'value 3' }, { key: 'value 4' }])
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 3' } },
      { type: 'OBJECT', value: { key: 'value 4' } },
    ]
    expect(taskPageItem.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsObjectList(taskPageItem, 'EV_OBJECT', [])
    expect(taskPageItem.elementValues?.EV_OBJECT).toBeUndefined()
  })

  test('addElementValueAsObject', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsObject(taskPageItem, 'EV_OBJECT', { key: 'value 3' })
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
      { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
      { type: 'OBJECT', value: { key: 'value 3' } },
    ]
    expect(taskPageItem.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsObject(taskPageItem, 'EV_OBJECT', undefined)
    expect(taskPageItem.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsObjectList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsObjectList(taskPageItem, 'EV_OBJECT', [{ key: 'value 3' }, { key: 'value 4' }])
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
      { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
      { type: 'OBJECT', value: { key: 'value 3' } },
      { type: 'OBJECT', value: { key: 'value 4' } },
    ]
    expect(taskPageItem.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsObjectList(taskPageItem, 'EV_OBJECT', undefined)
    expect(taskPageItem.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsObjectList(taskPageItem, 'EV_OBJECT', [])
    expect(taskPageItem.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDocument', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue = TaskPageItemUtils.getElementValueAsDocument(taskPageItem, 'EV_DOCUMENT')
    expect(elementValue).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

    expect(() => {
      TaskPageItemUtils.getElementValueAsDocument(taskPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsDocument', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.findElementValueAsDocument(taskPageItem, 'EV_DOCUMENT')
    expect(elementValue1).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

    const elementValue2 = TaskPageItemUtils.findElementValueAsDocument(taskPageItem, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDocumentList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.getElementValueAsDocumentList(taskPageItem, 'EV_DOCUMENT')
    expect(elementValue1).toStrictEqual([
      prepareTaskElementValueDocumentItem('1'),
      prepareTaskElementValueDocumentItem('2'),
    ])

    const elementValue2 = TaskPageItemUtils.getElementValueAsDocumentList(taskPageItem, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDocument', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsDocument(taskPageItem, 'EV_DOCUMENT', prepareTaskElementValueDocumentItem('3'))
    const expectedElementValues1: TaskElementValueDocument[] = [
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('3'),
      },
    ]
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsDocument(taskPageItem, 'EV_DOCUMENT', undefined)
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toBeUndefined()
  })

  test('setElementValueAsDocumentList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsDocumentList(taskPageItem, 'EV_DOCUMENT', [
      prepareTaskElementValueDocumentItem('3'),
      prepareTaskElementValueDocumentItem('4'),
    ])
    const expectedElementValues1: TaskElementValueDocument[] = [
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('3'),
      },
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('4'),
      },
    ]
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsDocumentList(taskPageItem, 'EV_DOCUMENT', undefined)
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toBeUndefined()
  })

  test('addElementValueAsDocument', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsDocument(taskPageItem, 'EV_DOCUMENT', prepareTaskElementValueDocumentItem('3'))
    const expectedElementValues1: TaskElementValueDocument[] = [
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('1'),
        valid: true,
      },
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('2'),
        valid: false,
      },
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('3'),
      },
    ]
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsDocument(taskPageItem, 'EV_DOCUMENT', undefined)
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDocumentList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsDocumentList(taskPageItem, 'EV_DOCUMENT', [
      prepareTaskElementValueDocumentItem('3'),
      prepareTaskElementValueDocumentItem('4'),
    ])
    const expectedElementValues1: TaskElementValueDocument[] = [
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('1'),
        valid: true,
      },
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('2'),
        valid: false,
      },
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('3'),
      },
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('4'),
      },
    ]
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsDocumentList(taskPageItem, 'EV_DOCUMENT', undefined)
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsDocumentList(taskPageItem, 'EV_DOCUMENT', [])
    expect(taskPageItem.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsPrincipal', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue = TaskPageItemUtils.getElementValueAsPrincipal(taskPageItem, 'EV_PRINCIPAL')
    expect(elementValue).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

    expect(() => {
      TaskPageItemUtils.getElementValueAsPrincipal(taskPageItem, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsPrincipal', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.findElementValueAsPrincipal(taskPageItem, 'EV_PRINCIPAL')
    expect(elementValue1).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

    const elementValue2 = TaskPageItemUtils.findElementValueAsPrincipal(taskPageItem, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsPrincipalList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    const elementValue1 = TaskPageItemUtils.getElementValueAsPrincipalList(taskPageItem, 'EV_PRINCIPAL')
    expect(elementValue1).toStrictEqual([
      prepareTaskElementValuePrincipalItem('1'),
      prepareTaskElementValuePrincipalItem('2'),
    ])

    const elementValue2 = TaskPageItemUtils.getElementValueAsPrincipalList(taskPageItem, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsPrincipal', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsPrincipal(
      taskPageItem,
      'EV_PRINCIPAL',
      prepareTaskElementValuePrincipalItem('3'),
    )
    const expectedElementValues1: TaskElementValuePrincipal[] = [
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('3'),
      },
    ]
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsPrincipal(taskPageItem, 'EV_PRINCIPAL', undefined)
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toBeUndefined()
  })

  test('setElementValueAsPrincipalList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.setElementValueAsPrincipalList(taskPageItem, 'EV_PRINCIPAL', [
      prepareTaskElementValuePrincipalItem('3'),
      prepareTaskElementValuePrincipalItem('4'),
    ])
    const expectedElementValues1: TaskElementValuePrincipal[] = [
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('3'),
      },
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('4'),
      },
    ]
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.setElementValueAsPrincipalList(taskPageItem, 'EV_PRINCIPAL', undefined)
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toBeUndefined()
  })

  test('addElementValueAsPrincipal', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsPrincipal(
      taskPageItem,
      'EV_PRINCIPAL',
      prepareTaskElementValuePrincipalItem('3'),
    )
    const expectedElementValues1: TaskElementValuePrincipal[] = [
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('1'),
        valid: true,
      },
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('2'),
        valid: false,
      },
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('3'),
      },
    ]
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsPrincipal(taskPageItem, 'EV_PRINCIPAL', undefined)
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsPrincipalList', () => {
    const taskPageItem = prepareTaskPageItemElementValues()

    TaskPageItemUtils.addElementValueAsPrincipalList(taskPageItem, 'EV_PRINCIPAL', [
      prepareTaskElementValuePrincipalItem('3'),
      prepareTaskElementValuePrincipalItem('4'),
    ])
    const expectedElementValues1: TaskElementValuePrincipal[] = [
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('1'),
        valid: true,
      },
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('2'),
        valid: false,
      },
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('3'),
      },
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('4'),
      },
    ]
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsPrincipalList(taskPageItem, 'EV_PRINCIPAL', undefined)
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskPageItemUtils.addElementValueAsPrincipalList(taskPageItem, 'EV_PRINCIPAL', [])
    expect(taskPageItem.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)
  })

  test('getJsonFormsPropertyAsString', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.getJsonFormsPropertyAsString(taskPageItem, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = TaskPageItemUtils.getJsonFormsPropertyAsString(taskPageItem, 'key2.key2_key1.0.key2_key1_key2')
    expect(value2).toStrictEqual('value_key2_key1_key2')

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsString(taskPageItem, 'key2.key2_key1.0.unknown')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsString(taskPageItem, 'key2.key2_key1.10')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsString(taskPageItem, 'key2.key2_key1.100.key2_key1_key2')
    }).toThrow("Property value doesn't exist")
  })

  test('findJsonFormsPropertyAsString', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.findJsonFormsPropertyAsString(taskPageItem, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = TaskPageItemUtils.findJsonFormsPropertyAsString(taskPageItem, 'key2.key2_key1.0.key2_key1_key2')
    expect(value2).toStrictEqual('value_key2_key1_key2')

    const value3 = TaskPageItemUtils.findJsonFormsPropertyAsString(taskPageItem, 'key2.key2_key1.0.unknown')
    expect(value3).toBeUndefined()

    const value4 = TaskPageItemUtils.findJsonFormsPropertyAsString(taskPageItem, 'key2.key2_key1.10')
    expect(value4).toBeUndefined()

    const value5 = TaskPageItemUtils.findJsonFormsPropertyAsString(taskPageItem, 'key2.key2_key1.100.key2_key1_key2')
    expect(value5).toBeUndefined()
  })

  test('getJsonFormsPropertyAsNumber', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.getJsonFormsPropertyAsNumber(taskPageItem, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = TaskPageItemUtils.getJsonFormsPropertyAsNumber(taskPageItem, 'key3.1')
    expect(value2).toStrictEqual(1000)

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsNumber(taskPageItem, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsNumber(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('findJsonFormsPropertyAsNumber', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.findJsonFormsPropertyAsNumber(taskPageItem, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = TaskPageItemUtils.findJsonFormsPropertyAsNumber(taskPageItem, 'key3.1')
    expect(value2).toStrictEqual(1000)

    const value3 = TaskPageItemUtils.findJsonFormsPropertyAsNumber(taskPageItem, 'key_xxxxxxx')
    expect(value3).toBeUndefined()

    expect(() => {
      TaskPageItemUtils.findJsonFormsPropertyAsNumber(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('getJsonFormsPropertyAsBoolean', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.getJsonFormsPropertyAsBoolean(taskPageItem, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = TaskPageItemUtils.getJsonFormsPropertyAsBoolean(taskPageItem, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = TaskPageItemUtils.getJsonFormsPropertyAsBoolean(taskPageItem, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = TaskPageItemUtils.getJsonFormsPropertyAsBoolean(taskPageItem, 'key4.3')
    expect(value4).toStrictEqual(false)

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsBoolean(taskPageItem, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsBoolean(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('findJsonFormsPropertyAsBoolean', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.findJsonFormsPropertyAsBoolean(taskPageItem, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = TaskPageItemUtils.findJsonFormsPropertyAsBoolean(taskPageItem, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = TaskPageItemUtils.findJsonFormsPropertyAsBoolean(taskPageItem, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = TaskPageItemUtils.findJsonFormsPropertyAsBoolean(taskPageItem, 'key4.3')
    expect(value4).toStrictEqual(false)

    const value5 = TaskPageItemUtils.findJsonFormsPropertyAsBoolean(taskPageItem, 'key_xxxxxxx')
    expect(value5).toBeUndefined()

    expect(() => {
      TaskPageItemUtils.findJsonFormsPropertyAsBoolean(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('getJsonFormsPropertyAsDate', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.getJsonFormsPropertyAsDate(taskPageItem, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsDate(taskPageItem, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsDate(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('findJsonFormsPropertyAsDate', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.findJsonFormsPropertyAsDate(taskPageItem, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    const value2 = TaskPageItemUtils.findJsonFormsPropertyAsDate(taskPageItem, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TaskPageItemUtils.findJsonFormsPropertyAsDate(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('getJsonFormsPropertyAsJsonFormsFile', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value = TaskPageItemUtils.getJsonFormsPropertyAsJsonFormsFile(taskPageItem, 'key6')
    expect(value).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsJsonFormsFile(taskPageItem, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsJsonFormsFile(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('findJsonFormsPropertyAsJsonFormsFile', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.findJsonFormsPropertyAsJsonFormsFile(taskPageItem, 'key6')
    expect(value1).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    const value2 = TaskPageItemUtils.findJsonFormsPropertyAsJsonFormsFile(taskPageItem, 'key_xxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TaskPageItemUtils.findJsonFormsPropertyAsJsonFormsFile(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('getJsonFormsPropertyAsJsonFormsPrincipal', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value = TaskPageItemUtils.getJsonFormsPropertyAsJsonFormsPrincipal(taskPageItem, 'key7')
    expect(value).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsJsonFormsPrincipal(taskPageItem, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsJsonFormsPrincipal(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('findJsonFormsPropertyAsJsonFormsPrincipal', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.findJsonFormsPropertyAsJsonFormsPrincipal(taskPageItem, 'key7')
    expect(value1).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    const value2 = TaskPageItemUtils.findJsonFormsPropertyAsJsonFormsPrincipal(taskPageItem, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TaskPageItemUtils.findJsonFormsPropertyAsJsonFormsPrincipal(taskPageItem, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('getJsonFormsPropertyAsArray', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.getJsonFormsPropertyAsArray(taskPageItem, 'key3')
    expect(value1).toStrictEqual([500, '1000'])

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsArray(taskPageItem, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsArray(taskPageItem, 'key1')
    }).toThrow('Property key1 is not an array')
  })

  test('getJsonFormsPropertyAsObject', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.getJsonFormsPropertyAsObject(taskPageItem, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsObject(taskPageItem, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskPageItemUtils.getJsonFormsPropertyAsObject(taskPageItem, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('findJsonFormsPropertyAsObject', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()

    const value1 = TaskPageItemUtils.findJsonFormsPropertyAsObject(taskPageItem, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    const value2 = TaskPageItemUtils.findJsonFormsPropertyAsObject(taskPageItem, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TaskPageItemUtils.findJsonFormsPropertyAsObject(taskPageItem, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('updateJsonFormsProperty', () => {
    const taskPageItem = prepareTaskPageItemJsonFormsValue()
    taskPageItem.jsonFormsValue = {}

    const file: JsonFormsFile = {
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    }

    const principal: JsonFormsPrincipal = {
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    }

    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key1', 'text')
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key2.0.key1', true)
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key2.0.key2', new Date('2020-01-01'))
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key2.1.key1', false)
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key2.1.key2', new Date('3030-01-01'))
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key3', 100)
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key4', file)
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key5', principal)

    expect(taskPageItem.jsonFormsValue.data).toStrictEqual({
      key1: 'text',
      key2: [
        {
          key1: true,
          key2: '2020-01-01',
        },
        {
          key1: false,
          key2: '3030-01-01',
        },
      ],
      key3: 100,
      key4: 'kuflow-file:uri=xxx-yyy-zzz;type=application/pdf;size=500;name=dummy.pdf;',
      key5: 'kuflow-principal:id=xxx-yyy-zzz;type=USER;name=Homer Simpson;',
    })

    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key1', undefined)
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key2.0', undefined)
    TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key2.0.key1', undefined)

    expect(taskPageItem.jsonFormsValue.data).toStrictEqual({
      key2: [
        {
          key2: '3030-01-01',
        },
      ],
      key3: 100,
      key4: 'kuflow-file:uri=xxx-yyy-zzz;type=application/pdf;size=500;name=dummy.pdf;',
      key5: 'kuflow-principal:id=xxx-yyy-zzz;type=USER;name=Homer Simpson;',
    })

    expect(() => {
      TaskPageItemUtils.updateJsonFormsProperty(taskPageItem, 'key2.100.key1', undefined)
    }).toThrow("Property key2.100.key1 doesn't exist")
  })
})

function prepareTaskPageItemElementValues(): TaskPageItem {
  return {
    taskDefinition: {
      id: 'e68d8136-1166-455c-93d6-d106201c1856',
    },
    processId: '3b755d5e-b64f-4ec2-a830-173f006bdf8e',
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
      EV_OBJECT: [
        { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
        { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
      ],
      EV_DOCUMENT: [
        {
          type: 'DOCUMENT',
          value: prepareTaskElementValueDocumentItem('1'),
          valid: true,
        },
        {
          type: 'DOCUMENT',
          value: prepareTaskElementValueDocumentItem('2'),
          valid: false,
        },
      ],
      EV_PRINCIPAL: [
        {
          type: 'PRINCIPAL',
          value: prepareTaskElementValuePrincipalItem('1'),
          valid: true,
        },
        {
          type: 'PRINCIPAL',
          value: prepareTaskElementValuePrincipalItem('2'),
          valid: false,
        },
      ],
    },
  }
}

function prepareTaskElementValueDocumentItem(suffix: string): TaskElementValueDocumentItem {
  return {
    id: `id_${suffix}`,
    uri: `uri_${suffix}`,
    name: `name_${suffix}`,
    contentPath: `contentPath_${suffix}`,
    contentType: `contentType_${suffix}`,
    contentLength: 600,
  }
}

function prepareTaskElementValuePrincipalItem(suffix: string): TaskElementValuePrincipalItem {
  return {
    id: `id_${suffix}`,
    type: 'USER',
    name: `name_${suffix}`,
  }
}

function prepareTaskPageItemJsonFormsValue(): TaskPageItem {
  return {
    taskDefinition: {
      id: 'e68d8136-1166-455c-93d6-d106201c1856',
    },
    processId: '3b755d5e-b64f-4ec2-a830-173f006bdf8e',
    jsonFormsValue: {
      data: {
        key1: 'value_key1',
        key2: {
          key2_key1: [
            {
              key2_key1_key1: 0,
              key2_key1_key2: 'value_key2_key1_key2',
            },
          ],
        },
        key3: [500, '1000'],
        key4: [true, false, 'true', 'false'],
        key5: ['2000-01-01'],
        key6: 'kuflow-file:uri=xxx-yyy-zzz;type=application/pdf;size=500;name=dummy.pdf;',
        key7: 'kuflow-principal:id=xxx-yyy-zzz;type=USER;name=Homer Simpson;',
      },
    },
  }
}
