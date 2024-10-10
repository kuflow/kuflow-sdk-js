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

import { mockTenant, mockTenantPage } from './utils/fixtures'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /tenants', () => {
  describe('GET /tenants', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenants')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, {})

      await kuFlowRestClient.tenantOperations.findTenants()

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockTenantPage()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenants')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const tenants = await kuFlowRestClient.tenantOperations.findTenants()

      scope.done()

      expect(tenants).toStrictEqual(expectedObject)
    })

    test('Check that unknown properties body are ignored', async () => {
      const expectedObject = mockTenantPage()
      const expectedObjectAny = expectedObject as any // eslint-disable-line @typescript-eslint/no-explicit-any
      expectedObjectAny.dummy = 'value'

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenants')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const tenants = await kuFlowRestClient.tenantOperations.findTenants()

      scope.done()

      expect(tenants).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenants')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          tenantId: '57899ffe-537e-4a08-ba15-129774a6af17',
        })
        .reply(200, {})

      await kuFlowRestClient.tenantOperations.findTenants({
        size: 30,
        page: 1,
        sort: 'sort1',
        tenantId: '57899ffe-537e-4a08-ba15-129774a6af17',
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with single values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenants')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          tenantId: '57899ffe-537e-4a08-ba15-129774a6af17',
        })
        .reply(200, {})

      await kuFlowRestClient.tenantOperations.findTenants({
        size: 30,
        page: 1,
        sort: ['sort1'],
        tenantId: ['57899ffe-537e-4a08-ba15-129774a6af17'],
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with multiple values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/tenants')
        .query({
          size: 30,
          page: 1,
          sort: ['sort1', 'sort2,&%'],
          tenantId: ['57899ffe-537e-4a08-ba15-129774a6af17', '60c892d2-bf8e-4030-86a7-fca6700d88d3'],
        })
        .reply(200, {})

      await kuFlowRestClient.tenantOperations.findTenants({
        size: 30,
        page: 1,
        sort: ['sort1', 'sort2,&%'],
        tenantId: ['57899ffe-537e-4a08-ba15-129774a6af17', '60c892d2-bf8e-4030-86a7-fca6700d88d3'],
      })

      scope.done()
    })

    describe('GET /tenants/{id}', () => {
      test('Check that security header is added', async () => {
        const scope = nock('https://api.kuflow.com/v2024-06-14')
          .get('/tenants/754d10c6-e9ef-4a9e-9df7-ab146fa28004')
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {})

        await kuFlowRestClient.tenantOperations.retrieveTenant('754d10c6-e9ef-4a9e-9df7-ab146fa28004')

        scope.done()
      })

      test('Check happy path', async () => {
        const expectedObject = mockTenant()
        const scope = nock('https://api.kuflow.com/v2024-06-14')
          .get(`/tenants/${expectedObject.id}`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, expectedObject)

        const tenant = await kuFlowRestClient.tenantOperations.retrieveTenant(expectedObject.id ?? '')

        scope.done()

        expect(tenant).toStrictEqual(expectedObject)
      })
    })
  })
})
