import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';

import sagas from './sagas';
import rootReducer from './reducers';

import { persistReducer, persistStore } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const persistConfig = {
  key: '_cisco',
  storage,
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(sagas);

// export default store;
const persistor = persistStore(store);

export { persistor, store };
