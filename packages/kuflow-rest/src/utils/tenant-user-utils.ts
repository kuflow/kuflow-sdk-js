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

import { type TenantUser } from '../generated'
import { type JsonFormsFile, type JsonFormsPrincipal } from '../models'
import * as JsonFormUtils from './json-forms'

type JsonFormsSimpleType = JsonFormUtils.JsonFormsSimpleType
type UpdateJsonFormsPropertyOptions = JsonFormUtils.UpdateJsonFormsPropertyOptions

/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getMetadataPropertyAsString(tenantUser: TenantUser, propertyPath: string): string {
  return JsonFormUtils.getJsonFormsPropertyAsString(tenantUser, propertyPath)
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findMetadataPropertyAsString(tenantUser: TenantUser, propertyPath: string): string | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsString(tenantUser, propertyPath)
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getMetadataPropertyAsNumber(tenantUser: TenantUser, propertyPath: string): number {
  return JsonFormUtils.getJsonFormsPropertyAsNumber(tenantUser, propertyPath)
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findMetadataPropertyAsNumber(tenantUser: TenantUser, propertyPath: string): number | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsNumber(tenantUser, propertyPath)
}

/**
 * Get a json property as Boolean following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getMetadataPropertyAsBoolean(tenantUser: TenantUser, propertyPath: string): boolean {
  return JsonFormUtils.getJsonFormsPropertyAsBoolean(tenantUser, propertyPath)
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findMetadataPropertyAsBoolean(tenantUser: TenantUser, propertyPath: string): boolean | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsBoolean(tenantUser, propertyPath)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getMetadataPropertyAsDate(tenantUser: TenantUser, propertyPath: string): Date {
  return JsonFormUtils.getJsonFormsPropertyAsDate(tenantUser, propertyPath)
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findMetadataPropertyAsDate(tenantUser: TenantUser, propertyPath: string): Date | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsDate(tenantUser, propertyPath)
}

/**
 * Get a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getMetadataPropertyAsJsonFormsFile(tenantUser: TenantUser, propertyPath: string): JsonFormsFile {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsFile(tenantUser, propertyPath)
}

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findMetadataPropertyAsJsonFormsFile(
  tenantUser: TenantUser,
  propertyPath: string,
): JsonFormsFile | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsFile(tenantUser, propertyPath)
}

/**
 * Get a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getMetadataPropertyAsJsonFormsPrincipal(
  tenantUser: TenantUser,
  propertyPath: string,
): JsonFormsPrincipal {
  return JsonFormUtils.getJsonFormsPropertyAsJsonFormsPrincipal(tenantUser, propertyPath)
}

/**
 * Try to find a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findMetadataPropertyAsJsonFormsPrincipal(
  tenantUser: TenantUser,
  propertyPath: string,
): JsonFormsPrincipal | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsJsonFormsPrincipal(tenantUser, propertyPath)
}

/**
 * Get a json property as Array following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getMetadataPropertyAsArray(tenantUser: TenantUser, propertyPath: string): unknown[] {
  return JsonFormUtils.getJsonFormsPropertyAsArray(tenantUser, propertyPath)
}

/**
 * Try to find a json property as Array following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findMetadataPropertyAsArray(tenantUser: TenantUser, propertyPath: string): unknown[] | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsArray(tenantUser, propertyPath)
}

/**
 * Get a json property as Object following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getMetadataPropertyAsObject(tenantUser: TenantUser, propertyPath: string): Record<string, unknown> {
  return JsonFormUtils.getJsonFormsPropertyAsObject(tenantUser, propertyPath)
}

/**
 * Try to find a json property as Object following the 'propertyPath' passed.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findMetadataPropertyAsObject(
  tenantUser: TenantUser,
  propertyPath: string,
): Record<string, unknown> | undefined {
  return JsonFormUtils.findJsonFormsPropertyAsObject(tenantUser, propertyPath)
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param tenantUser The tenant user
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @param options Additional options
 * @throws Error If property parent path doesn't exist
 */
export function updateMetadataProperty(
  tenantUser: TenantUser,
  propertyPath: string,
  value: JsonFormsSimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): void {
  JsonFormUtils.updateJsonFormsProperty(tenantUser, propertyPath, value, options)
}
