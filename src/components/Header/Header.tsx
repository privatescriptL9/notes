import React from 'react'
import { Header as Head } from 'antd/lib/layout/layout'
import './Header.scss'
import { Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import SearchBox from '../SearchBox/SearchBox'

const Header: React.FC = () => (
  <Head className="Header">
    <Button className="Button" type="primary" icon={<DeleteOutlined />} />
    <Button className="Button" type="primary" icon={<EditOutlined />} />
    <SearchBox />
  </Head>
)

export default Header
