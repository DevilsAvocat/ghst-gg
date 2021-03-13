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