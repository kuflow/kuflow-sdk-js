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

import { type ProcessSaveEntityDataCommand } from '../generated'
import type { JsonFormsFile, JsonFormsPrincipal } from '../models'
import * as JsonFormUtils from './json-forms'

type JsonFormsSimpleType = JsonFormUtils.JsonFormsSimpleType
type UpdateJsonFormsPropertyOptions = JsonFormUtils.UpdateJsonFormsPropertyOptions
type JsonFormsModel = JsonFormUtils.JsonFormsModel
/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsString(command: ProcessSaveEntityDataCommand, propertyPath: string): string {
  return JsonFormUtils.getJsonFormsPropertyAsString(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsString(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): string | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsString(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsNumber(command: ProcessSaveEntityDataCommand, propertyPath: string): number {
  return JsonFormUtils.getJsonFormsPropertyAsNumber(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsNumber(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): number | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsNumber(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Get a json property as Boolean following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsBoolean(command: ProcessSaveEntityDataCommand, propertyPath: string): boolean {
  return JsonFormUtils.getJsonFormsPropertyAsBoolean(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsBoolean(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): boolean | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsBoolean(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsDate(command: ProcessSaveEntityDataCommand, propertyPath: string): Date {
  return JsonFormUtils.getJsonFormsPropertyAsDate(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsDate(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): Date | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsDate(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Get a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsJsonFormsFile(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): JsonFormsFile {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsFile(
    ProcessSaveEntityDataCommandJsonValue.of(command),
    propertyPath,
  )
}

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsJsonFormsFile(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): JsonFormsFile | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsFile(
    ProcessSaveEntityDataCommandJsonValue.of(command),
    propertyPath,
  )
}

/**
 * Get a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsJsonFormsPrincipal(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): JsonFormsPrincipal {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsPrincipal(
    ProcessSaveEntityDataCommandJsonValue.of(command),
    propertyPath,
  )
}

/**
 * Try to find a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsJsonFormsPrincipal(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): JsonFormsPrincipal | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsPrincipal(
    ProcessSaveEntityDataCommandJsonValue.of(command),
    propertyPath,
  )
}

/**
 * Get a json property as Array following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsArray(command: ProcessSaveEntityDataCommand, propertyPath: string): unknown[] {
  return JsonFormUtils.getJsonFormsPropertyAsArray(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Try to find a json property as Array following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsArray(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): unknown[] | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsArray(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Get a json property as Object following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getEntityPropertyAsObject(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): Record<string, unknown> {
  return JsonFormUtils.getJsonFormsPropertyAsObject(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Try to find a json property as Object following the 'propertyPath' passed.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findEntityPropertyAsObject(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
): Record<string, unknown> | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsObject(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath)
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param command The command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @param options Additional options
 * @throws Error If property parent path doesn't exist
 */
export function updateEntityProperty(
  command: ProcessSaveEntityDataCommand,
  propertyPath: string,
  value: JsonFormsSimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): void {
  JsonFormUtils.updateJsonFormsProperty(ProcessSaveEntityDataCommandJsonValue.of(command), propertyPath, value, options)
}

class ProcessSaveEntityDataCommandJsonValue implements JsonFormsModel {
  public static of(command: ProcessSaveEntityDataCommand): JsonFormsModel {
    return new ProcessSaveEntityDataCommandJsonValue(command)
  }

  private constructor(readonly command: ProcessSaveEntityDataCommand) {}

  get jsonValue(): Record<string, any> | undefined {
    return this.command.data
  }

  set jsonValue(data: Record<string, any> | undefined) {
    this.command.data = data ?? {}
  }
}
