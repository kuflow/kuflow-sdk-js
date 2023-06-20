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

import { type TaskSaveJsonFormsValueDataCommand } from '../generated'
import { type JsonFormsFile, type JsonFormsPrincipal } from '../models'
import * as jsonFormUtils from './json-forms'

type SimpleType = jsonFormUtils.JsonFormsSimpleType
type UpdateJsonFormsPropertyOptions = jsonFormUtils.UpdateJsonFormsPropertyOptions

/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsString(command: TaskSaveJsonFormsValueDataCommand, propertyPath: string): string {
  return jsonFormUtils.getJsonFormsPropertyAsString(command, propertyPath)
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsString(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): string | undefined {
  return jsonFormUtils.findJsonFormsPropertyAsString(command, propertyPath)
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsNumber(command: TaskSaveJsonFormsValueDataCommand, propertyPath: string): number {
  return jsonFormUtils.getJsonFormsPropertyAsNumber(command, propertyPath)
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsNumber(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): number | undefined {
  return jsonFormUtils.findJsonFormsPropertyAsNumber(command, propertyPath)
}

/**
 * Get a json property as Boolean following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsBoolean(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): boolean {
  return jsonFormUtils.getJsonFormsPropertyAsBoolean(command, propertyPath)
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsBoolean(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): boolean | undefined {
  return jsonFormUtils.findJsonFormsPropertyAsBoolean(command, propertyPath)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsDate(command: TaskSaveJsonFormsValueDataCommand, propertyPath: string): Date {
  return jsonFormUtils.getJsonFormsPropertyAsDate(command, propertyPath)
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsDate(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): Date | undefined {
  return jsonFormUtils.findJsonFormsPropertyAsDate(command, propertyPath)
}

/**
 * Get a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsFile(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): JsonFormsFile {
  return jsonFormUtils.getJsonFormsPropertyAsJsonFormsFile(command, propertyPath)
}

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsFile(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): JsonFormsFile | undefined {
  return jsonFormUtils.findJsonFormsPropertyAsJsonFormsFile(command, propertyPath)
}

/**
 * Get a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsPrincipal(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): JsonFormsPrincipal {
  return jsonFormUtils.getJsonFormsPropertyAsJsonFormsPrincipal(command, propertyPath)
}

/**
 * Try to find a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsPrincipal(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): JsonFormsPrincipal | undefined {
  return jsonFormUtils.findJsonFormsPropertyAsJsonFormsPrincipal(command, propertyPath)
}

/**
 * Get a json property as Array following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsArray(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): unknown[] {
  return jsonFormUtils.getJsonFormsPropertyAsArray(command, propertyPath)
}

/**
 * Try to find a json property as Array following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsArray(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): unknown[] | undefined {
  return jsonFormUtils.findJsonFormsPropertyAsArray(command, propertyPath)
}

/**
 * Get a json property as Object following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsObject(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): Record<string, unknown> {
  return jsonFormUtils.getJsonFormsPropertyAsObject(command, propertyPath)
}

/**
 * Try to find a json property as Object following the 'propertyPath' passed.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsObject(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
): Record<string, unknown> | undefined {
  return jsonFormUtils.findJsonFormsPropertyAsObject(command, propertyPath)
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param command The task save json forms value data command
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @param options Additional options
 * @throws Error If property parent path doesn't exist
 */
export function updateJsonFormsProperty(
  command: TaskSaveJsonFormsValueDataCommand,
  propertyPath: string,
  value: SimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): void {
  jsonFormUtils.updateJsonFormsProperty(command, propertyPath, value, options)
}
