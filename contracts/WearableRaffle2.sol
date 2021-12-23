//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC1155.sol";
import "./chainlink/LinkTokenInterface.sol";
import "./interfaces/IERC173.sol";
import "./interfaces/IERC165.sol";
import "./interfaces/IAavegotchi.sol";

import "./libraries/LibAppStorage.sol";
//import "@openzeppelin/contracts-upgradeable";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "hardhat/console.sol";


// All state variables are accessed through this struct
// To avoid name clashes and make clear a variable is a state variable
// state variable access starts with "s." which accesses variables in this struct
struct AppStorage {
    // IERC165
    mapping(bytes4 => bool) supportedInterfaces;
    Raffle[6] raffles;
    // Nonces for VRF keyHash from which randomness has been requested.
    // Must stay in sync with VRFCoordinator[_keyHash][this]
    // keyHash => nonce
    mapping(bytes32 => uint256) nonces;
    mapping(bytes32 => uint256) requestIdToRaffleId;
    bytes32 keyHash;
    uint96 fee;
    address contractOwner;
    IAavegotchi aavegotchiDiamond;


}

interface ERC20 {
    
    function balanceOf(address account) external view returns (uint256) ;
    
    function transfer(address recipient, uint256 amount) external returns (bool) ;
    
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    
    function approve(address spender, uint256 amount) external returns (bool);

    
}


struct Raffle {
    
    //an array of all the itemIds that have been entered
    uint256[] itemsEntered;
    
    //a mapping of who has entered what item
    mapping(address => uint256) entrantsMapping;
    address[] entrants;

    uint256 brsMultiplier;
  
    // vrf randomness
    uint256 randomNumber;
    // requested vrf random number
    bool randomNumberPending;
    
    bool raffleActive;
 
    
}

// The minimum rangeStart is 0
// The maximum rangeEnd is raffleItem.totalEntered
// rangeEnd - rangeStart == number of ticket entered for raffle item by a entrant entry
struct Entry {
    uint24 raffleItemIndex; // Which raffle item is entered into the raffleEnd
    // used to prevent users from claiming prizes more than once
    bool prizesClaimed;
    uint112 rangeStart; // Raffle number. Value is between 0 and raffleItem.totalEntered - 1
    uint112 rangeEnd; // Raffle number. Value is between 1 and raffleItem.totalEntered
}

struct RaffleItemPrize {
    address prizeAddress; // ERC1155 token contract
    uint96 prizeQuantity; // Number of ERC1155 tokens
    uint256 prizeId; // ERC1155 token type
}

// Ticket numbers are numbers between 0 and raffleItem.totalEntered - 1 inclusive.
struct RaffleItem {
    address ticketAddress; // ERC1155 token contract
    uint256 ticketId; // ERC1155 token type
    uint256 totalEntered; // Total number of ERC1155 tokens entered into raffle for this raffle item
    RaffleItemPrize[] raffleItemPrizes; // Prizes that can be won for this raffle item
}

contract RafflesContract is IERC173, IERC165, Initializable {
    // State variables are prefixed with s.
    AppStorage internal s;
    // Immutable values are prefixed with im_ to easily identify them in code
    LinkTokenInterface internal  im_link;
    address internal  im_vrfCoordinator;
    address internal  im_diamondAddress;
    bytes4 internal constant ERC1155_ACCEPTED = 0xf23a6e61; // Return value from `onERC1155Received` call if a contract accepts receipt (i.e `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`).
    mapping(address => bool) isAuthorized;

     function getCoordinator() public view returns(address){
         return im_vrfCoordinator;
     }

     modifier onlyOwner{
         require(msg.sender == s.contractOwner,"Failed: not contract owner");
         _;
     }

     modifier onlyAuthorized{
         require(isAuthorized[msg.sender] || msg.sender == s.contractOwner);
         _;
     }

     function getAuthorized(address _user) public view returns(bool){
         return isAuthorized[_user];
     }

     function setAuthorized(address _user) public onlyOwner{
         isAuthorized[_user] = true;
     }

     function removeAuthorized(address _user) public onlyOwner{
         isAuthorized[_user] = false;
     }
  
    function initialize (
        address _aavegotchiDiamond,
        address _contractOwner,
        address _vrfCoordinator,
        address _link,
        bytes32 _keyHash,
        uint256 _fee
    ) public initializer{
        s.contractOwner = _contractOwner;
        im_vrfCoordinator = _vrfCoordinator;
        im_link = LinkTokenInterface(_link);
        im_diamondAddress = _aavegotchiDiamond;
        s.keyHash = _keyHash; //0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        s.fee = uint96(_fee);
        s.aavegotchiDiamond = IAavegotchi(_aavegotchiDiamond);
        // adding ERC165 data
        s.supportedInterfaces[type(IERC165).interfaceId] = true;
        s.supportedInterfaces[type(IERC173).interfaceId] = true;
       
        s.raffles[0].brsMultiplier = 1;     //common
        s.raffles[1].brsMultiplier = 2;     //uncommon
        s.raffles[2].brsMultiplier = 5;     //rare
        s.raffles[3].brsMultiplier = 10;    //legendary
        s.raffles[4].brsMultiplier = 20;    //mythical
        s.raffles[5].brsMultiplier = 50;    //godlike
        
        for(uint256 i = 0; i < 6; i++){
            s.raffles[i].raffleActive = true;
        }

    }

    function supportsInterface(bytes4 _interfaceId) external view override returns (bool) {
        return s.supportedInterfaces[_interfaceId];
    }

    // VRF Functionality ////////////////////////////////////////////////////////////////
    function nonces(bytes32 _keyHash) external view returns (uint256 nonce_) {
        nonce_ = s.nonces[_keyHash];
    }

    /**
     * @notice requestRandomness initiates a request for VRF output given _seed
     *
     * @dev See "SECURITY CONSIDERATIONS" above for more information on _seed.
     *
     * @dev The fulfillRandomness method receives the output, once it's provided
     * @dev by the Oracle, and verified by the vrfCoordinator.
     *
     * @dev The _keyHash must already be registered with the VRFCoordinator, and
     * @dev the _fee must exceed the fee specified during registration of the
     * @dev _keyHash.
     *
     * @param _keyHash ID of public key against which randomness is generated
     * @param _fee The amount of LINK to send with the request
     * @param _seed seed mixed into the input of the VRF
     *
     * @return requestId unique ID for this request
     *
     * @dev The returned requestId can be used to distinguish responses to *
     * @dev concurrent requests. It is passed as the first argument to
     * @dev fulfillRandomness.
     */
    function requestRandomness(
        bytes32 _keyHash,
        uint256 _fee,
        uint256 _seed
    ) internal returns (bytes32 requestId) {
        im_link.transferAndCall(im_vrfCoordinator, _fee, abi.encode(_keyHash, _seed));
        // This is the seed passed to VRFCoordinator. The oracle will mix this with
        // the hash of the block containing this request to obtain the seed/input
        // which is finally passed to the VRF cryptographic machinery.
        // So the seed doesn't actually do anything and is left over from an old API.
        uint256 vRFSeed = makeVRFInputSeed(_keyHash, _seed, address(this), s.nonces[_keyHash]);
        // nonces[_keyHash] must stay in sync with
        // VRFCoordinator.nonces[_keyHash][this], which was incremented by the above
        // successful Link.transferAndCall (in VRFCoordinator.randomnessRequest).
        // This provides protection against the user repeating their input
        // seed, which would result in a predictable/duplicate output.
        s.nonces[_keyHash]++;
        return makeRequestId(_keyHash, vRFSeed);
    }

    /**
     * @notice returns the seed which is actually input to the VRF coordinator
     *
     * @dev To prevent repetition of VRF output due to repetition of the
     * @dev user-supplied seed, that seed is combined in a hash with the
     * @dev user-specific nonce, and the address of the consuming contract. The
     * @dev risk of repetition is mostly mitigated by inclusion of a blockhash in
     * @dev the final seed, but the nonce does protect against repetition in
     * @dev requests which are included in a single block.
     *
     * @param _userSeed VRF seed input provided by user
     * @param _requester Address of the requesting contract
     * @param _nonce User-specific nonce at the time of the request
     */
    function makeVRFInputSeed(
        bytes32 _keyHash,
        uint256 _userSeed,
        address _requester,
        uint256 _nonce
    ) internal pure returns (uint256) {
        return uint256(keccak256(abi.encode(_keyHash, _userSeed, _requester, _nonce)));
    }

    /**
     * @notice Returns the id for this request
     * @param _keyHash The serviceAgreement ID to be used for this request
     * @param _vRFInputSeed The seed to be passed directly to the VRF
     * @return The id for this request
     *
     * @dev Note that _vRFInputSeed is not the seed passed by the consuming
     * @dev contract, but the one generated by makeVRFInputSeed
     */
    function makeRequestId(bytes32 _keyHash, uint256 _vRFInputSeed) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_keyHash, _vRFInputSeed));
    }

    function doNothing() public{
        
    }

    function getFeeAmt() public view returns(uint96){
        return s.fee;
    }

    function setFeeAmt(uint96 _newFee) public onlyOwner{
        s.fee = _newFee;
    }

    function withDrawERC20(address _tokenAddress, uint256 _amount) public onlyOwner{
        ERC20 token = ERC20(_tokenAddress);
        //uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, _amount);
    }

    /*function setRandomNumber(uint256 _raffleId) public onlyOwner {
        uint256 raffleId = _raffleId;
        require(raffleId < s.raffles.length, "Raffle: Raffle does not exist");
        Raffle storage raffle = s.raffles[raffleId];
        require(raffle.randomNumber == 0, "Raffle: Random number already generated");
        s.raffles[raffleId].randomNumber = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        console.log("Random number is: ", s.raffles[raffleId].randomNumber);
        address winner = getWinner(_raffleId);
        console.log("Winner should be: ",winner);
        raffle.randomNumberPending = false;
    }*/

    function drawRandomNumber(uint256 _raffleId) public onlyAuthorized {
        require(_raffleId < s.raffles.length, "Raffle: Raffle does not exist");
        Raffle storage raffle = s.raffles[_raffleId];
        require(raffle.randomNumber == 0, "Raffle: Random number already generated");
        require(raffle.randomNumberPending == false || msg.sender == s.contractOwner, "Raffle: Random number is pending");
        raffle.randomNumberPending = true;
        // Use Chainlink VRF to generate random number
        //require(im_link.balanceOf(address(this)) >= s.fee, "Not enough LINK, need");
        bytes32 requestId = requestRandomness(s.keyHash, s.fee, 0);
        s.requestIdToRaffleId[requestId] = _raffleId;
        
        s.raffles[_raffleId].raffleActive = false;
    }

    function getRandomNumber(uint256 _raffleId) public view returns (uint256){
        return s.raffles[_raffleId].randomNumber;
    }

    // rawFulfillRandomness is called by VRFCoordinator when it receives a valid VRFproof.
    /**
     * @notice Callback function used by VRF Coordinator
     * @dev This is where you do something with randomness!
     * @dev The VRF Coordinator will only send this function verified responses.
     * @dev The VRF Coordinator will not pass randomness that could not be verified.
     */
    function rawFulfillRandomness(bytes32 _requestId, uint256 _randomness) external {
        require(msg.sender == im_vrfCoordinator, "Only VRFCoordinator can fulfill");
        uint256 raffleId = s.requestIdToRaffleId[_requestId];
        require(raffleId < s.raffles.length, "Raffle: Raffle does not exist");
        Raffle storage raffle = s.raffles[raffleId];
        require(raffle.randomNumber == 0, "Raffle: Random number already generated");
        s.raffles[raffleId].randomNumber = _randomness;
        raffle.randomNumberPending = false;
    }

    // Change the fee amount that is paid for VRF random numbers
    function changeVRFFee(uint256 _newFee, bytes32 _keyHash) external {
        require(msg.sender == s.contractOwner, "Raffle: Must be contract owner");
        s.fee = uint96(_newFee);
        s.keyHash = _keyHash;
    }

    // Remove the LINK tokens from this contract that are used to pay for VRF random number fees
    function removeLinkTokens(address _to, uint256 _value) external {
        require(msg.sender == s.contractOwner, "Raffle: Must be contract owner");
        im_link.transfer(_to, _value);
    }

    function linkBalance() external view returns (uint256 linkBalance_) {
        linkBalance_ = im_link.balanceOf(address(this));
    }

    /////////////////////////////////////////////////////////////////////////////////////

    function owner() external view override returns (address) {
        return s.contractOwner;
    }

    function transferOwnership(address _newContractOwner) external override {
        address previousOwner = s.contractOwner;
        require(msg.sender == previousOwner, "Raffle: Must be contract owner");
        s.contractOwner = _newContractOwner;
        emit OwnershipTransferred(previousOwner, _newContractOwner);
    }

    /**
        @notice Handle the receipt of a single ERC1155 token type.
        @dev An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeTransferFrom` after the balance has been updated.        
        This function MUST return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` (i.e. 0xf23a6e61) if it accepts the transfer.
        This function MUST revert if it rejects the transfer.
        Return of any other value than the prescribed keccak256 generated value MUST result in the transaction being reverted by the caller.
        @param _operator  The address which initiated the transfer (i.e. msg.sender)
        @param _from      The address which previously owned the token
        @param _id        The ID of the token being transferred
        @param _value     The amount of tokens being transferred
        @param _data      Additional data with no specified format
        @return           `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
    */
    function onERC1155Received(
        address _operator,
        address _from,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external view returns (bytes4) {
        _operator; // silence not used warning
        _from; // silence not used warning
        _id; // silence not used warning
        _value; // silence not used warning
        _data;
        return ERC1155_ACCEPTED;
    }

    function returnERC1155(address _tokenAddress,uint256 _id,uint256 _value) public onlyOwner{
        IERC1155(_tokenAddress).safeTransferFrom(
        address(this),
        msg.sender,
        _id,
        _value,
        ""
    );
    }

    function resetEntry(address _addy) public onlyOwner{

    }

    function resetRaffle(uint256 _raffleId) public onlyAuthorized{

        //check how many entrants there were
        uint256 numEntrants = s.raffles[_raffleId].entrants.length;
        //go through each one, starting at the end
        for(uint256 i = 0; i < numEntrants; i++){
            //start at the end of the list, grab the address...
            uint256 index = i + 1;
            address tempAddy = s.raffles[_raffleId].entrants[numEntrants - index];
            //reset the entry to 0
            s.raffles[_raffleId].entrantsMapping[tempAddy] = 0;
            
        }
        //reset the raffle's random number
        s.raffles[_raffleId].randomNumber = 0;
        //delete and shrink the array
        delete s.raffles[_raffleId].entrants;
        //turn the raffle back on
        s.raffles[_raffleId].raffleActive = true;
    }


    function enterWearable(address _tokenAddress, uint256 _id) public{
        require(IERC1155(_tokenAddress).balanceOf(msg.sender,_id) > 0, "Insufficient Balance!");
        ItemType memory thisItem = s.aavegotchiDiamond.getItemType(_id);
        require(thisItem.category == 0, "can only enter wearables");
        
        for(uint256 i = 0; i < s.raffles.length; i++){
            if(thisItem.rarityScoreModifier == s.raffles[i].brsMultiplier){
                require(s.raffles[i].raffleActive, "raffle not active");
                require(s.raffles[i].entrantsMapping[msg.sender] == 0,"already entered in this raffle");
                s.raffles[i].entrants.push(msg.sender);
                s.raffles[i].entrantsMapping[msg.sender] = _id;
            }
        }
        
        IERC1155(_tokenAddress).safeTransferFrom(msg.sender,address(this),_id,1,"");
    }
    
    function itemBalances(address _account) external view returns (ItemIdIO[] memory bals_) {
        return s.aavegotchiDiamond.itemBalances(_account);   
    }
    
    function isApproved(address _account) public view returns (bool){
        IERC1155(im_diamondAddress).isApprovedForAll(_account,address(this));
    }

    function getEntrants(uint256 _raffleId) public view returns(address[] memory _entrants){
        _entrants = s.raffles[_raffleId].entrants;
    }

    function isWinner(address _address) public view returns(bool){
        for(uint256 i = 0; i < 6; i++){
            if(getWinner(i) == _address){return true;}
        }

    }

    function getWinningIndex(uint256 _raffleId) public view returns(uint256){
        Raffle storage raffle = s.raffles[_raffleId];
        uint256 randomNumber = raffle.randomNumber;
        //if(randomNumber == 0){return address(0);}
        return uint256(
                        keccak256(abi.encodePacked(randomNumber, _raffleId))
                    ) % raffle.entrants.length;
    }

    function getWinner(uint256 _raffleId) public view returns(address _winner){
        require(_raffleId < s.raffles.length, "Raffle: Raffle does not exist");
        Raffle storage raffle = s.raffles[_raffleId];
        require(raffle.raffleActive == false, "raffle still active");
        require(raffle.randomNumberPending == false, "waiting on VRF");
    
        uint256 winningIndex = getWinningIndex(_raffleId);
                    
        return s.raffles[_raffleId].entrants[winningIndex];
    }

    function claimAllPrizes(address _entrant) public{
        //make sure this entrant has winnings
        require(isWinner(_entrant),"Sorry, no prizes for you");
        //go through each raffle and collect any winnings
        for(uint256 i = 0; i < 6; i++){
            Raffle storage raffle = s.raffles[i];
            uint256 randomNumber = raffle.randomNumber;
            //winner has to have been drawn, function must be called by winner or contract owner, and entrant must be winner
            if(
                randomNumber > 0 && 
                (msg.sender == _entrant || msg.sender == s.contractOwner) &&
                getWinner(i) == _entrant
            ){
                    //cycle through each entry and send wearable to the winner
                    for(uint256 i = 0; i<raffle.entrants.length; i++){
                        uint256 entrantItem = raffle.entrantsMapping[raffle.entrants[i]];
                        IERC1155(im_diamondAddress).safeTransferFrom(address(this),_entrant,entrantItem,1,"");
                    }
            }

            
            
        }
        
    }

    /**
     * @notice Claim prizes won
     * @dev All items in _wins are verified as actually won by the address that calls this function and reverts otherwise.
     * @dev Each entrant address can only claim prizes once, so be sure to include all entries and prizes won.
     * @dev Prizes are transfered to the address that calls this function.
     * @dev Due to the possibility that an entrant does not claim all the prizes he/she won or the gas cost is too high,
     * the contractOwner can claim prizes for an entrant. This needs to be used with care so that contractOwner does not
     * accidentally claim prizes for an entrant that have already been claimed for or by the entrant.
     * @param _entrant The entrant that won the prizes
     * @param _raffleId The raffle that prizes were won in.
     * 
     */
    function claimPrize(
        uint256 _raffleId,
        address _entrant
    ) public {
        require(_raffleId < s.raffles.length, "Raffle: Raffle does not exist");
        Raffle storage raffle = s.raffles[_raffleId];
        uint256 randomNumber = raffle.randomNumber;
        require(randomNumber > 0, "Raffle: Random number not generated yet");
        // contractOwner can claim prizes for the entrant.  Prizes are only transferred to the entrant
        require(msg.sender == _entrant || msg.sender == s.contractOwner, "Raffle: Not claimed by owner or contractOwner");
                    
        require(getWinner(_raffleId) == _entrant, "not a winner");
        
        //cycle through each entry and send wearable to the winner
        for(uint256 i = 0; i<raffle.entrants.length; i++){
            uint256 entrantItem = raffle.entrantsMapping[raffle.entrants[i]];
            IERC1155(im_diamondAddress).safeTransferFrom(address(this),_entrant,entrantItem,1,"");
        }
        
        
        
    }
}