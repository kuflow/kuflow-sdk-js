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
import { type JsonFormsValue } from '../generated'
import { type JsonFormsFile, type JsonFormsPrincipalUser } from '../models'

type JsonFormsValueTypeContainerArray = JsonFormsValueType[]

// eslint-disable-next-line  @typescript-eslint/consistent-indexed-object-style,@typescript-eslint/consistent-type-definitions
type JsonFormsValueTypeContainerRecord = { [property: string]: JsonFormsValueType }

type JsonFormsValueTypeContainer = JsonFormsValueTypeContainerArray | JsonFormsValueTypeContainerRecord

type JsonFormsValueType =
  | string
  | number
  | boolean
  | Date
  | JsonFormsPrincipalUser
  | JsonFormsFile
  | JsonFormsValueTypeContainer

export interface JsonFormsProperty {
  container: JsonFormsValueTypeContainer

  path: string

  value: JsonFormsValueType | undefined
}

/**
 * Get a json property as String following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsString(jsonFormsValue: JsonFormsValue, propertyPath: string): string {
  const value = findJsonFormsPropertyAsString(jsonFormsValue, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as String following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsString(
  jsonFormsValue: JsonFormsValue,
  propertyPath: string,
): string | undefined {
  return findJsonFormsPropertyValue(jsonFormsValue, propertyPath)?.toString()
}

/**
 * Get a json property as Number following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsNumber(jsonFormsValue: JsonFormsValue, propertyPath: string): number {
  const value = findJsonFormsPropertyAsNumber(jsonFormsValue, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as Number following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsNumber(
  jsonFormsValue: JsonFormsValue,
  propertyPath: string,
): number | undefined {
  const value = findJsonFormsPropertyValue(jsonFormsValue, propertyPath)
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
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsBoolean(jsonFormsValue: JsonFormsValue, propertyPath: string): boolean {
  const value = findJsonFormsPropertyAsBoolean(jsonFormsValue, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as Double following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsBoolean(
  jsonFormsValue: JsonFormsValue,
  propertyPath: string,
): boolean | undefined {
  const value = findJsonFormsPropertyValue(jsonFormsValue, propertyPath)

  if (value == null) {
    return undefined
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    return value === 'true'
  }

  throw new Error(`Property ${propertyPath} is not a boolean`)
}

/**
 * Get a json property as Date following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 * @throws Error If property value doesn't exist
 */
export function getJsonFormsPropertyAsDate(jsonFormsValue: JsonFormsValue, propertyPath: string): Date {
  const value = findJsonFormsPropertyAsDate(jsonFormsValue, propertyPath)
  if (value == null) {
    throw new Error("Property value doesn't exist")
  }

  return value
}

/**
 * Try to find a json property as Date following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsDate(jsonFormsValue: JsonFormsValue, propertyPath: string): Date | undefined {
  const value = findJsonFormsPropertyValue(jsonFormsValue, propertyPath)

  if (value == null) {
    return undefined
  }

  if (typeof value === 'string') {
    try {
      return new Date(value)
    } catch (ignored) {}
  }

  throw new Error(`Property ${propertyPath} is not a date following ISO 8601 format`)
}

// /**
//  * Get a json property as JsonFormsFile following the 'propertyPath' passed.
//  *
//  * @param jsonFormsValue JsonFormsValue
//  * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
//  * @return the property value if exists.
//  * @throws Error If property value doesn't exist
//  */
// public static JsonFormsFile getJsonFormsPropertyAsJsonFormsFile(jsonFormsValue: JsonFormsValue, propertyPath: string) {
//   return findJsonFormsPropertyAsJsonFormsFile(jsonFormsValue, propertyPath)
//     .orElseThrow(() -> new Error("Property value doesn't exist"));
// }

/**
 * Try to find a json property as JsonFormsFile following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */
export function findJsonFormsPropertyAsJsonFormsFile(
  jsonFormsValue: JsonFormsValue,
  propertyPath: string,
): JsonFormsFile | undefined {
  const value = findJsonFormsPropertyValue(jsonFormsValue, propertyPath)

  if (value == null) {
    return undefined
  }

  if (typeof value === 'string' && isJsonFormsFile(value)) {
    return undefined
  }

  throw new Error(`Property ${propertyPath} is not a date following ISO 8601 format`)
}

// /**
//  * Get a json property as JsonFormsPrincipalUser following the 'propertyPath' passed.
//  *
//  * @param jsonFormsValue JsonFormsValue
//  * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
//  * @return the property value if exists.
//  * @throws Error If property value doesn't exist
//  */
// public static JsonFormsPrincipalUser getJsonFormsPropertyAsJsonFormsPrincipalUser(jsonFormsValue: JsonFormsValue, propertyPath: string) {
//   return findJsonFormsPropertyAsJsonFormsPrincipalUser(jsonFormsValue, propertyPath)
//     .orElseThrow(() -> new Error("Property value doesn't exist"));
// }
//
// /**
//  * Try to find a json property as JsonFormsPrincipalUser following the 'propertyPath' passed.
//  *
//  * @param jsonFormsValue JsonFormsValue
//  * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
//  * @return the property value if exists.
//  */
// public static Optional<JsonFormsPrincipalUser> findJsonFormsPropertyAsJsonFormsPrincipalUser(
//   JsonFormsValue jsonFormsValue,
//   String propertyPath
// ) {
//   return findJsonFormsProperty(jsonFormsValue, propertyPath).flatMap(value -> JsonFormsPrincipalUser.from(value.toString()));
// }
//
// /**
//  * Get a json property as List following the 'propertyPath' passed.
//  *
//  * @param jsonFormsValue JsonFormsValue
//  * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
//  * @return the property value if exists.
//  * @throws Error If property value doesn't exist or is not a List
//  */
// public static List<Object> getJsonFormsPropertyAsList(jsonFormsValue: JsonFormsValue, propertyPath: string) {
//   return findJsonFormsPropertyAsList(jsonFormsValue, propertyPath)
//     .orElseThrow(() -> new Error("Property value doesn't exist"));
// }
//
// /**
//  * Try to find a json property as List following the 'propertyPath' passed.
//  *
//  * @param jsonFormsValue JsonFormsValue
//  * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
//  * @return the property value if exists.
//  */
// @SuppressWarnings("unchecked")
// public static Optional<List<Object>> findJsonFormsPropertyAsList(jsonFormsValue: JsonFormsValue, propertyPath: string) {
//   return findJsonFormsProperty(jsonFormsValue, propertyPath)
//     .map(value -> {
//       if (value instanceof List) {
//         return unmodifiableList((List<Object>) value);
//       }
//
//       throw new Error("Property value is not a list");
//     });
// }
//
// /**
//  * Get a json property as Map following the 'propertyPath' passed.
//  *
//  * @param jsonFormsValue JsonFormsValue
//  * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
//  * @return the property value if exists.
//  * @throws Error If property value doesn't exist or is not a List
//  */
// public static Map<String, Object> getJsonFormsPropertyAsMap(jsonFormsValue: JsonFormsValue, propertyPath: string) {
//   return findJsonFormsPropertyAsMap(jsonFormsValue, propertyPath)
//     .orElseThrow(() -> new Error("Property value doesn't exist"));
// }
//
// /**
//  * Try to find a json property as Map following the 'propertyPath' passed.
//  *
//  * @param jsonFormsValue JsonFormsValue
//  * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
//  * @return the property value if exists.
//  */
// @SuppressWarnings("unchecked")
// public static Optional<Map<String, Object>> findJsonFormsPropertyAsMap(jsonFormsValue: JsonFormsValue, propertyPath: string) {
//   return findJsonFormsProperty(jsonFormsValue, propertyPath)
//     .map(value -> {
//       if (value instanceof Map) {
//         return unmodifiableMap((Map<String, Object>) value);
//       }
//
//       throw new Error("Property value is not a map");
//     });
// }
//
// /**
//  * Get a json property following the 'propertyPath' passed.
//  *
//  * @param jsonFormsValue JsonFormsValue
//  * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
//  * @return the property value if exists.
//  * @throws Error If property value doesn't exist
//  */
// public static Object getJsonFormsProperty(jsonFormsValue: JsonFormsValue, propertyPath: string) {
//   return findJsonFormsProperty(jsonFormsValue, propertyPath)
//     .orElseThrow(() -> new Error("Property value doesn't exist"));
// }

/**
 * Try to find a json property following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @return the property value if exists.
 */

function findJsonFormsPropertyValue(
  jsonFormsValue: JsonFormsValue,
  propertyPath: string,
): JsonFormsValueType | undefined {
  return findJsonFormsProperty(jsonFormsValue, propertyPath, false)?.value
}

/**
 * Update a json forms data property in the task passed following the 'propertyPath'.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param value Value to update
 * @throws com.kuflow.rest.Error If property parent path doesn't exist
 */
export function updateJsonFormsProperty(
  jsonFormsValue: JsonFormsValue,
  propertyPath: string,
  value: JsonFormsValueType,
): void {
  if (jsonFormsValue.data == null) {
    jsonFormsValue.data = {}
  }

  const property = findJsonFormsProperty(jsonFormsValue, propertyPath, true)
  if (property == null) {
    throw new Error(`Property ${propertyPath} doesn't exist`)
  }

  if (isJsonFormsPrincipalUserObject(value)) {
    value = generateValueForJsonFormsPrincipalUser(value)
  } else if (isJsonFormsFileObject(value)) {
    value = generateValueForJsonFormsFile(value)
  }

  const jsonFormsPropertyContainer = property.container
  const jsonFormsPropertyPath = property.path
  if (isJsonFormsTypeContainerArray(jsonFormsPropertyContainer)) {
    if (!Number.isInteger(jsonFormsPropertyPath)) {
      throw new Error(`Incorrect property path ${jsonFormsPropertyPath}, parent path is not a List`)
    }

    const jsonFormsPropertyPathIndex = parseInt(jsonFormsPropertyPath)
    jsonFormsPropertyContainer[jsonFormsPropertyPathIndex] = value
  } else if (isJsonFormsTypeContainerRecord(jsonFormsPropertyContainer)) {
    jsonFormsPropertyContainer[propertyPath] = value
  } else {
    throw new Error(`Incorrect property path ${jsonFormsPropertyPath}`)
  }
}

/**
 * Try to find a json property following the 'propertyPath' passed.
 *
 * @param jsonFormsValue JsonFormsValue
 * @param propertyPath Property path to find. ie: "user.name" or "users.0.name"
 * @param createMissingParents If true, missing parents paths will be created
 * @return the property if exists.
 */
export function findJsonFormsProperty(
  jsonFormsValue: JsonFormsValue,
  propertyPath: string,
  createMissingParents: boolean = true,
): JsonFormsProperty | undefined {
  const dataCurrent = getJsonFormsValueData(jsonFormsValue, createMissingParents)
  if (dataCurrent == null) {
    return undefined
  }

  let jsonFormsPropertyContainer: JsonFormsValueTypeContainer = dataCurrent
  let jsonFormsPropertyPath = ''
  let jsonFormsPropertyValue: JsonFormsValueType | undefined

  const paths = propertyPath.split('\\.')
  for (let i = 0; i < paths.length; i++) {
    jsonFormsPropertyPath = paths[i]
    if (jsonFormsPropertyPath === '') {
      continue
    }

    let jsonFormsPropertyPathAsInteger = -1

    if (isJsonFormsTypeContainerArray(jsonFormsPropertyContainer)) {
      if (!Number.isInteger(jsonFormsPropertyPath)) {
        throw new Error(`Wrong list index ${jsonFormsPropertyPath}`)
      }

      jsonFormsPropertyPathAsInteger = parseInt(jsonFormsPropertyPath)
      if (jsonFormsPropertyPathAsInteger < 0) {
        throw new Error(`Wrong list index ${jsonFormsPropertyPath}`)
      }

      if (jsonFormsPropertyPathAsInteger > jsonFormsPropertyContainer.length) {
        if (!createMissingParents) {
          return undefined
        }
      }

      jsonFormsPropertyValue = jsonFormsPropertyContainer[jsonFormsPropertyPathAsInteger]
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
        if (Number.isInteger(pathNext)) {
          jsonFormsPropertyValue = {}
        } else {
          jsonFormsPropertyValue = {}
        }
      }

      if (isJsonFormsTypeContainerArray(jsonFormsPropertyContainer)) {
        jsonFormsPropertyContainer[jsonFormsPropertyPathAsInteger] = jsonFormsPropertyValue
      } else if (isJsonFormsTypeContainerRecord(jsonFormsPropertyContainer)) {
        jsonFormsPropertyContainer[jsonFormsPropertyPath] = jsonFormsPropertyValue
      }
    }

    if (i + 1 < paths.length && isJsonFormsTypeContainer(jsonFormsPropertyValue)) {
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

// export function parseJsonFormsFile(value: string): JsonFormsFile {}

export function generateValueForJsonFormsPrincipalUser(principalUser: JsonFormsPrincipalUser): string {
  const { id, type, name } = principalUser

  return `kuflow-principal-user:id=${id};type=${type};name=${name};`
}

export function generateValueForJsonFormsFile(file: JsonFormsFile): string {
  const { uri, type, name, size } = file

  return `kuflow-file:uri=${uri};type=${type};size=${size};name=${name};`
}

export function isJsonFormsFile(value: unknown): boolean {
  if (value == null) {
    return false
  }

  if (typeof value !== 'string') {
    return false
  }

  if (!value.startsWith('kuflow-file:')) {
    return false
  }

  const matches = value.match(/(.*)=(.*);/g)
  if (matches == null) {
    return false
  }

  return false
}

function isJsonFormsPrincipalUserObject(value: unknown): value is JsonFormsPrincipalUser {
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

function isJsonFormsTypeContainer(value: JsonFormsValueType): value is JsonFormsValueTypeContainer {
  return isJsonFormsTypeContainerRecord(value) || isJsonFormsTypeContainerArray(value)
}

function isJsonFormsTypeContainerRecord(value: JsonFormsValueType): value is JsonFormsValueTypeContainerRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)
}

function isJsonFormsTypeContainerArray(value: JsonFormsValueType): value is JsonFormsValueTypeContainerArray {
  return Array.isArray(value)
}

function getJsonFormsValueData(
  jsonFormsValue: JsonFormsValue,
  createMissingParents: boolean,
): JsonFormsValueTypeContainer | undefined {
  if (jsonFormsValue.data == null) {
    if (!createMissingParents) {
      return undefined
    }

    jsonFormsValue.data = {}
  }

  return jsonFormsValue.data
}
