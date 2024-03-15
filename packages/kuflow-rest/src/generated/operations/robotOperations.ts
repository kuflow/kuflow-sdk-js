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
import * as coreClient from '@azure/core-client'

import { type KuFlowRestClientGenerated } from '../kuFlowRestClientGenerated'
import {
  type RobotActionsRobotDownloadAssetOptionalParams,
  type RobotActionsRobotDownloadAssetResponse,
  type RobotActionsRobotDownloadSourceCodeOptionalParams,
  type RobotActionsRobotDownloadSourceCodeResponse,
  type RobotAssetArchitecture,
  type RobotAssetPlatform,
  type RobotAssetType,
  type RobotFindRobotsOptionalParams,
  type RobotFindRobotsResponse,
  type RobotRetrieveRobotOptionalParams,
  type RobotRetrieveRobotResponse,
} from '../models'
import * as Mappers from '../models/mappers'
import * as Parameters from '../models/parameters'
import { type RobotOperations } from '../operationsInterfaces'

/** Class containing RobotOperations operations. */
export class RobotOperationsImpl implements RobotOperations {
  private readonly client: KuFlowRestClientGenerated

  /**
   * Initialize a new instance of the class RobotOperations class.
   * @param client Reference to the service client
   */
  constructor(client: KuFlowRestClientGenerated) {
    this.client = client
  }

  /**
   * List all the Robots that have been created and the credentials has access.
   *
   * Available sort query values: createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  async findRobots(options?: RobotFindRobotsOptionalParams): Promise<RobotFindRobotsResponse> {
    return await this.client.sendOperationRequest({ options }, findRobotsOperationSpec)
  }

  /**
   * Returns the requested Robot when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async retrieveRobot(id: string, options?: RobotRetrieveRobotOptionalParams): Promise<RobotRetrieveRobotResponse> {
    return await this.client.sendOperationRequest({ id, options }, retrieveRobotOperationSpec)
  }

  /**
   * Given a robot, download the source code.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  async actionsRobotDownloadSourceCode(
    id: string,
    options?: RobotActionsRobotDownloadSourceCodeOptionalParams,
  ): Promise<RobotActionsRobotDownloadSourceCodeResponse> {
    return await this.client.sendOperationRequest({ id, options }, actionsRobotDownloadSourceCodeOperationSpec)
  }

  /**
   * Given a robot, download the requested asset.
   * @param id The resource ID.
   * @param typeParam The asset type.
   * @param version The asset version.
   * @param platform The asset platform.
   * @param architecture The asset platform architecture.
   * @param options The options parameters.
   */
  async actionsRobotDownloadAsset(
    id: string,
    typeParam: RobotAssetType,
    version: string,
    platform: RobotAssetPlatform,
    architecture: RobotAssetArchitecture,
    options?: RobotActionsRobotDownloadAssetOptionalParams,
  ): Promise<RobotActionsRobotDownloadAssetResponse> {
    return await this.client.sendOperationRequest(
      { id, typeParam, version, platform, architecture, options },
      actionsRobotDownloadAssetOperationSpec,
    )
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false)

const findRobotsOperationSpec: coreClient.OperationSpec = {
  path: '/robots',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.RobotPage,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.size, Parameters.page, Parameters.sort, Parameters.tenantId, Parameters.filterContext],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
}
const retrieveRobotOperationSpec: coreClient.OperationSpec = {
  path: '/robots/{id}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.Robot,
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer,
}
const actionsRobotDownloadSourceCodeOperationSpec: coreClient.OperationSpec = {
  path: '/robots/{id}/~actions/download-source-code',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: {
        type: { name: 'Stream' },
        serializedName: 'parsedResponse',
      },
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept2],
  serializer,
}
const actionsRobotDownloadAssetOperationSpec: coreClient.OperationSpec = {
  path: '/robots/{id}/~actions/download-asset',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: {
        type: { name: 'Stream' },
        serializedName: 'parsedResponse',
      },
    },
    default: {
      bodyMapper: Mappers.DefaultError,
    },
  },
  queryParameters: [Parameters.typeParam1, Parameters.version, Parameters.platform, Parameters.architecture],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept2],
  serializer,
}
