import React, { useContext, useState } from 'react';
import ReactPlayer from "react-player";

import { ethers } from 'ethers';
import contract from '../../../contracts/RafflesContract.json';
import ERC20contract from '../../../contracts/IERC20.json';


import winnerVideo from '../../../assets/images/Winner.mp4'
import loserVideo from '../../../assets/images/Not_Winner.mp4'


const contractAddress = "0x3a229e65028924E242cDb52da35aFFf87E5A51ca";
const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';
const ghstAddress = '0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7';
const abi = contract.abi;
const ERC20ABI = ERC20contract.abi;



 export default class CheckWinnings extends React.Component{

  constructor(){
    super();
    this.state = {clicked: false, hasWinnings: false, playedVideo: false}
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
    const ghstContract = new ethers.Contract(ghstAddress,ERC20ABI,signer);
    var allowance = await ghstContract.allowance(activeAddress,contractAddress);
    console.log(allowance.toString());
    if(allowance < "10000000000000000000"){
      console.log("Submitting approval tx...")
      let ApprovalTxn = await ghstContract.approve(contractAddress, "10000000000000000000");
      console.log("Mining...please wait");
      await ApprovalTxn.wait();
  }
    console.log("Claiming winnings for "+activeAddress+"...");

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

video = (myVideo) => {
  return (
    <div className='player-wrapper' >
    <ReactPlayer
      url={myVideo}
      playing={true} 
    loop={false} 
    controls={false}
    muted={false}
    onEnded={() => {this.setState({playedVideo: true})}}
    />
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
          (this.state.hasWinnings ?   
              (this.state.playedVideo ? this.winner() : this.video(winnerVideo) ) : 
              (this.state.playedVideo ? this.loser() : this.video(loserVideo) )) 
          : (<div onClick = {this.checkWinnings}>
                <div>
                  Check here to see if you've won anything (Click here)
                  </div>
                </div>)
    )
  }

}