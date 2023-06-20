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

import { type ProcessPageItem } from '../generated'
import * as elementValueUtils from './element-values'

/**
 * Check if all related valid values are TRUE
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(processPageItem: ProcessPageItem, elementDefinitionCode: string): boolean {
  return elementValueUtils.getElementValueValid(processPageItem, elementDefinitionCode)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  index: number,
): boolean | undefined {
  return elementValueUtils.getElementValueValidAt(processPageItem, elementDefinitionCode, index)
}

/**
 * Set valid to all values
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  valid: boolean | undefined,
): ProcessPageItem {
  return elementValueUtils.setElementValueValid(processPageItem, elementDefinitionCode, valid)
}

/**
 * Set valid to the selected value
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  valid: boolean | undefined,
  index: number,
): ProcessPageItem {
  return elementValueUtils.setElementValueValidAt(processPageItem, elementDefinitionCode, valid, index)
}

/**
 * Get an element as String
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(processPageItem: ProcessPageItem, elementDefinitionCode: string): string {
  return elementValueUtils.getElementValueAsString(processPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as String
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
): string | undefined {
  return elementValueUtils.findElementValueAsString(processPageItem, elementDefinitionCode)
}

/**
 * Get all elements as String
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(processPageItem: ProcessPageItem, elementDefinitionCode: string): string[] {
  return elementValueUtils.getElementValueAsStringList(processPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): ProcessPageItem {
  return elementValueUtils.setElementValueAsString(processPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): ProcessPageItem {
  return elementValueUtils.setElementValueAsStringList(processPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): ProcessPageItem {
  return elementValueUtils.addElementValueAsString(processPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): ProcessPageItem {
  return elementValueUtils.addElementValueAsStringList(processPageItem, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Double
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(processPageItem: ProcessPageItem, elementDefinitionCode: string): number {
  return elementValueUtils.getElementValueAsNumber(processPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as Double
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
): number | undefined {
  return elementValueUtils.findElementValueAsNumber(processPageItem, elementDefinitionCode)
}

/**
 * Get all elements as Double
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(processPageItem: ProcessPageItem, elementDefinitionCode: string): number[] {
  return elementValueUtils.getElementValueAsNumberList(processPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): ProcessPageItem {
  return elementValueUtils.setElementValueAsNumber(processPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): ProcessPageItem {
  return elementValueUtils.setElementValueAsNumberList(processPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): ProcessPageItem {
  return elementValueUtils.addElementValueAsNumber(processPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): ProcessPageItem {
  return elementValueUtils.addElementValueAsNumberList(processPageItem, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Date
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(processPageItem: ProcessPageItem, elementDefinitionCode: string): Date {
  return elementValueUtils.getElementValueAsDate(processPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as Date
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
): Date | undefined {
  return elementValueUtils.findElementValueAsDate(processPageItem, elementDefinitionCode)
}

/**
 * Get all elements as Date
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(processPageItem: ProcessPageItem, elementDefinitionCode: string): Date[] {
  return elementValueUtils.getElementValueAsDateList(processPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): ProcessPageItem {
  return elementValueUtils.setElementValueAsDate(processPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): ProcessPageItem {
  return elementValueUtils.setElementValueAsDateList(processPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): ProcessPageItem {
  return elementValueUtils.addElementValueAsDate(processPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param processPageItem The process page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList(
  processPageItem: ProcessPageItem,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): ProcessPageItem {
  return elementValueUtils.addElementValueAsDateList(processPageItem, elementDefinitionCode, elementValues)
}
