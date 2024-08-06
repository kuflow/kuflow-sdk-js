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
  type ProcessCreateParams,
  type ProcessItem,
  type ProcessItemPage,
  type ProcessItemPageItem,
  type ProcessPage,
  type ProcessPageItem,
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
    state: 'RUNNING',
    processDefinition: {
      id: randomUUID(),
      version: randomUUID(),
      name: `Name ${randomInt(1, 1_000)}`,
    },
    metadata: {
      valid: true,
      value: {
        CODE_1: `Value ${randomInt(1, 1_000)}`,
        CODE_2: randomInt(1, 1_000),
      },
    },
    initiatorId: randomUUID(),
    tenantId: randomUUID(),
    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockProcessCreateParams(): ProcessCreateParams {
  return {
    id: randomUUID(),
    processDefinitionId: randomUUID(),
    metadata: {
      value: {
        CODE_1: `Value ${randomInt(1, 1_000)}`,
        CODE_2: randomInt(1, 1_000),
      },
    },
    initiatorId: randomUUID(),
  }
}

export function mockProcessPageItem(): ProcessPageItem {
  return {
    id: randomUUID(),
    state: 'RUNNING',
    processDefinition: {
      id: randomUUID(),
      version: randomUUID(),
      name: `Name ${randomInt(1, 1_000)}`,
    },
    initiatorId: randomUUID(),
    tenantId: randomUUID(),
    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockProcessItemPage(): ProcessItemPage {
  return {
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockProcessItemPageItem(), mockProcessItemPageItem()],
  }
}

export function mockProcessItem(): ProcessItem {
  return {
    id: randomUUID(),
    type: 'TASK',
    processId: randomUUID(),
    ownerId: randomUUID(),
    tenantId: randomUUID(),
    task: {
      state: 'READY',
      taskDefinition: {
        id: randomUUID(),
        version: randomUUID(),
        code: `CODE-${randomInt(1, 1_000)}`,
        name: `Name ${randomInt(1, 1_000)}`,
      },
      data: {
        value: {
          CODE_1: `Value ${randomInt(1, 1_000)}`,
          CODE_2: randomInt(1, 1_000),
        },
      },
    },

    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockProcessItemPageItem(): ProcessItemPageItem {
  return {
    id: randomUUID(),
    type: 'TASK',
    processId: randomUUID(),
    ownerId: randomUUID(),
    tenantId: randomUUID(),
    task: {
      state: 'READY',
      taskDefinition: {
        id: randomUUID(),
        version: randomUUID(),
        code: `CODE-${randomInt(1, 1_000)}`,
        name: `Name ${randomInt(1, 1_000)}`,
      },
    },

    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}
