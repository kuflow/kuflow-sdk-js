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
  type TaskElementValueDocumentItem,
  type TaskElementValuePrincipalItem,
  type TaskSaveElementCommand,
} from '../generated'
import * as elementValueUtils from './element-values'

type KuFlowObject = elementValueUtils.KuFlowObject

/**
 * Check if all related valid values are TRUE
 *
 * @param command Task save element command
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(command: TaskSaveElementCommand): boolean {
  return elementValueUtils.getElementValueValid(command)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param command Task save element command
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(command: TaskSaveElementCommand, index: number): boolean | undefined {
  return elementValueUtils.getElementValueValidAt(command, index)
}

/**
 * Set valid to all values
 *
 * @param command Task save element command
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid(
  command: TaskSaveElementCommand,
  valid: boolean | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueValid(command, valid)
}

/**
 * Set valid to the selected value
 *
 * @param command Task save element command
 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  command: TaskSaveElementCommand,
  valid: boolean | undefined,
  index: number,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueValidAt(command, valid, index)
}

/**
 * Get an element as String
 *
 * @param command Task save element command
 * @return the element value.
 */
export function getElementValueAsString(command: TaskSaveElementCommand): string {
  return elementValueUtils.getElementValueAsString(command)
}

/**
 * Try to get an element as String
 *
 * @param command Task save element command
 * @return the element value if exists.
 */
export function findElementValueAsString(command: TaskSaveElementCommand): string | undefined {
  return elementValueUtils.findElementValueAsString(command)
}

/**
 * Get all elements as String
 *
 * @param command Task save element command
 * @return the elements values.
 */
export function getElementValueAsStringList(command: TaskSaveElementCommand): string[] {
  return elementValueUtils.getElementValueAsStringList(command)
}

/**
 * Set an element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString(
  command: TaskSaveElementCommand,
  elementValue: string | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsString(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Task save element command
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  command: TaskSaveElementCommand,
  elementValues: string[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsStringList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString(
  command: TaskSaveElementCommand,
  elementValue: string | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsString(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Task save element command
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList(
  command: TaskSaveElementCommand,
  elementValues: string[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsStringList(command, elementValues)
}

/**
 * Get an element as Double
 *
 * @param command Task save element command
 * @return the element value.
 */
export function getElementValueAsNumber(command: TaskSaveElementCommand): number {
  return elementValueUtils.getElementValueAsNumber(command)
}

/**
 * Try to get an element as Double
 *
 * @param command Task save element command
 * @return the element value if exists.
 */
export function findElementValueAsNumber(command: TaskSaveElementCommand): number | undefined {
  return elementValueUtils.findElementValueAsNumber(command)
}

/**
 * Get all elements as Double
 *
 * @param command Task save element command
 * @return the elements values.
 */
export function getElementValueAsNumberList(command: TaskSaveElementCommand): number[] {
  return elementValueUtils.getElementValueAsNumberList(command)
}

/**
 * Set an element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber(
  command: TaskSaveElementCommand,
  elementValue: number | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsNumber(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Task save element command
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList(
  command: TaskSaveElementCommand,
  elementValues: number[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsNumberList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber(
  command: TaskSaveElementCommand,

  elementValue: number | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsNumber(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Task save element command
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList(
  command: TaskSaveElementCommand,
  elementValues: number[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsNumberList(command, elementValues)
}

/**
 * Get an element as Date
 *
 * @param command Task save element command
 * @return the element value.
 */
export function getElementValueAsDate(command: TaskSaveElementCommand): Date {
  return elementValueUtils.getElementValueAsDate(command)
}

/**
 * Try to get an element as Date
 *
 * @param command Task save element command
 * @return the element value if exists.
 */
export function findElementValueAsDate(command: TaskSaveElementCommand): Date | undefined {
  return elementValueUtils.findElementValueAsDate(command)
}

/**
 * Get all elements as Date
 *
 * @param command Task save element command
 * @return the elements values.
 */
export function getElementValueAsDateList(command: TaskSaveElementCommand): Date[] {
  return elementValueUtils.getElementValueAsDateList(command)
}

/**
 * Set an element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate(
  command: TaskSaveElementCommand,
  elementValue: Date | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsDate(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Task save element command
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList(
  command: TaskSaveElementCommand,
  elementValues: Date[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsDateList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate(
  command: TaskSaveElementCommand,
  elementValue: Date | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsDate(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Task save element command
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList(
  command: TaskSaveElementCommand,
  elementValues: Date[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsDateList(command, elementValues)
}

/**
 * Get an element as Object
 *
 * @param command Task save element command
 * @return the element value.
 */
export function getElementValueAsObject(command: TaskSaveElementCommand): KuFlowObject {
  return elementValueUtils.getElementValueAsObject(command)
}

/**
 * Try to get an element as Object
 *
 * @param command Task save element command
 * @return the element value if exists.
 */
export function findElementValueAsObject(command: TaskSaveElementCommand): KuFlowObject | undefined {
  return elementValueUtils.findElementValueAsObject(command)
}

/**
 * Get all elements as Object
 *
 * @param command Task save element command
 * @return the elements values.
 */
export function getElementValueAsObjectList(command: TaskSaveElementCommand): KuFlowObject[] {
  return elementValueUtils.getElementValueAsObjectList(command)
}

/**
 * Set an element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObject(
  command: TaskSaveElementCommand,
  elementValue: KuFlowObject | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsObject(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Task save element command
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObjectList(
  command: TaskSaveElementCommand,
  elementValues: KuFlowObject[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsObjectList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsObject(
  command: TaskSaveElementCommand,
  elementValue: KuFlowObject | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsObject(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Task save element command
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsObjectList(
  command: TaskSaveElementCommand,
  elementValues: KuFlowObject[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsObjectList(command, elementValues)
}

/**
 * Get an element as Document
 *
 * @param command Task save element command
 * @return the element value.
 */
export function getElementValueAsDocument(command: TaskSaveElementCommand): TaskElementValueDocumentItem {
  return elementValueUtils.getElementValueAsDocument(command)
}

/**
 * Try to get an element as Document
 *
 * @param command Task save element command
 * @return the element value if exists.
 */
export function findElementValueAsDocument(command: TaskSaveElementCommand): TaskElementValueDocumentItem | undefined {
  return elementValueUtils.findElementValueAsDocument(command)
}

/**
 * Get all elements as Document
 *
 * @param command Task save element command
 * @return the elements values.
 */
export function getElementValueAsDocumentList(command: TaskSaveElementCommand): TaskElementValueDocumentItem[] {
  return elementValueUtils.getElementValueAsDocumentList(command)
}

/**
 * Set an element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocument(
  command: TaskSaveElementCommand,

  elementValue: TaskElementValueDocumentItem | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsDocument(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Task save element command
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocumentList(
  command: TaskSaveElementCommand,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsDocumentList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsDocument(
  command: TaskSaveElementCommand,

  elementValue: TaskElementValueDocumentItem | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsDocument(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Task save element command
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsDocumentList(
  command: TaskSaveElementCommand,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsDocumentList(command, elementValues)
}

/**
 * Get an element as Principal
 *
 * @param command Task save element command
 * @return the element value.
 * @throws Error If element value doesn't exists
 */
export function getElementValueAsPrincipal(command: TaskSaveElementCommand): TaskElementValuePrincipalItem {
  return elementValueUtils.getElementValueAsPrincipal(command)
}

/**
 * Try to get an element as Principal
 *
 * @param command Task save element command
 * @return the element value if exists.
 */
export function findElementValueAsPrincipal(
  command: TaskSaveElementCommand,
): TaskElementValuePrincipalItem | undefined {
  return elementValueUtils.findElementValueAsPrincipal(command)
}

/**
 * Get all elements as Principal
 *
 * @param command Task save element command
 * @return the elements values.
 */
export function getElementValueAsPrincipalList(command: TaskSaveElementCommand): TaskElementValuePrincipalItem[] {
  return elementValueUtils.getElementValueAsPrincipalList(command)
}

/**
 * Set an element value
 *
 * @param command Task save element command
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsPrincipal(
  command: TaskSaveElementCommand,
  elementValue: TaskElementValuePrincipalItem | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsPrincipal(command, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param command Task save element command
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsPrincipalList(
  command: TaskSaveElementCommand,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.setElementValueAsPrincipalList(command, elementValues)
}

/**
 * Add a new element value
 *
 * @param command Task save element command

 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsPrincipal(
  command: TaskSaveElementCommand,
  elementValue: TaskElementValuePrincipalItem | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsPrincipal(command, elementValue)
}

/**
 * Add all element values passed
 *
 * @param command Task save element command

 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsPrincipalList(
  command: TaskSaveElementCommand,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): TaskSaveElementCommand {
  return elementValueUtils.addElementValueAsPrincipalList(command, elementValues)
}
