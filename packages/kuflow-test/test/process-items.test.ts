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
  type JsonPatchOperation,
  KuFlowRestClient,
  type ProcessItemCreateParams,
  type ProcessItemTaskAssignParams,
  type ProcessItemTaskDataUpdateParams,
} from '@kuflow/kuflow-rest'
import { randomUUID } from 'crypto'
import nock from 'nock'

import { mockProcessItem } from './utils/fixtures'
import { streamToString } from './utils/stream'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /process-items', () => {
  describe('GET /process-items', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/process-items')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, {})

      await kuFlowRestClient.processItemOperations.findProcessItems()

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockProcessItem()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/process-items')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processItemOperations.findProcessItems()

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/process-items')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          processId: 'a0ae7688-eb96-4c0b-94fc-0e998610e9c9',
          type: 'TASK',
          taskState: 'READY',
          taskDefinitionCode: 'CODE',
        })
        .reply(200, {})

      await kuFlowRestClient.processItemOperations.findProcessItems({
        size: 30,
        page: 1,
        sort: 'sort1',
        processId: 'a0ae7688-eb96-4c0b-94fc-0e998610e9c9',
        type: 'TASK',
        taskState: 'READY',
        taskDefinitionCode: 'CODE',
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with single values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/process-items')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          processId: 'a0ae7688-eb96-4c0b-94fc-0e998610e9c9',
          type: 'TASK',
          taskState: 'READY',
          taskDefinitionCode: 'CODE',
        })
        .reply(200, {})

      await kuFlowRestClient.processItemOperations.findProcessItems({
        size: 30,
        page: 1,
        sort: ['sort1'],
        processId: ['a0ae7688-eb96-4c0b-94fc-0e998610e9c9'],
        type: ['TASK'],
        taskState: ['READY'],
        taskDefinitionCode: ['CODE'],
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with multiple values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/process-items')
        .query({
          size: 30,
          page: 1,
          sort: ['sort1', 'sort2,&%'],
          processId: ['a0ae7688-eb96-4c0b-94fc-0e998610e9c9', 'f5b088a4-be04-44e2-b1be-3a5eefdbf6b2'],
          type: ['TASK', 'MESSAGE'],
          taskState: ['READY', 'CLAIMED'],
          taskDefinitionCode: ['CODE_1', 'CODE_2'],
        })
        .reply(200, {})

      await kuFlowRestClient.processItemOperations.findProcessItems({
        size: 30,
        page: 1,
        sort: ['sort1', 'sort2,&%'],
        processId: ['a0ae7688-eb96-4c0b-94fc-0e998610e9c9', 'f5b088a4-be04-44e2-b1be-3a5eefdbf6b2'],
        type: ['TASK', 'MESSAGE'],
        taskState: ['READY', 'CLAIMED'],
        taskDefinitionCode: ['CODE_1', 'CODE_2'],
      })

      scope.done()
    })
  })

  describe('POST /process-items', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcessItem()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post('/process-items')
        .reply(200, JSON.stringify(expectedObject))

      const params: ProcessItemCreateParams = {
        id: expectedObject.id,
        type: expectedObject.type,
        processId: expectedObject.processId,
        ownerId: expectedObject.ownerId,
      }
      const processItem = await kuFlowRestClient.processItemOperations.createProcessItem(params)

      scope.done()

      expect(processItem).toStrictEqual(expectedObject)
    })

    test('Check happy path when task is untouched', async () => {
      const expectedObject = mockProcessItem()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post('/process-items')
        .reply(201, JSON.stringify(expectedObject))

      const params: ProcessItemCreateParams = {
        id: expectedObject.id,
        type: expectedObject.type,
        processId: expectedObject.processId,
        ownerId: expectedObject.ownerId,
      }
      const processItem = await kuFlowRestClient.processItemOperations.createProcessItem(params)

      scope.done()

      expect(processItem).toStrictEqual(expectedObject)
    })
  })

  describe('GET /process-items/{id}', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcessItem()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/process-items/${expectedObject.id}`)
        .reply(200, JSON.stringify(expectedObject))

      const processItem = await kuFlowRestClient.processItemOperations.retrieveProcessItem(expectedObject.id)

      scope.done()

      expect(processItem).toStrictEqual(expectedObject)
    })
  })

  describe('POST /process-items/{id}/task/~actions/claim', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcessItem()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/process-items/${expectedObject.id}/task/~actions/claim`)
        .reply(200, JSON.stringify(expectedObject))

      const processItem = await kuFlowRestClient.processItemOperations.claimProcessItemTask(expectedObject.id)

      scope.done()

      expect(processItem).toStrictEqual(expectedObject)
    })
  })

  describe('POST /process-items/{id}/task/~actions/assign', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcessItem()
      const params: ProcessItemTaskAssignParams = {
        ownerEmail: 'email@example.com',
      }
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/process-items/${expectedObject.id}/task/~actions/assign`, body => {
          return body.ownerEmail === params.ownerEmail && body.ownerId === params.ownerId
        })
        .reply(200, JSON.stringify(expectedObject))

      const processItem = await kuFlowRestClient.processItemOperations.assignProcessItemTask(expectedObject.id, params)

      scope.done()

      expect(processItem).toStrictEqual(expectedObject)
    })
  })

  describe('PUT /process-items/{id}/task/data', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcessItem()
      const params: ProcessItemTaskDataUpdateParams = {
        data: {
          value: {
            key: 'value',
          },
        },
      }
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .put(`/process-items/${expectedObject.id}/task/data`, body => {
          return body.data.value.key === 'value'
        })
        .reply(200, JSON.stringify(expectedObject))

      const processItem = await kuFlowRestClient.processItemOperations.updateProcessItemTaskData(
        expectedObject.id,
        params,
      )

      scope.done()

      expect(processItem).toStrictEqual(expectedObject)
    })
  })

  describe('PATCH /process-items/{id}/task/data', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcessItem()
      const params: JsonPatchOperation[] = [
        {
          op: 'add',
          path: '/property',
          value: 'value',
        },
      ]
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .patch(`/process-items/${expectedObject.id}/task/data`, body => {
          return body.length === 1 && body[0].value === 'value'
        })
        .reply(200, JSON.stringify(expectedObject))

      const processItem = await kuFlowRestClient.processItemOperations.patchProcessItemTaskData(
        expectedObject.id,
        params,
      )

      scope.done()

      expect(processItem).toStrictEqual(expectedObject)
    })
  })

  describe('GET /process-items/{id}/task/data/~actions/download-webforms-as-document', () => {
    test('Check happy path', async () => {
      const processItemId = randomUUID()
      const propertyPath = '/user/name'
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/process-items/${processItemId}/task/data/~actions/download-webforms-as-document`)
        .query({
          propertyPath,
        })
        .reply(200, '{}')

      const download = await kuFlowRestClient.processItemOperations.downloadProcessItemTaskDataWebformsAsDocument(
        processItemId,
        propertyPath,
      )

      scope.done()

      expect(download.readableStreamBody).toBeTruthy()
      if (download.readableStreamBody == null) {
        return
      }

      const body = await streamToString(download.readableStreamBody)

      expect(body).toStrictEqual('{}')
    })
  })
})
