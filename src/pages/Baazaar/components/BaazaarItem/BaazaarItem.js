import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Link, Typography} from "@material-ui/core";
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    baazaarItem: {
        marginBottom: 0,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: theme.palette.text.primary,
        padding: '17px 7px',
        borderRadius: 10,
        '&.common': { borderColor: theme.palette.rarity.common },
        '&.uncommon': { borderColor: theme.palette.rarity.uncommon },
        '&.rare': { borderColor: theme.palette.rarity.rare },
        '&.legendary': { borderColor: theme.palette.rarity.legendary },
        '&.mythical': { borderColor: theme.palette.rarity.mythical },
        '&.godlike': { borderColor: theme.palette.rarity.godlike }
    },
    itemRarity: {
        width: '100%',
        display: 'block',
        textAlign: 'center',
        fontSize: 16,
        textTransform: 'capitalize',
        height: 26,
        '&.common': { color: theme.palette.rarity.common },
        '&.uncommon': { color: theme.palette.rarity.uncommon },
        '&.rare': { color: theme.palette.rarity.rare },
        '&.legendary': { color: theme.palette.rarity.legendary },
        '&.mythical': { color: theme.palette.rarity.mythical },
        '&.godlike': { color: theme.palette.rarity.godlike }
    },
    quantityAndSeller: {
        width: '100%',
        display: 'block',
        padding: '10px 0',
        color: theme.palette.text.primary,
        textAlign: 'center'
    },
    price: {
        width: '100%',
        display: 'block',
        textAlign: 'center',
        padding: '4px 0',
        fontWeight: 700,
        color: theme.palette.primary.main,
        fontSize: 16
    },
    itemImg: {
        height: 130,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > img': {
            maxHeight: 80,
            filter: 'drop-shadow( 0px 0px 8px rgba(255,255,209,.6))'
        }
    }
}));

const getWearableImg = (item) => {
    const typeMap = {
        wearable: () => returnWearable(),
        closed_portal: () => {
            return require(`../../../../assets/images/portal-sealed.svg`).default;
        },
        open_portal: () => {
            return require(`../../../../assets/images/portal-open.svg`).default;
        },
        aavegotchi: () => returnAavegotchi(),
        consumable: () => returnWearable()
    }

    function returnWearable() {
        try {
            return require(`../../../../assets/wearables/${item.token.item_id}.svg`).default;
        } catch (error) {
            return require(`../../../../assets/images/no-image2.svg`).default;
        }
    }

    function returnAavegotchi() {
        try {
            return require(`../../../../assets/svgs/${item.token.item_id}.svg`).default;
        } catch (error) {
            return require(`../../../../assets/images/no-image2.svg`).default;
        }
    }

    return typeMap[item._type]();
};

const getItemRarity = (item) => {
    if (item._type === 'wearable') {
        return item?.token?.rarity || 'No_rarity';
    } else {
        return 'No_rarity';
    }
};

const getItemRarityTitle = (item) => {
    if (item._type === 'wearable') {
        return item?.token?.rarity || ' ';
    } else {
        return '';
    }
};

export default function BaazaarItem({item}) {
    const classes = useStyles();

    return (
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={item.listing_id}>
            <Box className={classNames(classes.baazaarItem, getItemRarity(item))}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography
                            className={classNames(classes.itemRarity, getItemRarity(item))}
                            variant={'caption'}
                        >
                            {getItemRarityTitle(item)}
                        </Typography>
                    </Grid>
                    <Grid className={classes.itemImg} item xs={12}>
                        <img src={getWearableImg(item)} alt={item.listing_id} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            className={classes.quantityAndSeller}
                            variant={'caption'}
                        >
                            {item.quantity} pcs.
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Link
                            className={classes.quantityAndSeller}
                            href={`https://aavegotchi.com/baazaar/owner/${item.seller}`}
                            target={'_blank'}
                        >
                            seller
                        </Link>
                    </Grid>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={6}>
                            <Typography
                                className={classes.price}
                                variant={'caption'}
                            >
                                {parseInt(item.price)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                href={item.url}
                                color={'primary'}
                                variant={'contained'}
                                target={'_blank'}
                            >
                                Buy
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}