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

import { ElementValueUtils } from '@kuflow/kuflow-rest'

import { type SaveProcessElementRequest } from '../models'

/**
 * Check if all related valid values are TRUE
 *
 * @param request Save process element request
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(request: SaveProcessElementRequest): boolean {
  return ElementValueUtils.getElementValueValid(request)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param request Save process element request
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(request: SaveProcessElementRequest, index: number): boolean | undefined {
  return ElementValueUtils.getElementValueValidAt(request, index)
}

/**
 * Set valid to all values
 *
 * @param request Save process element request
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid(
  request: SaveProcessElementRequest,
  valid: boolean | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.setElementValueValid(request, valid)
}

/**
 * Set valid to the selected value
 *
 * @param request Save process element request

 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  request: SaveProcessElementRequest,

  valid: boolean | undefined,
  index: number,
): SaveProcessElementRequest {
  return ElementValueUtils.setElementValueValidAt(request, valid, index)
}

/**
 * Get an element as String
 *
 * @param request Save process element request

 * @return the element value.
 */
export function getElementValueAsString(request: SaveProcessElementRequest): string {
  return ElementValueUtils.getElementValueAsString(request)
}

/**
 * Try to get an element as String
 *
 * @param request Save process element request

 * @return the element value if exists.
 */
export function findElementValueAsString(request: SaveProcessElementRequest): string | undefined {
  return ElementValueUtils.findElementValueAsString(request)
}

/**
 * Get all elements as String
 *
 * @param request Save process element request
 * @return the elements values.
 */
export function getElementValueAsStringList(request: SaveProcessElementRequest): string[] {
  return ElementValueUtils.getElementValueAsStringList(request)
}

/**
 * Set an element value
 *
 * @param request Save process element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString(
  request: SaveProcessElementRequest,
  elementValue: string | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.setElementValueAsString(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save process element request

 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  request: SaveProcessElementRequest,
  elementValues: string[] | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.setElementValueAsStringList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save process element request
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString(
  request: SaveProcessElementRequest,
  elementValue: string | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.addElementValueAsString(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save process element request
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList(
  request: SaveProcessElementRequest,
  elementValues: string[] | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.addElementValueAsStringList(request, elementValues)
}

/**
 * Get an element as Double
 *
 * @param request Save process element request
 * @return the element value.
 */
export function getElementValueAsNumber(request: SaveProcessElementRequest): number {
  return ElementValueUtils.getElementValueAsNumber(request)
}

/**
 * Try to get an element as Double
 *
 * @param request Save process element request
 * @return the element value if exists.
 */
export function findElementValueAsNumber(request: SaveProcessElementRequest): number | undefined {
  return ElementValueUtils.findElementValueAsNumber(request)
}

/**
 * Get all elements as Double
 *
 * @param request Save process element request
 * @return the elements values.
 */
export function getElementValueAsNumberList(request: SaveProcessElementRequest): number[] {
  return ElementValueUtils.getElementValueAsNumberList(request)
}

/**
 * Set an element value
 *
 * @param request Save process element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber(
  request: SaveProcessElementRequest,
  elementValue: number | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.setElementValueAsNumber(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save process element request
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList(
  request: SaveProcessElementRequest,
  elementValues: number[] | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.setElementValueAsNumberList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save process element request
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber(
  request: SaveProcessElementRequest,

  elementValue: number | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.addElementValueAsNumber(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save process element request

 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList(
  request: SaveProcessElementRequest,
  elementValues: number[] | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.addElementValueAsNumberList(request, elementValues)
}

/**
 * Get an element as Date
 *
 * @param request Save process element request
 * @return the element value.
 */
export function getElementValueAsDate(request: SaveProcessElementRequest): Date {
  return ElementValueUtils.getElementValueAsDate(request)
}

/**
 * Try to get an element as Date
 *
 * @param request Save process element request
 * @return the element value if exists.
 */
export function findElementValueAsDate(request: SaveProcessElementRequest): Date | undefined {
  return ElementValueUtils.findElementValueAsDate(request)
}

/**
 * Get all elements as Date
 *
 * @param request Save process element request
 * @return the elements values.
 */
export function getElementValueAsDateList(request: SaveProcessElementRequest): Date[] {
  return ElementValueUtils.getElementValueAsDateList(request)
}

/**
 * Set an element value
 *
 * @param request Save process element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate(
  request: SaveProcessElementRequest,
  elementValue: Date | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.setElementValueAsDate(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save process element request
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList(
  request: SaveProcessElementRequest,
  elementValues: Date[] | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.setElementValueAsDateList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save process element request

 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate(
  request: SaveProcessElementRequest,
  elementValue: Date | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.addElementValueAsDate(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save process element request
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList(
  request: SaveProcessElementRequest,
  elementValues: Date[] | undefined,
): SaveProcessElementRequest {
  return ElementValueUtils.addElementValueAsDateList(request, elementValues)
}
