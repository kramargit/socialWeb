//Импортируем зависимости
const depthLimit = require('graphql-depth-limit');
const {createComplexityLimitRule} = require('graphql-validation-complexity');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//Импортируем локальные модули


// Получаем информацию пользователя из JWT\


//Запускаем сервер на порте, указанном в файле .env, или на порте 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
// Добавляем промежуточное ПО в начало стека, после const app = express()
app.use(helmet());
app.use(cors());

// Подключаем БД


// Настраиваем Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});


// Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api
server.applyMiddleware({app, path: '/api'});

app.listen({port}, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);