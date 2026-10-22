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
import { type JsonPatchOperation, KuFlowRestClient } from '@kuflow/kuflow-rest'
import { createKuFlowActivities, type KuFlowActivities } from '@kuflow/kuflow-temporal-activity-kuflow'
import { ApplicationFailure } from '@temporalio/activity'
import { randomUUID } from 'crypto'
import nock from 'nock'

import {
  mockBusinessArtifact,
  mockBusinessArtifactAction,
  mockBusinessArtifactPage,
  mockPrincipalUser,
  mockProcess,
  mockProcessAction,
  mockProcessItem,
  mockProcessItemAiAssistance,
  mockProcessItemPage,
  mockProcessPage,
  mockTenantUser,
} from './utils/fixtures'

const clientId = 'USER1'
const clientSecret = 'PASS1'

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })
const kuFlowActivities = createKuFlowActivities(kuFlowRestClient)

const API = 'https://api.kuflow.com/v2024-06-14'

const jsonPatch: JsonPatchOperation[] = [{ op: 'add', path: '/key', value: 'value' }]

describe('KuFlow activities', () => {
  test('Check that the activity names match the Java SDK ones', () => {
    expect(Object.keys(kuFlowActivities).sort()).toStrictEqual(
      [
        'KuFlow_Engine_retrievePrincipal',
        'KuFlow_Engine_retrieveTenantUser',
        'KuFlow_Engine_findProcesses',
        'KuFlow_Engine_retrieveProcess',
        'KuFlow_Engine_deleteProcess',
        'KuFlow_Engine_updateProcessEntity',
        'KuFlow_Engine_patchProcessEntity',
        'KuFlow_Engine_updateProcessMetadata',
        'KuFlow_Engine_patchProcessMetadata',
        'KuFlow_Engine_changeProcessInitiator',
        'KuFlow_Engine_createProcessAction',
        'KuFlow_Engine_retrieveProcessAction',
        'KuFlow_Engine_cancelProcessAction',
        'KuFlow_Engine_cancelProcessItems',
        'KuFlow_Engine_findProcessItems',
        'KuFlow_Engine_retrieveProcessItem',
        'KuFlow_Engine_createProcessItem',
        'KuFlow_Engine_completeProcessItemTask',
        'KuFlow_Engine_claimProcessItemTask',
        'KuFlow_Engine_assignProcessItemTask',
        'KuFlow_Engine_updateProcessItemTaskData',
        'KuFlow_Engine_updateProcessItemTaskContextData',
        'KuFlow_Engine_patchProcessItemTaskData',
        'KuFlow_Engine_appendProcessItemTaskLog',
        'KuFlow_Engine_generateProcessItemAiAssistance',
        'KuFlow_Engine_retrieveProcessItemAiAssistance',
        'KuFlow_Engine_findBusinessArtifacts',
        'KuFlow_Engine_createBusinessArtifact',
        'KuFlow_Engine_retrieveBusinessArtifact',
        'KuFlow_Engine_deleteBusinessArtifact',
        'KuFlow_Engine_updateBusinessArtifact',
        'KuFlow_Engine_patchBusinessArtifact',
        'KuFlow_Engine_createBusinessArtifactAction',
        'KuFlow_Engine_retrieveBusinessArtifactAction',
        'KuFlow_Engine_cancelBusinessArtifactAction',
        'KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact',
        'KuFlow_Engine_prepareBusinessArtifactActionStartProcess',
      ].sort(),
    )
  })

  describe('Happy path mappings', () => {
    test('KuFlow_Engine_retrievePrincipal', async () => {
      const principalId = randomUUID()
      const principal = { ...mockPrincipalUser(), id: principalId }
      const scope = nock(API).get(`/principals/${principalId}`).reply(200, JSON.stringify(principal))

      const response = await kuFlowActivities.KuFlow_Engine_retrievePrincipal({ principalId })

      scope.done()
      expect(response).toStrictEqual({ principal })
    })

    test('KuFlow_Engine_retrieveTenantUser', async () => {
      const tenantUserId = randomUUID()
      const tenantUser = { ...mockTenantUser(), id: tenantUserId }
      const scope = nock(API).get(`/tenant-users/${tenantUserId}`).reply(200, JSON.stringify(tenantUser))

      const response = await kuFlowActivities.KuFlow_Engine_retrieveTenantUser({ tenantUserId })

      scope.done()
      expect(response).toStrictEqual({ tenantUser })
    })

    test('KuFlow_Engine_findProcesses', async () => {
      const processes = mockProcessPage()
      const tenantId = randomUUID()
      const processDefinitionId = randomUUID()
      const initiatorId = randomUUID()

      const scope = nock(API)
        .get('/processes')
        .query({
          size: 10,
          page: 2,
          sort: ['createdAt,desc', 'id'],
          tenantId,
          processDefinitionId,
          processDefinitionCode: 'CODE',
          state: 'RUNNING',
          initiatorId,
          initiatorEmail: 'sample@kuflow.com',
          metadata: 'FIELD eq 1',
          deleted: 'INCLUDE',
        })
        .reply(200, JSON.stringify(processes))

      const response = await kuFlowActivities.KuFlow_Engine_findProcesses({
        size: 10,
        page: 2,
        sorts: ['createdAt,desc', 'id'],
        tenantIds: [tenantId],
        processDefinitionIds: [processDefinitionId],
        processDefinitionCodes: ['CODE'],
        states: ['RUNNING'],
        initiatorIds: [initiatorId],
        initiatorEmails: ['sample@kuflow.com'],
        metadata: ['FIELD eq 1'],
        deleted: 'INCLUDE',
      })

      scope.done()
      expect(response).toStrictEqual({ processes })
    })

    test('KuFlow_Engine_findProcesses ignores the payloads field sent by the Java SDK', async () => {
      const scope = nock(API).get('/processes').query({ sort: 'id' }).reply(200, JSON.stringify(mockProcessPage()))

      // Java activity models always carry a `payloads` map
      const javaRequest = { sorts: ['id'], payloads: { key: 'value' } }

      await kuFlowActivities.KuFlow_Engine_findProcesses(javaRequest)

      scope.done()
    })

    test('KuFlow_Engine_retrieveProcess', async () => {
      const process = mockProcess()
      const scope = nock(API).get(`/processes/${process.id}`).reply(200, JSON.stringify(process))

      const response = await kuFlowActivities.KuFlow_Engine_retrieveProcess({ processId: process.id })

      scope.done()
      expect(response).toStrictEqual({ process })
    })

    test('KuFlow_Engine_deleteProcess', async () => {
      const processId = randomUUID()
      const scope = nock(API).delete(`/processes/${processId}`).reply(204)

      const response = await kuFlowActivities.KuFlow_Engine_deleteProcess({ processId })

      scope.done()
      expect(response).toStrictEqual({})
    })

    test('KuFlow_Engine_updateProcessEntity', async () => {
      const process = mockProcess()
      const scope = nock(API)
        .put(`/processes/${process.id}/entity`, body => body.entity.value.key === 'value')
        .reply(200, JSON.stringify(process))

      const response = await kuFlowActivities.KuFlow_Engine_updateProcessEntity({
        processId: process.id,
        entity: { value: { key: 'value' } },
      })

      scope.done()
      expect(response).toStrictEqual({ process })
    })

    test('KuFlow_Engine_patchProcessEntity', async () => {
      const process = mockProcess()
      const scope = nock(API)
        .patch(`/processes/${process.id}/entity`, body => body[0].path === '/key')
        .reply(200, JSON.stringify(process))

      const response = await kuFlowActivities.KuFlow_Engine_patchProcessEntity({ processId: process.id, jsonPatch })

      scope.done()
      expect(response).toStrictEqual({ process })
    })

    test('KuFlow_Engine_updateProcessMetadata', async () => {
      const process = mockProcess()
      const scope = nock(API)
        .put(`/processes/${process.id}/metadata`, body => body.metadata.value.key === 'value')
        .reply(200, JSON.stringify(process))

      const response = await kuFlowActivities.KuFlow_Engine_updateProcessMetadata({
        processId: process.id,
        metadata: { value: { key: 'value' } },
      })

      scope.done()
      expect(response).toStrictEqual({ process })
    })

    test('KuFlow_Engine_patchProcessMetadata', async () => {
      const process = mockProcess()
      const scope = nock(API)
        .patch(`/processes/${process.id}/metadata`, body => body[0].path === '/key')
        .reply(200, JSON.stringify(process))

      const response = await kuFlowActivities.KuFlow_Engine_patchProcessMetadata({ processId: process.id, jsonPatch })

      scope.done()
      expect(response).toStrictEqual({ process })
    })

    test('KuFlow_Engine_changeProcessInitiator', async () => {
      const process = mockProcess()
      const scope = nock(API)
        .post(`/processes/${process.id}/~actions/change-initiator`, body => body.initiatorEmail === 'sample@kuflow.com')
        .reply(200, JSON.stringify(process))

      const response = await kuFlowActivities.KuFlow_Engine_changeProcessInitiator({
        processId: process.id,
        initiatorEmail: 'sample@kuflow.com',
      })

      scope.done()
      expect(response).toStrictEqual({ process })
    })

    test('KuFlow_Engine_createProcessAction', async () => {
      const processId = randomUUID()
      const processAction = mockProcessAction()
      const scope = nock(API)
        .post(
          `/processes/${processId}/actions`,
          body =>
            body.id === processAction.id &&
            body.processActionDefinitionCode === 'ACTION_CODE' &&
            body.sendWorkflowSignal.input.key === 'value',
        )
        .reply(200, JSON.stringify(processAction))

      const response = await kuFlowActivities.KuFlow_Engine_createProcessAction({
        processId,
        id: processAction.id,
        processActionDefinitionCode: 'ACTION_CODE',
        sendWorkflowSignal: { input: { key: 'value' } },
      })

      scope.done()
      expect(response).toStrictEqual({ processAction })
    })

    test('KuFlow_Engine_retrieveProcessAction', async () => {
      const processId = randomUUID()
      const processAction = mockProcessAction()
      const scope = nock(API)
        .get(`/processes/${processId}/actions/${processAction.id}`)
        .reply(200, JSON.stringify(processAction))

      const response = await kuFlowActivities.KuFlow_Engine_retrieveProcessAction({
        processId,
        processActionId: processAction.id,
      })

      scope.done()
      expect(response).toStrictEqual({ processAction })
    })

    test('KuFlow_Engine_cancelProcessAction', async () => {
      const processId = randomUUID()
      const processAction = mockProcessAction()
      const scope = nock(API)
        .post(`/processes/${processId}/actions/${processAction.id}/~actions/cancel`)
        .reply(200, JSON.stringify(processAction))

      const response = await kuFlowActivities.KuFlow_Engine_cancelProcessAction({
        processId,
        processActionId: processAction.id,
      })

      scope.done()
      expect(response).toStrictEqual({ processAction })
    })

    test('KuFlow_Engine_cancelProcessItems', async () => {
      const process = mockProcess()
      const processItemIds = [randomUUID(), randomUUID()]
      const scope = nock(API)
        .post(`/processes/${process.id}/~actions/cancel-process-items`)
        .query({ processItemId: processItemIds })
        .reply(200, JSON.stringify(process))

      const response = await kuFlowActivities.KuFlow_Engine_cancelProcessItems({
        processId: process.id,
        processItemIds,
      })

      scope.done()
      expect(response).toStrictEqual({ process })
    })

    test('KuFlow_Engine_findProcessItems', async () => {
      const processItems = mockProcessItemPage()
      const tenantId = randomUUID()
      const processId = randomUUID()
      const processDefinitionId = randomUUID()

      const scope = nock(API)
        .get('/process-items')
        .query({
          size: 10,
          page: 1,
          sort: 'createdAt,desc',
          tenantId,
          processId,
          type: 'TASK',
          taskState: ['READY', 'CLAIMED'],
          processItemDefinitionCode: 'TASK_CODE',
          processDefinitionId,
          processDefinitionCode: 'CODE',
          deleted: 'ONLY',
        })
        .reply(200, JSON.stringify(processItems))

      const response = await kuFlowActivities.KuFlow_Engine_findProcessItems({
        size: 10,
        page: 1,
        sorts: ['createdAt,desc'],
        tenantIds: [tenantId],
        processIds: [processId],
        types: ['TASK'],
        taskStates: ['READY', 'CLAIMED'],
        processItemDefinitionCodes: ['TASK_CODE'],
        processDefinitionIds: [processDefinitionId],
        processDefinitionCodes: ['CODE'],
        deleted: 'ONLY',
      })

      scope.done()
      expect(response).toStrictEqual({ processItems })
    })

    test('KuFlow_Engine_retrieveProcessItem', async () => {
      const processItem = mockProcessItem()
      const scope = nock(API).get(`/process-items/${processItem.id}`).reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_retrieveProcessItem({ processItemId: processItem.id })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_createProcessItem', async () => {
      const processItem = mockProcessItem()
      const processItemThreadId = randomUUID()
      const ownerId = randomUUID()
      const scope = nock(API)
        .post(
          '/process-items',
          body =>
            body.id === processItem.id &&
            body.type === 'TASK' &&
            body.processId === processItem.processId &&
            body.processItemThreadId === processItemThreadId &&
            body.ownerId === ownerId &&
            body.processItemDefinitionCode === 'TASK_CODE' &&
            body.task.data.value.key === 'value',
        )
        .reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_createProcessItem({
        id: processItem.id,
        type: 'TASK',
        processId: processItem.processId,
        processItemThreadId,
        ownerId,
        processItemDefinitionCode: 'TASK_CODE',
        task: { data: { value: { key: 'value' } } },
      })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_completeProcessItemTask', async () => {
      const processItem = mockProcessItem()
      const scope = nock(API)
        .post(`/process-items/${processItem.id}/task/~actions/complete`)
        .reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_completeProcessItemTask({ processItemId: processItem.id })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_claimProcessItemTask', async () => {
      const processItem = mockProcessItem()
      const scope = nock(API)
        .post(`/process-items/${processItem.id}/task/~actions/claim`)
        .reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_claimProcessItemTask({ processItemId: processItem.id })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_assignProcessItemTask', async () => {
      const processItem = mockProcessItem()
      const scope = nock(API)
        .post(`/process-items/${processItem.id}/task/~actions/assign`, body => body.ownerEmail === 'sample@kuflow.com')
        .reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_assignProcessItemTask({
        processItemId: processItem.id,
        ownerEmail: 'sample@kuflow.com',
      })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_updateProcessItemTaskData', async () => {
      const processItem = mockProcessItem()
      const scope = nock(API)
        .put(`/process-items/${processItem.id}/task/data`, body => body.data.value.key === 'value')
        .reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_updateProcessItemTaskData({
        processItemId: processItem.id,
        data: { value: { key: 'value' } },
      })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_updateProcessItemTaskContextData', async () => {
      const processItem = mockProcessItem()
      const scope = nock(API)
        .put(`/process-items/${processItem.id}/task/context-data`, body => body.data.value.key === 'value')
        .reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_updateProcessItemTaskContextData({
        processItemId: processItem.id,
        data: { value: { key: 'value' } },
      })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_patchProcessItemTaskData', async () => {
      const processItem = mockProcessItem()
      const scope = nock(API)
        .patch(`/process-items/${processItem.id}/task/data`, body => body[0].path === '/key')
        .reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_patchProcessItemTaskData({
        processItemId: processItem.id,
        jsonPatch,
      })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_appendProcessItemTaskLog', async () => {
      const processItem = mockProcessItem()
      const scope = nock(API)
        .post(
          `/process-items/${processItem.id}/task/~actions/append-log`,
          body => body.message === 'My message' && body.level === 'ERROR',
        )
        .reply(200, JSON.stringify(processItem))

      const response = await kuFlowActivities.KuFlow_Engine_appendProcessItemTaskLog({
        processItemId: processItem.id,
        message: 'My message',
        level: 'ERROR',
      })

      scope.done()
      expect(response).toStrictEqual({ processItem })
    })

    test('KuFlow_Engine_generateProcessItemAiAssistance', async () => {
      const processItemId = randomUUID()
      const processItemAiAssistance = mockProcessItemAiAssistance()
      const scope = nock(API)
        .post(
          `/process-items/${processItemId}/~actions/ai-assistance`,
          body => body.requestId === processItemAiAssistance.requestId,
        )
        .reply(202, JSON.stringify(processItemAiAssistance))

      const response = await kuFlowActivities.KuFlow_Engine_generateProcessItemAiAssistance({
        processItemId,
        requestId: processItemAiAssistance.requestId,
      })

      scope.done()
      expect(response).toStrictEqual({ processItemAiAssistance })
    })

    test('KuFlow_Engine_retrieveProcessItemAiAssistance', async () => {
      const processItemId = randomUUID()
      const processItemAiAssistance = mockProcessItemAiAssistance()
      const scope = nock(API)
        .get(`/process-items/${processItemId}/~actions/ai-assistance`)
        .reply(200, JSON.stringify(processItemAiAssistance))

      const response = await kuFlowActivities.KuFlow_Engine_retrieveProcessItemAiAssistance({ processItemId })

      scope.done()
      expect(response).toStrictEqual({ processItemAiAssistance })
    })

    test('KuFlow_Engine_findBusinessArtifacts', async () => {
      const businessArtifacts = mockBusinessArtifactPage()
      const tenantId = randomUUID()
      const businessArtifactDefinitionId = randomUUID()

      const scope = nock(API)
        .get('/business-artifacts')
        .query({
          size: 5,
          page: 3,
          sort: 'id',
          tenantId,
          businessArtifactDefinitionId,
          businessArtifactDefinitionCode: 'CODE',
          value: ['FIELD_1 eq 1', 'FIELD_2 eq 2'],
          deleted: 'EXCLUDE',
        })
        .reply(200, JSON.stringify(businessArtifacts))

      const response = await kuFlowActivities.KuFlow_Engine_findBusinessArtifacts({
        size: 5,
        page: 3,
        sorts: ['id'],
        tenantIds: [tenantId],
        businessArtifactDefinitionIds: [businessArtifactDefinitionId],
        businessArtifactDefinitionCodes: ['CODE'],
        values: ['FIELD_1 eq 1', 'FIELD_2 eq 2'],
        deleted: 'EXCLUDE',
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifacts })
    })

    test('KuFlow_Engine_createBusinessArtifact', async () => {
      const businessArtifact = mockBusinessArtifact()
      const scope = nock(API)
        .post(
          '/business-artifacts',
          body =>
            body.id === businessArtifact.id &&
            body.tenantId === businessArtifact.tenantId &&
            body.businessArtifactDefinitionCode === 'CODE' &&
            body.data.value.key === 'value',
        )
        .reply(201, JSON.stringify(businessArtifact))

      const response = await kuFlowActivities.KuFlow_Engine_createBusinessArtifact({
        id: businessArtifact.id,
        tenantId: businessArtifact.tenantId,
        businessArtifactDefinitionCode: 'CODE',
        data: { value: { key: 'value' } },
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifact })
    })

    test('KuFlow_Engine_retrieveBusinessArtifact', async () => {
      const businessArtifact = mockBusinessArtifact()
      const scope = nock(API)
        .get(`/business-artifacts/${businessArtifact.id}`)
        .reply(200, JSON.stringify(businessArtifact))

      const response = await kuFlowActivities.KuFlow_Engine_retrieveBusinessArtifact({
        businessArtifactId: businessArtifact.id,
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifact })
    })

    test('KuFlow_Engine_deleteBusinessArtifact', async () => {
      const businessArtifactId = randomUUID()
      const scope = nock(API).delete(`/business-artifacts/${businessArtifactId}`).reply(204)

      const response = await kuFlowActivities.KuFlow_Engine_deleteBusinessArtifact({ businessArtifactId })

      scope.done()
      expect(response).toStrictEqual({})
    })

    test('KuFlow_Engine_updateBusinessArtifact', async () => {
      const businessArtifact = mockBusinessArtifact()
      const scope = nock(API)
        .put(`/business-artifacts/${businessArtifact.id}/data`, body => body.data.value.key === 'value')
        .reply(200, JSON.stringify(businessArtifact))

      const response = await kuFlowActivities.KuFlow_Engine_updateBusinessArtifact({
        businessArtifactId: businessArtifact.id,
        data: { value: { key: 'value' } },
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifact })
    })

    test('KuFlow_Engine_patchBusinessArtifact', async () => {
      const businessArtifact = mockBusinessArtifact()
      const scope = nock(API)
        .patch(`/business-artifacts/${businessArtifact.id}/data`, body => body[0].path === '/key')
        .reply(200, JSON.stringify(businessArtifact))

      const response = await kuFlowActivities.KuFlow_Engine_patchBusinessArtifact({
        businessArtifactId: businessArtifact.id,
        jsonPatch,
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifact })
    })

    test('KuFlow_Engine_createBusinessArtifactAction', async () => {
      const businessArtifactId = randomUUID()
      const businessArtifactAction = mockBusinessArtifactAction()
      const scope = nock(API)
        .post(
          `/business-artifacts/${businessArtifactId}/actions`,
          body =>
            body.id === businessArtifactAction.id &&
            body.businessArtifactActionDefinitionCode === 'ACTION_CODE' &&
            body.startWorkflow.input.value.key === 'value',
        )
        .reply(200, JSON.stringify(businessArtifactAction))

      const response = await kuFlowActivities.KuFlow_Engine_createBusinessArtifactAction({
        businessArtifactId,
        id: businessArtifactAction.id,
        businessArtifactActionDefinitionCode: 'ACTION_CODE',
        startWorkflow: { input: { value: { key: 'value' } } },
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifactAction })
    })

    test('KuFlow_Engine_retrieveBusinessArtifactAction', async () => {
      const businessArtifactId = randomUUID()
      const businessArtifactAction = mockBusinessArtifactAction()
      const scope = nock(API)
        .get(`/business-artifacts/${businessArtifactId}/actions/${businessArtifactAction.id}`)
        .reply(200, JSON.stringify(businessArtifactAction))

      const response = await kuFlowActivities.KuFlow_Engine_retrieveBusinessArtifactAction({
        businessArtifactId,
        businessArtifactActionId: businessArtifactAction.id,
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifactAction })
    })

    test('KuFlow_Engine_cancelBusinessArtifactAction', async () => {
      const businessArtifactId = randomUUID()
      const businessArtifactAction = mockBusinessArtifactAction()
      const scope = nock(API)
        .post(`/business-artifacts/${businessArtifactId}/actions/${businessArtifactAction.id}/~actions/cancel`)
        .reply(200, JSON.stringify(businessArtifactAction))

      const response = await kuFlowActivities.KuFlow_Engine_cancelBusinessArtifactAction({
        businessArtifactId,
        businessArtifactActionId: businessArtifactAction.id,
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifactAction })
    })

    test('KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact', async () => {
      const businessArtifactId = randomUUID()
      const prepare = { businessArtifactDefinitionRef: { id: randomUUID(), code: 'CODE' }, value: { key: 'value' } }
      const scope = nock(API)
        .post(
          `/business-artifacts/${businessArtifactId}/~actions/prepare-create-artifact`,
          body => body.businessArtifactActionDefinitionCode === 'ACTION_CODE',
        )
        .reply(200, JSON.stringify(prepare))

      const response = await kuFlowActivities.KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact({
        businessArtifactId,
        businessArtifactActionDefinitionCode: 'ACTION_CODE',
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifactActionCreateArtifactPrepare: prepare })
    })

    test('KuFlow_Engine_prepareBusinessArtifactActionStartProcess', async () => {
      const businessArtifactId = randomUUID()
      const prepare = { processDefinitionId: randomUUID(), metadata: { key: 'value' } }
      const scope = nock(API)
        .post(
          `/business-artifacts/${businessArtifactId}/~actions/prepare-start-process`,
          body => body.businessArtifactActionDefinitionCode === 'ACTION_CODE',
        )
        .reply(200, JSON.stringify(prepare))

      const response = await kuFlowActivities.KuFlow_Engine_prepareBusinessArtifactActionStartProcess({
        businessArtifactId,
        businessArtifactActionDefinitionCode: 'ACTION_CODE',
      })

      scope.done()
      expect(response).toStrictEqual({ businessArtifactActionStartProcessPrepare: prepare })
    })
  })

  describe('Validations', () => {
    const id = randomUUID()
    const data = { value: {} }

    // [activity, request, expected message]. Every required field of every request has its own case.
    const cases: Array<[keyof KuFlowActivities, Record<string, unknown>, string]> = [
      ['KuFlow_Engine_retrievePrincipal', {}, "'principalId' is required"],
      ['KuFlow_Engine_retrieveTenantUser', {}, "'tenantUserId' is required"],
      ['KuFlow_Engine_retrieveProcess', {}, "'processId' is required"],
      ['KuFlow_Engine_deleteProcess', {}, "'processId' is required"],
      ['KuFlow_Engine_updateProcessEntity', { entity: data }, "'processId' is required"],
      ['KuFlow_Engine_updateProcessEntity', { processId: id }, "'entity' is required"],
      ['KuFlow_Engine_patchProcessEntity', { jsonPatch }, "'processId' is required"],
      ['KuFlow_Engine_patchProcessEntity', { processId: id }, "'jsonPatch' is required"],
      ['KuFlow_Engine_updateProcessMetadata', { metadata: data }, "'processId' is required"],
      ['KuFlow_Engine_updateProcessMetadata', { processId: id }, "'metadata' is required"],
      ['KuFlow_Engine_patchProcessMetadata', { jsonPatch }, "'processId' is required"],
      ['KuFlow_Engine_patchProcessMetadata', { processId: id }, "'jsonPatch' is required"],
      ['KuFlow_Engine_changeProcessInitiator', { initiatorId: id }, "'processId' is required"],
      ['KuFlow_Engine_changeProcessInitiator', { processId: id }, "'initiatorId' or 'initiatorEmail' is required"],
      ['KuFlow_Engine_createProcessAction', { processActionDefinitionCode: 'CODE' }, "'processId' is required"],
      ['KuFlow_Engine_createProcessAction', { processId: id }, "'processActionDefinitionCode' is required"],
      ['KuFlow_Engine_retrieveProcessAction', { processActionId: id }, "'processId' is required"],
      ['KuFlow_Engine_retrieveProcessAction', { processId: id }, "'processActionId' is required"],
      ['KuFlow_Engine_cancelProcessAction', { processActionId: id }, "'processId' is required"],
      ['KuFlow_Engine_cancelProcessAction', { processId: id }, "'processActionId' is required"],
      ['KuFlow_Engine_cancelProcessItems', {}, "'processId' is required"],
      ['KuFlow_Engine_retrieveProcessItem', {}, "'processItemId' is required"],
      ['KuFlow_Engine_createProcessItem', { processId: id, type: 'TASK' }, "'id' is required"],
      ['KuFlow_Engine_createProcessItem', { id, type: 'TASK' }, "'processId' is required"],
      ['KuFlow_Engine_createProcessItem', { id, processId: id }, "'type' is required"],
      [
        'KuFlow_Engine_createProcessItem',
        { id, processId: id, type: 'TASK' },
        "'processItemDefinitionCode' is required for task items",
      ],
      [
        'KuFlow_Engine_createProcessItem',
        { id, processId: id, type: 'MESSAGE' },
        "'message' is required for message items",
      ],
      [
        'KuFlow_Engine_createProcessItem',
        { id, processId: id, type: 'MESSAGE', message: {} },
        "'message.text' and/or 'message.data' is required for message items",
      ],
      [
        'KuFlow_Engine_createProcessItem',
        { id, processId: id, type: 'MESSAGE', message: { data } },
        "'message.dataStructureDataDefinitionCode' is required for message items when 'message.data' is set",
      ],
      [
        'KuFlow_Engine_createProcessItem',
        { id, processId: id, type: 'THREAD' },
        "'processItemDefinitionCode' is required for thread items",
      ],
      [
        'KuFlow_Engine_createProcessItem',
        { id, processId: id, type: 'THREAD', processItemDefinitionCode: 'CODE', processItemThreadId: id },
        "'processItemThreadId' is not allowed for thread items, threads cannot be nested",
      ],
      ['KuFlow_Engine_completeProcessItemTask', {}, "'processItemId' is required"],
      ['KuFlow_Engine_claimProcessItemTask', {}, "'processItemId' is required"],
      ['KuFlow_Engine_assignProcessItemTask', { ownerId: id }, "'processItemId' is required"],
      ['KuFlow_Engine_assignProcessItemTask', { processItemId: id }, "'ownerEmail' or 'ownerId' is required"],
      ['KuFlow_Engine_updateProcessItemTaskData', { data }, "'processItemId' is required"],
      ['KuFlow_Engine_updateProcessItemTaskData', { processItemId: id }, "'data' is required"],
      ['KuFlow_Engine_updateProcessItemTaskContextData', { data }, "'processItemId' is required"],
      ['KuFlow_Engine_updateProcessItemTaskContextData', { processItemId: id }, "'data' is required"],
      ['KuFlow_Engine_patchProcessItemTaskData', { jsonPatch }, "'processItemId' is required"],
      ['KuFlow_Engine_patchProcessItemTaskData', { processItemId: id }, "'jsonPatch' is required"],
      ['KuFlow_Engine_appendProcessItemTaskLog', { message: 'm', level: 'INFO' }, "'processItemId' is required"],
      ['KuFlow_Engine_appendProcessItemTaskLog', { processItemId: id, level: 'INFO' }, "'message' is required"],
      ['KuFlow_Engine_appendProcessItemTaskLog', { processItemId: id, message: 'm' }, "'level' is required"],
      ['KuFlow_Engine_generateProcessItemAiAssistance', { requestId: id }, "'processItemId' is required"],
      ['KuFlow_Engine_generateProcessItemAiAssistance', { processItemId: id }, "'requestId' is required"],
      ['KuFlow_Engine_retrieveProcessItemAiAssistance', {}, "'processItemId' is required"],
      [
        'KuFlow_Engine_createBusinessArtifact',
        { tenantId: id },
        "'businessArtifactDefinitionId' or 'businessArtifactDefinitionCode' is required",
      ],
      ['KuFlow_Engine_retrieveBusinessArtifact', {}, "'businessArtifactId' is required"],
      ['KuFlow_Engine_deleteBusinessArtifact', {}, "'businessArtifactId' is required"],
      ['KuFlow_Engine_updateBusinessArtifact', { data }, "'businessArtifactId' is required"],
      ['KuFlow_Engine_updateBusinessArtifact', { businessArtifactId: id }, "'data' is required"],
      ['KuFlow_Engine_patchBusinessArtifact', { jsonPatch }, "'businessArtifactId' is required"],
      ['KuFlow_Engine_patchBusinessArtifact', { businessArtifactId: id }, "'jsonPatch' is required"],
      [
        'KuFlow_Engine_createBusinessArtifactAction',
        { businessArtifactActionDefinitionCode: 'CODE' },
        "'businessArtifactId' is required",
      ],
      [
        'KuFlow_Engine_createBusinessArtifactAction',
        { businessArtifactId: id },
        "'businessArtifactActionDefinitionCode' is required",
      ],
      [
        'KuFlow_Engine_retrieveBusinessArtifactAction',
        { businessArtifactActionId: id },
        "'businessArtifactId' is required",
      ],
      [
        'KuFlow_Engine_retrieveBusinessArtifactAction',
        { businessArtifactId: id },
        "'businessArtifactActionId' is required",
      ],
      [
        'KuFlow_Engine_cancelBusinessArtifactAction',
        { businessArtifactActionId: id },
        "'businessArtifactId' is required",
      ],
      [
        'KuFlow_Engine_cancelBusinessArtifactAction',
        { businessArtifactId: id },
        "'businessArtifactActionId' is required",
      ],
      [
        'KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact',
        { businessArtifactActionDefinitionCode: 'CODE' },
        "'businessArtifactId' is required",
      ],
      [
        'KuFlow_Engine_prepareBusinessArtifactActionCreateArtifact',
        { businessArtifactId: id },
        "'businessArtifactActionDefinitionCode' is required",
      ],
      [
        'KuFlow_Engine_prepareBusinessArtifactActionStartProcess',
        { businessArtifactActionDefinitionCode: 'CODE' },
        "'businessArtifactId' is required",
      ],
      [
        'KuFlow_Engine_prepareBusinessArtifactActionStartProcess',
        { businessArtifactId: id },
        "'businessArtifactActionDefinitionCode' is required",
      ],
    ]

    test.each(cases)('%s rejects %j', async (activityName, request, expectedMessage) => {
      const activity = kuFlowActivities[activityName] as (request: unknown) => Promise<unknown>

      const error = await activity(request).then(
        () => undefined,
        (e: unknown) => e,
      )

      expect(error).toBeInstanceOf(ApplicationFailure)
      const failure = error as ApplicationFailure
      expect(failure.type).toStrictEqual('KuFlowActivities.ValidationFailure')
      expect(failure.nonRetryable).toStrictEqual(true)
      expect(failure.message).toStrictEqual(expectedMessage)
    })

    test('Every activity with required fields has validation cases', () => {
      const activitiesWithoutRequiredFields = [
        'KuFlow_Engine_findProcesses',
        'KuFlow_Engine_findProcessItems',
        'KuFlow_Engine_findBusinessArtifacts',
      ]
      const activitiesWithCases = new Set(cases.map(([activityName]) => activityName))

      const activitiesMissingCases = Object.keys(kuFlowActivities).filter(
        activityName =>
          !activitiesWithoutRequiredFields.includes(activityName) &&
          !activitiesWithCases.has(activityName as keyof KuFlowActivities),
      )

      expect(activitiesMissingCases).toStrictEqual([])
    })
  })
})
