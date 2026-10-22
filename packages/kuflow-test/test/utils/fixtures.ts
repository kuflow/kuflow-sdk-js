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

import type {
  BusinessArtifact,
  BusinessArtifactAction,
  BusinessArtifactPage,
  BusinessArtifactPageItem,
  GroupPage,
  GroupPageItem,
  Principal,
  PrincipalPage,
  Process,
  ProcessAction,
  ProcessCreateParams,
  ProcessItem,
  ProcessItemAiAssistance,
  ProcessItemPage,
  ProcessItemPageItem,
  ProcessPage,
  ProcessPageItem,
  Robot,
  RobotPage,
  RobotPageItem,
  Tenant,
  TenantPage,
  TenantPageItem,
  TenantUser,
  Worker,
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

export function mockGroupPage(): GroupPage {
  return {
    metadata: {
      size: 25,
      page: 0,
      totalElements: 1,
      totalPages: 1,
    },
    content: [mockGroupPageItem()],
  }
}

export function mockGroupPageItem(): GroupPageItem {
  return {
    id: randomUUID(),
    code: 'MY_GROUP_CODE',
    name: 'My tenant name',
    tenantId: randomUUID(),
  }
}

export function mockTenant(): Tenant {
  return {
    id: randomUUID(),
    name: 'My tenant name',
    plan: 'FREE',
  }
}

export function mockTenantPageItem(): TenantPageItem {
  return {
    id: randomUUID(),
    name: 'My tenant name',
  }
}

export function mockTenantPage(): TenantPage {
  return {
    metadata: {
      size: 25,
      page: 0,
      totalElements: 1,
      totalPages: 1,
    },
    content: [mockTenantPageItem()],
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
    processDefinitionRef: {
      id: randomUUID(),
      code: 'MY_PROCESS_DEFINITION_CODE',
      version: randomUUID(),
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
    processDefinitionRef: {
      id: randomUUID(),
      code: 'MY_PROCESS_DEFINITION_CODE',
      version: randomUUID(),
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
    processItemDefinitionRef: {
      id: randomUUID(),
      version: randomUUID(),
      code: `CODE-${randomInt(1, 1_000)}`,
    },
    task: {
      state: 'READY',
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
    processItemDefinitionRef: {
      id: randomUUID(),
      version: randomUUID(),
      code: `CODE-${randomInt(1, 1_000)}`,
    },
    task: {
      state: 'READY',
    },

    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockProcessAction(): ProcessAction {
  return {
    id: randomUUID(),
    type: 'START_RELATED_PROCESS',
    status: 'COMPLETED',
    processActionDefinitionRef: {
      id: randomUUID(),
      code: `CODE-${randomInt(1, 1_000)}`,
    },
    startRelatedProcess: {
      processDefinitionId: randomUUID(),
      processId: randomUUID(),
    },
    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockProcessItemAiAssistance(): ProcessItemAiAssistance {
  return {
    requestId: randomUUID(),
    state: 'PENDING',
    startedAt: new Date().toString(),
  }
}

export function mockBusinessArtifactPage(): BusinessArtifactPage {
  return {
    metadata: {
      size: 25,
      page: 0,
      totalElements: 2,
      totalPages: 1,
    },
    content: [mockBusinessArtifactPageItem(), mockBusinessArtifactPageItem()],
  }
}

export function mockBusinessArtifactPageItem(): BusinessArtifactPageItem {
  return {
    id: randomUUID(),
    tenantId: randomUUID(),
    businessArtifactDefinitionRef: {
      id: randomUUID(),
      code: 'MY_BUSINESS_ARTIFACT_DEFINITION_CODE',
    },
    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockBusinessArtifact(): BusinessArtifact {
  return {
    id: randomUUID(),
    tenantId: randomUUID(),
    businessArtifactDefinitionRef: {
      id: randomUUID(),
      code: 'MY_BUSINESS_ARTIFACT_DEFINITION_CODE',
    },
    data: {
      valid: true,
      value: {
        CODE_1: `Value ${randomInt(1, 1_000)}`,
        CODE_2: randomInt(1, 1_000),
      },
    },
    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockBusinessArtifactAction(): BusinessArtifactAction {
  return {
    id: randomUUID(),
    type: 'START_WORKFLOW',
    status: 'REQUESTED',
    businessArtifactActionDefinitionRef: {
      id: randomUUID(),
      code: `CODE-${randomInt(1, 1_000)}`,
    },
    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockRobot(): Robot {
  return {
    ...mockRobotPageItem(),
    environmentVariables: {
      KEY: 'value',
    },
  }
}

export function mockRobotPageItem(): RobotPageItem {
  return {
    id: randomUUID(),
    code: `ROBOT_${randomInt(1, 1_000)}`,
    name: 'My robot',
    sourceType: 'PACKAGE',
    sourceFile: {
      id: randomUUID(),
      name: 'robot.zip',
      contentType: 'application/zip',
      contentLength: randomInt(1, 1_000),
      contentHash: randomUUID(),
    },
    tenantId: randomUUID(),
    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}

export function mockRobotPage(): RobotPage {
  return {
    metadata: {
      size: 25,
      page: 0,
      totalElements: 1,
      totalPages: 1,
    },
    content: [mockRobotPageItem()],
  }
}

export function mockWorker(): Worker {
  return {
    id: randomUUID(),
    identity: `identity-${randomInt(1, 1_000)}`,
    taskQueue: 'MY_TASK_QUEUE',
    workflowTypes: ['MyWorkflow'],
    activityTypes: ['MyActivity'],
    hostname: 'localhost',
    ip: '127.0.0.1',
    tenantId: randomUUID(),
    createdBy: randomUUID(),
    createdAt: new Date().toString(),
    lastModifiedBy: randomUUID(),
    lastModifiedAt: new Date().toString(),
  }
}
