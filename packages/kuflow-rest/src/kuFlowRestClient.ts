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
import { AccessToken, TokenCredential } from '@azure/core-auth'
import { CommonClientOptions } from '@azure/core-client'

import { KuFlowRestClientGenerated } from './generated'
import { AuthenticationOperations, PrincipalOperations, ProcessOperations, TaskOperations } from './operations'

export interface KuFlowRestClientCredential {
  /** Client ID. */
  clientId: string

  /** password client. */
  clientSecret: string
}

export interface KuFlowRestClientOptionals extends CommonClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string
}

export class KuFlowRestClient {
  /**
   * Authentication API operations.
   */
  public readonly authenticationOperations: AuthenticationOperations

  /**
   * Principal API operations.
   */
  public readonly principalOperations: PrincipalOperations

  /**
   * Process API operations.
   */
  public readonly processOperations: ProcessOperations

  /**
   * Task API operations.
   */
  public readonly taskOperations: TaskOperations

  /**
   * Initializes a new instance of the KuFlowClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param options The parameter options
   */
  constructor(credentials: KuFlowRestClientCredential, options?: KuFlowRestClientOptionals) {
    const tokenCredential = kuflowTokenCredential(credentials)
    const clientGenerated = new KuFlowRestClientGenerated(tokenCredential, options)

    this.authenticationOperations = new AuthenticationOperations(clientGenerated)
    this.principalOperations = new PrincipalOperations(clientGenerated)
    this.processOperations = new ProcessOperations(clientGenerated)
    this.taskOperations = new TaskOperations(clientGenerated)
  }
}

function kuflowTokenCredential(credentials: KuFlowRestClientCredential): TokenCredential {
  const accessToken: AccessToken = {
    token: Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString('base64'),
    expiresOnTimestamp: Number.MAX_VALUE,
  }

  return {
    async getToken(): Promise<AccessToken | null> {
      return accessToken
    },
  }
}