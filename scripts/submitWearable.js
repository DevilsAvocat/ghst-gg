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

    const abi1155 = require("../contracts/interfaces/artifacts/IERC1155.json").abi;
    //console.log(abi1155);
    const ERC1155 = await new ethers.Contract(
        kovanDiamond,
        abi1155,
        accounts[0]
    );

    //ERC1155["setApprovalForAll(address,bool)"]('0x7976DF46973A20AA370E89586fA64D84227E1f6d', true);
    console.log(await ERC1155.setApprovalForAll(proxyAddress,'true'));
    console.log(await raffle.enterWearable(kovanDiamond, '122'));

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });