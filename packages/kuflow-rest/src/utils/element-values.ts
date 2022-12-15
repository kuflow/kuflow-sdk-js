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
  Process,
  ProcessElementValueUnion,
  Task,
  TaskElementValueDocument,
  TaskElementValueDocumentItem,
  TaskElementValuePrincipal,
  TaskElementValuePrincipalItem,
  TaskElementValueUnion,
} from '../generated'

export interface KuFlowObject {
  [propertyName: string]: any
}

/**
 * Check if all related valid values are TRUE
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(process: Process, elementDefinitionCode: string): boolean

/**
 * Check if all related valid values are TRUE
 *
 * @param task Process
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(task: Task, elementDefinitionCode: string): boolean

/**
 * Check if all related valid values are TRUE
 *
 * @param model Process or task related
 * @param elementDefinitionCode Element Definition Code
 * @return TRUE if all related valid values are TRUE else FALSE.
 */
export function getElementValueValid(model: Process | Task, elementDefinitionCode: string): boolean {
  return getElementValues(model, elementDefinitionCode).some(elementValue => elementValue.valid)
}

/**
 * Check if all related valid values are TRUE
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(
  process: Process,
  elementDefinitionCode: string,
  index: number,
): boolean | undefined

/**
 * Check if all related valid values are TRUE
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(task: Task, elementDefinitionCode: string, index: number): boolean | undefined

/**
 * Check if all related valid values are TRUE
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param index Element value index
 * @return The requested valid value
 */
export function getElementValueValidAt(
  model: Process | Task,
  elementDefinitionCode: string,
  index: number,
): boolean | undefined {
  const elementValues = getElementValues(mode, elementDefinitionCode)
  if (elementValues[index] == null) {
    throw new Error(`Index ${index} not found`)
  }
  return elementValues[index].valid
}

/**
 * Set valid to all values
 *
 * @param process process
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @return the passed Process object.
 */
export function setElementValueValid(
  process: Process,
  elementDefinitionCode: string,
  valid: boolean | undefined,
): Process

/**
 * Set valid to all values
 *
 * @param task process
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @return the passed Task object.
 */
export function setElementValueValid(task: Task, elementDefinitionCode: string, valid: boolean | undefined): Task

/**
 * Set valid to all values
 *
 * @param model process or task
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @return the passed Process or Task object.
 */
export function setElementValueValid(
  model: Process | Task,
  elementDefinitionCode: string,
  valid: boolean | undefined,
): Process | Task {
  const elementValues = getElementValues(model, elementDefinitionCode)
  elementValues.forEach(elementValue => {
    elementValue.valid = valid
  })

  return model
}

/**
 * Set valid to the selected value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @param index Element value index
 * @return the passed Process object.
 */
export function setElementValueValidAt(
  process: Process,
  elementDefinitionCode: string,
  valid: boolean | undefined,
  index: number,
): Process

/**
 * Set valid to the selected value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @param index Element value index
 * @return the passed Task object.
 */
export function setElementValueValidAt(
  task: Task,
  elementDefinitionCode: string,
  valid: boolean | undefined,
  index: number,
): Task

/**
 * Set valid to the selected value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param valid Valid value
 * @param index Element value index
 * @return the passed model object.
 */
export function setElementValueValidAt(
  model: Process | Task,
  elementDefinitionCode: string,
  valid: boolean | undefined,
  index: number,
): Process | Task {
  const elementValues = getElementValues(model, elementDefinitionCode)
  if (elementValues[index] != null) {
    elementValues[index].valid = valid
  }

  return model
}

/**
 * Get an element as String
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(process: Process, elementDefinitionCode: string): string

/**
 * Get an element as String
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(task: Task, elementDefinitionCode: string): string

/**
 * Get an element as String
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsString(model: Process | Task, elementDefinitionCode: string): string {
  const elementValue = findElementValueAsString(model, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

/**
 * Try to get an element as String
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(process: Process, elementDefinitionCode: string): string | undefined

/**
 * Try to get an element as String
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(task: Task, elementDefinitionCode: string): string | undefined

/**
 * Try to get an element as String
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(model: Process | Task, elementDefinitionCode: string): string | undefined

/**
 * Try to get an element as String
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsString(model: Process | Task, elementDefinitionCode: string): string | undefined {
  const [elementValue] = getElementValueAsStringList(model, elementDefinitionCode)

  return elementValue
}

/**
 * Get all elements as String
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(process: Process, elementDefinitionCode: string): string[]

/**
 * Get all elements as String
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(task: Task, elementDefinitionCode: string): string[]

/**
 * Get all elements as String
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(model: Process | Task, elementDefinitionCode: string): string[]

/**
 * Get all elements as String
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsStringList(model: Process | Task, elementDefinitionCode: string): string[] {
  return getElementValues(model, elementDefinitionCode)
    .filter(elementValue => elementValue.type === 'STRING' || elementValue.type === 'NUMBER')
    .filter(elementValue => elementValue.value != null)
    .map(elementValue => elementValue.value?.toString() ?? '')
}

/**
 * Set an element value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Process object itself.
 */
export function setElementValueAsString(
  process: Process,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Process

/**
 * Set an element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsString(
  task: Task,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Task

/**
 * Set an element value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the passed process or task.
 */
export function setElementValueAsString(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Process | Task {
  return setElementValueAsStringList(model, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process passed.
 */
export function setElementValueAsStringList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Process

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsStringList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Task

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Process | Task

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Model passed.
 */
export function setElementValueAsStringList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Process | Task {
  return setElementValue(
    model,
    elementDefinitionCode,
    elementValues?.map(value => ({
      type: 'STRING',
      value,
    })),
  )
}

/**
 * Add a new element value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Process passed.
 */
export function addElementValueAsString(
  process: Process,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Process

/**
 * Add a new element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Task passed.
 */
export function addElementValueAsString(
  task: Task,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Task

/**
 * Add a new element value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Process or Task passed.
 */
export function addElementValueAsString(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValue: string | undefined,
): Process | Task {
  return addElementValueAsStringList(model, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Add all element values passed
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process passed.
 */
export function addElementValueAsStringList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Process

/**
 * Add all element values passed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Task passed.
 */
export function addElementValueAsStringList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Task

/**
 * Add all element values passed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process or Task passed.
 */
export function addElementValueAsStringList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Process | Task

/**
 * Add all element values passed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process or Task passed.
 */
export function addElementValueAsStringList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: string[] | undefined,
): Process | Task {
  return addElementValue(
    model,
    elementDefinitionCode,
    elementValues?.map(elementValues => ({
      type: 'STRING',
      value: elementValues,
    })),
  )
}

/**
 * Get an element as Double
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(process: Process, elementDefinitionCode: string): number

/**
 * Get an element as Double
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(task: Task, elementDefinitionCode: string): number

/**
 * Get an element as Double
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(model: Process | Task, elementDefinitionCode: string): number

/**
 * Get an element as Double
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsNumber(model: Process | Task, elementDefinitionCode: string): number {
  const elementValue = findElementValueAsNumber(model, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

/**
 * Try to get an element as Double
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(process: Process, elementDefinitionCode: string): number | undefined

/**
 * Try to get an element as Double
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(task: Task, elementDefinitionCode: string): number | undefined

/**
 * Try to get an element as Double
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(model: Process | Task, elementDefinitionCode: string): number | undefined

/**
 * Try to get an element as Double
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsNumber(model: Process | Task, elementDefinitionCode: string): number | undefined {
  const [elementValue] = getElementValueAsNumberList(model, elementDefinitionCode)

  return elementValue
}

/**
 * Get all elements as Double
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(process: Process, elementDefinitionCode: string): number[]

/**
 * Get all elements as Double
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(task: Task, elementDefinitionCode: string): number[]

/**
 * Get all elements as Double
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(model: Process | Task, elementDefinitionCode: string): number[]

/**
 * Get all elements as Double
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsNumberList(model: Process | Task, elementDefinitionCode: string): number[] {
  return getElementValues(model, elementDefinitionCode)
    .filter(elementValue => elementValue.type === 'STRING' || elementValue.type === 'NUMBER')
    .filter(elementValue => elementValue.value != null)
    .map(elementValue => parseFloat(elementValue.value?.toString() ?? '0'))
}

/**
 * Set an element value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Process passed.
 */
export function setElementValueAsNumber(
  process: Process,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Process

/**
 * Set an element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsNumber(
  task: Task,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Task

/**
 * Set an element value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsNumber(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Process | Task {
  return setElementValueAsNumberList(model, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process passed.
 */
export function setElementValueAsNumberList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Process

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsNumberList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Task

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsNumberList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Process | Task

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsNumberList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Process | Task {
  return setElementValue(
    model,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'NUMBER',
      value: elementValue,
    })),
  )
}

/**
 * Add a new element value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Process passed.
 */
export function addElementValueAsNumber(
  process: Process,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Process

/**
 * Add a new element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Task passed.
 */
export function addElementValueAsNumber(
  task: Task,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Task

/**
 * Add a new element value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Process or Task passed.
 */
export function addElementValueAsNumber(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValue: number | undefined,
): Process | Task {
  return addElementValueAsNumberList(model, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Add all element values passed
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process passed.
 */
export function addElementValueAsNumberList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Process

/**
 * Add all element values passed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Task passed.
 */
export function addElementValueAsNumberList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Task

/**
 * Add all element values passed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process or Task passed.
 */
export function addElementValueAsNumberList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Process | Task

/**
 * Add all element values passed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process or Task passed.
 */
export function addElementValueAsNumberList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: number[] | undefined,
): Process | Task {
  return addElementValue(
    model,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'NUMBER',
      value: elementValue,
    })),
  )
}

/**
 * Get an element as Date
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(process: Process, elementDefinitionCode: string): Date

/**
 * Get an element as Date
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(task: Task, elementDefinitionCode: string): Date

/**
 * Get an element as Date
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(model: Process | Task, elementDefinitionCode: string): Date

/**
 * Get an element as Date
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDate(model: Process | Task, elementDefinitionCode: string): Date {
  const elementValue = findElementValueAsDate(model, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

/**
 * Try to get an element as Date
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(process: Process, elementDefinitionCode: string): Date | undefined

/**
 * Try to get an element as Date
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(task: Task, elementDefinitionCode: string): Date | undefined

/**
 * Try to get an element as Date
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(model: Process | Task, elementDefinitionCode: string): Date | undefined

/**
 * Try to get an element as Date
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDate(model: Process | Task, elementDefinitionCode: string): Date | undefined {
  const [elementValue] = getElementValueAsDateList(model, elementDefinitionCode)

  return elementValue
}

/**
 * Get all elements as Date
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(process: Process, elementDefinitionCode: string): Date[]

/**
 * Get all elements as Date
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(task: Task, elementDefinitionCode: string): Date[]

/**
 * Get all elements as Date
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(model: Process | Task, elementDefinitionCode: string): Date[]

/**
 * Get all elements as Date
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDateList(model: Process | Task, elementDefinitionCode: string): Date[] {
  return getElementValues(model, elementDefinitionCode)
    .filter(elementValue => elementValue.type === 'STRING')
    .filter(elementValue => elementValue.value != null)
    .map(elementValue => new Date(elementValue.value?.toString() ?? ''))
}

/**
 * Set an element value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Process passed.
 */
export function setElementValueAsDate(
  process: Process,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): Process

/**
 * Set an element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsDate(task: Task, elementDefinitionCode: string, elementValue: Date | undefined): Task

/**
 * Set an element value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsDate(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): Process | Task {
  return setElementValueAsDateList(model, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process passed.
 */
export function setElementValueAsDateList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Process

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsDateList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Task

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsDateList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Process | Task

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsDateList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Process | Task {
  return setElementValue(
    model,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'STRING',
      value: elementValue.toString(),
    })),
  )
}

/**
 * Add a new element value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Process passed.
 */
export function addElementValueAsDate(
  process: Process,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): Process

/**
 * Add a new element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Task passed.
 */
export function addElementValueAsDate(task: Task, elementDefinitionCode: string, elementValue: Date | undefined): Task

/**
 * Add a new element value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Process or Task passed.
 */
export function addElementValueAsDate(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValue: Date | undefined,
): Process | Task {
  return addElementValueAsDateList(model, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Add all element values passed
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process passed.
 */
export function addElementValueAsDateList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Process

/**
 * Add all element values passed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Task passed.
 */
export function addElementValueAsDateList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Task

/**
 * Add all element values passed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process or Task passed.
 */
export function addElementValueAsDateList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Process | Task

/**
 * Add all element values passed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process or Task passed.
 */
export function addElementValueAsDateList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: Date[] | undefined,
): Process | Task {
  return addElementValue(
    model,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'STRING',
      value: elementValue.toString(),
    })),
  )
}

/**
 * Get an element as Object
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsObject(process: Process, elementDefinitionCode: string): KuFlowObject

/**
 * Get an element as Object
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsObject(task: Task, elementDefinitionCode: string): KuFlowObject

/**
 * Get an element as Object
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsObject(model: Process | Task, elementDefinitionCode: string): KuFlowObject

/**
 * Get an element as Object
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsObject(model: Process | Task, elementDefinitionCode: string): KuFlowObject {
  const elementValue = findElementValueAsObject(model, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

/**
 * Try to get an element as Object
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsObject(process: Process, elementDefinitionCode: string): KuFlowObject | undefined

/**
 * Try to get an element as Object
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsObject(task: Task, elementDefinitionCode: string): KuFlowObject | undefined

/**
 * Try to get an element as Object
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsObject(model: Process | Task, elementDefinitionCode: string): KuFlowObject | undefined

/**
 * Try to get an element as Object
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsObject(
  model: Process | Task,
  elementDefinitionCode: string,
): KuFlowObject | undefined {
  const [elementValue] = getElementValueAsObjectList(model, elementDefinitionCode)

  return elementValue
}

/**
 * Get all elements as Object
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsObjectList(process: Process, elementDefinitionCode: string): KuFlowObject[]

/**
 * Get all elements as Object
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsObjectList(task: Task, elementDefinitionCode: string): KuFlowObject[]

/**
 * Get all elements as Object
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsObjectList(model: Process | Task, elementDefinitionCode: string): KuFlowObject[]

/**
 * Get all elements as Object
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsObjectList(model: Process | Task, elementDefinitionCode: string): KuFlowObject[] {
  return getElementValues(model, elementDefinitionCode)
    .filter(elementValue => elementValue.type === 'STRING')
    .filter(elementValue => elementValue.value != null)
    .map(elementValue => new Date(elementValue.value?.toString() ?? ''))
}

/**
 * Set an element value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Process passed.
 */
export function setElementValueAsObject(
  process: Process,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): Process

/**
 * Set an element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsObject(
  task: Task,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): Task

/**
 * Set an element value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsObject(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): Process | Task {
  return setElementValueAsObjectList(model, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process passed.
 */
export function setElementValueAsObjectList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Process

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsObjectList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Task

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsObjectList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Process | Task

/**
 * Set all element values passed, previews values will be removed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Process or Task passed.
 */
export function setElementValueAsObjectList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Process | Task {
  return setElementValue(
    model,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'OBJECT',
      value: elementValue,
    })),
  )
}

/**
 * Add a new element value
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Process passed.
 */
export function addElementValueAsObject(
  process: Process,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): Process

/**
 * Add a new element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Task passed.
 */
export function addElementValueAsObject(
  task: Task,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): Task

/**
 * Add a new element value
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Process or Task passed.
 */
export function addElementValueAsObject(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValue: KuFlowObject | undefined,
): Process | Task {
  return addElementValueAsObjectList(model, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Add all element values passed
 *
 * @param process Process
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process passed.
 */
export function addElementValueAsObjectList(
  process: Process,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Process

/**
 * Add all element values passed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Task passed.
 */
export function addElementValueAsObjectList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Task

/**
 * Add all element values passed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process or Task passed.
 */
export function addElementValueAsObjectList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Process | Task

/**
 * Add all element values passed
 *
 * @param model Process or Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Process or Task passed.
 */
export function addElementValueAsObjectList(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: KuFlowObject[] | undefined,
): Process | Task {
  return addElementValue(
    model,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'OBJECT',
      value: elementValue,
    })),
  )
}

/**
 * Get an element as Document
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 */
export function getElementValueAsDocument(task: Task, elementDefinitionCode: string): TaskElementValueDocumentItem {
  const elementValue = findElementValueAsDocument(task, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

/**
 * Try to get an element as Document
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsDocument(
  task: Task,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem | undefined {
  const [elementValue] = getElementValueAsDocumentList(task, elementDefinitionCode)

  return elementValue
}

/**
 * Get all elements as Document
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsDocumentList(
  task: Task,
  elementDefinitionCode: string,
): TaskElementValueDocumentItem[] {
  const elementValues = getElementValues(task, elementDefinitionCode).filter(isDocument)

  return elementValues.map(elementValue => elementValue.value).filter(notEmpty)
}

/**
 * Set an element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsDocument(
  task: Task,
  elementDefinitionCode: string,
  elementValue: TaskElementValueDocumentItem | undefined,
): Task {
  return setElementValueAsDocumentList(task, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsDocumentList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): Task {
  return setElementValue(
    task,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'DOCUMENT',
      value: elementValue,
    })),
  )
}

/**
 * Add a new element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Task passed.
 */
export function addElementValueAsDocument(
  task: Task,
  elementDefinitionCode: string,
  elementValue: TaskElementValueDocumentItem | undefined,
): Task {
  return addElementValueAsObjectList(task, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Add all element values passed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Task passed.
 */
export function addElementValueAsDocumentList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValueDocumentItem[] | undefined,
): Task {
  return addElementValue(
    task,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'OBJECT',
      value: elementValue,
    })),
  )
}

/**
 * Get an element as Principal
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value.
 * @throws com.kuflow.rest.KuFlowRestClientException If element value doesn't exists
 */
export function getElementValueAsPrincipal(task: Task, elementDefinitionCode: string): TaskElementValuePrincipalItem {
  const elementValue = findElementValueAsPrincipal(task, elementDefinitionCode)
  if (elementValue == null) {
    throw new Error('value is required!')
  }

  return elementValue
}

/**
 * Try to get an element as Principal
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the element value if exists.
 */
export function findElementValueAsPrincipal(
  task: Task,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem | undefined {
  const [elementValue] = getElementValueAsPrincipalList(task, elementDefinitionCode)

  return elementValue
}

/**
 * Get all elements as Principal
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @return the elements values.
 */
export function getElementValueAsPrincipalList(
  task: Task,
  elementDefinitionCode: string,
): TaskElementValuePrincipalItem[] {
  const elementValues = getElementValues(task, elementDefinitionCode).filter(isPrincipal)

  return elementValues.map(elementValue => elementValue.value).filter(notEmpty)
}

/**
 * Set an element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the value is null all current values are removed
 * @return the Task object itself.
 */
export function setElementValueAsPrincipal(
  task: Task,
  elementDefinitionCode: string,
  elementValue: TaskElementValuePrincipalItem | undefined,
): Task {
  return setElementValueAsPrincipalList(task, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Set all element values passed, previews values will be removed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values, if the values are null all current values are removed
 * @return the Task passed.
 */
export function setElementValueAsPrincipalList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): Task {
  return setElementValue(
    task,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'PRINCIPAL',
      value: elementValue,
    })),
  )
}

/**
 * Add a new element value
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValue Element value, if the values is null the value is not added
 * @return the Task passed.
 */
export function addElementValueAsPrincipal(
  task: Task,
  elementDefinitionCode: string,
  elementValue: TaskElementValuePrincipalItem | undefined,
): Task {
  return addElementValueAsPrincipalList(task, elementDefinitionCode, elementValue != null ? [elementValue] : undefined)
}

/**
 * Add all element values passed
 *
 * @param task Task
 * @param elementDefinitionCode Element Definition Code
 * @param elementValues Element values
 * @return the Task passed.
 */
export function addElementValueAsPrincipalList(
  task: Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValuePrincipalItem[] | undefined,
): Task {
  return addElementValue(
    task,
    elementDefinitionCode,
    elementValues?.map(elementValue => ({
      type: 'PRINCIPAL',
      value: elementValue,
    })),
  )
}

function addElementValue(
  process: Process,
  elementDefinitionCode: string,
  elementValues: TaskElementValueUnion[] | undefined,
): Process

function addElementValue(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: TaskElementValueUnion[] | undefined,
): Process | Task {
  const elementValuesCurrent = getElementValues(model, elementDefinitionCode)

  return setElementValue(model, elementDefinitionCode, [...elementValuesCurrent, ...(elementValues ?? [])])
}

function setElementValue(
  process: Process,
  elementDefinitionCode: string,
  elementValues: ProcessElementValueUnion[] | undefined,
): Process

function setElementValue(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: ProcessElementValueUnion[] | TaskElementValueUnion[] | undefined,
): Process | Task

function setElementValue(
  model: Process | Task,
  elementDefinitionCode: string,
  elementValues: ProcessElementValueUnion[] | TaskElementValueUnion[] | undefined,
): Process | Task {
  if (elementValues == null) {
    if (model.elementValues != null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete model.elementValues[elementDefinitionCode]
    }
  } else {
    model.elementValues = {
      ...model.elementValues,
      [elementDefinitionCode]: elementValues,
    }
  }

  return model
}

function getElementValues(process: Process, elementDefinitionCode: string): ProcessElementValueUnion[]
function getElementValues(task: Task, elementDefinitionCode: string): TaskElementValueUnion[]
function getElementValues(model: Process | Task, elementDefinitionCode: string): TaskElementValueUnion[]
function getElementValues(
  model: Process | Task,
  elementDefinitionCode: string,
): TaskElementValueUnion[] | ProcessElementValueUnion[] {
  if (model.elementValues == null) {
    return []
  }
  const elementValuesByCode = model.elementValues[elementDefinitionCode]
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!elementValuesByCode || elementValuesByCode.length === 0) {
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

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
