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
import { type Document, type DocumentUploadDocumentResponse, KuFlowRestClient } from '@kuflow/kuflow-rest'
import { randomUUID } from 'crypto'
import nock from 'nock'

import { streamToString } from './utils/stream'

const clientId = 'USER1'
const clientSecret = 'PASS1'
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const kuFlowRestClient = new KuFlowRestClient({ clientId, clientSecret })

describe('API /documents', () => {
  describe('POST /documents/~actions/upload', () => {
    test('Check happy path', async () => {
      const targetUri = `ku:process/${randomUUID()}`
      const expectedObject: DocumentUploadDocumentResponse = {
        documentUri: 'kuflow-file:uri=xxx-yyy-zzz;type=application/json;size=500;name=file.json;',
      }
      const document: Document = {
        contentType: 'application/json',
        fileName: 'file.json',
        fileContent: '{}',
      }

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .post('/documents/~actions/upload', '{}')
        .matchHeader('authorization', 'Bearer ' + token)
        .query({
          fileContentType: document.contentType,
          fileName: document.fileName,
          targetUri,
        })
        .reply(200, JSON.stringify(expectedObject))

      const documentReference = await kuFlowRestClient.documentOperations.uploadDocument(targetUri, document)

      scope.done()

      expect(documentReference).toStrictEqual(expectedObject)
    })
  })

  describe('GET /documents/~actions/download', () => {
    test('Check happy path', async () => {
      const documentUri = `ku:business-artifact/${randomUUID()}/documents/${randomUUID()}`

      const scope = nock('https://api.kuflow.com/v2024-06-14')
        .get('/documents/~actions/download')
        .query({
          documentUri,
        })
        .reply(200, '{}')

      const download = await kuFlowRestClient.documentOperations.downloadDocument(documentUri)

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
