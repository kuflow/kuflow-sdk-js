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

import { type JsonFormsFile, type JsonFormsPrincipal, JsonFormsUtils } from '@kuflow/kuflow-rest'

import { type SaveTaskJsonFormsValueDataRequest } from '../models'

type SimpleType = JsonFormsUtils.JsonFormsSimpleType
type UpdateJsonFormsPropertyOptions = JsonFormsUtils.UpdateJsonFormsPropertyOptions

/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsString(request: SaveTaskJsonFormsValueDataRequest, propertyPath: string): string {
  return JsonFormsUtils.getJsonFormsPropertyAsString(request, propertyPath)
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsString(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): string | undefined {
  return JsonFormsUtils.findJsonFormsPropertyAsString(request, propertyPath)
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsNumber(request: SaveTaskJsonFormsValueDataRequest, propertyPath: string): number {
  return JsonFormsUtils.getJsonFormsPropertyAsNumber(request, propertyPath)
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsNumber(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): number | undefined {
  return JsonFormsUtils.findJsonFormsPropertyAsNumber(request, propertyPath)
}

/**
 * Get a json property as Boolean following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsBoolean(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): boolean {
  return JsonFormsUtils.getJsonFormsPropertyAsBoolean(request, propertyPath)
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsBoolean(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): boolean | undefined {
  return JsonFormsUtils.findJsonFormsPropertyAsBoolean(request, propertyPath)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsDate(request: SaveTaskJsonFormsValueDataRequest, propertyPath: string): Date {
  return JsonFormsUtils.getJsonFormsPropertyAsDate(request, propertyPath)
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsDate(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): Date | undefined {
  return JsonFormsUtils.findJsonFormsPropertyAsDate(request, propertyPath)
}

/**
 * Get a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsFile(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): JsonFormsFile {
  return JsonFormsUtils.getJsonFormsPropertyAsJsonFormsFile(request, propertyPath)
}

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsFile(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): JsonFormsFile | undefined {
  return JsonFormsUtils.findJsonFormsPropertyAsJsonFormsFile(request, propertyPath)
}

/**
 * Get a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsPrincipal(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): JsonFormsPrincipal {
  return JsonFormsUtils.getJsonFormsPropertyAsJsonFormsPrincipal(request, propertyPath)
}

/**
 * Try to find a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsPrincipal(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): JsonFormsPrincipal | undefined {
  return JsonFormsUtils.findJsonFormsPropertyAsJsonFormsPrincipal(request, propertyPath)
}

/**
 * Get a json property as Array following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsArray(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): unknown[] {
  return JsonFormsUtils.getJsonFormsPropertyAsArray(request, propertyPath)
}

/**
 * Try to find a json property as Array following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsArray(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): unknown[] | undefined {
  return JsonFormsUtils.findJsonFormsPropertyAsArray(request, propertyPath)
}

/**
 * Get a json property as Object following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsObject(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): Record<string, unknown> {
  return JsonFormsUtils.getJsonFormsPropertyAsObject(request, propertyPath)
}

/**
 * Try to find a json property as Object following the 'propertyPath' passed.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsObject(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
): Record<string, unknown> | undefined {
  return JsonFormsUtils.findJsonFormsPropertyAsObject(request, propertyPath)
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param request The save task json forms value data request
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @param options Additional options
 * @throws Error If property parent path doesn't exist
 */
export function updateJsonFormsProperty(
  request: SaveTaskJsonFormsValueDataRequest,
  propertyPath: string,
  value: SimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): void {
  JsonFormsUtils.updateJsonFormsProperty(request, propertyPath, value, options)
}
