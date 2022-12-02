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
/* eslint-disable @typescript-eslint/naming-convention */

import { KuFlowEngineConnection } from '@kuflow/kuflow-temporal-core'
import { CompleteAsyncError, Context } from '@temporalio/activity'

import { catchAllErrors } from './kuflow-activities-failure'
import { CreateTaskRequest } from './models'
import { validateCreateTaskRequest } from './validations'

export interface KuFlowAsyncActivities {
  /**
   * Create a Task and optionally fill its elements. The activity is finished when the <strong>"COMPLETED"</strong> or
   * <strong>"CANCELLED"</strong> event is received from KuFlow. This is useful in KuFlow tasks where you have to wait for an external
   * agent, usually a human, to complete it.
   *
   * @param request must not be {@literal null}.
   */
  KuFlow_Engine_createTaskAndWaitFinished: (request: CreateTaskRequest) => Promise<void>
}

/**
 * KuFlow Async activities to be used in Temporal.
 */
export const createKuFlowAsyncActivities = (kuFlowEngine: KuFlowEngineConnection): KuFlowAsyncActivities => {
  const kuFlowRestClient = kuFlowEngine.kuflowRestClient

  return {
    KuFlow_Engine_createTaskAndWaitFinished: catchAllErrors(KuFlow_Engine_createTaskAndWaitFinished),
  }

  async function KuFlow_Engine_createTaskAndWaitFinished(request: CreateTaskRequest): Promise<void> {
    validateCreateTaskRequest(request)

    const activityToken = Context.current().info.base64TaskToken
    await kuFlowRestClient.taskOperations.createTask(request.task, { activityToken })

    throw new CompleteAsyncError()
  }
}
