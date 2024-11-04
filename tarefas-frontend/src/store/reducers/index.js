// src/store/reducers/index.js
import { combineReducers } from 'redux';
import tarefasReducer from './tarefasReducer';

const rootReducer = combineReducers({
  tarefasState: tarefasReducer,
});

export default rootReducer;
