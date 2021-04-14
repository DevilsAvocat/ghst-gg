import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import {gotchiesQuery} from './common/queries';

var baseUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic',
    client = new ApolloClient({
        uri: baseUrl,
        cache: new InMemoryCache()
    });


async function graphJoin(queries) {
    try {
        const queriesCounter = queries.length,
            responseArray = [];

        for (let i = 0; i < queriesCounter; i++) {
            await responseArray.push(
                await client
                    .query({
                        query: gql`${queries[i]}`
                    })
            )
        }

        return responseArray;
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

    async getJoinedData(queries) {
        return await graphJoin(queries);
    },

    async getAllGotchies() {
        // TODO: resolve hardcoded gotchies max amount, current - 6000 (if you enter more queries, response will be broken)
        return await graphJoin([gotchiesQuery(0), gotchiesQuery(1000), gotchiesQuery(2000), gotchiesQuery(3000), gotchiesQuery(4000), gotchiesQuery(5000)])
            .then((response)=> {
                let combinedArray = [];

                for (let i=0; i < response.length; i++) {
                    combinedArray = [...response[i].data.aavegotchis, ...combinedArray];
                }

                return combinedArray;
            });
    }
}





