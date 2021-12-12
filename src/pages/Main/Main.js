import React from 'react';
import { Grid } from '@mui/material';
import Portals from './components/Portals/Portals';
import Team from './components/Team/Team';
import Section from '../../components/Section/Section';

export default function Main() {
    return (
        <Grid container>
            <Section backgroundColor='rgba(33, 36, 41, .2)'>
                <h1>Gotchiverse wearable raffle </h1>
                <text>
                Yes, this is a shameless fork of the Ghst.gg open source Gotchiverse client.<br/>
                But it is also a fork of the Aavegotchi raffle contract. <br/>
                Instead of submitting raffle tickets, you submit wearables to the raffle contract.<br/>
                All wearables are pooled with all the other wearables of their rarity type, and a single winner is drawn
                via Chainlink VRF for each rarity type. <br/><br/>
                 Winner take all. <br/><br/>
                 Click the Raffle button in the navbar, and click a wearable to get started. <br/>
                 Currently limited to 1 entry per wallet. <br/>
                 Contract: 0x3a229e65028924E242cDb52da35aFFf87E5A51ca  
                </text>
            </Section>
            <Section backgroundColor='rgb(39, 42, 48)'>
                <Team />
            </Section>
        </Grid>
    );
}
