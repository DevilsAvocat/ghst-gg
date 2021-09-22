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

export default function MultipleSelect({ placeholder, onUpdate, newAddresess}) {
    const classes = useStyles();
    const [addresses, setAddresses] = useLocalStorage('addresses', JSON.parse(localStorage.getItem('addresses')) || []);
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


    useEffect( () => {
        if(metaState.account.length && addresses[0].address !== metaState.account[0]) {
            addresses[0].address = metaState.account[0];
            setAddresses([...addresses]);
        }
    }, [metaState]);

    useEffect( () => {
        if(addresses.length && onUpdate) {
            onUpdate(addresses);
            setNames(getNames(addresses));
        }
    }, [addresses]);

    useEffect( () => {
        if(newAddresess.length > addresses.length) {
            setAddresses(newAddresess);
            setNames(getNames(newAddresess));
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
                    }
                    return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {
                    addresses.map((item) => {
                        if(!item.metamask)  {
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
                                    <Icon className={classes.metamaskIcon} src={metamaskIcon}>
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