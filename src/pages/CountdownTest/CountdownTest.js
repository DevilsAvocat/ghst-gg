import React from 'react';
import { Box } from '@material-ui/core';
import Countdown from '../../components/Countdown/Countdown';

export default function CountdownTest() {
    const date = new Date(2021, 10, 11, 20, 17);

    return (
        <Box maxWidth={600} margin='auto' padding={4}>
            <Countdown date={date} format='dd:hh:mm:ss' />
        </Box>
    );
}
