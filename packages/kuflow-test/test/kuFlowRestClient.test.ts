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
  Document,
  KuFlowRestClient,
  Principal,
  PrincipalPage,
  Process,
  ProcessChangeInitiatorCommand,
  ProcessDeleteElementCommand,
  ProcessPage,
  ProcessSaveElementCommand,
  ProcessSaveUserActionValueDocumentCommand,
  Task,
  TaskAssignCommand,
  TaskDeleteElementCommand,
  TaskDeleteElementValueDocumentCommand,
  TaskPage,
  TaskSaveElementCommand,
  TaskSaveElementValueDocumentCommand,
} from '@kuflow/kuflow-rest-client'
import { randomInt, randomUUID } from 'crypto'
import nock from 'nock'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /principals', () => {
  describe('GET /principals', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/principals')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, {})

      await kuFlowRestClient.principalOperations.findPrincipals()

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockPrincipalPage()

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/principals')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const principals = await kuFlowRestClient.principalOperations.findPrincipals()

      scope.done()

      expect(principals).toStrictEqual(expectedObject)
    })

    test('Check that unknown properties body with are ignored', async () => {
      const expectedObject = mockPrincipalPage()
      const expectedObjectAny = expectedObject as any
      expectedObjectAny.dummy = 'value'
      expectedObjectAny.metadata.dummy = 'value2'

      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/principals')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const principals = await kuFlowRestClient.principalOperations.findPrincipals()

      scope.done()

      expect(principals).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/principals')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          type: 'USER',
          groupId: 'dfa200e4-1876-4056-ab09-690bce3057f5',
        })
        .reply(200, {})

      await kuFlowRestClient.principalOperations.findPrincipals({
        size: 30,
        page: 1,
        sort: 'sort1',
        type: 'USER',
        groupId: 'dfa200e4-1876-4056-ab09-690bce3057f5',
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with single values', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/principals')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          type: 'USER',
          groupId: 'dfa200e4-1876-4056-ab09-690bce3057f5',
        })
        .reply(200, {})

      await kuFlowRestClient.principalOperations.findPrincipals({
        size: 30,
        page: 1,
        sort: ['sort1'],
        type: 'USER',
        groupId: ['dfa200e4-1876-4056-ab09-690bce3057f5'],
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with multiple values', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/principals')
        .query({
          size: 30,
          page: 1,
          sort: ['sort1', 'sort2,&%'],
          type: 'USER',
          groupId: ['dfa200e4-1876-4056-ab09-690bce3057f5', '60c892d2-bf8e-4030-86a7-fca6700d88d3'],
        })
        .reply(200, {})

      await kuFlowRestClient.principalOperations.findPrincipals({
        size: 30,
        page: 1,
        sort: ['sort1', 'sort2,&%'],
        type: 'USER',
        groupId: ['dfa200e4-1876-4056-ab09-690bce3057f5', '60c892d2-bf8e-4030-86a7-fca6700d88d3'],
      })

      scope.done()
    })
  })

  describe('GET /principals/{id}', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get('/principals/754d10c6-e9ef-4a9e-9df7-ab146fa28004')
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {})

      await kuFlowRestClient.principalOperations.retrievePrincipal('754d10c6-e9ef-4a9e-9df7-ab146fa28004')

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockPrincipalUser()
      const scope = nock('https://api.kuflow.com/v2022-10-08')
        .get(`/principals/${expectedObject.id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, expectedObject)

      const principal = await kuFlowRestClient.principalOperations.retrievePrincipal(expectedObject.id)

      scope.done()

      expect(principal).toStrictEqual(expectedObject)
    })
  })
})

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
})

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
})

async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Uint8Array[] = []

  return await new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)))
    stream.on('error', err => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

function mockPrincipalPage(): PrincipalPage {
  return {
    objectType: 'PRINCIPAL_PAGE',
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockPrincipalUser(), mockPrincipalApplication()],
  }
}

function mockPrincipalUser(): Principal {
  return {
    id: randomUUID(),
    type: 'USER',
    name: `Hommer ${randomInt(1, 1_000)}`,
    user: {
      id: randomUUID(),
      email: `dummy-${randomInt(1, 1_000)}@example.com`,
    },
  }
}

function mockPrincipalApplication(): Principal {
  return {
    id: randomUUID(),
    type: 'USER',
    name: `App ${randomInt(1, 1_000)}`,
    application: {
      id: randomUUID(),
    },
  }
}

function mockProcessPage(): ProcessPage {
  return {
    objectType: 'PROCESS_PAGE',
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockProcess(), mockProcess()],
  }
}

function mockProcess(): Process {
  return {
    objectType: 'PROCESS',
    id: randomUUID(),
    subject: `Subject ${randomInt(1, 1_000)}`,
    state: 'RUNNING',
    processDefinition: {
      id: randomUUID(),
      version: randomUUID(),
      name: `Name ${randomInt(1, 1_000)}`,
    },
    elementValues: {
      CODE_1: [
        {
          type: 'STRING',
          value: `Value ${randomInt(1, 1_000)}`,
          valid: true,
        },
      ],
      CODE_2: [
        {
          type: 'NUMBER',
          value: randomInt(1, 1_000),
          valid: true,
        },
      ],
    },
    initiator: mockPrincipalUser(),

    createdBy: randomUUID(),
    createdAt: new Date(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date(),
  }
}

function mockTaskPage(): TaskPage {
  return {
    objectType: 'TASK_PAGE',
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockTask(), mockTask()],
  }
}

function mockTask(): Task {
  return {
    objectType: 'TASK',
    id: randomUUID(),
    state: 'READY',
    taskDefinition: {
      id: randomUUID(),
      version: randomUUID(),
      name: `Name ${randomInt(1, 1_000)}`,
    },
    processId: randomUUID(),
    elementValues: {
      CODE_1: [
        {
          type: 'STRING',
          value: `Value ${randomInt(1, 1_000)}`,
          valid: true,
        },
      ],
      CODE_2: [
        {
          type: 'NUMBER',
          value: randomInt(1, 1_000),
          valid: true,
        },
      ],
    },
    owner: mockPrincipalUser(),

    createdBy: randomUUID(),
    createdAt: new Date(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date(),
  }
}
