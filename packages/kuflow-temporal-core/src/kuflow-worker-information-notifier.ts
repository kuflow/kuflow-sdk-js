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
import { type FullOperationResponse } from '@azure/core-client'
import { type KuFlowRestClient, type Worker } from '@kuflow/kuflow-rest'
import { Runtime } from '@temporalio/worker'
import os from 'os'

export interface KuFlowWorkerInformationNotifierBackoff {
  /**
   * Seconds between errors, default 1 second
   */
  sleep?: number

  /**
   * Exponential rate applied if the error persists, default 2.5
   */
  exponentialRate?: number
}

export interface KuFlowWorkerInformation {
  identity: string

  taskQueue: string

  workflowTypes: string[]

  activityTypes: string[]
}

export interface KuFlowWorkerInformationNotifierOptions {
  kuFlowRestClient: KuFlowRestClient

  workerInformation: KuFlowWorkerInformation

  backoff?: KuFlowWorkerInformationNotifierBackoff
}

const HEADER_X_KF_DELAY_WINDOW = 'x-kf-delay-window'

export class KuFlowWorkerInformationNotifier {
  private readonly kuFlowRestClient: KuFlowRestClient

  private readonly workerInformation: KuFlowWorkerInformation

  private readonly backoff: Required<KuFlowWorkerInformationNotifierBackoff>

  private started = false

  private delayWindowInSeconds = 5 * 60 // 5 min

  private consecutiveFailures = 0

  private scheduleCreateOrUpdateWorkerTimeout?: NodeJS.Timeout

  public static instance(options: KuFlowWorkerInformationNotifierOptions): KuFlowWorkerInformationNotifier {
    const { kuFlowRestClient, workerInformation, backoff } = options

    return new KuFlowWorkerInformationNotifier(kuFlowRestClient, workerInformation, backoff)
  }

  private constructor(
    kuFlowRestClient: KuFlowRestClient,
    workerInformation: KuFlowWorkerInformation,
    backoff?: KuFlowWorkerInformationNotifierBackoff,
  ) {
    this.kuFlowRestClient = kuFlowRestClient
    this.workerInformation = workerInformation

    this.backoff = {
      sleep: backoff?.sleep ?? 1,
      exponentialRate: backoff?.exponentialRate ?? 2.5,
    }
  }

  public async start(): Promise<void> {
    if (this.started) {
      return
    }

    await this.createOrUpdateWorker()
    this.scheduleCreateOrUpdateWorker()

    this.started = true
  }

  public async close(): Promise<void> {
    if (!this.started) {
      return
    }

    this.scheduleCreateOrUpdateWorkerTimeout != null && clearTimeout(this.scheduleCreateOrUpdateWorkerTimeout)
    this.scheduleCreateOrUpdateWorkerTimeout = undefined

    this.started = false
  }

  private async createOrUpdateWorker(): Promise<void> {
    const workerRequest: Worker = {
      identity: this.workerInformation.identity,
      ip: this.getIPAddress(),
      hostname: os.hostname(),
      taskQueue: this.workerInformation.taskQueue,
      workflowTypes: this.workerInformation.workflowTypes,
      activityTypes: this.workerInformation.activityTypes,
    }

    const workerOperations = this.kuFlowRestClient.workerOperations

    try {
      let rawResponse: FullOperationResponse | undefined
      const workerResponse = await workerOperations.createWorker(workerRequest, {
        onResponse: rawResponseInner => {
          rawResponse = rawResponseInner
        },
      })

      Runtime.instance().logger.info(
        `Registered worker ${workerResponse.taskQueue}/${workerResponse.identity} with id ${workerResponse.id}`,
      )
      this.consecutiveFailures = 0

      const delayWindowHeader = rawResponse?.headers.get(HEADER_X_KF_DELAY_WINDOW)

      if (delayWindowHeader != null) {
        this.delayWindowInSeconds = parseInt(delayWindowHeader, 10)
      }
    } catch (error) {
      Runtime.instance().logger.error(
        `There are some problems registering worker ${workerRequest.taskQueue}/${workerRequest.identity}`,
        { error },
      )
      this.consecutiveFailures++
    }
  }

  private scheduleCreateOrUpdateWorker(): void {
    let delayInSeconds = this.delayWindowInSeconds
    if (this.consecutiveFailures > 0) {
      delayInSeconds = Math.round(
        Math.min(delayInSeconds, this.backoff.sleep * Math.pow(this.backoff.exponentialRate, this.consecutiveFailures)),
      )
    }

    this.scheduleCreateOrUpdateWorkerTimeout != null && clearTimeout(this.scheduleCreateOrUpdateWorkerTimeout)
    this.scheduleCreateOrUpdateWorkerTimeout = setTimeout(() => {
      this.createOrUpdateWorker().then(
        () => {
          this.scheduleCreateOrUpdateWorker()
        },
        () => {
          this.scheduleCreateOrUpdateWorker()
        },
      )
    }, delayInSeconds * 1_000)
  }

  private getIPAddress(): string {
    const interfaces = os.networkInterfaces()
    for (const devName in interfaces) {
      const iface = interfaces[devName] ?? []

      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (alias.address !== '127.0.0.1' && alias.address !== '0:0:0:0:0:0:0:1' && !alias.internal)
          return alias.address
      }
    }

    return '0.0.0.0'
  }
}
