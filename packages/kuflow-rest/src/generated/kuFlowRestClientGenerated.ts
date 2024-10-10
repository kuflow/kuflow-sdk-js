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

import type * as coreAuth from '@azure/core-auth'
import * as coreClient from '@azure/core-client'

import type { KuFlowRestClientGeneratedOptionalParams } from './models'
import {
  AuthenticationOperationsImpl,
  PrincipalOperationsImpl,
  ProcessItemOperationsImpl,
  ProcessOperationsImpl,
  RobotOperationsImpl,
  TenantOperationsImpl,
  TenantUserOperationsImpl,
  WorkerOperationsImpl,
} from './operations'
import type {
  AuthenticationOperations,
  PrincipalOperations,
  ProcessItemOperations,
  ProcessOperations,
  RobotOperations,
  TenantOperations,
  TenantUserOperations,
  WorkerOperations,
} from './operationsInterfaces'

/** @internal */
export class KuFlowRestClientGenerated extends coreClient.ServiceClient {
  $host: string

  /**
   * Initializes a new instance of the KuFlowRestClientGenerated class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param options The parameter options
   */
  constructor(credentials: coreAuth.TokenCredential, options?: KuFlowRestClientGeneratedOptionalParams) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null")
    }

    // Initializing default values for options
    if (!options) {
      options = {}
    }
    const defaults: KuFlowRestClientGeneratedOptionalParams = {
      requestContentType: 'application/json; charset=utf-8',
      credential: credentials,
    }

    const packageDetails = `sdk-js-kuflow-rest/${require('../../package.json').version}`
    const userAgentPrefix = options.userAgentOptions?.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
      : `${packageDetails}`

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint: options.endpoint ?? options.baseUri ?? 'https://api.kuflow.com/v2024-06-14',
    }
    super(optionsWithDefaults)

    // Assigning values to Constant parameters
    this.$host = options.$host || 'https://api.kuflow.com/v2024-06-14'
    this.authenticationOperations = new AuthenticationOperationsImpl(this)
    this.principalOperations = new PrincipalOperationsImpl(this)
    this.tenantOperations = new TenantOperationsImpl(this)
    this.tenantUserOperations = new TenantUserOperationsImpl(this)
    this.processOperations = new ProcessOperationsImpl(this)
    this.processItemOperations = new ProcessItemOperationsImpl(this)
    this.workerOperations = new WorkerOperationsImpl(this)
    this.robotOperations = new RobotOperationsImpl(this)
  }

  authenticationOperations: AuthenticationOperations
  principalOperations: PrincipalOperations
  tenantOperations: TenantOperations
  tenantUserOperations: TenantUserOperations
  processOperations: ProcessOperations
  processItemOperations: ProcessItemOperations
  workerOperations: WorkerOperations
  robotOperations: RobotOperations
}
