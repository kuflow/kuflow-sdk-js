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
import {
  type RobotAssetArchitecture,
  type RobotAssetPlatform,
  type RobotAssetType,
  type RobotDownloadRobotAssetOptionalParams,
  type RobotDownloadRobotAssetResponse,
  type RobotDownloadRobotSourceCodeOptionalParams,
  type RobotDownloadRobotSourceCodeResponse,
  type RobotFindRobotsOptionalParams,
  type RobotFindRobotsResponse,
  type RobotRetrieveRobotOptionalParams,
  type RobotRetrieveRobotResponse,
} from '../models'

/** Interface representing a RobotOperations. */
export interface RobotOperations {
  /**
   * List all the Robots that have been created and the credentials has access.
   *
   * Available sort query values: createdAt, lastModifiedAt
   *
   * @param options The options parameters.
   */
  findRobots: (options?: RobotFindRobotsOptionalParams) => Promise<RobotFindRobotsResponse>
  /**
   * Returns the requested Robot when has access to do it.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  retrieveRobot: (id: string, options?: RobotRetrieveRobotOptionalParams) => Promise<RobotRetrieveRobotResponse>
  /**
   * Given a robot, download the source code.
   * @param id The resource ID.
   * @param options The options parameters.
   */
  downloadRobotSourceCode: (
    id: string,
    options?: RobotDownloadRobotSourceCodeOptionalParams,
  ) => Promise<RobotDownloadRobotSourceCodeResponse>
  /**
   * Given a robot, download the requested asset.
   * @param id The resource ID.
   * @param typeParam The asset type.
   * @param version The asset version.
   * @param platform The asset platform.
   * @param architecture The asset platform architecture.
   * @param options The options parameters.
   */
  downloadRobotAsset: (
    id: string,
    typeParam: RobotAssetType,
    version: string,
    platform: RobotAssetPlatform,
    architecture: RobotAssetArchitecture,
    options?: RobotDownloadRobotAssetOptionalParams,
  ) => Promise<RobotDownloadRobotAssetResponse>
}
