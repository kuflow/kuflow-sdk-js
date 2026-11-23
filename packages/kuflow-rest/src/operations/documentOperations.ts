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

import type {
  Document as DocumentOperationsGenerated,
  DocumentDownloadDocumentOptionalParams,
  DocumentDownloadDocumentResponse,
  DocumentUploadDocumentOptionalParams,
  DocumentUploadDocumentResponse,
  KuFlowRestClientGenerated,
} from '../generated'
import type { Document } from '../models'

/** Class containing DocumentOperations operations. */
export class DocumentOperations {
  private readonly documentOperations: DocumentOperationsGenerated

  /**
   * Initialize a new instance of the class DocumentOperations class.
   * @param clientGenerated Reference to the service client
   */
  public constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.documentOperations = clientGenerated.document
  }

  /**
   * Upload a temporal document that later on must be linked with a domain resource.
   *
   * The document belongs to the credentials that upload it, and its reference has the URI
   * `ku:storage-staging/{id}`. Only those credentials can download it and link it, by sending its reference in
   * the data of any resource they can update; the permission on that resource is checked when the data is saved.
   *
   * Documents not linked are deleted after 2 hours.
   *
   * @param document Document to upload.
   * @param options The options parameters.
   */
  public async uploadDocument(
    document: Document,
    options?: DocumentUploadDocumentOptionalParams,
  ): Promise<DocumentUploadDocumentResponse>

  /**
   * Upload a temporal document that later on must be linked with a domain resource.
   *
   * @deprecated use `uploadDocument(document)` instead: the target is ignored.
   *
   * @param targetUri Ignored: the document can be linked to any resource the credentials can update.
   * @param document Document to upload.
   * @param options The options parameters.
   */
  public async uploadDocument(
    targetUri: string,
    document: Document,
    options?: DocumentUploadDocumentOptionalParams,
  ): Promise<DocumentUploadDocumentResponse>

  public async uploadDocument(
    documentOrTargetUri: Document | string,
    documentOrOptions?: Document | DocumentUploadDocumentOptionalParams,
    options?: DocumentUploadDocumentOptionalParams,
  ): Promise<DocumentUploadDocumentResponse> {
    // The deprecated signature still sends its target, which the API ignores
    if (typeof documentOrTargetUri === 'string') {
      const document = documentOrOptions as Document

      return await this.documentOperations.uploadDocument(
        document.contentType,
        document.fileName,
        document.fileContent,
        {
          ...options,
          targetUri: documentOrTargetUri,
        },
      )
    }

    const document = documentOrTargetUri
    const optionsUpload = documentOrOptions as DocumentUploadDocumentOptionalParams | undefined

    return await this.documentOperations.uploadDocument(
      document.contentType,
      document.fileName,
      document.fileContent,
      optionsUpload,
    )
  }

  /**
   * Given a document uri, download its content. Accepts both the `kuflow-file:` reference returned by the
   * upload operations and a plain `ku:` document uri.
   *
   * The credentials must be able to read the resource that owns the document; a document outside their reach,
   * or a uri that does not resolve to a document, answers `404`.
   *
   * @param documentUri Document URI to download, in `kuflow-file:` or `ku:` form.
   * @param options The options parameters.
   */
  public async downloadDocument(
    documentUri: string,
    options?: DocumentDownloadDocumentOptionalParams,
  ): Promise<DocumentDownloadDocumentResponse> {
    return await this.documentOperations.downloadDocument(documentUri, options)
  }
}
