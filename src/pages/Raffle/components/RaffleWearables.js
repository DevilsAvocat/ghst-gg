
import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import classNames from "classnames";
import {useStyles} from "../styles";

export default function RaffleWearables({tickets}) {
    const classes = useStyles();

    return (
        <Grid item>
            {
                tickets.map((ticket, i) => {
                    if(ticket.chance !== 0) return <Grid container className={classes.row} key={i}>
                        <Grid item xs={12}>
                            <Typography className={classNames(classes.textHighlight, ticket.type)}>
                                {ticket.type} items chance
                            </Typography>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                            {
                                ticket.wearables.map((wearable, i) => {
                                    return <Grid item xs={4} sm={3} md={2} key={i}>
                                        <Box className={classNames(classes.wearable, ticket.type)}>
                                            <Typography>{wearable.name}</Typography>
                                            <Typography>Available: {wearable.amount}</Typography>
                                            <Typography className={classNames(classes.textHighlight, ticket.type)}>10%</Typography>
                                        </Box>
                                    </Grid>
                                })
                            }
                        </Grid>
                    </Grid>

                    return null;
                })
            }
        </Grid>
    );
}