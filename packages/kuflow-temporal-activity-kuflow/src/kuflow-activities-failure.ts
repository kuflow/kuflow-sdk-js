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
import { RestError } from '@azure/core-rest-pipeline'
import { CompleteAsyncError } from '@temporalio/activity'
import { ApplicationFailure, TemporalFailure } from '@temporalio/common'

import { KuFlowFailureType } from './kuflow-failure-type'

export const catchAllErrors = <T extends any[], U, R extends Promise<U>>(cb: (...args: T) => R) => {
  return async (...args: T): Promise<Awaited<R>> => {
    try {
      // eslint-disable-next-line n/no-callback-literal
      return await cb(...args)
    } catch (e) {
      if (e instanceof TemporalFailure) {
        throw e
      }
      if (e instanceof CompleteAsyncError) {
        throw e
      }

      if (e instanceof RestError) {
        const nonRetryable = e.statusCode != null && e.statusCode >= 400 && e.statusCode < 500 && e.statusCode !== 429

        throw ApplicationFailure.create({
          message: 'Rest Invocation error',
          type: KuFlowFailureType.ACTIVITIES_REST_FAILURE,
          details: e.details != null ? [e.details] : undefined,
          cause: e,
          nonRetryable,
        })
      }

      throw ApplicationFailure.create({
        message: 'Invocation error',
        type: KuFlowFailureType.ACTIVITIES_FAILURE,
        cause: e as Error,
      })
    }
  }
}
