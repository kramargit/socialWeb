const {gql} = require('apollo-server-express');

module.exports = gql`
    scalar DateTime

    type Note {
        id: ID!
        theme: String!
        content: String!
        author: User!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        notes: [Note!]!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
        user(username: String!): User
        users: [User!]!
        me: User!
    }

    type Mutation {
        newNote(theme: String!, content: String!): Note!
        updateNote(id: ID!, theme: String!, content: String!): Note!
        deleteNote(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
    }
`;