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

import {
  ElementValueUtils,
  type KuFlowObject,
  type TaskElementValueDocumentItem,
  type TaskElementValuePrincipalItem,
} from '@kuflow/kuflow-rest'

import { type SaveTaskElementRequest } from '../models'

/**
 * Check if all related valid values are TRUE
 *
 * @param request Save task element request
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(request: SaveTaskElementRequest): boolean {
  return ElementValueUtils.getElementValueValid(request)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param request Save task element request
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(request: SaveTaskElementRequest, index: number): boolean | undefined {
  return ElementValueUtils.getElementValueValidAt(request, index)
}

/**
 * Set valid to all values
 *
 * @param request Save task element request
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid(
  request: SaveTaskElementRequest,
  valid: boolean | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueValid(request, valid)
}

/**
 * Set valid to the selected value
 *
 * @param request Save task element request

 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  request: SaveTaskElementRequest,
  valid: boolean | undefined,
  index: number,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueValidAt(request, valid, index)
}

/**
 * Get an element as String
 *
 * @param request Save task element request
 * @return the element value.
 */
export function getElementValueAsString(request: SaveTaskElementRequest): string {
  return ElementValueUtils.getElementValueAsString(request)
}

/**
 * Try to get an element as String
 *
 * @param request Save task element request
 * @return the element value if exists.
 */
export function findElementValueAsString(request: SaveTaskElementRequest): string | undefined {
  return ElementValueUtils.findElementValueAsString(request)
}

/**
 * Get all elements as String
 *
 * @param request Save task element request
 * @return the elements values.
 */
export function getElementValueAsStringList(request: SaveTaskElementRequest): string[] {
  return ElementValueUtils.getElementValueAsStringList(request)
}

/**
 * Set an element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString(
  request: SaveTaskElementRequest,
  elementValue: string | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsString(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save task element request
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  request: SaveTaskElementRequest,
  elementValues: string[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsStringList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString(
  request: SaveTaskElementRequest,
  elementValue: string | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsString(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save task element request
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList(
  request: SaveTaskElementRequest,
  elementValues: string[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsStringList(request, elementValues)
}

/**
 * Get an element as Double
 *
 * @param request Save task element request
 * @return the element value.
 */
export function getElementValueAsNumber(request: SaveTaskElementRequest): number {
  return ElementValueUtils.getElementValueAsNumber(request)
}

/**
 * Try to get an element as Double
 *
 * @param request Save task element request
 * @return the element value if exists.
 */
export function findElementValueAsNumber(request: SaveTaskElementRequest): number | undefined {
  return ElementValueUtils.findElementValueAsNumber(request)
}

/**
 * Get all elements as Double
 *
 * @param request Save task element request
 * @return the elements values.
 */
export function getElementValueAsNumberList(request: SaveTaskElementRequest): number[] {
  return ElementValueUtils.getElementValueAsNumberList(request)
}

/**
 * Set an element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber(
  request: SaveTaskElementRequest,
  elementValue: number | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsNumber(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save task element request
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList(
  request: SaveTaskElementRequest,
  elementValues: number[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsNumberList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber(
  request: SaveTaskElementRequest,

  elementValue: number | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsNumber(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save task element request

 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList(
  request: SaveTaskElementRequest,
  elementValues: number[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsNumberList(request, elementValues)
}

/**
 * Get an element as Date
 *
 * @param request Save task element request
 * @return the element value.
 */
export function getElementValueAsDate(request: SaveTaskElementRequest): Date {
  return ElementValueUtils.getElementValueAsDate(request)
}

/**
 * Try to get an element as Date
 *
 * @param request Save task element request
 * @return the element value if exists.
 */
export function findElementValueAsDate(request: SaveTaskElementRequest): Date | undefined {
  return ElementValueUtils.findElementValueAsDate(request)
}

/**
 * Get all elements as Date
 *
 * @param request Save task element request
 * @return the elements values.
 */
export function getElementValueAsDateList(request: SaveTaskElementRequest): Date[] {
  return ElementValueUtils.getElementValueAsDateList(request)
}

/**
 * Set an element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate(
  request: SaveTaskElementRequest,
  elementValue: Date | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsDate(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save task element request
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList(
  request: SaveTaskElementRequest,
  elementValues: Date[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsDateList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save task element request

 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate(
  request: SaveTaskElementRequest,
  elementValue: Date | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsDate(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save task element request
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList(
  request: SaveTaskElementRequest,
  elementValues: Date[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsDateList(request, elementValues)
}

/**
 * Get an element as Object
 *
 * @param request Save task element request
 * @return the element value.
 */
export function getElementValueAsObject(request: SaveTaskElementRequest): KuFlowObject {
  return ElementValueUtils.getElementValueAsObject(request)
}

/**
 * Try to get an element as Object
 *
 * @param request Save task element request
 * @return the element value if exists.
 */
export function findElementValueAsObject(request: SaveTaskElementRequest): KuFlowObject | undefined {
  return ElementValueUtils.findElementValueAsObject(request)
}

/**
 * Get all elements as Object
 *
 * @param request Save task element request
 * @return the elements values.
 */
export function getElementValueAsObjectList(request: SaveTaskElementRequest): KuFlowObject[] {
  return ElementValueUtils.getElementValueAsObjectList(request)
}

/**
 * Set an element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObject(
  request: SaveTaskElementRequest,
  elementValue: KuFlowObject | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsObject(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save task element request
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObjectList(
  request: SaveTaskElementRequest,
  elementValues: KuFlowObject[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsObjectList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsObject(
  request: SaveTaskElementRequest,
  elementValue: KuFlowObject | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsObject(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save task element request
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsObjectList(
  request: SaveTaskElementRequest,
  elementValues: KuFlowObject[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsObjectList(request, elementValues)
}

/**
 * Get an element as Document
 *
 * @param request Save task element request
 * @return the element value.
 */
export function getElementValueAsDocument(request: SaveTaskElementRequest): TaskElementValueDocumentItem {
  return ElementValueUtils.getElementValueAsDocument(request)
}

/**
 * Try to get an element as Document
 *
 * @param request Save task element request
 * @return the element value if exists.
 */
export function findElementValueAsDocument(request: SaveTaskElementRequest): TaskElementValueDocumentItem | undefined {
  return ElementValueUtils.findElementValueAsDocument(request)
}

/**
 * Get all elements as Document
 *
 * @param request Save task element request
 * @return the elements values.
 */
export function getElementValueAsDocumentList(request: SaveTaskElementRequest): TaskElementValueDocumentItem[] {
  return ElementValueUtils.getElementValueAsDocumentList(request)
}

/**
 * Set an element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocument(
  request: SaveTaskElementRequest,

  elementValue: TaskElementValueDocumentItem | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsDocument(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save task element request
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocumentList(
  request: SaveTaskElementRequest,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsDocumentList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsDocument(
  request: SaveTaskElementRequest,

  elementValue: TaskElementValueDocumentItem | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsDocument(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save task element request
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsDocumentList(
  request: SaveTaskElementRequest,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsDocumentList(request, elementValues)
}

/**
 * Get an element as Principal
 *
 * @param request Save task element request
 * @return the element value.
 * @throws Error If element value doesn't exists
 */
export function getElementValueAsPrincipal(request: SaveTaskElementRequest): TaskElementValuePrincipalItem {
  return ElementValueUtils.getElementValueAsPrincipal(request)
}

/**
 * Try to get an element as Principal
 *
 * @param request Save task element request
 * @return the element value if exists.
 */
export function findElementValueAsPrincipal(
  request: SaveTaskElementRequest,
): TaskElementValuePrincipalItem | undefined {
  return ElementValueUtils.findElementValueAsPrincipal(request)
}

/**
 * Get all elements as Principal
 *
 * @param request Save task element request
 * @return the elements values.
 */
export function getElementValueAsPrincipalList(request: SaveTaskElementRequest): TaskElementValuePrincipalItem[] {
  return ElementValueUtils.getElementValueAsPrincipalList(request)
}

/**
 * Set an element value
 *
 * @param request Save task element request
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsPrincipal(
  request: SaveTaskElementRequest,
  elementValue: TaskElementValuePrincipalItem | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsPrincipal(request, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param request Save task element request
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsPrincipalList(
  request: SaveTaskElementRequest,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.setElementValueAsPrincipalList(request, elementValues)
}

/**
 * Add a new element value
 *
 * @param request Save task element request

 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsPrincipal(
  request: SaveTaskElementRequest,
  elementValue: TaskElementValuePrincipalItem | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsPrincipal(request, elementValue)
}

/**
 * Add all element values passed
 *
 * @param request Save task element request

 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsPrincipalList(
  request: SaveTaskElementRequest,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): SaveTaskElementRequest {
  return ElementValueUtils.addElementValueAsPrincipalList(request, elementValues)
}
