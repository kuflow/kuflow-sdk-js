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
import type { ProcessItemCreateParams } from '@kuflow/kuflow-rest'
import type {
  createKuFlowActivities,
  ProcessMetadataUpdateRequest,
  WorkflowRequest,
  WorkflowResponse,
} from '@kuflow/kuflow-temporal-activity-kuflow'
import {
  KUFLOW_ENGINE_SIGNAL_PROCESS_ITEM,
  type SignalProcessItem,
  SignalProcessItemType,
  uuid7,
} from '@kuflow/kuflow-temporal-workflow-kuflow'
import { condition, defineSignal, log, proxyActivities, setHandler } from '@temporalio/workflow'

const kuFlowActivities = proxyActivities<ReturnType<typeof createKuFlowActivities>>({
  startToCloseTimeout: '10 minutes',
  scheduleToCloseTimeout: '356 days',
})

export const kuFlowEngineSignalProcessItem = defineSignal<[SignalProcessItem]>(KUFLOW_ENGINE_SIGNAL_PROCESS_ITEM)

/** A workflow that simply calls an activity */
export async function SampleEngineWorkerLoanWorkflow(request: WorkflowRequest): Promise<WorkflowResponse> {
  const kuFlowCompletedTaskIds: string[] = []

  setHandler(kuFlowEngineSignalProcessItem, (signal: SignalProcessItem) => {
    if (signal.type === SignalProcessItemType.TASK) {
      kuFlowCompletedTaskIds.push(signal.id)
    }
  })

  log.info('Start', {})

  await createProcessItemAndWaitCompleted({
    id: uuid7(),
    type: 'TASK',
    processId: request.processId,
    task: {
      taskDefinitionCode: 'LOAN_APPLICATION',
    },
  })

  const updateProcessMetadataRequest: ProcessMetadataUpdateRequest = {
    processId: request.processId,
    metadata: {
      value: {
        REASON: 'Updated',
      },
    },
  }

  await kuFlowActivities.KuFlow_Engine_updateProcessMetadata(updateProcessMetadataRequest)

  // const updateProcessItemTaskData: ProcessItemTaskDataUpdateRequest = {
  //   processItemId: '',
  //   params: {
  //     data: {
  //       value: {
  //         name: 'value',
  //       },
  //     },
  //   },
  // }
  // await kuFlowActivities.KuFlow_Engine_updateProcessItemTaskData(updateProcessItemTaskData)

  log.info('End', {})

  return {
    message: 'OK',
  }

  async function createProcessItemAndWaitCompleted(
    processItem: ProcessItemCreateParams & { id: string },
  ): Promise<void> {
    await kuFlowActivities.KuFlow_Engine_createProcessItem(processItem)
    await condition(() => kuFlowCompletedTaskIds.includes(processItem.id))
  }
}
