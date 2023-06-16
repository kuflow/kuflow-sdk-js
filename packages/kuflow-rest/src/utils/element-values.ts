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
  type Process,
  type ProcessElementValueUnion,
  type ProcessPageItem,
  type Task,
  type TaskElementValueDocument,
  type TaskElementValueDocumentItem,
  type TaskElementValuePrincipal,
  type TaskElementValuePrincipalItem,
  type TaskElementValueUnion,
  type TaskPageItem,
  type TaskSaveElementCommand,
} from '../generated'

interface ElementValuesSingleCodeProcessLike {
  elementDefinitionCode: string
  elementValues?: ProcessElementValueUnion[]
}

interface ElementValuesSingleCodeTaskLike {
  elementDefinitionCode: string
  elementValues?: TaskElementValueUnion[]
}

export type ElementValuesManyCodeModels = Process | ProcessPageItem | Task | TaskPageItem
export type ElementValuesSingleCodeModels = ElementValuesSingleCodeProcessLike | ElementValuesSingleCodeTaskLike

export type KuFlowObject = Record<string, any>

/**
 * Check if all related valid values are TRUE
 *
 * @param model Model related
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(model: ElementValuesSingleCodeModels): boolean

/**
 * Check if all related valid values are TRUE
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(model: ElementValuesManyCodeModels, elementDefinitionCode: string): boolean

/**
 * Check if all related valid values are TRUE
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(
  model: ElementValuesManyCodeModels | ElementValuesSingleCodeModels,
  elementDefinitionCode?: string,
): boolean {
  return _getElementValues(model, elementDefinitionCode).every(elementValue => elementValue.valid)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param model Model related
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(model: ElementValuesSingleCodeModels, index: number): boolean | undefined

/**
 * Check if all related valid values are TRUE
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
  index: number,
): boolean | undefined

/**
 * Check if all related valid values are TRUE
 *
 * @param model Model related
 * @param indexOrElementDefinitionCode Index o Element Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(
  model: ElementValuesManyCodeModels | ElementValuesSingleCodeModels,
  indexOrElementDefinitionCode: string | number,
  index?: number,
): boolean | undefined {
  if (arguments.length === 2) {
    assertIsNumber(indexOrElementDefinitionCode)

    return _getElementValueValidAt(model, { index: indexOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(indexOrElementDefinitionCode)
    assertIsNumber(index)

    return _getElementValueValidAt(model, { elementDefinitionCode: indexOrElementDefinitionCode, index })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Set valid to all values
 *
 * @param model Model related
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid<T extends ElementValuesSingleCodeModels>(model: T, valid: boolean | undefined): T

/**
 * Set valid to all values
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  valid: boolean | undefined,
): T

/**
 * Set valid to all values
 *
 * @param model Model related
 * @param validOrElementDefinitionCode Element Definition Code or index
 * @param valid Valid value
 * @return the passed Model related object.
 */
export function setElementValueValid<T extends ElementValuesManyCodeModels | ElementValuesSingleCodeModels>(
  model: T,
  validOrElementDefinitionCode: string | boolean | undefined,
  valid?: boolean | undefined,
): T {
  if (arguments.length === 2) {
    assertIsBooleanOrUndefined(validOrElementDefinitionCode)

    return _setElementValueValid(model, { valid: validOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(validOrElementDefinitionCode)

    return _setElementValueValid(model, { elementDefinitionCode: validOrElementDefinitionCode, valid })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Set valid to the selected value
 *
 * @param model Model related
 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt<T extends ElementValuesSingleCodeModels>(
  model: T,
  valid: boolean | undefined,
  index: number,
): T

/**
 * Set valid to the selected value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  valid: boolean | undefined,
  index: number,
): T

/**
 * Set valid to the selected value
 *
 * @param model Model related
 * @param validOrElementDefinitionCode Valid OR Element Definition Code
 * @param indexOrValid Index Or Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt<T extends ElementValuesManyCodeModels | ElementValuesSingleCodeModels>(
  model: T,
  validOrElementDefinitionCode: boolean | undefined | string,
  indexOrValid: boolean | number | undefined,
  index?: number,
): T {
  if (arguments.length === 3) {
    assertIsBooleanOrUndefined(validOrElementDefinitionCode)
    assertIsNumber(indexOrValid)

    return _setElementValueValidAt(model, { valid: validOrElementDefinitionCode, index: indexOrValid })
  } else if (arguments.length === 4) {
    assertIsString(validOrElementDefinitionCode)
    assertIsBooleanOrUndefined(indexOrValid)
    assertIsNumber(index)

    return _setElementValueValidAt(model, {
      elementDefinitionCode: validOrElementDefinitionCode,
      valid: indexOrValid,
      index,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Get an element as String
 *
 * @param model Model related
 * @return the element value.
 */
export function getElementValueAsString(model: ElementValuesSingleCodeModels): string

/**
 * Get an element as String
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(model: ElementValuesManyCodeModels, elementDefinitionCode: string): string

/**
 * Get an element as String
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): string {
  return _getElementValueAsString(model, elementDefinitionCode)
}

/**
 * Try to get an element as String
 *
 * @param model Model related
 * @return the element value if exists.
 */
export function findElementValueAsString(model: ElementValuesSingleCodeModels): string | undefined

/**
 * Try to get an element as String
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
): string | undefined

/**
 * Try to get an element as String
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(
  model: ElementValuesManyCodeModels | ElementValuesSingleCodeModels,
  elementDefinitionCode?: string,
): string | undefined {
  return _findElementValueAsString(model, elementDefinitionCode)
}

/**
 * Get all elements as String
 *
 * @param model Model related
 * @return the elements values.
 */
export function getElementValueAsStringList(model: ElementValuesSingleCodeModels): string[]

/**
 * Get all elements as String
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(model: ElementValuesManyCodeModels, elementDefinitionCode: string): string[]

/**
 * Get all elements as String
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(
  model: ElementValuesManyCodeModels | ElementValuesSingleCodeModels,
  elementDefinitionCode?: string,
): string[] {
  return _getElementValueAsStringList(model, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: string | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValueOfElementDefinitionCode Element value Or Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the passed Model related.
 */
export function setElementValueAsString<T extends ElementValuesManyCodeModels>(
  model: T,
  elementValueOfElementDefinitionCode: string | undefined,
  elementValue?: string | undefined,
): T {
  if (arguments.length === 2) {
    return _setElementValueAsString(model, { elementValue: elementValueOfElementDefinitionCode })
  } else if (arguments.length === 3) {
    return _setElementValueAsString(model, { elementDefinitionCode: elementValueOfElementDefinitionCode, elementValue })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: string[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: string | string[] | undefined,
  elementValues?: string[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsStringArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _setElementValueAsStringList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _setElementValueAsStringList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: string | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsString<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: string | undefined,
  elementValue?: string | undefined,
): T {
  if (arguments.length === 2) {
    assertIsStringOrUndefined(elementValueOrElementDefinitionCode)

    return _addElementValueAsString(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _addElementValueAsString(model, { elementDefinitionCode: elementValueOrElementDefinitionCode, elementValue })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: string[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsStringList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: string | string[] | undefined,
  elementValues?: string[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsStringArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _addElementValueAsStringList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _addElementValueAsStringList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Get an element as Double
 *
 * @param model Model related
 * @return the element value.
 */
export function getElementValueAsNumber(model: ElementValuesSingleCodeModels): number

/**
 * Get an element as Double
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(model: ElementValuesManyCodeModels, elementDefinitionCode: string): number

/**
 * Get an element as Double
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): number {
  return _getElementValueAsNumber(model, elementDefinitionCode)
}

/**
 * Try to get an element as Double
 *
 * @param model Model related
 * @return the element value if exists.
 */
export function findElementValueAsNumber(model: ElementValuesSingleCodeModels): number | undefined

/**
 * Try to get an element as Double
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
): number | undefined

/**
 * Try to get an element as Double
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): number | undefined {
  return _findElementValueAsNumber(model, elementDefinitionCode)
}

/**
 * Get all elements as Double
 *
 * @param model Model related
 * @return the elements values.
 */
export function getElementValueAsNumberList(model: ElementValuesSingleCodeModels): number[]

/**
 * Get all elements as Double
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(model: ElementValuesManyCodeModels, elementDefinitionCode: string): number[]

/**
 * Get all elements as Double
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): number[] {
  return _getElementValueAsNumberList(model, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: number | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumber<T extends ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: string | number | undefined,
  elementValue?: number | undefined,
): T {
  if (arguments.length === 2) {
    assertIsNumberOrUndefined(elementValueOrElementDefinitionCode)

    return _setElementValueAsNumber(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _setElementValueAsNumber(model, { elementDefinitionCode: elementValueOrElementDefinitionCode, elementValue })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: number[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsNumberList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: string | number[] | undefined,
  elementValues?: number[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsNumberArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _setElementValueAsNumberList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _setElementValueAsNumberList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: number | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsNumber<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: string | number | undefined,
  elementValue?: number | undefined,
): T {
  if (arguments.length === 2) {
    assertIsNumberOrUndefined(elementValueOrElementDefinitionCode)

    return _addElementValueAsNumber(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _addElementValueAsNumber(model, { elementDefinitionCode: elementValueOrElementDefinitionCode, elementValue })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: number[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsNumberList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: string | number[] | undefined,
  elementValues?: number[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsNumberArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _addElementValueAsNumberList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _addElementValueAsNumberList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Get an element as Date
 *
 * @param model Model related
 * @return the element value.
 */
export function getElementValueAsDate(model: ElementValuesSingleCodeModels): Date

/**
 * Get an element as Date
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(model: ElementValuesManyCodeModels, elementDefinitionCode: string): Date

/**
 * Get an element as Date
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): Date {
  return _getElementValueAsDate(model, elementDefinitionCode)
}

/**
 * Try to get an element as Date
 *
 * @param model Model related
 * @return the element value if exists.
 */
export function findElementValueAsDate(model: ElementValuesSingleCodeModels): Date | undefined

/**
 * Try to get an element as Date
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
): Date | undefined

/**
 * Try to get an element as Date
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): Date | undefined {
  return _findElementValueAsDate(model, elementDefinitionCode)
}

/**
 * Get all elements as Date
 *
 * @param model Model related
 * @return the elements values.
 */
export function getElementValueAsDateList(model: ElementValuesSingleCodeModels): Date[]

/**
 * Get all elements as Date
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(model: ElementValuesManyCodeModels, elementDefinitionCode: string): Date[]

/**
 * Get all elements as Date
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): Date[] {
  return _getElementValueAsDateList(model, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: Date | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDate<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: string | Date | undefined,
  elementValue?: Date | undefined,
): T {
  if (arguments.length === 2) {
    assertIsDateOrUndefined(elementValueOrElementDefinitionCode)

    return _setElementValueAsDate(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _setElementValueAsDate(model, { elementDefinitionCode: elementValueOrElementDefinitionCode, elementValue })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: Date[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsDateList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: Date[] | undefined | string,
  elementValues?: Date[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsDateArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _setElementValueAsDateList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _setElementValueAsDateList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: Date | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element Value OR Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsDate<T extends ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: Date | undefined | string,
  elementValue?: Date | undefined,
): T {
  if (arguments.length === 2) {
    assertIsDateOrUndefined(elementValueOrElementDefinitionCode)

    return _addElementValueAsDate(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _addElementValueAsDate(model, { elementDefinitionCode: elementValueOrElementDefinitionCode, elementValue })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: Date[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element Values OR Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsDateList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: Date[] | undefined | string,
  elementValues?: Date[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsDateArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _addElementValueAsDateList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _addElementValueAsDateList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Get an element as Object
 *
 * @param model Model related
 * @return the element value.
 */
export function getElementValueAsObject(model: ElementValuesSingleCodeModels): KuFlowObject

/**
 * Get an element as Object
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsObject(model: ElementValuesManyCodeModels, elementDefinitionCode: string): KuFlowObject

/**
 * Get an element as Object
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsObject(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): KuFlowObject {
  return _getElementValueAsObject(model, elementDefinitionCode)
}

/**
 * Try to get an element as Object
 *
 * @param model Model related
 * @return the element value if exists.
 */
export function findElementValueAsObject(model: ElementValuesSingleCodeModels): KuFlowObject | undefined

/**
 * Try to get an element as Object
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsObject(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
): KuFlowObject | undefined

/**
 * Try to get an element as Object
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsObject(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): KuFlowObject | undefined {
  return _findElementValueAsObject(model, elementDefinitionCode)
}

/**
 * Get all elements as Object
 *
 * @param model Model related
 * @return the elements values.
 */
export function getElementValueAsObjectList(model: ElementValuesSingleCodeModels): KuFlowObject[]

/**
 * Get all elements as Object
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsObjectList(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
): KuFlowObject[]

/**
 * Get all elements as Object
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsObjectList(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): KuFlowObject[] {
  return _getElementValueAsObjectList(model, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObject<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: KuFlowObject | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObject<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObject<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: KuFlowObject | undefined | string,
  elementValue?: KuFlowObject | undefined,
): T {
  if (arguments.length === 2) {
    assertIsKuFlowObjectOrUndefined(elementValueOrElementDefinitionCode)

    return _setElementValueAsObject(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _setElementValueAsObject(model, { elementDefinitionCode: elementValueOrElementDefinitionCode, elementValue })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObjectList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: KuFlowObject[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObjectList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model related passed.
 */
export function setElementValueAsObjectList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: KuFlowObject[] | undefined | string,
  elementValues?: KuFlowObject[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsKuFlowObjectArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _setElementValueAsObjectList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _setElementValueAsObjectList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsObject<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: KuFlowObject | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsObject<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the Model related passed.
 */
export function addElementValueAsObject<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: KuFlowObject | undefined | string,
  elementValue?: KuFlowObject | undefined,
): T {
  if (arguments.length === 2) {
    assertIsKuFlowObjectOrUndefined(elementValueOrElementDefinitionCode)

    return _addElementValueAsObject(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _addElementValueAsObject(model, { elementDefinitionCode: elementValueOrElementDefinitionCode, elementValue })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsObjectList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: KuFlowObject[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsObjectList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values
 * @return the Model related passed.
 */
export function addElementValueAsObjectList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: KuFlowObject[] | undefined | string,
  elementValues?: KuFlowObject[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsKuFlowObjectArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _addElementValueAsObjectList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _addElementValueAsObjectList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Get an element as Document
 *
 * @param model Related model
 * @return the element value.
 */
export function getElementValueAsDocument(model: ElementValuesSingleCodeModels): TaskElementValueDocumentItem

/**
 * Get an element as Document
 *
 * @param model Related model
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDocument(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem

/**
 * Get an element as Document
 *
 * @param model Related model
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDocument(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): TaskElementValueDocumentItem {
  return _getElementValueAsDocument(model, elementDefinitionCode)
}

/**
 * Try to get an element as Document
 *
 * @param model Model related
 * @return the element value if exists.
 */
export function findElementValueAsDocument(
  model: ElementValuesSingleCodeModels,
): TaskElementValueDocumentItem | undefined

/**
 * Try to get an element as Document
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDocument(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem | undefined

/**
 * Try to get an element as Document
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDocument(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): TaskElementValueDocumentItem | undefined {
  return _findElementValueAsDocument(model, elementDefinitionCode)
}

/**
 * Get all elements as Document
 *
 * @param model Model related
 * @return the elements values.
 */
export function getElementValueAsDocumentList(model: ElementValuesSingleCodeModels): TaskElementValueDocumentItem[]

/**
 * Get all elements as Document
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDocumentList(
  model: ElementValuesManyCodeModels,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem[]

/**
 * Get all elements as Document
 *
 * @param model Related model
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDocumentList(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): TaskElementValueDocumentItem[] {
  return _getElementValueAsDocumentList(model, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param model Related model
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocument<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: TaskElementValueDocumentItem | undefined,
): T

/**
 * Set an element value
 *
 * @param model Related model
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocument<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: TaskElementValueDocumentItem | undefined,
): T

/**
 * Set an element value
 *
 * @param model Related model
 * @param elementValueOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocument<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: TaskElementValueDocumentItem | undefined | string,
  elementValue?: TaskElementValueDocumentItem | undefined,
): T {
  if (arguments.length === 2) {
    assertIsTaskElementValueDocumentItemOrUndefined(elementValueOrElementDefinitionCode)

    return _setElementValueAsDocument(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _setElementValueAsDocument(model, {
      elementDefinitionCode: elementValueOrElementDefinitionCode,
      elementValue,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocumentList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocumentList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsDocumentList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: TaskElementValueDocumentItem[] | undefined | string,
  elementValues?: TaskElementValueDocumentItem[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsTaskElementValueDocumentItemArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _setElementValueAsDocumentList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _setElementValueAsDocumentList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsDocument<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValue: TaskElementValueDocumentItem | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsDocument<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValue: TaskElementValueDocumentItem | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsDocument<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValueOrElementDefinitionCode: TaskElementValueDocumentItem | undefined | string,
  elementValue?: TaskElementValueDocumentItem | undefined,
): T {
  if (arguments.length === 2) {
    assertIsTaskElementValueDocumentItemOrUndefined(elementValueOrElementDefinitionCode)

    return _addElementValueAsDocument(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _addElementValueAsDocument(model, {
      elementDefinitionCode: elementValueOrElementDefinitionCode,
      elementValue,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsDocumentList<T extends ElementValuesSingleCodeModels>(
  model: T,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsDocumentList<T extends ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Task
 * @param elementValuesOrElementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsDocumentList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementValuesOrElementDefinitionCode: TaskElementValueDocumentItem[] | undefined | string,
  elementValues?: TaskElementValueDocumentItem[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsTaskElementValueDocumentItemArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _addElementValueAsDocumentList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _addElementValueAsDocumentList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Get an element as Principal
 *
 * @param model Model related
 * @return the element value.
 * @throws Error If element value doesn't exists
 */
export function getElementValueAsPrincipal(model: TaskSaveElementCommand): TaskElementValuePrincipalItem

/**
 * Get an element as Principal
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 * @throws Error If element value doesn't exists
 */
export function getElementValueAsPrincipal(
  model: Task | TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem

/**
 * Get an element as Principal
 *
 * @param model Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 * @throws Error If element value doesn't exists
 */
export function getElementValueAsPrincipal(
  model: TaskSaveElementCommand | Task | TaskPageItem,
  elementDefinitionCode?: string,
): TaskElementValuePrincipalItem {
  return _getElementValueAsPrincipal(model, elementDefinitionCode)
}

/**
 * Try to get an element as Principal
 *
 * @param model Model related
 * @return the element value if exists.
 */
export function findElementValueAsPrincipal(model: TaskSaveElementCommand): TaskElementValuePrincipalItem | undefined

/**
 * Try to get an element as Principal
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsPrincipal(
  model: Task | TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem | undefined

/**
 * Try to get an element as Principal
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsPrincipal(
  model: TaskSaveElementCommand | Task | TaskPageItem,
  elementDefinitionCode?: string,
): TaskElementValuePrincipalItem | undefined {
  return _findElementValueAsPrincipal(model, elementDefinitionCode)
}

/**
 * Get all elements as Principal
 *
 * @param model Model related
 * @return the elements values.
 */
export function getElementValueAsPrincipalList(model: TaskSaveElementCommand): TaskElementValuePrincipalItem[]

/**
 * Get all elements as Principal
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsPrincipalList(
  model: Task | TaskPageItem,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem[]

/**
 * Get all elements as Principal
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsPrincipalList(
  model: TaskSaveElementCommand | Task | TaskPageItem,
  elementDefinitionCode?: string,
): TaskElementValuePrincipalItem[] {
  return _getElementValueAsPrincipalList(model, elementDefinitionCode)
}

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsPrincipal<T extends TaskSaveElementCommand>(
  model: T,
  elementValue: TaskElementValuePrincipalItem | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsPrincipal<T extends Task | TaskPageItem>(
  model: T,
  elementDefinitionCode: string,
  elementValue: TaskElementValuePrincipalItem | undefined,
): T

/**
 * Set an element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValue Element value, if the value is undefined all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsPrincipal<T extends TaskSaveElementCommand | Task | TaskPageItem>(
  model: T,
  elementValueOrElementDefinitionCode: TaskElementValuePrincipalItem | undefined | string,
  elementValue?: TaskElementValuePrincipalItem | undefined,
): T {
  if (arguments.length === 2) {
    assertIsTaskElementValuePrincipalItemOrUndefined(elementValueOrElementDefinitionCode)

    return _setElementValueAsPrincipal(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _setElementValueAsPrincipal(model, {
      elementDefinitionCode: elementValueOrElementDefinitionCode,
      elementValue,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsPrincipalList<T extends TaskSaveElementCommand>(
  model: T,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsPrincipalList<T extends Task | TaskPageItem>(
  model: T,
  elementDefinitionCode: string,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): T

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element values OR Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the model passed.
 */
export function setElementValueAsPrincipalList<T extends TaskSaveElementCommand | Task | TaskPageItem>(
  model: T,
  elementValuesOrElementDefinitionCode: TaskElementValuePrincipalItem[] | undefined | string,
  elementValues?: TaskElementValuePrincipalItem[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsTaskElementValuePrincipalItemArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _setElementValueAsPrincipalList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _setElementValueAsPrincipalList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsPrincipal<T extends TaskSaveElementCommand>(
  model: T,
  elementValue: TaskElementValuePrincipalItem | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsPrincipal<T extends Task | TaskPageItem>(
  model: T,
  elementDefinitionCode: string,
  elementValue: TaskElementValuePrincipalItem | undefined,
): T

/**
 * Add a new element value
 *
 * @param model Model related
 * @param elementValueOrElementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is undefined the value is not added
 * @return the model passed.
 */
export function addElementValueAsPrincipal<T extends TaskSaveElementCommand | Task | TaskPageItem>(
  model: T,
  elementValueOrElementDefinitionCode: TaskElementValuePrincipalItem | undefined | string,
  elementValue?: TaskElementValuePrincipalItem | undefined,
): T {
  if (arguments.length === 2) {
    assertIsTaskElementValuePrincipalItemOrUndefined(elementValueOrElementDefinitionCode)

    return _addElementValueAsPrincipal(model, { elementValue: elementValueOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValueOrElementDefinitionCode)

    return _addElementValueAsPrincipal(model, {
      elementDefinitionCode: elementValueOrElementDefinitionCode,
      elementValue,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsPrincipalList<T extends TaskSaveElementCommand>(
  model: T,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsPrincipalList<T extends Task | TaskPageItem>(
  model: T,
  elementDefinitionCode: string,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): T

/**
 * Add all element values passed
 *
 * @param model Model related
 * @param elementValuesOrElementDefinitionCode Element value OR Element Definition Code
 * @param elementValues Element values
 * @return the model passed.
 */
export function addElementValueAsPrincipalList<T extends TaskSaveElementCommand | Task | TaskPageItem>(
  model: T,
  elementValuesOrElementDefinitionCode: TaskElementValuePrincipalItem[] | undefined | string,
  elementValues?: TaskElementValuePrincipalItem[] | undefined,
): T {
  if (arguments.length === 2) {
    assertIsTaskElementValuePrincipalItemArrayOrUndefined(elementValuesOrElementDefinitionCode)

    return _addElementValueAsPrincipalList(model, { elementValues: elementValuesOrElementDefinitionCode })
  } else if (arguments.length === 3) {
    assertIsString(elementValuesOrElementDefinitionCode)

    return _addElementValueAsPrincipalList(model, {
      elementDefinitionCode: elementValuesOrElementDefinitionCode,
      elementValues,
    })
  } else {
    throw new Error('Wrong method signature')
  }
}

function _addElementValue<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string | undefined,
  elementValues: ProcessElementValueUnion[] | TaskElementValueUnion[] | undefined,
): T {
  const elementValuesCurrent = _getElementValues(model, elementDefinitionCode)

  return _setElementValue(model, elementDefinitionCode, [...elementValuesCurrent, ...(elementValues ?? [])])
}

function _setElementValue<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  elementDefinitionCode: string | undefined,
  elementValues: ProcessElementValueUnion[] | TaskElementValueUnion[] | undefined,
): T {
  if (elementValues == null || elementValues.length === 0) {
    if (model.elementValues != null) {
      if (isNotNullOrUndefined(elementDefinitionCode) && !Array.isArray(model.elementValues)) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete model.elementValues[elementDefinitionCode]
      } else if (isNullOrUndefined(elementDefinitionCode) && Array.isArray(model.elementValues)) {
        model.elementValues = undefined
      }
    }
  } else {
    if (isNotNullOrUndefined(elementDefinitionCode)) {
      model.elementValues = {
        ...model.elementValues,
        [elementDefinitionCode]: [...elementValues],
      }
    } else if (isNullOrUndefined(elementDefinitionCode)) {
      model.elementValues = [...elementValues]
    }
  }

  return model
}

interface GetElementValueValidAtOptions {
  elementDefinitionCode?: string | undefined
  index: number
}

function _getElementValueValidAt(
  model: ElementValuesManyCodeModels | ElementValuesSingleCodeModels,
  options: GetElementValueValidAtOptions,
): boolean | undefined {
  const elementValues = _getElementValues(model, options.elementDefinitionCode)
  if (elementValues[options.index] == null) {
    throw new Error(`Index ${options.index} not found`)
  }
  return elementValues[options.index].valid
}

interface SetElementValueValidOptions {
  elementDefinitionCode?: string | undefined
  valid: boolean | undefined
}
function _setElementValueValid<T extends ElementValuesManyCodeModels | ElementValuesSingleCodeModels>(
  model: T,
  options: SetElementValueValidOptions,
): T {
  const elementValues = _getElementValues(model, options.elementDefinitionCode)
  elementValues.forEach(elementValue => {
    elementValue.valid = options.valid
  })

  return model
}

interface SetElementValueValidAtOptions {
  elementDefinitionCode?: string
  valid: boolean | undefined
  index: number
}
function _setElementValueValidAt<T extends ElementValuesManyCodeModels | ElementValuesSingleCodeModels>(
  model: T,
  options: SetElementValueValidAtOptions,
): T {
  const elementValues = _getElementValues(model, options.elementDefinitionCode)
  if (elementValues[options.index] != null) {
    elementValues[options.index].valid = options.valid
  }

  return model
}

function _getElementValueAsString(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): string {
  let elementValue: string | undefined
  if (elementDefinitionCode == null) {
    assertIsElementValuesSingleCodeModels(model)

    elementValue = _findElementValueAsString(model)
  } else {
    assertIsElementValuesManyCodeModels(model)

    elementValue = _findElementValueAsString(model, elementDefinitionCode)
  }

  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

function _findElementValueAsString(
  model: ElementValuesManyCodeModels | ElementValuesSingleCodeModels,
  elementDefinitionCode?: string,
): string | undefined {
  const [elementValue] = _getElementValueAsStringList(model, elementDefinitionCode)

  return elementValue
}

function _getElementValueAsStringList(
  model: ElementValuesManyCodeModels | ElementValuesSingleCodeModels,
  elementDefinitionCode?: string,
): string[] {
  return _getElementValues(model, elementDefinitionCode)
    .filter(elementValue => elementValue.type === 'STRING' || elementValue.type === 'NUMBER')
    .filter(elementValue => elementValue.value != null)
    .map(elementValue => elementValue.value?.toString() ?? '')
}

interface SetElementValueAsStringListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: string[] | undefined
}

function _setElementValueAsStringList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsStringListOptions,
): T {
  return _setElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(value => ({
      type: 'STRING',
      value,
    })),
  )
}

interface SetElementValueAsStringOptions {
  elementDefinitionCode?: string | undefined
  elementValue: string | undefined
}

function _setElementValueAsString<T extends ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsStringOptions,
): T {
  return _setElementValueAsStringList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface AddElementValueAsString {
  elementDefinitionCode?: string | undefined
  elementValue: string | undefined
}

function _addElementValueAsString<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsString,
): T {
  return _addElementValueAsStringList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface AddElementValueAsStringListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: string[] | undefined
}

function _addElementValueAsStringList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsStringListOptions,
): T {
  return _addElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValues => ({
      type: 'STRING',
      value: elementValues,
    })),
  )
}

function _findElementValueAsNumber(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): number | undefined {
  const [elementValue] = _getElementValueAsNumberList(model, elementDefinitionCode)

  return elementValue
}

function _getElementValueAsNumber(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): number {
  const elementValue = _findElementValueAsNumber(model, elementDefinitionCode)

  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

function _getElementValueAsNumberList(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): number[] {
  return _getElementValues(model, elementDefinitionCode)
    .filter(elementValue => elementValue.type === 'STRING' || elementValue.type === 'NUMBER')
    .filter(elementValue => elementValue.value != null)
    .map(elementValue => parseFloat(elementValue.value?.toString() ?? '0'))
}

interface SetElementValueAsNumberOptions {
  elementDefinitionCode?: string | undefined
  elementValue: number | undefined
}

function _setElementValueAsNumber<T extends ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsNumberOptions,
): T {
  return _setElementValueAsNumberList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface SetElementValueAsNumberListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: number[] | undefined
}

function _setElementValueAsNumberList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsNumberListOptions,
): T {
  return _setElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'NUMBER',
      value: elementValue,
    })),
  )
}

interface AddElementValueAsNumber {
  elementDefinitionCode?: string | undefined
  elementValue: number | undefined
}

function _addElementValueAsNumber<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsNumber,
): T {
  return _addElementValueAsNumberList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface AddElementValueAsNumberList {
  elementDefinitionCode?: string | undefined
  elementValues: number[] | undefined
}

function _addElementValueAsNumberList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsNumberList,
): T {
  return _addElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'NUMBER',
      value: elementValue,
    })),
  )
}

function _getElementValueAsDate(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): Date {
  const elementValue = _findElementValueAsDate(model, elementDefinitionCode)

  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

function _findElementValueAsDate(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): Date | undefined {
  const [elementValue] = _getElementValueAsDateList(model, elementDefinitionCode)

  return elementValue
}

function _getElementValueAsDateList(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): Date[] {
  return _getElementValues(model, elementDefinitionCode)
    .filter(elementValue => elementValue.type === 'STRING')
    .filter(elementValue => elementValue.value != null)
    .map(elementValue => new Date(elementValue.value?.toString() ?? ''))
}

interface SetElementValueAsDateOptions {
  elementDefinitionCode?: string | undefined
  elementValue: Date | undefined
}

function _setElementValueAsDate<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsDateOptions,
): T {
  return _setElementValueAsDateList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface SetElementValueAsDateListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: Date[] | undefined
}
function _setElementValueAsDateList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsDateListOptions,
): T {
  return _setElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'STRING',
      value: elementValue.toISOString().replace(/T.*/, ''),
    })),
  )
}

interface AddElementValueAsDateOptions {
  elementDefinitionCode?: string | undefined
  elementValue: Date | undefined
}

function _addElementValueAsDate<T extends ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsDateOptions,
): T {
  return _addElementValueAsDateList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface AddElementValueAsDateListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: Date[] | undefined
}

function _addElementValueAsDateList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsDateListOptions,
): T {
  return _addElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'STRING',
      value: elementValue.toISOString().replace(/T.*/, ''),
    })),
  )
}

function _getElementValueAsObject(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): KuFlowObject {
  const elementValue = _findElementValueAsObject(model, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

function _findElementValueAsObject(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): KuFlowObject | undefined {
  const [elementValue] = _getElementValueAsObjectList(model, elementDefinitionCode)

  return elementValue
}

function _getElementValueAsObjectList(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): KuFlowObject[] {
  return _getElementValues(model, elementDefinitionCode)
    .filter(elementValue => elementValue.type === 'OBJECT')
    .filter(elementValue => elementValue.value !== null)
    .map(elementValue => elementValue.value as KuFlowObject)
}

interface SetElementValueAsObjectOptions {
  elementDefinitionCode?: string | undefined
  elementValue: KuFlowObject | undefined
}

function _setElementValueAsObject<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsObjectOptions,
): T {
  return _setElementValueAsObjectList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface SetElementValueAsObjectListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: KuFlowObject[] | undefined
}

function _setElementValueAsObjectList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsObjectListOptions,
): T {
  return _setElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'OBJECT',
      value: elementValue,
    })),
  )
}

interface AddElementValueAsObjectOptions {
  elementDefinitionCode?: string | undefined
  elementValue: KuFlowObject | undefined
}

function _addElementValueAsObject<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsObjectOptions,
): T {
  return _addElementValueAsObjectList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface AddElementValueAsObjectListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: KuFlowObject[] | undefined
}

function _addElementValueAsObjectList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsObjectListOptions,
): T {
  return _addElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'OBJECT',
      value: elementValue,
    })),
  )
}

function _getElementValueAsDocument(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): TaskElementValueDocumentItem {
  const elementValue = _findElementValueAsDocument(model, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

function _findElementValueAsDocument(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): TaskElementValueDocumentItem | undefined {
  const [elementValue] = _getElementValueAsDocumentList(model, elementDefinitionCode)

  return elementValue
}

function _getElementValueAsDocumentList(
  model: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
  elementDefinitionCode?: string,
): TaskElementValueDocumentItem[] {
  const elementValues = _getElementValues(model, elementDefinitionCode).filter(isDocument)

  return elementValues.map(elementValue => elementValue.value).filter(isNotNullOrUndefined)
}

interface SetElementValueAsDocumentOptions {
  elementDefinitionCode?: string | undefined
  elementValue: TaskElementValueDocumentItem | undefined
}

function _setElementValueAsDocument<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsDocumentOptions,
): T {
  return _setElementValueAsDocumentList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface SetElementValueAsDocumentListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: TaskElementValueDocumentItem[] | undefined
}

function _setElementValueAsDocumentList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: SetElementValueAsDocumentListOptions,
): T {
  return _setElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'DOCUMENT',
      value: elementValue,
    })),
  )
}

interface AddElementValueAsDocumentOptions {
  elementDefinitionCode?: string | undefined
  elementValue: TaskElementValueDocumentItem | undefined
}

function _addElementValueAsDocument<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsDocumentOptions,
): T {
  return _addElementValueAsDocumentList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface AddElementValueAsDocumentListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: TaskElementValueDocumentItem[] | undefined
}

function _addElementValueAsDocumentList<T extends ElementValuesSingleCodeModels | ElementValuesManyCodeModels>(
  model: T,
  options: AddElementValueAsDocumentListOptions,
): T {
  return _addElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'DOCUMENT',
      value: elementValue,
    })),
  )
}

function _getElementValueAsPrincipal(
  model: TaskSaveElementCommand | Task | TaskPageItem,
  elementDefinitionCode?: string,
): TaskElementValuePrincipalItem {
  const elementValue = _findElementValueAsPrincipal(model, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

function _findElementValueAsPrincipal(
  model: TaskSaveElementCommand | Task | TaskPageItem,
  elementDefinitionCode?: string,
): TaskElementValuePrincipalItem | undefined {
  const [elementValue] = _getElementValueAsPrincipalList(model, elementDefinitionCode)

  return elementValue
}

function _getElementValueAsPrincipalList(
  model: TaskSaveElementCommand | Task | TaskPageItem,
  elementDefinitionCode?: string,
): TaskElementValuePrincipalItem[] {
  const elementValues = _getElementValues(model, elementDefinitionCode).filter(isPrincipal)

  return elementValues.map(elementValue => elementValue.value).filter(isNotNullOrUndefined)
}

interface SetElementValueAsPrincipalOptions {
  elementDefinitionCode?: string | undefined
  elementValue: TaskElementValuePrincipalItem | undefined
}

function _setElementValueAsPrincipal<T extends TaskSaveElementCommand | Task | TaskPageItem>(
  model: T,
  options: SetElementValueAsPrincipalOptions,
): T {
  return _setElementValueAsPrincipalList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface SetElementValueAsPrincipalListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: TaskElementValuePrincipalItem[] | undefined
}

function _setElementValueAsPrincipalList<T extends TaskSaveElementCommand | Task | TaskPageItem>(
  model: T,
  options: SetElementValueAsPrincipalListOptions,
): T {
  return _setElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'PRINCIPAL',
      value: elementValue,
    })),
  )
}

interface AddElementValueAsPrincipalOptions {
  elementDefinitionCode?: string | undefined
  elementValue: TaskElementValuePrincipalItem | undefined
}

function _addElementValueAsPrincipal<T extends TaskSaveElementCommand | Task | TaskPageItem>(
  model: T,
  options: AddElementValueAsPrincipalOptions,
): T {
  return _addElementValueAsPrincipalList(model, {
    elementDefinitionCode: options.elementDefinitionCode,
    elementValues: options.elementValue != null ? [options.elementValue] : undefined,
  })
}

interface AddElementValueAsPrincipalListOptions {
  elementDefinitionCode?: string | undefined
  elementValues: TaskElementValuePrincipalItem[] | undefined
}

function _addElementValueAsPrincipalList<T extends TaskSaveElementCommand | Task | TaskPageItem>(
  model: T,
  options: AddElementValueAsPrincipalListOptions,
): T {
  return _addElementValue(
    model,
    options.elementDefinitionCode,
    options.elementValues?.map(elementValue => ({
      type: 'PRINCIPAL',
      value: elementValue,
    })),
  )
}

function _getElementValues<T extends ElementValuesManyCodeModels | ElementValuesSingleCodeModels>(
  model: T,
  elementDefinitionCode?: string,
): Array<ProcessElementValueUnion | TaskElementValueUnion> {
  if (model.elementValues == null) {
    return []
  }
  if (Array.isArray(model.elementValues)) {
    return model.elementValues ?? []
  }

  if (elementDefinitionCode == null) {
    return []
  }

  const elementValuesByCode = model.elementValues[elementDefinitionCode]
  if (elementValuesByCode == null || elementValuesByCode.length === 0) {
    return []
  }

  return elementValuesByCode
}

function isDocument(value: TaskElementValueUnion | undefined): value is TaskElementValueDocument {
  return value?.type === 'DOCUMENT'
}

function isPrincipal(value: TaskElementValueUnion | undefined): value is TaskElementValuePrincipal {
  return value?.type === 'PRINCIPAL'
}

function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined
}

function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

function isElementValuesSingleCodeModels(
  value: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
): value is ElementValuesSingleCodeModels {
  return (value as ElementValuesSingleCodeModels).elementDefinitionCode !== null
}

function assertIsElementValuesSingleCodeModels(
  value: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
): asserts value is ElementValuesSingleCodeModels {
  if (!isElementValuesSingleCodeModels(value)) {
    throw new Error('value is not a ElementValuesSingleCodeModels!')
  }
}

function isElementValuesManyCodeModels(
  value: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
): value is ElementValuesManyCodeModels {
  return (value as ElementValuesSingleCodeModels).elementDefinitionCode == null
}
function assertIsElementValuesManyCodeModels(
  value: ElementValuesSingleCodeModels | ElementValuesManyCodeModels,
): asserts value is ElementValuesManyCodeModels {
  if (!isElementValuesManyCodeModels(value)) {
    throw new Error('value is not a ElementValuesManyCodeModels!')
  }
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('value is not a string!')
  }
}

function assertIsStringOrUndefined(value: unknown): asserts value is string | undefined {
  if (value !== undefined && typeof value !== 'string') {
    throw new Error('value is not a string!')
  }
}

function assertIsStringArrayOrUndefined(value: unknown): asserts value is string[] | undefined {
  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('value is not a string[] or undefined!')
  }
}

function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('value is not a number!')
  }
}

function assertIsDateOrUndefined(value: unknown): asserts value is Date | undefined {
  if (value !== undefined && !(value instanceof Date)) {
    throw new Error('value is not a Date or undefined!')
  }
}

function assertIsDateArrayOrUndefined(value: unknown): asserts value is Date[] | undefined {
  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('value is not a Date[] or undefined!')
  }
}

function assertIsBooleanOrUndefined(value: unknown): asserts value is boolean | undefined {
  if (value !== undefined && typeof value !== 'boolean') {
    throw new Error('value is not a boolean or undefined!')
  }
}

function assertIsNumberOrUndefined(value: unknown): asserts value is number | undefined {
  if (value !== undefined && typeof value !== 'number') {
    throw new Error('value is not a number or undefined!')
  }
}

function assertIsNumberArrayOrUndefined(value: unknown): asserts value is number[] | undefined {
  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('value is not a number or undefined!')
  }
}

function assertIsKuFlowObjectOrUndefined(value: unknown): asserts value is KuFlowObject | undefined {
  if (value !== undefined && typeof value !== 'object') {
    throw new Error('value is not a object or undefined!')
  }
}

function assertIsKuFlowObjectArrayOrUndefined(value: unknown): asserts value is KuFlowObject[] | undefined {
  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('value is not a object[] or undefined!')
  }
}

function assertIsTaskElementValueDocumentItemOrUndefined(
  value: unknown,
): asserts value is TaskElementValueDocumentItem | undefined {
  if (value !== undefined && typeof value !== 'object') {
    throw new Error('value is not a TaskElementValueDocumentItem or undefined!')
  }
}

function assertIsTaskElementValueDocumentItemArrayOrUndefined(
  value: unknown,
): asserts value is TaskElementValueDocumentItem[] | undefined {
  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('value is not a TaskElementValueDocumentItem[] or undefined!')
  }
}

function assertIsTaskElementValuePrincipalItemOrUndefined(
  value: unknown,
): asserts value is TaskElementValuePrincipalItem | undefined {
  if (value !== undefined && typeof value !== 'object') {
    throw new Error('value is not a TaskElementValueDocumentItem or undefined!')
  }
}

function assertIsTaskElementValuePrincipalItemArrayOrUndefined(
  value: unknown,
): asserts value is TaskElementValuePrincipalItem[] | undefined {
  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('value is not a TaskElementValueDocumentItem[] or undefined!')
  }
}
