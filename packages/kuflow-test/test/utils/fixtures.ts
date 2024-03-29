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
  type Principal,
  type PrincipalPage,
  type Process,
  type ProcessPage,
  type ProcessPageItem,
  type Task,
  type TaskPage,
  type TaskPageItem,
  type TenantUser,
} from '@kuflow/kuflow-rest'
import { randomInt, randomUUID } from 'crypto'

export function mockPrincipalPage(): PrincipalPage {
  return {
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

export function mockTenantUser(): TenantUser {
  return {
    id: randomUUID(),
    metadata: {
      valid: true,
      value: {},
    },
    principal: mockPrincipalUser(),
    tenantId: randomUUID(),
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
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockProcessPageItem(), mockProcessPageItem()],
  }
}

export function mockProcess(): Process {
  return {
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

export function mockProcessPageItem(): ProcessPageItem {
  return {
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
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockTaskPageItem(), mockTaskPageItem()],
  }
}

export function mockTask(): Task {
  return {
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

export function mockTaskJsonForms(): Task {
  return {
    id: randomUUID(),
    state: 'READY',
    taskDefinition: {
      id: randomUUID(),
      version: randomUUID(),
      name: `Name ${randomInt(1, 1_000)}`,
    },
    processId: randomUUID(),
    jsonFormsValue: {
      valid: true,
      data: {
        key1: 'value1',
        key2: 'value2',
      },
    },
    owner: mockPrincipalUser(),

    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockTaskPageItem(): TaskPageItem {
  return {
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
