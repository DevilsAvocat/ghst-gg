import React from 'react';
import { Box, Typography } from '@material-ui/core';
import {useStyles} from '../styles';
import classNames from 'classnames';

import commonUtils from '../../../utils/commonUtils';
import itemUtils from '../../../utils/itemUtils';

export default function RHSItem({item, validAddresses}) {
    const classes = useStyles();
    const name = itemUtils.getItemNameById(item.itemId);
    const rarity = itemUtils.getItemRarityById(item.itemId);
    const stats = itemUtils.getItemStatsById(item.itemId);


    const getItemImagePath = (id) => {
        try {
            return require(`../../../assets/wearables/${id}.svg`).default;
        } catch (error) {
            return require(`../../../assets/images/no-image2.svg`).default;
        }
    };

    const getOwnerIndex = (owner) => {
        return validAddresses.indexOf(owner) + 1;
    };

    return (
        <Box className={classNames(classes.item, rarity)} style={{marginBottom: 20}}>
            <img
                src={getItemImagePath(item.itemId)}
                alt={name}
                height={75}
                width={75}
            />
            <Typography className={classNames(classes.itemTitle, rarity)}>
                {name}
            </Typography>
            <Typography variant={'body2'}>
                {stats}
            </Typography>
            <Typography variant={'body2'}>
                Owned by:
            </Typography>
            {
                item.owners.map((owner, i) => {
                    return <Typography variant={'body2'} key={i} style={{marginTop: 4}}>
                        <Box component={'span'} className={classNames(classes.owner, `color-${getOwnerIndex(owner.id)}`)}>
                            {commonUtils.cutAddress(owner.id)}
                        </Box>
                        <Box component={'span'} style={{marginLeft: 12}}>
                            - {owner.qty}
                        </Box>
                    </Typography>
                })
            }
        </Box>
    )
}