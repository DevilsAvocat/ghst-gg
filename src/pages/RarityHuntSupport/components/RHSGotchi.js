import React from 'react';
import { Grid, Box, Link, Typography } from '@material-ui/core';
import {useStyles} from '../styles';
import classNames from 'classnames';
import commonUtils from '../../../utils/commonUtils';
import gotchiPlaceholder from '../../../assets/images/logo.png';

export default function RHSGotchi({gotchi, validAddresses}) {
    const classes = useStyles();

    const getWearableIconPath = (iconId) => {
        return require(`../../../assets/wearables/${iconId}.svg`).default;
    };

    const getOwnerIndex = (owner) => {
        return validAddresses.map((item)=>item.toLowerCase()).indexOf(owner) + 1;
    };

    return (
        <Link
            className={classNames(classes.gotchi, `color-${getOwnerIndex(gotchi.owner.id)}`)}
            href={`https://aavegotchi.com/gotchi/${gotchi.id}`}
            target="_blank"
        >
            <Typography
                variant={'body2'}
                className={classNames(classes.owner, classes.gotchiOwner, `color-${getOwnerIndex(gotchi.owner.id)}`)}
            >
                {commonUtils.cutAddress(gotchi.owner.id)}
            </Typography>
            <img
                className={classes.gotchiPlaceholder}
                src={gotchiPlaceholder}
                alt='Ghost'
                height={75}
                width={75}
            />
            <Box className={classNames(classes.owner, `color-${getOwnerIndex(gotchi.owner.id)}`)} style={{margin: '4px 0'}}>
                <Typography variant={'body1'} className={classes.gotchiName}>
                    {gotchi.name ? (
                        gotchi.name
                    ) : (
                        'Unnamed'
                    )}
                </Typography>
            </Box>
            <Typography variant={'body2'}>
                BRS: {gotchi.modifiedRarityScore}({gotchi.baseRarityScore})
                {/*Rew: {gotchi.brsRew}*/}
            </Typography>
            <Typography variant={'body2'}>
                Kin: {gotchi.kinship}
                {/*Rew: {gotchi.kinRew}*/}
            </Typography>
            <Typography variant={'body2'}>
                Exp: {gotchi.experience}
                {/*Rew: {gotchi.expRew}*/}
            </Typography>
            <Typography variant={'body2'}>
                Current reward: {gotchi.totalRew}
            </Typography>
            {/*<Grid container>*/}
            {/*    {*/}
            {/*        Object.entries(commonUtils.formatTraits(gotchi.numericTraits)).map(([key, value], i)=>{*/}
            {/*            return <Grid item xs={6} variant={'body2'} key={i}>*/}
            {/*                {key}:{value}*/}
            {/*            </Grid>*/}
            {/*        })*/}
            {/*    }*/}
            {/*</Grid>*/}
            <Typography variant={'body2'}>
                Equipped:
            </Typography>
            <Grid container justify={'center'} spacing={1}>
                {
                    gotchi.equippedWearables.map((wearable, i)=> {
                         if(wearable > 0) {
                             return <Grid item key={i}>
                                <img src={getWearableIconPath(wearable)} alt='Icon' width={'40px'} height={'40px'} />
                            </Grid>
                         }
                         return null;
                    })
                }
            </Grid>
        </Link>
    );
}