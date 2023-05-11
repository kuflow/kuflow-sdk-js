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
  addElementValueAsDate,
  addElementValueAsDateList,
  addElementValueAsDocument,
  addElementValueAsDocumentList,
  addElementValueAsNumber,
  addElementValueAsNumberList,
  addElementValueAsObject,
  addElementValueAsObjectList,
  addElementValueAsPrincipal,
  addElementValueAsPrincipalList,
  addElementValueAsString,
  addElementValueAsStringList,
  findElementValueAsDate,
  findElementValueAsDocument,
  findElementValueAsNumber,
  findElementValueAsObject,
  findElementValueAsPrincipal,
  findElementValueAsString,
  getElementValueAsDate,
  getElementValueAsDateList,
  getElementValueAsDocument,
  getElementValueAsDocumentList,
  getElementValueAsNumber,
  getElementValueAsNumberList,
  getElementValueAsObject,
  getElementValueAsObjectList,
  getElementValueAsPrincipal,
  getElementValueAsPrincipalList,
  getElementValueAsString,
  getElementValueAsStringList,
  getElementValueValid,
  getElementValueValidAt,
  type Process,
  type ProcessElementValueNumber,
  type ProcessElementValueString,
  setElementValueAsDate,
  setElementValueAsDateList,
  setElementValueAsDocument,
  setElementValueAsDocumentList,
  setElementValueAsNumber,
  setElementValueAsNumberList,
  setElementValueAsObject,
  setElementValueAsObjectList,
  setElementValueAsPrincipal,
  setElementValueAsPrincipalList,
  setElementValueAsString,
  setElementValueAsStringList,
  setElementValueValid,
  setElementValueValidAt,
  type Task,
  type TaskElementValueDocument,
  type TaskElementValueDocumentItem,
  type TaskElementValueNumber,
  type TaskElementValueObject,
  type TaskElementValuePrincipal,
  type TaskElementValuePrincipalItem,
  type TaskElementValueString,
  type TaskSaveElementCommand,
} from '@kuflow/kuflow-rest'

describe('Element Values Utils', () => {
  describe('Element Values Record', () => {
    test('getElementValueValid', () => {
      const process = prepareProcess()

      const elementValueValid = getElementValueValid(process, 'EV_STRING')

      expect(elementValueValid).toBeFalsy()
    })

    test('getElementValueValidAt', () => {
      const process = prepareProcess()

      const elementValueValid0 = getElementValueValidAt(process, 'EV_STRING', 0)
      expect(elementValueValid0).not.toBeUndefined()
      expect(elementValueValid0).toBeTruthy()

      const elementValueValid1 = getElementValueValidAt(process, 'EV_STRING', 1)
      expect(elementValueValid1).not.toBeUndefined()
      expect(elementValueValid1).toBeFalsy()
    })

    test('setElementValueValid', () => {
      const process = prepareProcess()

      setElementValueValid(process, 'EV_STRING', true)

      expect(process.elementValues?.EV_STRING).toStrictEqual([
          { type: 'STRING', value: 'MY TEXT 1', valid: true },
          { type: 'STRING', value: 'MY TEXT 2', valid: true },
        ])

      setElementValueValid(process, 'EV_STRING', false)

      expect(process.elementValues?.EV_STRING).toStrictEqual([
          { type: 'STRING', value: 'MY TEXT 1', valid: false },
          { type: 'STRING', value: 'MY TEXT 2', valid: false },
        ])
    })

    test('setElementValueValidAt', () => {
      const process = prepareProcess()

      setElementValueValidAt(process, 'EV_STRING', false, 0)
      setElementValueValidAt(process, 'EV_STRING', true, 1)

      expect(process.elementValues?.EV_STRING).toStrictEqual([
          { type: 'STRING', value: 'MY TEXT 1', valid: false },
          { type: 'STRING', value: 'MY TEXT 2', valid: true },
        ])
    })

    test('getElementValueAsString', () => {
      const process = prepareProcess()

      const elementValue = getElementValueAsString(process, 'EV_STRING')
      expect(elementValue).toStrictEqual('MY TEXT 1')

      expect(() => {
        getElementValueAsString(process, 'OTHER')
      }).toThrow('value is required!')
    })

    test('findElementValueAsString', () => {
      const process = prepareProcess()

      const elementValue0 = findElementValueAsString(process, 'EV_STRING')
      expect(elementValue0).toStrictEqual('MY TEXT 1')

      const elementValue1 = findElementValueAsString(process, 'OTHER')
      expect(elementValue1).toBeUndefined()
    })

    test('getElementValueAsStringList', () => {
      const process = prepareProcess()

      const elementValues0 = getElementValueAsStringList(process, 'EV_STRING')
      expect(elementValues0).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])

      const elementValues1 = getElementValueAsStringList(process, 'OTHER')
      expect(elementValues1).toStrictEqual([])
    })

    test('setElementValueAsString', () => {
      const process = prepareProcess()

      setElementValueAsString(process, 'EV_STRING', 'MY TEXT 2')

      const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
      expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

      setElementValueAsString(process, 'EV_STRING', undefined)

      expect(process.elementValues?.EV_STRING).toBeFalsy()
    })

    test('setElementValueAsStringList', () => {
      const process = prepareProcess()

      setElementValueAsStringList(process, 'EV_STRING', ['MY TEXT 1', 'MY TEXT 2'])

      const expectedElementValues1: ProcessElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT 1' },
        { type: 'STRING', value: 'MY TEXT 2' },
      ]
      expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

      setElementValueAsStringList(process, 'EV_STRING', undefined)

      expect(process.elementValues?.EV_STRING).toBeFalsy()
    })

    test('addElementValueAsString', () => {
      const process = prepareProcess()

      addElementValueAsString(process, 'EV_STRING', 'MY TEXT 2')

      const expectedElementValues2: ProcessElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT 1', valid: true },
        { type: 'STRING', value: 'MY TEXT 2', valid: false },
        { type: 'STRING', value: 'MY TEXT 2' },
      ]
      expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)

      addElementValueAsString(process, 'EV_STRING', undefined)

      expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)
    })

    test('addElementValueAsStringList', () => {
      const process = prepareProcess()

      addElementValueAsStringList(process, 'EV_STRING', ['MY TEXT', 'MY TEXT 2'])

      const expectedElementValues1: ProcessElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT 1', valid: true },
        { type: 'STRING', value: 'MY TEXT 2', valid: false },
        { type: 'STRING', value: 'MY TEXT' },
        { type: 'STRING', value: 'MY TEXT 2' },
      ]
      expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

      addElementValueAsStringList(process, 'EV_STRING', [])
      expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsNumber', () => {
      const process = prepareProcess()

      const elementValue = getElementValueAsNumber(process, 'EV_NUMBER')
      expect(elementValue).toStrictEqual(500)

      expect(() => {
        getElementValueAsNumber(process, 'OTHER')
      }).toThrow('value is required!')
    })

    test('findElementValueAsNumber', () => {
      const process = prepareProcess()

      const elementValue1 = findElementValueAsNumber(process, 'EV_NUMBER')
      expect(elementValue1).toStrictEqual(500)

      const elementValue2 = findElementValueAsNumber(process, 'OTHER')
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsNumberList', () => {
      const process = prepareProcess()

      const elementValues1 = getElementValueAsNumberList(process, 'EV_NUMBER')
      expect(elementValues1).toStrictEqual([500, 600])

      const elementValues2 = getElementValueAsNumberList(process, 'OTHER')
      expect(elementValues2).toStrictEqual([])
    })

    test('setElementValueAsNumber', () => {
      const process = prepareProcess()

      setElementValueAsNumber(process, 'EV_NUMBER', 1234)

      const expectedElementValues1: ProcessElementValueNumber[] = [{ type: 'NUMBER', value: 1234 }]
      expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

      setElementValueAsString(process, 'EV_NUMBER', undefined)

      expect(process.elementValues?.EV_NUMBER).toBeFalsy()
    })

    test('setElementValueAsNumberList', () => {
      const process = prepareProcess()

      setElementValueAsNumberList(process, 'EV_NUMBER', [1234, 5678])

      const expectedElementValues1: ProcessElementValueNumber[] = [
        { type: 'NUMBER', value: 1234 },
        { type: 'NUMBER', value: 5678 },
      ]
      expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

      setElementValueAsString(process, 'EV_NUMBER', undefined)

      expect(process.elementValues?.EV_NUMBER).toBeFalsy()
    })

    test('addElementValueAsNumber', () => {
      const process = prepareProcess()

      addElementValueAsNumber(process, 'EV_NUMBER', 1234)

      const expectedElementValues1: ProcessElementValueNumber[] = [
        { type: 'NUMBER', value: 500, valid: true },
        { type: 'NUMBER', value: 600, valid: false },
        { type: 'NUMBER', value: 1234 },
      ]
      expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

      addElementValueAsNumber(process, 'EV_NUMBER', undefined)

      expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsNumberList', () => {
      const process = prepareProcess()

      addElementValueAsNumberList(process, 'EV_NUMBER', [1234, 5678])

      const expectedElementValues1: ProcessElementValueNumber[] = [
        { type: 'NUMBER', value: 500, valid: true },
        { type: 'NUMBER', value: 600, valid: false },
        { type: 'NUMBER', value: 1234 },
        { type: 'NUMBER', value: 5678 },
      ]
      expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

      addElementValueAsNumberList(process, 'EV_NUMBER', undefined)

      expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

      addElementValueAsNumberList(process, 'EV_NUMBER', [])

      expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsDate', () => {
      const process = prepareProcess()

      const elementValue = getElementValueAsDate(process, 'EV_DATE')
      expect(elementValue).toStrictEqual(new Date('2000-01-01'))

      expect(() => {
        getElementValueAsDate(process, 'OTHER')
      }).toThrow('value is required!')
    })

    test('findElementValueAsDate', () => {
      const process = prepareProcess()

      const elementValue1 = findElementValueAsDate(process, 'EV_DATE')
      expect(elementValue1).toStrictEqual(new Date('2000-01-01'))

      const elementValue2 = findElementValueAsDate(process, 'OTHER')
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsDateList', () => {
      const process = prepareProcess()

      const elementValue1 = getElementValueAsDateList(process, 'EV_DATE')
      expect(elementValue1).toStrictEqual([new Date('2000-01-01'), new Date('1980-01-01')])

      const elementValue2 = getElementValueAsDateList(process, 'OTHER')
      expect(elementValue2).toStrictEqual([])
    })

    test('setElementValueAsDate', () => {
      const process = prepareProcess()

      setElementValueAsDate(process, 'EV_DATE', new Date('3000-01-01'))
      const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: '3000-01-01' }]
      expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

      setElementValueAsDate(process, 'EV_DATE', undefined)
      expect(process.elementValues?.EV_DATE).toBeUndefined()
    })

    test('setElementValueAsDateList', () => {
      const process = prepareProcess()

      setElementValueAsDateList(process, 'EV_DATE', [new Date('3000-01-01'), new Date('3020-01-01')])
      const expectedElementValues1: ProcessElementValueString[] = [
        { type: 'STRING', value: '3000-01-01' },
        { type: 'STRING', value: '3020-01-01' },
      ]
      expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

      setElementValueAsDateList(process, 'EV_DATE', undefined)
      expect(process.elementValues?.EV_DATE).toBeUndefined()
    })

    test('addElementValueAsDate', () => {
      const process = prepareProcess()

      addElementValueAsDate(process, 'EV_DATE', new Date('3000-01-01'))
      const expectedElementValues1: ProcessElementValueString[] = [
        { type: 'STRING', value: '2000-01-01', valid: true },
        { type: 'STRING', value: '1980-01-01', valid: false },
        { type: 'STRING', value: '3000-01-01' },
      ]
      expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

      addElementValueAsDate(process, 'EV_DATE', undefined)
      expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsDateList', () => {
      const process = prepareProcess()

      addElementValueAsDateList(process, 'EV_DATE', [new Date('3000-01-01'), new Date('3030-01-01')])
      const expectedElementValues1: ProcessElementValueString[] = [
        { type: 'STRING', value: '2000-01-01', valid: true },
        { type: 'STRING', value: '1980-01-01', valid: false },
        { type: 'STRING', value: '3000-01-01' },
        { type: 'STRING', value: '3030-01-01' },
      ]
      expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

      addElementValueAsDateList(process, 'EV_DATE', undefined)
      expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

      addElementValueAsDateList(process, 'EV_DATE', [])
      expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsObject', () => {
      const task = prepareTask()

      const elementValue = getElementValueAsObject(task, 'EV_OBJECT')
      expect(elementValue).toStrictEqual({ key: 'value 1' })

      expect(() => {
        getElementValueAsObject(task, 'OTHER')
      }).toThrow('value is required!')
    })

    test('findElementValueAsObject', () => {
      const task = prepareTask()

      const elementValue1 = findElementValueAsObject(task, 'EV_OBJECT')
      expect(elementValue1).toStrictEqual({ key: 'value 1' })

      const elementValue2 = findElementValueAsObject(task, 'OTHER')
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsObjectList', () => {
      const task = prepareTask()

      const elementValue1 = getElementValueAsObjectList(task, 'EV_OBJECT')
      expect(elementValue1).toStrictEqual([{ key: 'value 1' }, { key: 'value 2' }])

      const elementValue2 = getElementValueAsObjectList(task, 'OTHER')
      expect(elementValue2).toStrictEqual([])
    })

    test('setElementValueAsObject', () => {
      const task = prepareTask()

      setElementValueAsObject(task, 'EV_OBJECT', { key: 'value 3' })
      const expectedElementValues1: TaskElementValueObject[] = [{ type: 'OBJECT', value: { key: 'value 3' } }]
      expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

      setElementValueAsObject(task, 'EV_OBJECT', undefined)
      expect(task.elementValues?.EV_OBJECT).toBeUndefined()
    })

    test('setElementValueAsObjectList', () => {
      const task = prepareTask()

      setElementValueAsObjectList(task, 'EV_OBJECT', [{ key: 'value 3' }, { key: 'value 4' }])
      const expectedElementValues1: TaskElementValueObject[] = [
        { type: 'OBJECT', value: { key: 'value 3' } },
        { type: 'OBJECT', value: { key: 'value 4' } },
      ]
      expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

      setElementValueAsObjectList(task, 'EV_OBJECT', [])
      expect(task.elementValues?.EV_OBJECT).toBeUndefined()
    })

    test('addElementValueAsObject', () => {
      const task = prepareTask()

      addElementValueAsObject(task, 'EV_OBJECT', { key: 'value 3' })
      const expectedElementValues1: TaskElementValueObject[] = [
        { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
        { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
        { type: 'OBJECT', value: { key: 'value 3' } },
      ]
      expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

      addElementValueAsObject(task, 'EV_OBJECT', undefined)
      expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsObjectList', () => {
      const task = prepareTask()

      addElementValueAsObjectList(task, 'EV_OBJECT', [{ key: 'value 3' }, { key: 'value 4' }])
      const expectedElementValues1: TaskElementValueObject[] = [
        { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
        { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
        { type: 'OBJECT', value: { key: 'value 3' } },
        { type: 'OBJECT', value: { key: 'value 4' } },
      ]
      expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

      addElementValueAsObjectList(task, 'EV_OBJECT', undefined)
      expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)

      addElementValueAsObjectList(task, 'EV_OBJECT', [])
      expect(task.elementValues?.EV_OBJECT).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsDocument', () => {
      const task = prepareTask()

      const elementValue = getElementValueAsDocument(task, 'EV_DOCUMENT')
      expect(elementValue).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

      expect(() => {
        getElementValueAsDocument(task, 'OTHER')
      }).toThrow('value is required!')
    })

    test('findElementValueAsDocument', () => {
      const task = prepareTask()

      const elementValue1 = findElementValueAsDocument(task, 'EV_DOCUMENT')
      expect(elementValue1).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

      const elementValue2 = findElementValueAsDocument(task, 'OTHER')
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsDocumentList', () => {
      const task = prepareTask()

      const elementValue1 = getElementValueAsDocumentList(task, 'EV_DOCUMENT')
      expect(elementValue1).toStrictEqual([
        prepareTaskElementValueDocumentItem('1'),
        prepareTaskElementValueDocumentItem('2'),
      ])

      const elementValue2 = getElementValueAsDocumentList(task, 'OTHER')
      expect(elementValue2).toStrictEqual([])
    })

    test('setElementValueAsDocument', () => {
      const task = prepareTask()

      setElementValueAsDocument(task, 'EV_DOCUMENT', prepareTaskElementValueDocumentItem('3'))
      const expectedElementValues1: TaskElementValueDocument[] = [
        {
          type: 'DOCUMENT',
          value: prepareTaskElementValueDocumentItem('3'),
        },
      ]
      expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

      setElementValueAsDocument(task, 'EV_DOCUMENT', undefined)
      expect(task.elementValues?.EV_DOCUMENT).toBeUndefined()
    })

    test('setElementValueAsDocumentList', () => {
      const task = prepareTask()

      setElementValueAsDocumentList(task, 'EV_DOCUMENT', [
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

      setElementValueAsDocumentList(task, 'EV_DOCUMENT', undefined)
      expect(task.elementValues?.EV_DOCUMENT).toBeUndefined()
    })

    test('addElementValueAsDocument', () => {
      const task = prepareTask()

      addElementValueAsDocument(task, 'EV_DOCUMENT', prepareTaskElementValueDocumentItem('3'))
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

      addElementValueAsDocument(task, 'EV_DOCUMENT', undefined)
      expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsDocumentList', () => {
      const task = prepareTask()

      addElementValueAsDocumentList(task, 'EV_DOCUMENT', [
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

      addElementValueAsDocumentList(task, 'EV_DOCUMENT', undefined)
      expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)

      addElementValueAsDocumentList(task, 'EV_DOCUMENT', [])
      expect(task.elementValues?.EV_DOCUMENT).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsPrincipal', () => {
      const task = prepareTask()

      const elementValue = getElementValueAsPrincipal(task, 'EV_PRINCIPAL')
      expect(elementValue).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

      expect(() => {
        getElementValueAsPrincipal(task, 'OTHER')
      }).toThrow('value is required!')
    })

    test('findElementValueAsPrincipal', () => {
      const task = prepareTask()

      const elementValue1 = findElementValueAsPrincipal(task, 'EV_PRINCIPAL')
      expect(elementValue1).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

      const elementValue2 = findElementValueAsPrincipal(task, 'OTHER')
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsPrincipalList', () => {
      const task = prepareTask()

      const elementValue1 = getElementValueAsPrincipalList(task, 'EV_PRINCIPAL')
      expect(elementValue1).toStrictEqual([
        prepareTaskElementValuePrincipalItem('1'),
        prepareTaskElementValuePrincipalItem('2'),
      ])

      const elementValue2 = getElementValueAsPrincipalList(task, 'OTHER')
      expect(elementValue2).toStrictEqual([])
    })

    test('setElementValueAsPrincipal', () => {
      const task = prepareTask()

      setElementValueAsPrincipal(task, 'EV_PRINCIPAL', prepareTaskElementValuePrincipalItem('3'))
      const expectedElementValues1: TaskElementValuePrincipal[] = [
        {
          type: 'PRINCIPAL',
          value: prepareTaskElementValuePrincipalItem('3'),
        },
      ]
      expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

      setElementValueAsPrincipal(task, 'EV_PRINCIPAL', undefined)
      expect(task.elementValues?.EV_PRINCIPAL).toBeUndefined()
    })

    test('setElementValueAsPrincipalList', () => {
      const task = prepareTask()

      setElementValueAsPrincipalList(task, 'EV_PRINCIPAL', [
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

      setElementValueAsPrincipalList(task, 'EV_PRINCIPAL', undefined)
      expect(task.elementValues?.EV_PRINCIPAL).toBeUndefined()
    })

    test('addElementValueAsPrincipal', () => {
      const task = prepareTask()

      addElementValueAsPrincipal(task, 'EV_PRINCIPAL', prepareTaskElementValuePrincipalItem('3'))
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

      addElementValueAsPrincipal(task, 'EV_PRINCIPAL', undefined)
      expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsPrincipalList', () => {
      const task = prepareTask()

      addElementValueAsPrincipalList(task, 'EV_PRINCIPAL', [
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

      addElementValueAsPrincipalList(task, 'EV_PRINCIPAL', undefined)
      expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)

      addElementValueAsPrincipalList(task, 'EV_PRINCIPAL', [])
      expect(task.elementValues?.EV_PRINCIPAL).toStrictEqual(expectedElementValues1)
    })
  })

  describe('Element Values Arrays', () => {
    test('getElementValueValid', () => {
      const command = prepareTaskSaveElementCommandString()

      const elementValueValid = getElementValueValid(command)

      expect(elementValueValid).toBeFalsy()
    })

    test('getElementValueValidAt', () => {
      const command = prepareTaskSaveElementCommandString()

      const elementValueValid0 = getElementValueValidAt(command, 0)
      expect(elementValueValid0).not.toBeUndefined()
      expect(elementValueValid0).toBeTruthy()

      const elementValueValid1 = getElementValueValidAt(command, 1)
      expect(elementValueValid1).not.toBeUndefined()
      expect(elementValueValid1).toBeFalsy()
    })

    test('setElementValueValid', () => {
      const command = prepareTaskSaveElementCommandString()

      setElementValueValid(command, true)

      expect(command.elementValues).toStrictEqual([
        { type: 'STRING', value: 'MY TEXT 1', valid: true },
        { type: 'STRING', value: 'MY TEXT 2', valid: true },
      ])

      setElementValueValid(command, false)

      expect(command.elementValues).toStrictEqual([
        { type: 'STRING', value: 'MY TEXT 1', valid: false },
        { type: 'STRING', value: 'MY TEXT 2', valid: false },
      ])
    })

    test('setElementValueValidAt', () => {
      const command = prepareTaskSaveElementCommandString()

      setElementValueValidAt(command, false, 0)
      setElementValueValidAt(command, true, 1)

      expect(command.elementValues).toStrictEqual([
        { type: 'STRING', value: 'MY TEXT 1', valid: false },
        { type: 'STRING', value: 'MY TEXT 2', valid: true },
      ])
    })

    test('getElementValueAsString', () => {
      const command = prepareTaskSaveElementCommandString()

      const elementValue = getElementValueAsString(command)
      expect(elementValue).toStrictEqual('MY TEXT 1')

      command.elementValues = []

      expect(() => {
        getElementValueAsString(command)
      }).toThrow('value is required!')
    })

    test('findElementValueAsString', () => {
      const command = prepareTaskSaveElementCommandString()

      const elementValue0 = findElementValueAsString(command)
      expect(elementValue0).toStrictEqual('MY TEXT 1')

      command.elementValues = []

      const elementValue1 = findElementValueAsString(command)
      expect(elementValue1).toBeUndefined()
    })

    test('getElementValueAsStringList', () => {
      const command = prepareTaskSaveElementCommandString()

      const elementValues0 = getElementValueAsStringList(command)
      expect(elementValues0).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])

      command.elementValues = []

      const elementValues1 = getElementValueAsStringList(command)
      expect(elementValues1).toStrictEqual([])
    })

    test('setElementValueAsString', () => {
      const command = prepareTaskSaveElementCommandString()

      setElementValueAsString(command, 'MY TEXT 2')

      const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsString(command, undefined)

      expect(command.elementValues).toBeFalsy()
    })

    test('setElementValueAsStringList', () => {
      const command = prepareTaskSaveElementCommandString()

      setElementValueAsStringList(command, ['MY TEXT 1', 'MY TEXT 2'])

      const expectedElementValues1: TaskElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT 1' },
        { type: 'STRING', value: 'MY TEXT 2' },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsStringList(command, undefined)

      expect(command.elementValues).toBeFalsy()
    })

    test('addElementValueAsString', () => {
      const command = prepareTaskSaveElementCommandString()

      addElementValueAsString(command, 'MY TEXT')

      const expectedElementValues2: TaskElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT 1', valid: true },
        { type: 'STRING', value: 'MY TEXT 2', valid: false },
        { type: 'STRING', value: 'MY TEXT' },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues2)

      addElementValueAsString(command, undefined)

      expect(command.elementValues).toStrictEqual(expectedElementValues2)
    })

    test('addElementValueAsStringList', () => {
      const command = prepareTaskSaveElementCommandString()

      addElementValueAsStringList(command, ['MY TEXT 3', 'MY TEXT 4'])

      const expectedElementValues2: ProcessElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT 1', valid: true },
        { type: 'STRING', value: 'MY TEXT 2', valid: false },
        { type: 'STRING', value: 'MY TEXT 3' },
        { type: 'STRING', value: 'MY TEXT 4' },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues2)

      addElementValueAsStringList(command, [])
      expect(command.elementValues).toStrictEqual(expectedElementValues2)
    })

    test('getElementValueAsNumber', () => {
      const command = prepareTaskSaveElementCommandNumber()

      const elementValue = getElementValueAsNumber(command)
      expect(elementValue).toStrictEqual(500)

      command.elementValues = []

      expect(() => {
        getElementValueAsNumber(command)
      }).toThrow('value is required!')
    })

    test('findElementValueAsNumber', () => {
      const command = prepareTaskSaveElementCommandNumber()

      const elementValue1 = findElementValueAsNumber(command)
      expect(elementValue1).toStrictEqual(500)

      command.elementValues = []

      const elementValue2 = findElementValueAsNumber(command)
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsNumberList', () => {
      const command = prepareTaskSaveElementCommandNumber()

      const elementValues1 = getElementValueAsNumberList(command)
      expect(elementValues1).toStrictEqual([500, 600])

      command.elementValues = []

      const elementValues2 = getElementValueAsNumberList(command)
      expect(elementValues2).toStrictEqual([])
    })

    test('setElementValueAsNumber', () => {
      const command = prepareTaskSaveElementCommandNumber()

      setElementValueAsNumber(command, 1234)

      const expectedElementValues2: TaskElementValueNumber[] = [{ type: 'NUMBER', value: 1234 }]
      expect(command.elementValues).toStrictEqual(expectedElementValues2)

      setElementValueAsNumber(command, undefined)

      expect(command.elementValues).toBeFalsy()
    })

    test('setElementValueAsNumberList', () => {
      const command = prepareTaskSaveElementCommandNumber()

      setElementValueAsNumberList(command, [1234, 5678])

      const expectedElementValues1: TaskElementValueNumber[] = [
        { type: 'NUMBER', value: 1234 },
        { type: 'NUMBER', value: 5678 },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsNumberList(command, undefined)

      expect(command.elementValues).toBeFalsy()
    })

    test('addElementValueAsNumber', () => {
      const command = prepareTaskSaveElementCommandNumber()

      addElementValueAsNumber(command, 1234)

      const expectedElementValues1: TaskElementValueNumber[] = [
        { type: 'NUMBER', value: 500, valid: true },
        { type: 'NUMBER', value: 600, valid: false },
        { type: 'NUMBER', value: 1234 },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsNumber(command, undefined)

      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsNumberList', () => {
      const command = prepareTaskSaveElementCommandNumber()

      addElementValueAsNumberList(command, [1234, 5678])

      const expectedElementValues1: TaskElementValueNumber[] = [
        { type: 'NUMBER', value: 500, valid: true },
        { type: 'NUMBER', value: 600, valid: false },
        { type: 'NUMBER', value: 1234 },
        { type: 'NUMBER', value: 5678 },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsNumberList(command, undefined)

      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsNumberList(command, [])

      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsDate', () => {
      const command = prepareTaskSaveElementCommandDate()

      const elementValue = getElementValueAsDate(command)
      expect(elementValue).toStrictEqual(new Date('2000-01-01'))

      command.elementValues = []

      expect(() => {
        getElementValueAsDate(command)
      }).toThrow('value is required!')
    })

    test('findElementValueAsDate', () => {
      const command = prepareTaskSaveElementCommandDate()

      const elementValue1 = findElementValueAsDate(command)
      expect(elementValue1).toStrictEqual(new Date('2000-01-01'))

      command.elementValues = []

      const elementValue2 = findElementValueAsDate(command)
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsDateList', () => {
      const command = prepareTaskSaveElementCommandDate()

      const elementValue1 = getElementValueAsDateList(command)
      expect(elementValue1).toStrictEqual([new Date('2000-01-01'), new Date('1980-01-01')])

      command.elementValues = []

      const elementValue2 = getElementValueAsDateList(command)
      expect(elementValue2).toStrictEqual([])
    })

    test('setElementValueAsDate', () => {
      const command = prepareTaskSaveElementCommandDate()

      setElementValueAsDate(command, new Date('3000-01-01'))
      const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: '3000-01-01' }]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsDate(command, undefined)
      expect(command.elementValues).toBeUndefined()
    })

    test('setElementValueAsDateList', () => {
      const command = prepareTaskSaveElementCommandDate()

      setElementValueAsDateList(command, [new Date('3000-01-01'), new Date('3020-01-01')])
      const expectedElementValues1: TaskElementValueString[] = [
        { type: 'STRING', value: '3000-01-01' },
        { type: 'STRING', value: '3020-01-01' },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsDateList(command, undefined)
      expect(command.elementValues).toBeUndefined()
    })

    test('addElementValueAsDate', () => {
      const command = prepareTaskSaveElementCommandDate()

      addElementValueAsDate(command, new Date('3000-01-01'))
      const expectedElementValues1: TaskElementValueString[] = [
        { type: 'STRING', value: '2000-01-01', valid: true },
        { type: 'STRING', value: '1980-01-01', valid: false },
        { type: 'STRING', value: '3000-01-01' },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsDate(command, undefined)
      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsDateList', () => {
      const command = prepareTaskSaveElementCommandDate()

      addElementValueAsDateList(command, [new Date('3000-01-01'), new Date('3030-01-01')])
      const expectedElementValues1: TaskElementValueString[] = [
        { type: 'STRING', value: '2000-01-01', valid: true },
        { type: 'STRING', value: '1980-01-01', valid: false },
        { type: 'STRING', value: '3000-01-01' },
        { type: 'STRING', value: '3030-01-01' },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsDateList(command, undefined)
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsDateList(command, [])
      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsObject', () => {
      const command = prepareTaskSaveElementCommandObject()

      const elementValue = getElementValueAsObject(command)
      expect(elementValue).toStrictEqual({ key: 'value 1' })

      command.elementValues = []

      expect(() => {
        getElementValueAsObject(command)
      }).toThrow('value is required!')
    })

    test('findElementValueAsObject', () => {
      const command = prepareTaskSaveElementCommandObject()

      const elementValue1 = findElementValueAsObject(command)
      expect(elementValue1).toStrictEqual({ key: 'value 1' })

      command.elementValues = []

      const elementValue2 = findElementValueAsObject(command)
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsObjectList', () => {
      const command = prepareTaskSaveElementCommandObject()

      const elementValue1 = getElementValueAsObjectList(command)
      expect(elementValue1).toStrictEqual([{ key: 'value 1' }, { key: 'value 2' }])

      command.elementValues = []

      const elementValue2 = getElementValueAsObjectList(command)
      expect(elementValue2).toStrictEqual([])
    })

    test('setElementValueAsObject', () => {
      const command = prepareTaskSaveElementCommandObject()

      setElementValueAsObject(command, { key: 'value 3' })
      const expectedElementValues1: TaskElementValueObject[] = [{ type: 'OBJECT', value: { key: 'value 3' } }]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsObject(command, undefined)
      expect(command.elementValues).toBeUndefined()
    })

    test('setElementValueAsObjectList', () => {
      const command = prepareTaskSaveElementCommandObject()

      setElementValueAsObjectList(command, [{ key: 'value 3' }, { key: 'value 4' }])
      const expectedElementValues1: TaskElementValueObject[] = [
        { type: 'OBJECT', value: { key: 'value 3' } },
        { type: 'OBJECT', value: { key: 'value 4' } },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsObjectList(command, [])
      expect(command.elementValues).toBeUndefined()
    })

    test('addElementValueAsObject', () => {
      const command = prepareTaskSaveElementCommandObject()

      addElementValueAsObject(command, { key: 'value 3' })
      const expectedElementValues1: TaskElementValueObject[] = [
        { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
        { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
        { type: 'OBJECT', value: { key: 'value 3' } },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsObject(command, undefined)
      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsObjectList', () => {
      const command = prepareTaskSaveElementCommandObject()

      addElementValueAsObjectList(command, [{ key: 'value 3' }, { key: 'value 4' }])
      const expectedElementValues1: TaskElementValueObject[] = [
        { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
        { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
        { type: 'OBJECT', value: { key: 'value 3' } },
        { type: 'OBJECT', value: { key: 'value 4' } },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsObjectList(command, undefined)
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsObjectList(command, [])
      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsDocument', () => {
      const command = prepareTaskSaveElementCommandDocument()

      const elementValue = getElementValueAsDocument(command)
      expect(elementValue).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

      command.elementValues = []

      expect(() => {
        getElementValueAsDocument(command)
      }).toThrow('value is required!')
    })

    test('findElementValueAsDocument', () => {
      const command = prepareTaskSaveElementCommandDocument()

      const elementValue1 = findElementValueAsDocument(command)
      expect(elementValue1).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

      command.elementValues = []

      const elementValue2 = findElementValueAsDocument(command)
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsDocumentList', () => {
      const command = prepareTaskSaveElementCommandDocument()

      const elementValue1 = getElementValueAsDocumentList(command)
      expect(elementValue1).toStrictEqual([
        prepareTaskElementValueDocumentItem('1'),
        prepareTaskElementValueDocumentItem('2'),
      ])

      command.elementValues = []

      const elementValue2 = getElementValueAsDocumentList(command)
      expect(elementValue2).toStrictEqual([])
    })

    test('setElementValueAsDocument', () => {
      const command = prepareTaskSaveElementCommandDocument()

      setElementValueAsDocument(command, prepareTaskElementValueDocumentItem('3'))
      const expectedElementValues1: TaskElementValueDocument[] = [
        {
          type: 'DOCUMENT',
          value: prepareTaskElementValueDocumentItem('3'),
        },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsDocument(command, undefined)
      expect(command.elementValues).toBeUndefined()
    })

    test('setElementValueAsDocumentList', () => {
      const command = prepareTaskSaveElementCommandDocument()

      setElementValueAsDocumentList(command, [
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
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsDocumentList(command, undefined)
      expect(command.elementValues).toBeUndefined()
    })

    test('addElementValueAsDocument', () => {
      const command = prepareTaskSaveElementCommandDocument()

      addElementValueAsDocument(command, prepareTaskElementValueDocumentItem('3'))
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
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsDocument(command, undefined)
      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsDocumentList', () => {
      const command = prepareTaskSaveElementCommandDocument()

      addElementValueAsDocumentList(command, [
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
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsDocumentList(command, undefined)
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsDocumentList(command, [])
      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('getElementValueAsPrincipal', () => {
      const command = prepareTaskSaveElementCommandPrincipal()

      const elementValue = getElementValueAsPrincipal(command)
      expect(elementValue).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

      command.elementValues = []

      expect(() => {
        getElementValueAsPrincipal(command)
      }).toThrow('value is required!')
    })

    test('findElementValueAsPrincipal', () => {
      const command = prepareTaskSaveElementCommandPrincipal()

      const elementValue1 = findElementValueAsPrincipal(command)
      expect(elementValue1).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

      command.elementValues = []

      const elementValue2 = findElementValueAsPrincipal(command)
      expect(elementValue2).toBeUndefined()
    })

    test('getElementValueAsPrincipalList', () => {
      const command = prepareTaskSaveElementCommandPrincipal()

      const elementValue1 = getElementValueAsPrincipalList(command)
      expect(elementValue1).toStrictEqual([
        prepareTaskElementValuePrincipalItem('1'),
        prepareTaskElementValuePrincipalItem('2'),
      ])

      command.elementValues = []

      const elementValue2 = getElementValueAsPrincipalList(command)
      expect(elementValue2).toStrictEqual([])
    })

    test('setElementValueAsPrincipal', () => {
      const command = prepareTaskSaveElementCommandPrincipal()

      setElementValueAsPrincipal(command, prepareTaskElementValuePrincipalItem('3'))
      const expectedElementValues1: TaskElementValuePrincipal[] = [
        {
          type: 'PRINCIPAL',
          value: prepareTaskElementValuePrincipalItem('3'),
        },
      ]
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsPrincipal(command, undefined)
      expect(command.elementValues).toBeUndefined()
    })

    test('setElementValueAsPrincipalList', () => {
      const command = prepareTaskSaveElementCommandPrincipal()

      setElementValueAsPrincipalList(command, [
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
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      setElementValueAsPrincipalList(command, undefined)
      expect(command.elementValues).toBeUndefined()
    })

    test('addElementValueAsPrincipal', () => {
      const command = prepareTaskSaveElementCommandPrincipal()

      addElementValueAsPrincipal(command, prepareTaskElementValuePrincipalItem('3'))
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
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsPrincipal(command, undefined)
      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })

    test('addElementValueAsPrincipalList', () => {
      const command = prepareTaskSaveElementCommandPrincipal()

      addElementValueAsPrincipalList(command, [
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
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsPrincipalList(command, undefined)
      expect(command.elementValues).toStrictEqual(expectedElementValues1)

      addElementValueAsPrincipalList(command, [])
      expect(command.elementValues).toStrictEqual(expectedElementValues1)
    })
  })
})

function prepareProcess(): Process {
  return {
    objectType: 'PROCESS',
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

function prepareTaskSaveElementCommandString(): TaskSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
    ],
  }
}

function prepareTaskSaveElementCommandNumber(): TaskSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
    ],
  }
}

function prepareTaskSaveElementCommandDate(): TaskSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
    ],
  }
}

function prepareTaskSaveElementCommandObject(): TaskSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
      { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
      { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
    ],
  }
}

function prepareTaskSaveElementCommandDocument(): TaskSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
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
  }
}

function prepareTaskSaveElementCommandPrincipal(): TaskSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
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
  }
}


function prepareTask(): Task {
  return {
    objectType: 'TASK',
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

// describe('JsonForms Utils', () => {
//   test('findJsonFormsPropertyAsJsonFormsFile', () => {
//     const task: Task = {
//       objectType: 'TASK',
//       taskDefinition: {
//         id: 'e68d8136-1166-455c-93d6-d106201c1856',
//       },
//       processId: '3b755d5e-b64f-4ec2-a830-173f006bdf8e',
//       jsonFormsValue: {
//         data: {
//           file: 'fichero',
//         },
//       },
//     }
//
//     // const value = findJsonFormsPropertyAsJsonFormsFile(task, 'file')
//   })
// })
