import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import combineReducers from "./reducers";
import { fetchAuthenticated } from "./actions/account";

const store = createStore(
  combineReducers,
  applyMiddleware(thunk)
);

store.dispatch(fetchAuthenticated())
.then(() => {
  ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
  serviceWorker.unregister();
});
