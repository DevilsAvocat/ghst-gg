import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, fade, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    section: {
        padding: '50px 0',
    }
}));

export default function HighlightNumber({children, type}) {
    const classes = useStyles();
    const theme = useTheme();

    const getColor = (type) => {
        switch (type) {
            case 'common':
                return theme.palette.rarity.common;
            case 'uncommon':
                return theme.palette.rarity.uncommon;
            case 'rare':
                return theme.palette.rarity.rare;
            case 'legendary':
                return theme.palette.rarity.legendary;
            case 'mythical':
                return theme.palette.rarity.mythical;
            case 'godlike':
                return theme.palette.rarity.godlike;
            default:
                return 'transparent';
        }
    };

    return (
        <Box
            className={classes.box}
            padding='2px'
            bgcolor={getColor(type) == 'transparent' ? 'transparent' : fade(getColor(type), .15)}
            borderRadius={3}
            border={`1px solid ${getColor(type)}`}
        >
            {children}
        </Box>
    );
}