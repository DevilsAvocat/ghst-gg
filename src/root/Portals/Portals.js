import React, { Component } from 'react';
import Web3 from 'web3'
import Grid from '@material-ui/core/Grid';
import Loader from 'react-loader-spinner';

import PortalOpenedImage from '../../assets/images/portal-opened.gif';
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
        loading: true,
        portals: 0
      }
    }

    componentDidMount = async () => {
      let _this = this;

      this.contract.methods.balanceOf(this.walletAddress).call()
        .then(function (value) {
          let balance = _this.web3.utils.fromWei(value) * 10000;
          _this.setState({ loading: false, portals: balance })
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    togglePortalsInfo = () => {
      console.log('toggle portals info');
    }

    render () {
      if (this.state.loading) return (
        <Loader
          type='Rings'
          color='#e83e8c'
          height={80}
          width={80}
        />
      )
  
      return (
        <Grid
            item
            container
            direction={'row'}
            alignItems={'center'}
            justify={'center'}
            xs={12}
            spacing={2}
        >
            <Grid item xs={4}>
              <Typography style={{ fontSize: '30px' }}>{10000 - this.state.portals} out of 10000</Typography>
            </Grid>
            <Grid item xs={2}>
                <img
                  src={PortalOpenedImage}
                  style={{ width: '150px', cursor: 'pointer' }}
                  onClick={() => this.togglePortalsInfo()}
                  alt='Opened Portal'
                />
            </Grid>
            <Grid item xs={4}>
              <Typography style={{ fontSize: '30px' }}>Are opened!</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ fontSize: '24px' }}>{this.state.portals} portals left <br /> Hurry up to get your gotchi!</Typography>
            </Grid>
        </Grid>
      )
    }
        
}

export default Portals