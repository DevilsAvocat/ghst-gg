
import React from 'react';
import useStyles from './styles';
import { Modal, Fade, Paper, Box } from '@material-ui/core';
 
export default function ModalWrapper({children, modalOpen, handleClose, width}) {
    const classes = useStyles();

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            className={classes.modal}
            closeAfterTransition
        >
            <Fade in={modalOpen}>
                <Paper variant='outlined'>
                    <Box padding={2} width={width}>
                        {children}
                    </Box>
                </Paper>
            </Fade>
        </Modal>
    );
}
