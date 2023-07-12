import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://broadband.comparethemarket.com/graphql',
    cache: new InMemoryCache(),
  });

  export default client