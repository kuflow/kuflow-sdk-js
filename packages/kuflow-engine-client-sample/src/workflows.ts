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
// Only import the activity types
import type {
  createKuFlowAsyncActivities,
  createKuFlowSyncActivities,
} from '@kuflow/kuflow-engine-client-activity-kuflow'
import { LoggerSinks, proxyActivities, proxySinks } from '@temporalio/workflow'

const kuFlowSyncActivities = proxyActivities<ReturnType<typeof createKuFlowSyncActivities>>({
  startToCloseTimeout: '10 minutes',
  scheduleToCloseTimeout: '356 days',
})

const kuFlowAsyncActivities = proxyActivities<ReturnType<typeof createKuFlowAsyncActivities>>({
  startToCloseTimeout: '1 day',
  scheduleToCloseTimeout: '356 days',
})

interface WorkflowRequest {
  processId: string
}

interface WorkflowResponse {
  message: string
}

const { defaultWorkerLogger: logger } = proxySinks<LoggerSinks>()

/** A workflow that simply calls an activity */
export async function MyWorkflow(request: WorkflowRequest): Promise<WorkflowResponse> {
  logger.info('Start', {})

  await kuFlowAsyncActivities.KuFlow_Engine_createTaskAndWaitFinished({
    task: {
      objectType: 'TASK',
      processId: request.processId,
      taskDefinition: {
        code: 'TASK_0001',
      },
    },
  })

  await kuFlowSyncActivities.KuFlow_Engine_completeProcess({
    processId: request.processId,
  })

  logger.info('End', {})
  return {
    message: 'OK',
  }
}
