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
import { KuFlowRestClient, type WorkerCreateParams } from '@kuflow/kuflow-rest'
import nock from 'nock'

import { mockWorker } from './utils/fixtures'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /workers', () => {
  describe('POST /workers', () => {
    test('Check happy path', async () => {
      const expectedObject = mockWorker()
      const workerCreateParams: WorkerCreateParams = {
        identity: expectedObject.identity,
        taskQueue: expectedObject.taskQueue,
        workflowTypes: expectedObject.workflowTypes,
        activityTypes: expectedObject.activityTypes,
        hostname: expectedObject.hostname,
        ip: expectedObject.ip,
        tenantId: expectedObject.tenantId,
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(
          '/workers',
          body => body.identity === workerCreateParams.identity && body.taskQueue === workerCreateParams.taskQueue,
        )
        .matchHeader('authorization', 'Bearer ' + token)
        .reply(201, JSON.stringify(expectedObject))

      const worker = await kuFlowRestClient.workerOperations.createWorker(workerCreateParams)

      scope.done()

      expect(worker).toStrictEqual(expectedObject)
    })
  })
})
