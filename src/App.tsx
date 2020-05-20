import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import Posts from './Posts'

const client = new ApolloClient({
    uri: 'https://fakeql.com/graphql/fe9b1efe32e5aca98d3af2c3f1c47135',
})

const App: React.FC = () => (
    <ApolloProvider client={client}>
        <Posts />
    </ApolloProvider>
)

export default App
