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
   * Upload a temporal document that later on must be linked with a domain resource of its target.
   *
   * The target resource is identified by `targetUri`:
   *
   *   * `ku:process/{processId}`: the document is deleted after 2 hours as long as it has not been
   *     linked to the process or to one of its process items.
   *   * `ku:business-artifact/{businessArtifactId}`: the document is deleted after 2 hours as long
   *     as it has not been linked to the business artifact.
   *
   * A target the credentials cannot read answers `404`.
   *
   * @param targetUri URI of the resource the document is uploaded for. Supported forms are
   *                  `ku:process/{id}`
   *                  and `ku:business-artifact/{id}`.
   *
   * @param fileContentType Document content type
   * @param fileName Document name
   * @param file Document to save.
   * @param options The options parameters.
   */
  uploadDocument: (
    targetUri: string,
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
