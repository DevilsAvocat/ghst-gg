require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const PRIVATE_KEY = '' //

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    /*kovan: {
      url: 'https://kovan.infura.io/v3/097ab5579ae54ebca3206b5e83354c0c' ,
      accounts: [`${PRIVATE_KEY}`]
    },*/
    matic: {
      url: 'https://polygon-mainnet.infura.io/v3/097ab5579ae54ebca3206b5e83354c0c' ,
      accounts: [`${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    //apiKey: 'ZM5YASNTU247Z8AQ6PZ9QM5M9CR3ZMDAF4' //etherscan
    apiKey: '8X7HCGDTEIQ7CXZ9G5HG9YHC4UEQTVNBQW' //polygonscan
  }
};
