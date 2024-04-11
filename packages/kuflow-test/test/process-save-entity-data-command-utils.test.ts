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
  type ProcessSaveEntityDataCommand,
  ProcessSaveEntityDataCommandUtils,
} from '@kuflow/kuflow-rest'

describe('Process Save Entity Data Command Utils', () => {
  test('getEntityPropertyAsString', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsString(command, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsString(
      command,
      'key2.key2_key1.0.key2_key1_key2',
    )
    expect(value2).toStrictEqual('value_key2_key1_key2')

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsString(command, 'key2.key2_key1.0.unknown')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsString(command, 'key2.key2_key1.10')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsString(command, 'key2.key2_key1.100.key2_key1_key2')
    }).toThrow("Property value doesn't exist")
  })

  test('findEntityPropertyAsString', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsString(command, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsString(
      command,
      'key2.key2_key1.0.key2_key1_key2',
    )
    expect(value2).toStrictEqual('value_key2_key1_key2')

    const value3 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsString(command, 'key2.key2_key1.0.unknown')
    expect(value3).toBeUndefined()

    const value4 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsString(command, 'key2.key2_key1.10')
    expect(value4).toBeUndefined()

    const value5 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsString(
      command,
      'key2.key2_key1.100.key2_key1_key2',
    )
    expect(value5).toBeUndefined()
  })

  test('getEntityPropertyAsNumber', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsNumber(command, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsNumber(command, 'key3.1')
    expect(value2).toStrictEqual(1000)

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsNumber(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsNumber(command, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('findEntityPropertyAsNumber', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsNumber(command, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsNumber(command, 'key3.1')
    expect(value2).toStrictEqual(1000)

    const value3 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsNumber(command, 'key_xxxxxxx')
    expect(value3).toBeUndefined()

    expect(() => {
      ProcessSaveEntityDataCommandUtils.findEntityPropertyAsNumber(command, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('getEntityPropertyAsBoolean', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsBoolean(command, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsBoolean(command, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsBoolean(command, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsBoolean(command, 'key4.3')
    expect(value4).toStrictEqual(false)

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsBoolean(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsBoolean(command, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('findEntityPropertyAsBoolean', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsBoolean(command, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsBoolean(command, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsBoolean(command, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsBoolean(command, 'key4.3')
    expect(value4).toStrictEqual(false)

    const value5 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsBoolean(command, 'key_xxxxxxx')
    expect(value5).toBeUndefined()

    expect(() => {
      ProcessSaveEntityDataCommandUtils.findEntityPropertyAsBoolean(command, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('getEntityPropertyAsDate', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsDate(command, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsDate(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsDate(command, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('findEntityPropertyAsDate', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsDate(command, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    const value2 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsDate(command, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      ProcessSaveEntityDataCommandUtils.findEntityPropertyAsDate(command, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('getEntityPropertyAsJsonFormsFile', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsJsonFormsFile(command, 'key6')
    expect(value).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsJsonFormsFile(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsJsonFormsFile(command, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('findEntityPropertyAsJsonFormsFile', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsJsonFormsFile(command, 'key6')
    expect(value1).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    const value2 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsJsonFormsFile(command, 'key_xxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      ProcessSaveEntityDataCommandUtils.findEntityPropertyAsJsonFormsFile(command, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('getEntityPropertyAsJsonFormsPrincipal', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsJsonFormsPrincipal(command, 'key7')
    expect(value).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsJsonFormsPrincipal(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsJsonFormsPrincipal(command, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('findEntityPropertyAsJsonFormsPrincipal', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsJsonFormsPrincipal(command, 'key7')
    expect(value1).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    const value2 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsJsonFormsPrincipal(command, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      ProcessSaveEntityDataCommandUtils.findEntityPropertyAsJsonFormsPrincipal(command, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('getEntityPropertyAsArray', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsArray(command, 'key3')
    expect(value1).toStrictEqual([500, '1000'])

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsArray(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsArray(command, 'key1')
    }).toThrow('Property key1 is not an array')
  })

  test('getEntityPropertyAsObject', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.getEntityPropertyAsObject(command, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsObject(command, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      ProcessSaveEntityDataCommandUtils.getEntityPropertyAsObject(command, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('findEntityPropertyAsObject', () => {
    const command = prepareProcessSaveEntityDataCommand()

    const value1 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsObject(command, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    const value2 = ProcessSaveEntityDataCommandUtils.findEntityPropertyAsObject(command, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      ProcessSaveEntityDataCommandUtils.findEntityPropertyAsObject(command, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('updateEntityProperty', () => {
    const command = prepareProcessSaveEntityDataCommand()
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

    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key1', 'text')
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key2.0.key1', true)
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key2.0.key2', new Date('2020-01-01'))
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key2.1.key1', false)
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key2.1.key2', new Date('3030-01-01'))
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key3', 100)
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key4', file)
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key5', principal)

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

    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key1', undefined)
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key2.0', undefined)
    ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key2.0.key1', undefined)

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
      ProcessSaveEntityDataCommandUtils.updateEntityProperty(command, 'key2.100.key1', undefined)
    }).toThrow("Property key2.100.key1 doesn't exist")
  })
})

function prepareProcessSaveEntityDataCommand(): ProcessSaveEntityDataCommand {
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
