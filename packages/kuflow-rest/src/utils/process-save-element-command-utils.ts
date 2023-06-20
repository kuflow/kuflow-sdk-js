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

import { type ProcessSaveElementCommand } from '../generated'
import * as elementValueUtils from './element-values'

/**
 * Check if all related valid values are TRUE
 *
 * @param command Process save element command
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(command: ProcessSaveElementCommand): boolean {
  return elementValueUtils.getElementValueValid(command)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param command Process save element command
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(command: ProcessSaveElementCommand, index: number): boolean | undefined {
  return elementValueUtils.getElementValueValidAt(command, index)
}

/**
 * Set valid to all values
 *
 * @param command Process save element command
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid(
  command: ProcessSaveElementCommand,
  valid: boolean | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.setElementValueValid(command, valid)
}

/**
 * Set valid to the selected value
 *
 * @param command Process save element command

 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  command: ProcessSaveElementCommand,

  valid: boolean | undefined,
  index: number,
): ProcessSaveElementCommand {
  return elementValueUtils.setElementValueValidAt(command, valid, index)
}

/**
 * Get an element as String
 *
 * @param command Process save element command

 * @return the element value.
 */
export function getElementValueAsString(command: ProcessSaveElementCommand): string {
  return elementValueUtils.getElementValueAsString(command)
}

/**
 * Try to get an element as String
 *
 * @param command Process save element command

 * @return the element value if exists.
 */
export function findElementValueAsString(command: ProcessSaveElementCommand): string | undefined {
  return elementValueUtils.findElementValueAsString(command)
}

/**
 * Get all elements as String
 *
 * @param command Process save element command
 * @return the elements values.
 */
export function getElementValueAsStringList(command: ProcessSaveElementCommand): string[] {
  return elementValueUtils.getElementValueAsStringList(command)
}

/**
 * Set an element value
 *
 * @param command Process save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString(
  command: ProcessSaveElementCommand,
  elementValue: string | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.setElementValueAsString(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Process save element command

 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  command: ProcessSaveElementCommand,
  elementValues: string[] | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.setElementValueAsStringList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Process save element command
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString(
  command: ProcessSaveElementCommand,
  elementValue: string | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.addElementValueAsString(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Process save element command
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList(
  command: ProcessSaveElementCommand,
  elementValues: string[] | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.addElementValueAsStringList(command, elementValues)
}

/**
 * Get an element as Double
 *
 * @param command Process save element command
 * @return the element value.
 */
export function getElementValueAsNumber(command: ProcessSaveElementCommand): number {
  return elementValueUtils.getElementValueAsNumber(command)
}

/**
 * Try to get an element as Double
 *
 * @param command Process save element command
 * @return the element value if exists.
 */
export function findElementValueAsNumber(command: ProcessSaveElementCommand): number | undefined {
  return elementValueUtils.findElementValueAsNumber(command)
}

/**
 * Get all elements as Double
 *
 * @param command Process save element command
 * @return the elements values.
 */
export function getElementValueAsNumberList(command: ProcessSaveElementCommand): number[] {
  return elementValueUtils.getElementValueAsNumberList(command)
}

/**
 * Set an element value
 *
 * @param command Process save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber(
  command: ProcessSaveElementCommand,
  elementValue: number | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.setElementValueAsNumber(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Process save element command
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList(
  command: ProcessSaveElementCommand,
  elementValues: number[] | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.setElementValueAsNumberList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Process save element command
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber(
  command: ProcessSaveElementCommand,

  elementValue: number | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.addElementValueAsNumber(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Process save element command

 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList(
  command: ProcessSaveElementCommand,
  elementValues: number[] | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.addElementValueAsNumberList(command, elementValues)
}

/**
 * Get an element as Date
 *
 * @param command Process save element command
 * @return the element value.
 */
export function getElementValueAsDate(command: ProcessSaveElementCommand): Date {
  return elementValueUtils.getElementValueAsDate(command)
}

/**
 * Try to get an element as Date
 *
 * @param command Process save element command
 * @return the element value if exists.
 */
export function findElementValueAsDate(command: ProcessSaveElementCommand): Date | undefined {
  return elementValueUtils.findElementValueAsDate(command)
}

/**
 * Get all elements as Date
 *
 * @param command Process save element command
 * @return the elements values.
 */
export function getElementValueAsDateList(command: ProcessSaveElementCommand): Date[] {
  return elementValueUtils.getElementValueAsDateList(command)
}

/**
 * Set an element value
 *
 * @param command Process save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate(
  command: ProcessSaveElementCommand,
  elementValue: Date | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.setElementValueAsDate(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Process save element command
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList(
  command: ProcessSaveElementCommand,
  elementValues: Date[] | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.setElementValueAsDateList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Process save element command

 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate(
  command: ProcessSaveElementCommand,
  elementValue: Date | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.addElementValueAsDate(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Process save element command
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList(
  command: ProcessSaveElementCommand,
  elementValues: Date[] | undefined,
): ProcessSaveElementCommand {
  return elementValueUtils.addElementValueAsDateList(command, elementValues)
}
