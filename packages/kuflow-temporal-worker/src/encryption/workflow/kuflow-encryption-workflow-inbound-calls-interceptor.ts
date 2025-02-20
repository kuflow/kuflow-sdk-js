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
  Next,
  QueryInput,
  UpdateInput,
  WorkflowExecuteInput,
  WorkflowInboundCallsInterceptor,
} from '@temporalio/workflow'

import { EncryptionWrapper, isEncryptionRequired } from '../kuflow-encryption-instrumentation'
import { kuflowEncryptionState } from './kuflow-encryption-state'

export class KuFlowEncryptionWorkflowInboundCallsInterceptor implements WorkflowInboundCallsInterceptor {
  public async execute(
    input: WorkflowExecuteInput,
    next: Next<WorkflowInboundCallsInterceptor, 'execute'>,
  ): Promise<unknown> {
    kuflowEncryptionState.requireEncryption(isEncryptionRequired(input.headers))

    const output = await next(input)

    return kuflowEncryptionState.isEncryptionRequired() ? EncryptionWrapper.of(output) : output
  }

  public async handleUpdate(
    input: UpdateInput,
    next: Next<WorkflowInboundCallsInterceptor, 'handleUpdate'>,
  ): Promise<unknown> {
    kuflowEncryptionState.requireEncryption(isEncryptionRequired(input.headers))

    const output = await next(input)

    return kuflowEncryptionState.isEncryptionRequired() ? EncryptionWrapper.of(output) : output
  }

  public async handleQuery(
    input: QueryInput,
    next: Next<WorkflowInboundCallsInterceptor, 'handleQuery'>,
  ): Promise<unknown> {
    const output = await next(input)

    return kuflowEncryptionState.isEncryptionRequired() ? EncryptionWrapper.of(output) : output
  }
}
