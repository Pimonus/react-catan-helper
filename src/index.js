import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Board from './board/Board.jsx';

import 'sanitize.css/sanitize.css';
import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <BrowserRouter>
      <Board />
    </BrowserRouter>
  </Provider>,
  target
);
