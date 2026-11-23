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

import type * as coreRestPipeline from '@azure/core-rest-pipeline'

import type {
  DocumentDownloadDocumentOptionalParams,
  DocumentDownloadDocumentResponse,
  DocumentUploadDocumentOptionalParams,
  DocumentUploadDocumentResponse,
} from '../models'

/** Interface representing a Document. */
export interface Document {
  /**
   * Upload a temporal document that later on must be linked with a domain resource.
   *
   * The document belongs to the credentials that upload it, and its reference has the URI
   * `ku:storage-staging/{id}`. Only those credentials can download it and link it, by sending its
   * reference in
   * the data of any resource they can update: the entity of a process, the data of a task, the value of
   * a
   * business artifact or the result of a downloadable action. The permission on that resource is checked
   * when the
   * data is saved. Linking copies the document into the resource, which gets a reference of its own; the
   * uploaded
   * document can be linked only once, and a save sent again with the same reference is accepted.
   *
   * Documents not linked are deleted after 2 hours.
   *
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param file Document to save.
   * @param options The options parameters.
   */
  uploadDocument: (
    fileContentType: string,
    fileName: string,
    file: coreRestPipeline.RequestBodyType,
    options?: DocumentUploadDocumentOptionalParams,
  ) => Promise<DocumentUploadDocumentResponse>
  /**
   * Given a document uri, download its content. Accepts both the `kuflow-file:` reference returned
   * by the upload operations and a plain `ku:` document uri.
   *
   * The credentials must be able to read the resource that owns the document; a document outside
   * their reach, or a uri that does not resolve to a document, answers `404`.
   *
   * @param documentUri Document URI to download, in `kuflow-file:` or `ku:` form.
   * @param options The options parameters.
   */
  downloadDocument: (
    documentUri: string,
    options?: DocumentDownloadDocumentOptionalParams,
  ) => Promise<DocumentDownloadDocumentResponse>
}
