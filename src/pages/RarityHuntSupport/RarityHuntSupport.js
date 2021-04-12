import React from 'react';
import { Container, TextField } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';

export default function RarityHuntSupport() {
    const classes = useStyles();

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Helmet>
                <title>Rarity Hunt Support</title>
            </Helmet>
            <TextField
                type='text'
                variant='outlined'
                fullWidth
                size={'small'}
                label={'Address'}
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur dicta ex explicabo facilis impedit in ipsum iusto libero maiores molestiae, numquam odio quisquam rem rerum sequi totam, ut, voluptatibus?</p>
        </Container>
    );
}