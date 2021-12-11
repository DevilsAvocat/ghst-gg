import React, { useContext } from 'react';
import { ethers } from 'ethers';
import contract from '../../../contracts/RafflesContract.json';

const contractAddress = "0x3a229e65028924E242cDb52da35aFFf87E5A51ca";
const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';
const abi = contract.abi;



 export default class CheckWinnings extends React.Component{

  constructor(){
    super();
    this.state = {clicked: false, hasWinnings: false}
    this.checkWinnings = this.checkWinnings.bind(this);
  }

    async checkWinnings(){
    try {
        console.log("check");
        const { ethereum } = window;
        if (ethereum) {
      
          const provider = new ethers.providers.Web3Provider(ethereum);
          const activeAddress = (await provider.listAccounts())[0]
          console.log(activeAddress);
          const networkId = (await provider.getNetwork()).chainId;
          console.log("Connected to network", networkId);
          
          if(networkId != 137){
            alert("Please switch to Matic mainnet!");
          }  
          else{
            const signer = provider.getSigner();

            const raffleContract = new ethers.Contract(contractAddress,abi,signer);
            console.log("Checking winnings...");

            //await raffleContract.enterWearable(diamondAddress, '1');
            console.log((await raffleContract.getFeeAmt()).toString());
            this.setState({
              clicked: true,
              hasWinnings: (await raffleContract.isWinner(activeAddress))
            })
            console.log(this.state.hasWinnings);
          }      
          
        } else {
          console.log("Ethereum object does not exist");
        }
  
      } catch (err) {
        console.log(err);
      }
}

async claimWinnings() {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const activeAddress = (await provider.listAccounts())[0]

    const signer = provider.getSigner();

    const raffleContract = new ethers.Contract(contractAddress,abi,signer);
    console.log("Claiming winnings...");

    let claimTxn = await raffleContract.claimAllPrizes(activeAddress);
    console.log("Mining...please wait");
    await claimTxn.wait();
    console.log(`Mined, see transaction: ${claimTxn.hash}`);
}

 winner = () => {
  return (
          <div><div>
              Congrats, you have some winnings! Click here to claim them.
          </div>
          <button onClick={this.claimWinnings} className='cta-button mint-nft-button'>
              Claim
          </button>
          </div>
  )
}

 loser = () => {
  return (
      <div>
        Sorry, better luck next time!
    </div>
  )
}

  render(){
    return(
      this.state.clicked ? 
      (this.state.hasWinnings ? this.winner() : this.loser()) :
      (<div onClick = {this.checkWinnings}
    >
       <div>
           Check here to see if you've won anything (Click here)
       </div>
    </div>)
    )
  }

}