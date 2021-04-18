import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    palette: {
        common: {
          white: '#fff'
        },
        type: 'dark',
        primary: {
            main: '#fd9af9'
        },
        secondary: {
            main: '#2c2f36',
            dark: '#212429'
        },
        background: {
            paper: '#343740',
            default: '#2c2f36'
        },
        text: {
            primary: '#fff'
        },
        rarity: {
            common: 'rgb(128, 100, 255)',
            uncommon: 'rgb(51, 186, 204)',
            rare: 'rgb(89, 188, 255)',
            legendary: 'rgb(255, 195, 107)',
            mythical: 'rgb(255, 150, 255)',
            godlike: 'rgb(81, 255, 168)'
        },
        rewards: {
            color1: '#E76F51',
            color2: '#2A9D8F',
            color3: '#FFFF3F',
            color4: '#219EBC',
            color5: '#8338EC',
            color6: '#D00000',
            color7: '#E79872',
            color8: '#B8F2E6',
            color9: '#8AC926',
            color10: '#E500A4'
        },
        customColors: {
            lightGray: '#9A9EAA',
            grayBorder: '#C3C5CB'
        }
    },
    typography: {
        fontFamily: "'Fira Code', monospace"
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1640
        }
    }
});