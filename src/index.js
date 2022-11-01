/* eslint-disable import/no-unresolved */
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store';
import App from './components/app';

import './index.css';

const container = document.getElementById('blog');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
