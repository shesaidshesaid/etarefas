// src/store/store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import tarefasReducer from './reducers/tarefasReducer';
import tarefasSaga from './sagas/tarefasSaga';

// Cria o middleware do Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Cria a store com o reducer e o middleware
const store = createStore(tarefasReducer, applyMiddleware(sagaMiddleware));

// Executa o Saga principal
sagaMiddleware.run(tarefasSaga);

export default store;
