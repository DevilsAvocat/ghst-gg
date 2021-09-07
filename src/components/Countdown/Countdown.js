import { Box, Typography } from '@material-ui/core';
import React from 'react';
import Countdown from 'react-countdown';


export default function Timer({date, countdownEnd, isCounting}) {

    const renderer = ({ completed, formatted }) => {
        return completed ? countdownEnd : `${isCounting} ${formatted.hours}:${formatted.minutes}:${formatted.seconds}`
    };

    return (
        <Box>
            <Countdown
                date={date}
                renderer={renderer}
            />
        </Box>
    )
}