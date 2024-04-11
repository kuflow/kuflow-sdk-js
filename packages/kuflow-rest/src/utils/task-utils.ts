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

import { type Task, type TaskElementValueDocumentItem, type TaskElementValuePrincipalItem } from '../generated'
import { type JsonFormsFile, type JsonFormsPrincipal } from '../models'
import * as ElementValueUtils from './element-values'
import * as JsonFormUtils from './json-forms'

type KuFlowObject = ElementValueUtils.KuFlowObject
type JsonFormsSimpleType = JsonFormUtils.JsonFormsSimpleType
type UpdateJsonFormsPropertyOptions = JsonFormUtils.UpdateJsonFormsPropertyOptions
type JsonFormsModel = JsonFormUtils.JsonFormsModel

/**
 * Check if all related valid values are TRUE
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(task: Task, elementDefinitionCode: string): boolean {
  return ElementValueUtils.getElementValueValid(task, elementDefinitionCode)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param task The task
 * @param elementDefinitionCode Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(task: Task, elementDefinitionCode: string, index: number): boolean | undefined {
  return ElementValueUtils.getElementValueValidAt(task, elementDefinitionCode, index)
}

/**
 * Set valid to all values
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid(task: Task, elementDefinitionCode: string, valid: boolean | undefined): Task {
  return ElementValueUtils.setElementValueValid(task, elementDefinitionCode, valid)
}

/**
 * Set valid to the selected value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  task: Task,
  elementDefinitionCode: string,
  valid: boolean | undefined,
  index: number,
): Task {
  return ElementValueUtils.setElementValueValidAt(task, elementDefinitionCode, valid, index)
}

/**
 * Get an element as String
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(task: Task, elementDefinitionCode: string): string {
  return ElementValueUtils.getElementValueAsString(task, elementDefinitionCode)
}

/**
 * Try to get an element as String
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(task: Task, elementDefinitionCode: string): string | undefined {
  return ElementValueUtils.findElementValueAsString(task, elementDefinitionCode)
}

/**
 * Get all elements as String
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(task: Task, elementDefinitionCode: string): string[] {
  return ElementValueUtils.getElementValueAsStringList(task, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString(
  task: Task,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Task {
  return ElementValueUtils.setElementValueAsString(task, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Task {
  return ElementValueUtils.setElementValueAsStringList(task, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString(
  task: Task,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Task {
  return ElementValueUtils.addElementValueAsString(task, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Task {
  return ElementValueUtils.addElementValueAsStringList(task, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Double
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(task: Task, elementDefinitionCode: string): number {
  return ElementValueUtils.getElementValueAsNumber(task, elementDefinitionCode)
}

/**
 * Try to get an element as Double
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(task: Task, elementDefinitionCode: string): number | undefined {
  return ElementValueUtils.findElementValueAsNumber(task, elementDefinitionCode)
}

/**
 * Get all elements as Double
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(task: Task, elementDefinitionCode: string): number[] {
  return ElementValueUtils.getElementValueAsNumberList(task, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber(
  task: Task,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Task {
  return ElementValueUtils.setElementValueAsNumber(task, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Task {
  return ElementValueUtils.setElementValueAsNumberList(task, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber(
  task: Task,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Task {
  return ElementValueUtils.addElementValueAsNumber(task, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Task {
  return ElementValueUtils.addElementValueAsNumberList(task, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Date
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(task: Task, elementDefinitionCode: string): Date {
  return ElementValueUtils.getElementValueAsDate(task, elementDefinitionCode)
}

/**
 * Try to get an element as Date
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(task: Task, elementDefinitionCode: string): Date | undefined {
  return ElementValueUtils.findElementValueAsDate(task, elementDefinitionCode)
}

/**
 * Get all elements as Date
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(task: Task, elementDefinitionCode: string): Date[] {
  return ElementValueUtils.getElementValueAsDateList(task, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate(task: Task, elementDefinitionCode: string, elementValue: Date | undefined): Task {
  return ElementValueUtils.setElementValueAsDate(task, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Task {
  return ElementValueUtils.setElementValueAsDateList(task, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate(task: Task, elementDefinitionCode: string, elementValue: Date | undefined): Task {
  return ElementValueUtils.addElementValueAsDate(task, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Task {
  return ElementValueUtils.addElementValueAsDateList(task, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Object
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsObject(task: Task, elementDefinitionCode: string): KuFlowObject {
  return ElementValueUtils.getElementValueAsObject(task, elementDefinitionCode)
}

/**
 * Try to get an element as Object
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsObject(task: Task, elementDefinitionCode: string): KuFlowObject | undefined {
  return ElementValueUtils.findElementValueAsObject(task, elementDefinitionCode)
}

/**
 * Get all elements as Object
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsObjectList(task: Task, elementDefinitionCode: string): KuFlowObject[] {
  return ElementValueUtils.getElementValueAsObjectList(task, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObject(
  task: Task,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): Task {
  return ElementValueUtils.setElementValueAsObject(task, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObjectList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Task {
  return ElementValueUtils.setElementValueAsObjectList(task, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsObject(
  task: Task,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): Task {
  return ElementValueUtils.addElementValueAsObject(task, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsObjectList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Task {
  return ElementValueUtils.addElementValueAsObjectList(task, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Document
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDocument(task: Task, elementDefinitionCode: string): TaskElementValueDocumentItem {
  return ElementValueUtils.getElementValueAsDocument(task, elementDefinitionCode)
}

/**
 * Try to get an element as Document
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDocument(
  task: Task,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem | undefined {
  return ElementValueUtils.findElementValueAsDocument(task, elementDefinitionCode)
}

/**
 * Get all elements as Document
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDocumentList(
  task: Task,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem[] {
  return ElementValueUtils.getElementValueAsDocumentList(task, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocument(
  task: Task,
  elementDefinitionCode: string,
  elementValue: TaskElementValueDocumentItem | undefined,
): Task {
  return ElementValueUtils.setElementValueAsDocument(task, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocumentList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): Task {
  return ElementValueUtils.setElementValueAsDocumentList(task, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsDocument(
  task: Task,
  elementDefinitionCode: string,
  elementValue: TaskElementValueDocumentItem | undefined,
): Task {
  return ElementValueUtils.addElementValueAsDocument(task, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsDocumentList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): Task {
  return ElementValueUtils.addElementValueAsDocumentList(task, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Principal
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 * @throws Error If element value doesn't exists
 */
export function getElementValueAsPrincipal(task: Task, elementDefinitionCode: string): TaskElementValuePrincipalItem {
  return ElementValueUtils.getElementValueAsPrincipal(task, elementDefinitionCode)
}

/**
 * Try to get an element as Principal
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsPrincipal(
  task: Task,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem | undefined {
  return ElementValueUtils.findElementValueAsPrincipal(task, elementDefinitionCode)
}

/**
 * Get all elements as Principal
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsPrincipalList(
  task: Task,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem[] {
  return ElementValueUtils.getElementValueAsPrincipalList(task, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsPrincipal(
  task: Task,
  elementDefinitionCode: string,
  elementValue: TaskElementValuePrincipalItem | undefined,
): Task {
  return ElementValueUtils.setElementValueAsPrincipal(task, elementDefinitionCode, elementValue)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsPrincipalList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): Task {
  return ElementValueUtils.setElementValueAsPrincipalList(task, elementDefinitionCode, elementValues)
}

/**
 * Add a new element value
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsPrincipal(
  task: Task,
  elementDefinitionCode: string,
  elementValue: TaskElementValuePrincipalItem | undefined,
): Task {
  return ElementValueUtils.addElementValueAsPrincipal(task, elementDefinitionCode, elementValue)
}

/**
 * Add all element values passed
 *
 * @param task The task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsPrincipalList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): Task {
  return ElementValueUtils.addElementValueAsPrincipalList(task, elementDefinitionCode, elementValues)
}

/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsString(task: Task, propertyPath: string): string {
  return JsonFormUtils.getJsonFormsPropertyAsString(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsString(task: Task, propertyPath: string): string | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsString(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsNumber(task: Task, propertyPath: string): number {
  return JsonFormUtils.getJsonFormsPropertyAsNumber(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsNumber(task: Task, propertyPath: string): number | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsNumber(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Get a json property as Boolean following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsBoolean(task: Task, propertyPath: string): boolean {
  return JsonFormUtils.getJsonFormsPropertyAsBoolean(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsBoolean(task: Task, propertyPath: string): boolean | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsBoolean(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsDate(task: Task, propertyPath: string): Date {
  return JsonFormUtils.getJsonFormsPropertyAsDate(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsDate(task: Task, propertyPath: string): Date | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsDate(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Get a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsFile(task: Task, propertyPath: string): JsonFormsFile {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsFile(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsFile(task: Task, propertyPath: string): JsonFormsFile | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsFile(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Get a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsPrincipal(task: Task, propertyPath: string): JsonFormsPrincipal {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsPrincipal(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Try to find a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsPrincipal(
  task: Task,
  propertyPath: string,
): JsonFormsPrincipal | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsPrincipal(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Get a json property as Array following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsArray(task: Task, propertyPath: string): unknown[] {
  return JsonFormUtils.getJsonFormsPropertyAsArray(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Try to find a json property as Array following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsArray(task: Task, propertyPath: string): unknown[] | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsArray(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Get a json property as Object following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsObject(task: Task, propertyPath: string): Record<string, unknown> {
  return JsonFormUtils.getJsonFormsPropertyAsObject(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Try to find a json property as Object following the 'propertyPath' passed.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsObject(task: Task, propertyPath: string): Record<string, unknown> | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsObject(TaskJsonFormsValueJsonValue.of(task), propertyPath)
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param task The task
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @param options Additional options
 * @throws Error If property parent path doesn't exist
 */
export function updateJsonFormsProperty(
  task: Task,
  propertyPath: string,
  value: JsonFormsSimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): void {
  JsonFormUtils.updateJsonFormsProperty(TaskJsonFormsValueJsonValue.of(task), propertyPath, value, options)
}

class TaskJsonFormsValueJsonValue implements JsonFormsModel {
  public static of(task: Task): JsonFormsModel {
    return new TaskJsonFormsValueJsonValue(task)
  }

  private constructor(readonly task: Task) {}

  get jsonValue(): Record<string, any> | undefined {
    return this.task.jsonFormsValue?.data
  }

  set jsonValue(data: Record<string, any> | undefined) {
    if (this.task.jsonFormsValue == null) {
      this.task.jsonFormsValue = {}
    }

    this.task.jsonFormsValue.data = data
  }
}
