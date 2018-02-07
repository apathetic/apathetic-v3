import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function Store(initialState = {}) {
  const middlewares = [thunk];
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  );

  // Extensions
  store.asyncReducers = {}; // Async reducer registry

  return store;
};
