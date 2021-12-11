const { ethers, upgrades } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

async function main() {
    // We get the contract to deploy
    const proxyAddress = '0x0cA861A2d74071563E2A7250125BADD0b64E497e';
    const kovanDiamond = '0x07543dB60F19b9B48A69a7435B5648b46d4Bb58E';
    const accounts = await ethers.getSigners();
    console.log(accounts[0].address);
    const Logic = await ethers.getContractFactory("RafflesContract");

    const raffle = await Logic.attach(proxyAddress);
    console.log("test");
    console.log(await raffle.getEntrants('4'));
    console.log(await raffle.drawRandomNumber('4'));

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });