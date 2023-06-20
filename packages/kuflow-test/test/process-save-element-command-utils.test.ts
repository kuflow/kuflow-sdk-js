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
  type ProcessSaveElementCommand,
  ProcessSaveElementCommandUtils,
} from '@kuflow/kuflow-rest'

describe('Process Save Element Command Utils', () => {
  test('getElementValueValid', () => {
    const command = prepareProcessSaveElementCommandString()

    const elementValueValid = ProcessSaveElementCommandUtils.getElementValueValid(command)

    expect(elementValueValid).toBeFalsy()
  })

  test('getElementValueValidAt', () => {
    const command = prepareProcessSaveElementCommandString()

    const elementValueValid0 = ProcessSaveElementCommandUtils.getElementValueValidAt(command, 0)
    expect(elementValueValid0).not.toBeUndefined()
    expect(elementValueValid0).toBeTruthy()

    const elementValueValid1 = ProcessSaveElementCommandUtils.getElementValueValidAt(command, 1)
    expect(elementValueValid1).not.toBeUndefined()
    expect(elementValueValid1).toBeFalsy()
  })

  test('setElementValueValid', () => {
    const command = prepareProcessSaveElementCommandString()

    ProcessSaveElementCommandUtils.setElementValueValid(command, true)

    expect(command.elementValues).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])

    ProcessSaveElementCommandUtils.setElementValueValid(command, false)

    expect(command.elementValues).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
    ])
  })

  test('setElementValueValidAt', () => {
    const command = prepareProcessSaveElementCommandString()

    ProcessSaveElementCommandUtils.setElementValueValidAt(command, false, 0)
    ProcessSaveElementCommandUtils.setElementValueValidAt(command, true, 1)

    expect(command.elementValues).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])
  })

  test('getElementValueAsString', () => {
    const command = prepareProcessSaveElementCommandString()

    const elementValue = ProcessSaveElementCommandUtils.getElementValueAsString(command)
    expect(elementValue).toStrictEqual('MY TEXT 1')

    command.elementValues = []

    expect(() => {
      ProcessSaveElementCommandUtils.getElementValueAsString(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsString', () => {
    const command = prepareProcessSaveElementCommandString()

    const elementValue0 = ProcessSaveElementCommandUtils.findElementValueAsString(command)
    expect(elementValue0).toStrictEqual('MY TEXT 1')

    command.elementValues = []

    const elementValue1 = ProcessSaveElementCommandUtils.findElementValueAsString(command)
    expect(elementValue1).toBeUndefined()
  })

  test('getElementValueAsStringList', () => {
    const command = prepareProcessSaveElementCommandString()

    const elementValues0 = ProcessSaveElementCommandUtils.getElementValueAsStringList(command)
    expect(elementValues0).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])

    command.elementValues = []

    const elementValues1 = ProcessSaveElementCommandUtils.getElementValueAsStringList(command)
    expect(elementValues1).toStrictEqual([])
  })

  test('setElementValueAsString', () => {
    const command = prepareProcessSaveElementCommandString()

    ProcessSaveElementCommandUtils.setElementValueAsString(command, 'MY TEXT 2')

    const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.setElementValueAsString(command, undefined)

    expect(command.elementValues).toBeFalsy()
  })

  test('setElementValueAsStringList', () => {
    const command = prepareProcessSaveElementCommandString()

    ProcessSaveElementCommandUtils.setElementValueAsStringList(command, ['MY TEXT 1', 'MY TEXT 2'])

    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.setElementValueAsStringList(command, undefined)

    expect(command.elementValues).toBeFalsy()
  })

  test('addElementValueAsString', () => {
    const command = prepareProcessSaveElementCommandString()

    ProcessSaveElementCommandUtils.addElementValueAsString(command, 'MY TEXT')

    const expectedElementValues2: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues2)

    ProcessSaveElementCommandUtils.addElementValueAsString(command, undefined)

    expect(command.elementValues).toStrictEqual(expectedElementValues2)
  })

  test('addElementValueAsStringList', () => {
    const command = prepareProcessSaveElementCommandString()

    ProcessSaveElementCommandUtils.addElementValueAsStringList(command, ['MY TEXT 3', 'MY TEXT 4'])

    const expectedElementValues2: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT 3' },
      { type: 'STRING', value: 'MY TEXT 4' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues2)

    ProcessSaveElementCommandUtils.addElementValueAsStringList(command, [])
    expect(command.elementValues).toStrictEqual(expectedElementValues2)
  })

  test('getElementValueAsNumber', () => {
    const command = prepareProcessSaveElementCommandNumber()

    const elementValue = ProcessSaveElementCommandUtils.getElementValueAsNumber(command)
    expect(elementValue).toStrictEqual(500)

    command.elementValues = []

    expect(() => {
      ProcessSaveElementCommandUtils.getElementValueAsNumber(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsNumber', () => {
    const command = prepareProcessSaveElementCommandNumber()

    const elementValue1 = ProcessSaveElementCommandUtils.findElementValueAsNumber(command)
    expect(elementValue1).toStrictEqual(500)

    command.elementValues = []

    const elementValue2 = ProcessSaveElementCommandUtils.findElementValueAsNumber(command)
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsNumberList', () => {
    const command = prepareProcessSaveElementCommandNumber()

    const elementValues1 = ProcessSaveElementCommandUtils.getElementValueAsNumberList(command)
    expect(elementValues1).toStrictEqual([500, 600])

    command.elementValues = []

    const elementValues2 = ProcessSaveElementCommandUtils.getElementValueAsNumberList(command)
    expect(elementValues2).toStrictEqual([])
  })

  test('setElementValueAsNumber', () => {
    const command = prepareProcessSaveElementCommandNumber()

    ProcessSaveElementCommandUtils.setElementValueAsNumber(command, 1234)

    const expectedElementValues2: ProcessElementValueNumber[] = [{ type: 'NUMBER', value: 1234 }]
    expect(command.elementValues).toStrictEqual(expectedElementValues2)

    ProcessSaveElementCommandUtils.setElementValueAsNumber(command, undefined)

    expect(command.elementValues).toBeFalsy()
  })

  test('setElementValueAsNumberList', () => {
    const command = prepareProcessSaveElementCommandNumber()

    ProcessSaveElementCommandUtils.setElementValueAsNumberList(command, [1234, 5678])

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.setElementValueAsNumberList(command, undefined)

    expect(command.elementValues).toBeFalsy()
  })

  test('addElementValueAsNumber', () => {
    const command = prepareProcessSaveElementCommandNumber()

    ProcessSaveElementCommandUtils.addElementValueAsNumber(command, 1234)

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.addElementValueAsNumber(command, undefined)

    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsNumberList', () => {
    const command = prepareProcessSaveElementCommandNumber()

    ProcessSaveElementCommandUtils.addElementValueAsNumberList(command, [1234, 5678])

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.addElementValueAsNumberList(command, undefined)

    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.addElementValueAsNumberList(command, [])

    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDate', () => {
    const command = prepareProcessSaveElementCommandDate()

    const elementValue = ProcessSaveElementCommandUtils.getElementValueAsDate(command)
    expect(elementValue).toStrictEqual(new Date('2000-01-01'))

    command.elementValues = []

    expect(() => {
      ProcessSaveElementCommandUtils.getElementValueAsDate(command)
    }).toThrow('value is required!')
  })

  test('findElementValueAsDate', () => {
    const command = prepareProcessSaveElementCommandDate()

    const elementValue1 = ProcessSaveElementCommandUtils.findElementValueAsDate(command)
    expect(elementValue1).toStrictEqual(new Date('2000-01-01'))

    command.elementValues = []

    const elementValue2 = ProcessSaveElementCommandUtils.findElementValueAsDate(command)
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDateList', () => {
    const command = prepareProcessSaveElementCommandDate()

    const elementValue1 = ProcessSaveElementCommandUtils.getElementValueAsDateList(command)
    expect(elementValue1).toStrictEqual([new Date('2000-01-01'), new Date('1980-01-01')])

    command.elementValues = []

    const elementValue2 = ProcessSaveElementCommandUtils.getElementValueAsDateList(command)
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDate', () => {
    const command = prepareProcessSaveElementCommandDate()

    ProcessSaveElementCommandUtils.setElementValueAsDate(command, new Date('3000-01-01'))
    const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: '3000-01-01' }]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.setElementValueAsDate(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('setElementValueAsDateList', () => {
    const command = prepareProcessSaveElementCommandDate()

    ProcessSaveElementCommandUtils.setElementValueAsDateList(command, [new Date('3000-01-01'), new Date('3020-01-01')])
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3020-01-01' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.setElementValueAsDateList(command, undefined)
    expect(command.elementValues).toBeUndefined()
  })

  test('addElementValueAsDate', () => {
    const command = prepareProcessSaveElementCommandDate()

    ProcessSaveElementCommandUtils.addElementValueAsDate(command, new Date('3000-01-01'))
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.addElementValueAsDate(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDateList', () => {
    const command = prepareProcessSaveElementCommandDate()

    ProcessSaveElementCommandUtils.addElementValueAsDateList(command, [new Date('3000-01-01'), new Date('3030-01-01')])
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3030-01-01' },
    ]
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.addElementValueAsDateList(command, undefined)
    expect(command.elementValues).toStrictEqual(expectedElementValues1)

    ProcessSaveElementCommandUtils.addElementValueAsDateList(command, [])
    expect(command.elementValues).toStrictEqual(expectedElementValues1)
  })
})

function prepareProcessSaveElementCommandString(): ProcessSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
    ],
  }
}

function prepareProcessSaveElementCommandNumber(): ProcessSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
    ],
  }
}

function prepareProcessSaveElementCommandDate(): ProcessSaveElementCommand {
  return {
    elementDefinitionCode: 'CODE',
    elementValues: [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
    ],
  }
}
