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
  addElementValueAsString,
  addElementValueAsStringList,
  getElementValueAsString,
  getElementValueAsStringList,
  Process,
  ProcessElementValueString,
  setElementValueAsString,
  Task,
  TaskElementValueString,
} from '@kuflow/kuflow-rest'

describe('Element Values Utils', () => {
  describe('Process', () => {
    test('addElementValueAsString', async () => {
      const process: Process = {
        objectType: 'PROCESS',
        processDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
      }

      addElementValueAsString(process, 'ELEMENT_VALUE_CODE', 'MY TEXT')

      const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: 'MY TEXT' }]
      expect(process.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues1)

      addElementValueAsString(process, 'ELEMENT_VALUE_CODE', 'MY TEXT 2')

      const expectedElementValues2: ProcessElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT' },
        { type: 'STRING', value: 'MY TEXT 2' },
      ]
      expect(process.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues2)

      addElementValueAsString(process, 'ELEMENT_VALUE_CODE', undefined)

      expect(process.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues2)
    })

    test('addElementValueAsStringList', async () => {
      const process: Process = {
        objectType: 'PROCESS',
        processDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
      }

      addElementValueAsStringList(process, 'ELEMENT_VALUE_CODE', ['MY TEXT', 'MY TEXT 2'])

      const expectedElementValues1: ProcessElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT' },
        { type: 'STRING', value: 'MY TEXT 2' },
      ]
      expect(process.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues1)

      addElementValueAsStringList(process, 'ELEMENT_VALUE_CODE', ['MY TEXT 3', 'MY TEXT 4'])

      const expectedElementValues2: ProcessElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT' },
        { type: 'STRING', value: 'MY TEXT 2' },
        { type: 'STRING', value: 'MY TEXT 3' },
        { type: 'STRING', value: 'MY TEXT 4' },
      ]
      expect(process.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues2)

      addElementValueAsStringList(process, 'ELEMENT_VALUE_CODE', [])
      expect(process.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues2)
    })

    test('setElementValueAsString', async () => {
      const process: Process = {
        objectType: 'PROCESS',
        processDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
        elementValues: {
          ELEMENT_VALUE_CODE: [{ type: 'STRING', value: 'MY TEXT' }],
        },
      }

      setElementValueAsString(process, 'ELEMENT_VALUE_CODE', 'MY TEXT 2')

      const expectedElementValues1: ProcessElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
      expect(process.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues1)

      setElementValueAsString(process, 'ELEMENT_VALUE_CODE', undefined)

      expect(process.elementValues?.ELEMENT_VALUE_CODE).toBeFalsy()
    })

    test('getElementValueAsString', async () => {
      const process: Process = {
        objectType: 'PROCESS',
        processDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
        elementValues: {
          ELEMENT_VALUE_CODE: [
            { type: 'STRING', value: 'MY TEXT 1' },
            { type: 'STRING', value: 'MY TEXT 2' },
          ],
        },
      }

      const elementValue = getElementValueAsString(process, 'ELEMENT_VALUE_CODE')

      expect(elementValue).toEqual('MY TEXT 1')
    })

    test('getElementValueAsStringList', async () => {
      const process: Process = {
        objectType: 'PROCESS',
        processDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
        elementValues: {
          ELEMENT_VALUE_CODE: [
            { type: 'STRING', value: 'MY TEXT 1' },
            { type: 'STRING', value: 'MY TEXT 2' },
          ],
        },
      }

      const elementValues = getElementValueAsStringList(process, 'ELEMENT_VALUE_CODE')

      expect(elementValues).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])
    })
  })

  describe('Task', () => {
    test('addElementValueAsString', async () => {
      const task: Task = {
        objectType: 'TASK',
        taskDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
        processId: '3b755d5e-b64f-4ec2-a830-173f006bdf8e',
      }

      addElementValueAsString(task, 'ELEMENT_VALUE_CODE', 'MY TEXT')

      const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: 'MY TEXT' }]
      expect(task.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues1)

      addElementValueAsString(task, 'ELEMENT_VALUE_CODE', 'MY TEXT 2')

      const expectedElementValues2: TaskElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT' },
        { type: 'STRING', value: 'MY TEXT 2' },
      ]
      expect(task.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues2)

      addElementValueAsString(task, 'ELEMENT_VALUE_CODE', undefined)

      expect(task.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues2)
    })

    test('addElementValueAsStringList', async () => {
      const task: Task = {
        objectType: 'TASK',
        taskDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
        processId: '3b755d5e-b64f-4ec2-a830-173f006bdf8e',
      }

      addElementValueAsStringList(task, 'ELEMENT_VALUE_CODE', ['MY TEXT', 'MY TEXT 2'])

      const expectedElementValues1: TaskElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT' },
        { type: 'STRING', value: 'MY TEXT 2' },
      ]
      expect(task.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues1)

      addElementValueAsStringList(task, 'ELEMENT_VALUE_CODE', ['MY TEXT 3', 'MY TEXT 4'])

      const expectedElementValues2: TaskElementValueString[] = [
        { type: 'STRING', value: 'MY TEXT' },
        { type: 'STRING', value: 'MY TEXT 2' },
        { type: 'STRING', value: 'MY TEXT 3' },
        { type: 'STRING', value: 'MY TEXT 4' },
      ]
      expect(task.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues2)

      addElementValueAsStringList(task, 'ELEMENT_VALUE_CODE', [])
      expect(task.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues2)
    })

    test('setElementValueAsString', async () => {
      const task: Task = {
        objectType: 'TASK',
        taskDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
        processId: '3b755d5e-b64f-4ec2-a830-173f006bdf8e',
        elementValues: {
          ELEMENT_VALUE_CODE: [{ type: 'STRING', value: 'MY TEXT' }],
        },
      }

      setElementValueAsString(task, 'ELEMENT_VALUE_CODE', 'MY TEXT 2')

      const expectedElementValues1: TaskElementValueString[] = [{ type: 'STRING', value: 'MY TEXT 2' }]
      expect(task.elementValues?.ELEMENT_VALUE_CODE).toStrictEqual(expectedElementValues1)

      setElementValueAsString(task, 'ELEMENT_VALUE_CODE', undefined)

      expect(task.elementValues?.ELEMENT_VALUE_CODE).toBeFalsy()
    })

    test('getElementValueAsString', async () => {
      const task: Task = {
        objectType: 'TASK',
        taskDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
        processId: '3b755d5e-b64f-4ec2-a830-173f006bdf8e',
        elementValues: {
          ELEMENT_VALUE_CODE: [
            { type: 'STRING', value: 'MY TEXT 1' },
            { type: 'STRING', value: 'MY TEXT 2' },
          ],
        },
      }

      const elementValue = getElementValueAsString(task, 'ELEMENT_VALUE_CODE')

      expect(elementValue).toEqual('MY TEXT 1')
    })

    test('getElementValueAsStringList', async () => {
      const task: Task = {
        objectType: 'TASK',
        taskDefinition: {
          id: 'e68d8136-1166-455c-93d6-d106201c1856',
        },
        processId: '3b755d5e-b64f-4ec2-a830-173f006bdf8e',
        elementValues: {
          ELEMENT_VALUE_CODE: [
            { type: 'STRING', value: 'MY TEXT 1' },
            { type: 'STRING', value: 'MY TEXT 2' },
          ],
        },
      }

      const elementValues = getElementValueAsStringList(task, 'ELEMENT_VALUE_CODE')

      expect(elementValues).toStrictEqual(['MY TEXT 1', 'MY TEXT 2'])
    })
  })
})
