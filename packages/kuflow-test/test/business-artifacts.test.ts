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
  type BusinessArtifactActionCreateArtifactPrepare,
  type BusinessArtifactActionCreateParams,
  type BusinessArtifactActionStartProcessPrepare,
  type BusinessArtifactCreateParams,
  type BusinessArtifactDataUpdateParams,
  type BusinessArtifactUploadBusinessArtifactDocumentResponse,
  type Document,
  type JsonPatchOperation,
  KuFlowRestClient,
} from '@kuflow/kuflow-rest'
import { randomUUID } from 'crypto'
import nock from 'nock'

import { mockBusinessArtifact, mockBusinessArtifactAction, mockBusinessArtifactPage } from './utils/fixtures'
import { streamToString } from './utils/stream'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /business-artifacts', () => {
  describe('GET /business-artifacts', () => {
    test('Check that security header is added', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/business-artifacts')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({ size: 25, page: 0 })
        .reply(200, {})

      await kuFlowRestClient.businessArtifactOperations.findBusinessArtifacts()

      scope.done()
    })

    test('Check happy path', async () => {
      const expectedObject = mockBusinessArtifactPage()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/business-artifacts')
        .query({ size: 25, page: 0 })
        .reply(200, JSON.stringify(expectedObject))

      const businessArtifacts = await kuFlowRestClient.businessArtifactOperations.findBusinessArtifacts()

      scope.done()

      expect(businessArtifacts).toStrictEqual(expectedObject)
    })

    test('Check that query params are correctly serialized - Single values', async () => {
      const tenantId = randomUUID()
      const businessArtifactDefinitionId = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/business-artifacts')
        .query({
          size: 30,
          page: 1,
          sort: 'sort1',
          tenantId,
          businessArtifactDefinitionId,
          businessArtifactDefinitionCode: 'CODE',
          value: 'FIELD eq 1',
          deleted: 'INCLUDE',
        })
        .reply(200, {})

      await kuFlowRestClient.businessArtifactOperations.findBusinessArtifacts({
        size: 30,
        page: 1,
        sort: 'sort1',
        tenantId,
        businessArtifactDefinitionId,
        businessArtifactDefinitionCode: 'CODE',
        value: 'FIELD eq 1',
        deleted: 'INCLUDE',
      })

      scope.done()
    })

    test('Check that query params are correctly serialized - Arrays with multiple values', async () => {
      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/business-artifacts')
        .query({
          size: 25,
          page: 0,
          sort: ['sort1', 'sort2'],
          businessArtifactDefinitionCode: ['CODE_1', 'CODE_2'],
          value: ['FIELD_1 eq 1', 'FIELD_2 contains a'],
        })
        .reply(200, {})

      await kuFlowRestClient.businessArtifactOperations.findBusinessArtifacts({
        sort: ['sort1', 'sort2'],
        businessArtifactDefinitionCode: ['CODE_1', 'CODE_2'],
        value: ['FIELD_1 eq 1', 'FIELD_2 contains a'],
      })

      scope.done()
    })
  })

  describe('POST /business-artifacts', () => {
    test('Check happy path', async () => {
      const expectedObject = mockBusinessArtifact()
      const params: BusinessArtifactCreateParams = {
        id: expectedObject.id,
        businessArtifactDefinitionCode: expectedObject.businessArtifactDefinitionRef.code,
        tenantId: expectedObject.tenantId,
        data: { value: { key: 'value' } },
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(
          '/business-artifacts',
          body =>
            body.id === params.id && body.businessArtifactDefinitionCode === params.businessArtifactDefinitionCode,
        )
        .reply(201, JSON.stringify(expectedObject))

      const businessArtifact = await kuFlowRestClient.businessArtifactOperations.createBusinessArtifact(params)

      scope.done()

      expect(businessArtifact).toStrictEqual(expectedObject)
    })
  })

  describe('GET /business-artifacts/{id}', () => {
    test('Check happy path', async () => {
      const expectedObject = mockBusinessArtifact()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/business-artifacts/${expectedObject.id}`)
        .reply(200, JSON.stringify(expectedObject))

      const businessArtifact = await kuFlowRestClient.businessArtifactOperations.retrieveBusinessArtifact(
        expectedObject.id,
      )

      scope.done()

      expect(businessArtifact).toStrictEqual(expectedObject)
    })
  })

  describe('DELETE /business-artifacts/{id}', () => {
    test('Check happy path', async () => {
      const businessArtifactId = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .delete(`/business-artifacts/${businessArtifactId}`)
        .reply(204)

      await kuFlowRestClient.businessArtifactOperations.deleteBusinessArtifact(businessArtifactId)

      scope.done()
    })
  })

  describe('POST /business-artifacts/{id}/~actions/restore', () => {
    test('Check happy path', async () => {
      const expectedObject = mockBusinessArtifact()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/business-artifacts/${expectedObject.id}/~actions/restore`)
        .reply(200, JSON.stringify(expectedObject))

      const businessArtifact = await kuFlowRestClient.businessArtifactOperations.restoreBusinessArtifact(
        expectedObject.id,
      )

      scope.done()

      expect(businessArtifact).toStrictEqual(expectedObject)
    })
  })

  describe('PUT /business-artifacts/{id}/data', () => {
    test('Check happy path', async () => {
      const expectedObject = mockBusinessArtifact()
      const params: BusinessArtifactDataUpdateParams = {
        data: { value: { key: 'value' } },
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .put(`/business-artifacts/${expectedObject.id}/data`, body => body.data.value.key === 'value')
        .reply(200, JSON.stringify(expectedObject))

      const businessArtifact = await kuFlowRestClient.businessArtifactOperations.updateBusinessArtifactData(
        expectedObject.id,
        params,
      )

      scope.done()

      expect(businessArtifact).toStrictEqual(expectedObject)
    })
  })

  describe('PATCH /business-artifacts/{id}/data', () => {
    test('Check happy path', async () => {
      const expectedObject = mockBusinessArtifact()
      const jsonPatch: JsonPatchOperation[] = [{ op: 'add', path: '/key', value: 'value' }]

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .patch(`/business-artifacts/${expectedObject.id}/data`, body => body[0].path === '/key')
        .reply(200, JSON.stringify(expectedObject))

      const businessArtifact = await kuFlowRestClient.businessArtifactOperations.patchBusinessArtifactData(
        expectedObject.id,
        jsonPatch,
      )

      scope.done()

      expect(businessArtifact).toStrictEqual(expectedObject)
    })
  })

  describe('POST /business-artifacts/{id}/actions', () => {
    test('Check happy path', async () => {
      const businessArtifactId = randomUUID()
      const expectedObject = mockBusinessArtifactAction()
      const params: BusinessArtifactActionCreateParams = {
        id: expectedObject.id,
        businessArtifactActionDefinitionCode: expectedObject.businessArtifactActionDefinitionRef.code,
        startWorkflow: { input: { value: { key: 'value' } } },
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(
          `/business-artifacts/${businessArtifactId}/actions`,
          body => body.businessArtifactActionDefinitionCode === params.businessArtifactActionDefinitionCode,
        )
        .reply(201, JSON.stringify(expectedObject))

      const businessArtifactAction = await kuFlowRestClient.businessArtifactOperations.createBusinessArtifactAction(
        businessArtifactId,
        params,
      )

      scope.done()

      expect(businessArtifactAction).toStrictEqual(expectedObject)
    })
  })

  describe('GET /business-artifacts/{id}/actions/{actionId}', () => {
    test('Check happy path', async () => {
      const businessArtifactId = randomUUID()
      const expectedObject = mockBusinessArtifactAction()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/business-artifacts/${businessArtifactId}/actions/${expectedObject.id}`)
        .reply(200, JSON.stringify(expectedObject))

      const businessArtifactAction = await kuFlowRestClient.businessArtifactOperations.retrieveBusinessArtifactAction(
        businessArtifactId,
        expectedObject.id,
      )

      scope.done()

      expect(businessArtifactAction).toStrictEqual(expectedObject)
    })
  })

  describe('POST /business-artifacts/{id}/actions/{actionId}/~actions/cancel', () => {
    test('Check happy path', async () => {
      const businessArtifactId = randomUUID()
      const expectedObject = mockBusinessArtifactAction()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/business-artifacts/${businessArtifactId}/actions/${expectedObject.id}/~actions/cancel`)
        .reply(200, JSON.stringify(expectedObject))

      const businessArtifactAction = await kuFlowRestClient.businessArtifactOperations.cancelBusinessArtifactAction(
        businessArtifactId,
        expectedObject.id,
      )

      scope.done()

      expect(businessArtifactAction).toStrictEqual(expectedObject)
    })
  })

  describe('POST /business-artifacts/{id}/~actions/prepare-create-artifact', () => {
    test('Check happy path', async () => {
      const businessArtifactId = randomUUID()
      const expectedObject: BusinessArtifactActionCreateArtifactPrepare = {
        businessArtifactDefinitionRef: {
          id: randomUUID(),
          code: 'TARGET_CODE',
        },
        value: { key: 'value' },
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(
          `/business-artifacts/${businessArtifactId}/~actions/prepare-create-artifact`,
          body => body.businessArtifactActionDefinitionCode === 'ACTION_CODE',
        )
        .reply(200, JSON.stringify(expectedObject))

      const prepare = await kuFlowRestClient.businessArtifactOperations.prepareBusinessArtifactActionCreateArtifact(
        businessArtifactId,
        { businessArtifactActionDefinitionCode: 'ACTION_CODE' },
      )

      scope.done()

      expect(prepare).toStrictEqual(expectedObject)
    })
  })

  describe('POST /business-artifacts/{id}/~actions/prepare-start-process', () => {
    test('Check happy path', async () => {
      const businessArtifactId = randomUUID()
      const expectedObject: BusinessArtifactActionStartProcessPrepare = {
        processDefinitionId: randomUUID(),
        metadata: { key: 'value' },
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(
          `/business-artifacts/${businessArtifactId}/~actions/prepare-start-process`,
          body => body.businessArtifactActionDefinitionCode === 'ACTION_CODE',
        )
        .reply(200, JSON.stringify(expectedObject))

      const prepare = await kuFlowRestClient.businessArtifactOperations.prepareBusinessArtifactActionStartProcess(
        businessArtifactId,
        { businessArtifactActionDefinitionCode: 'ACTION_CODE' },
      )

      scope.done()

      expect(prepare).toStrictEqual(expectedObject)
    })
  })

  describe('POST /business-artifacts/{id}/~actions/upload-document', () => {
    test('Check happy path', async () => {
      const businessArtifactId = randomUUID()
      const expectedObject: BusinessArtifactUploadBusinessArtifactDocumentResponse = {
        documentUri: 'kuflow-file:uri=xxx-yyy-zzz;type=application/json;size=500;name=file.json;',
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post(`/business-artifacts/${businessArtifactId}/~actions/upload-document`)
        .query({
          fileContentType: document.contentType,
          fileName: document.fileName,
        })
        .reply(200, JSON.stringify(expectedObject))

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const documentReference = await kuFlowRestClient.businessArtifactOperations.uploadBusinessArtifactDocument(
        businessArtifactId,
        document,
      )

      scope.done()

      expect(documentReference).toStrictEqual(expectedObject)
    })
  })

  describe('GET /business-artifacts/{id}/~actions/download-document', () => {
    test('Check happy path', async () => {
      const businessArtifactId = randomUUID()
      const documentUri = randomUUID()

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get(`/business-artifacts/${businessArtifactId}/~actions/download-document`)
        .query({
          documentUri,
        })
        .reply(200, '{}')

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const download = await kuFlowRestClient.businessArtifactOperations.downloadBusinessArtifactDocument(
        businessArtifactId,
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
