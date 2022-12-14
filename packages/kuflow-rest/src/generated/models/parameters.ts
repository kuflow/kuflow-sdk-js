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
import { OperationParameter, OperationQueryParameter, OperationURLParameter } from '@azure/core-client'

import {
  Authentication as AuthenticationMapper,
  Log as LogMapper,
  Process as ProcessMapper,
  ProcessChangeInitiatorCommand as ProcessChangeInitiatorCommandMapper,
  ProcessDeleteElementCommand as ProcessDeleteElementCommandMapper,
  ProcessSaveElementCommand as ProcessSaveElementCommandMapper,
  Task as TaskMapper,
  TaskAssignCommand as TaskAssignCommandMapper,
  TaskDeleteElementCommand as TaskDeleteElementCommandMapper,
  TaskDeleteElementValueDocumentCommand as TaskDeleteElementValueDocumentCommandMapper,
  TaskSaveElementCommand as TaskSaveElementCommandMapper,
} from '../models/mappers'

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

export const authentication: OperationParameter = {
  parameterPath: 'authentication',
  mapper: AuthenticationMapper,
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

export const type: OperationQueryParameter = {
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

export const process: OperationParameter = {
  parameterPath: 'process',
  mapper: ProcessMapper,
}

export const command: OperationParameter = {
  parameterPath: 'command',
  mapper: ProcessChangeInitiatorCommandMapper,
}

export const command1: OperationParameter = {
  parameterPath: 'command',
  mapper: ProcessSaveElementCommandMapper,
}

export const command2: OperationParameter = {
  parameterPath: 'command',
  mapper: ProcessDeleteElementCommandMapper,
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

export const state: OperationQueryParameter = {
  parameterPath: ['options', 'state'],
  mapper: {
    serializedName: 'state',
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

export const taskDefinitionCode: OperationQueryParameter = {
  parameterPath: ['options', 'taskDefinitionCode'],
  mapper: {
    serializedName: 'taskDefinitionCode',
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

export const task: OperationParameter = {
  parameterPath: 'task',
  mapper: TaskMapper,
}

export const activityToken: OperationQueryParameter = {
  parameterPath: ['options', 'activityToken'],
  mapper: {
    serializedName: 'activityToken',
    type: {
      name: 'String',
    },
  },
}

export const command3: OperationParameter = {
  parameterPath: 'command',
  mapper: TaskAssignCommandMapper,
}

export const command4: OperationParameter = {
  parameterPath: 'command',
  mapper: TaskSaveElementCommandMapper,
}

export const elementDefinitionCode: OperationQueryParameter = {
  parameterPath: 'elementDefinitionCode',
  mapper: {
    serializedName: 'elementDefinitionCode',
    required: true,
    type: {
      name: 'String',
    },
  },
}

export const elementValueId: OperationQueryParameter = {
  parameterPath: ['options', 'elementValueId'],
  mapper: {
    serializedName: 'elementValueId',
    type: {
      name: 'Uuid',
    },
  },
}

export const elementValueValid: OperationQueryParameter = {
  parameterPath: ['options', 'elementValueValid'],
  mapper: {
    defaultValue: true,
    serializedName: 'elementValueValid',
    type: {
      name: 'Boolean',
    },
  },
}

export const command5: OperationParameter = {
  parameterPath: 'command',
  mapper: TaskDeleteElementCommandMapper,
}

export const command6: OperationParameter = {
  parameterPath: 'command',
  mapper: TaskDeleteElementValueDocumentCommandMapper,
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

export const documentId: OperationQueryParameter = {
  parameterPath: 'documentId',
  mapper: {
    serializedName: 'documentId',
    required: true,
    type: {
      name: 'Uuid',
    },
  },
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

export const log: OperationParameter = {
  parameterPath: 'log',
  mapper: LogMapper,
}
