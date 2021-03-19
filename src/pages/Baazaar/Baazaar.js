import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import baazaar from "../../api/baazaar";
import Grid from "@material-ui/core/Grid";
import BaazaarBody from "./components/BaazaarBody/BaazaarBody";
import BaazaarSidebar from "./components/BaazaarSidebar/BaazaarSidebar";
import { Backdrop, CircularProgress } from "@material-ui/core";

var paginationConfigs = {
    limit: 24
};

const useStyles = makeStyles((theme) => ({
    baazaar: {
        borderTop: '1px solid rgba(253, 154, 249, .25)'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

export default function Baazaar() {
    const classes = useStyles();
    const [goods, setGoods] = useState([]);
    const [backdropIsOpen, showBackdrop] = useState(false);
    // pagination
    const [paginationCount, setPaginationCount] = useState(0);
    const [lastValidParams, setLastValidParams] = useState({});
    const [page, setPage] = useState(1);


    const onLoadBaazaarItemsClick = (params) => {
        const validParams = validateParams(params);

        if (validParams) {
            const paramsWithLimit = {
                ...validParams,
                limit: paginationConfigs.limit
            };

            setPage(1);
            setLastValidParams(paramsWithLimit);
            getBaazaarItems(paramsWithLimit);
        }
    };

    const validateParams = (params) => {
        let newParams = {};

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (params[key] || params[key] === 0) {
                    newParams[key] = params[key];
                }
            }
        }

        return newParams;
    };

    const onPageChange = async (newPage) => {
        const params = {
            ...lastValidParams,
            offset: (newPage - 1) * paginationConfigs.limit,
            limit: paginationConfigs.limit
        };
        setLastValidParams(params);
        getBaazaarItems(params);
    };

    const getPaginationCount = (goodsCount) => {
        const paginationCount = goodsCount/paginationConfigs.limit;

        if (paginationCount % 1 > 0) {
            return parseInt(paginationCount) + 1;
        } else {
            return paginationCount;
        }
    };

    const getBaazaarItems = useCallback((params) => {
        showBackdrop(true);
        baazaar.getItems(params).then((response) => {
            setGoods(response.data.results);
            setPaginationCount(getPaginationCount(response.data.count));
            showBackdrop(false);
        }).catch(() => {
            showBackdrop(false);
        });
    }, []);

    useEffect(() => {
        const params = {
            limit: paginationConfigs.limit
        };

        getBaazaarItems(params);
        setLastValidParams(params);
    }, [getBaazaarItems]);

    return (
        <Grid container item className={classes.baazaar}>
            <BaazaarSidebar loadBaazaarGoods={onLoadBaazaarItemsClick} />
            <BaazaarBody goods={goods} paginationCount={paginationCount} page={page} setPage={setPage} onPageChange={onPageChange} />
            <Backdrop className={classes.backdrop} open={backdropIsOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
}
