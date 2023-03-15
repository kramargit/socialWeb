const {gql} = require('apollo-server-express');

module.exports = gql`
    scalar DateTime

    type Note {
        id: ID!
        theme: String!
        content: String!
        author: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Mutation {
        newNote(theme: String!, content: String!): Note!
        updateNote(id: ID!, theme: String!, content: String!): Note!
        deleteNote(id: ID!): Boolean!
    }
`;