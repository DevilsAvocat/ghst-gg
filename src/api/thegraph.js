import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { logDOM } from '@testing-library/react';
import {gotchiesQuery, svgQuery, userQuery, aavegotchiQuery} from './common/queries';

var baseUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';
var raffleUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-matic-raffle';
var gotchiSVGs = 'https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-svg';

var client = new ApolloClient({
    uri: baseUrl,
    cache: new InMemoryCache()
});

var raffleClient = new ApolloClient({
    uri: raffleUrl,
    cache: new InMemoryCache()
});

var svgsClient = new ApolloClient({
    uri: gotchiSVGs,
    cache: new InMemoryCache()
});


async function graphJoin(query) {
    try {
        let response;

        response = await client
            .query({
                query: gql`${query}`
            })

        return response;
    } catch (error) {
        return [];
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getData(query) {
        return await client
            .query({
                query: gql`${query}`
            });
    },

    async getJoinedData(query) {
        return await graphJoin(query);
    },

    async getAllGotchies() {
        // NOTE: to reduce loading speed current gotchies max amount is 7000
        // We should add new queries when there will be more than 7000 unique gotchies
        return await graphJoin([
            gotchiesQuery(0, 'asc'),
            gotchiesQuery(1000, 'asc'),
            gotchiesQuery(2000, 'asc'),
            gotchiesQuery(3000, 'asc'),
            gotchiesQuery(4000, 'asc'),
            gotchiesQuery(5000, 'asc'),
            gotchiesQuery(0, 'desc'),
            gotchiesQuery(1000, 'desc'),
            gotchiesQuery(2000, 'desc'),
            gotchiesQuery(3000, 'desc'),
            gotchiesQuery(4000, 'desc'),
            gotchiesQuery(5000, 'desc')
        ]).then((response)=> {
            let responseArray = [];

            for (let i = 0; i < response.length; i++) {
                responseArray = [...response[i].data.aavegotchis, ...responseArray];
            }

            let filteredArray = responseArray.reduce((unique, item) => {
                const index = unique.findIndex(el => el.id === item.id);

                if (index === -1) {
                    unique.push(item);
                }

                return unique;
            }, []);

            return filteredArray;
        });
    },

    async getGotchiesByAddresses(addressesArray) {
        let gotchies = [];

        let promises = addressesArray.map( (address) => {
            return this.getGotchiByAddress(address);
        });
        
        await Promise.all(promises).then( (result) => {
            gotchies = result;
        });

        return gotchies;
    },

    async getGotchiByAddress(address) {
        let data;
         await this.getJoinedData(userQuery(address.toLowerCase())).then( (result) => {
            data = result;
        });

        return data;
    },

    async getGotchiById(id) {

        let result = await client
            .query({
                query: gql`${aavegotchiQuery(id)}`
            });
        return result.data.aavegotchi;
    },

    async getRaffleData(query) {
        return await raffleClient
            .query({
                query: gql`${query}`
            });
    },

    async getGotchiSvgById(id) {
        return await svgsClient
            .query({
                query: gql`${svgQuery(id)}`
            });
    },
}
