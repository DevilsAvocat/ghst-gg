import React, { useEffect, useRef } from 'react';
import { Typography, Link } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import classNames from 'classnames';
import commonUtils from '../../utils/commonUtils';
import useStyles from './styles';

import GotchiLevel from './GotchiLevel';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
import GotchiWearablesLine from './GotchiWearablesLine';
import HighlightNumber from '../HighlightNumber';

import CallMadeIcon from '@material-ui/icons/CallMade';

export default function Gotchi({gotchi, title, gotchiColor, narrowed}) {
    const classes = useStyles();
    const svgBox = useRef();

    useEffect(() => {
        svgBox.current.appendChild(gotchi.svg);
    }, [svgBox]);

    const calculateRarityType = (rarity) => {
        return rarity >= 700 ? 'godlike' : rarity >= 600 ? 'mythical' : rarity >= 500 ? 'rare' : '';
    }

    const calculateKinshipType = (kin) => {
        return kin >= 500 ? 'godlike' : kin >= 250 ? 'mythical' : kin >= 100 ? 'rare' : '';
    }

    const renderNarrowed = () => {
        if(!narrowed) {
            return (
                <>
                    <div className={classes.gotchiLvlWrapper}>
                        <GotchiLevel
                            level={gotchi.level}
                            toNextLevel={gotchi.toNextLevel}
                            experience={gotchi.experience}
                            size={28}
                        />
                    </div>

                    <div className={classNames(classes.gotchiInnerSection, classes.gotchiTraits)}>
                        <div className={classes.gotchiTraitsInner}>
                            <HighlightNumber type={calculateRarityType(gotchi.withSetsRarityScore)}>
                                <Typography className={classes.mainVal} variant={'subtitle2'}>
                                    🏆{gotchi.withSetsRarityScore}
                                    <Typography className={classes.defaultVal} component='span' variant='body2'>
                                        ({gotchi.baseRarityScore})
                                    </Typography>
                                </Typography>        
                            </HighlightNumber>
                        </div>

                        <div className={classes.gotchiTraitsInner}>
                            <HighlightNumber type={calculateKinshipType(gotchi.kinship)}>
                                <Typography className={classes.mainVal} variant={'subtitle2'}>
                                    🧡{gotchi.kinship}
                                </Typography>        
                            </HighlightNumber>
                        </div>
                    </div>

                    <div className={classes.gotchiInnerSection}>
                        <GotchiTraitsHighlight traits={gotchi.numericTraits} currentTraits={gotchi.withSetsNumericTraits} />
                    </div>

                    <div className={classes.gotchiInnerSection}>
                        <GotchiWearablesLine wearables={gotchi.equippedWearables}/>
                    </div>
                </>
            )
        } else return null;
    }
    
    return (
        <div
            className={classNames(classes.gotchi)}
            style={{ backgroundColor: fade(gotchiColor, .2) }}
        >
            <Typography
                variant={'subtitle2'}
                className={classNames(classes.owner, classes.gotchiOwner)}
                style={{ backgroundColor: gotchiColor }}
            >
                {title || commonUtils.cutAddress(gotchi.owner.id)}
            </Typography>
            
            <div
                ref={svgBox}
                className={classNames(classes.gotchiSvg, `gotchi-svg-${gotchi.id}`)}
            ></div>

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

            {renderNarrowed()}
        </div>
    );
}