import React, { useEffect, useState } from 'react'
import './App.scss'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sider/Sidebar'
import Workspace from './components/Workspace/Workspace'
import { NotesDB } from './db/NotesDB'
import { AddClass, NotesContext } from './NotesContext'
import { INote } from './db/INote'

const App: React.FC = () => {
  const [siderStatus, setSiderStatus] = useState<boolean>(true)
  const [notes, setNotes] = useState<Array<INote>>([])
  const [content, setContent] = useState<any>('')

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
      content: `${content?.slice()}`,
      isActive: false
    })
  }

  const deleteNoteHandler = (e: React.MouseEvent, id: number) => {
    NotesDB.getInstance().delete(id)
    setContent('')
  }

  const addClass = async (e: React.MouseEvent, id: number) => {
    const keys = await NotesDB.getInstance().getKeys()
    keys.forEach(key => {
      NotesDB.getInstance().update(+key, { isActive: false })
    })
    NotesDB.getInstance().update(id, { isActive: true })

    const currentNote = await NotesDB.getInstance().get(id)

    setContent(currentNote.content)
  }

  return (
    <AddClass.Provider value={addClass}>
      <NotesContext.Provider value={notes}>
        <Layout className="App">
          <Header
            deleteNoteHandler={deleteNoteHandler}
            addNoteHandler={addNoteHandler}
            siderHandler={siderHandler}
          />
          <div className="wrapper">
            <Sidebar siderStatus={siderStatus} />
            <Workspace content={content} siderStatus={siderStatus} />
          </div>
        </Layout>
      </NotesContext.Provider>
    </AddClass.Provider>
  )
}

export default App
