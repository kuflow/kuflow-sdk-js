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

import { type PrincipalType, type Task, type TaskPageItem, type TaskSaveJsonFormsValueDataCommand } from '../generated'
import { type JsonFormsFile, type JsonFormsPrincipal } from '../models'

type SimpleType = string | number | boolean | Date | JsonFormsPrincipal | JsonFormsFile

type ContainerArrayType = ComplexType[]

// eslint-disable-next-line  @typescript-eslint/consistent-indexed-object-style,@typescript-eslint/consistent-type-definitions
type ContainerRecordType = { [property: string]: ComplexType }

type ContainerType = ContainerArrayType | ContainerRecordType

type ComplexType = SimpleType | ContainerType

type JsonFormsModels = Task | TaskPageItem | TaskSaveJsonFormsValueDataCommand

export interface JsonFormsProperty {
  container: ContainerType

  path: string

  value: ComplexType | undefined
}

/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsString(model: JsonFormsModels, propertyPath: string): string {
  const value = findJsonFormsPropertyAsString(model, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsString(model: JsonFormsModels, propertyPath: string): string | undefined {
  return findJsonFormsPropertyValue(model, propertyPath)?.toString()
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsNumber(model: JsonFormsModels, propertyPath: string): number {
  const value = findJsonFormsPropertyAsNumber(model, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsNumber(model: JsonFormsModels, propertyPath: string): number | undefined {
  const value = findJsonFormsPropertyValue(model, propertyPath)
  if (value == null) {
    return undefined
  }

  if (typeof value === 'number' && !isNaN(value)) {
    return value
  }

  if (typeof value === 'string') {
    const valueFloat = parseFloat(value)
    if (!isNaN(valueFloat)) {
      return valueFloat
    }
  }

  throw new Error(`Property ${propertyPath} is not a number`)
}

/**
 * Get a json property as Boolean following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsBoolean(model: JsonFormsModels, propertyPath: string): boolean {
  const value = findJsonFormsPropertyAsBoolean(model, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsBoolean(model: JsonFormsModels, propertyPath: string): boolean | undefined {
  const value = findJsonFormsPropertyValue(model, propertyPath)

  if (value == null) {
    return undefined
  }

  if (typeof value === 'boolean') {
    return value
  } else if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  }

  throw new Error(`Property ${propertyPath} is not a boolean`)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsDate(model: JsonFormsModels, propertyPath: string): Date {
  const value = findJsonFormsPropertyAsDate(model, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsDate(model: JsonFormsModels, propertyPath: string): Date | undefined {
  const value = findJsonFormsPropertyValue(model, propertyPath)

  if (value == null) {
    return undefined
  }

  if (typeof value === 'string') {
    try {
      const valueDate = new Date(value)
      if (valueDate.toString() !== 'Invalid Date') {
        return valueDate
      }
    } catch (ignored) {}
  }

  throw new Error(`Property ${propertyPath} is not a date following ISO 8601 format`)
}

/**
 * Get a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsFile(model: JsonFormsModels, propertyPath: string): JsonFormsFile {
  const value = findJsonFormsPropertyAsJsonFormsFile(model, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsFile(
  model: JsonFormsModels,
  propertyPath: string,
): JsonFormsFile | undefined {
  const value = findJsonFormsPropertyValue(model, propertyPath)

  if (value == null) {
    return undefined
  }

  const jsonFormsFile = tryParseJsonFormsFile(value)
  if (jsonFormsFile == null) {
    throw new Error(`Property ${propertyPath} is not a file`)
  }

  return jsonFormsFile
}

/**
 * Get a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsJsonFormsPrincipal(
  model: JsonFormsModels,
  propertyPath: string,
): JsonFormsPrincipal {
  const value = findJsonFormsPropertyAsJsonFormsPrincipal(model, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as JsonFormsPrincipal following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsPrincipal(
  model: JsonFormsModels,
  propertyPath: string,
): JsonFormsPrincipal | undefined {
  const value = findJsonFormsPropertyValue(model, propertyPath)

  if (value == null) {
    return undefined
  }

  const jsonFormsPrincipal = tryParseJsonFormsPrincipal(value)
  if (jsonFormsPrincipal == null) {
    throw new Error(`Property ${propertyPath} is not a principal user`)
  }

  return jsonFormsPrincipal
}

/**
 * Get a json property as Array following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsArray(model: JsonFormsModels, propertyPath: string): unknown[] {
  const value = findJsonFormsPropertyAsArray(model, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as Array following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsArray(model: JsonFormsModels, propertyPath: string): unknown[] | undefined {
  const value = findJsonFormsPropertyValue(model, propertyPath)

  if (value == null) {
    return undefined
  }

  if (Array.isArray(value)) {
    return value
  }

  throw new Error(`Property ${propertyPath} is not an array`)
}

/**
 * Get a json property as Object following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsObject(model: JsonFormsModels, propertyPath: string): Record<string, unknown> {
  const value = findJsonFormsPropertyAsObject(model, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as Object following the 'propertyPath' passed.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsObject(
  model: JsonFormsModels,
  propertyPath: string,
): Record<string, unknown> | undefined {
  const value = findJsonFormsPropertyValue(model, propertyPath)

  if (value == null) {
    return undefined
  }

  if (typeof value === 'object') {
    return value as Record<string, unknown>
  }

  throw new Error(`Property ${propertyPath} is not an object`)
}

/**
 * Try to find a json property following the 'propertyPath' passed.
 *
 * @param model Task OR Process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
function findJsonFormsPropertyValue(model: JsonFormsModels, propertyPath: string): ComplexType | undefined {
  return findJsonFormsProperty(model, propertyPath, false)?.value
}

interface UpdateJsonFormsPropertyOptions {
  format: 'date' | 'date-time'
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param model Related model
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @param options Additional options
 * @throws Error If property parent path doesn't exist
 */
export function updateJsonFormsProperty(
  model: JsonFormsModels,
  propertyPath: string,
  value: SimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): void {
  const property = findJsonFormsProperty(model, propertyPath, true)

  value = transformJsonFormsPropertyValue(value, options)

  if (property == null) {
    throw new Error(`Property ${propertyPath} doesn't exist`)
  }

  const jsonFormsPropertyContainer = property.container
  const jsonFormsPropertyPath = property.path
  if (isJsonFormsTypeContainerArray(jsonFormsPropertyContainer)) {
    if (!isNumeric(jsonFormsPropertyPath)) {
      throw new Error(`Incorrect property path ${jsonFormsPropertyPath}, parent path is not a List`)
    }

    const jsonFormsPropertyPathIndex = parseFloat(jsonFormsPropertyPath)
    if (value != null) {
      jsonFormsPropertyContainer[jsonFormsPropertyPathIndex] = value
    } else {
      jsonFormsPropertyContainer.splice(jsonFormsPropertyPathIndex, 1)
    }
  } else if (isJsonFormsTypeContainerRecord(jsonFormsPropertyContainer)) {
    if (value != null) {
      jsonFormsPropertyContainer[jsonFormsPropertyPath] = value
    } else {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete jsonFormsPropertyContainer[jsonFormsPropertyPath]
    }
  } else {
    throw new Error(`Incorrect property path ${jsonFormsPropertyPath}`)
  }
}

/**
 * Try to find a json property following the 'propertyPath' passed.
 *
 * @param model Task OR Process
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param createMissingParents If true, missing parents paths will be created
 * @return the property if exists.
 */
export function findJsonFormsProperty(
  model: JsonFormsModels,
  propertyPath: string,
  createMissingParents: boolean = true,
): JsonFormsProperty | undefined {
  const dataCurrent = getJsonFormsValueData(model, createMissingParents)
  if (dataCurrent == null) {
    return undefined
  }

  let jsonFormsPropertyContainer: ContainerType = dataCurrent
  let jsonFormsPropertyPath = ''
  let jsonFormsPropertyValue: ComplexType | undefined

  const paths = propertyPath.split('.')
  for (let i = 0; i < paths.length; i++) {
    jsonFormsPropertyPath = paths[i]
    if (jsonFormsPropertyPath === '') {
      continue
    }

    let jsonFormsPropertyPathAsInteger = -1

    if (isJsonFormsTypeContainerArray(jsonFormsPropertyContainer)) {
      if (!isNumeric(jsonFormsPropertyPath)) {
        throw new Error(`Wrong list index ${jsonFormsPropertyPath}`)
      }

      jsonFormsPropertyPathAsInteger = parseFloat(jsonFormsPropertyPath)
      if (jsonFormsPropertyPathAsInteger < 0 || jsonFormsPropertyPathAsInteger > jsonFormsPropertyContainer.length) {
        return undefined
      } else if (jsonFormsPropertyPathAsInteger === jsonFormsPropertyContainer.length) {
        if (!createMissingParents) {
          return undefined
        }

        jsonFormsPropertyValue = undefined
      } else {
        jsonFormsPropertyValue = jsonFormsPropertyContainer[jsonFormsPropertyPathAsInteger]
      }
    } else if (isJsonFormsTypeContainerRecord(jsonFormsPropertyContainer)) {
      if (jsonFormsPropertyContainer[jsonFormsPropertyPath] == null) {
        if (!createMissingParents) {
          return undefined
        }
      }

      jsonFormsPropertyValue = jsonFormsPropertyContainer[jsonFormsPropertyPath]
    } else {
      return undefined
    }

    if (jsonFormsPropertyValue == null) {
      if (!createMissingParents) {
        return undefined
      }

      if (i + 1 < paths.length) {
        const pathNext = paths[i + 1]
        if (isNumeric(pathNext)) {
          jsonFormsPropertyValue = []
        } else {
          jsonFormsPropertyValue = {}
        }

        if (isJsonFormsTypeContainerArray(jsonFormsPropertyContainer)) {
          if (jsonFormsPropertyPathAsInteger !== jsonFormsPropertyContainer.length) {
            throw new Error(`Wrong list index ${jsonFormsPropertyPath}`)
          }

          jsonFormsPropertyContainer[jsonFormsPropertyPathAsInteger] = jsonFormsPropertyValue
        } else if (isJsonFormsTypeContainerRecord(jsonFormsPropertyContainer)) {
          jsonFormsPropertyContainer[jsonFormsPropertyPath] = jsonFormsPropertyValue
        }
      }
    }

    if (i + 1 < paths.length && jsonFormsPropertyValue != null && isJsonFormsTypeContainer(jsonFormsPropertyValue)) {
      jsonFormsPropertyContainer = jsonFormsPropertyValue
      jsonFormsPropertyValue = undefined
    }
  }

  return {
    container: jsonFormsPropertyContainer,
    path: jsonFormsPropertyPath,
    value: jsonFormsPropertyValue,
  }
}

export function generateValueForJsonFormsPrincipal(jsonFormPrincipal: JsonFormsPrincipal): string {
  const { id, type, name } = jsonFormPrincipal

  return `kuflow-principal:id=${id};type=${type};name=${name};`
}

export function generateValueForJsonFormsFile(file: JsonFormsFile): string {
  const { uri, type, name, size } = file

  return `kuflow-file:uri=${uri};type=${type};size=${size};name=${name};`
}

function transformJsonFormsPropertyValue(
  value: SimpleType | undefined,
  options?: UpdateJsonFormsPropertyOptions,
): SimpleType | undefined {
  if (value == null) {
    return undefined
  } else if (isJsonFormsPrincipalObject(value)) {
    return generateValueForJsonFormsPrincipal(value)
  } else if (isJsonFormsFileObject(value)) {
    return generateValueForJsonFormsFile(value)
  } else if (isDate(value)) {
    value = value.toISOString()
    if (options?.format !== 'date-time') {
      value = value.replace(/T.*/, '')
    }
    return value
  } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
    return value
  }

  throw new Error(`Unsupported value ${value}`)
}

function isTask(value: unknown): value is Task {
  return (value as Task).objectType === 'TASK'
}

function isTaskPageItem(value: unknown): value is TaskPageItem {
  return (value as TaskPageItem).objectType === 'TASK_PAGE_ITEM'
}

function tryParseJsonFormsFile(value: unknown): JsonFormsFile | undefined {
  if (value == null) {
    return undefined
  }

  if (typeof value !== 'string') {
    return undefined
  }

  if (!value.startsWith('kuflow-file:')) {
    return undefined
  }

  const valueTransformed = value.replace('kuflow-file:', '')

  const matches = valueTransformed.match(/.*?=.*?;/g)
  if (matches == null || matches.length !== 4) {
    return undefined
  }

  let uri: string | undefined
  let type: string | undefined
  let name: string | undefined
  let size: number | undefined

  matches.forEach(match => {
    match = match.slice(0, match.length - 1)
    const [key, value] = match.split('=')
    switch (key) {
      case 'uri': {
        uri = value
        break
      }
      case 'type': {
        type = value
        break
      }
      case 'name': {
        name = value
        break
      }
      case 'size': {
        size = parseFloat(value)
        break
      }
    }
  })

  assertIsRequired(uri)
  assertIsRequired(type)
  assertIsRequired(name)
  assertIsRequired(size)

  return {
    uri,
    type,
    name,
    size,
  }
}

function tryParseJsonFormsPrincipal(value: unknown): JsonFormsPrincipal | undefined {
  if (value == null) {
    return undefined
  }

  if (typeof value !== 'string') {
    return undefined
  }

  if (!value.startsWith('kuflow-principal:')) {
    return undefined
  }

  const valueTransformed = value.replace('kuflow-principal:', '')

  const matches = valueTransformed.match(/.*?=.*?;/g)
  if (matches == null || matches.length !== 3) {
    return undefined
  }

  let id: string | undefined
  let type: PrincipalType | undefined
  let name: string | undefined

  matches.forEach(match => {
    match = match.slice(0, match.length - 1)
    const [key, value] = match.split('=')
    switch (key) {
      case 'id': {
        id = value
        break
      }
      case 'type': {
        type = value as PrincipalType
        break
      }
      case 'name': {
        name = value
        break
      }
    }
  })

  assertIsRequired(id)
  assertIsRequired(type)
  assertIsRequired(name)

  return {
    id,
    type,
    name,
  }
}

function assertIsRequired<T>(value: T | null | undefined): asserts value is T {
  if (value === 'null' || value === 'undefined') {
    throw new Error('value is null or undefined')
  }
}

function isDate(value: unknown): value is Date {
  return value instanceof Date
}

function isJsonFormsPrincipalObject(value: unknown): value is JsonFormsPrincipal {
  if (value == null) {
    return false
  }

  return (
    Object.prototype.hasOwnProperty.call(value, 'id') &&
    Object.prototype.hasOwnProperty.call(value, 'type') &&
    Object.prototype.hasOwnProperty.call(value, 'type')
  )
}

function isJsonFormsFileObject(value: unknown): value is JsonFormsFile {
  if (value == null) {
    return false
  }

  return (
    Object.prototype.hasOwnProperty.call(value, 'uri') &&
    Object.prototype.hasOwnProperty.call(value, 'type') &&
    Object.prototype.hasOwnProperty.call(value, 'name') &&
    Object.prototype.hasOwnProperty.call(value, 'size')
  )
}

function isJsonFormsTypeContainer(value: ComplexType | undefined): value is ContainerType {
  return isJsonFormsTypeContainerRecord(value) || isJsonFormsTypeContainerArray(value)
}

function isJsonFormsTypeContainerRecord(value: ComplexType | undefined): value is ContainerRecordType {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)
}

function isJsonFormsTypeContainerArray(value: ComplexType | undefined): value is ContainerArrayType {
  return Array.isArray(value)
}

function getJsonFormsValueData(model: JsonFormsModels, createMissingParents: boolean): ContainerType | undefined {
  let data: ContainerType | undefined

  if (isTask(model) || isTaskPageItem(model)) {
    data = model.jsonFormsValue?.data
  } else {
    data = model.data
  }

  if (data == null && createMissingParents) {
    data = {}
    if (isTask(model) || isTaskPageItem(model)) {
      model.jsonFormsValue = model.jsonFormsValue ?? {}
      model.jsonFormsValue.data = data
    } else {
      model.data = data
    }
  }

  return data
}

function isNumeric(value: string): boolean {
  return (
    !isNaN(value as any as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(value)) // ...and ensure strings of whitespace fail
  )
}
