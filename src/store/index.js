import { createStore } from 'redux';
import reducers from './reducers';

export default function Store(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
  );

  return store;
};
