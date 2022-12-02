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
import { Principal, PrincipalPage, Process, ProcessPage, Task, TaskPage } from '@kuflow/kuflow-rest'
import { randomInt, randomUUID } from 'crypto'

export function mockPrincipalPage(): PrincipalPage {
  return {
    objectType: 'PRINCIPAL_PAGE',
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockPrincipalUser(), mockPrincipalApplication()],
  }
}

export function mockPrincipalUser(): Principal {
  return {
    id: randomUUID(),
    type: 'USER',
    name: `Homer ${randomInt(1, 1_000)}`,
    user: {
      id: randomUUID(),
      email: `dummy-${randomInt(1, 1_000)}@example.com`,
    },
  }
}

export function mockPrincipalApplication(): Principal {
  return {
    id: randomUUID(),
    type: 'USER',
    name: `App ${randomInt(1, 1_000)}`,
    application: {
      id: randomUUID(),
    },
  }
}

export function mockProcessPage(): ProcessPage {
  return {
    objectType: 'PROCESS_PAGE',
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockProcess(), mockProcess()],
  }
}

export function mockProcess(): Process {
  return {
    objectType: 'PROCESS',
    id: randomUUID(),
    subject: `Subject ${randomInt(1, 1_000)}`,
    state: 'RUNNING',
    processDefinition: {
      id: randomUUID(),
      version: randomUUID(),
      name: `Name ${randomInt(1, 1_000)}`,
    },
    elementValues: {
      CODE_1: [
        {
          type: 'STRING',
          value: `Value ${randomInt(1, 1_000)}`,
          valid: true,
        },
      ],
      CODE_2: [
        {
          type: 'NUMBER',
          value: randomInt(1, 1_000),
          valid: true,
        },
      ],
    },
    initiator: mockPrincipalUser(),

    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockTaskPage(): TaskPage {
  return {
    objectType: 'TASK_PAGE',
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockTask(), mockTask()],
  }
}

export function mockTask(): Task {
  return {
    objectType: 'TASK',
    id: randomUUID(),
    state: 'READY',
    taskDefinition: {
      id: randomUUID(),
      version: randomUUID(),
      name: `Name ${randomInt(1, 1_000)}`,
    },
    processId: randomUUID(),
    elementValues: {
      CODE_1: [
        {
          type: 'STRING',
          value: `Value ${randomInt(1, 1_000)}`,
          valid: true,
        },
      ],
      CODE_2: [
        {
          type: 'NUMBER',
          value: randomInt(1, 1_000),
          valid: true,
        },
      ],
    },
    owner: mockPrincipalUser(),

    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}
