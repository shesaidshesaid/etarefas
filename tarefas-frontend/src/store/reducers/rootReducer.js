// src/store/reducers/rootReducer.js

import { combineReducers } from 'redux';
import tarefasReducer from './tarefasReducer';

const rootReducer = combineReducers({
  tarefas: tarefasReducer,
  // Add other reducers here if necessary
});

export default rootReducer;
