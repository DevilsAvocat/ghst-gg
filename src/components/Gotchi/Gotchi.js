import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import commonUtils from '../../utils/commonUtils';
import gotchiPlaceholder from '../../assets/images/logo.png';
import ghst from '../../assets/images/ghst-doubleside.gif';

import GotchiLevel from './GotchiLevel';
import GotchiWearablesLine from './GotchiWearablesLine';

const useStyles = makeStyles((theme) => ({
    gotchi: {
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        color: '#fff',
        padding: '24px 12px 16px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        '&:hover': {
            textDecoration: 'none'
        },
    },
    owner: {
        borderRadius: theme.shape.borderRadius,
        fontSize: 12,
        padding: '2px 4px',
    },
    gotchiOwner: {
        position: 'absolute',
        top: 0,
        right: '50%',
        transform: 'translate(50%, -50%)',
        color: '#fff'
    },
    gotchiName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    gotchiPlaceholder: {
        filter: 'grayscale(100%)'
    },
    tokenValue: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    wearablesLine: {
        marginTop: 10
    }
}));

export default function Gotchi({gotchi, gotchiColor}) {
    const classes = useStyles();

    const getWearableIconPath = (iconId) => {
        return require(`../../assets/wearables/${iconId}.svg`).default;
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

    // const renderWearables = () => {
    //     if(gotchi.equippedWearables.length !== 0) {
    //         return (
    //             <Box>
    //                 <Typography variant={'body2'}>
    //                     Equipped:
    //                 </Typography>
    //                 <Grid container justify={'center'} spacing={1}>
    //                     {
    //                         gotchi.equippedWearables.map((wearable, i)=> {
    //                             if(wearable > 0) {
    //                                 return <Grid item key={i}>
    //                                     <img src={getWearableIconPath(wearable)} alt='Icon' width={'40px'} height={'40px'} />
    //                                 </Grid>
    //                             }
    //                             return null;
    //                         })
    //                     }
    //                 </Grid>
    //             </Box>
    //         )
    //     } else {
    //         return (
    //             <Typography variant={'body2'}>
    //                 No wearables equipped!
    //             </Typography>
    //         );
    //     }
    // }

    return (
        <Box
            className={classNames(classes.gotchi)}
            href={`https://aavegotchi.com/gotchi/${gotchi.id}`}
            target="_blank"
            style={{ backgroundColor: fade(gotchiColor, .2) }}
        >
            <Typography
                variant={'body2'}
                className={classNames(classes.owner, classes.gotchiOwner)}
                style={{ backgroundColor: gotchiColor }}
            >
                {commonUtils.cutAddress(gotchi.owner.id)}
            </Typography>
            <Box position='absolute' top={8} right={8}>
                <GotchiLevel
                    experience={gotchi.experience}
                    level={gotchi.level}
                    size={30}
                />
            </Box>
            <img
                className={classes.gotchiPlaceholder}
                src={gotchiPlaceholder}
                alt='Ghost'
                height={75}
                width={75}
            />
            <Box className={classNames(classes.owner)} style={{ backgroundColor: gotchiColor, margin: '4px 0'}}>
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
                Exp: {gotchi.experience} <br />
                TNL: {gotchi.toNextLevel}
                {/*Rew: {gotchi.expRew}*/}
            </Typography>
            {renderReward()}
            {/* {renderWearables()} */}
            <Box className={classes.wearablesLine}>
                <GotchiWearablesLine wearables={gotchi.equippedWearables}/>
            </Box>
            {/*<Grid container>*/}
            {/*    {*/}
            {/*        Object.entries(commonUtils.formatTraits(gotchi.numericTraits)).map(([key, value], i)=>{*/}
            {/*            return <Grid item xs={6} variant={'body2'} key={i}>*/}
            {/*                {key}:{value}*/}
            {/*            </Grid>*/}
            {/*        })*/}
            {/*    }*/}
            {/*</Grid>*/}

        </Box>
    );
}