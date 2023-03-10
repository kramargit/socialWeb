const {gql} = require('apollo-server-express');

module.exports = gql`

    type Note {
        id: ID!
        theme: String!
        content: String!
    }

    type Query {
        notes: [Note!]!
    }
`;