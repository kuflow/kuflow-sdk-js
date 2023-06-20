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
  type TaskElementValueDocument,
  type TaskElementValueDocumentItem,
  type TaskElementValueNumber,
  type TaskElementValueObject,
  type TaskElementValuePrincipal,
  type TaskElementValuePrincipalItem,
  type TaskElementValueString,
  type TaskSaveElementCommand,
  TaskSaveElementCommandUtils,
} from '@kuflow/kuflow-rest'

describe('Task Save Element Command Utils', () => {
  test('getElementValueValid', () => {
    const command = prepareTaskSaveElementCommandString()

    const elementValueValid = TaskSaveElementCommandUtils.getElementValueValid(command)

    expect(elementValueValid).toBeFalsy()
  })

  test('getElementValueValidAt', () => {
    const command = prepareTaskSaveElementCommandString()

    const elementValueValid0 = TaskSaveElementCommandUtils.getElementValueValidAt(command, 0)
    expect(elementValueValid0).not.toBeUndefined()
    expect(elementValueValid0).toBeTruthy()

    const elementValueValid1 = TaskSaveElementCommandUtils.getElementValueValidAt(command, 1)
    expect(elementValueValid1).not.toBeUndefined()
    expect(elementValueValid1).toBeFalsy()
  })

  test('setElementValueValid', () => {
    const command = prepareTaskSaveElementCommandString()

    TaskSaveElementCommandUtils.setElementValueValid(command, true)

    expect(command.elementValues).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])

    TaskSaveElementCommandUtils.setElementValueValid(command, false)

    expect(command.elementValues).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
    ])
  })

  test('setElementValueValidAt', () => {
    const command = prepareTaskSaveElementCommandString()

    TaskSaveElementCommandUtils.setElementValueValidAt(command, false, 0)
    TaskSaveElementCommandUtils.setElementValueValidAt(command, true, 1)

    expect(command.elementValues).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])
  })

  test('getElementValueAsString', () => {
    const command = prepareTaskSaveElementCommandString()

    const elementValue = TaskSaveElementCommandUtils.getElementValueAsString(command)
    expect(elementValue).toStrictEqual('MY TEXT 1')

    command.elementValues = []

    expect(() => {
      TaskSaveElementCommandUtils.getElementValueAsString(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsString', () => {
    const command = prepareTaskSaveElementCommandString()

    const elementValue0 = TaskSaveElementCommandUtils.findElementValueAsString(command)
    expect(elementValue0).toStrictEqual('MY TEXT 1')

    command.elementValues = []

    const elementValue1 = TaskSaveElementCommandUtils.findElementValueAsString(command)
    expect(elementValue1).toBeUndefined()
  })

  test('getElementValueAsStringList', () => {
    const command = prepareTaskSaveElementCommandString()

    const elementValues0 = TaskSaveElementCommandUtils.getElementValueAsStringList(command)
    expect(elementValues0).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])

    command.elementValues = []

    const elementValues1 = TaskSaveElementCommandUtils.getElementValueAsStringList(command)
    expect(elementValues1).toStrictEqual([])
  })

  test('setElementValueAsString', () => {
    const command = prepareTaskSaveElementCommandString()

    TaskSaveElementCommandUtils.setElementValueAsString(command, 'MY TEXT 2')

    const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsString(command, undefined)

    expect(command.elementValues).toBeFalsy()
  })

  test('setElementValueAsStringList', () => {
    const command = prepareTaskSaveElementCommandString()

    TaskSaveElementCommandUtils.setElementValueAsStringList(command, ['MY TEXT 1', 'MY TEXT 2'])

    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsStringList(command, undefined)

    expect(command.elementValues).toBeFalsy()
  })

  test('addElementValueAsString', () => {
    const command = prepareTaskSaveElementCommandString()

    TaskSaveElementCommandUtils.addElementValueAsString(command, 'MY TEXT')

    const expectedElementValues2: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues2)

    TaskSaveElementCommandUtils.addElementValueAsString(command, undefined)

    expect(command.elementValues).toStrictEqual(expectedElementValues2)
  })

  test('addElementValueAsStringList', () => {
    const command = prepareTaskSaveElementCommandString()

    TaskSaveElementCommandUtils.addElementValueAsStringList(command, ['MY TEXT 3', 'MY TEXT 4'])

    const expectedElementValues2: TaskElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT 3' },
      { type: 'STRING', value: 'MY TEXT 4' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues2)

    TaskSaveElementCommandUtils.addElementValueAsStringList(command, [])
    expect(command.elementValues).toStrictEqual(expectedElementValues2)
  })

  test('getElementValueAsNumber', () => {
    const command = prepareTaskSaveElementCommandNumber()

    const elementValue = TaskSaveElementCommandUtils.getElementValueAsNumber(command)
    expect(elementValue).toStrictEqual(500)

    command.elementValues = []

    expect(() => {
      TaskSaveElementCommandUtils.getElementValueAsNumber(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsNumber', () => {
    const command = prepareTaskSaveElementCommandNumber()

    const elementValue1 = TaskSaveElementCommandUtils.findElementValueAsNumber(command)
    expect(elementValue1).toStrictEqual(500)

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.findElementValueAsNumber(command)
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsNumberList', () => {
    const command = prepareTaskSaveElementCommandNumber()

    const elementValues1 = TaskSaveElementCommandUtils.getElementValueAsNumberList(command)
    expect(elementValues1).toStrictEqual([500, 600])

    command.elementValues = []

    const elementValues2 = TaskSaveElementCommandUtils.getElementValueAsNumberList(command)
    expect(elementValues2).toStrictEqual([])
  })

  test('setElementValueAsNumber', () => {
    const command = prepareTaskSaveElementCommandNumber()

    TaskSaveElementCommandUtils.setElementValueAsNumber(command, 1234)

    const expectedElementValues2: TaskElementValueNumber[] = [{ type: 'NUMBER', value: 1234 }]
    expect(command.elementValues).toStrictEqual(expectedElementValues2)

    TaskSaveElementCommandUtils.setElementValueAsNumber(command, undefined)

    expect(command.elementValues).toBeFalsy()
  })

  test('setElementValueAsNumberList', () => {
    const command = prepareTaskSaveElementCommandNumber()

    TaskSaveElementCommandUtils.setElementValueAsNumberList(command, [1234, 5678])

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsNumberList(command, undefined)

    expect(command.elementValues).toBeFalsy()
  })

  test('addElementValueAsNumber', () => {
    const command = prepareTaskSaveElementCommandNumber()

    TaskSaveElementCommandUtils.addElementValueAsNumber(command, 1234)

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsNumber(command, undefined)

    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsNumberList', () => {
    const command = prepareTaskSaveElementCommandNumber()

    TaskSaveElementCommandUtils.addElementValueAsNumberList(command, [1234, 5678])

    const expectedElementValues1: TaskElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsNumberList(command, undefined)

    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsNumberList(command, [])

    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDate', () => {
    const command = prepareTaskSaveElementCommandDate()

    const elementValue = TaskSaveElementCommandUtils.getElementValueAsDate(command)
    expect(elementValue).toStrictEqual(new Date('2000-01-01'))

    command.elementValues = []

    expect(() => {
      TaskSaveElementCommandUtils.getElementValueAsDate(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsDate', () => {
    const command = prepareTaskSaveElementCommandDate()

    const elementValue1 = TaskSaveElementCommandUtils.findElementValueAsDate(command)
    expect(elementValue1).toStrictEqual(new Date('2000-01-01'))

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.findElementValueAsDate(command)
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDateList', () => {
    const command = prepareTaskSaveElementCommandDate()

    const elementValue1 = TaskSaveElementCommandUtils.getElementValueAsDateList(command)
    expect(elementValue1).toStrictEqual([new Date('2000-01-01'), new Date('1980-01-01')])

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.getElementValueAsDateList(command)
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDate', () => {
    const command = prepareTaskSaveElementCommandDate()

    TaskSaveElementCommandUtils.setElementValueAsDate(command, new Date('3000-01-01'))
    const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: '3000-01-01' }]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsDate(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('setElementValueAsDateList', () => {
    const command = prepareTaskSaveElementCommandDate()

    TaskSaveElementCommandUtils.setElementValueAsDateList(command, [new Date('3000-01-01'), new Date('3020-01-01')])
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3020-01-01' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsDateList(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('addElementValueAsDate', () => {
    const command = prepareTaskSaveElementCommandDate()

    TaskSaveElementCommandUtils.addElementValueAsDate(command, new Date('3000-01-01'))
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsDate(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDateList', () => {
    const command = prepareTaskSaveElementCommandDate()

    TaskSaveElementCommandUtils.addElementValueAsDateList(command, [new Date('3000-01-01'), new Date('3030-01-01')])
    const expectedElementValues1: TaskElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3030-01-01' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsDateList(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsDateList(command, [])
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsObject', () => {
    const command = prepareTaskSaveElementCommandObject()

    const elementValue = TaskSaveElementCommandUtils.getElementValueAsObject(command)
    expect(elementValue).toStrictEqual({ key: 'value 1' })

    command.elementValues = []

    expect(() => {
      TaskSaveElementCommandUtils.getElementValueAsObject(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsObject', () => {
    const command = prepareTaskSaveElementCommandObject()

    const elementValue1 = TaskSaveElementCommandUtils.findElementValueAsObject(command)
    expect(elementValue1).toStrictEqual({ key: 'value 1' })

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.findElementValueAsObject(command)
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsObjectList', () => {
    const command = prepareTaskSaveElementCommandObject()

    const elementValue1 = TaskSaveElementCommandUtils.getElementValueAsObjectList(command)
    expect(elementValue1).toStrictEqual([{ key: 'value 1' }, { key: 'value 2' }])

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.getElementValueAsObjectList(command)
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsObject', () => {
    const command = prepareTaskSaveElementCommandObject()

    TaskSaveElementCommandUtils.setElementValueAsObject(command, { key: 'value 3' })
    const expectedElementValues1: TaskElementValueObject[] = [{ type: 'OBJECT', value: { key: 'value 3' } }]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsObject(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('setElementValueAsObjectList', () => {
    const command = prepareTaskSaveElementCommandObject()

    TaskSaveElementCommandUtils.setElementValueAsObjectList(command, [{ key: 'value 3' }, { key: 'value 4' }])
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 3' } },
      { type: 'OBJECT', value: { key: 'value 4' } },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsObjectList(command, [])
    expect(command.elementValues).toBeUndefined()
  })

  test('addElementValueAsObject', () => {
    const command = prepareTaskSaveElementCommandObject()

    TaskSaveElementCommandUtils.addElementValueAsObject(command, { key: 'value 3' })
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
      { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
      { type: 'OBJECT', value: { key: 'value 3' } },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsObject(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsObjectList', () => {
    const command = prepareTaskSaveElementCommandObject()

    TaskSaveElementCommandUtils.addElementValueAsObjectList(command, [{ key: 'value 3' }, { key: 'value 4' }])
    const expectedElementValues1: TaskElementValueObject[] = [
      { type: 'OBJECT', value: { key: 'value 1' }, valid: true },
      { type: 'OBJECT', value: { key: 'value 2' }, valid: false },
      { type: 'OBJECT', value: { key: 'value 3' } },
      { type: 'OBJECT', value: { key: 'value 4' } },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsObjectList(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsObjectList(command, [])
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDocument', () => {
    const command = prepareTaskSaveElementCommandDocument()

    const elementValue = TaskSaveElementCommandUtils.getElementValueAsDocument(command)
    expect(elementValue).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

    command.elementValues = []

    expect(() => {
      TaskSaveElementCommandUtils.getElementValueAsDocument(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsDocument', () => {
    const command = prepareTaskSaveElementCommandDocument()

    const elementValue1 = TaskSaveElementCommandUtils.findElementValueAsDocument(command)
    expect(elementValue1).toStrictEqual(prepareTaskElementValueDocumentItem('1'))

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.findElementValueAsDocument(command)
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDocumentList', () => {
    const command = prepareTaskSaveElementCommandDocument()

    const elementValue1 = TaskSaveElementCommandUtils.getElementValueAsDocumentList(command)
    expect(elementValue1).toStrictEqual([
      prepareTaskElementValueDocumentItem('1'),
      prepareTaskElementValueDocumentItem('2'),
    ])

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.getElementValueAsDocumentList(command)
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDocument', () => {
    const command = prepareTaskSaveElementCommandDocument()

    TaskSaveElementCommandUtils.setElementValueAsDocument(command, prepareTaskElementValueDocumentItem('3'))
    const expectedElementValues1: TaskElementValueDocument[] = [
      {
        type: 'DOCUMENT',
        value: prepareTaskElementValueDocumentItem('3'),
      },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsDocument(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('setElementValueAsDocumentList', () => {
    const command = prepareTaskSaveElementCommandDocument()

    TaskSaveElementCommandUtils.setElementValueAsDocumentList(command, [
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

    TaskSaveElementCommandUtils.setElementValueAsDocumentList(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('addElementValueAsDocument', () => {
    const command = prepareTaskSaveElementCommandDocument()

    TaskSaveElementCommandUtils.addElementValueAsDocument(command, prepareTaskElementValueDocumentItem('3'))
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

    TaskSaveElementCommandUtils.addElementValueAsDocument(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDocumentList', () => {
    const command = prepareTaskSaveElementCommandDocument()

    TaskSaveElementCommandUtils.addElementValueAsDocumentList(command, [
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

    TaskSaveElementCommandUtils.addElementValueAsDocumentList(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsDocumentList(command, [])
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsPrincipal', () => {
    const command = prepareTaskSaveElementCommandPrincipal()

    const elementValue = TaskSaveElementCommandUtils.getElementValueAsPrincipal(command)
    expect(elementValue).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

    command.elementValues = []

    expect(() => {
      TaskSaveElementCommandUtils.getElementValueAsPrincipal(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsPrincipal', () => {
    const command = prepareTaskSaveElementCommandPrincipal()

    const elementValue1 = TaskSaveElementCommandUtils.findElementValueAsPrincipal(command)
    expect(elementValue1).toStrictEqual(prepareTaskElementValuePrincipalItem('1'))

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.findElementValueAsPrincipal(command)
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsPrincipalList', () => {
    const command = prepareTaskSaveElementCommandPrincipal()

    const elementValue1 = TaskSaveElementCommandUtils.getElementValueAsPrincipalList(command)
    expect(elementValue1).toStrictEqual([
      prepareTaskElementValuePrincipalItem('1'),
      prepareTaskElementValuePrincipalItem('2'),
    ])

    command.elementValues = []

    const elementValue2 = TaskSaveElementCommandUtils.getElementValueAsPrincipalList(command)
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsPrincipal', () => {
    const command = prepareTaskSaveElementCommandPrincipal()

    TaskSaveElementCommandUtils.setElementValueAsPrincipal(command, prepareTaskElementValuePrincipalItem('3'))
    const expectedElementValues1: TaskElementValuePrincipal[] = [
      {
        type: 'PRINCIPAL',
        value: prepareTaskElementValuePrincipalItem('3'),
      },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.setElementValueAsPrincipal(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('setElementValueAsPrincipalList', () => {
    const command = prepareTaskSaveElementCommandPrincipal()

    TaskSaveElementCommandUtils.setElementValueAsPrincipalList(command, [
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

    TaskSaveElementCommandUtils.setElementValueAsPrincipalList(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('addElementValueAsPrincipal', () => {
    const command = prepareTaskSaveElementCommandPrincipal()

    TaskSaveElementCommandUtils.addElementValueAsPrincipal(command, prepareTaskElementValuePrincipalItem('3'))
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

    TaskSaveElementCommandUtils.addElementValueAsPrincipal(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsPrincipalList', () => {
    const command = prepareTaskSaveElementCommandPrincipal()

    TaskSaveElementCommandUtils.addElementValueAsPrincipalList(command, [
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

    TaskSaveElementCommandUtils.addElementValueAsPrincipalList(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    TaskSaveElementCommandUtils.addElementValueAsPrincipalList(command, [])
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })
})

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
