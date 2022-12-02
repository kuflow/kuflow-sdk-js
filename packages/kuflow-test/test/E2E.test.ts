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
import * as logger from '@azure/logger'
import { describe, test } from '@jest/globals'
import { Document, KuFlowRestClient, Process, Task, TaskSaveElementValueDocumentCommand } from '@kuflow/kuflow-rest'
import * as fs from 'fs'

describe('E2E Test', () => {
  test.skip('test', async () => {
    logger.setLogLevel('info')

    const kuFlowRestClient = new KuFlowRestClient(
      {
        clientId: 'APPLICATION_ID',
        clientSecret: 'APPLICATION_SECRET',
      },
      {
        endpoint: 'http://localhost:8080/apis/external/v2022-10-08',
        allowInsecureConnection: true,
      },
    )

    const process: Process = {
      objectType: 'PROCESS',
      id: '4a82baf2-2df1-4ecf-a3c4-a046c071ecb0',
      processDefinition: {
        id: 'be35212b-deb8-4719-a10d-b8550219d156',
      },
    }
    const processCreated = await kuFlowRestClient.processOperations.createProcess(process)
    if (processCreated.id == null) {
      return
    }

    console.log(processCreated)

    const task: Task = {
      objectType: 'TASK',
      id: 'a883aed1-815f-4b55-9bdd-6ddae1cc31df',
      processId: processCreated.id,
      taskDefinition: {
        code: 'TASK_0001',
      },
      elementValues: {
        ss: [
          {
            type: 'NUMBER',
            value: 2,
          },
          {
            type: 'NUMBER',
            value: 5,
          },
        ],
      },
    }
    const taskCreated = await kuFlowRestClient.taskOperations.createTask(task)
    if (taskCreated.id == null) {
      return
    }

    // await kuflowClient.taskOperations.actionsTaskClaim(taskCreated.id)

    // const command1: TaskSaveElementCommand = {
    //   elementDefinitionCode: 'TEXT_001',
    //   values: [{
    //     type: "STRING",
    //     value: "Valor del bueno"
    //   }]
    // }
    // await kuflowClient.taskOperations.actionsTaskSaveElement(taskCreated.id, command1)
    //
    // const command2: TaskSaveElementCommand = {
    //   elementDefinitionCode: 'TEXT_002',
    //   values: [{
    //     type: "STRING",
    //     value: "Valor del bueno uno"
    //   }, {
    //     type: "STRING",
    //     value: "Valor del bueno dos"
    //   }]
    // }
    // await kuflowClient.taskOperations.actionsTaskSaveElement(taskCreated.id, command2)
    //
    // const command3: TaskSaveElementCommand = {
    //   elementDefinitionCode: 'NUMBER_001',
    //   values: [{
    //     type: "NUMBER",
    //     value: 50
    //   }]
    // }
    // await kuflowClient.taskOperations.actionsTaskSaveElement(taskCreated.id, command3)

    const command4: TaskSaveElementValueDocumentCommand = {
      elementDefinitionCode: 'DOC_001',
    }
    const document: Document = {
      fileName: 'bugs-bunny.png',
      contentType: 'image/png',
      fileContent: fs.createReadStream('/Users/kuflow/Downloads/bugs-bunny.png'),
    }
    const elementDocument = await kuFlowRestClient.taskOperations.actionsTaskSaveElementValueDocument(
      taskCreated.id,
      command4,
      document,
    )
    if (elementDocument.id == null) {
      return
    }

    // if (!taskCreated.elementValues) {
    //   return
    // }
    //
    // const elementValueDocument = taskCreated.elementValues['DOC_001'][0] as TaskElementValueDocument
    // if (!elementValueDocument.value?.id) {
    //   return
    // }
    // const response = await kuFlowRestClient.taskOperations.actionsTaskDownloadElementValueDocument(taskCreated.id, elementValueDocument.value.id)
    //
    // const b = await kuFlowRestClient.taskOperations.findTasks({ processId: [ processCreated.id ]})
    // const b1 = await kuFlowRestClient.taskOperations.findTasks()
    //
    // console.log(b)
    console.log(elementDocument)
  })
})
