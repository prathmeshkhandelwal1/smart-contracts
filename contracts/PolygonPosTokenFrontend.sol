/* SPDX-License-Identifier: apache-2.0 */
/**
 * Copyright 2022 Monerium ehf.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

pragma solidity 0.8.11;

import "./TokenFrontend.sol";
import "./IPolygonPosChildToken.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title PolygonPosTokenFrontend
 * @notice This contract is to be deployed on Matic Polygon network.
 * @dev This contract implements a token forwarder.
 * The token frontend is [ERC20 and ERC677] compliant and forwards
 * standard methods to a controller. The primary function is to allow
 * for a statically deployed contract for users to interact with while
 * simultaneously allow the controllers to be upgraded when bugs are
 * discovered or new functionality needs to be added.
 * This token implement function for the Matic Polygon Brige.
 */
abstract contract PolygonPosTokenFrontend is TokenFrontend, IPolygonPosChildToken {
  /**
   * @dev Contract constructor.
   * @notice The contract is an abstract contract as a result of the internal modifier.
   * @param name_ Token name.
   * @param symbol_ Token symbol.
   * @param ticker_ 3 letter currency ticker.
   */
  constructor(string memory name_, string memory symbol_, bytes3 ticker_)
    TokenFrontend(name_, symbol_, ticker_)
    {
      _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
  
  function burn(uint256 amount)
    override
    external
  {
    controller.burnFrom(msg.sender, amount);
    emit Transfer(msg.sender, address(0x0), amount);
  }
}
