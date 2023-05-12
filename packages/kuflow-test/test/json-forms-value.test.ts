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
  findJsonFormsPropertyAsBoolean,
  findJsonFormsPropertyAsJsonFormsFile,
  findJsonFormsPropertyAsJsonFormsPrincipalUser,
  findJsonFormsPropertyAsNumber,
  findJsonFormsPropertyAsObject,
  findJsonFormsPropertyAsString,
  getJsonFormsPropertyAsArray,
  getJsonFormsPropertyAsBoolean,
  getJsonFormsPropertyAsDate,
  getJsonFormsPropertyAsJsonFormsFile,
  getJsonFormsPropertyAsJsonFormsPrincipalUser,
  getJsonFormsPropertyAsNumber,
  getJsonFormsPropertyAsObject,
  getJsonFormsPropertyAsString,
  type JsonFormsFile,
  type JsonFormsPrincipalUser,
  type Task,
  updateJsonFormsProperty,
} from '@kuflow/kuflow-rest'

describe('JsonForms Value Utils', () => {
  test('getJsonFormsPropertyAsString', () => {
    const task = prepareTask()

    const value1 = getJsonFormsPropertyAsString(task, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = getJsonFormsPropertyAsString(task, 'key2.key2_key1.0.key2_key1_key2')
    expect(value2).toStrictEqual('value_key2_key1_key2')

    expect(() => {
      getJsonFormsPropertyAsString(task, 'key2.key2_key1.0.unknown')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsString(task, 'key2.key2_key1.10')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsString(task, 'key2.key2_key1.100.key2_key1_key2')
    }).toThrow("Property value doesn't exist")
  })

  test('findJsonFormsPropertyAsString', () => {
    const task = prepareTask()

    const value1 = findJsonFormsPropertyAsString(task, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = findJsonFormsPropertyAsString(task, 'key2.key2_key1.0.key2_key1_key2')
    expect(value2).toStrictEqual('value_key2_key1_key2')

    const value3 = findJsonFormsPropertyAsString(task, 'key2.key2_key1.0.unknown')
    expect(value3).toBeUndefined()

    const value4 = findJsonFormsPropertyAsString(task, 'key2.key2_key1.10')
    expect(value4).toBeUndefined()

    const value5 = findJsonFormsPropertyAsString(task, 'key2.key2_key1.100.key2_key1_key2')
    expect(value5).toBeUndefined()
  })

  test('getJsonFormsPropertyAsNumber', () => {
    const task = prepareTask()

    const value1 = getJsonFormsPropertyAsNumber(task, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = getJsonFormsPropertyAsNumber(task, 'key3.1')
    expect(value2).toStrictEqual(1000)

    expect(() => {
      getJsonFormsPropertyAsNumber(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsNumber(task, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('findJsonFormsPropertyAsNumber', () => {
    const task = prepareTask()

    const value1 = findJsonFormsPropertyAsNumber(task, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = findJsonFormsPropertyAsNumber(task, 'key3.1')
    expect(value2).toStrictEqual(1000)

    const value3 = findJsonFormsPropertyAsNumber(task, 'key_xxxxxxx')
    expect(value3).toBeUndefined()

    expect(() => {
      getJsonFormsPropertyAsNumber(task, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('getJsonFormsPropertyAsBoolean', () => {
    const task = prepareTask()

    const value1 = getJsonFormsPropertyAsBoolean(task, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = getJsonFormsPropertyAsBoolean(task, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = getJsonFormsPropertyAsBoolean(task, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = getJsonFormsPropertyAsBoolean(task, 'key4.3')
    expect(value4).toStrictEqual(false)

    expect(() => {
      getJsonFormsPropertyAsBoolean(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsBoolean(task, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('findJsonFormsPropertyAsBoolean', () => {
    const task = prepareTask()

    const value1 = findJsonFormsPropertyAsBoolean(task, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = findJsonFormsPropertyAsBoolean(task, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = findJsonFormsPropertyAsBoolean(task, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = findJsonFormsPropertyAsBoolean(task, 'key4.3')
    expect(value4).toStrictEqual(false)

    const value5 = findJsonFormsPropertyAsBoolean(task, 'key_xxxxxxx')
    expect(value5).toBeUndefined()

    expect(() => {
      getJsonFormsPropertyAsBoolean(task, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('getJsonFormsPropertyAsDate', () => {
    const task = prepareTask()

    const value1 = getJsonFormsPropertyAsDate(task, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      getJsonFormsPropertyAsDate(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsDate(task, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('getJsonFormsPropertyAsJsonFormsFile', () => {
    const task = prepareTask()

    const value = getJsonFormsPropertyAsJsonFormsFile(task, 'key6')
    expect(value).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    expect(() => {
      getJsonFormsPropertyAsJsonFormsFile(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsJsonFormsFile(task, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('findJsonFormsPropertyAsJsonFormsFile', () => {
    const task = prepareTask()

    const value1 = findJsonFormsPropertyAsJsonFormsFile(task, 'key6')
    expect(value1).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    const value2 = findJsonFormsPropertyAsJsonFormsFile(task, 'key_xxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      findJsonFormsPropertyAsJsonFormsFile(task, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('getJsonFormsPropertyAsJsonFormsPrincipalUser', () => {
    const task = prepareTask()

    const value = getJsonFormsPropertyAsJsonFormsPrincipalUser(task, 'key7')
    expect(value).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    expect(() => {
      getJsonFormsPropertyAsJsonFormsPrincipalUser(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsJsonFormsPrincipalUser(task, 'key1')
    }).toThrow('Property key1 is not a principal user')
  })

  test('findJsonFormsPropertyAsJsonFormsPrincipalUser', () => {
    const task = prepareTask()

    const value1 = findJsonFormsPropertyAsJsonFormsPrincipalUser(task, 'key7')
    expect(value1).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    const value2 = findJsonFormsPropertyAsJsonFormsPrincipalUser(task, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      findJsonFormsPropertyAsJsonFormsPrincipalUser(task, 'key1')
    }).toThrow('Property key1 is not a principal user')
  })

  test('getJsonFormsPropertyAsArray', () => {
    const task = prepareTask()

    const value1 = getJsonFormsPropertyAsArray(task, 'key3')
    expect(value1).toStrictEqual([500, '1000'])

    expect(() => {
      getJsonFormsPropertyAsArray(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsArray(task, 'key1')
    }).toThrow('Property key1 is not an array')
  })

  test('getJsonFormsPropertyAsObject', () => {
    const task = prepareTask()

    const value1 = getJsonFormsPropertyAsObject(task, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    expect(() => {
      getJsonFormsPropertyAsObject(task, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      getJsonFormsPropertyAsObject(task, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('findJsonFormsPropertyAsObject', () => {
    const task = prepareTask()

    const value1 = findJsonFormsPropertyAsObject(task, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    const value2 = findJsonFormsPropertyAsObject(task, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      findJsonFormsPropertyAsObject(task, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('updateJsonFormsProperty', () => {
    const task = prepareTask()
    task.jsonFormsValue = {}

    const file: JsonFormsFile = {
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    }

    const principalUser: JsonFormsPrincipalUser = {
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    }

    updateJsonFormsProperty(task, 'key1', 'text')
    updateJsonFormsProperty(task, 'key2.0.key1', true)
    updateJsonFormsProperty(task, 'key2.0.key2', new Date('2020-01-01'))
    updateJsonFormsProperty(task, 'key2.1.key1', false)
    updateJsonFormsProperty(task, 'key2.1.key2', new Date('3030-01-01'))
    updateJsonFormsProperty(task, 'key3', 100)
    updateJsonFormsProperty(task, 'key4', file)
    updateJsonFormsProperty(task, 'key5', principalUser)

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
      key5: 'kuflow-principal-user:id=xxx-yyy-zzz;type=USER;name=Homer Simpson;',
    })

    updateJsonFormsProperty(task, 'key1', undefined)
    updateJsonFormsProperty(task, 'key2.0', undefined)
    updateJsonFormsProperty(task, 'key2.0.key1', undefined)

    expect(task.jsonFormsValue.data).toStrictEqual({
      key2: [
        {
          key2: '3030-01-01',
        },
      ],
      key3: 100,
      key4: 'kuflow-file:uri=xxx-yyy-zzz;type=application/pdf;size=500;name=dummy.pdf;',
      key5: 'kuflow-principal-user:id=xxx-yyy-zzz;type=USER;name=Homer Simpson;',
    })

    expect(() => {
      updateJsonFormsProperty(task, 'key2.100.key1', undefined)
    }).toThrow("Property key2.100.key1 doesn't exist")
  })
})

function prepareTask(): Task {
  return {
    objectType: 'TASK',
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
        key7: 'kuflow-principal-user:id=xxx-yyy-zzz;type=USER;name=Homer Simpson;',
      },
    },
  }
}
