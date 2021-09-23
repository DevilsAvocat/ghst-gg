import React, { useEffect, useState } from 'react';
import { Typography, FormControl, Select, MenuItem, IconButton, OutlinedInput, InputLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './styles';

import commonUtils from '../../utils/commonUtils';

import useLocalStorage from '../../hooks/useLocalStorage';

import { useMetamask } from 'use-metamask';
import metamaskIcon from '../../assets/images/metamask-icon.png';
import { Icon } from '@material-ui/core';

const ITEM_HEIGHT = 48;
const MenuProps = {
  PaperProps: {
    style: {
      width: 300,
      maxHeight: ITEM_HEIGHT * 6
    },
  }
};

export default function AddressesSelect({ placeholder, onUpdate, newAddresess}) {
    const classes = useStyles();
    const [addresses, setAddresses] = useLocalStorage('ghst_addresses', JSON.parse(localStorage.getItem('ghst_addresses')) || []);
    const { metaState } = useMetamask();
    const [names, setNames] = useState([]);

    const handleChange = (event) => {
        const { target: { value } } = event;

        setAddresses((result) => {
            return result.map( item => (
                {...item, selected: value.includes(item.name)}
            ));
        });
    }

    const deleteAddress = (event, name) => {
        event.stopPropagation();
        setAddresses(addresses.filter( item => item.name !== name));
    }

    const getNames = (array) => {
        return array.filter(item => item.selected).map(item => item.name);
    }

    const updateMetamaskAddress = (address) => {

        if (!address) return setAddresses(addresses.slice(1));

        let addressesCeche = addresses.length ? addresses.filter((item) => {
            return item.address.toLowerCase() !== address || item.metamask
        }) : [];

        if (
            addressesCeche[0]?.metamask &&
            addressesCeche[0]?.address.toLowerCase() === address
        ) return; // if address already added
        
        if (addressesCeche[0]?.metamask) { // if change metamask wallet
            addressesCeche[0].address = address;
        } else { // if metamask wallet not added
            addressesCeche = [
                {
                    name: 'ghst_metamask_address',
                    metamask: true,
                    address: address,
                    selected: true
                },
                ...addressesCeche
            ]
        }

        setAddresses(addressesCeche)
    }


    useEffect( () => {
        if (metaState.isAvailable) {
            if (metaState.account.length) updateMetamaskAddress(metaState.account[0].toLowerCase());
            else if (!metaState.isConnected && addresses[0]?.metamask) updateMetamaskAddress(false);
        }
    }, [metaState]);

    useEffect( () => {
        if (onUpdate) onUpdate(addresses);
        setNames(getNames(addresses));
    }, [addresses]);

    useEffect( () => {
        if (newAddresess.length > addresses.length) {
            setAddresses(newAddresess);
        }
    }, [newAddresess]);

    return (
        <FormControl size='small' color='primary' className={classes.select}>
            <Select
                multiple
                displayEmpty
                value={names}
                onChange={handleChange}
                input={<OutlinedInput />}
                disabled={addresses.length === 0}
                renderValue={(selected) => {
                    if (!selected.length) {
                        return <em>{placeholder}</em>;
                    } else if (selected[0] === 'ghst_metamask_address') {
                        return [
                            <img src={metamaskIcon} className={classes.fieldMetamaskIcon} key="metamask icon"></img>,
                            selected.slice(1).length ? ', ' : '',
                            selected.slice(1).join(',')
                        ]
                    }
                    else return selected.join(', ')
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {
                    addresses.map((item) => {
                        if (!item.metamask)  {
                            return <MenuItem
                                key={item.name}
                                name={item.name}
                                value={item.name}
                                className={classes.option}
                            >
                                <Typography className={classes.optionText}>{item.name}: {commonUtils.cutAddress(item.address)}</Typography>
                                <IconButton onClick={(event) => deleteAddress(event, item.name)} className={classes.deleteButton}>
                                    <DeleteIcon />
                                </IconButton>
                            </MenuItem>
                        } else {
                            return (
                                <MenuItem
                                    key={item.name}
                                    name={item.name}
                                    value={item.name}
                                    className={classes.option}
                                >
                                    <Icon className={classes.metamaskIcon}>
                                        <img src={metamaskIcon} ></img>
                                    </Icon>
                                    <Typography className={classes.optionText}> {commonUtils.cutAddress(item.address)}</Typography>
                                </MenuItem>
                            )
                        }
                    })
                }
            </Select>
        </FormControl>
    )
}