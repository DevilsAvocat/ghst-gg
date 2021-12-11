const { ethers, upgrades } = require("hardhat");

async function main() {
    // We get the contract to deploy
    const accounts = await ethers.getSigners();
    console.log(accounts[0].address);
    const Raffle = await ethers.getContractFactory("RafflesContract");
    console.log("Deploying raffle contract...");
    const raffle = await upgrades.deployProxy(
        Raffle,
        [
            '0x86935F11C86623deC8a25696E1C19a8659CbF95d', //kovan diamond
            accounts[0].address,
            '0x3d2341ADb2D31f1c5530cDC622016af293177AE0',//address _vrfCoordinator,
            '0xb0897686c545045aFc77CF20eC7A532E3120E0F1', //address _link,
            '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da',// bytes32 _keyHash,
            '000100000000000000' // uint256 _fee
        ]
    );
    console.log(raffle);
    console.log("Raffle deployed to",raffle.address)
    
    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });