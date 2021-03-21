import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

var baseUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic',
    client = new ApolloClient({
        uri: baseUrl,
        cache: new InMemoryCache()
    });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getData(query) {
        return await client
            .query({
                query: gql`${query}`
            });
    }
}