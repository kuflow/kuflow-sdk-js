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
  type Document,
  type JsonPatchOperation,
  KuFlowRestClient,
  type ProcessActionCreateParams,
  type ProcessChangeInitiatorParams,
  type ProcessCreateParams,
  type ProcessEntityUpdateParams,
  type ProcessMetadataUpdateParams,
  type ProcessUploadProcessDocumentResponse,
} from '@kuflow/kuflow-rest'
import { randomUUID } from 'crypto'
import nock from 'nock'

import { mockProcess, mockProcessAction, mockProcessCreateParams, mockProcessPage } from './utils/fixtures'
import { streamToString } from './utils/stream'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /processes', () => {
  describe('GET /processes', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/processes')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, {})

      await kuFlowRestClient.processOperations.findProcesses()

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockProcessPage()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/processes')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.findProcesses()

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/processes')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
        })
        .reply(200, {})

      await kuFlowRestClient.processOperations.findProcesses({
        size: 30,
        page: 1,
        sort: 'sort1',
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with single values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/processes')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
        })
        .reply(200, {})

      await kuFlowRestClient.processOperations.findProcesses({
        size: 30,
        page: 1,
        sort: ['sort1'],
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with multiple values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/processes')
        .query({
          size: 30,
          page: 1,
          sort: ['sort1', 'sort2,&%'],
        })
        .reply(200, {})

      await kuFlowRestClient.processOperations.findProcesses({
        size: 30,
        page: 1,
        sort: ['sort1', 'sort2,&%'],
      })

      scope.done()
    })

    test('Check that state, initiator and metadata filter query params are correctly serialized', async () => {
      const processDefinitionId = randomUUID()
      const initiatorId = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/processes')
        .query({
          size: 25,
          page: 0,
          processDefinitionId,
          state: ['RUNNING', 'COMPLETED'],
          initiatorId,
          initiatorEmail: 'sample@kuflow.com',
          metadata: 'FIELD eq 1',
        })
        .reply(200, {})

      await kuFlowRestClient.processOperations.findProcesses({
        processDefinitionId,
        state: ['RUNNING', 'COMPLETED'],
        initiatorId,
        initiatorEmail: 'sample@kuflow.com',
        metadata: 'FIELD eq 1',
      })

      scope.done()
    })

    test('Check that deleted processes filter query params are correctly serialized', async () => {
      const processDefinitionId = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/processes')
        .query({
          size: 25,
          page: 0,
          processDefinitionId,
          deleted: 'INCLUDE',
        })
        .reply(200, {})

      await kuFlowRestClient.processOperations.findProcesses({
        processDefinitionId,
        deleted: 'INCLUDE',
      })

      scope.done()
    })
  })

  describe('POST /processes', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post('/processes')
        .matchHeader('authorization', 'Bearer ' + token)
        .reply(200, {})

      const processCreateParams = mockProcessCreateParams()
      await kuFlowRestClient.processOperations.createProcess(processCreateParams)

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockProcess()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post('/processes')
        .reply(200, JSON.stringify(expectedObject))

      const processCreateParams: ProcessCreateParams = {
        id: expectedObject.id,
        processDefinitionId: expectedObject.processDefinitionRef?.id ?? '',
        metadata: expectedObject.metadata,
      }

      const processes = await kuFlowRestClient.processOperations.createProcess(processCreateParams)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })

    test('Check happy path if already created', async () => {
      const expectedObject = mockProcess()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post('/processes')
        .reply(201, JSON.stringify(expectedObject))

      const processCreateParams: ProcessCreateParams = {
        id: expectedObject.id,
        processDefinitionId: expectedObject.processDefinitionRef?.id ?? '',
        metadata: expectedObject.metadata,
      }

      const processes = await kuFlowRestClient.processOperations.createProcess(processCreateParams)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/processes/${expectedObject.id}`)
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.retrieveProcess(expectedObject.id ?? '')

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/change-initiator', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const params: ProcessChangeInitiatorParams = {
        initiatorEmail: 'sample@kuflow.com',
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(
          `/processes/${expectedObject.id}/~actions/change-initiator`,
          body => body.initiatorEmail === params.initiatorEmail,
        )
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.changeProcessInitiator(expectedObject.id, params)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('PUT /processes/{id}/metadata', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const params: ProcessMetadataUpdateParams = {
        metadata: {
          value: {
            key: 'value',
          },
        },
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .put(`/processes/${expectedObject.id}/metadata`, () => params.metadata.value.key === 'value')
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.updateProcessMetadata(expectedObject.id, params)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/complete', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/processes/${expectedObject.id}/~actions/complete`)
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.completeProcess(expectedObject.id)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/cancel', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/processes/${expectedObject.id}/~actions/cancel`)
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.cancelProcess(expectedObject.id)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('PATCH /processes/{id}/metadata', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const jsonPatch: JsonPatchOperation[] = [{ op: 'replace', path: '/CODE_1', value: 'value' }]

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .patch(`/processes/${expectedObject.id}/metadata`, body => body.length === 1 && body[0].path === '/CODE_1')
        .reply(200, JSON.stringify(expectedObject))

      const process = await kuFlowRestClient.processOperations.patchProcessMetadata(expectedObject.id, jsonPatch)

      scope.done()

      expect(process).toStrictEqual(expectedObject)
    })
  })

  describe('PATCH /processes/{id}/entity', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const jsonPatch: JsonPatchOperation[] = [{ op: 'add', path: '/key', value: 'value' }]

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .patch(`/processes/${expectedObject.id}/entity`, body => body.length === 1 && body[0].path === '/key')
        .reply(200, JSON.stringify(expectedObject))

      const process = await kuFlowRestClient.processOperations.patchProcessEntity(expectedObject.id, jsonPatch)

      scope.done()

      expect(process).toStrictEqual(expectedObject)
    })
  })

  describe('PUT /processes/{id}/entity', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const params: ProcessEntityUpdateParams = {
        entity: {
          value: {
            key: 'value',
          },
        },
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .put(`/processes/${expectedObject.id}/entity`)
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.updateProcessEntity(expectedObject.id, params)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('POST /processes/{id}/~actions/upload-document', () => {
    test('Check happy path', async () => {
      const processId = randomUUID()
      const expectedObject: ProcessUploadProcessDocumentResponse = {
        documentUri: 'kuflow-file:uri=xxx-yyy-zzz;type=application/json;size=500;name=file.json;',
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/processes/${processId}/~actions/upload-document`)
        .query({
          fileContentType: document.contentType,
          fileName: document.fileName,
        })
        .reply(200, JSON.stringify(expectedObject))

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const processes = await kuFlowRestClient.processOperations.uploadProcessDocument(processId, document)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/download-document', () => {
    test('Check happy path', async () => {
      const processId = randomUUID()
      const documentUri = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/processes/${processId}/~actions/download-document`)
        .query({
          documentUri,
        })
        .reply(200, '{}')

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const download = await kuFlowRestClient.processOperations.downloadProcessDocument(processId, documentUri)

      scope.done()

      expect(download.readableStreamBody).toBeTruthy()
      if (download.readableStreamBody == null) {
        return
      }

      const body = await streamToString(download.readableStreamBody)

      expect(body).toStrictEqual('{}')
    })
  })

  describe('DELETE /processes/{id}', () => {
    test('Check happy path', async () => {
      const processId = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .delete(`/processes/${processId}`)
        .matchHeader('authorization', 'Bearer ' + token)
        .reply(204)

      await kuFlowRestClient.processOperations.deleteProcess(processId)

      scope.done()
    })
  })

  describe('POST /processes/{id}/actions', () => {
    test('Check happy path', async () => {
      const processId = randomUUID()
      const expectedObject = mockProcessAction()
      const params: ProcessActionCreateParams = {
        id: expectedObject.id,
        processActionDefinitionCode: expectedObject.processActionDefinitionRef.code,
        startRelatedProcess: {
          metadata: { value: { key: 'value' } },
        },
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(
          `/processes/${processId}/actions`,
          body => body.processActionDefinitionCode === params.processActionDefinitionCode,
        )
        .reply(201, JSON.stringify(expectedObject))

      const processAction = await kuFlowRestClient.processOperations.createProcessAction(processId, params)

      scope.done()

      expect(processAction).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/actions/{actionId}', () => {
    test('Check happy path', async () => {
      const processId = randomUUID()
      const expectedObject = mockProcessAction()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/processes/${processId}/actions/${expectedObject.id}`)
        .reply(200, JSON.stringify(expectedObject))

      const processAction = await kuFlowRestClient.processOperations.retrieveProcessAction(processId, expectedObject.id)

      scope.done()

      expect(processAction).toStrictEqual(expectedObject)
    })
  })

  describe('POST /processes/{id}/actions/{actionId}/~actions/cancel', () => {
    test('Check happy path', async () => {
      const processId = randomUUID()
      const expectedObject = mockProcessAction()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/processes/${processId}/actions/${expectedObject.id}/~actions/cancel`)
        .reply(200, JSON.stringify(expectedObject))

      const processAction = await kuFlowRestClient.processOperations.cancelProcessAction(processId, expectedObject.id)

      scope.done()

      expect(processAction).toStrictEqual(expectedObject)
    })
  })

  describe('POST /processes/{id}/~actions/cancel-process-items', () => {
    test('Check happy path without process item ids', async () => {
      const expectedObject = mockProcess()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/processes/${expectedObject.id}/~actions/cancel-process-items`)
        .reply(200, JSON.stringify(expectedObject))

      const process = await kuFlowRestClient.processOperations.cancelProcessItems(expectedObject.id)

      scope.done()

      expect(process).toStrictEqual(expectedObject)
    })

    test('Check that process item ids are correctly serialized', async () => {
      const expectedObject = mockProcess()
      const processItemId1 = randomUUID()
      const processItemId2 = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/processes/${expectedObject.id}/~actions/cancel-process-items`)
        .query({ processItemId: [processItemId1, processItemId2] })
        .reply(200, JSON.stringify(expectedObject))

      const process = await kuFlowRestClient.processOperations.cancelProcessItems(expectedObject.id, {
        processItemId: [processItemId1, processItemId2],
      })

      scope.done()

      expect(process).toStrictEqual(expectedObject)
    })
  })
})
