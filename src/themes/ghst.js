import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    palette: {
        common: {
          white: '#c3c5cb'
        },
        type: "dark",
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
            primary: '#c3c5cb'
        },
        rarity: {
            common: 'rgb(128, 100, 255)',
            uncommon: 'rgb(51, 186, 204)',
            rare: 'rgb(89, 188, 255)',
            legendary: 'rgb(255, 195, 107)',
            mythical: 'rgb(255, 150, 255)',
            godlike: 'rgb(81, 255, 168)'
        }
    },
    typography: {
        fontFamily: "'Source Code Pro', monospace"
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