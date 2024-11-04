// src/components/TarefaForm.js

import React, { useState } from 'react';
import { Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function TarefaForm({ onSubmit }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFinish = (values) => {
    onSubmit({
      ...values,
      foto: fileList[0]?.originFileObj,
      concluida: values.status === 'Finalizada',
    });
    form.resetFields();
    setFileList([]);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="titulo"
        label="Título"
        required
        rules={[{ required: true, message: 'Por favor, insira o título' }]}
      >
        <Input placeholder="Título" />
      </Form.Item>
      <Form.Item
        name="descricao"
        label="Descrição"
        required
        rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
      >
        <Input.TextArea placeholder="Descrição" />
      </Form.Item>
      <Form.Item label="Foto">
        <Upload
          name="foto"
          listType="picture"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Anexar Foto</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Senha da Foto" name="fotoSenha">
        <Input.Password placeholder="Senha para proteger a foto (opcional)" />
      </Form.Item>
      <Form.Item label="Status" name="status" required>
        <Select>
          <Select.Option value="Pendente">Pendente</Select.Option>
          <Select.Option value="Finalizada">Finalizada</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Adicionar Tarefa
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TarefaForm;
