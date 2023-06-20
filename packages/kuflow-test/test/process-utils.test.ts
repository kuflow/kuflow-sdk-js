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
  type Process,
  type ProcessElementValueNumber,
  type ProcessElementValueString,
  ProcessUtils,
} from '@kuflow/kuflow-rest'

describe('Process Utils', () => {
  test('getElementValueValid', () => {
    const process = prepareProcess()

    const elementValueValid = ProcessUtils.getElementValueValid(process, 'EV_STRING')

    expect(elementValueValid).toBeFalsy()
  })

  test('getElementValueValidAt', () => {
    const process = prepareProcess()

    const elementValueValid0 = ProcessUtils.getElementValueValidAt(process, 'EV_STRING', 0)
    expect(elementValueValid0).not.toBeUndefined()
    expect(elementValueValid0).toBeTruthy()

    const elementValueValid1 = ProcessUtils.getElementValueValidAt(process, 'EV_STRING', 1)
    expect(elementValueValid1).not.toBeUndefined()
    expect(elementValueValid1).toBeFalsy()
  })

  test('setElementValueValid', () => {
    const process = prepareProcess()

    ProcessUtils.setElementValueValid(process, 'EV_STRING', true)

    expect(process.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])

    ProcessUtils.setElementValueValid(process, 'EV_STRING', false)

    expect(process.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
    ])
  })

  test('setElementValueValidAt', () => {
    const process = prepareProcess()

    ProcessUtils.setElementValueValidAt(process, 'EV_STRING', false, 0)
    ProcessUtils.setElementValueValidAt(process, 'EV_STRING', true, 1)

    expect(process.elementValues?.EV_STRING).toStrictEqual([
      { type: 'STRING', value: 'MY TEXT 1', valid: false },
      { type: 'STRING', value: 'MY TEXT 2', valid: true },
    ])
  })

  test('getElementValueAsString', () => {
    const process = prepareProcess()

    const elementValue = ProcessUtils.getElementValueAsString(process, 'EV_STRING')
    expect(elementValue).toStrictEqual('MY TEXT 1')

    expect(() => {
      ProcessUtils.getElementValueAsString(process, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsString', () => {
    const process = prepareProcess()

    const elementValue0 = ProcessUtils.findElementValueAsString(process, 'EV_STRING')
    expect(elementValue0).toStrictEqual('MY TEXT 1')

    const elementValue1 = ProcessUtils.findElementValueAsString(process, 'OTHER')
    expect(elementValue1).toBeUndefined()
  })

  test('getElementValueAsStringList', () => {
    const process = prepareProcess()

    const elementValues0 = ProcessUtils.getElementValueAsStringList(process, 'EV_STRING')
    expect(elementValues0).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])

    const elementValues1 = ProcessUtils.getElementValueAsStringList(process, 'OTHER')
    expect(elementValues1).toStrictEqual([])
  })

  test('setElementValueAsString', () => {
    const process = prepareProcess()

    ProcessUtils.setElementValueAsString(process, 'EV_STRING', 'MY TEXT 2')

    const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
    expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    ProcessUtils.setElementValueAsString(process, 'EV_STRING', undefined)

    expect(process.elementValues?.EV_STRING).toBeFalsy()
  })

  test('setElementValueAsStringList', () => {
    const process = prepareProcess()

    ProcessUtils.setElementValueAsStringList(process, 'EV_STRING', ['MY TEXT 1', 'MY TEXT 2'])

    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    ProcessUtils.setElementValueAsStringList(process, 'EV_STRING', undefined)

    expect(process.elementValues?.EV_STRING).toBeFalsy()
  })

  test('addElementValueAsString', () => {
    const process = prepareProcess()

    ProcessUtils.addElementValueAsString(process, 'EV_STRING', 'MY TEXT 2')

    const expectedElementValues2: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)

    ProcessUtils.addElementValueAsString(process, 'EV_STRING', undefined)

    expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues2)
  })

  test('addElementValueAsStringList', () => {
    const process = prepareProcess()

    ProcessUtils.addElementValueAsStringList(process, 'EV_STRING', ['MY TEXT', 'MY TEXT 2'])

    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: 'MY TEXT 1', valid: true },
      { type: 'STRING', value: 'MY TEXT 2', valid: false },
      { type: 'STRING', value: 'MY TEXT' },
      { type: 'STRING', value: 'MY TEXT 2' },
    ]
    expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)

    ProcessUtils.addElementValueAsStringList(process, 'EV_STRING', [])
    expect(process.elementValues?.EV_STRING).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsNumber', () => {
    const process = prepareProcess()

    const elementValue = ProcessUtils.getElementValueAsNumber(process, 'EV_NUMBER')
    expect(elementValue).toStrictEqual(500)

    expect(() => {
      ProcessUtils.getElementValueAsNumber(process, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsNumber', () => {
    const process = prepareProcess()

    const elementValue1 = ProcessUtils.findElementValueAsNumber(process, 'EV_NUMBER')
    expect(elementValue1).toStrictEqual(500)

    const elementValue2 = ProcessUtils.findElementValueAsNumber(process, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsNumberList', () => {
    const process = prepareProcess()

    const elementValues1 = ProcessUtils.getElementValueAsNumberList(process, 'EV_NUMBER')
    expect(elementValues1).toStrictEqual([500, 600])

    const elementValues2 = ProcessUtils.getElementValueAsNumberList(process, 'OTHER')
    expect(elementValues2).toStrictEqual([])
  })

  test('setElementValueAsNumber', () => {
    const process = prepareProcess()

    ProcessUtils.setElementValueAsNumber(process, 'EV_NUMBER', 1234)

    const expectedElementValues1: ProcessElementValueNumber[] = [{ type: 'NUMBER', value: 1234 }]
    expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessUtils.setElementValueAsString(process, 'EV_NUMBER', undefined)

    expect(process.elementValues?.EV_NUMBER).toBeFalsy()
  })

  test('setElementValueAsNumberList', () => {
    const process = prepareProcess()

    ProcessUtils.setElementValueAsNumberList(process, 'EV_NUMBER', [1234, 5678])

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessUtils.setElementValueAsString(process, 'EV_NUMBER', undefined)

    expect(process.elementValues?.EV_NUMBER).toBeFalsy()
  })

  test('addElementValueAsNumber', () => {
    const process = prepareProcess()

    ProcessUtils.addElementValueAsNumber(process, 'EV_NUMBER', 1234)

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
    ]
    expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessUtils.addElementValueAsNumber(process, 'EV_NUMBER', undefined)

    expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsNumberList', () => {
    const process = prepareProcess()

    ProcessUtils.addElementValueAsNumberList(process, 'EV_NUMBER', [1234, 5678])

    const expectedElementValues1: ProcessElementValueNumber[] = [
      { type: 'NUMBER', value: 500, valid: true },
      { type: 'NUMBER', value: 600, valid: false },
      { type: 'NUMBER', value: 1234 },
      { type: 'NUMBER', value: 5678 },
    ]
    expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessUtils.addElementValueAsNumberList(process, 'EV_NUMBER', undefined)

    expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)

    ProcessUtils.addElementValueAsNumberList(process, 'EV_NUMBER', [])

    expect(process.elementValues?.EV_NUMBER).toStrictEqual(expectedElementValues1)
  })

  test('getElementValueAsDate', () => {
    const process = prepareProcess()

    const elementValue = ProcessUtils.getElementValueAsDate(process, 'EV_DATE')
    expect(elementValue).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      ProcessUtils.getElementValueAsDate(process, 'OTHER')
    }).toThrow('value is required!')
  })

  test('findElementValueAsDate', () => {
    const process = prepareProcess()

    const elementValue1 = ProcessUtils.findElementValueAsDate(process, 'EV_DATE')
    expect(elementValue1).toStrictEqual(new Date('2000-01-01'))

    const elementValue2 = ProcessUtils.findElementValueAsDate(process, 'OTHER')
    expect(elementValue2).toBeUndefined()
  })

  test('getElementValueAsDateList', () => {
    const process = prepareProcess()

    const elementValue1 = ProcessUtils.getElementValueAsDateList(process, 'EV_DATE')
    expect(elementValue1).toStrictEqual([new Date('2000-01-01'), new Date('1980-01-01')])

    const elementValue2 = ProcessUtils.getElementValueAsDateList(process, 'OTHER')
    expect(elementValue2).toStrictEqual([])
  })

  test('setElementValueAsDate', () => {
    const process = prepareProcess()

    ProcessUtils.setElementValueAsDate(process, 'EV_DATE', new Date('3000-01-01'))
    const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: '3000-01-01' }]
    expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessUtils.setElementValueAsDate(process, 'EV_DATE', undefined)
    expect(process.elementValues?.EV_DATE).toBeUndefined()
  })

  test('setElementValueAsDateList', () => {
    const process = prepareProcess()

    ProcessUtils.setElementValueAsDateList(process, 'EV_DATE', [new Date('3000-01-01'), new Date('3020-01-01')])
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3020-01-01' },
    ]
    expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessUtils.setElementValueAsDateList(process, 'EV_DATE', undefined)
    expect(process.elementValues?.EV_DATE).toBeUndefined()
  })

  test('addElementValueAsDate', () => {
    const process = prepareProcess()

    ProcessUtils.addElementValueAsDate(process, 'EV_DATE', new Date('3000-01-01'))
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
    ]
    expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessUtils.addElementValueAsDate(process, 'EV_DATE', undefined)
    expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
  })

  test('addElementValueAsDateList', () => {
    const process = prepareProcess()

    ProcessUtils.addElementValueAsDateList(process, 'EV_DATE', [new Date('3000-01-01'), new Date('3030-01-01')])
    const expectedElementValues1: ProcessElementValueString[] = [
      { type: 'STRING', value: '2000-01-01', valid: true },
      { type: 'STRING', value: '1980-01-01', valid: false },
      { type: 'STRING', value: '3000-01-01' },
      { type: 'STRING', value: '3030-01-01' },
    ]
    expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessUtils.addElementValueAsDateList(process, 'EV_DATE', undefined)
    expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)

    ProcessUtils.addElementValueAsDateList(process, 'EV_DATE', [])
    expect(process.elementValues?.EV_DATE).toStrictEqual(expectedElementValues1)
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
