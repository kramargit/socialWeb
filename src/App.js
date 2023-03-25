import React from 'react';
import { createRoot } from 'react-dom/client';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Pages from './pages';

const App = () => {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <aside>
          <Navigation />
        </aside>
        <main><Pages /></main>
      </main>
      <footer></footer>
    </React.Fragment>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);