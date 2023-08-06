import {
  createStore, applyMiddleware, compose,
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

}

const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = compose(applyMiddleware(thunk, logger))

const store = createStore(persistedReducer, undefined, middlewares)

const persistor = persistStore(store)

export { store, persistor }
