// src/components/AddTarefa.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { addTarefa } from '../store/actions/tarefasActions';
import TarefaForm from './TarefaForm';

function AddTarefa() {
  const dispatch = useDispatch();

  const handleAddTarefa = (tarefaData) => {
    dispatch(addTarefa(tarefaData));
  };

  return <TarefaForm onSubmit={handleAddTarefa} />;
}

export default AddTarefa;
