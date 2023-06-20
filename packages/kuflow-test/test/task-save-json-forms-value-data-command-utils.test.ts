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
  type TaskSaveJsonFormsValueDataCommand,
  TaskSaveJsonFormsValueDataCommandUtils,
} from '@kuflow/kuflow-rest'

describe('Task Save Json Forms Value Data Command Utils', () => {
  test('getJsonFormsPropertyAsString', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsString(command, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsString(
      command,
      'key2.key2_key1.0.key2_key1_key2',
    )
    expect(value2).toStrictEqual('value_key2_key1_key2')

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsString(command, 'key2.key2_key1.0.unknown')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsString(command, 'key2.key2_key1.10')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsString(command, 'key2.key2_key1.100.key2_key1_key2')
    }).toThrow("Property value doesn't exist")
  })

  test('findJsonFormsPropertyAsString', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsString(command, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsString(
      command,
      'key2.key2_key1.0.key2_key1_key2',
    )
    expect(value2).toStrictEqual('value_key2_key1_key2')

    const value3 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsString(
      command,
      'key2.key2_key1.0.unknown',
    )
    expect(value3).toBeUndefined()

    const value4 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsString(command, 'key2.key2_key1.10')
    expect(value4).toBeUndefined()

    const value5 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsString(
      command,
      'key2.key2_key1.100.key2_key1_key2',
    )
    expect(value5).toBeUndefined()
  })

  test('getJsonFormsPropertyAsNumber', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsNumber(command, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsNumber(command, 'key3.1')
    expect(value2).toStrictEqual(1000)

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsNumber(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsNumber(command, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('findJsonFormsPropertyAsNumber', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsNumber(command, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsNumber(command, 'key3.1')
    expect(value2).toStrictEqual(1000)

    const value3 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsNumber(command, 'key_xxxxxxx')
    expect(value3).toBeUndefined()

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsNumber(command, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('getJsonFormsPropertyAsBoolean', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsBoolean(command, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsBoolean(command, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsBoolean(command, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsBoolean(command, 'key4.3')
    expect(value4).toStrictEqual(false)

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsBoolean(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsBoolean(command, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('findJsonFormsPropertyAsBoolean', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsBoolean(command, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsBoolean(command, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsBoolean(command, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsBoolean(command, 'key4.3')
    expect(value4).toStrictEqual(false)

    const value5 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsBoolean(command, 'key_xxxxxxx')
    expect(value5).toBeUndefined()

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsBoolean(command, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('getJsonFormsPropertyAsDate', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsDate(command, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsDate(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsDate(command, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('findJsonFormsPropertyAsDate', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsDate(command, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsDate(command, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsDate(command, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('getJsonFormsPropertyAsJsonFormsFile', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsJsonFormsFile(command, 'key6')
    expect(value).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsJsonFormsFile(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsJsonFormsFile(command, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('findJsonFormsPropertyAsJsonFormsFile', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsJsonFormsFile(command, 'key6')
    expect(value1).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsJsonFormsFile(command, 'key_xxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsJsonFormsFile(command, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('getJsonFormsPropertyAsJsonFormsPrincipal', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsJsonFormsPrincipal(command, 'key7')
    expect(value).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsJsonFormsPrincipal(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsJsonFormsPrincipal(command, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('findJsonFormsPropertyAsJsonFormsPrincipal', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsJsonFormsPrincipal(command, 'key7')
    expect(value1).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsJsonFormsPrincipal(
      command,
      'key_xxxxxxx',
    )
    expect(value2).toBeUndefined()

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsJsonFormsPrincipal(command, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('getJsonFormsPropertyAsArray', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsArray(command, 'key3')
    expect(value1).toStrictEqual([500, '1000'])

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsArray(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsArray(command, 'key1')
    }).toThrow('Property key1 is not an array')
  })

  test('getJsonFormsPropertyAsObject', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsObject(command, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsObject(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.getJsonFormsPropertyAsObject(command, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('findJsonFormsPropertyAsObject', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()

    const value1 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsObject(command, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    const value2 = TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsObject(command, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TaskSaveJsonFormsValueDataCommandUtils.findJsonFormsPropertyAsObject(command, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('updateJsonFormsProperty', () => {
    const command = prepareTaskSaveJsonFormsValueDataCommand()
    command.data = {}

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

    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key1', 'text')
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key2.0.key1', true)
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key2.0.key2', new Date('2020-01-01'))
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key2.1.key1', false)
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key2.1.key2', new Date('3030-01-01'))
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key3', 100)
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key4', file)
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key5', principal)

    expect(command.data).toStrictEqual({
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

    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key1', undefined)
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key2.0', undefined)
    TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key2.0.key1', undefined)

    expect(command.data).toStrictEqual({
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
      TaskSaveJsonFormsValueDataCommandUtils.updateJsonFormsProperty(command, 'key2.100.key1', undefined)
    }).toThrow("Property key2.100.key1 doesn't exist")
  })
})

function prepareTaskSaveJsonFormsValueDataCommand(): TaskSaveJsonFormsValueDataCommand {
  return {
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
  }
}
