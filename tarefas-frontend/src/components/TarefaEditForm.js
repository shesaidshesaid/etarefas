// src/components/TarefaEditForm.js

import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function TarefaEditForm({ visible, onCancel, onEdit, tarefa }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFinish = (values) => {
    onEdit({ ...tarefa, ...values, foto: fileList[0]?.originFileObj });
    form.resetFields();
    setFileList([]);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      open={visible}
      title="Editar Tarefa"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish} initialValues={tarefa}>
        <Form.Item
          name="titulo"
          rules={[{ required: true, message: 'Por favor, insira o título' }]}
        >
          <Input placeholder="Título" />
        </Form.Item>
        <Form.Item
          name="descricao"
          rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
        >
          <Input.TextArea placeholder="Descrição" />
        </Form.Item>
        <Form.Item>
          <Upload
            name="foto"
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Alterar Foto</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar Alterações
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TarefaEditForm;
