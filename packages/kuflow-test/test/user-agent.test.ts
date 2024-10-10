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

import { version } from './utils/version'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API User Agent', () => {
  test('Check User Agent', async () => {
    const userAgent = `sdk-js-kuflow-rest/${version}`

    const scope = nock('https://api.kuflow.com/v2024-06-14')
      .get('/tenants')
      .matchHeader('authorization', 'Bearer ' + token)
      .query({ size: 25, page: 0 })
      .reply(function (uri, requestBody) {
        expect(this.req.headers['user-agent']).toContain(userAgent)
        return [200, {}]
      })

    await kuFlowRestClient.tenantOperations.findTenants()

    scope.done()
  })
})
