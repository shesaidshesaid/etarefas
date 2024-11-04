// src/store/sagas/index.js
import { all } from 'redux-saga/effects';
import tarefasSaga from './tarefasSaga';

export default function* rootSaga() {
  yield all([
    tarefasSaga(),
    // Include other sagas here if you add more in the future
  ]);
}
