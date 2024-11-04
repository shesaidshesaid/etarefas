// src/App.js

import React from 'react';
import { Layout, Typography } from 'antd';
import AddTarefa from './components/AddTarefa';
import TarefasList from './components/TarefasList';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="App">
      <Header className="App-header" style={{ minHeight: 'auto', height: 'auto' }}>
        <Title level={1} style={{ color: 'white', margin: '0' }}>
          Gerenciador de Tarefas
        </Title>
      </Header>
      <Content className="main-content">
        <AddTarefa />
        <TarefasList />
      </Content>
    </Layout>
  );
}

export default App;
