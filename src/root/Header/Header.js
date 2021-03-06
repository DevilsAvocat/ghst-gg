import React from 'react';
import Grid from "@material-ui/core/Grid";
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <Grid item>
            <NavLink to="/" color="textPrimary" href="#">
                Main
            </NavLink>
        </Grid>
    )
}