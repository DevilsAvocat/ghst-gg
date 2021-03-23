import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid, Toolbar, Typography} from "@material-ui/core";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    footerWrapper: {
        backgroundColor: theme.palette.secondary.dark,
        padding: '5px 30px'
    },
    highlight: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 4,
        padding: '4px 8px',
        color: theme.palette.primary.main,
        marginRight: 8
    }
}));

export default function Footer() {
    const classes = useStyles(),
        { isOpen, type, message, onSnackbarClose } = useContext(SnackbarContext);

    return (
        <Grid item container className={classes.footerWrapper}>
            <Toolbar className={classes.toolbar}>
                <Typography>
                    <Box component='span' className={classes.highlight}>v3</Box>
                    <Box component='span'>the most entertaining outcome is the most likely</Box>
                </Typography>
            </Toolbar>
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={() => onSnackbarClose()}>
                <Alert onClose={() => onSnackbarClose()} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        </Grid>
    )
}