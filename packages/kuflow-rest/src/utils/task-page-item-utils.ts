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

import { type TaskElementValueDocumentItem, type TaskElementValuePrincipalItem, type TaskPageItem } from '../generated'
import { type JsonFormsFile, type JsonFormsPrincipal } from '../models'
import * as elementValueUtils from './element-values'
import * as JsonFormUtils from './json-forms'

type KuFlowObject = elementValueUtils.KuFlowObject
type JsonFormsSimpleType = JsonFormUtils.JsonFormsSimpleType
type UpdateJsonFormsPropertyOptions = JsonFormUtils.UpdateJsonFormsPropertyOptions

/**
 * Check if all related valid values are TRUE
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(taskPageItem: TaskPageItem, elementDefinitionCode: string): boolean {
  return elementValueUtils.getElementValueValid(taskPageItem, elementDefinitionCode)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  index: number,
): boolean | undefined {
  return elementValueUtils.getElementValueValidAt(taskPageItem, elementDefinitionCode, index)
}

/**
 * Set valid to all values
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  valid: boolean | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueValid(taskPageItem, elementDefinitionCode, valid)
}

/**
 * Set valid to the selected value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  valid: boolean | undefined,
  index: number,
): TaskPageItem {
  return elementValueUtils.setElementValueValidAt(taskPageItem, elementDefinitionCode, valid, index)
}

/**
 * Get an element as String
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(taskPageItem: TaskPageItem, elementDefinitionCode: string): string {
  return elementValueUtils.getElementValueAsString(taskPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as String
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): string | undefined {
  return elementValueUtils.findElementValueAsString(taskPageItem, elementDefinitionCode)
}

/**
 * Get all elements as String
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(taskPageItem: TaskPageItem, elementDefinitionCode: string): string[] {
  return elementValueUtils.getElementValueAsStringList(taskPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsString(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsStringList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsString(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsStringList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Double
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(taskPageItem: TaskPageItem, elementDefinitionCode: string): number {
  return elementValueUtils.getElementValueAsNumber(taskPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as Double
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): number | undefined {
  return elementValueUtils.findElementValueAsNumber(taskPageItem, elementDefinitionCode)
}

/**
 * Get all elements as Double
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(taskPageItem: TaskPageItem, elementDefinitionCode: string): number[] {
  return elementValueUtils.getElementValueAsNumberList(taskPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsNumber(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsNumberList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsNumber(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsNumberList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Date
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(taskPageItem: TaskPageItem, elementDefinitionCode: string): Date {
  return elementValueUtils.getElementValueAsDate(taskPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as Date
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(taskPageItem: TaskPageItem, elementDefinitionCode: string): Date | undefined {
  return elementValueUtils.findElementValueAsDate(taskPageItem, elementDefinitionCode)
}

/**
 * Get all elements as Date
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(taskPageItem: TaskPageItem, elementDefinitionCode: string): Date[] {
  return elementValueUtils.getElementValueAsDateList(taskPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsDate(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsDateList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsDate(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsDateList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Object
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsObject(taskPageItem: TaskPageItem, elementDefinitionCode: string): KuFlowObject {
  return elementValueUtils.getElementValueAsObject(taskPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as Object
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsObject(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): KuFlowObject | undefined {
  return elementValueUtils.findElementValueAsObject(taskPageItem, elementDefinitionCode)
}

/**
 * Get all elements as Object
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsObjectList(taskPageItem: TaskPageItem, elementDefinitionCode: string): KuFlowObject[] {
  return elementValueUtils.getElementValueAsObjectList(taskPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObject(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsObject(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObjectList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsObjectList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsObject(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsObject(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsObjectList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsObjectList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Document
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDocument(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem {
  return elementValueUtils.getElementValueAsDocument(taskPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as Document
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDocument(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem | undefined {
  return elementValueUtils.findElementValueAsDocument(taskPageItem, elementDefinitionCode)
}

/**
 * Get all elements as Document
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDocumentList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem[] {
  return elementValueUtils.getElementValueAsDocumentList(taskPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocument(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: TaskElementValueDocumentItem | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsDocument(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocumentList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsDocumentList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsDocument(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: TaskElementValueDocumentItem | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsDocument(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsDocumentList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsDocumentList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Principal
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 * @throws Error If element value doesn't exists
 */
export function getElementValueAsPrincipal(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem {
  return elementValueUtils.getElementValueAsPrincipal(taskPageItem, elementDefinitionCode)
}

/**
 * Try to get an element as Principal
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsPrincipal(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem | undefined {
  return elementValueUtils.findElementValueAsPrincipal(taskPageItem, elementDefinitionCode)
}

/**
 * Get all elements as Principal
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsPrincipalList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem[] {
  return elementValueUtils.getElementValueAsPrincipalList(taskPageItem, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsPrincipal(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: TaskElementValuePrincipalItem | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsPrincipal(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsPrincipalList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): TaskPageItem {
  return elementValueUtils.setElementValueAsPrincipalList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsPrincipal(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValue: TaskElementValuePrincipalItem | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsPrincipal(taskPageItem, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param taskPageItem The task page item
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsPrincipalList(
  taskPageItem: TaskPageItem,
  elementDefinitionCode: string,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): TaskPageItem {
  return elementValueUtils.addElementValueAsPrincipalList(taskPageItem, elementDefinitionCode, elementValues)
}

/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsString(taskPageItem: TaskPageItem, propertyPath: string): string {
  return JsonFormUtils.getJsonFormsPropertyAsString(taskPageItem, propertyPath)
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsString(taskPageItem: TaskPageItem, propertyPath: string): string | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsString(taskPageItem, propertyPath)
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsNumber(taskPageItem: TaskPageItem, propertyPath: string): number {
  return JsonFormUtils.getJsonFormsPropertyAsNumber(taskPageItem, propertyPath)
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsNumber(taskPageItem: TaskPageItem, propertyPath: string): number | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsNumber(taskPageItem, propertyPath)
}

/**
 * Get a json property as Boolean following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsBoolean(taskPageItem: TaskPageItem, propertyPath: string): boolean {
  return JsonFormUtils.getJsonFormsPropertyAsBoolean(taskPageItem, propertyPath)
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsBoolean(taskPageItem: TaskPageItem, propertyPath: string): boolean | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsBoolean(taskPageItem, propertyPath)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsDate(taskPageItem: TaskPageItem, propertyPath: string): Date {
  return JsonFormUtils.getJsonFormsPropertyAsDate(taskPageItem, propertyPath)
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsDate(taskPageItem: TaskPageItem, propertyPath: string): Date | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsDate(taskPageItem, propertyPath)
}

/**
 * Get a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsFile(taskPageItem: TaskPageItem, propertyPath: string): JsonFormsFile {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsFile(taskPageItem, propertyPath)
}

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsFile(
  taskPageItem: TaskPageItem,
  propertyPath: string,
): JsonFormsFile | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsFile(taskPageItem, propertyPath)
}

/**
 * Get a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsPrincipal(
  taskPageItem: TaskPageItem,
  propertyPath: string,
): JsonFormsPrincipal {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsPrincipal(taskPageItem, propertyPath)
}

/**
 * Try to find a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsPrincipal(
  taskPageItem: TaskPageItem,
  propertyPath: string,
): JsonFormsPrincipal | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsPrincipal(taskPageItem, propertyPath)
}

/**
 * Get a json property as Array following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsArray(taskPageItem: TaskPageItem, propertyPath: string): unknown[] {
  return JsonFormUtils.getJsonFormsPropertyAsArray(taskPageItem, propertyPath)
}

/**
 * Try to find a json property as Array following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsArray(taskPageItem: TaskPageItem, propertyPath: string): unknown[] | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsArray(taskPageItem, propertyPath)
}

/**
 * Get a json property as Object following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsObject(
  taskPageItem: TaskPageItem,
  propertyPath: string,
): Record<string, unknown> {
  return JsonFormUtils.getJsonFormsPropertyAsObject(taskPageItem, propertyPath)
}

/**
 * Try to find a json property as Object following the 'propertyPath' passed.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsObject(
  taskPageItem: TaskPageItem,
  propertyPath: string,
): Record<string, unknown> | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsObject(taskPageItem, propertyPath)
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param taskPageItem The task page item
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @param options Additional options
 * @throws Error If property parent path doesn't exist
 */
export function updateJsonFormsProperty(
  taskPageItem: TaskPageItem,
  propertyPath: string,
  value: JsonFormsSimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): void {
  JsonFormUtils.updateJsonFormsProperty(taskPageItem, propertyPath, value, options)
}
