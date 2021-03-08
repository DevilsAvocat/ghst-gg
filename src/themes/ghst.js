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
            main: '#c3c5cb'
        },
        background: {
            paper: '#fff',
            default: '#ff00ff'
        },
        text: {
            primary: '#c3c5cb'
        }
    },
    typography: {
        fontFamily: "'Source Code Pro', monospace"
    }
});