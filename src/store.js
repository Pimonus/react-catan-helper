import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import * as History from 'history';

import { middleware } from '@redux/middlewares/index';
import { reducer } from '@reducers/main';
import { initialState } from '@store';

export const history = History.createBrowserHistory();

const enhancers = [];
const middlewares = [thunk, routerMiddleware(history), middleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

export default createStore(
  connectRouter(history)(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
  initialState,
  composedEnhancers
);
