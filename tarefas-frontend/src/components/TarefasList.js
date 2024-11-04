// src/components/TarefasList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTarefas,
  deleteTarefa,
  updateTarefa,
} from '../store/actions/tarefasActions';
import { Table, Button, Typography, Image, Modal, Input } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import TarefaEditForm from './TarefaEditForm';
import axios from 'axios';

const { Text } = Typography;

function TarefasList() {
  const dispatch = useDispatch();
  const { tarefas, loading, error } = useSelector((state) => state);

  const [editingTarefa, setEditingTarefa] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fotoSenhaInput, setFotoSenhaInput] = useState(''); // Inicialize aqui

  useEffect(() => {
    dispatch(fetchTarefas());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTarefa(id));
  };

  const handleEdit = (tarefa) => {
    setEditingTarefa(tarefa);
    setIsModalVisible(true);
  };

  const handleEditSubmit = (updatedTarefa) => {
    dispatch(updateTarefa(updatedTarefa));
    setIsModalVisible(false);
    setEditingTarefa(null);
  };

  const handleCancelEdit = () => {
    setIsModalVisible(false);
    setEditingTarefa(null);
  };

  const handleImagePreview = (tarefa) => {
    if (tarefa.fotoSenha) {
      Modal.confirm({
        title: 'Esta foto é protegida por senha.',
        content: (
          <Input.Password
            placeholder="Digite a senha"
            onChange={(e) => setFotoSenhaInput(e.target.value)}
          />
        ),
        onOk: () => {
          fetchFotoComSenha(tarefa.fotoUrl, fotoSenhaInput);
        },
      });
    } else {
      setImagePreview(`https://etarefas-c64f7fa2b10d.herokuapp.com${tarefa.fotoUrl}`);
    }
  };

  const fetchFotoComSenha = (fotoUrl, fotoSenha) => {
    axios
      .get(`https://etarefas-c64f7fa2b10d.herokuapp.com${fotoUrl}`, {
        params: { fotoSenha },
        responseType: 'blob',
      })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setImagePreview(imageUrl);
      })
      .catch((error) => {
        Modal.error({ title: 'Senha incorreta ou erro ao carregar a foto.' });
      });
  };

  const handleImagePreviewClose = () => {
    setImagePreview(null);
  };

  const handleConcluir = (tarefa) => {
    dispatch(updateTarefa({ ...tarefa, concluida: true }));
  };

  const columns = [
    {
      title: 'Tarefas',
      dataIndex: 'titulo',
      key: 'titulo',
      render: (text, tarefa) => (
        <>
          <Text delete={tarefa.concluida} strong>
            {text}
          </Text>
          <br />
          <Text type="secondary">{tarefa.descricao}</Text>
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, tarefa) => (
        <span>{tarefa.concluida ? 'Finalizado' : 'Pendente'}</span>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, tarefa) => (
        <>
          {tarefa.fotoUrl && (
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleImagePreview(tarefa)}
            >
              Ver Foto
            </Button>
          )}
          <Button
            icon={<CheckOutlined />}
            onClick={() => handleConcluir(tarefa)}
            style={{
              backgroundColor: tarefa.concluida ? '#d9d9d9' : '#1890ff',
              color: tarefa.concluida ? 'grey' : 'white',
              cursor: tarefa.concluida ? 'not-allowed' : 'pointer',
              borderColor: tarefa.concluida ? '#d9d9d9' : '#1890ff',
              width: 100,
            }}
            disabled={tarefa.concluida}
          >
            {tarefa.concluida ? 'Concluído' : 'Concluir'}
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(tarefa)}
          >
            Editar
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(tarefa.id)}
            style={{
              backgroundColor: '#e6f7ff',
              color: '#1890ff',
              borderColor: '#91d5ff',
            }}
          >
            Deletar
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <Table
        dataSource={tarefas}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      {editingTarefa && (
        <TarefaEditForm
          visible={isModalVisible}
          onCancel={handleCancelEdit}
          onEdit={handleEditSubmit}
          tarefa={editingTarefa}
        />
      )}

      {imagePreview && (
        <Modal
          open={true}
          footer={null}
          onCancel={handleImagePreviewClose}
        >
          <Image src={imagePreview} alt="Foto da Tarefa" />
        </Modal>
      )}
    </>
  );
}

export default TarefasList;
