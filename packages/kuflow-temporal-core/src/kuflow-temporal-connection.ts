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
import { type Authentication } from '@kuflow/kuflow-rest'
import { NativeConnection, Runtime, Worker } from '@temporalio/worker'

import { KuFlowAuthorizationTokenProvider } from './kuflow-authorization-token-provider'
import { type KuFlowTemporalConnectionOptions } from './kuflow-temporal-connection-options'
import { KuFlowWorkerInformationNotifier } from './kuflow-worker-information-notifier'

/**
 * Configure a temporal client and worker with KuFlow requirements.
 */
export class KuFlowTemporalConnection {
  /**
   * Get the registered workflow types
   */
  get workflowTypes(): string[] {
    return [...this._workflowTypes]
  }

  /**
   * Get the registered activity types
   */
  get activityTypes(): string[] {
    return [...this._activityTypes]
  }

  /**
   * Get the nativeConnection started
   */
  get nativeConnection(): NativeConnection | undefined {
    return this._nativeConnection
  }

  /**
   * Get the worker started
   */
  get worker(): Worker | undefined {
    return this._worker
  }

  private _workflowTypes: string[] = []

  private _activityTypes: string[] = []

  private _nativeConnection?: NativeConnection

  private _worker?: Worker

  private _kuFlowAuthorizationTokenProvider?: KuFlowAuthorizationTokenProvider

  private _kuflowWorkerInformationNotifier?: KuFlowWorkerInformationNotifier

  public static async instance(options: KuFlowTemporalConnectionOptions): Promise<KuFlowTemporalConnection> {
    return new KuFlowTemporalConnection({ ...options })
  }

  private constructor(private readonly options: KuFlowTemporalConnectionOptions) {}

  /**
   * Eagerly connect to the Temporal server and return a NativeConnection instance
   */
  public async connect(): Promise<NativeConnection> {
    if (this._nativeConnection != null) {
      return this._nativeConnection
    }

    await this.applyDefaultConfiguration()

    const connectionOptions = this.options.temporalio.connection ?? {}
    if (connectionOptions.address == null) {
      connectionOptions.address = 'engine.kuflow.com:443'
    }

    this._nativeConnection = await NativeConnection.connect(connectionOptions)

    // Create a KuFlowAuthorizationTokenProvider
    this._kuFlowAuthorizationTokenProvider = KuFlowAuthorizationTokenProvider.instance({
      temporalConnection: this._nativeConnection,
      options: this.options,
    })

    Runtime.instance().logger.info('Connection created')

    return this._nativeConnection
  }

  private async applyDefaultConfiguration(): Promise<void> {
    const authenticationCreation: Authentication = {
      type: 'ENGINE_CERTIFICATE',
      tenantId: this.options.kuflow.tenantId,
    }
    const kuFlowRestClient = this.options.kuflow.restClient
    const authentication = await kuFlowRestClient.authenticationOperations.createAuthentication(authenticationCreation)
    if (authentication.engineCertificate?.tls == null) {
      return
    }

    if (this.options.temporalio.connection == null) {
      this.options.temporalio.connection = {}
    }

    if (this.options.temporalio.connection.tls == null) {
      this.options.temporalio.connection.tls = {
        serverRootCACertificate: Buffer.from(authentication.engineCertificate.tls.serverRootCaCertificate),
        clientCertPair: {
          crt: Buffer.from(authentication.engineCertificate.tls.clientCertificate),
          key: Buffer.from(authentication.engineCertificate.tls.clientPrivateKey),
        },
      }
    }

    if (this.options.temporalio.worker != null && this.options.temporalio.worker.namespace == null) {
      this.options.temporalio.worker.namespace = authentication.engineCertificate.namespace
    }
  }

  /**
   * Create a new Worker. This method initiates a connection to the server and will throw (asynchronously) on connection failure.
   */
  public async createWorker(): Promise<Worker> {
    if (this._worker != null) {
      return this._worker
    }

    if (this.options.temporalio.worker == null) {
      throw new Error('Worker options are required')
    }

    const connection = await this.connect()

    this._worker = await Worker.create({
      connection,
      ...this.options.temporalio.worker,
    })

    Runtime.instance().logger.info('Worker initialized')

    return this._worker
  }

  /**
   * Start the temporal worker configured.
   */
  public async runWorker(): Promise<void> {
    Runtime.instance().logger.info('Run worker')

    const worker = await this.createWorker()

    if (worker.options.workflowsPath != null) {
      const workflowsPath = worker.options.workflowsPath
      const workflows = (await import(workflowsPath)) as Record<string, unknown>
      this._workflowTypes = Object.keys(workflows).filter(key => typeof workflows[key] === 'function')
    }

    if (worker.options.activities != null) {
      this._activityTypes = Object.keys(worker.options.activities ?? {})
    }

    // Create a KuflowWorkerInformationNotifier
    this._kuflowWorkerInformationNotifier = KuFlowWorkerInformationNotifier.instance({
      workerInformation: {
        identity: worker.options.identity,
        taskQueue: worker.options.taskQueue,
        workflowTypes: this._workflowTypes,
        activityTypes: this._activityTypes,
      },
      options: this.options,
    })
    await this._kuflowWorkerInformationNotifier.start()

    Runtime.instance().logger.info('Running worker')

    await worker.run()
  }

  /**
   * Shutdown the worker (if is started) and all related objects that need to be closed.
   */
  public async close(): Promise<void> {
    if (this._worker != null && this._worker.getState() === 'RUNNING') {
      this._worker.shutdown()
      this._activityTypes = []
      this._workflowTypes = []
      this._worker = undefined
    }

    if (this._nativeConnection != null) {
      await this._nativeConnection.close()
      this._nativeConnection = undefined
    }

    if (this._kuflowWorkerInformationNotifier != null) {
      await this._kuflowWorkerInformationNotifier.close()
      this._kuflowWorkerInformationNotifier = undefined
    }

    if (this._kuFlowAuthorizationTokenProvider != null) {
      await this._kuFlowAuthorizationTokenProvider.close()
      this._kuFlowAuthorizationTokenProvider = undefined
    }
  }
}
