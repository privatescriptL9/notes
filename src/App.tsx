import React, { useState } from 'react'
import './App.scss'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sider/Sidebar'
import Workspace from './components/Workspace/Workspace'
import { NotesDB } from './database/NotesDB'
import { Note } from './database/note/Note'
import { NotesContext } from './NotesContext'

const App: React.FC = () => {
  const [siderStatus, setSiderStatus] = useState<boolean>(true)

  const siderHandler = () => {
    setSiderStatus(!siderStatus)
  }

  const addNoteHandler = () => {
    NotesDB.getInstance().notes.put(
      new Note('Новая заметка', 'some content ...')
    )
  }

  return (
    <NotesContext.Provider value={Note.getNotes()}>
      <Layout className="App">
        <Header addNoteHandler={addNoteHandler} siderHandler={siderHandler} />
        <div className="wrapper">
          <Sidebar siderStatus={siderStatus} />
          <Workspace siderStatus={siderStatus} />
        </div>
      </Layout>
    </NotesContext.Provider>
  )
}

export default App
