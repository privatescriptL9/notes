import React from 'react'
import Sider from 'antd/lib/layout/Sider'
import './Sidebar.scss'
import List from '../List/List'

interface siderProps {
  siderStatus: boolean
}

const Sidebar: React.FC<siderProps> = ({
  siderStatus,
}) => (
  <Sider width={siderStatus ? '25%' : '0%'} className="Sidebar">
    <List />
  </Sider>
)


export default Sidebar
