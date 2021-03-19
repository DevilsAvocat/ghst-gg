import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import BaazaarItem from "../BaazaarItem/BaazaarItem";
import Pagination from '@material-ui/lab/Pagination';
import {Alert} from "@material-ui/lab";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    baazaarBody: {
        padding: 30
    },
    pagination: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        '& nav': {
            marginTop: 15,
            fontSize: '1.2rem'
        }
    },
    warning: {
        marginBottom: '15px'
    },
    noGoods: {
        fontSize: "1rem"
    }
}));

export default function BaazaarBody({goods, paginationCount, onPageChange, setPage, page}) {
    const classes = useStyles();

    const onPaginationClick = (event, newPage) => {
        setPage(newPage);
        onPageChange(newPage);
    };

    return (
        <Grid className={classes.baazaarBody} container item xs={12} sm={8} md={9} lg={9} xl={10} spacing={2}>
            <Grid item xs={12}>
                <Alert className={classes.warning} variant="outlined" severity="warning">Spooky Market is in beta version. Some items may be out of sync for up to 5 min.</Alert>
            </Grid>
            {
                // eslint-disable-next-line array-callback-return
                goods.filter((item) => {
                    if (item.token && item._type && item.price) {
                        return item;
                    }
                }).map((item) => {
                     return <BaazaarItem key={item.listing_id} item={item} />
                })
            }
            <Grid className={classes.pagination} item xs={12}>
                {
                    goods.length ? <Pagination
                            count={paginationCount}
                            variant="outlined"
                            color="primary"
                            page={page}
                            onChange={onPaginationClick}
                            shape="rounded"
                            size={'large'}
                        /> :
                        <Typography className={classes.noGoods} variant={'caption'}>Spooky Market has no such goods :(</Typography>
                }
            </Grid>
        </Grid>
    );
}