import React from 'react';
import { Grid, Box, Link, Typography } from '@material-ui/core';
import {useStyles} from '../styles';
import classNames from 'classnames';
import commonUtils from '../../../utils/commonUtils';
import gotchiPlaceholder from '../../../assets/images/logo.png';
import ghst from '../../../assets/images/ghst-doubleside.gif';

export default function RHSGotchi({gotchi, validAddresses}) {
    const classes = useStyles();

    const getWearableIconPath = (iconId) => {
        return require(`../../../assets/wearables/${iconId}.svg`).default;
    };

    const getOwnerIndex = (owner) => {
        return validAddresses.map((item)=>item.toLowerCase()).indexOf(owner) + 1;
    };

    const renderReward = () => {
        if(gotchi.totalRew) {
            return (
                <Typography align={'center'} variant={'body2'}>
                    Reward
                    <Box className={classNames(classes.textHighlight, classes.tokenValue)} component={'span'}>
                        {gotchi.totalRew}
                        <img src={ghst} width='18' alt='GHST Token Icon' style={{marginTop: -2}} />
                    </Box>
                </Typography>
            )
        } else {
            return null;
        }
    }

    console.log(gotchi.equippedWearables)

    const renderWearables = () => {
        if(gotchi.equippedWearables.length !== 0) {
            return (
                <Box>
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
                </Box>
            )
        } else {
            return (
                <Typography variant={'body2'}>
                    No wearables equipped!
                </Typography>
            );
        }
    }

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
                BRS: {gotchi.withSetsRarityScore}({gotchi.baseRarityScore})
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
            {renderReward()}
            {renderWearables()}
            {/*<Grid container>*/}
            {/*    {*/}
            {/*        Object.entries(commonUtils.formatTraits(gotchi.numericTraits)).map(([key, value], i)=>{*/}
            {/*            return <Grid item xs={6} variant={'body2'} key={i}>*/}
            {/*                {key}:{value}*/}
            {/*            </Grid>*/}
            {/*        })*/}
            {/*    }*/}
            {/*</Grid>*/}

        </Link>
    );
}