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

import type { OperationParameter, OperationQueryParameter, OperationURLParameter } from '@azure/core-client'

import {
  AuthenticationCreateParams as AuthenticationCreateParamsMapper,
  ProcessChangeInitiatorParams as ProcessChangeInitiatorParamsMapper,
  ProcessCreateParams as ProcessCreateParamsMapper,
  ProcessEntityUpdateParams as ProcessEntityUpdateParamsMapper,
  ProcessItemCreateParams as ProcessItemCreateParamsMapper,
  ProcessItemTaskAppendLogParams as ProcessItemTaskAppendLogParamsMapper,
  ProcessItemTaskAssignParams as ProcessItemTaskAssignParamsMapper,
  ProcessItemTaskDataUpdateParams as ProcessItemTaskDataUpdateParamsMapper,
  ProcessMetadataUpdateParams as ProcessMetadataUpdateParamsMapper,
  WorkerCreateParams as WorkerCreateParamsMapper,
} from '../models/mappers'

export const contentType: OperationParameter = {
  parameterPath: ['options', 'contentType'],
  mapper: {
    defaultValue: 'application/json',
    isConstant: true,
    serializedName: 'Content-Type',
    type: {
      name: 'String',
    },
  },
}

export const authenticationCreateParams: OperationParameter = {
  parameterPath: 'authenticationCreateParams',
  mapper: AuthenticationCreateParamsMapper,
}

export const accept: OperationParameter = {
  parameterPath: 'accept',
  mapper: {
    defaultValue: 'application/json',
    isConstant: true,
    serializedName: 'Accept',
    type: {
      name: 'String',
    },
  },
}

export const $host: OperationURLParameter = {
  parameterPath: '$host',
  mapper: {
    serializedName: '$host',
    required: true,
    type: {
      name: 'String',
    },
  },
  skipEncoding: true,
}

export const keyId: OperationURLParameter = {
  parameterPath: 'keyId',
  mapper: {
    serializedName: 'keyId',
    required: true,
    type: {
      name: 'String',
    },
  },
}

export const size: OperationQueryParameter = {
  parameterPath: ['options', 'size'],
  mapper: {
    defaultValue: 25,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 0,
    },
    serializedName: 'size',
    type: {
      name: 'Number',
    },
  },
}

export const page: OperationQueryParameter = {
  parameterPath: ['options', 'page'],
  mapper: {
    defaultValue: 0,
    constraints: {
      InclusiveMinimum: 0,
    },
    serializedName: 'page',
    type: {
      name: 'Number',
    },
  },
}

export const sort: OperationQueryParameter = {
  parameterPath: ['options', 'sort'],
  mapper: {
    serializedName: 'sort',
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'String',
        },
      },
    },
  },
  collectionFormat: 'Multi',
}

export const typeParam: OperationQueryParameter = {
  parameterPath: ['options', 'type'],
  mapper: {
    serializedName: 'type',
    type: {
      name: 'Enum',
      allowedValues: ['USER', 'APPLICATION', 'SYSTEM'],
    },
  },
}

export const groupId: OperationQueryParameter = {
  parameterPath: ['options', 'groupId'],
  mapper: {
    serializedName: 'groupId',
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'Uuid',
        },
      },
    },
  },
  collectionFormat: 'Multi',
}

export const tenantId: OperationQueryParameter = {
  parameterPath: ['options', 'tenantId'],
  mapper: {
    serializedName: 'tenantId',
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'Uuid',
        },
      },
    },
  },
  collectionFormat: 'Multi',
}

export const id: OperationURLParameter = {
  parameterPath: 'id',
  mapper: {
    serializedName: 'id',
    required: true,
    type: {
      name: 'Uuid',
    },
  },
}

export const principalId: OperationQueryParameter = {
  parameterPath: ['options', 'principalId'],
  mapper: {
    serializedName: 'principalId',
    type: {
      name: 'Uuid',
    },
  },
  collectionFormat: 'Multi',
}

export const email: OperationQueryParameter = {
  parameterPath: ['options', 'email'],
  mapper: {
    serializedName: 'email',
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'String',
        },
      },
    },
  },
  collectionFormat: 'Multi',
}

export const processCreateParams: OperationParameter = {
  parameterPath: 'processCreateParams',
  mapper: ProcessCreateParamsMapper,
}

export const processChangeInitiatorParams: OperationParameter = {
  parameterPath: 'processChangeInitiatorParams',
  mapper: ProcessChangeInitiatorParamsMapper,
}

export const contentType1: OperationParameter = {
  parameterPath: ['options', 'contentType'],
  mapper: {
    defaultValue: 'application/octet-stream',
    isConstant: true,
    serializedName: 'Content-Type',
    type: {
      name: 'String',
    },
  },
}

export const file: OperationParameter = {
  parameterPath: 'file',
  mapper: {
    serializedName: 'file',
    required: true,
    type: {
      name: 'Stream',
    },
  },
}

export const accept1: OperationParameter = {
  parameterPath: 'accept',
  mapper: {
    defaultValue: 'application/json',
    isConstant: true,
    serializedName: 'Accept',
    type: {
      name: 'String',
    },
  },
}

export const fileContentType: OperationQueryParameter = {
  parameterPath: 'fileContentType',
  mapper: {
    serializedName: 'fileContentType',
    required: true,
    type: {
      name: 'String',
    },
  },
}

export const fileName: OperationQueryParameter = {
  parameterPath: 'fileName',
  mapper: {
    serializedName: 'fileName',
    required: true,
    type: {
      name: 'String',
    },
  },
}

export const userActionValueId: OperationQueryParameter = {
  parameterPath: 'userActionValueId',
  mapper: {
    serializedName: 'userActionValueId',
    required: true,
    type: {
      name: 'Uuid',
    },
  },
}

export const processMetadataUpdateParams: OperationParameter = {
  parameterPath: 'processMetadataUpdateParams',
  mapper: ProcessMetadataUpdateParamsMapper,
}

export const contentType2: OperationParameter = {
  parameterPath: ['options', 'contentType'],
  mapper: {
    defaultValue: 'application/json-patch+json',
    isConstant: true,
    serializedName: 'Content-Type',
    type: {
      name: 'String',
    },
  },
}

export const jsonPatch: OperationParameter = {
  parameterPath: 'jsonPatch',
  mapper: {
    constraints: {
      MinItems: 1,
    },
    serializedName: 'jsonPatch',
    required: true,
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'Composite',
          className: 'JsonPatchOperation',
        },
      },
    },
  },
}

export const processEntityUpdateParams: OperationParameter = {
  parameterPath: 'processEntityUpdateParams',
  mapper: ProcessEntityUpdateParamsMapper,
}

export const accept2: OperationParameter = {
  parameterPath: 'accept',
  mapper: {
    defaultValue: 'application/octet-stream, application/json',
    isConstant: true,
    serializedName: 'Accept',
    type: {
      name: 'String',
    },
  },
}

export const documentUri: OperationQueryParameter = {
  parameterPath: 'documentUri',
  mapper: {
    serializedName: 'documentUri',
    required: true,
    type: {
      name: 'String',
    },
  },
}

export const processId: OperationQueryParameter = {
  parameterPath: ['options', 'processId'],
  mapper: {
    serializedName: 'processId',
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'Uuid',
        },
      },
    },
  },
  collectionFormat: 'Multi',
}

export const typeParam1: OperationQueryParameter = {
  parameterPath: ['options', 'type'],
  mapper: {
    serializedName: 'type',
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'Enum',
          allowedValues: ['TASK', 'MESSAGE', 'THREAD'],
        },
      },
    },
  },
  collectionFormat: 'Multi',
}

export const taskState: OperationQueryParameter = {
  parameterPath: ['options', 'taskState'],
  mapper: {
    serializedName: 'taskState',
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'Enum',
          allowedValues: ['READY', 'CLAIMED', 'COMPLETED', 'CANCELLED'],
        },
      },
    },
  },
  collectionFormat: 'Multi',
}

export const processItemDefinitionCode: OperationQueryParameter = {
  parameterPath: ['options', 'processItemDefinitionCode'],
  mapper: {
    serializedName: 'processItemDefinitionCode',
    type: {
      name: 'Sequence',
      element: {
        type: {
          name: 'String',
        },
      },
    },
  },
  collectionFormat: 'Multi',
}

export const processItemCreateParams: OperationParameter = {
  parameterPath: 'processItemCreateParams',
  mapper: ProcessItemCreateParamsMapper,
}

export const processItemTaskAssignParams: OperationParameter = {
  parameterPath: 'processItemTaskAssignParams',
  mapper: ProcessItemTaskAssignParamsMapper,
}

export const processItemTaskAppendLogParams: OperationParameter = {
  parameterPath: 'processItemTaskAppendLogParams',
  mapper: ProcessItemTaskAppendLogParamsMapper,
}

export const processItemTaskDataUpdateParams: OperationParameter = {
  parameterPath: 'processItemTaskDataUpdateParams',
  mapper: ProcessItemTaskDataUpdateParamsMapper,
}

export const accept3: OperationParameter = {
  parameterPath: 'accept',
  mapper: {
    defaultValue: 'application/pdf, application/zip, application/json',
    isConstant: true,
    serializedName: 'Accept',
    type: {
      name: 'String',
    },
  },
}

export const propertyPath: OperationQueryParameter = {
  parameterPath: 'propertyPath',
  mapper: {
    serializedName: 'propertyPath',
    required: true,
    type: {
      name: 'String',
    },
  },
}

export const workerCreateParams: OperationParameter = {
  parameterPath: 'workerCreateParams',
  mapper: WorkerCreateParamsMapper,
}

export const filterContext: OperationQueryParameter = {
  parameterPath: ['options', 'filterContext'],
  mapper: {
    serializedName: 'filterContext',
    type: {
      name: 'Enum',
      allowedValues: ['READY', 'DEFAULT'],
    },
  },
  collectionFormat: 'CSV',
}

export const typeParam2: OperationQueryParameter = {
  parameterPath: 'typeParam',
  mapper: {
    serializedName: 'type',
    required: true,
    type: {
      name: 'Enum',
      allowedValues: ['PYTHON', 'PYTHON_PIP', 'NODEJS'],
    },
  },
}

export const version: OperationQueryParameter = {
  parameterPath: 'version',
  mapper: {
    serializedName: 'version',
    required: true,
    type: {
      name: 'String',
    },
  },
}

export const platform: OperationQueryParameter = {
  parameterPath: 'platform',
  mapper: {
    serializedName: 'platform',
    required: true,
    type: {
      name: 'Enum',
      allowedValues: ['WINDOWS', 'MAC_OS', 'LINUX'],
    },
  },
}

export const architecture: OperationQueryParameter = {
  parameterPath: 'architecture',
  mapper: {
    serializedName: 'architecture',
    required: true,
    type: {
      name: 'Enum',
      allowedValues: ['X86_32', 'X86_64'],
    },
  },
}
