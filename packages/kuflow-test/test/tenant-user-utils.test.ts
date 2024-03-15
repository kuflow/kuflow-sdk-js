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
import { type JsonFormsFile, type JsonFormsPrincipal, type TenantUser, TenantUserUtils } from '@kuflow/kuflow-rest'

describe('Tenant User Utils', () => {
  test('getMetadataPropertyAsString', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.getMetadataPropertyAsString(tenantUser, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = TenantUserUtils.getMetadataPropertyAsString(tenantUser, 'key2.key2_key1.0.key2_key1_key2')
    expect(value2).toStrictEqual('value_key2_key1_key2')

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsString(tenantUser, 'key2.key2_key1.0.unknown')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsString(tenantUser, 'key2.key2_key1.10')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsString(tenantUser, 'key2.key2_key1.100.key2_key1_key2')
    }).toThrow("Property value doesn't exist")
  })

  test('findMetadataPropertyAsString', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.findMetadataPropertyAsString(tenantUser, 'key1')
    expect(value1).toStrictEqual('value_key1')

    const value2 = TenantUserUtils.findMetadataPropertyAsString(tenantUser, 'key2.key2_key1.0.key2_key1_key2')
    expect(value2).toStrictEqual('value_key2_key1_key2')

    const value3 = TenantUserUtils.findMetadataPropertyAsString(tenantUser, 'key2.key2_key1.0.unknown')
    expect(value3).toBeUndefined()

    const value4 = TenantUserUtils.findMetadataPropertyAsString(tenantUser, 'key2.key2_key1.10')
    expect(value4).toBeUndefined()

    const value5 = TenantUserUtils.findMetadataPropertyAsString(tenantUser, 'key2.key2_key1.100.key2_key1_key2')
    expect(value5).toBeUndefined()
  })

  test('getMetadataPropertyAsNumber', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.getMetadataPropertyAsNumber(tenantUser, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = TenantUserUtils.getMetadataPropertyAsNumber(tenantUser, 'key3.1')
    expect(value2).toStrictEqual(1000)

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsNumber(tenantUser, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsNumber(tenantUser, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('findMetadataPropertyAsNumber', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.findMetadataPropertyAsNumber(tenantUser, 'key3.0')
    expect(value1).toStrictEqual(500)

    const value2 = TenantUserUtils.findMetadataPropertyAsNumber(tenantUser, 'key3.1')
    expect(value2).toStrictEqual(1000)

    const value3 = TenantUserUtils.findMetadataPropertyAsNumber(tenantUser, 'key_xxxxxxx')
    expect(value3).toBeUndefined()

    expect(() => {
      TenantUserUtils.findMetadataPropertyAsNumber(tenantUser, 'key1')
    }).toThrow('Property key1 is not a number')
  })

  test('getMetadataPropertyAsBoolean', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.getMetadataPropertyAsBoolean(tenantUser, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = TenantUserUtils.getMetadataPropertyAsBoolean(tenantUser, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = TenantUserUtils.getMetadataPropertyAsBoolean(tenantUser, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = TenantUserUtils.getMetadataPropertyAsBoolean(tenantUser, 'key4.3')
    expect(value4).toStrictEqual(false)

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsBoolean(tenantUser, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsBoolean(tenantUser, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('findMetadataPropertyAsBoolean', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.findMetadataPropertyAsBoolean(tenantUser, 'key4.0')
    expect(value1).toStrictEqual(true)

    const value2 = TenantUserUtils.findMetadataPropertyAsBoolean(tenantUser, 'key4.1')
    expect(value2).toStrictEqual(false)

    const value3 = TenantUserUtils.findMetadataPropertyAsBoolean(tenantUser, 'key4.2')
    expect(value3).toStrictEqual(true)

    const value4 = TenantUserUtils.findMetadataPropertyAsBoolean(tenantUser, 'key4.3')
    expect(value4).toStrictEqual(false)

    const value5 = TenantUserUtils.findMetadataPropertyAsBoolean(tenantUser, 'key_xxxxxxx')
    expect(value5).toBeUndefined()

    expect(() => {
      TenantUserUtils.findMetadataPropertyAsBoolean(tenantUser, 'key1')
    }).toThrow('Property key1 is not a boolean')
  })

  test('getMetadataPropertyAsDate', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.getMetadataPropertyAsDate(tenantUser, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsDate(tenantUser, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsDate(tenantUser, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('findMetadataPropertyAsDate', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.findMetadataPropertyAsDate(tenantUser, 'key5.0')
    expect(value1).toStrictEqual(new Date('2000-01-01'))

    const value2 = TenantUserUtils.findMetadataPropertyAsDate(tenantUser, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TenantUserUtils.findMetadataPropertyAsDate(tenantUser, 'key1')
    }).toThrow('Property key1 is not a date following ISO 8601 format')
  })

  test('getMetadataPropertyAsJsonFormsFile', () => {
    const tenantUser = prepareTenantUser()

    const value = TenantUserUtils.getMetadataPropertyAsJsonFormsFile(tenantUser, 'key6')
    expect(value).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsJsonFormsFile(tenantUser, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsJsonFormsFile(tenantUser, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('findMetadataPropertyAsJsonFormsFile', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.findMetadataPropertyAsJsonFormsFile(tenantUser, 'key6')
    expect(value1).toStrictEqual({
      uri: 'xxx-yyy-zzz',
      type: 'application/pdf',
      name: 'dummy.pdf',
      size: 500,
    })

    const value2 = TenantUserUtils.findMetadataPropertyAsJsonFormsFile(tenantUser, 'key_xxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TenantUserUtils.findMetadataPropertyAsJsonFormsFile(tenantUser, 'key1')
    }).toThrow('Property key1 is not a file')
  })

  test('getMetadataPropertyAsJsonFormsPrincipal', () => {
    const tenantUser = prepareTenantUser()

    const value = TenantUserUtils.getMetadataPropertyAsJsonFormsPrincipal(tenantUser, 'key7')
    expect(value).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsJsonFormsPrincipal(tenantUser, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsJsonFormsPrincipal(tenantUser, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('findMetadataPropertyAsJsonFormsPrincipal', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.findMetadataPropertyAsJsonFormsPrincipal(tenantUser, 'key7')
    expect(value1).toStrictEqual({
      id: 'xxx-yyy-zzz',
      type: 'USER',
      name: 'Homer Simpson',
    })

    const value2 = TenantUserUtils.findMetadataPropertyAsJsonFormsPrincipal(tenantUser, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TenantUserUtils.findMetadataPropertyAsJsonFormsPrincipal(tenantUser, 'key1')
    }).toThrow('Property key1 is not a principal')
  })

  test('getMetadataPropertyAsArray', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.getMetadataPropertyAsArray(tenantUser, 'key3')
    expect(value1).toStrictEqual([500, '1000'])

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsArray(tenantUser, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsArray(tenantUser, 'key1')
    }).toThrow('Property key1 is not an array')
  })

  test('getMetadataPropertyAsObject', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.getMetadataPropertyAsObject(tenantUser, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsObject(tenantUser, 'key_xxxxxxx')
    }).toThrow("Property value doesn't exist")

    expect(() => {
      TenantUserUtils.getMetadataPropertyAsObject(tenantUser, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('findMetadataPropertyAsObject', () => {
    const tenantUser = prepareTenantUser()

    const value1 = TenantUserUtils.findMetadataPropertyAsObject(tenantUser, 'key2.key2_key1.0')
    expect(value1).toStrictEqual({
      key2_key1_key1: 0,
      key2_key1_key2: 'value_key2_key1_key2',
    })

    const value2 = TenantUserUtils.findMetadataPropertyAsObject(tenantUser, 'key_xxxxxxx')
    expect(value2).toBeUndefined()

    expect(() => {
      TenantUserUtils.findMetadataPropertyAsObject(tenantUser, 'key1')
    }).toThrow('Property key1 is not an object')
  })

  test('updateJsonFormsProperty', () => {
    const tenantUser = prepareTenantUser()
    if (tenantUser.metadata != null) {
      tenantUser.metadata.value = {}
    }

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

    TenantUserUtils.updateMetadataProperty(tenantUser, 'key1', 'text')
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key2.0.key1', true)
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key2.0.key2', new Date('2020-01-01'))
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key2.1.key1', false)
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key2.1.key2', new Date('3030-01-01'))
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key3', 100)
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key4', file)
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key5', principal)

    expect(tenantUser.metadata?.value).toStrictEqual({
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

    TenantUserUtils.updateMetadataProperty(tenantUser, 'key1', undefined)
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key2.0', undefined)
    TenantUserUtils.updateMetadataProperty(tenantUser, 'key2.0.key1', undefined)

    expect(tenantUser.metadata?.value).toStrictEqual({
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
      TenantUserUtils.updateMetadataProperty(tenantUser, 'key2.100.key1', undefined)
    }).toThrow("Property key2.100.key1 doesn't exist")
  })
})

function prepareTenantUser(): TenantUser {
  return {
    id: 'e68d8136-1166-455c-93d6-d106201c1856',
    metadata: {
      valid: true,
      value: {
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
    principal: {
      id: 'bbe5bef3-1c56-4584-b6c3-118161189c1c',
      type: 'USER',
      name: 'Name Surname',
      user: {
        id: 'd1518f19-9710-4379-a040-c51b7ad1adcb',
        email: 'test@test.com',
      },
    },
    tenantId: 'e3474f22-773f-4054-8277-77415e2d339e',
  }
}
