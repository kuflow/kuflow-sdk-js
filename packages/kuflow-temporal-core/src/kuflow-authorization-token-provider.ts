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
import { type Authentication, type AuthenticationCreateParams } from '@kuflow/kuflow-rest'
import { type NativeConnection, Runtime } from '@temporalio/worker'

import { type KuFlowTemporalConnectionOptions } from './kuflow-temporal-connection-options'

const NOOP = (): void => {}

export interface KuFlowAuthorizationTokenProviderBackoff {
  /**
   * Milliseconds between errors
   */
  sleep?: number

  /**
   * Maximum sleep in milliseconds
   */
  maxSleep?: number

  /**
   * Exponential rate applied if the error persists
   */
  exponentialRate?: number
}

export interface KuFlowAuthorizationTokenProviderParams {
  temporalConnection: NativeConnection

  options: KuFlowTemporalConnectionOptions
}

export class KuFlowAuthorizationTokenProvider {
  private readonly backoff: Required<KuFlowAuthorizationTokenProviderBackoff>

  private consecutiveFailures = 0

  private refreshTimeout?: NodeJS.Timeout

  public static instance(params: KuFlowAuthorizationTokenProviderParams): KuFlowAuthorizationTokenProvider {
    const kuFlowTemporalConnection = new KuFlowAuthorizationTokenProvider(params.temporalConnection, params.options)
    kuFlowTemporalConnection.scheduleAuthorizationTokenRenovation()

    return kuFlowTemporalConnection
  }

  private constructor(
    private readonly temporalConnection: NativeConnection,
    private readonly options: KuFlowTemporalConnectionOptions,
  ) {
    const backoff = options.kuflow.authorizationTokenProviderBackoff

    this.backoff = {
      sleep: backoff?.sleep ?? 1_000,
      maxSleep: backoff?.maxSleep ?? 5 * 60 * 1_000,
      exponentialRate: backoff?.exponentialRate ?? 2.5,
    }
  }

  public async close(): Promise<void> {
    this.refreshTimeout != null && clearTimeout(this.refreshTimeout)
    this.refreshTimeout = undefined
  }

  private scheduleAuthorizationTokenRenovation(refreshInMs?: number): void {
    refreshInMs = refreshInMs ?? 0
    this.refreshTimeout = setTimeout(() => {
      this.refreshAuthorizationTokenRenovation().then(NOOP).catch(NOOP)
    }, refreshInMs)
  }

  private async refreshAuthorizationTokenRenovation(): Promise<void> {
    try {
      const authentication = await this.createAuthentication()
      this.consecutiveFailures = 0

      const engineToken = authentication.engineToken

      if (engineToken?.token != null) {
        await this.temporalConnection.setMetadata({
          authorization: `Bearer ${engineToken?.token}`,
        })
      }

      const expiredAtDate = engineToken?.expiredAt != null ? new Date(engineToken.expiredAt) : undefined
      const refreshInMs = expiredAtDate == null ? 0 : (expiredAtDate.getTime() - new Date().getTime()) / 2

      this.scheduleAuthorizationTokenRenovation(refreshInMs)
    } catch (error) {
      this.consecutiveFailures++

      const retryDurationMs = Math.round(
        this.backoff.sleep * Math.pow(this.backoff.exponentialRate, this.consecutiveFailures),
      )
      const refreshInMs = Math.min(retryDurationMs, this.backoff.maxSleep)

      this.scheduleAuthorizationTokenRenovation(refreshInMs)

      Runtime.instance().logger.error('Error requesting authorization token', {
        consecutiveFailures: this.consecutiveFailures,
        refreshInMs,
        error,
      })
    }
  }

  private async createAuthentication(): Promise<Authentication> {
    const authenticationParams: AuthenticationCreateParams = {
      type: 'ENGINE_TOKEN',
      tenantId: this.options.kuflow.tenantId,
    }

    return await this.options.kuflow.restClient.authenticationOperations.createAuthentication(authenticationParams)
  }
}
