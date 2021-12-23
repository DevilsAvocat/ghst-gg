
import React, { useContext, Text } from 'react';
import { ethers } from 'ethers';
import contract from '../../contracts/IERC1155.json';
import TaalerContract from '../../contracts/TaalerCoin.json';

import { Grid } from '@mui/material';
import Section from '../../components/Section/Section';



const contractAddress = "0xFE793D34d6D6Ff83B0e5DC4cC0C530AC366a9633";
const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';
const abi = contract.abi;
const taalerAbi = TaalerContract.abi;



 export default class Taaler extends React.Component{

  constructor(){
    super();
    this.state = {clicked: false, hasWinnings: false, numDeposit: '1', numWithdraw: '1'}
    this.approveContract = this.approveContract.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

    
async approveContract() {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const activeAddress = (await provider.listAccounts())[0]

    const signer = provider.getSigner();

    const wearablesAddress = new ethers.Contract(diamondAddress,abi,signer);
    console.log("Approving contract...");

    let claimTxn = await wearablesAddress.setApprovalForAll(contractAddress,'true');
    console.log("Mining...please wait");
    await claimTxn.wait();
    console.log(`Mined, see transaction: ${claimTxn.hash}`);
}

handleChange1(event) {
  this.setState({numDeposit: event.target.value});
  console.log(this.state.numDeposit)
}

handleChange2(event) {
  this.setState({numWithdraw: event.target.value});
}

async handleSubmit(event) {
  event.preventDefault();

  const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();

    const taalerContract = new ethers.Contract(contractAddress,taalerAbi,signer);
    console.log("Depositing wearable...");

    let claimTxn = await taalerContract.depositCommonHat(this.state.numDeposit);
    console.log("Mining...please wait");
    await claimTxn.wait();
    console.log(`Mined, see transaction: ${claimTxn.hash}`);
    alert('Deposited '+ this.state.value+' common wizard hats');
}

async handleWithdraw(event) {
  event.preventDefault();

  const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = await provider.getSigner();

    const taalerContract = new ethers.Contract(contractAddress,taalerAbi,signer);
    console.log("Withdrawing wearable...");

    let claimTxn = await taalerContract.withDrawCommonHat(this.state.numWithdraw);
    console.log("Mining...please wait");
    await claimTxn.wait();
    console.log(`Mined, see transaction: ${claimTxn.hash}`);
    alert('Deposited '+ this.state.value+' common wizard hats');
}



  render(){
    return(
        <Grid container>
        <Section backgroundColor='rgba(33, 36, 41, .2)'>
            <div>
            You must give the Taaler contract permission receive your wearable <br/>
           Always confirm that the recipient contract is the Aavegotchi diamond address (0x86935F11C86623deC8a25696E1C19a8659CbF95d) <br/>
           And the "operator" is the Taaler contract (0xFE793D34d6D6Ff83B0e5DC4cC0C530AC366a9633) <br/>
            </div>
            <button onClick={this.approveContract} className='cta-button mint-nft-button'>
              Approve Taaler
          </button>
          
          <form onSubmit={this.handleSubmit}>
        <label>
          Wizard hats to deposit (must have already approved):
          <input type="text" value={this.state.value} onChange={ this.handleChange1} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={this.handleWithdraw}>
        <label>
          Wizard hats to withdraw (must have already deposited):
          <input type="text" value={this.state.value} onChange={ this.handleChange2} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </Section>
        
    </Grid>
      
    )
  }

}