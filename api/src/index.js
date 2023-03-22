//Импортируем зависимости
const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            new Error('Session invalid');
        }
    }
};

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

// Настраиваем Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // получаем токен пользователя из заголовков
        const token = req.headers.authorization;
        // пытаемся извлечь пользователя с помощью токена
        const user = getUser(token);
        // пока что будем выводить в консоль информацию о пользователе
        console.log(user);
        return { models, user };
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