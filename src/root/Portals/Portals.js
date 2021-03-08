import React, { Component } from 'react';
import Web3 from 'web3'
import Grid from '@material-ui/core/Grid';
import Loader from 'react-loader-spinner';

import openedPortal from '../../assets/images/portal-opened.gif';
import sealedPortal from '../../assets/images/portal-sealed.svg';
import { Typography } from '@material-ui/core';

class Portals extends Component {
    constructor (props) {
      super(props);

      // Init Web3
      this.rpcUrl = 'https://rpc-mainnet.maticvigil.com/v1/de9ab922c0ff3e6d6e2863750dd2ca68fd01a267';
      this.web3 = new Web3(this.rpcUrl);
      
      // Token/wallet address
      this.tokenAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1';
      this.walletAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';
      
      // The minimum ABI to get ERC20 Token balance
      this.minABI = [
        // BalanceOf
        {
          'constant':true,
          'inputs':[{'name':'_owner','type':'address'}],
          'name':'balanceOf',
          'outputs':[{'name':'balance','type':'uint256'}],
          'type':'function'
        },
        // Decimals
        {
          'constant':true,
          'inputs':[],
          'name':'decimals',
          'outputs':[{'name':'','type':'uint8'}],
          'type':'function'
        }
      ];
      
      this.contract = new this.web3.eth.Contract(this.minABI, this.tokenAddress);

      this.state = {
        portals: 0,
        showEasterEgg: false
      }
    }

    componentDidMount = async () => {
      let _this = this;

      this.contract.methods.balanceOf(this.walletAddress).call()
        .then(function (value) {
          let balance = Math.round(_this.web3.utils.fromWei(value) * 10000);
          _this.setState({ portals: balance });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    toggleEasterEgg = () => {
      this.setState({ showEasterEgg: !this.state.showEasterEgg });
    }

    render () {
      return (
        <Grid
            item
            container
            direction={'row'}
            alignItems={'center'}
            justify={'center'}
            xs={12}
            spacing={2}
            style={{marginTop: '50px', marginBottom: '30px'}}
        >
            <Grid item xs={4}>
                <Typography style={{ fontSize: '30px', textAlign: 'center' }}>
                  <span style={{ color: '#fd9af9' }}>{this.state.showEasterEgg ? this.state.portals : 10000 - this.state.portals }</span> out of <span style={{ color: '#fd9af9' }}>10000</span><br /> Are {this.state.showEasterEgg ? 'sealed' : 'opened' }!
                </Typography>
            </Grid>
            <Grid style={{textAlign: 'center'}} item xs={2}>
                <img
                  src={this.state.showEasterEgg ? sealedPortal : openedPortal }
                  style={{ width: '150px', cursor: 'pointer' }}
                  onClick={() => this.toggleEasterEgg()}
                  alt='Opened Portal'
                />
            </Grid>
            <Grid item xs={4}>
                <Typography align={"center"} style={{ fontSize: '30px' }}>
                  {this.state.showEasterEgg ? 'More are incoming...' : 'Ghosts spawned!' }
                </Typography>
            </Grid>
        </Grid>
      )
    }
        
}

export default Portals