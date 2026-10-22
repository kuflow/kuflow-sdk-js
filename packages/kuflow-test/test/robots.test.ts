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
import { randomUUID } from 'crypto'
import nock from 'nock'

import { mockRobot, mockRobotPage } from './utils/fixtures'
import { streamToString } from './utils/stream'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /robots', () => {
  describe('GET /robots', () => {
    test('Check happy path', async () => {
      const expectedObject = mockRobotPage()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/robots')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const robots = await kuFlowRestClient.robotOperations.findRobots()

      scope.done()

      expect(robots).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized', async () => {
      const tenantId = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/robots')
        .query({ size: 30, page: 1, sort: ['sort1', 'sort2'], tenantId, filterContext: 'READY' })
        .reply(200, {})

      await kuFlowRestClient.robotOperations.findRobots({
        size: 30,
        page: 1,
        sort: ['sort1', 'sort2'],
        tenantId,
        filterContext: 'READY',
      })

      scope.done()
    })
  })

  describe('GET /robots/{id}', () => {
    test('Check happy path', async () => {
      const expectedObject = mockRobot()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/robots/${expectedObject.id}`)
        .reply(200, JSON.stringify(expectedObject))

      const robot = await kuFlowRestClient.robotOperations.retrieveRobot(expectedObject.id)

      scope.done()

      expect(robot).toStrictEqual(expectedObject)
    })
  })

  describe('GET /robots/{id}/~actions/download-source-code', () => {
    test('Check happy path', async () => {
      const robotId = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/robots/${robotId}/~actions/download-source-code`)
        .reply(200, 'source-code')

      const download = await kuFlowRestClient.robotOperations.downloadRobotSourceCode(robotId)

      scope.done()

      expect(download.readableStreamBody).toBeTruthy()
      if (download.readableStreamBody == null) {
        return
      }

      const body = await streamToString(download.readableStreamBody)

      expect(body).toStrictEqual('source-code')
    })
  })

  describe('GET /robots/{id}/~actions/download-asset', () => {
    test('Check happy path', async () => {
      const robotId = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/robots/${robotId}/~actions/download-asset`)
        .query({ type: 'PYTHON', version: '3.12', platform: 'LINUX', architecture: 'X86_64' })
        .reply(200, 'asset')

      const download = await kuFlowRestClient.robotOperations.downloadRobotAsset(
        robotId,
        'PYTHON',
        '3.12',
        'LINUX',
        'X86_64',
      )

      scope.done()

      expect(download.readableStreamBody).toBeTruthy()
      if (download.readableStreamBody == null) {
        return
      }

      const body = await streamToString(download.readableStreamBody)

      expect(body).toStrictEqual('asset')
    })
  })
})
