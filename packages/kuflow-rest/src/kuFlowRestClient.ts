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

import type { AccessToken, TokenCredential } from '@azure/core-auth'
import type { CommonClientOptions } from '@azure/core-client'

import { KuFlowRestClientGenerated } from './generated'
import {
  AuthenticationOperations,
  GroupOperations,
  KmsOperations,
  PrincipalOperations,
  ProcessItemOperations,
  ProcessOperations,
  RobotOperations,
  TenantOperations,
  TenantUserOperations,
  WorkerOperations,
} from './operations'

export interface KuFlowRestClientAuthenticationOptions {
  /** Client ID. */
  clientId?: string

  /** Client Secret. */
  clientSecret?: string

  /** Token Credential. */
  credential?: TokenCredential
}

export interface KuFlowRestClientOptionals extends CommonClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string
}

export class KuFlowRestClient {
  public static readonly API_VERSION = 'v2024-06-14'

  /**
   * Authentication API operations.
   */
  public readonly authenticationOperations: AuthenticationOperations

  /**
   * KMS API operations.
   */
  public readonly kmsOperations: KmsOperations

  /**
   * Principal API operations.
   */
  public readonly principalOperations: PrincipalOperations

  /**
   * Group API operations.
   */
  public readonly groupOperations: GroupOperations

  /**
   * Tenant API operations.
   */
  public readonly tenantOperations: TenantOperations

  /**
   * Tenant User API operations.
   */
  public readonly tenantUserOperations: TenantUserOperations

  /**
   * Process API operations.
   */
  public readonly processOperations: ProcessOperations

  /**
   * Process Item API operations.
   */
  public readonly processItemOperations: ProcessItemOperations

  /**
   * Worker API operations.
   */
  public readonly workerOperations: WorkerOperations

  /**
   * Robot API operations.
   */
  public readonly robotOperations: RobotOperations

  /**
   * Initializes a new instance of the KuFlowClient class.
   * @param authentication Credentials which uniquely identify the client.
   * @param options The parameter options
   */
  public constructor(authentication: KuFlowRestClientAuthenticationOptions, options?: KuFlowRestClientOptionals) {
    options = this.normalizeOptions(options)

    const tokenCredential = kuflowTokenCredential(authentication)
    const clientGenerated = new KuFlowRestClientGenerated(tokenCredential, {
      ...options,
      credentialScopes: 'https://api.kuflow.com/v2024-06-14/.default',
    })

    this.authenticationOperations = new AuthenticationOperations(clientGenerated)
    this.kmsOperations = new KmsOperations(clientGenerated)
    this.principalOperations = new PrincipalOperations(clientGenerated)
    this.groupOperations = new GroupOperations(clientGenerated)
    this.tenantOperations = new TenantOperations(clientGenerated)
    this.tenantUserOperations = new TenantUserOperations(clientGenerated)
    this.processOperations = new ProcessOperations(clientGenerated)
    this.processItemOperations = new ProcessItemOperations(clientGenerated)
    this.workerOperations = new WorkerOperations(clientGenerated)
    this.robotOperations = new RobotOperations(clientGenerated)
  }

  private normalizeOptions(options: KuFlowRestClientOptionals | undefined): KuFlowRestClientOptionals | undefined {
    if (options == null) {
      return undefined
    }

    if (options.endpoint != null) {
      options.endpoint = options.endpoint.trim()
      if (!options.endpoint.endsWith(`/${KuFlowRestClient.API_VERSION}`)) {
        options.endpoint = `${options.endpoint}/${KuFlowRestClient.API_VERSION}`
      }
    }

    return options
  }
}

function kuflowTokenCredential(authentication: KuFlowRestClientAuthenticationOptions): TokenCredential {
  if (authentication.credential != null) {
    return authentication.credential
  }

  if (authentication.clientId != null && authentication.clientSecret != null) {
    const accessToken: AccessToken = {
      token: Buffer.from(`${authentication.clientId}:${authentication.clientSecret}`).toString('base64'),
      expiresOnTimestamp: Number.MAX_VALUE,
    }

    return {
      async getToken(): Promise<AccessToken | null> {
        return accessToken
      },
    }
  }

  throw new Error('credential or clientId/clientSecret is required')
}
