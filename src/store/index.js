// eslint-disable-next-line import/order
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import { articlesReduser } from './articlesReduser';
import { goPageReduser } from './goPageReduser';
import { signUpReduser } from './signUpReduser';
// import { signInReduser } from './signInReduser';

const rootReduser = combineReducers({
  articles: articlesReduser,
  goPage: goPageReduser,
  signUp: signUpReduser,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// eslint-disable-next-line no-unused-vars
const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};
// eslint-disable-next-line import/prefer-default-export
export const store = createStore(rootReduser, composeEnhancers(applyMiddleware(loggerMiddleware, reduxThunk)));
// store.subscribe(() => console.log(store.getState()));
