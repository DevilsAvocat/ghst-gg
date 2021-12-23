
import React, { useContext, Text } from 'react';
import { ethers } from 'ethers';
import contract from '../../contracts/IERC1155.json';
import { Grid } from '@mui/material';
import Section from '../../components/Section/Section';



const contractAddress = "0xFE793D34d6D6Ff83B0e5DC4cC0C530AC366a9633";
const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';
const abi = contract.abi;



 export default class Taaler extends React.Component{

  constructor(){
    super();
    this.state = {clicked: false, hasWinnings: false}
    this.approveContract = this.approveContract.bind(this);
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



  render(){
    return(
        <Grid container>
        <Section backgroundColor='rgba(33, 36, 41, .2)'>
            <text>
            You must give the Taaler contract permission receive your wearable <br/>
           Always confirm that the recipient contract is the Aavegotchi diamond address (0x86935F11C86623deC8a25696E1C19a8659CbF95d) <br/>
           And the "operator" is the Taaler contract (0xFE793D34d6D6Ff83B0e5DC4cC0C530AC366a9633) <br/>
            </text>
            <button onClick={this.approveContract} className='cta-button mint-nft-button'>
              Approve Taaler
          </button>
        </Section>
        
    </Grid>
      
    )
  }

}