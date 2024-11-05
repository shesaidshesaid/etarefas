// src/store/sagas/tarefasSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_TAREFAS_REQUEST,
  fetchTarefasSuccess,
  fetchTarefasFailure,
  ADD_TAREFA_REQUEST,
  addTarefaSuccess,
  addTarefaFailure,
  DELETE_TAREFA_REQUEST,
  deleteTarefaSuccess,
  deleteTarefaFailure,
  UPDATE_TAREFA_REQUEST,
  updateTarefaSuccess,
  updateTarefaFailure,
} from '../actions/tarefasActions';
import { API_URL } from '../../api';  // Importação do API_URL

// Saga para buscar tarefas
function* fetchTarefasSaga() {
  try {
    const response = yield call(axios.get, `${API_URL}/tarefas`);
    yield put(fetchTarefasSuccess(response.data));
  } catch (error) {
    yield put(fetchTarefasFailure(error.message));
    console.error('Erro ao buscar tarefas', error);
  }
}

// Saga para adicionar tarefa
function* addTarefaSaga(action) {
  try {
    const { titulo, descricao, foto, concluida, fotoSenha } = action.payload;
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('concluida', concluida);
    if (foto) {
      formData.append('foto', foto);
    }
    if (fotoSenha) {
      formData.append('fotoSenha', fotoSenha);
    }

    const response = yield call(
      axios.post,
      `${API_URL}/tarefas`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    yield put(addTarefaSuccess(response.data));
  } catch (error) {
    yield put(addTarefaFailure(error.message));
    console.error('Erro ao adicionar tarefa', error);
  }
}

// Saga para deletar tarefa
function* deleteTarefaSaga(action) {
  try {
    yield call(
      axios.delete,
      `${API_URL}/tarefas/${action.payload}`
    );
    yield put(deleteTarefaSuccess(action.payload));
  } catch (error) {
    yield put(deleteTarefaFailure(error.message));
    console.error('Erro ao deletar tarefa', error);
  }
}

// Saga para atualizar tarefa
function* updateTarefaSaga(action) {
  try {
    const { id, titulo, descricao, foto, concluida, fotoSenha } = action.payload;
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('concluida', concluida);
    if (foto) {
      formData.append('foto', foto);
    }
    if (fotoSenha) {
      formData.append('fotoSenha', fotoSenha);
    }

    const response = yield call(
      axios.put,
      `${API_URL}/tarefas/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    yield put(updateTarefaSuccess(response.data));
  } catch (error) {
    yield put(updateTarefaFailure(error.message));
    console.error('Erro ao atualizar tarefa', error);
  }
}

// Saga principal que agrupa todos os outros Sagas
export default function* tarefasSaga() {
  yield takeLatest(FETCH_TAREFAS_REQUEST, fetchTarefasSaga);
  yield takeLatest(ADD_TAREFA_REQUEST, addTarefaSaga);
  yield takeLatest(DELETE_TAREFA_REQUEST, deleteTarefaSaga);
  yield takeLatest(UPDATE_TAREFA_REQUEST, updateTarefaSaga);
}
