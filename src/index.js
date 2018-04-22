import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Store from './store/';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Let the reducers handle initial state
const initialState = {};
const store = Store(initialState);

if (typeof window !== 'undefined') {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.querySelector('body')
  );
}

registerServiceWorker();
