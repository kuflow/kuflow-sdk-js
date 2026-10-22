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

export const KmsKey: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'KmsKey',
    modelProperties: {
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'String',
        },
      },
      value: {
        serializedName: 'value',
        required: true,
        type: {
          name: 'ByteArray',
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

export const GroupPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'GroupPageItem',
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
      code: {
        serializedName: 'code',
        required: true,
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

export const TenantPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TenantPageItem',
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

export const ProcessDefinitionRef: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessDefinitionRef',
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
      processDefinitionCode: {
        serializedName: 'processDefinitionCode',
        type: {
          name: 'String',
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
      relatedProcessId: {
        serializedName: 'relatedProcessId',
        type: {
          name: 'Uuid',
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

export const ProcessActionCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionCreateParams',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      processActionDefinitionCode: {
        serializedName: 'processActionDefinitionCode',
        required: true,
        type: {
          name: 'String',
        },
      },
      createTask: {
        serializedName: 'createTask',
        type: {
          name: 'Composite',
          className: 'ProcessActionCreateParamsCreateTask',
        },
      },
      createProcessItemMessage: {
        serializedName: 'createProcessItemMessage',
        type: {
          name: 'Composite',
          className: 'ProcessActionCreateParamsCreateProcessItemMessage',
        },
      },
      startRelatedProcess: {
        serializedName: 'startRelatedProcess',
        type: {
          name: 'Composite',
          className: 'ProcessActionCreateParamsStartRelatedProcess',
        },
      },
      sendWorkflowSignal: {
        serializedName: 'sendWorkflowSignal',
        type: {
          name: 'Composite',
          className: 'ProcessActionCreateParamsSendWorkflowSignal',
        },
      },
    },
  },
}

export const ProcessActionCreateParamsCreateTask: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionCreateParamsCreateTask',
    modelProperties: {
      processItemThreadId: {
        serializedName: 'processItemThreadId',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const ProcessActionCreateParamsCreateProcessItemMessage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionCreateParamsCreateProcessItemMessage',
    modelProperties: {
      text: {
        serializedName: 'text',
        required: true,
        type: {
          name: 'String',
        },
      },
      processItemThreadId: {
        serializedName: 'processItemThreadId',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const ProcessActionCreateParamsStartRelatedProcess: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionCreateParamsStartRelatedProcess',
    modelProperties: {
      metadata: {
        serializedName: 'metadata',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
      entity: {
        serializedName: 'entity',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const ProcessActionCreateParamsSendWorkflowSignal: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionCreateParamsSendWorkflowSignal',
    modelProperties: {
      input: {
        serializedName: 'input',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const ProcessActionDefinitionRef: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionDefinitionRef',
    modelProperties: {
      id: {
        serializedName: 'id',
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
    },
  },
}

export const ProcessActionDownloadable: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionDownloadable',
    modelProperties: {
      documentUri: {
        serializedName: 'documentUri',
        type: {
          name: 'String',
        },
      },
      documentExpired: {
        serializedName: 'documentExpired',
        type: {
          name: 'Boolean',
        },
      },
    },
  },
}

export const ProcessActionStartRelatedProcess: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionStartRelatedProcess',
    modelProperties: {
      processDefinitionId: {
        serializedName: 'processDefinitionId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const ProcessActionCreateTask: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionCreateTask',
    modelProperties: {
      processItemId: {
        serializedName: 'processItemId',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const ProcessActionCreateProcessItemMessage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionCreateProcessItemMessage',
    modelProperties: {
      processItemId: {
        serializedName: 'processItemId',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const ProcessActionCreateProcessItemThread: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionCreateProcessItemThread',
    modelProperties: {
      processItemId: {
        serializedName: 'processItemId',
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const ProcessActionSendWorkflowSignal: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessActionSendWorkflowSignal',
    modelProperties: {
      signalName: {
        serializedName: 'signalName',
        type: {
          name: 'String',
        },
      },
      input: {
        serializedName: 'input',
        type: {
          name: 'Composite',
          className: 'JsonValue',
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
          name: 'Enum',
          allowedValues: ['add', 'remove', 'replace', 'move', 'copy', 'test'],
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

export const ProcessItemDefinitionRef: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemDefinitionRef',
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
    },
  },
}

export const ProcessItemMessagePageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemMessagePageItem',
    modelProperties: {
      text: {
        serializedName: 'text',
        type: {
          name: 'String',
        },
      },
      dataStructureDataDefinitionCode: {
        serializedName: 'dataStructureDataDefinitionCode',
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
          allowedValues: ['TASK', 'MESSAGE', 'THREAD'],
        },
      },
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processItemThreadId: {
        serializedName: 'processItemThreadId',
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
      processItemDefinitionCode: {
        serializedName: 'processItemDefinitionCode',
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
      message: {
        serializedName: 'message',
        type: {
          name: 'Composite',
          className: 'ProcessItemMessageCreateParams',
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
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
      contextData: {
        serializedName: 'contextData',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
    },
  },
}

export const ProcessItemMessageCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemMessageCreateParams',
    modelProperties: {
      text: {
        serializedName: 'text',
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
      dataStructureDataDefinitionCode: {
        serializedName: 'dataStructureDataDefinitionCode',
        type: {
          name: 'String',
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
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
      contextData: {
        serializedName: 'contextData',
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

export const ProcessItemMessage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemMessage',
    modelProperties: {
      text: {
        serializedName: 'text',
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
      dataStructureDataDefinitionCode: {
        serializedName: 'dataStructureDataDefinitionCode',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessItemAiAssistance: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemAiAssistance',
    modelProperties: {
      requestId: {
        serializedName: 'requestId',
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
          allowedValues: ['PENDING', 'COMPLETED', 'FAILED'],
        },
      },
      embeddingPending: {
        serializedName: 'embeddingPending',
        type: {
          name: 'Number',
        },
      },
      embeddingProcessing: {
        serializedName: 'embeddingProcessing',
        type: {
          name: 'Number',
        },
      },
      retryAfterSeconds: {
        serializedName: 'retryAfterSeconds',
        type: {
          name: 'Number',
        },
      },
      model: {
        serializedName: 'model',
        type: {
          name: 'String',
        },
      },
      finishReason: {
        serializedName: 'finishReason',
        type: {
          name: 'String',
        },
      },
      errorCode: {
        serializedName: 'errorCode',
        type: {
          name: 'String',
        },
      },
      errorMessage: {
        serializedName: 'errorMessage',
        type: {
          name: 'String',
        },
      },
      startedAt: {
        serializedName: 'startedAt',
        required: true,
        type: {
          name: 'String',
        },
      },
      finishedAt: {
        serializedName: 'finishedAt',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessItemAiAssistanceGenerateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemAiAssistanceGenerateParams',
    modelProperties: {
      requestId: {
        serializedName: 'requestId',
        required: true,
        type: {
          name: 'Uuid',
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

export const ProcessItemTaskContextDataUpdateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessItemTaskContextDataUpdateParams',
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

export const BusinessArtifactDefinitionRef: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactDefinitionRef',
    modelProperties: {
      id: {
        serializedName: 'id',
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
    },
  },
}

export const BusinessArtifactCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactCreateParams',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      businessArtifactDefinitionId: {
        serializedName: 'businessArtifactDefinitionId',
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
      businessArtifactDefinitionCode: {
        serializedName: 'businessArtifactDefinitionCode',
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

export const BusinessArtifactDataUpdateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactDataUpdateParams',
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

export const BusinessArtifactActionCreateParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionCreateParams',
    modelProperties: {
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      businessArtifactActionDefinitionCode: {
        serializedName: 'businessArtifactActionDefinitionCode',
        required: true,
        type: {
          name: 'String',
        },
      },
      startWorkflow: {
        serializedName: 'startWorkflow',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionCreateParamsStartWorkflow',
        },
      },
      downloadable: {
        serializedName: 'downloadable',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionCreateParamsDownloadable',
        },
      },
      startProcess: {
        serializedName: 'startProcess',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionCreateParamsStartProcess',
        },
      },
      createArtifact: {
        serializedName: 'createArtifact',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionCreateParamsCreateArtifact',
        },
      },
    },
  },
}

export const BusinessArtifactActionCreateParamsStartWorkflow: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionCreateParamsStartWorkflow',
    modelProperties: {
      input: {
        serializedName: 'input',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const BusinessArtifactActionCreateParamsDownloadable: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionCreateParamsDownloadable',
    modelProperties: {
      input: {
        serializedName: 'input',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const BusinessArtifactActionCreateParamsStartProcess: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionCreateParamsStartProcess',
    modelProperties: {
      metadata: {
        serializedName: 'metadata',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
      entity: {
        serializedName: 'entity',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const BusinessArtifactActionCreateParamsCreateArtifact: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionCreateParamsCreateArtifact',
    modelProperties: {
      value: {
        serializedName: 'value',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const BusinessArtifactActionDefinitionRef: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionDefinitionRef',
    modelProperties: {
      id: {
        serializedName: 'id',
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
    },
  },
}

export const BusinessArtifactActionStartWorkflow: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionStartWorkflow',
    modelProperties: {
      input: {
        serializedName: 'input',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
    },
  },
}

export const BusinessArtifactActionStartProcess: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionStartProcess',
    modelProperties: {
      processDefinitionId: {
        serializedName: 'processDefinitionId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const BusinessArtifactActionDownloadable: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionDownloadable',
    modelProperties: {
      input: {
        serializedName: 'input',
        type: {
          name: 'Composite',
          className: 'JsonValue',
        },
      },
      documentUri: {
        serializedName: 'documentUri',
        type: {
          name: 'String',
        },
      },
      documentExpired: {
        serializedName: 'documentExpired',
        type: {
          name: 'Boolean',
        },
      },
    },
  },
}

export const BusinessArtifactActionCreateArtifact: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionCreateArtifact',
    modelProperties: {
      businessArtifactDefinitionRef: {
        serializedName: 'businessArtifactDefinitionRef',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactDefinitionRef',
        },
      },
      businessArtifactId: {
        serializedName: 'businessArtifactId',
        type: {
          name: 'Uuid',
        },
      },
      value: {
        serializedName: 'value',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const BusinessArtifactActionCreateArtifactPrepareParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionCreateArtifactPrepareParams',
    modelProperties: {
      businessArtifactActionDefinitionCode: {
        serializedName: 'businessArtifactActionDefinitionCode',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const BusinessArtifactActionCreateArtifactPrepare: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionCreateArtifactPrepare',
    modelProperties: {
      businessArtifactDefinitionRef: {
        serializedName: 'businessArtifactDefinitionRef',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactDefinitionRef',
        },
      },
      value: {
        serializedName: 'value',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const BusinessArtifactActionStartProcessPrepareParams: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionStartProcessPrepareParams',
    modelProperties: {
      businessArtifactActionDefinitionCode: {
        serializedName: 'businessArtifactActionDefinitionCode',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const BusinessArtifactActionStartProcessPrepare: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactActionStartProcessPrepare',
    modelProperties: {
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
          name: 'Dictionary',
          value: { type: { name: 'any' } },
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
          allowedValues: ['TASK', 'MESSAGE', 'THREAD'],
        },
      },
      processItemState: {
        serializedName: 'processItemState',
        type: {
          name: 'Enum',
          allowedValues: ['READY', 'CLAIMED', 'COMPLETED', 'CANCELLED'],
        },
      },
      processItemDefinitionCode: {
        serializedName: 'processItemDefinitionCode',
        type: {
          name: 'String',
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
          allowedValues: ['TASK', 'MESSAGE', 'THREAD'],
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
      processItemDefinitionCode: {
        serializedName: 'processItemDefinitionCode',
        required: true,
        type: {
          name: 'String',
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

export const Tenant: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Tenant',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
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
      plan: {
        serializedName: 'plan',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['FREE', 'PREMIUM', 'UNLIMITED'],
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
        type: {
          name: 'Uuid',
        },
      },
      principalId: {
        serializedName: 'principalId',
        required: true,
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
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const AbstractDeleted: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'AbstractDeleted',
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      deletedBy: {
        serializedName: 'deletedBy',
        type: {
          name: 'Uuid',
        },
      },
      deletedAt: {
        serializedName: 'deletedAt',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessAction: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessAction',
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
          allowedValues: [
            'DOWNLOADABLE',
            'START_RELATED_PROCESS',
            'START_WORKFLOW',
            'CREATE_TASK',
            'CREATE_PROCESS_ITEM_MESSAGE',
            'CREATE_PROCESS_ITEM_THREAD',
            'SEND_WORKFLOW_SIGNAL',
          ],
        },
      },
      status: {
        serializedName: 'status',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['REQUESTED', 'COMPLETED', 'CANCELED', 'ERROR'],
        },
      },
      processActionDefinitionRef: {
        serializedName: 'processActionDefinitionRef',
        type: {
          name: 'Composite',
          className: 'ProcessActionDefinitionRef',
        },
      },
      downloadable: {
        serializedName: 'downloadable',
        type: {
          name: 'Composite',
          className: 'ProcessActionDownloadable',
        },
      },
      startRelatedProcess: {
        serializedName: 'startRelatedProcess',
        type: {
          name: 'Composite',
          className: 'ProcessActionStartRelatedProcess',
        },
      },
      createTask: {
        serializedName: 'createTask',
        type: {
          name: 'Composite',
          className: 'ProcessActionCreateTask',
        },
      },
      createProcessItemMessage: {
        serializedName: 'createProcessItemMessage',
        type: {
          name: 'Composite',
          className: 'ProcessActionCreateProcessItemMessage',
        },
      },
      createProcessItemThread: {
        serializedName: 'createProcessItemThread',
        type: {
          name: 'Composite',
          className: 'ProcessActionCreateProcessItemThread',
        },
      },
      sendWorkflowSignal: {
        serializedName: 'sendWorkflowSignal',
        type: {
          name: 'Composite',
          className: 'ProcessActionSendWorkflowSignal',
        },
      },
    },
  },
}

export const BusinessArtifactAction: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactAction',
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
          allowedValues: ['START_WORKFLOW', 'START_PROCESS', 'DOWNLOADABLE', 'CREATE_BUSINESS_ARTIFACT'],
        },
      },
      status: {
        serializedName: 'status',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['REQUESTED', 'COMPLETED', 'CANCELED', 'ERROR'],
        },
      },
      businessArtifactActionDefinitionRef: {
        serializedName: 'businessArtifactActionDefinitionRef',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionDefinitionRef',
        },
      },
      startWorkflow: {
        serializedName: 'startWorkflow',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionStartWorkflow',
        },
      },
      startProcess: {
        serializedName: 'startProcess',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionStartProcess',
        },
      },
      downloadable: {
        serializedName: 'downloadable',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionDownloadable',
        },
      },
      createArtifact: {
        serializedName: 'createArtifact',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactActionCreateArtifact',
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

export const GroupPage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'GroupPage',
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
              className: 'GroupPageItem',
            },
          },
        },
      },
    },
  },
}

export const TenantPage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TenantPage',
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
              className: 'TenantPageItem',
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

export const BusinessArtifactPage: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactPage',
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
              className: 'BusinessArtifactPageItem',
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

export const ProcessPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessPageItem',
    modelProperties: {
      ...AbstractDeleted.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      uri: {
        serializedName: 'uri',
        type: {
          name: 'String',
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
      processDefinitionRef: {
        serializedName: 'processDefinitionRef',
        type: {
          name: 'Composite',
          className: 'ProcessDefinitionRef',
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
      ...AbstractDeleted.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      uri: {
        serializedName: 'uri',
        type: {
          name: 'String',
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
      processDefinitionRef: {
        serializedName: 'processDefinitionRef',
        type: {
          name: 'Composite',
          className: 'ProcessDefinitionRef',
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
      ...AbstractDeleted.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      uri: {
        serializedName: 'uri',
        type: {
          name: 'String',
        },
      },
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['TASK', 'MESSAGE', 'THREAD'],
        },
      },
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processItemThreadId: {
        serializedName: 'processItemThreadId',
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
      processItemDefinitionRef: {
        serializedName: 'processItemDefinitionRef',
        type: {
          name: 'Composite',
          className: 'ProcessItemDefinitionRef',
        },
      },
      task: {
        serializedName: 'task',
        type: {
          name: 'Composite',
          className: 'ProcessItemTaskPageItem',
        },
      },
      message: {
        serializedName: 'message',
        type: {
          name: 'Composite',
          className: 'ProcessItemMessagePageItem',
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
      ...AbstractDeleted.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      uri: {
        serializedName: 'uri',
        type: {
          name: 'String',
        },
      },
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['TASK', 'MESSAGE', 'THREAD'],
        },
      },
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      processItemThreadId: {
        serializedName: 'processItemThreadId',
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
      processItemDefinitionRef: {
        serializedName: 'processItemDefinitionRef',
        type: {
          name: 'Composite',
          className: 'ProcessItemDefinitionRef',
        },
      },
      task: {
        serializedName: 'task',
        type: {
          name: 'Composite',
          className: 'ProcessItemTask',
        },
      },
      message: {
        serializedName: 'message',
        type: {
          name: 'Composite',
          className: 'ProcessItemMessage',
        },
      },
    },
  },
}

export const BusinessArtifactPageItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifactPageItem',
    modelProperties: {
      ...AbstractDeleted.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      uri: {
        serializedName: 'uri',
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
      businessArtifactDefinitionRef: {
        serializedName: 'businessArtifactDefinitionRef',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactDefinitionRef',
        },
      },
    },
  },
}

export const BusinessArtifact: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'BusinessArtifact',
    modelProperties: {
      ...AbstractDeleted.type.modelProperties,
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      uri: {
        serializedName: 'uri',
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
      businessArtifactDefinitionRef: {
        serializedName: 'businessArtifactDefinitionRef',
        type: {
          name: 'Composite',
          className: 'BusinessArtifactDefinitionRef',
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

export const discriminators = {
  WebhookEvent,
  'WebhookEvent.PROCESS.CREATED': WebhookEventProcessCreated,
  'WebhookEvent.PROCESS.STATE_CHANGED': WebhookEventProcessStateChanged,
  'WebhookEvent.PROCESS_ITEM.CREATED': WebhookEventProcessItemCreated,
  'WebhookEvent.PROCESS_ITEM.TASK_STATE_CHANGED': WebhookEventProcessItemTaskStateChanged,
}
