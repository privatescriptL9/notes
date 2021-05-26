import React, { MouseEventHandler, useContext } from 'react'
import { Header as Head } from 'antd/lib/layout/layout'
import './Header.scss'
import { Button } from 'antd'
import { DeleteOutlined, EditOutlined, LayoutOutlined } from '@ant-design/icons'
import SearchBox from '../SearchBox/SearchBox'
import { NotesContext } from '../../NotesContext'

interface HeaderProps {
  siderHandler: MouseEventHandler
  addNoteHandler: MouseEventHandler
  deleteNoteHandler: (removeId: number) => void
}

const Header: React.FC<HeaderProps> = ({
  siderHandler,
  addNoteHandler,
  deleteNoteHandler
}) => {
  const notes = useContext(NotesContext)

  let removeId: any

  notes.forEach(note => {
    if (note.isActive) {
      removeId = note.id
    }
  })

  return (
    <Head className="Header">
      <Button
        onClick={siderHandler}
        className="Button"
        type="primary"
        icon={<LayoutOutlined />}
      />
      <Button
        onClick={() => deleteNoteHandler(removeId)}
        className="Button"
        type="primary"
        icon={<DeleteOutlined />}
      />
      <Button
        onClick={addNoteHandler}
        className="Button"
        type="primary"
        icon={<EditOutlined />}
      />
      <SearchBox />
    </Head>
  )
}

export default Header
