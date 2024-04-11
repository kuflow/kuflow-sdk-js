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
import { type JsonFormsFile, type JsonFormsPrincipal } from '../models'
import * as ElementValueUtils from './element-values'
import * as JsonFormUtils from './json-forms'

type JsonFormsSimpleType = JsonFormUtils.JsonFormsSimpleType
type UpdateJsonFormsPropertyOptions = JsonFormUtils.UpdateJsonFormsPropertyOptions
type JsonFormsModel = JsonFormUtils.JsonFormsModel

/**
 * Check if all related valid values are TRUE
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(process: Process, elementDefinitionCode: string): boolean {
  return ElementValueUtils.getElementValueValid(process, elementDefinitionCode)
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
  return ElementValueUtils.getElementValueValidAt(process, elementDefinitionCode, index)
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
  return ElementValueUtils.setElementValueValid(process, elementDefinitionCode, valid)
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
  return ElementValueUtils.setElementValueValidAt(process, elementDefinitionCode, valid, index)
}

/**
 * Get an element as String
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(process: Process, elementDefinitionCode: string): string {
  return ElementValueUtils.getElementValueAsString(process, elementDefinitionCode)
}

/**
 * Try to get an element as String
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(process: Process, elementDefinitionCode: string): string | undefined {
  return ElementValueUtils.findElementValueAsString(process, elementDefinitionCode)
}

/**
 * Get all elements as String
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(process: Process, elementDefinitionCode: string): string[] {
  return ElementValueUtils.getElementValueAsStringList(process, elementDefinitionCode)
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
  return ElementValueUtils.setElementValueAsString(process, elementDefinitionCode, elementValue)
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
  return ElementValueUtils.setElementValueAsStringList(process, elementDefinitionCode, elementValues)
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
  return ElementValueUtils.addElementValueAsString(process, elementDefinitionCode, elementValue)
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
  return ElementValueUtils.addElementValueAsStringList(process, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Double
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(process: Process, elementDefinitionCode: string): number {
  return ElementValueUtils.getElementValueAsNumber(process, elementDefinitionCode)
}

/**
 * Try to get an element as Double
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(process: Process, elementDefinitionCode: string): number | undefined {
  return ElementValueUtils.findElementValueAsNumber(process, elementDefinitionCode)
}

/**
 * Get all elements as Double
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(process: Process, elementDefinitionCode: string): number[] {
  return ElementValueUtils.getElementValueAsNumberList(process, elementDefinitionCode)
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
  return ElementValueUtils.setElementValueAsNumber(process, elementDefinitionCode, elementValue)
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
  return ElementValueUtils.setElementValueAsNumberList(process, elementDefinitionCode, elementValues)
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
  return ElementValueUtils.addElementValueAsNumber(process, elementDefinitionCode, elementValue)
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
  return ElementValueUtils.addElementValueAsNumberList(process, elementDefinitionCode, elementValues)
}

/**
 * Get an element as Date
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(process: Process, elementDefinitionCode: string): Date {
  return ElementValueUtils.getElementValueAsDate(process, elementDefinitionCode)
}

/**
 * Try to get an element as Date
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(process: Process, elementDefinitionCode: string): Date | undefined {
  return ElementValueUtils.findElementValueAsDate(process, elementDefinitionCode)
}

/**
 * Get all elements as Date
 *
 * @param process The process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(process: Process, elementDefinitionCode: string): Date[] {
  return ElementValueUtils.getElementValueAsDateList(process, elementDefinitionCode)
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
  return ElementValueUtils.setElementValueAsDate(process, elementDefinitionCode, elementValue)
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
  return ElementValueUtils.setElementValueAsDateList(process, elementDefinitionCode, elementValues)
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
  return ElementValueUtils.addElementValueAsDate(process, elementDefinitionCode, elementValue)
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
  return ElementValueUtils.addElementValueAsDateList(process, elementDefinitionCode, elementValues)
}

/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsString(process: Process, propertyPath: string): string {
  return JsonFormUtils.getJsonFormsPropertyAsString(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsString(process: Process, propertyPath: string): string | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsString(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsNumber(process: Process, propertyPath: string): number {
  return JsonFormUtils.getJsonFormsPropertyAsNumber(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsNumber(process: Process, propertyPath: string): number | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsNumber(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Get a json property as Boolean following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsBoolean(process: Process, propertyPath: string): boolean {
  return JsonFormUtils.getJsonFormsPropertyAsBoolean(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsBoolean(process: Process, propertyPath: string): boolean | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsBoolean(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsDate(process: Process, propertyPath: string): Date {
  return JsonFormUtils.getJsonFormsPropertyAsDate(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsDate(process: Process, propertyPath: string): Date | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsDate(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Get a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsJsonFormsFile(process: Process, propertyPath: string): JsonFormsFile {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsFile(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsJsonFormsFile(process: Process, propertyPath: string): JsonFormsFile | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsFile(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Get a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsJsonFormsPrincipal(process: Process, propertyPath: string): JsonFormsPrincipal {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsPrincipal(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Try to find a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsJsonFormsPrincipal(
  process: Process,
  propertyPath: string,
): JsonFormsPrincipal | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsPrincipal(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Get a json property as Array following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsArray(process: Process, propertyPath: string): unknown[] {
  return JsonFormUtils.getJsonFormsPropertyAsArray(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Try to find a json property as Array following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsArray(process: Process, propertyPath: string): unknown[] | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsArray(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Get a json property as Object following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsObject(process: Process, propertyPath: string): Record<string, unknown> {
  return JsonFormUtils.getJsonFormsPropertyAsObject(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Try to find a json property as Object following the 'propertyPath' passed.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsObject(
  process: Process,
  propertyPath: string,
): Record<string, unknown> | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsObject(ProcessEntityJsonValue.of(process), propertyPath)
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param process The process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @param options Additional options
 * @throws Error If property parent path doesn't exist
 */
export function updateEntityProperty(
  process: Process,
  propertyPath: string,
  value: JsonFormsSimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): void {
  JsonFormUtils.updateJsonFormsProperty(ProcessEntityJsonValue.of(process), propertyPath, value, options)
}

class ProcessEntityJsonValue implements JsonFormsModel {
  public static of(process: Process): JsonFormsModel {
    return new ProcessEntityJsonValue(process)
  }

  private constructor(readonly process: Process) {}

  get jsonValue(): Record<string, any> | undefined {
    return this.process.entity?.data
  }

  set jsonValue(data: Record<string, any> | undefined) {
    if (this.process.entity == null) {
      this.process.entity = {}
    }

    this.process.entity.data = data
  }
}
