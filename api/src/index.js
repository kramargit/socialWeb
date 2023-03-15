//Импортируем зависимости
const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

// Настраиваем Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return { models };
    }
});

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