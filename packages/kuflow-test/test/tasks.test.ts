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
  type TaskAssignCommand,
  type TaskDeleteElementCommand,
  type TaskDeleteElementValueDocumentCommand,
  type TaskSaveElementCommand,
  type TaskSaveElementValueDocumentCommand,
  type TaskSaveJsonFormsValueDataCommand,
  type TaskSaveJsonFormsValueDocumentRequestCommand,
} from '@kuflow/kuflow-rest'
import { randomUUID } from 'crypto'
import nock from 'nock'

import { mockTask, mockTaskJsonForms, mockTaskPage } from './utils/fixtures'
import { streamToString } from './utils/stream'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /tasks', () => {
  describe('GET /tasks', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/tasks')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, {})

      await kuFlowRestClient.taskOperations.findTasks()

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockTaskPage()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/tasks')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const processes = await kuFlowRestClient.taskOperations.findTasks()

      scope.done()

      expect(processes).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/tasks')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          processId: 'a0ae7688-eb96-4c0b-94fc-0e998610e9c9',
          state: 'READY',
          taskDefinitionCode: 'CODE',
        })
        .reply(200, {})

      await kuFlowRestClient.taskOperations.findTasks({
        size: 30,
        page: 1,
        sort: 'sort1',
        processId: 'a0ae7688-eb96-4c0b-94fc-0e998610e9c9',
        state: 'READY',
        taskDefinitionCode: 'CODE',
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with single values', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/tasks')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          processId: 'a0ae7688-eb96-4c0b-94fc-0e998610e9c9',
          state: 'READY',
          taskDefinitionCode: 'CODE',
        })
        .reply(200, {})

      await kuFlowRestClient.taskOperations.findTasks({
        size: 30,
        page: 1,
        sort: ['sort1'],
        processId: ['a0ae7688-eb96-4c0b-94fc-0e998610e9c9'],
        state: ['READY'],
        taskDefinitionCode: ['CODE'],
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with multiple values', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/tasks')
        .query({
          size: 30,
          page: 1,
          sort: ['sort1', 'sort2,&%'],
          processId: ['a0ae7688-eb96-4c0b-94fc-0e998610e9c9', 'f5b088a4-be04-44e2-b1be-3a5eefdbf6b2'],
          state: ['READY', 'CLAIMED'],
          taskDefinitionCode: ['CODE_1', 'CODE_2'],
        })
        .reply(200, {})

      await kuFlowRestClient.taskOperations.findTasks({
        size: 30,
        page: 1,
        sort: ['sort1', 'sort2,&%'],
        processId: ['a0ae7688-eb96-4c0b-94fc-0e998610e9c9', 'f5b088a4-be04-44e2-b1be-3a5eefdbf6b2'],
        state: ['READY', 'CLAIMED'],
        taskDefinitionCode: ['CODE_1', 'CODE_2'],
      })

      scope.done()
    })
  })
  describe('POST /tasks', () => {
    test('Check happy path', async () => {
      const expectedObject = mockTask()

      const scope = nock('https://api.kuflow.com/v2022-10-08').post('/tasks').reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.createTask(expectedObject)

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })

    test('Check happy path when task is untouched', async () => {
      const expectedObject = mockTask()

      const scope = nock('https://api.kuflow.com/v2022-10-08').post('/tasks').reply(201, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.createTask(expectedObject)

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })

    test('Check that activity token is passed as query parameter', async () => {
      const expectedObject = mockTask()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post('/tasks')
        .query({
          activityToken: 'TOKEN',
        })
        .reply(201, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.createTask(expectedObject, { activityToken: 'TOKEN' })

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })
  describe('GET /tasks/{id}', () => {
    test('Check happy path', async () => {
      const expectedObject = mockTask()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get(`/tasks/${expectedObject.id}`)
        .reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.retrieveTask(expectedObject.id ?? '')

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })

  describe('POST /tasks/{id}/~actions/claim', () => {
    test('Check happy path', async () => {
      const expectedObject = mockTask()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/claim`)
        .reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.actionsTaskClaim(expectedObject.id ?? '')

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })

  describe('POST /tasks/{id}/~actions/assign', () => {
    test('Check happy path', async () => {
      const expectedObject = mockTask()
      const command: TaskAssignCommand = {
        email: 'email@example.com',
      }
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/assign`, body => {
          return body.email === command.email && command.principalId === body.principalId
        })
        .reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.actionsTaskAssign(expectedObject.id ?? '', command)

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })

  describe('POST /tasks/{id}/~actions/save-element', () => {
    test('Check happy path', async () => {
      const expectedObject = mockTask()
      const command: TaskSaveElementCommand = {
        elementDefinitionCode: 'CODE',
        elementValues: [],
      }
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/save-element`, body => {
          return body.elementDefinitionCode === command.elementDefinitionCode && body.elementValues.length === 0
        })
        .reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.actionsTaskSaveElement(expectedObject.id ?? '', command)

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })

  describe('POST /tasks/{id}/~actions/save-element-value-document', () => {
    test('Check happy path', async () => {
      const expectedObject = mockTask()
      const command: TaskSaveElementValueDocumentCommand = {
        elementDefinitionCode: 'CODE',
        elementValueId: randomUUID(),
        elementValueValid: false,
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/save-element-value-document`)
        .query({
          elementDefinitionCode: command.elementDefinitionCode,
          elementValueId: command.elementValueId,
          elementValueValid: command.elementValueValid,
          fileContentType: document.contentType,
          fileName: document.fileName,
        })
        .reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.actionsTaskSaveElementValueDocument(
        expectedObject.id ?? '',
        command,
        document,
      )

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })

  describe('POST /tasks/{id}/~actions/delete-element', () => {
    test('Check happy path', async () => {
      const expectedObject = mockTask()
      const command: TaskDeleteElementCommand = {
        elementDefinitionCode: 'CODE',
      }
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/delete-element`, body => {
          return body.elementDefinitionCode === command.elementDefinitionCode
        })
        .reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.actionsTaskDeleteElement(expectedObject.id ?? '', command)

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })

  describe('POST /tasks/{id}/~actions/delete-element-value-document', () => {
    test('Check happy path', async () => {
      const expectedObject = mockTask()
      const command: TaskDeleteElementValueDocumentCommand = {
        documentId: '62b806ae-4722-4a3d-8abe-76f618b2cd20',
      }
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/delete-element-value-document`, body => {
          return body.documentId === command.documentId
        })
        .reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.actionsTaskDeleteElementValueDocument(
        expectedObject.id ?? '',
        command,
      )

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })

  describe('POST /tasks/{id}/~actions/download-element-value-document', () => {
    test('Check happy path', async () => {
      const taskId = randomUUID()
      const documentId = randomUUID()
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get(`/tasks/${taskId}/~actions/download-element-value-document`)
        .query({
          documentId,
        })
        .reply(200, '{}')

      const download = await kuFlowRestClient.taskOperations.actionsTaskDownloadElementValueDocument(taskId, documentId)

      scope.done()

      expect(download.readableStreamBody).toBeTruthy()
      if (download.readableStreamBody == null) {
        return
      }

      const body = await streamToString(download.readableStreamBody)

      expect(body).toStrictEqual('{}')
    })
  })

  describe('POST /tasks/{id}/~actions/download-element-value-form-rendered', () => {
    test('Check happy path', async () => {
      const taskId = randomUUID()
      const elementDefinitionCode = randomUUID()
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get(`/tasks/${taskId}/~actions/download-element-value-form-rendered`)
        .query({
          elementDefinitionCode,
        })
        .reply(200, '{}')

      const download = await kuFlowRestClient.taskOperations.actionsTaskDownloadElementValueRendered(
        taskId,
        elementDefinitionCode,
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

  describe('POST /tasks/{id}/~actions/save-json-forms-value-data', () => {
    test('Check that security header is added', async () => {
      const expectedObject = mockTaskJsonForms()
      const command: TaskSaveJsonFormsValueDataCommand = {
        data: {
          key1: 'value1',
          key2: 'value2',
        },
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/save-json-forms-value-data`)
        .matchHeader('authorization', 'Bearer ' + token)
        .reply(200, {})

      await kuFlowRestClient.taskOperations.actionsTaskSaveJsonFormsValueData(expectedObject.id ?? '', command)

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockTaskJsonForms()
      const command: TaskSaveJsonFormsValueDataCommand = {
        data: {
          key1: 'value1',
          key2: 'value2',
        },
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/save-json-forms-value-data`, body => {
          return body.data.key1 === command.data?.key1 && body.data.key2 === command.data?.key2
        })
        .reply(200, JSON.stringify(expectedObject))

      const task = await kuFlowRestClient.taskOperations.actionsTaskSaveJsonFormsValueData(
        expectedObject.id ?? '',
        command,
      )

      scope.done()

      expect(task).toStrictEqual(expectedObject)
    })
  })

  describe('POST /tasks/{id}/~actions/save-json-forms-value-document', () => {
    test('Check that security header is added', async () => {
      const expectedObject = mockTaskJsonForms()
      const command: TaskSaveJsonFormsValueDocumentRequestCommand = {
        schemaPath: '#/path0/path1',
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/save-json-forms-value-document`)
        .matchHeader('authorization', 'Bearer ' + token)
        .query({
          schemaPath: command.schemaPath,
          fileContentType: document.contentType,
          fileName: document.fileName,
        })
        .reply(200, {})

      await kuFlowRestClient.taskOperations.actionsTaskSaveJsonFormsValueDocument(
        expectedObject.id ?? '',
        command,
        document,
      )

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockTaskJsonForms()
      const command: TaskSaveJsonFormsValueDocumentRequestCommand = {
        schemaPath: '#/path0/path1',
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .post(`/tasks/${expectedObject.id}/~actions/save-json-forms-value-document`)
        .query({
          schemaPath: command.schemaPath,
          fileContentType: document.contentType,
          fileName: document.fileName,
        })
        .reply(200, {})

      await kuFlowRestClient.taskOperations.actionsTaskSaveJsonFormsValueDocument(
        expectedObject.id ?? '',
        command,
        document,
      )

      scope.done()
    })
  })

  describe('POST /tasks/{id}/~actions/download-json-forms-value-document', () => {
    test('Check that security header is added', async () => {
      const taskId = randomUUID()
      const documentUri = randomUUID()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get(`/tasks/${taskId}/~actions/download-json-forms-value-document`)
        .matchHeader('authorization', 'Bearer ' + token)
        .query({
          documentUri,
        })
        .reply(200, {})

      await kuFlowRestClient.taskOperations.actionsTaskDownloadJsonFormsValueDocument(taskId, documentUri)

      scope.done()
    })

    test('Check happy path', async () => {
      const taskId = randomUUID()
      const documentUri = randomUUID()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get(`/tasks/${taskId}/~actions/download-json-forms-value-document`)
        .query({
          documentUri,
        })
        .reply(200, '{}')

      const download = await kuFlowRestClient.taskOperations.actionsTaskDownloadJsonFormsValueDocument(
        taskId,
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
