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
import { KuFlowRestClient, type ProcessItemCreateParams } from '@kuflow/kuflow-rest'

describe('E2E Test', () => {
  test.skip('test', async () => {
    logger.setLogLevel('info')

    const kuFlowRestClient = new KuFlowRestClient(
      {
        clientId: 'APPLICATION_ID',
        clientSecret: 'APPLICATION_SECRET',
      },
      {
        endpoint: 'http://localhost:8080/apis/external',
        allowInsecureConnection: true,
      },
    )

    const authentication = await kuFlowRestClient.authenticationOperations.createAuthentication({
      type: 'ENGINE_CERTIFICATE',
    })

    console.log(authentication)

    const process = await kuFlowRestClient.processOperations.createProcess({
      id: '4a82baf2-2df1-4ecf-a3c4-a046c071ecb0',
      processDefinitionId: 'be35212b-deb8-4719-a10d-b8550219d156',
    })

    console.log(process)

    const processItemParams: ProcessItemCreateParams = {
      id: 'a883aed1-815f-4b55-9bdd-6ddae1cc31df',
      processId: process.id,
      type: 'TASK',
      task: {
        taskDefinitionCode: 'TASK_0001',
        data: {
          value: {
            ss: [2, 5],
          },
        },
      },
    }
    const processItem = await kuFlowRestClient.processItemOperations.createProcessItem(processItemParams)

    await kuFlowRestClient.processItemOperations.claimProcessItemTask(processItem.id)

    // const command1: TaskSaveElementCommand = {
    //   elementDefinitionCode: 'TEXT_001',
    // }
    // TaskSaveElementCommandUtils.setElementValueAsString(command1, 'Value 1')
    // await kuFlowRestClient.taskOperations.actionsTaskSaveElement(taskCreated.id, command1)
    //
    // const command2: TaskSaveElementCommand = {
    //   elementDefinitionCode: 'TEXT_002',
    // }
    // TaskSaveElementCommandUtils.setElementValueAsStringList(command2, ['Value 1', 'Value 2'])
    // await kuFlowRestClient.taskOperations.actionsTaskSaveElement(taskCreated.id, command2)
    //
    // const command3: TaskSaveElementCommand = {
    //   elementDefinitionCode: 'NUMBER_001',
    // }
    // TaskSaveElementCommandUtils.setElementValueAsNumber(command3, 50)
    // await kuFlowRestClient.taskOperations.actionsTaskSaveElement(taskCreated.id, command3)
    //
    // const command4: TaskSaveElementValueDocumentCommand = {
    //   elementDefinitionCode: 'DOC_001',
    // }
    // const document: Document = {
    //   fileName: 'bugs-bunny.png',
    //   contentType: 'image/png',
    //   fileContent: fs.createReadStream('/Users/kuflow/Downloads/bugs-bunny.png'),
    // }
    // const elementDocument = await kuFlowRestClient.taskOperations.actionsTaskSaveElementValueDocument(
    //   taskCreated.id,
    //   command4,
    //   document,
    // )
    // if (elementDocument.id == null) {
    //   return
    // }

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
    // console.log(elementDocument)
  })
})
