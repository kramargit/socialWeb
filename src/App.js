import React from 'react';
import { createRoot } from 'react-dom/client';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Pages />
    </React.Fragment>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);