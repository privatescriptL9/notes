import React, { useEffect, useState } from 'react'
import './App.scss'
import { Layout, Modal } from 'antd'
import 'antd/dist/antd.css'
import {} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Header from './components/Header/Header'
import Sidebar from './components/Sider/Sidebar'
import Workspace from './components/Workspace/Workspace'
import { NotesDB } from './db/NotesDB'
import { AddClass, NotesContext } from './NotesContext'
import { INote } from './db/INote'
import { ContentContext } from './ContentContext'

const App: React.FC = () => {
  const [siderStatus, setSiderStatus] = useState<boolean>(true)
  const [notes, setNotes] = useState<Array<INote>>([])
  const [content, setContent] = useState<any>('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    NotesDB.getInstance()
      .getAll()
      .then(result => {
        setNotes(result)
      })
  })

  useEffect(() => {
    document.addEventListener('keydown', async e => {
      if (e.key === 'Escape') {
        const keys = await NotesDB.getInstance().getKeys()
        keys.forEach(key => {
          NotesDB.getInstance().update(+key, { isActive: false })
          setContent('')
          setDisabled(true)
        })
      }
    })
  }, [])

  const siderHandler = () => {
    setSiderStatus(!siderStatus)
  }

  const addNoteHandler = () => {
    const title = prompt('Введите название заметки')
    const content = prompt('Введите начальный контент')

    NotesDB.getInstance().add({
      title: `${title}`,
      content: `${content}`,
      isActive: false
    })
  }

  const deleteNoteHandler = (id: number) => {
    Modal.confirm({
      title: 'Вы хотите удалить выбранную заметку?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        NotesDB.getInstance().delete(id)
        setContent('')
      },
      onCancel() {}
    })
    setDisabled(true)
  }

  const addClass = async (e: React.MouseEvent, id: number) => {
    const keys = await NotesDB.getInstance().getKeys()
    keys.forEach(key => {
      NotesDB.getInstance().update(+key, { isActive: false })
    })
    NotesDB.getInstance().update(id, { isActive: true })

    const currentNote = await NotesDB.getInstance().get(id)

    setContent(currentNote.content)
    setDisabled(false)
  }

  const changeHandler = (value: string) => {
    notes.forEach(note => {
      if (note.isActive) {
        NotesDB.getInstance().update(note.id, { content: value })
      }
    })
    setContent(value)
  }

  return (
    <AddClass.Provider value={addClass}>
      <NotesContext.Provider value={notes}>
        <ContentContext.Provider value={content}>
          <Layout className="App">
            <Header
              deleteNoteHandler={deleteNoteHandler}
              addNoteHandler={addNoteHandler}
              siderHandler={siderHandler}
            />
            <div className="wrapper">
              <Sidebar siderStatus={siderStatus} />
              <Workspace
                disabled={disabled}
                changeHandler={changeHandler}
                content={content}
                siderStatus={siderStatus}
              />
            </div>
          </Layout>
        </ContentContext.Provider>
      </NotesContext.Provider>
    </AddClass.Provider>
  )
}

export default App
