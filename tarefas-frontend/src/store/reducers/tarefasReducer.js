// src/store/reducers/tarefasReducer.js

import {
  FETCH_TAREFAS_REQUEST,
  FETCH_TAREFAS_SUCCESS,
  FETCH_TAREFAS_FAILURE,
  ADD_TAREFA_REQUEST,
  ADD_TAREFA_SUCCESS,
  ADD_TAREFA_FAILURE,
  DELETE_TAREFA_REQUEST,
  DELETE_TAREFA_SUCCESS,
  DELETE_TAREFA_FAILURE,
  UPDATE_TAREFA_REQUEST,
  UPDATE_TAREFA_SUCCESS,
  UPDATE_TAREFA_FAILURE,
} from '../actions/tarefasActions';

const initialState = {
  tarefas: [],
  loading: false,
  error: null,
};

const tarefasReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAREFAS_REQUEST:
    case ADD_TAREFA_REQUEST:
    case DELETE_TAREFA_REQUEST:
    case UPDATE_TAREFA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TAREFAS_SUCCESS:
      return {
        ...state,
        loading: false,
        tarefas: action.payload,
      };
    case ADD_TAREFA_SUCCESS:
      return {
        ...state,
        loading: false,
        tarefas: [...state.tarefas, action.payload],
      };
    case DELETE_TAREFA_SUCCESS:
      return {
        ...state,
        loading: false,
        tarefas: state.tarefas.filter((tarefa) => tarefa.id !== action.payload),
      };
    case UPDATE_TAREFA_SUCCESS:
      return {
        ...state,
        loading: false,
        tarefas: state.tarefas.map((tarefa) =>
          tarefa.id === action.payload.id ? action.payload : tarefa
        ),
      };
    case FETCH_TAREFAS_FAILURE:
    case ADD_TAREFA_FAILURE:
    case DELETE_TAREFA_FAILURE:
    case UPDATE_TAREFA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tarefasReducer;
