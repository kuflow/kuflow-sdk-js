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
import { Authentication, KuFlowRestClient } from '@kuflow/kuflow-rest'
import { NativeConnection } from '@temporalio/worker'

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

export interface KuFlowAuthorizationTokenProviderOptions {
  temporalConnection: NativeConnection

  kuFlowRestClient: KuFlowRestClient

  backoff?: KuFlowAuthorizationTokenProviderBackoff
}

export class KuFlowAuthorizationTokenProvider {
  private readonly kuFlowRestClient: KuFlowRestClient

  private readonly temporalConnection: NativeConnection

  private readonly backoff: Required<KuFlowAuthorizationTokenProviderBackoff>

  private consecutiveFailures = 0

  private refreshTimeout?: NodeJS.Timeout

  public static instance(options: KuFlowAuthorizationTokenProviderOptions): KuFlowAuthorizationTokenProvider {
    const { temporalConnection, kuFlowRestClient, backoff } = options

    const kuFlowTemporalConnection = new KuFlowAuthorizationTokenProvider(temporalConnection, kuFlowRestClient, backoff)
    kuFlowTemporalConnection.scheduleAuthorizationTokenRenovation()

    return kuFlowTemporalConnection
  }

  private constructor(
    temporalConnection: NativeConnection,
    kuFlowRestClient: KuFlowRestClient,
    backoff?: KuFlowAuthorizationTokenProviderBackoff,
  ) {
    this.temporalConnection = temporalConnection

    this.kuFlowRestClient = kuFlowRestClient

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

      if (authentication.token != null) {
        await this.temporalConnection.setMetadata({
          authorization: `Bearer ${authentication.token}`,
        })
      }

      const expiredAtDate = authentication.expiredAt != null ? new Date(authentication.expiredAt) : undefined
      const refreshInMs = expiredAtDate == null ? 0 : (expiredAtDate.getTime() - new Date().getTime()) / 2

      this.scheduleAuthorizationTokenRenovation(refreshInMs)
    } catch {
      this.consecutiveFailures++

      const retryDurationMs = Math.round(
        this.backoff.sleep * Math.pow(this.backoff.exponentialRate, this.consecutiveFailures),
      )
      const refreshInMs = Math.min(retryDurationMs, this.backoff.maxSleep)

      this.scheduleAuthorizationTokenRenovation(refreshInMs)
    }
  }

  private async createAuthentication(): Promise<Authentication> {
    const authenticationCreation: Authentication = {
      objectType: 'AUTHENTICATION',
      type: 'ENGINE',
    }
    return await this.kuFlowRestClient.authenticationOperations.createAuthentication(authenticationCreation)
  }
}
