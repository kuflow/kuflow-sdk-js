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
  KuFlowRestClientGenerated,
  RobotDownloadRobotAssetOptionalParams,
  RobotDownloadRobotAssetResponse,
  RobotDownloadRobotSourceCodeOptionalParams,
  RobotDownloadRobotSourceCodeResponse,
  RobotFindRobotsResponse,
  RobotOperations as RobotOperationsGenerated,
  RobotRetrieveRobotOptionalParams,
  RobotRetrieveRobotResponse,
} from '../generated'
import type { RobotDownloadRobotAssetParams, RobotFindRobotExtParams } from '../models'

/** Class containing RobotOperations operations. */
export class RobotOperations {
  private readonly robotOperationsGenerated: RobotOperationsGenerated

  /**
   * Initialize a new instance of the class RobotOperations class.
   * @param clientGenerated Reference to the service client
   */
  public constructor(clientGenerated: KuFlowRestClientGenerated) {
    this.robotOperationsGenerated = clientGenerated.robotOperations
  }

  /**
   * List all the Robots that have been created and the credentials has access.
   *
   * Available sort query values: createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  public async findRobots(options?: RobotFindRobotExtParams): Promise<RobotFindRobotsResponse> {
    const { sort, tenantId, ...optionsRest } = options ?? {}

    return await this.robotOperationsGenerated.findRobots({
      ...optionsRest,
      sort: typeof sort === 'string' ? [sort] : sort,
      tenantId: typeof tenantId === 'string' ? [tenantId] : tenantId,
    })
  }

  /**
   * Returns the requested Robot when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async retrieveRobot(
    id: string,
    options?: RobotRetrieveRobotOptionalParams,
  ): Promise<RobotRetrieveRobotResponse> {
    return await this.robotOperationsGenerated.retrieveRobot(id, options)
  }

  /**
   * Given a robot, download the source code.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  public async downloadRobotSourceCode(
    id: string,
    options?: RobotDownloadRobotSourceCodeOptionalParams,
  ): Promise<RobotDownloadRobotSourceCodeResponse> {
    return await this.robotOperationsGenerated.downloadRobotSourceCode(id, options)
  }

  /**
   * Given a robot, download the requested asset.
   * @param id The resource ID.
   * @param robotDownloadRobotAssetParams Download params
   * @param options The options parameters.
   */
  public async downloadRobotAsset(
    id: string,
    robotDownloadRobotAssetParams: RobotDownloadRobotAssetParams,
    options?: RobotDownloadRobotAssetOptionalParams,
  ): Promise<RobotDownloadRobotAssetResponse> {
    return await this.robotOperationsGenerated.downloadRobotAsset(
      id,
      robotDownloadRobotAssetParams.type,
      robotDownloadRobotAssetParams.version,
      robotDownloadRobotAssetParams.platform,
      robotDownloadRobotAssetParams.architecture,
      options,
    )
  }
}
