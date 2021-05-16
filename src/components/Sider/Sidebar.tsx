import React from 'react'
import Sider from 'antd/lib/layout/Sider'
import './Sidebar.scss'
import List from '../List/List'

const Sidebar: React.FC = () => (
  <Sider width="25%" className="Sidebar">
    <List />
  </Sider>
)


export default Sidebar
