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

import type {
  ActivityInput,
  ContinueAsNewInput,
  LocalActivityInput,
  Next,
  SignalWorkflowInput,
  StartChildWorkflowExecutionInput,
  WorkflowOutboundCallsInterceptor,
} from '@temporalio/workflow'

import { addEncryptionEncoding, markObjectsToBeEncrypted } from '../kuflow-encryption-instrumentation'
import { kuflowEncryptionState } from './kuflow-encryption-state'

export class KuFlowEncryptionWorkflowOutboundCallsInterceptor implements WorkflowOutboundCallsInterceptor {
  public async scheduleActivity(
    input: ActivityInput,
    next: Next<WorkflowOutboundCallsInterceptor, 'scheduleActivity'>,
  ): Promise<unknown> {
    let headers = input.headers
    let args = input.args

    if (kuflowEncryptionState.isEncryptionRequired()) {
      headers = addEncryptionEncoding(headers)
      args = markObjectsToBeEncrypted(args)
    }

    return await next({
      ...input,
      headers,
      args,
    })
  }

  public async scheduleLocalActivity(
    input: LocalActivityInput,
    next: Next<WorkflowOutboundCallsInterceptor, 'scheduleLocalActivity'>,
  ): Promise<unknown> {
    let headers = input.headers
    let args = input.args

    if (kuflowEncryptionState.isEncryptionRequired()) {
      headers = addEncryptionEncoding(headers)
      args = markObjectsToBeEncrypted(args)
    }

    return await next({
      ...input,
      headers,
      args,
    })
  }

  public async startChildWorkflowExecution(
    input: StartChildWorkflowExecutionInput,
    next: Next<WorkflowOutboundCallsInterceptor, 'startChildWorkflowExecution'>,
  ): Promise<[Promise<string>, Promise<unknown>]> {
    let headers = input.headers
    let optionsArgs = input.options.args

    if (kuflowEncryptionState.isEncryptionRequired()) {
      headers = addEncryptionEncoding(headers)
      optionsArgs = markObjectsToBeEncrypted(optionsArgs)
    }

    return await next({
      ...input,
      options: {
        ...input.options,
        args: optionsArgs,
      },
      headers,
    })
  }

  public async continueAsNew(
    input: ContinueAsNewInput,
    next: Next<WorkflowOutboundCallsInterceptor, 'continueAsNew'>,
  ): Promise<never> {
    let headers = input.headers
    let args = input.args

    if (kuflowEncryptionState.isEncryptionRequired()) {
      headers = addEncryptionEncoding(headers)
      args = markObjectsToBeEncrypted(args)
    }

    return await next({
      ...input,
      headers,
      args,
    })
  }

  public async signalWorkflow(
    input: SignalWorkflowInput,
    next: Next<WorkflowOutboundCallsInterceptor, 'signalWorkflow'>,
  ): Promise<void> {
    let headers = input.headers
    let args = input.args

    if (kuflowEncryptionState.isEncryptionRequired()) {
      headers = addEncryptionEncoding(headers)
      args = markObjectsToBeEncrypted(args)
    }

    await next({
      ...input,
      headers,
      args,
    })
  }
}
