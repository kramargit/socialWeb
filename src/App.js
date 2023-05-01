import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient,
          ApolloProvider,
          createHttpLink,
          InMemoryCache,
          gql } from '@apollo/client';
import { setContext } from 'apollo-link-context';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

// Настройка API URI и кеш
const uri = process.env.API_URI || 'http://localhost:4000/api';
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

//Проверяем наличие токена и возвращаем заголовки в контекст
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

//Настройка Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

//проверяем наличие локального токена
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

//Записываем данные кеша при начальной загрузке
cache.writeQuery({ query: gql`query { isLoggedIn }`, data });

//Записываем данные кеша после его сброса
client.onResetStore(() => cache.writeQuery({ query: gql`query { isLoggedIn }`, data }));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);