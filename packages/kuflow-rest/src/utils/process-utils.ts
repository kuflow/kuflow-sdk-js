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

import { type Process } from '../generated'
import * as elementValueUtils from './element-values'

/**
 * Check if all related valid values are TRUE
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(process: Process, elementDefinitionCode: string): boolean {
  return elementValueUtils.getElementValueValid(process, elementDefinitionCode)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param process The process
 * @param elementDefinitionCode Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(
  process: Process,
  elementDefinitionCode: string,
  index: number,
): boolean | undefined {
  return elementValueUtils.getElementValueValidAt(process, elementDefinitionCode, index)
}

/**
 * Set valid to all values
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid(
  process: Process,
  elementDefinitionCode: string,
  valid: boolean | undefined,
): Process {
  return elementValueUtils.setElementValueValid(process, elementDefinitionCode, valid)
}

/**
 * Set valid to the selected value
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  process: Process,
  elementDefinitionCode: string,
  valid: boolean | undefined,
  index: number,
): Process {
  return elementValueUtils.setElementValueValidAt(process, elementDefinitionCode, valid, index)
}

/**
 * Get an element as String
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(process: Process, elementDefinitionCode: string): string {
  return elementValueUtils.getElementValueAsString(process, elementDefinitionCode)
}

/**
 * Try to get an element as String
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(process: Process, elementDefinitionCode: string): string | undefined {
  return elementValueUtils.findElementValueAsString(process, elementDefinitionCode)
}

/**
 * Get all elements as String
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(process: Process, elementDefinitionCode: string): string[] {
  return elementValueUtils.getElementValueAsStringList(process, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString(
  process: Process,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Process {
  return elementValueUtils.setElementValueAsString(process, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Process {
  return elementValueUtils.setElementValueAsStringList(process, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString(
  process: Process,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Process {
  return elementValueUtils.addElementValueAsString(process, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Process {
  return elementValueUtils.addElementValueAsStringList(process, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Double
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(process: Process, elementDefinitionCode: string): number {
  return elementValueUtils.getElementValueAsNumber(process, elementDefinitionCode)
}

/**
 * Try to get an element as Double
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(process: Process, elementDefinitionCode: string): number | undefined {
  return elementValueUtils.findElementValueAsNumber(process, elementDefinitionCode)
}

/**
 * Get all elements as Double
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(process: Process, elementDefinitionCode: string): number[] {
  return elementValueUtils.getElementValueAsNumberList(process, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber(
  process: Process,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Process {
  return elementValueUtils.setElementValueAsNumber(process, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Process {
  return elementValueUtils.setElementValueAsNumberList(process, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber(
  process: Process,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Process {
  return elementValueUtils.addElementValueAsNumber(process, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Process {
  return elementValueUtils.addElementValueAsNumberList(process, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Date
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(process: Process, elementDefinitionCode: string): Date {
  return elementValueUtils.getElementValueAsDate(process, elementDefinitionCode)
}

/**
 * Try to get an element as Date
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(process: Process, elementDefinitionCode: string): Date | undefined {
  return elementValueUtils.findElementValueAsDate(process, elementDefinitionCode)
}

/**
 * Get all elements as Date
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(process: Process, elementDefinitionCode: string): Date[] {
  return elementValueUtils.getElementValueAsDateList(process, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate(
  process: Process,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): Process {
  return elementValueUtils.setElementValueAsDate(process, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Process {
  return elementValueUtils.setElementValueAsDateList(process, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate(
  process: Process,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): Process {
  return elementValueUtils.addElementValueAsDate(process, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Process {
  return elementValueUtils.addElementValueAsDateList(process, elementDefinitionCode, elementValues)
}
