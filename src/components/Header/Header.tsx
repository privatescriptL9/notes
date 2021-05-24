import React, { MouseEventHandler } from 'react'
import { Header as Head } from 'antd/lib/layout/layout'
import './Header.scss'
import { Button } from 'antd'
import { DeleteOutlined, EditOutlined, LayoutOutlined } from '@ant-design/icons'
import SearchBox from '../SearchBox/SearchBox'

interface HeaderProps {
  siderHandler: MouseEventHandler
  addNoteHandler: MouseEventHandler
  deleteNoteHandler: MouseEventHandler
}

const Header: React.FC<HeaderProps> = ({
  siderHandler,
  addNoteHandler,
  deleteNoteHandler
}) => (
  <Head className="Header">
    <Button onClick={siderHandler} className="Button" type="primary" icon={<LayoutOutlined />} />
    <Button onClick={deleteNoteHandler} className="Button" type="primary" icon={<DeleteOutlined />} />
    <Button onClick={addNoteHandler} className="Button" type="primary" icon={<EditOutlined />} />
    <SearchBox />
  </Head>
)

export default Header
