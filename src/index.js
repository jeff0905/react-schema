import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'

import App from './App';
import rootReducer from './redux/reducer';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
)

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
