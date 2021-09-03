import React, {useState} from 'react';
import { Box, Typography, Link, useTheme } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import commonUtils from '../../utils/commonUtils';

import GotchiLevel from './GotchiLevel';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
import GotchiWearablesLine from './GotchiWearablesLine';
import HighlightNumber from '../HighlightNumber';

import CallMadeIcon from '@material-ui/icons/CallMade';

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
        position: 'relative',
        textDecoration: 'none',
        opacity: .9,
        '&:hover': {
            textDecoration: 'none',
            opacity: 1
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
    callMadeIcon: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 14
    },
    tokenValue: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    mainVal: {
        fontSize: 13
    },
    defaultVal: {
        fontSize: 10,
        marginLeft: 2
    }
}));

export default function Gotchi({gotchi, ownerId, validAddresses, expanded}) {
    const classes = useStyles();

    const theme = useTheme();
    const getAddressColor = (owner) => {
        if(!validAddresses) return theme.palette.accounts.color1;
        let index = validAddresses.map((item)=>item.toLowerCase()).indexOf(owner) + 1;
        return index ? theme.palette.accounts[`color${index}`] : theme.palette.accounts.color1;
    };
    const gotchiColor = getAddressColor(ownerId);

    const calculateRarityType = (rarity) => {
        return rarity >= 700 ? 'godlike' : rarity >= 600 ? 'mythical' : rarity >= 500 ? 'rare' : '';
    }

    const calculateKinshipType = (kin) => {
        return kin >= 500 ? 'godlike' : kin >= 250 ? 'mythical' : kin >= 100 ? 'rare' : '';
    }

    if(!expanded) return (
        <img
            src={gotchi.svg}
            alt='Ghost'
            height={75}
            width={75}
        />
    )

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
                src={gotchi.svg}
                alt='Ghost'
                height={75}
                width={75}
            />

            <Box position='relative' display='flex' alignItems='center' justifyContent='space-between' minHeight={26} margin={'4px 0 8px'}>
                <Box textAlign='center' flexBasis='49%'>
                    <HighlightNumber type={calculateRarityType(gotchi.withSetsRarityScore)}>
                        <Typography className={classes.mainVal} variant={'subtitle2'}>
                            🏆{gotchi.withSetsRarityScore}
                            <Typography className={classes.defaultVal} component='span' variant='body2'>
                                ({gotchi.baseRarityScore})
                            </Typography>
                        </Typography>        
                    </HighlightNumber>
                </Box>

                <Box textAlign='center' flexBasis='49%' margin={'1% 0'}>
                    <HighlightNumber type={calculateKinshipType(gotchi.kinship)}>
                        <Typography className={classes.mainVal} variant={'subtitle2'}>
                            🧡{gotchi.kinship}
                        </Typography>        
                    </HighlightNumber>
                </Box>
            </Box>

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
                <CallMadeIcon className={classes.callMadeIcon} />
            </Link>

            {/* {renderReward()} */}

            <Box marginTop='8px'>
                <GotchiTraitsHighlight traits={gotchi.numericTraits} currentTraits={gotchi.withSetsNumericTraits} />
            </Box>

            <Box marginTop='8px'>
                <GotchiWearablesLine wearables={gotchi.equippedWearables}/>
            </Box>
        </Box>
    );
}