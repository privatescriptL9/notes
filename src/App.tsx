import React from 'react'
import './App.scss'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sider/Sidebar'
import Workspace from './components/Workspace/Workspace'

const App: React.FC = () => {
  return (
    <Layout className="App">
      <Header />
      <div className="wrapper">
        <Sidebar />
        <Workspace />
      </div>
    </Layout>
  )
}

export default App
