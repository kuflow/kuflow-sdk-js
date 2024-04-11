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
  KuFlowRestClient,
  type ProcessActionsProcessSaveEntityDocumentResponse,
  type ProcessChangeInitiatorCommand,
  type ProcessDeleteElementCommand,
  type ProcessSaveElementCommand,
  type ProcessSaveEntityDataCommand,
  type ProcessSaveEntityDocumentRequestCommand,
  type ProcessSaveUserActionValueDocumentCommand,
} from '@kuflow/kuflow-rest'
import { randomUUID } from 'crypto'
import nock from 'nock'

import { mockProcess, mockProcessPage } from './utils/fixtures'
import { streamToString } from './utils/stream'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /processes', () => {
  describe('GET /processes', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/processes')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, {})

      await kuFlowRestClient.processOperations.findProcesses()

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockProcessPage()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/processes')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.findProcesses()

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
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
      const scope = nock('https://api.kuflow.com/v2022-10-08')
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
      const scope = nock('https://api.kuflow.com/v2022-10-08')
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
  })

  describe('POST /processes', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post('/processes')
        .matchHeader('authorization', 'Bearer ' + token)
        .reply(200, {})

      const process = mockProcess()
      await kuFlowRestClient.processOperations.createProcess(process)

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockProcess()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post('/processes')
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.createProcess(expectedObject)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })

    test('Check happy path if already created', async () => {
      const expectedObject = mockProcess()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post('/processes')
        .reply(201, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.createProcess(expectedObject)

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
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
      const command: ProcessChangeInitiatorCommand = {
        email: 'sample@kuflow.com',
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${expectedObject.id}/~actions/change-initiator`, body => body.email === command.email)
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.actionsProcessChangeInitiator(
        expectedObject.id ?? '',
        command,
      )

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/save-element', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const command: ProcessSaveElementCommand = {
        elementDefinitionCode: 'CODE',
        elementValues: [],
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${expectedObject.id}/~actions/save-element`, body => body.elementDefinitionCode === 'CODE')
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.actionsProcessSaveElement(
        expectedObject.id ?? '',
        command,
      )

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/delete-element', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const command: ProcessDeleteElementCommand = {
        elementDefinitionCode: 'CODE',
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${expectedObject.id}/~actions/delete-element`, body => body.elementDefinitionCode === 'CODE')
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.actionsProcessDeleteElement(
        expectedObject.id ?? '',
        command,
      )

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/complete', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${expectedObject.id}/~actions/complete`)
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.actionsProcessComplete(expectedObject.id ?? '')

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/cancel', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${expectedObject.id}/~actions/cancel`)
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.actionsProcessCancel(expectedObject.id ?? '')

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/save-user-action-value-document', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const command: ProcessSaveUserActionValueDocumentCommand = {
        userActionValueId: randomUUID(),
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${expectedObject.id}/~actions/save-user-action-value-document`)
        .query({
          fileContentType: document.contentType,
          fileName: document.fileName,
          userActionValueId: command.userActionValueId,
        })
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.actionsProcessSaveUserActionValueDocument(
        expectedObject.id ?? '',
        command,
        document,
      )

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })

    test('Check happy path if 304 return is allowed', async () => {
      const expectedObject = mockProcess()
      const command: ProcessSaveUserActionValueDocumentCommand = {
        userActionValueId: randomUUID(),
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${expectedObject.id}/~actions/save-user-action-value-document`)
        .query({
          fileContentType: document.contentType,
          fileName: document.fileName,
          userActionValueId: command.userActionValueId,
        })
        .reply(304)

      const processes = await kuFlowRestClient.processOperations.actionsProcessSaveUserActionValueDocument(
        expectedObject.id ?? '',
        command,
        document,
      )

      scope.done()

      expect(processes).toBeUndefined()
    })
  })

  describe('GET /processes/{id}/~actions/save-entity-data', () => {
    test('Check happy path', async () => {
      const expectedObject = mockProcess()
      const command: ProcessSaveEntityDataCommand = {
        data: {
          key: 'value',
        },
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${expectedObject.id}/~actions/save-entity-data`)
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.actionsProcessSaveEntityData(
        expectedObject.id ?? '',
        command,
      )

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/save-entity-document', () => {
    test('Check happy path', async () => {
      const processId = randomUUID()
      const expectedObject: ProcessActionsProcessSaveEntityDocumentResponse = {
        value: 'document-uri',
      }
      const command: ProcessSaveEntityDocumentRequestCommand = {
        schemaPath: 'path',
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/processes/${processId}/~actions/save-entity-document`)
        .query({
          fileContentType: document.contentType,
          fileName: document.fileName,
          schemaPath: command.schemaPath,
        })
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.processOperations.actionsProcessSaveEntityDocument(
        processId,
        command,
        document,
      )

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })
  })

  describe('GET /processes/{id}/~actions/download-entity-document', () => {
    test('Check happy path', async () => {
      const processId = randomUUID()
      const documentUri = randomUUID()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get(`/processes/${processId}/~actions/download-entity-document`)
        .query({
          documentUri,
        })
        .reply(200, '{}')

      const download = await kuFlowRestClient.processOperations.actionsProcessDownloadEntityDocument(
        processId,
        documentUri,
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
