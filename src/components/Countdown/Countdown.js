import React, { useState } from 'react';
import { DateTime, Duration } from "luxon";
import useInterval from '../../hooks/useInterval';
import useStyles from './styles';

const interval = 1000/24;

DateTime.local().setZone("America/Bogus");

const names = {
    S: ['millisecond', 'milliseconds'],
    ss: ['second', 'seconds'],
    mm: ['minute', 'minutes'],
    hh: ['hour', 'hours'],
    dd: ['day', 'days'],
    M: ['month', 'months'],
    // YY: ['year', 'years'] 
}

const getName = (names, number) => {
    return names[Number(number) === 1 ? 0 : 1];
}

export default function Countdown({date, format}) {
    const [newDate, setNewDate] = useState('');
    const classes = useStyles();
    const formatArray = format.split(':');

    useInterval(() => {
        const diffTime = date - DateTime.local();

        setNewDate(Duration.fromObject({milliseconds: diffTime}).toFormat(format));
    }, interval);

    return (
        <>
            <div className={classes.wrapper}>
                {
                    newDate.split(':').map((item, index) => {
                        return (
                            <div className={classes.inner} key={index}>
                                <span className={classes.number}>
                                    {item}
                                </span>
                                <p className={classes.text}>
                                    {getName(names[formatArray[index]], item)}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}