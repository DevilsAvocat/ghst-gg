//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../libraries/LibAppStorage.sol";



interface IAavegotchi{
        function getItemType(uint256 _itemId) external view returns (ItemType memory itemType_);
        
        function itemBalances(address _account) external view returns (ItemIdIO[] memory bals_);

}