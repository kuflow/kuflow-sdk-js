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

import type * as coreClient from '@azure/core-client'

export const AuthenticationCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'AuthenticationCreateParams',
    modelProperties: {
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['ENGINE_TOKEN', 'ENGINE_CERTIFICATE'],
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const AuthenticationEngineToken: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'AuthenticationEngineToken',
    modelProperties: {
      token: {
        serializedName: 'token',
        required: true,
        type: {
          name: 'String',
        },
      },
      expiredAt: {
        serializedName: 'expiredAt',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const AuthenticationEngineCertificate: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'AuthenticationEngineCertificate',
    modelProperties: {
      namespace: {
        serializedName: 'namespace',
        required: true,
        type: {
          name: 'String',
        },
      },
      tls: {
        serializedName: 'tls',
        type: {
          name: 'Composite',
          className: 'AuthenticationEngineCertificateTls',
        },
      },
    },
  },
}

export const AuthenticationEngineCertificateTls: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'AuthenticationEngineCertificateTls',
    modelProperties: {
      serverRootCaCertificate: {
        serializedName: 'serverRootCaCertificate',
        required: true,
        type: {
          name: 'String',
        },
      },
      clientCertificate: {
        serializedName: 'clientCertificate',
        required: true,
        type: {
          name: 'String',
        },
      },
      clientPrivateKey: {
        serializedName: 'clientPrivateKey',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const AbstractAudited: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'AbstractAudited',
    modelProperties: {
      createdBy: {
        serializedName: 'createdBy',
        type: {
          name: 'Uuid',
        },
      },
      createdAt: {
        serializedName: 'createdAt',
        type: {
          name: 'String',
        },
      },
      lastModifiedBy: {
        serializedName: 'lastModifiedBy',
        type: {
          name: 'Uuid',
        },
      },
      lastModifiedAt: {
        serializedName: 'lastModifiedAt',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const DefaultError: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'DefaultError',
    modelProperties: {
      timestamp: {
        serializedName: 'timestamp',
        required: true,
        type: {
          name: 'String',
        },
      },
      status: {
        serializedName: 'status',
        required: true,
        type: {
          name: 'Number',
        },
      },
      message: {
        serializedName: 'message',
        required: true,
        type: {
          name: 'String',
        },
      },
      errors: {
        serializedName: 'errors',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'DefaultErrorInfo',
            },
          },
        },
      },
    },
  },
}

export const DefaultErrorInfo: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'DefaultErrorInfo',
    modelProperties: {
      code: {
        serializedName: 'code',
        required: true,
        type: {
          name: 'String',
        },
      },
      message: {
        serializedName: 'message',
        required: true,
        type: {
          name: 'String',
        },
      },
      location: {
        serializedName: 'location',
        type: {
          name: 'String',
        },
      },
      locationType: {
        serializedName: 'locationType',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const PrincipalPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'PrincipalPageItem',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      type: {
        serializedName: 'type',
        type: {
          name: 'Enum',
          allowedValues: ['USER', 'APPLICATION', 'SYSTEM'],
        },
      },
      name: {
        serializedName: 'name',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const Page: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Page',
    modelProperties: {
      metadata: {
        serializedName: 'metadata',
        type: {
          name: 'Composite',
          className: 'PageMetadata',
        },
      },
    },
  },
}

export const PageMetadata: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'PageMetadata',
    modelProperties: {
      size: {
        constraints: {
          InclusiveMinimum: 0,
        },
        serializedName: 'size',
        required: true,
        type: {
          name: 'Number',
        },
      },
      page: {
        constraints: {
          InclusiveMinimum: 0,
        },
        serializedName: 'page',
        required: true,
        type: {
          name: 'Number',
        },
      },
      totalElements: {
        serializedName: 'totalElements',
        required: true,
        type: {
          name: 'Number',
        },
      },
      totalPages: {
        serializedName: 'totalPages',
        required: true,
        type: {
          name: 'Number',
        },
      },
    },
  },
}

export const Principal: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Principal',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      type: {
        serializedName: 'type',
        type: {
          name: 'Enum',
          allowedValues: ['USER', 'APPLICATION', 'SYSTEM'],
        },
      },
      name: {
        serializedName: 'name',
        type: {
          name: 'String',
        },
      },
      user: {
        serializedName: 'user',
        type: {
          name: 'Composite',
          className: 'PrincipalUser',
        },
      },
      application: {
        serializedName: 'application',
        type: {
          name: 'Composite',
          className: 'PrincipalApplication',
        },
      },
    },
  },
}

export const PrincipalUser: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'PrincipalUser',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      email: {
        serializedName: 'email',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const PrincipalApplication: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'PrincipalApplication',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const JsonValue: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'JsonValue',
    modelProperties: {
      valid: {
        serializedName: 'valid',
        readOnly: true,
        type: {
          name: 'Boolean',
        },
      },
      value: {
        serializedName: 'value',
        required: true,
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
      errors: {
        serializedName: 'errors',
        readOnly: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'JsonValueError',
            },
          },
        },
      },
    },
  },
}

export const JsonValueError: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'JsonValueError',
    modelProperties: {
      propertyPath: {
        serializedName: 'propertyPath',
        type: {
          name: 'String',
        },
      },
      type: {
        serializedName: 'type',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessDefinitionSummary: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessDefinitionSummary',
    modelProperties: {
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      version: {
        serializedName: 'version',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      name: {
        constraints: {
          MaxLength: 50,
          MinLength: 1,
        },
        serializedName: 'name',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessCreateParams',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      processDefinitionId: {
        serializedName: 'processDefinitionId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      metadata: {
        serializedName: 'metadata',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
      initiatorId: {
        serializedName: 'initiatorId',
        type: {
          name: 'Uuid',
        },
      },
      initiatorEmail: {
        serializedName: 'initiatorEmail',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessRelated: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessRelated',
    modelProperties: {
      incoming: {
        serializedName: 'incoming',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Uuid',
            },
          },
        },
      },
      outcoming: {
        serializedName: 'outcoming',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Uuid',
            },
          },
        },
      },
    },
  },
}

export const ProcessChangeInitiatorParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessChangeInitiatorParams',
    modelProperties: {
      initiatorId: {
        serializedName: 'initiatorId',
        type: {
          name: 'Uuid',
        },
      },
      initiatorEmail: {
        serializedName: 'initiatorEmail',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessMetadataUpdateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessMetadataUpdateParams',
    modelProperties: {
      metadata: {
        serializedName: 'metadata',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
    },
  },
}

export const JsonPatchOperation: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'JsonPatchOperation',
    modelProperties: {
      op: {
        serializedName: 'op',
        required: true,
        type: {
          name: 'String',
        },
      },
      from: {
        serializedName: 'from',
        type: {
          name: 'String',
        },
      },
      path: {
        serializedName: 'path',
        required: true,
        type: {
          name: 'String',
        },
      },
      value: {
        serializedName: 'value',
        nullable: true,
        type: {
          name: 'any',
        },
      },
    },
  },
}

export const ProcessEntityUpdateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessEntityUpdateParams',
    modelProperties: {
      entity: {
        serializedName: 'entity',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
    },
  },
}

export const DocumentReference: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'DocumentReference',
    modelProperties: {
      schemaPath: {
        serializedName: 'schemaPath',
        required: true,
        type: {
          name: 'String',
        },
      },
      documentUri: {
        serializedName: 'documentUri',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessItemTaskPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemTaskPageItem',
    modelProperties: {
      state: {
        serializedName: 'state',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['READY', 'CLAIMED', 'COMPLETED', 'CANCELLED'],
        },
      },
      taskDefinition: {
        serializedName: 'taskDefinition',
        type: {
          name: 'Composite',
          className: 'TaskDefinitionSummary',
        },
      },
    },
  },
}

export const TaskDefinitionSummary: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskDefinitionSummary',
    modelProperties: {
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      version: {
        serializedName: 'version',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      code: {
        serializedName: 'code',
        required: true,
        type: {
          name: 'String',
        },
      },
      name: {
        constraints: {
          MaxLength: 50,
          MinLength: 1,
        },
        serializedName: 'name',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessItemCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemCreateParams',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['TASK', 'MESSAGE'],
        },
      },
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      ownerId: {
        serializedName: 'ownerId',
        type: {
          name: 'Uuid',
        },
      },
      ownerEmail: {
        serializedName: 'ownerEmail',
        type: {
          name: 'String',
        },
      },
      task: {
        serializedName: 'task',
        type: {
          name: 'Composite',
          className: 'ProcessItemTaskCreateParams',
        },
      },
    },
  },
}

export const ProcessItemTaskCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemTaskCreateParams',
    modelProperties: {
      taskDefinitionCode: {
        serializedName: 'taskDefinitionCode',
        required: true,
        type: {
          name: 'String',
        },
      },
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
    },
  },
}

export const ProcessItemTask: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemTask',
    modelProperties: {
      state: {
        serializedName: 'state',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['READY', 'CLAIMED', 'COMPLETED', 'CANCELLED'],
        },
      },
      taskDefinition: {
        serializedName: 'taskDefinition',
        type: {
          name: 'Composite',
          className: 'TaskDefinitionSummary',
        },
      },
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
      logs: {
        serializedName: 'logs',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'ProcessItemTaskLog',
            },
          },
        },
      },
    },
  },
}

export const ProcessItemTaskLog: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemTaskLog',
    modelProperties: {
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      timestamp: {
        serializedName: 'timestamp',
        required: true,
        type: {
          name: 'String',
        },
      },
      message: {
        serializedName: 'message',
        required: true,
        type: {
          name: 'String',
        },
      },
      level: {
        serializedName: 'level',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['INFO', 'WARN', 'ERROR'],
        },
      },
    },
  },
}

export const ProcessItemTaskAssignParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemTaskAssignParams',
    modelProperties: {
      ownerId: {
        serializedName: 'ownerId',
        type: {
          name: 'Uuid',
        },
      },
      ownerEmail: {
        serializedName: 'ownerEmail',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessItemTaskAppendLogParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemTaskAppendLogParams',
    modelProperties: {
      message: {
        serializedName: 'message',
        required: true,
        type: {
          name: 'String',
        },
      },
      level: {
        serializedName: 'level',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['INFO', 'WARN', 'ERROR'],
        },
      },
    },
  },
}

export const ProcessItemTaskDataUpdateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemTaskDataUpdateParams',
    modelProperties: {
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
    },
  },
}

export const WorkerCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'WorkerCreateParams',
    modelProperties: {
      identity: {
        constraints: {
          MaxLength: 255,
          MinLength: 1,
        },
        serializedName: 'identity',
        required: true,
        type: {
          name: 'String',
        },
      },
      taskQueue: {
        constraints: {
          MaxLength: 255,
          MinLength: 1,
        },
        serializedName: 'taskQueue',
        required: true,
        type: {
          name: 'String',
        },
      },
      workflowTypes: {
        serializedName: 'workflowTypes',
        type: {
          name: 'Sequence',
          element: {
            constraints: {
              MaxLength: 255,
              MinLength: 1,
            },
            type: {
              name: 'String',
            },
          },
        },
      },
      activityTypes: {
        serializedName: 'activityTypes',
        type: {
          name: 'Sequence',
          element: {
            constraints: {
              MaxLength: 255,
              MinLength: 1,
            },
            type: {
              name: 'String',
            },
          },
        },
      },
      hostname: {
        constraints: {
          MaxLength: 255,
          MinLength: 1,
        },
        serializedName: 'hostname',
        required: true,
        type: {
          name: 'String',
        },
      },
      ip: {
        constraints: {
          MaxLength: 40,
          MinLength: 7,
        },
        serializedName: 'ip',
        required: true,
        type: {
          name: 'String',
        },
      },
      installationId: {
        serializedName: 'installationId',
        type: {
          name: 'Uuid',
        },
      },
      robotIds: {
        serializedName: 'robotIds',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Uuid',
            },
          },
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const RobotSourceFile: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'RobotSourceFile',
    modelProperties: {
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      name: {
        serializedName: 'name',
        required: true,
        type: {
          name: 'String',
        },
      },
      contentType: {
        serializedName: 'contentType',
        required: true,
        type: {
          name: 'String',
        },
      },
      contentLength: {
        serializedName: 'contentLength',
        required: true,
        type: {
          name: 'Number',
        },
      },
      contentHash: {
        serializedName: 'contentHash',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const WebhookEvent: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'WebhookEvent',
    uberParent: 'WebhookEvent',
    polymorphicDiscriminator: {
      serializedName: 'type',
      clientName: 'type',
    },
    modelProperties: {
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      version: {
        serializedName: 'version',
        required: true,
        type: {
          name: 'String',
        },
      },
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: [
            'PROCESS.CREATED',
            'PROCESS.STATE_CHANGED',
            'PROCESS_ITEM.CREATED',
            'PROCESS_ITEM.TASK_STATE_CHANGED',
          ],
        },
      },
      timestamp: {
        serializedName: 'timestamp',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const WebhookEventProcessCreatedData: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'WebhookEventProcessCreatedData',
    modelProperties: {
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processState: {
        serializedName: 'processState',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['RUNNING', 'COMPLETED', 'CANCELLED'],
        },
      },
    },
  },
}

export const WebhookEventProcessStateChangedData: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'WebhookEventProcessStateChangedData',
    modelProperties: {
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processState: {
        serializedName: 'processState',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['RUNNING', 'COMPLETED', 'CANCELLED'],
        },
      },
    },
  },
}

export const WebhookEventProcessItemCreatedData: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'WebhookEventProcessItemCreatedData',
    modelProperties: {
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processItemId: {
        serializedName: 'processItemId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processItemType: {
        serializedName: 'processItemType',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['TASK', 'MESSAGE'],
        },
      },
      processItemTaskCode: {
        serializedName: 'processItemTaskCode',
        type: {
          name: 'String',
        },
      },
      processItemState: {
        serializedName: 'processItemState',
        type: {
          name: 'Enum',
          allowedValues: ['READY', 'CLAIMED', 'COMPLETED', 'CANCELLED'],
        },
      },
    },
  },
}

export const WebhookEventProcessItemTaskStateChangedData: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'WebhookEventProcessItemTaskStateChangedData',
    modelProperties: {
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processItemId: {
        serializedName: 'processItemId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processItemType: {
        serializedName: 'processItemType',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['TASK', 'MESSAGE'],
        },
      },
      processItemTaskCode: {
        serializedName: 'processItemTaskCode',
        required: true,
        type: {
          name: 'String',
        },
      },
      processItemState: {
        serializedName: 'processItemState',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['READY', 'CLAIMED', 'COMPLETED', 'CANCELLED'],
        },
      },
    },
  },
}

export const Authentication: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Authentication',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      type: {
        serializedName: 'type',
        type: {
          name: 'Enum',
          allowedValues: ['ENGINE_TOKEN', 'ENGINE_CERTIFICATE'],
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        type: {
          name: 'Uuid',
        },
      },
      engineToken: {
        serializedName: 'engineToken',
        type: {
          name: 'Composite',
          className: 'AuthenticationEngineToken',
        },
      },
      engineCertificate: {
        serializedName: 'engineCertificate',
        type: {
          name: 'Composite',
          className: 'AuthenticationEngineCertificate',
        },
      },
    },
  },
}

export const TenantUserPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TenantUserPageItem',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        readOnly: true,
        type: {
          name: 'Uuid',
        },
      },
      principalId: {
        serializedName: 'principalId',
        required: true,
        readOnly: true,
        type: {
          name: 'Uuid',
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        required: true,
        readOnly: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const TenantUser: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TenantUser',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      metadata: {
        serializedName: 'metadata',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
      principal: {
        serializedName: 'principal',
        type: {
          name: 'Composite',
          className: 'Principal',
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        required: true,
        readOnly: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const ProcessPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessPageItem',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      state: {
        serializedName: 'state',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['RUNNING', 'COMPLETED', 'CANCELLED'],
        },
      },
      processDefinition: {
        serializedName: 'processDefinition',
        type: {
          name: 'Composite',
          className: 'ProcessDefinitionSummary',
        },
      },
      initiatorId: {
        serializedName: 'initiatorId',
        type: {
          name: 'Uuid',
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const Process: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Process',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      state: {
        serializedName: 'state',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['RUNNING', 'COMPLETED', 'CANCELLED'],
        },
      },
      processDefinition: {
        serializedName: 'processDefinition',
        type: {
          name: 'Composite',
          className: 'ProcessDefinitionSummary',
        },
      },
      metadata: {
        serializedName: 'metadata',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
      entity: {
        serializedName: 'entity',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
      processRelated: {
        serializedName: 'processRelated',
        type: {
          name: 'Composite',
          className: 'ProcessRelated',
        },
      },
      initiatorId: {
        serializedName: 'initiatorId',
        type: {
          name: 'Uuid',
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const ProcessItemPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemPageItem',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['TASK', 'MESSAGE'],
        },
      },
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      ownerId: {
        serializedName: 'ownerId',
        type: {
          name: 'Uuid',
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      task: {
        serializedName: 'task',
        type: {
          name: 'Composite',
          className: 'ProcessItemTaskPageItem',
        },
      },
    },
  },
}

export const ProcessItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItem',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['TASK', 'MESSAGE'],
        },
      },
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      ownerId: {
        serializedName: 'ownerId',
        type: {
          name: 'Uuid',
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        type: {
          name: 'Uuid',
        },
      },
      task: {
        serializedName: 'task',
        type: {
          name: 'Composite',
          className: 'ProcessItemTask',
        },
      },
    },
  },
}

export const Worker: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Worker',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      identity: {
        constraints: {
          MaxLength: 255,
          MinLength: 1,
        },
        serializedName: 'identity',
        required: true,
        type: {
          name: 'String',
        },
      },
      taskQueue: {
        constraints: {
          MaxLength: 255,
          MinLength: 1,
        },
        serializedName: 'taskQueue',
        required: true,
        type: {
          name: 'String',
        },
      },
      workflowTypes: {
        serializedName: 'workflowTypes',
        type: {
          name: 'Sequence',
          element: {
            constraints: {
              MaxLength: 255,
              MinLength: 1,
            },
            type: {
              name: 'String',
            },
          },
        },
      },
      activityTypes: {
        serializedName: 'activityTypes',
        type: {
          name: 'Sequence',
          element: {
            constraints: {
              MaxLength: 255,
              MinLength: 1,
            },
            type: {
              name: 'String',
            },
          },
        },
      },
      hostname: {
        constraints: {
          MaxLength: 255,
          MinLength: 1,
        },
        serializedName: 'hostname',
        required: true,
        type: {
          name: 'String',
        },
      },
      ip: {
        constraints: {
          MaxLength: 40,
          MinLength: 7,
        },
        serializedName: 'ip',
        required: true,
        type: {
          name: 'String',
        },
      },
      installationId: {
        serializedName: 'installationId',
        type: {
          name: 'Uuid',
        },
      },
      robotIds: {
        serializedName: 'robotIds',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Uuid',
            },
          },
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const RobotPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'RobotPageItem',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      code: {
        constraints: {
          MaxLength: 50,
          MinLength: 1,
        },
        serializedName: 'code',
        required: true,
        type: {
          name: 'String',
        },
      },
      name: {
        constraints: {
          MaxLength: 50,
          MinLength: 1,
        },
        serializedName: 'name',
        required: true,
        type: {
          name: 'String',
        },
      },
      description: {
        constraints: {
          MaxLength: 4000,
          MinLength: 1,
        },
        serializedName: 'description',
        type: {
          name: 'String',
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const Robot: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Robot',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      code: {
        constraints: {
          MaxLength: 50,
          MinLength: 1,
        },
        serializedName: 'code',
        required: true,
        type: {
          name: 'String',
        },
      },
      name: {
        constraints: {
          MaxLength: 50,
          MinLength: 1,
        },
        serializedName: 'name',
        required: true,
        type: {
          name: 'String',
        },
      },
      description: {
        constraints: {
          MaxLength: 4000,
          MinLength: 1,
        },
        serializedName: 'description',
        type: {
          name: 'String',
        },
      },
      sourceType: {
        serializedName: 'sourceType',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['PACKAGE', 'UNKNOWN'],
        },
      },
      sourceFile: {
        serializedName: 'sourceFile',
        type: {
          name: 'Composite',
          className: 'RobotSourceFile',
        },
      },
      environmentVariables: {
        serializedName: 'environmentVariables',
        type: {
          name: 'Dictionary',
          value: {
            type: { name: 'String' },
            constraints: { MaxLength: 4000, MinLength: 1 },
          },
        },
      },
      tenantId: {
        serializedName: 'tenantId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const PrincipalPage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'PrincipalPage',
    modelProperties: {
      ...Page.type.modelProperties,
      content: {
        serializedName: 'content',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'PrincipalPageItem',
            },
          },
        },
      },
    },
  },
}

export const TenantUserPage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TenantUserPage',
    modelProperties: {
      ...Page.type.modelProperties,
      content: {
        serializedName: 'content',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'TenantUserPageItem',
            },
          },
        },
      },
    },
  },
}

export const ProcessPage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessPage',
    modelProperties: {
      ...Page.type.modelProperties,
      content: {
        serializedName: 'content',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'ProcessPageItem',
            },
          },
        },
      },
    },
  },
}

export const ProcessItemPage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemPage',
    modelProperties: {
      ...Page.type.modelProperties,
      content: {
        serializedName: 'content',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'ProcessItemPageItem',
            },
          },
        },
      },
    },
  },
}

export const RobotPage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'RobotPage',
    modelProperties: {
      ...Page.type.modelProperties,
      content: {
        serializedName: 'content',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'RobotPageItem',
            },
          },
        },
      },
    },
  },
}

export const WebhookEventProcessCreated: coreClient.CompositeMapper = {
  serializedName: 'PROCESS.CREATED',
  type: {
    name: 'Composite',
    className: 'WebhookEventProcessCreated',
    uberParent: 'WebhookEvent',
    polymorphicDiscriminator: WebhookEvent.type.polymorphicDiscriminator,
    modelProperties: {
      ...WebhookEvent.type.modelProperties,
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'WebhookEventProcessCreatedData',
        },
      },
    },
  },
}

export const WebhookEventProcessStateChanged: coreClient.CompositeMapper = {
  serializedName: 'PROCESS.STATE_CHANGED',
  type: {
    name: 'Composite',
    className: 'WebhookEventProcessStateChanged',
    uberParent: 'WebhookEvent',
    polymorphicDiscriminator: WebhookEvent.type.polymorphicDiscriminator,
    modelProperties: {
      ...WebhookEvent.type.modelProperties,
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'WebhookEventProcessStateChangedData',
        },
      },
    },
  },
}

export const WebhookEventProcessItemCreated: coreClient.CompositeMapper = {
  serializedName: 'PROCESS_ITEM.CREATED',
  type: {
    name: 'Composite',
    className: 'WebhookEventProcessItemCreated',
    uberParent: 'WebhookEvent',
    polymorphicDiscriminator: WebhookEvent.type.polymorphicDiscriminator,
    modelProperties: {
      ...WebhookEvent.type.modelProperties,
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'WebhookEventProcessItemCreatedData',
        },
      },
    },
  },
}

export const WebhookEventProcessItemTaskStateChanged: coreClient.CompositeMapper = {
  serializedName: 'PROCESS_ITEM.TASK_STATE_CHANGED',
  type: {
    name: 'Composite',
    className: 'WebhookEventProcessItemTaskStateChanged',
    uberParent: 'WebhookEvent',
    polymorphicDiscriminator: WebhookEvent.type.polymorphicDiscriminator,
    modelProperties: {
      ...WebhookEvent.type.modelProperties,
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'WebhookEventProcessItemTaskStateChangedData',
        },
      },
    },
  },
}

export const discriminators = {
  WebhookEvent,
  'WebhookEvent.PROCESS.CREATED': WebhookEventProcessCreated,
  'WebhookEvent.PROCESS.STATE_CHANGED': WebhookEventProcessStateChanged,
  'WebhookEvent.PROCESS_ITEM.CREATED': WebhookEventProcessItemCreated,
  'WebhookEvent.PROCESS_ITEM.TASK_STATE_CHANGED': WebhookEventProcessItemTaskStateChanged,
}
