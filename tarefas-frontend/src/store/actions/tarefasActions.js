// src/store/actions/tarefasActions.js

// Tipos de ação
export const FETCH_TAREFAS_REQUEST = 'FETCH_TAREFAS_REQUEST';
export const FETCH_TAREFAS_SUCCESS = 'FETCH_TAREFAS_SUCCESS';
export const FETCH_TAREFAS_FAILURE = 'FETCH_TAREFAS_FAILURE';

export const ADD_TAREFA_REQUEST = 'ADD_TAREFA_REQUEST';
export const ADD_TAREFA_SUCCESS = 'ADD_TAREFA_SUCCESS';
export const ADD_TAREFA_FAILURE = 'ADD_TAREFA_FAILURE';

export const DELETE_TAREFA_REQUEST = 'DELETE_TAREFA_REQUEST';
export const DELETE_TAREFA_SUCCESS = 'DELETE_TAREFA_SUCCESS';
export const DELETE_TAREFA_FAILURE = 'DELETE_TAREFA_FAILURE';

export const UPDATE_TAREFA_REQUEST = 'UPDATE_TAREFA_REQUEST';
export const UPDATE_TAREFA_SUCCESS = 'UPDATE_TAREFA_SUCCESS';
export const UPDATE_TAREFA_FAILURE = 'UPDATE_TAREFA_FAILURE';

// Ações para buscar tarefas
export const fetchTarefas = () => ({
  type: FETCH_TAREFAS_REQUEST,
});

export const fetchTarefasSuccess = (tarefas) => ({
  type: FETCH_TAREFAS_SUCCESS,
  payload: tarefas,
});

export const fetchTarefasFailure = (error) => ({
  type: FETCH_TAREFAS_FAILURE,
  payload: error,
});

// Ações para adicionar tarefa
export const addTarefa = (tarefaData) => ({
  type: ADD_TAREFA_REQUEST,
  payload: tarefaData,
});

export const addTarefaSuccess = (tarefa) => ({
  type: ADD_TAREFA_SUCCESS,
  payload: tarefa,
});

export const addTarefaFailure = (error) => ({
  type: ADD_TAREFA_FAILURE,
  payload: error,
});

// Ações para deletar tarefa
export const deleteTarefa = (id) => ({
  type: DELETE_TAREFA_REQUEST,
  payload: id,
});

export const deleteTarefaSuccess = (id) => ({
  type: DELETE_TAREFA_SUCCESS,
  payload: id,
});

export const deleteTarefaFailure = (error) => ({
  type: DELETE_TAREFA_FAILURE,
  payload: error,
});

// Ações para atualizar tarefa
export const updateTarefa = (tarefaData) => ({
  type: UPDATE_TAREFA_REQUEST,
  payload: tarefaData,
});

export const updateTarefaSuccess = (tarefa) => ({
  type: UPDATE_TAREFA_SUCCESS,
  payload: tarefa,
});

export const updateTarefaFailure = (error) => ({
  type: UPDATE_TAREFA_FAILURE,
  payload: error,
});
