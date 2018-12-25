import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using


const sagaMiddleware = createSagaMiddleware();
import Reducer from '../reducer';

const store = createStore(Reducer, applyMiddleware(sagaMiddleware));

export default store;