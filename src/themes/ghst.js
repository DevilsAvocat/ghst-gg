import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#7217F4'
        },
        secondary: {
            main: '#e83e8c'
        },
        background: {
            paper: '#fff',
            default: '#fa35f2'
        }
    },
    typography: {
        fontFamily: "'Source Code Pro', monospace"
    }
});