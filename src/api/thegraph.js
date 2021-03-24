import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

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
        console.error(error);
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
    }
}





