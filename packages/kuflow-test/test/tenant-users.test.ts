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
import { KuFlowRestClient } from '@kuflow/kuflow-rest'
import nock from 'nock'

import { mockPrincipalPage, mockTenantUser } from './utils/fixtures'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /tenant-users', () => {
  describe('GET /tenant-users', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenant-users')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, {})

      await kuFlowRestClient.tenantUserOperations.findTenantUsers()

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockPrincipalPage()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenant-users')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const principals = await kuFlowRestClient.tenantUserOperations.findTenantUsers()

      scope.done()

      expect(principals).toStrictEqual(expectedObject)
    })

    test('Check that unknown properties body are ignored', async () => {
      const expectedObject = mockPrincipalPage()
      const expectedObjectAny = expectedObject as any // eslint-disable-line @typescript-eslint/no-explicit-any
      expectedObjectAny.dummy = 'value'
      expectedObjectAny.metadata.dummy = 'value2'

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenant-users')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const principals = await kuFlowRestClient.tenantUserOperations.findTenantUsers()

      scope.done()

      expect(principals).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenant-users')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          groupId: 'dfa200e4-1876-4056-ab09-690bce3057f5',
          email: 'test@test.com',
        })
        .reply(200, {})

      await kuFlowRestClient.tenantUserOperations.findTenantUsers({
        size: 30,
        page: 1,
        sort: 'sort1',
        groupId: 'dfa200e4-1876-4056-ab09-690bce3057f5',
        email: 'test@test.com',
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with single values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenant-users')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          groupId: 'dfa200e4-1876-4056-ab09-690bce3057f5',
          email: 'test@test.com',
        })
        .reply(200, {})

      await kuFlowRestClient.tenantUserOperations.findTenantUsers({
        size: 30,
        page: 1,
        sort: ['sort1'],
        groupId: ['dfa200e4-1876-4056-ab09-690bce3057f5'],
        email: ['test@test.com'],
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with multiple values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenant-users')
        .query({
          size: 30,
          page: 1,
          sort: ['sort1', 'sort2,&%'],
          groupId: ['dfa200e4-1876-4056-ab09-690bce3057f5', '60c892d2-bf8e-4030-86a7-fca6700d88d3'],
          email: ['test1@test.com', 'test2@test.com'],
        })
        .reply(200, {})

      await kuFlowRestClient.tenantUserOperations.findTenantUsers({
        size: 30,
        page: 1,
        sort: ['sort1', 'sort2,&%'],
        groupId: ['dfa200e4-1876-4056-ab09-690bce3057f5', '60c892d2-bf8e-4030-86a7-fca6700d88d3'],
        email: ['test1@test.com', 'test2@test.com'],
      })

      scope.done()
    })
  })

  describe('GET /tenant-users/{id}', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenant-users/754d10c6-e9ef-4a9e-9df7-ab146fa28004')
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {})

      await kuFlowRestClient.tenantUserOperations.retrieveTenantUser('754d10c6-e9ef-4a9e-9df7-ab146fa28004')

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockTenantUser()
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/tenant-users/${expectedObject.id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, expectedObject)

      const principal = await kuFlowRestClient.tenantUserOperations.retrieveTenantUser(expectedObject.id ?? '')

      scope.done()

      expect(principal).toStrictEqual(expectedObject)
    })
  })
})
