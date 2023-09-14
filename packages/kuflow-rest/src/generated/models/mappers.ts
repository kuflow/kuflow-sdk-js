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
    uberParent: 'AbstractAudited',
    polymorphicDiscriminator: {
      serializedName: 'objectType',
      clientName: 'objectType',
    },
    modelProperties: {
      objectType: {
        serializedName: 'objectType',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['AUTHENTICATION', 'PROCESS', 'PROCESS_PAGE_ITEM', 'TASK', 'TASK_PAGE_ITEM', 'WORKER'],
        },
      },
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

export const Page: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Page',
    uberParent: 'Page',
    polymorphicDiscriminator: {
      serializedName: 'objectType',
      clientName: 'objectType',
    },
    modelProperties: {
      objectType: {
        serializedName: 'objectType',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['PRINCIPAL_PAGE', 'PROCESS_PAGE', 'TASK_PAGE'],
        },
      },
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
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessElementValue: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessElementValue',
    uberParent: 'ProcessElementValue',
    polymorphicDiscriminator: {
      serializedName: 'type',
      clientName: 'type',
    },
    modelProperties: {
      valid: {
        defaultValue: true,
        serializedName: 'valid',
        type: {
          name: 'Boolean',
        },
      },
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['STRING', 'NUMBER'],
        },
      },
    },
  },
}

export const RelatedProcess: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'RelatedProcess',
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

export const ProcessChangeInitiatorCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessChangeInitiatorCommand',
    modelProperties: {
      principalId: {
        serializedName: 'principalId',
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

export const ProcessSaveElementCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessSaveElementCommand',
    modelProperties: {
      elementDefinitionCode: {
        serializedName: 'elementDefinitionCode',
        required: true,
        type: {
          name: 'String',
        },
      },
      elementValues: {
        serializedName: 'elementValues',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'ProcessElementValue',
            },
          },
        },
      },
    },
  },
}

export const ProcessDeleteElementCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'ProcessDeleteElementCommand',
    modelProperties: {
      elementDefinitionCode: {
        serializedName: 'elementDefinitionCode',
        required: true,
        type: {
          name: 'String',
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
        type: {
          name: 'Uuid',
        },
      },
      version: {
        serializedName: 'version',
        type: {
          name: 'Uuid',
        },
      },
      code: {
        serializedName: 'code',
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
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const TaskElementValue: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskElementValue',
    uberParent: 'TaskElementValue',
    polymorphicDiscriminator: {
      serializedName: 'type',
      clientName: 'type',
    },
    modelProperties: {
      valid: {
        defaultValue: true,
        serializedName: 'valid',
        type: {
          name: 'Boolean',
        },
      },
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['STRING', 'NUMBER', 'OBJECT', 'DOCUMENT', 'PRINCIPAL'],
        },
      },
    },
  },
}

export const JsonFormsValue: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'JsonFormsValue',
    modelProperties: {
      valid: {
        serializedName: 'valid',
        type: {
          name: 'Boolean',
        },
      },
      data: {
        serializedName: 'data',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const Log: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'Log',
    modelProperties: {
      id: {
        serializedName: 'id',
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

export const TaskAssignCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskAssignCommand',
    modelProperties: {
      principalId: {
        serializedName: 'principalId',
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

export const TaskSaveElementCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskSaveElementCommand',
    modelProperties: {
      elementDefinitionCode: {
        serializedName: 'elementDefinitionCode',
        required: true,
        type: {
          name: 'String',
        },
      },
      elementValues: {
        serializedName: 'elementValues',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'TaskElementValue',
            },
          },
        },
      },
    },
  },
}

export const TaskDeleteElementCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskDeleteElementCommand',
    modelProperties: {
      elementDefinitionCode: {
        serializedName: 'elementDefinitionCode',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const TaskDeleteElementValueDocumentCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskDeleteElementValueDocumentCommand',
    modelProperties: {
      documentId: {
        serializedName: 'documentId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
    },
  },
}

export const TaskSaveJsonFormsValueDataCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskSaveJsonFormsValueDataCommand',
    modelProperties: {
      data: {
        serializedName: 'data',
        type: {
          name: 'Dictionary',
          value: { type: { name: 'any' } },
        },
      },
    },
  },
}

export const TaskSaveJsonFormsValueDocumentResponseCommand: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskSaveJsonFormsValueDocumentResponseCommand',
    modelProperties: {
      value: {
        serializedName: 'value',
        required: true,
        type: {
          name: 'String',
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

export const WebhookEventTaskStateChangedData: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'WebhookEventTaskStateChangedData',
    modelProperties: {
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      taskId: {
        serializedName: 'taskId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      taskCode: {
        serializedName: 'taskCode',
        required: true,
        type: {
          name: 'String',
        },
      },
      taskState: {
        serializedName: 'taskState',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['READY', 'CLAIMED', 'COMPLETED', 'CANCELLED'],
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
      type: {
        serializedName: 'type',
        required: true,
        type: {
          name: 'Enum',
          allowedValues: ['PROCESS.STATE_CHANGED', 'TASK.STATE_CHANGED'],
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

export const TaskElementValueDocumentItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskElementValueDocumentItem',
    modelProperties: {
      id: {
        serializedName: 'id',
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
      name: {
        serializedName: 'name',
        type: {
          name: 'String',
        },
      },
      contentPath: {
        serializedName: 'contentPath',
        type: {
          name: 'String',
        },
      },
      contentType: {
        serializedName: 'contentType',
        type: {
          name: 'String',
        },
      },
      contentLength: {
        serializedName: 'contentLength',
        type: {
          name: 'Number',
        },
      },
    },
  },
}

export const TaskElementValuePrincipalItem: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'TaskElementValuePrincipalItem',
    modelProperties: {
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

export const Authentication: coreClient.CompositeMapper = {
  serializedName: 'AUTHENTICATION',
  type: {
    name: 'Composite',
    className: 'Authentication',
    uberParent: 'AbstractAudited',
    polymorphicDiscriminator: AbstractAudited.type.polymorphicDiscriminator,
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
          allowedValues: ['ENGINE', 'ENGINE_TOKEN', 'ENGINE_CERTIFICATE'],
        },
      },
      token: {
        serializedName: 'token',
        type: {
          name: 'String',
        },
      },
      expiredAt: {
        serializedName: 'expiredAt',
        type: {
          name: 'String',
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

export const ProcessPageItem: coreClient.CompositeMapper = {
  serializedName: 'PROCESS_PAGE_ITEM',
  type: {
    name: 'Composite',
    className: 'ProcessPageItem',
    uberParent: 'AbstractAudited',
    polymorphicDiscriminator: AbstractAudited.type.polymorphicDiscriminator,
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      subject: {
        constraints: {
          MaxLength: 255,
          MinLength: 1,
        },
        serializedName: 'subject',
        type: {
          name: 'String',
        },
      },
      state: {
        serializedName: 'state',
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
      elementValues: {
        serializedName: 'elementValues',
        type: {
          name: 'Dictionary',
          value: {
            type: {
              name: 'Sequence',
              element: {
                type: { name: 'Composite', className: 'ProcessElementValue' },
              },
            },
          },
        },
      },
      initiator: {
        serializedName: 'initiator',
        type: {
          name: 'Composite',
          className: 'Principal',
        },
      },
    },
  },
}

export const Process: coreClient.CompositeMapper = {
  serializedName: 'PROCESS',
  type: {
    name: 'Composite',
    className: 'Process',
    uberParent: 'AbstractAudited',
    polymorphicDiscriminator: AbstractAudited.type.polymorphicDiscriminator,
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      subject: {
        constraints: {
          MaxLength: 255,
          MinLength: 1,
        },
        serializedName: 'subject',
        type: {
          name: 'String',
        },
      },
      state: {
        serializedName: 'state',
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
      elementValues: {
        serializedName: 'elementValues',
        type: {
          name: 'Dictionary',
          value: {
            type: {
              name: 'Sequence',
              element: {
                type: { name: 'Composite', className: 'ProcessElementValue' },
              },
            },
          },
        },
      },
      initiator: {
        serializedName: 'initiator',
        type: {
          name: 'Composite',
          className: 'Principal',
        },
      },
      relatedProcess: {
        serializedName: 'relatedProcess',
        type: {
          name: 'Composite',
          className: 'RelatedProcess',
        },
      },
    },
  },
}

export const TaskPageItem: coreClient.CompositeMapper = {
  serializedName: 'TASK_PAGE_ITEM',
  type: {
    name: 'Composite',
    className: 'TaskPageItem',
    uberParent: 'AbstractAudited',
    polymorphicDiscriminator: AbstractAudited.type.polymorphicDiscriminator,
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      state: {
        serializedName: 'state',
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
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      elementValues: {
        serializedName: 'elementValues',
        type: {
          name: 'Dictionary',
          value: {
            type: {
              name: 'Sequence',
              element: {
                type: { name: 'Composite', className: 'TaskElementValue' },
              },
            },
          },
        },
      },
      jsonFormsValue: {
        serializedName: 'jsonFormsValue',
        type: {
          name: 'Composite',
          className: 'JsonFormsValue',
        },
      },
      owner: {
        serializedName: 'owner',
        type: {
          name: 'Composite',
          className: 'Principal',
        },
      },
    },
  },
}

export const Task: coreClient.CompositeMapper = {
  serializedName: 'Task',
  type: {
    name: 'Composite',
    className: 'Task',
    uberParent: 'AbstractAudited',
    polymorphicDiscriminator: AbstractAudited.type.polymorphicDiscriminator,
    modelProperties: {
      ...AbstractAudited.type.modelProperties,
      id: {
        serializedName: 'id',
        type: {
          name: 'Uuid',
        },
      },
      state: {
        serializedName: 'state',
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
      processId: {
        serializedName: 'processId',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      elementValues: {
        serializedName: 'elementValues',
        type: {
          name: 'Dictionary',
          value: {
            type: {
              name: 'Sequence',
              element: {
                type: { name: 'Composite', className: 'TaskElementValue' },
              },
            },
          },
        },
      },
      jsonFormsValue: {
        serializedName: 'jsonFormsValue',
        type: {
          name: 'Composite',
          className: 'JsonFormsValue',
        },
      },
      logs: {
        serializedName: 'logs',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'Log',
            },
          },
        },
      },
      owner: {
        serializedName: 'owner',
        type: {
          name: 'Composite',
          className: 'Principal',
        },
      },
    },
  },
}

export const Worker: coreClient.CompositeMapper = {
  serializedName: 'WORKER',
  type: {
    name: 'Composite',
    className: 'Worker',
    uberParent: 'AbstractAudited',
    polymorphicDiscriminator: AbstractAudited.type.polymorphicDiscriminator,
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
    },
  },
}

export const PrincipalPage: coreClient.CompositeMapper = {
  serializedName: 'PRINCIPAL_PAGE',
  type: {
    name: 'Composite',
    className: 'PrincipalPage',
    uberParent: 'Page',
    polymorphicDiscriminator: Page.type.polymorphicDiscriminator,
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
              className: 'Principal',
            },
          },
        },
      },
    },
  },
}

export const ProcessPage: coreClient.CompositeMapper = {
  serializedName: 'PROCESS_PAGE',
  type: {
    name: 'Composite',
    className: 'ProcessPage',
    uberParent: 'Page',
    polymorphicDiscriminator: Page.type.polymorphicDiscriminator,
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

export const TaskPage: coreClient.CompositeMapper = {
  serializedName: 'TASK_PAGE',
  type: {
    name: 'Composite',
    className: 'TaskPage',
    uberParent: 'Page',
    polymorphicDiscriminator: Page.type.polymorphicDiscriminator,
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
              className: 'TaskPageItem',
            },
          },
        },
      },
    },
  },
}

export const ProcessElementValueString: coreClient.CompositeMapper = {
  serializedName: 'STRING',
  type: {
    name: 'Composite',
    className: 'ProcessElementValueString',
    uberParent: 'ProcessElementValue',
    polymorphicDiscriminator: ProcessElementValue.type.polymorphicDiscriminator,
    modelProperties: {
      ...ProcessElementValue.type.modelProperties,
      value: {
        serializedName: 'value',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const ProcessElementValueNumber: coreClient.CompositeMapper = {
  serializedName: 'NUMBER',
  type: {
    name: 'Composite',
    className: 'ProcessElementValueNumber',
    uberParent: 'ProcessElementValue',
    polymorphicDiscriminator: ProcessElementValue.type.polymorphicDiscriminator,
    modelProperties: {
      ...ProcessElementValue.type.modelProperties,
      value: {
        serializedName: 'value',
        type: {
          name: 'Number',
        },
      },
    },
  },
}

export const TaskElementValueString: coreClient.CompositeMapper = {
  serializedName: 'STRING',
  type: {
    name: 'Composite',
    className: 'TaskElementValueString',
    uberParent: 'TaskElementValue',
    polymorphicDiscriminator: TaskElementValue.type.polymorphicDiscriminator,
    modelProperties: {
      ...TaskElementValue.type.modelProperties,
      value: {
        serializedName: 'value',
        type: {
          name: 'String',
        },
      },
    },
  },
}

export const TaskElementValueNumber: coreClient.CompositeMapper = {
  serializedName: 'NUMBER',
  type: {
    name: 'Composite',
    className: 'TaskElementValueNumber',
    uberParent: 'TaskElementValue',
    polymorphicDiscriminator: TaskElementValue.type.polymorphicDiscriminator,
    modelProperties: {
      ...TaskElementValue.type.modelProperties,
      value: {
        serializedName: 'value',
        type: {
          name: 'Number',
        },
      },
    },
  },
}

export const TaskElementValueObject: coreClient.CompositeMapper = {
  serializedName: 'OBJECT',
  type: {
    name: 'Composite',
    className: 'TaskElementValueObject',
    uberParent: 'TaskElementValue',
    polymorphicDiscriminator: TaskElementValue.type.polymorphicDiscriminator,
    modelProperties: {
      ...TaskElementValue.type.modelProperties,
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

export const TaskElementValueDocument: coreClient.CompositeMapper = {
  serializedName: 'DOCUMENT',
  type: {
    name: 'Composite',
    className: 'TaskElementValueDocument',
    uberParent: 'TaskElementValue',
    polymorphicDiscriminator: TaskElementValue.type.polymorphicDiscriminator,
    modelProperties: {
      ...TaskElementValue.type.modelProperties,
      value: {
        serializedName: 'value',
        type: {
          name: 'Composite',
          className: 'TaskElementValueDocumentItem',
        },
      },
    },
  },
}

export const TaskElementValuePrincipal: coreClient.CompositeMapper = {
  serializedName: 'PRINCIPAL',
  type: {
    name: 'Composite',
    className: 'TaskElementValuePrincipal',
    uberParent: 'TaskElementValue',
    polymorphicDiscriminator: TaskElementValue.type.polymorphicDiscriminator,
    modelProperties: {
      ...TaskElementValue.type.modelProperties,
      value: {
        serializedName: 'value',
        type: {
          name: 'Composite',
          className: 'TaskElementValuePrincipalItem',
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

export const WebhookEventTaskStateChanged: coreClient.CompositeMapper = {
  serializedName: 'TASK.STATE_CHANGED',
  type: {
    name: 'Composite',
    className: 'WebhookEventTaskStateChanged',
    uberParent: 'WebhookEvent',
    polymorphicDiscriminator: WebhookEvent.type.polymorphicDiscriminator,
    modelProperties: {
      ...WebhookEvent.type.modelProperties,
      data: {
        serializedName: 'data',
        type: {
          name: 'Composite',
          className: 'WebhookEventTaskStateChangedData',
        },
      },
    },
  },
}

export const discriminators = {
  AbstractAudited,
  Page,
  ProcessElementValue,
  TaskElementValue,
  WebhookEvent,
  'AbstractAudited.AUTHENTICATION': Authentication,
  'AbstractAudited.PROCESS_PAGE_ITEM': ProcessPageItem,
  'AbstractAudited.PROCESS': Process,
  'AbstractAudited.TASK_PAGE_ITEM': TaskPageItem,
  'AbstractAudited.TASK': Task,
  'AbstractAudited.WORKER': Worker,
  'Page.PRINCIPAL_PAGE': PrincipalPage,
  'Page.PROCESS_PAGE': ProcessPage,
  'Page.TASK_PAGE': TaskPage,
  'ProcessElementValue.STRING': ProcessElementValueString,
  'ProcessElementValue.NUMBER': ProcessElementValueNumber,
  'TaskElementValue.STRING': TaskElementValueString,
  'TaskElementValue.NUMBER': TaskElementValueNumber,
  'TaskElementValue.OBJECT': TaskElementValueObject,
  'TaskElementValue.DOCUMENT': TaskElementValueDocument,
  'TaskElementValue.PRINCIPAL': TaskElementValuePrincipal,
  'WebhookEvent.PROCESS.STATE_CHANGED': WebhookEventProcessStateChanged,
  'WebhookEvent.TASK.STATE_CHANGED': WebhookEventTaskStateChanged,
}
