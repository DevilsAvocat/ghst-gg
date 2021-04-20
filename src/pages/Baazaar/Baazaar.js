import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import thegraph from "../../api/thegraph";
import Grid from "@material-ui/core/Grid";
import BaazaarBody from "./components/BaazaarBody/BaazaarBody";
import BaazaarSidebar from "./components/BaazaarSidebar/BaazaarSidebar";
import { Backdrop, CircularProgress } from "@material-ui/core";

var paginationConfigs = {
    limit: 24
};

var defaults = {
    defaultGoodsType: 'erc1155Listings-3',
    defaultOrdering: 'timeCreated-desc'
};

const useStyles = makeStyles((theme) => ({
    baazaar: {
        padding: 24
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
    const [page, setPage] = useState(1);
    const [lastValidParams, setLastValidParams] = useState({});


    const onLoadBaazaarItemsClick = (params) => {
        const validParams = validateParams(params);

        if (validParams) {
            const paramsWithLimit = {
                ...validParams,
                skip: 0,
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

    const getGraphQueryString = (params) => {
        return `{category: ${params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]} (
            first: ${paginationConfigs.limit},
            skip: ${params.skip},
            orderBy: ${params.ordering ? params.ordering.split('-')[0] : defaults.defaultOrdering[0]},
            orderDirection: ${params.ordering ? params.ordering.split('-')[1] : defaults.defaultOrdering[1]},
            where: {
                cancelled: false,
                ${params.from ? `priceInWei_gte: "${exponentToString(params.from * 1000000000000000000).split('.')[0]}",` : ""}
                priceInWei_lt: ${params.to ? `"${exponentToString(params.to * 1000000000000000000).split('.')[0]}"` : `"10000000000000000000000000"`},
                ${'category: ' + (params.type ? params.type.split('-')[1] : defaults.defaultGoodsType.split('-')[1]) + ','}
                ${
                    (params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]) === 'erc1155Listings' ?
                        `sold: false,
                        ${params.rarity ? 'rarityLevel: ' + params.rarity : ''}` :
                        `timePurchased: "0"`
                }
            })
            {
                id,
                priceInWei,
                category,
                timeCreated,
                seller,
                ${
                    (params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]) === 'erc1155Listings' ?
                        `quantity,
                        rarityLevel,
                        erc1155TypeId,
                        erc1155TokenAddress` :
                        `tokenId,
                        timePurchased,
                        hauntId,
                        gotchi`
                }
            }
        }`
    };

    const exponentToString = (exponent) => {
        let data = String(exponent).split(/[eE]/);

        if (data.length === 1) return data[0];

        let  z = '', sign= exponent < 0 ? '-' : '',
            str = data[0].replace('.', ''),
            mag = Number(data[1]) + 1;

        if (mag < 0) {
            z = sign + '0.';
            while(mag++) z += '0';
            return z + str.replace(/^\-/,'');
        }

        mag -= str.length;
        while(mag--) z += '0';

        return str + z;
    };

    const getBaazaarItems = useCallback((params) => {
        showBackdrop(true);
        thegraph.getData(getGraphQueryString(params)).then((response) => {
            setGoods(response.data.category);
            showBackdrop(false);
        }).catch(() => {
            showBackdrop(false);
        });
    }, []);

    const onNextPageClick = () => {
        setPage(page + 1);
        onPaginationClick(page + 1);
    };

    const onPrevPageClick = () => {
        setPage(page - 1);
        onPaginationClick(page - 1);
    };

    const onPaginationClick = (newPage) => {
        const params = {
            ...lastValidParams,
            skip: (newPage - 1) * paginationConfigs.limit,
            limit: paginationConfigs.limit
        };

        setLastValidParams(params);
        getBaazaarItems(params);
    }

    useEffect(() => {
        const params = {
            skip: (page - 1) * paginationConfigs.limit,
            limit: paginationConfigs.limit,
            type: defaults.defaultGoodsType,
            ordering: defaults.defaultOrdering
        };

        getBaazaarItems(params);
        setLastValidParams(params);
    }, [getBaazaarItems]);

    return (
        <Grid className={classes.baazaar} container spacing={3}>
            <BaazaarSidebar
                loadBaazaarGoods={onLoadBaazaarItemsClick}
                defaultGoodsType={defaults.defaultGoodsType}
                defaultOrdering={defaults.defaultOrdering} />
            <BaazaarBody
                goods={goods}
                page={page}
                limit={paginationConfigs.limit}
                onNextPageClick={onNextPageClick}
                onPrevPageClick={onPrevPageClick}
            />
            <Backdrop className={classes.backdrop} open={backdropIsOpen}>
                <CircularProgress color='primary' />
            </Backdrop>
        </Grid>
    );
}
