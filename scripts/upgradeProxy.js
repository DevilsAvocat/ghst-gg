// scripts/prepare_upgrade.js
async function main() {
    const proxyAddress = '0x3a229e65028924E242cDb52da35aFFf87E5A51ca';
    console.log("Upgrading proxy at: ",proxyAddress);
    const RafflesV2 = await ethers.getContractFactory("RafflesContract");
    console.log("Preparing upgrade...");
    const rafflesV2 = await upgrades.upgradeProxy(proxyAddress, RafflesV2);
    console.log("Upgraded contract at:", rafflesV2.address);
  }
   
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });