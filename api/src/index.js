//Импортируем зависимости
const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

//Импортируем локальные модули
const typeDefs = gql`
    type Note {
        id: ID!
        theme: String!
        content: String!
        author: String!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Mutation {
        newNote(theme: String!, content: String!): Note!
    }
`;

const resolvers = {
    Query: {
        notes: async () => {
            return models.Note.find();
        },
        note: async (parent, args) => {
            return await models.Note.findById(args.id);
        }
    },
    Mutation: {
        newNote: async (parent, args) => {
            return await models.Note.create({
                theme: args.theme,
                content: args.content,
                author: "Евгений"
            });
        }
    }
};

const app = express();

db.connect(DB_HOST);

// Настраиваем Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api
(async function() {
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
  })();

app.listen({port}, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}`
    )
);