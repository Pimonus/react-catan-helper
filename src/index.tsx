import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'sanitize.css/sanitize.css';

import Board from '@board/Board';
import store from './store';

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
