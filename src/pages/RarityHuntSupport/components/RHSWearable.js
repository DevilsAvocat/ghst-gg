import React from 'react';
import { Box, Typography } from '@material-ui/core';
import {useStyles} from '../styles';
import classNames from 'classnames';

import commonUtils from '../../../utils/commonUtils';
import itemUtils from '../../../utils/itemUtils';

export default function RHSWearable({wearable, validAddresses}) {
    const classes = useStyles();
    const name = itemUtils.getItemNameById(wearable.itemId);
    const rarity = itemUtils.getItemRarityById(wearable.itemId);
    const stats = itemUtils.getItemStatsById(wearable.itemId);


    const getWerableImagePath = (id) => {
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
        <Box className={classNames(classes.wearable, rarity)} style={{marginTop: 20}}>
            <img
                src={getWerableImagePath(wearable.itemId)}
                alt={name}
                height={75}
                width={75}
            />
            <Typography className={classNames(classes.wearableTitle, rarity)}>
                {name}
            </Typography>
            <Typography variant={'body2'}>
                {stats}
            </Typography>
            <Typography variant={'body2'}>
                Owned by:
            </Typography>
            {
                wearable.owners.map((owner, i) => {
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