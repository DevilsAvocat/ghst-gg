import React, { useContext } from 'react';
import {Link, Card,Box, ButtonBase, Typography, ToggleButtonGroup, ToggleButton, Tooltip, CardContent  } from '@mui/material';

import { routersStyles } from '../styles';

import { ClientContext } from '../../../contexts/ClientContext';

import contract from '../../../contracts/RafflesContract.json';
import erc1155 from '../../../contracts/IERC1155.json';
import { ethers } from 'ethers';

import Wearable from '../../../components/Items/Wearable/Wearable';
import Consumable from '../../../components/Items/Consumable/Consumable';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';

import { LoginContext } from '../../../contexts/LoginContext';


const contractAddress = "0x3a229e65028924E242cDb52da35aFFf87E5A51ca";
const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';
const abi = contract.abi;



async function doSomething(_id, _activeAddress){
    try {
        console.log("item id: ",_id);
        console.log("user addy: ",_activeAddress);
        const { ethereum } = window;
        if (ethereum) {
      
          const provider = new ethers.providers.Web3Provider(ethereum);
          const networkId = (await provider.getNetwork()).chainId;
          console.log("Connected to network", networkId);
          
          if(networkId != 137){
            alert("Please switch to Matic mainnet!");
          }  
          else{
            const signer = provider.getSigner();

            const diamondContract = new ethers.Contract(diamondAddress,erc1155.abi,signer);
            if(!(await diamondContract.isApprovedForAll(_activeAddress,contractAddress))){
                console.log("Submitting approval tx...")
                let ApprovalTxn = await diamondContract.setApprovalForAll(contractAddress, "true");
                console.log("Mining...please wait");
                await ApprovalTxn.wait();
            }

            const raffleContract = new ethers.Contract(contractAddress,abi,signer);
            console.log(raffleContract);
            console.log("Submitting entry...");
            let claimTxn = await raffleContract.enterWearable(diamondAddress, _id);
            //let claimTxn = await raffleContract.returnERC1155(diamondAddress, '253','1');

            console.log("Mining...please wait");
            await claimTxn.wait();
            console.log(`Mined, see transaction: ${claimTxn.hash}`);
          }      
          
        } else {
          console.log("Ethereum object does not exist");
        }
  
      } catch (err) {
        console.log(err);
      }
}

export default function ClientWarehouse() {
    const { activeAddress } = useContext(LoginContext);

    const classes = routersStyles();
    const { warehouse, warehouseFilter, loadingGotchis, loadingWarehouse, sortData } = useContext(ClientContext);

    if(loadingWarehouse || loadingGotchis || !warehouse.length) {
        return <Box textAlign='center' paddingTop={'32px'}>
            <GhostLoader
                animate={loadingWarehouse || loadingGotchis || !warehouse.length}
                text={!loadingWarehouse && !loadingGotchis && !warehouse.length ? 'No wearables here :(' : null}
            />
        </Box>
    }

    return (
        <>
            <Box className={classes.sortWrapper}>
                <Typography className={classes.sortText} variant='subtitle1'>Sort: </Typography>

                <ToggleButtonGroup
                    value={warehouseFilter}
                    exclusive
                    onChange={(event, value) => sortData(event, value, 'warehouse')}
                    color='primary'
                    aria-label='gotchis sort'
                >
                    <ToggleButton className={classes.filtersButton} value='rarityIdDesc' aria-label='rarity ↓'>
                        <Tooltip title='Rarity ↓' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🔽</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='rarityIdAsce' aria-label='rarity ↑'>
                        <Tooltip title='Rarity ↑' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🔼</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='balance' aria-label='quantity'>
                        <Tooltip title='Quantity' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>*️⃣</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    
                </ToggleButtonGroup>
            </Box>

            


            <Box className={classes.list} onClick = {console.log("clicked")}>
                {
                    warehouse.map((item, i)=>{
                        return <div className={classes.listItem} key={i}>
                            {item.category === 2 ? (
                                <Consumable consumable={item} />
                            ) : (
                                <Tooltip title='Submit to raffle' placement='top' classes={{ tooltip: classes.customTooltip }} followCursor>

                                                <Box 
                                                    sx={{
                                                        width: 200,
                                                        height: 200,
                                                        '&:hover': {
                                                        backgroundColor: 'primary.main',
                                                        opacity: [0.9, 0.8, 0.7],
                                                        },
                                                    }}
                                                    onClick = {() => doSomething(item.id,activeAddress)}
                                                >
                                                    <Wearable wearable={item} />
                                                </Box>
                                </Tooltip>
                            )}
                        </div>
                    })
                }
            </Box>
        </>
    );
}