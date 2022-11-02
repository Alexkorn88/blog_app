// eslint-disable-next-line import/order
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { articlesReduser } from './articlesReduser';
import { goPageReduser } from './goPageReduser';
import { signUpReduser } from './signUpReduser';

// import { signInReduser } from './signInReduser';

const rootReducer = combineReducers({
  articles: articlesReduser,
  goPage: goPageReduser,
  signUp: signUpReduser,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(loggerMiddleware, reduxThunk)));
export const persistor = persistStore(store);
// store.subscribe(() => console.log(store.getState()));
