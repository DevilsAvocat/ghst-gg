// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const raffleAddress = '';
  const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';

  const Raffle = await hre.ethers.getContractFactory("RafflesContract");

  const raffle = await Raffle.attach("0x0Ac85d55ebFc7f7b0cF4c13bb3BD6Eaf3909d62d");

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0xb0C4Cc1AA998DF91D2c27cE06641261707A8c9C3"],
  });
  console.log(await raffle.getEntrants("0"));

  await raffle.enterWearable(diamondAddress, '230');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



