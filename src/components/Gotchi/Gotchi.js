import React from 'react';
import { Box, Typography, Link, Grid } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import commonUtils from '../../utils/commonUtils';
import gotchiPlaceholder from '../../assets/images/logo.png';
// import ghst from '../../assets/images/ghst-doubleside.gif';

import GotchiLevel from './GotchiLevel';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
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
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.common.white,
        fontSize: 12,
        padding: '2px 4px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
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
        whiteSpace: 'nowrap',
        fontSize: 15
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

    console.log('firing gotchi')

    // const renderReward = () => {
    //     if(gotchi.totalRew) {
    //         return (
    //             <Typography align={'center'} variant={'body2'}>
    //                 Reward
    //                 <Box className={classNames(classes.textHighlight, classes.tokenValue)} component={'span'}>
    //                     {gotchi.totalRew}
    //                     <img src={ghst} width='18' alt='GHST Token Icon' style={{marginTop: -2}} />
    //                 </Box>
    //             </Typography>
    //         )
    //     } else {
    //         return null;
    //     }
    // }

    return (
        <Box
            className={classNames(classes.gotchi)}
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
                    level={gotchi.level}
                    toNextLevel={gotchi.toNextLevel}
                    experience={gotchi.experience}
                    size={28}
                />
            </Box>

            <img
                className={classes.gotchiPlaceholder}
                src={gotchiPlaceholder}
                alt='Ghost'
                height={75}
                width={75}
            />

            <Link
                className={classNames(classes.owner)}
                style={{ backgroundColor: fade(gotchiColor, .5), margin: '4px 0'}}
                href={`https://aavegotchi.com/gotchi/${gotchi.id}`}
                target="_blank"
            >
                <Typography variant={'subtitle2'} className={classes.gotchiName}>
                    {gotchi.name ? (
                        gotchi.name
                    ) : (
                        'Unnamed'
                    )}
                </Typography>
            </Link>

            {/* <Typography variant={'body2'}>
                BRS: {gotchi.withSetsRarityScore}({gotchi.baseRarityScore})
            </Typography>
            <Typography variant={'body2'}>
                Kin: {gotchi.kinship}
            </Typography> */}

            {/* {renderReward()} */}

            <GotchiTraitsHighlight traits={gotchi.numericTraits} currentTraits={gotchi.withSetsNumericTraits} />

            {/* <Grid container>
               {
                   Object.entries(commonUtils.formatTraits(gotchi.numericTraits)).map(([key, value], i)=>{
                       return <Grid item xs={6} variant={'body2'} key={i}>
                           {key}:{value}
                       </Grid>
                   })
               }
            </Grid>

            <Grid container>
               {
                   Object.entries(commonUtils.formatTraits(gotchi.withSetsNumericTraits)).map(([key, value], i)=>{
                       return <Grid item xs={6} variant={'body2'} key={i}>
                           {key}:{value}
                       </Grid>
                   })
               }
            </Grid> */}

            <Box className={classes.wearablesLine}>
                <GotchiWearablesLine wearables={gotchi.equippedWearables}/>
            </Box>
        </Box>
    );
}