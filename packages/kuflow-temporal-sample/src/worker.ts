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
import { createKuFlowAsyncActivities, createKuFlowSyncActivities } from '@kuflow/kuflow-temporal-activity-kuflow'
import { KuFlowTemporalConnection } from '@kuflow/kuflow-temporal-core'
import { NativeConnection, Worker } from '@temporalio/worker'
import * as dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

/**
 * Run a Worker with an mTLS connection, configuration is provided via environment variables.
 * Note that serverNameOverride and serverRootCACertificate are optional.
 */
async function run({
  address,
  namespace,
  clientCertPath,
  clientKeyPath,
  serverNameOverride,
  serverRootCACertificatePath,
  taskQueue,
  kuflowRestClientApiEndpoint,
  kuflowRestClientApiUsername,
  kuflowRestClientApiPassword,
}: Env): Promise<void> {
  const serverRootCACertificate =
    serverRootCACertificatePath != null ? fs.readFileSync(serverRootCACertificatePath) : undefined

  const connection = await NativeConnection.connect({
    address,
    tls: {
      serverNameOverride,
      serverRootCACertificate,
      // See docs for other TLS options
      clientCertPair: {
        crt: fs.readFileSync(clientCertPath),
        key: fs.readFileSync(clientKeyPath),
      },
    },
  })
  const kuFlowEngineConnection = KuFlowTemporalConnection.connect(
    connection,
    {
      clientId: kuflowRestClientApiUsername,
      clientSecret: kuflowRestClientApiPassword,
    },
    {
      endpoint: kuflowRestClientApiEndpoint,
      allowInsecureConnection: true,
    },
  )

  const worker = await Worker.create({
    connection,
    namespace,
    workflowsPath: require.resolve('./workflows'),
    activities: {
      ...createKuFlowSyncActivities(kuFlowEngineConnection),
      ...createKuFlowAsyncActivities(kuFlowEngineConnection),
    },
    taskQueue,
  })
  console.log('Worker connection successfully established')

  await worker.run()
  await connection.close()
  await kuFlowEngineConnection.close()
}

run(getEnv()).catch(err => {
  console.error(err)
  process.exit(1)
})

// Helpers for configuring the mTLS client and worker samples

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (value == null) {
    throw new ReferenceError(`${name} environment variable is not defined`)
  }

  return value
}

export interface Env {
  address: string
  namespace: string
  clientCertPath: string
  clientKeyPath: string
  serverNameOverride?: string
  serverRootCACertificatePath?: string
  taskQueue: string
  kuflowRestClientApiEndpoint: string
  kuflowRestClientApiUsername: string
  kuflowRestClientApiPassword: string
}

export function getEnv(): Env {
  return {
    address: requiredEnv('TEMPORAL_ADDRESS'),
    namespace: requiredEnv('TEMPORAL_NAMESPACE'),
    clientCertPath: requiredEnv('TEMPORAL_CLIENT_CERT_PATH'),
    clientKeyPath: requiredEnv('TEMPORAL_CLIENT_KEY_PATH'),
    serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
    serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
    taskQueue: process.env.TEMPORAL_TASK_QUEUE ?? 'hello-world-mtls',

    kuflowRestClientApiEndpoint: requiredEnv('KUFLOW_REST_CLIENT_API_ENDPOINT'),
    kuflowRestClientApiUsername: requiredEnv('KUFLOW_REST_CLIENT_API_USERNAME'),
    kuflowRestClientApiPassword: requiredEnv('KUFLOW_REST_CLIENT_API_PASSWORD'),
  }
}
