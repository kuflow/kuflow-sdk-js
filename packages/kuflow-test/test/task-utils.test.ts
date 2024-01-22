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
  JsonFormsUtils,
  type Task,
  type TaskElementValueDocument,
  type TaskElementValueDocumentItem,
  type TaskElementValueNumber,
  type TaskElementValueObject,
  type TaskElementValuePrincipal,
  type TaskElementValuePrincipalItem,
  type TaskElementValueString,
  TaskUtils,
} from '@kuflow/kuflow-rest'

describe('Task Utils', () => {
  test('getElementValueValid', () => {
    const task = prepareTaskElementValues()

    const elementValueValid = TaskUtils.getElementValueValid(task, 'EV_STRING')

    expect(elementValueValid).toBeFalsy()
  })

  test('getElementValueValidAt', () => {
    const task = prepareTaskElementValues()

    const elementValueValid0 = TaskUtils.getElementValueValidAt(task, 'EV_STRING', 0)
    expect(elementValueValid0).not.toBeUndefined()
    expect(elementValueValid0).toBeTruthy()

    const elementValueValid1 = TaskUtils.getElementValueValidAt(task, 'EV_STRING', 1)
    expect(elementValueValid1).not.toBeUndefined()
    expect(elementValueValid1).toBeFalsy()
  })

  test('setElementValueValid', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueValid(task, 'EV_STRING', true)

    expect(task.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])

    TaskUtils.setElementValueValid(task, 'EV_STRING', false)

    expect(task.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
    ])
  })

  test('setElementValueValidAt', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueValidAt(task, 'EV_STRING', false, 0)
    TaskUtils.setElementValueValidAt(task, 'EV_STRING', true, 1)

    expect(task.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])
  })

  test('getElementValueAsString', () => {
    const task = prepareTaskElementValues()

    const elementValue = TaskUtils.getElementValueAsString(task, 'EV_STRING')
    expect(elementValue).toStrictEqual('MY TEXT 1')

    expect(() => {
      TaskUtils.getElementValueAsString(task, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsString', () => {
    const task = prepareTaskElementValues()

    const elementValue0 = TaskUtils.findElementValueAsString(task, 'EV_STRING')
    expect(elementValue0).toStrictEqual('MY TEXT 1')

    const elementValue1 = TaskUtils.findElementValueAsString(task, 'OTHER')
    expect(elementValue1).toBeUndefined()
  })

  test('getElementValueAsStringList', () => {
    const task = prepareTaskElementValues()

    const elementValues0 = TaskUtils.getElementValueAsStringList(task, 'EV_STRING')
    expect(elementValues0).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])

    const elementValues1 = TaskUtils.getElementValueAsStringList(task, 'OTHER')
    expect(elementValues1).toStrictEqual([])
  })

  test('setElementValueAsString', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsString(task, 'EV_STRING', 'MY TEXT 2')

    const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
    expect(task.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsString(task, 'EV_STRING', undefined)

    expect(task.elementValues?.EV_STRING).toBeFalsy()
  })

  test('setElementValueAsStringList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsStringList(task, 'EV_STRING', ['MY TEXT 1', 'MY TEXT 2'])

    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(task.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsStringList(task, 'EV_STRING', undefined)

    expect(task.elementValues?.EV_STRING).toBeFalsy()
  })

  test('addElementValueAsString', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsString(task, 'EV_STRING', 'MY TEXT 2')

    const expectedElementValues2: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(task.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)

    TaskUtils.addElementValueAsString(task, 'EV_STRING', undefined)

    expect(task.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)
  })

  test('addElementValueAsStringList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsStringList(task, 'EV_STRING', ['MY TEXT', 'MY TEXT 2'])

    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(task.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsStringList(task, 'EV_STRING', [])
    expect(task.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsNumber', () => {
    const task = prepareTaskElementValues()

    const elementValue = TaskUtils.getElementValueAsNumber(task, 'EV_NUMBER')
    expect(elementValue).toStrictEqual(500)

    expect(() => {
      TaskUtils.getElementValueAsNumber(task, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsNumber', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.findElementValueAsNumber(task, 'EV_NUMBER')
    expect(elementValue1).toStrictEqual(500)

    const elementValue2 = TaskUtils.findElementValueAsNumber(task, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsNumberList', () => {
    const task = prepareTaskElementValues()

    const elementValues1 = TaskUtils.getElementValueAsNumberList(task, 'EV_NUMBER')
    expect(elementValues1).toStrictEqual([500, 600])

    const elementValues2 = TaskUtils.getElementValueAsNumberList(task, 'OTHER')
    expect(elementValues2).toStrictEqual([])
  })

  test('setElementValueAsNumber', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsNumber(task, 'EV_NUMBER', 1234)

    const expectedElementValues1: TaskElementValueNumber[] = [{ type: 'NUMBER', value: 1234 }]
    expect(task.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsString(task, 'EV_NUMBER', undefined)

    expect(task.elementValues?.EV_NUMBER).toBeFalsy()
  })

  test('setElementValueAsNumberList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsNumberList(task, 'EV_NUMBER', [1234, 5678])

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(task.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsString(task, 'EV_NUMBER', undefined)

    expect(task.elementValues?.EV_NUMBER).toBeFalsy()
  })

  test('addElementValueAsNumber', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsNumber(task, 'EV_NUMBER', 1234)

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
    ]
    expect(task.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsNumber(task, 'EV_NUMBER', undefined)

    expect(task.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsNumberList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsNumberList(task, 'EV_NUMBER', [1234, 5678])

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(task.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsNumberList(task, 'EV_NUMBER', undefined)

    expect(task.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsNumberList(task, 'EV_NUMBER', [])

    expect(task.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDate', () => {
    const task = prepareTaskElementValues()

    const elementValue = TaskUtils.getElementValueAsDate(task, 'EV_DATE')
    expect(elementValue).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      TaskUtils.getElementValueAsDate(task, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsDate', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.findElementValueAsDate(task, 'EV_DATE')
    expect(elementValue1).toStrictEqual(new Date('2000-01-01'))

    const elementValue2 = TaskUtils.findElementValueAsDate(task, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDateList', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.getElementValueAsDateList(task, 'EV_DATE')
    expect(elementValue1).toStrictEqual([new Date('2000-01-01'), new Date('1980-01-01')])

    const elementValue2 = TaskUtils.getElementValueAsDateList(task, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDate', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsDate(task, 'EV_DATE', new Date('3000-01-01'))
    const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: '3000-01-01' }]
    expect(task.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsDate(task, 'EV_DATE', undefined)
    expect(task.elementValues?.EV_DATE).toBeUndefined()
  })

  test('setElementValueAsDateList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsDateList(task, 'EV_DATE', [new Date('3000-01-01'), new Date('3020-01-01')])
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3020-01-01' },
    ]
    expect(task.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsDateList(task, 'EV_DATE', undefined)
    expect(task.elementValues?.EV_DATE).toBeUndefined()
  })

  test('addElementValueAsDate', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsDate(task, 'EV_DATE', new Date('3000-01-01'))
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
    ]
    expect(task.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsDate(task, 'EV_DATE', undefined)
    expect(task.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDateList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsDateList(task, 'EV_DATE', [new Date('3000-01-01'), new Date('3030-01-01')])
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3030-01-01' },
    ]
    expect(task.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsDateList(task, 'EV_DATE', undefined)
    expect(task.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsDateList(task, 'EV_DATE', [])
    expect(task.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsObject', () => {
    const task = prepareTaskElementValues()

    const elementValue = TaskUtils.getElementValueAsObject(task, 'EV_OBJECT')
    expect(elementValue).toStrictEqual({ key: 'value 1' })

    expect(() => {
      TaskUtils.getElementValueAsObject(task, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsObject', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.findElementValueAsObject(task, 'EV_OBJECT')
    expect(elementValue1).toStrictEqual({ key: 'value 1' })

    const elementValue2 = TaskUtils.findElementValueAsObject(task, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsObjectList', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.getElementValueAsObjectList(task, 'EV_OBJECT')
    expect(elementValue1).toStrictEqual([{ key: 'value 1' }, { key: 'value 2' }])

    const elementValue2 = TaskUtils.getElementValueAsObjectList(task, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsObject', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsObject(task, 'EV_OBJECT', { key: 'value 3' })
    const expectedElementValues1: TaskElementValueObject[] = [{ type: 'OBJECT', value: { key: 'value 3' } }]
    expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsObject(task, 'EV_OBJECT', undefined)
    expect(task.elementValues?.EV_OBJECT).toBeUndefined()
  })

  test('setElementValueAsObjectList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsObjectList(task, 'EV_OBJECT', [{ key: 'value 3' }, { key: 'value 4' }])
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 3' } },
      { type: 'OBJECT', value: { key: 'value 4' } },
    ]
    expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsObjectList(task, 'EV_OBJECT', [])
    expect(task.elementValues?.EV_OBJECT).toBeUndefined()
  })

  test('addElementValueAsObject', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsObject(task, 'EV_OBJECT', { key: 'value 3' })
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
      { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
      { type: 'OBJECT', value: { key: 'value 3' } },
    ]
    expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsObject(task, 'EV_OBJECT', undefined)
    expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsObjectList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsObjectList(task, 'EV_OBJECT', [{ key: 'value 3' }, { key: 'value 4' }])
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
      { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
      { type: 'OBJECT', value: { key: 'value 3' } },
      { type: 'OBJECT', value: { key: 'value 4' } },
    ]
    expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsObjectList(task, 'EV_OBJECT', undefined)
    expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsObjectList(task, 'EV_OBJECT', [])
    expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDocument', () => {
    const task = prepareTaskElementValues()

    const elementValue = TaskUtils.getElementValueAsDocument(task, 'EV_DOCUMENT')
    expect(elementValue).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

    expect(() => {
      TaskUtils.getElementValueAsDocument(task, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsDocument', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.findElementValueAsDocument(task, 'EV_DOCUMENT')
    expect(elementValue1).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

    const elementValue2 = TaskUtils.findElementValueAsDocument(task, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDocumentList', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.getElementValueAsDocumentList(task, 'EV_DOCUMENT')
    expect(elementValue1).toStrictEqual([
      prepareTaskElementValueDocumentItem('1'),
      prepareTaskElementValueDocumentItem('2'),
    ])

    const elementValue2 = TaskUtils.getElementValueAsDocumentList(task, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDocument', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsDocument(task, 'EV_DOCUMENT', prepareTaskElementValueDocumentItem('3'))
    const expectedElementValues1: TaskElementValueDocument[] = [
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('3'),
      },
    ]
    expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsDocument(task, 'EV_DOCUMENT', undefined)
    expect(task.elementValues?.EV_DOCUMENT).toBeUndefined()
  })

  test('setElementValueAsDocumentList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsDocumentList(task, 'EV_DOCUMENT', [
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
    expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsDocumentList(task, 'EV_DOCUMENT', undefined)
    expect(task.elementValues?.EV_DOCUMENT).toBeUndefined()
  })

  test('addElementValueAsDocument', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsDocument(task, 'EV_DOCUMENT', prepareTaskElementValueDocumentItem('3'))
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
    expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsDocument(task, 'EV_DOCUMENT', undefined)
    expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDocumentList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsDocumentList(task, 'EV_DOCUMENT', [
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
    expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsDocumentList(task, 'EV_DOCUMENT', undefined)
    expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsDocumentList(task, 'EV_DOCUMENT', [])
    expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsPrincipal', () => {
    const task = prepareTaskElementValues()

    const elementValue = TaskUtils.getElementValueAsPrincipal(task, 'EV_PRINCIPAL')
    expect(elementValue).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

    expect(() => {
      TaskUtils.getElementValueAsPrincipal(task, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsPrincipal', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.findElementValueAsPrincipal(task, 'EV_PRINCIPAL')
    expect(elementValue1).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

    const elementValue2 = TaskUtils.findElementValueAsPrincipal(task, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsPrincipalList', () => {
    const task = prepareTaskElementValues()

    const elementValue1 = TaskUtils.getElementValueAsPrincipalList(task, 'EV_PRINCIPAL')
    expect(elementValue1).toStrictEqual([
      prepareTaskElementValuePrincipalItem('1'),
      prepareTaskElementValuePrincipalItem('2'),
    ])

    const elementValue2 = TaskUtils.getElementValueAsPrincipalList(task, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsPrincipal', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsPrincipal(task, 'EV_PRINCIPAL', prepareTaskElementValuePrincipalItem('3'))
    const expectedElementValues1: TaskElementValuePrincipal[] = [
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('3'),
      },
    ]
    expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsPrincipal(task, 'EV_PRINCIPAL', undefined)
    expect(task.elementValues?.EV_PRINCIPAL).toBeUndefined()
  })

  test('setElementValueAsPrincipalList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.setElementValueAsPrincipalList(task, 'EV_PRINCIPAL', [
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
    expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskUtils.setElementValueAsPrincipalList(task, 'EV_PRINCIPAL', undefined)
    expect(task.elementValues?.EV_PRINCIPAL).toBeUndefined()
  })

  test('addElementValueAsPrincipal', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsPrincipal(task, 'EV_PRINCIPAL', prepareTaskElementValuePrincipalItem('3'))
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
    expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsPrincipal(task, 'EV_PRINCIPAL', undefined)
    expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsPrincipalList', () => {
    const task = prepareTaskElementValues()

    TaskUtils.addElementValueAsPrincipalList(task, 'EV_PRINCIPAL', [
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
    expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsPrincipalList(task, 'EV_PRINCIPAL', undefined)
    expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

    TaskUtils.addElementValueAsPrincipalList(task, 'EV_PRINCIPAL', [])
    expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)
  })

  test('getJsonFormsPropertyAsString', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.getJsonFormsPropertyAsString(task, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = JsonFormsUtils.getJsonFormsPropertyAsString(task, 'key2.key2_key1.0.key2_key1_key2')
    expect(value2).toStrictEqual('value_key2_key1_key2')

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsString(task, 'key2.key2_key1.0.unknown')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsString(task, 'key2.key2_key1.10')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsString(task, 'key2.key2_key1.100.key2_key1_key2')
    }).toThrow("Property value doesn't exist")
  })

  test('findJsonFormsPropertyAsString', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.findJsonFormsPropertyAsString(task, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = JsonFormsUtils.findJsonFormsPropertyAsString(task, 'key2.key2_key1.0.key2_key1_key2')
    expect(value2).toStrictEqual('value_key2_key1_key2')

    const value3 = JsonFormsUtils.findJsonFormsPropertyAsString(task, 'key2.key2_key1.0.unknown')
    expect(value3).toBeUndefined()

    const value4 = JsonFormsUtils.findJsonFormsPropertyAsString(task, 'key2.key2_key1.10')
    expect(value4).toBeUndefined()

    const value5 = JsonFormsUtils.findJsonFormsPropertyAsString(task, 'key2.key2_key1.100.key2_key1_key2')
    expect(value5).toBeUndefined()
  })

  test('getJsonFormsPropertyAsNumber', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.getJsonFormsPropertyAsNumber(task, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = JsonFormsUtils.getJsonFormsPropertyAsNumber(task, 'key3.1')
    expect(value2).toStrictEqual(1000)

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsNumber(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsNumber(task, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('findJsonFormsPropertyAsNumber', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.findJsonFormsPropertyAsNumber(task, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = JsonFormsUtils.findJsonFormsPropertyAsNumber(task, 'key3.1')
    expect(value2).toStrictEqual(1000)

    const value3 = JsonFormsUtils.findJsonFormsPropertyAsNumber(task, 'key_xxxxxxx')
    expect(value3).toBeUndefined()

    expect(() => {
      JsonFormsUtils.findJsonFormsPropertyAsNumber(task, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('getJsonFormsPropertyAsBoolean', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.getJsonFormsPropertyAsBoolean(task, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = JsonFormsUtils.getJsonFormsPropertyAsBoolean(task, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = JsonFormsUtils.getJsonFormsPropertyAsBoolean(task, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = JsonFormsUtils.getJsonFormsPropertyAsBoolean(task, 'key4.3')
    expect(value4).toStrictEqual(false)

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsBoolean(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsBoolean(task, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('findJsonFormsPropertyAsBoolean', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.findJsonFormsPropertyAsBoolean(task, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = JsonFormsUtils.findJsonFormsPropertyAsBoolean(task, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = JsonFormsUtils.findJsonFormsPropertyAsBoolean(task, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = JsonFormsUtils.findJsonFormsPropertyAsBoolean(task, 'key4.3')
    expect(value4).toStrictEqual(false)

    const value5 = JsonFormsUtils.findJsonFormsPropertyAsBoolean(task, 'key_xxxxxxx')
    expect(value5).toBeUndefined()

    expect(() => {
      JsonFormsUtils.findJsonFormsPropertyAsBoolean(task, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('getJsonFormsPropertyAsDate', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.getJsonFormsPropertyAsDate(task, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsDate(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsDate(task, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('findJsonFormsPropertyAsDate', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.findJsonFormsPropertyAsDate(task, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    const value2 = JsonFormsUtils.findJsonFormsPropertyAsDate(task, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      JsonFormsUtils.findJsonFormsPropertyAsDate(task, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('getJsonFormsPropertyAsJsonFormsFile', () => {
    const task = prepareTaskJsonFormsValue()

    const value = JsonFormsUtils.getJsonFormsPropertyAsJsonFormsFile(task, 'key6')
    expect(value).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsJsonFormsFile(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsJsonFormsFile(task, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('findJsonFormsPropertyAsJsonFormsFile', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.findJsonFormsPropertyAsJsonFormsFile(task, 'key6')
    expect(value1).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    const value2 = JsonFormsUtils.findJsonFormsPropertyAsJsonFormsFile(task, 'key_xxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      JsonFormsUtils.findJsonFormsPropertyAsJsonFormsFile(task, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('getJsonFormsPropertyAsJsonFormsPrincipal', () => {
    const task = prepareTaskJsonFormsValue()

    const value = JsonFormsUtils.getJsonFormsPropertyAsJsonFormsPrincipal(task, 'key7')
    expect(value).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsJsonFormsPrincipal(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsJsonFormsPrincipal(task, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('findJsonFormsPropertyAsJsonFormsPrincipal', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.findJsonFormsPropertyAsJsonFormsPrincipal(task, 'key7')
    expect(value1).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    const value2 = JsonFormsUtils.findJsonFormsPropertyAsJsonFormsPrincipal(task, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      JsonFormsUtils.findJsonFormsPropertyAsJsonFormsPrincipal(task, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('getJsonFormsPropertyAsArray', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.getJsonFormsPropertyAsArray(task, 'key3')
    expect(value1).toStrictEqual([500, '1000'])

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsArray(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsArray(task, 'key1')
    }).toThrow('Property key1 is not an array')
  })

  test('getJsonFormsPropertyAsObject', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.getJsonFormsPropertyAsObject(task, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsObject(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      JsonFormsUtils.getJsonFormsPropertyAsObject(task, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('findJsonFormsPropertyAsObject', () => {
    const task = prepareTaskJsonFormsValue()

    const value1 = JsonFormsUtils.findJsonFormsPropertyAsObject(task, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    const value2 = JsonFormsUtils.findJsonFormsPropertyAsObject(task, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      JsonFormsUtils.findJsonFormsPropertyAsObject(task, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('updateJsonFormsProperty', () => {
    const task = prepareTaskJsonFormsValue()
    task.jsonFormsValue = {}

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

    JsonFormsUtils.updateJsonFormsProperty(task, 'key1', 'text')
    JsonFormsUtils.updateJsonFormsProperty(task, 'key2.0.key1', true)
    JsonFormsUtils.updateJsonFormsProperty(task, 'key2.0.key2', new Date('2020-01-01'))
    JsonFormsUtils.updateJsonFormsProperty(task, 'key2.1.key1', false)
    JsonFormsUtils.updateJsonFormsProperty(task, 'key2.1.key2', new Date('3030-01-01'))
    JsonFormsUtils.updateJsonFormsProperty(task, 'key3', 100)
    JsonFormsUtils.updateJsonFormsProperty(task, 'key4', file)
    JsonFormsUtils.updateJsonFormsProperty(task, 'key5', principal)

    expect(task.jsonFormsValue.data).toStrictEqual({
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

    JsonFormsUtils.updateJsonFormsProperty(task, 'key1', undefined)
    JsonFormsUtils.updateJsonFormsProperty(task, 'key2.0', undefined)
    JsonFormsUtils.updateJsonFormsProperty(task, 'key2.0.key1', undefined)

    expect(task.jsonFormsValue.data).toStrictEqual({
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
      JsonFormsUtils.updateJsonFormsProperty(task, 'key2.100.key1', undefined)
    }).toThrow("Property key2.100.key1 doesn't exist")
  })
})

function prepareTaskElementValues(): Task {
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

function prepareTaskJsonFormsValue(): Task {
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
