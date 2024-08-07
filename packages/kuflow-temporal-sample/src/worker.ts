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

import { KuFlowRestClient } from '@kuflow/kuflow-rest'
import { createKuFlowActivities } from '@kuflow/kuflow-temporal-activity-kuflow'
import { KuFlowTemporalConnection } from '@kuflow/kuflow-temporal-core'
import { Runtime } from '@temporalio/worker'
import * as dotenv from 'dotenv'

dotenv.config()

/**
 * Run a Worker with an mTLS connection, configuration is provided via environment variables.
 * Note that serverNameOverride and serverRootCACertificate are optional.
 */
async function run({
  address,
  taskQueue,
  kuflowRestClientApiEndpoint,
  kuflowRestClientApiUsername,
  kuflowRestClientApiPassword,
}: Env): Promise<void> {
  const kuFlowRestClient = new KuFlowRestClient(
    {
      clientId: kuflowRestClientApiUsername,
      clientSecret: kuflowRestClientApiPassword,
    },
    {
      endpoint: kuflowRestClientApiEndpoint,
      allowInsecureConnection: true,
    },
  )

  const kuFlowTemporalConnection = await KuFlowTemporalConnection.instance({
    kuflow: {
      restClient: kuFlowRestClient,
    },
    temporalio: {
      connection: {
        address,
      },
      worker: {
        taskQueue,
        workflowsPath: require.resolve('./workflows'),
        activities: {
          ...createKuFlowActivities(kuFlowRestClient),
        },
      },
    },
  })

  Runtime.instance().logger.info('Worker connection successfully established')

  await kuFlowTemporalConnection.runWorker()

  await kuFlowTemporalConnection.close()
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
  taskQueue: string
  kuflowRestClientApiEndpoint: string
  kuflowRestClientApiUsername: string
  kuflowRestClientApiPassword: string
}

export function getEnv(): Env {
  return {
    address: requiredEnv('TEMPORAL_ADDRESS'),
    taskQueue: requiredEnv('TEMPORAL_TASK_QUEUE'),

    kuflowRestClientApiEndpoint: requiredEnv('KUFLOW_REST_CLIENT_API_ENDPOINT'),
    kuflowRestClientApiUsername: requiredEnv('KUFLOW_REST_CLIENT_API_USERNAME'),
    kuflowRestClientApiPassword: requiredEnv('KUFLOW_REST_CLIENT_API_PASSWORD'),
  }
}
