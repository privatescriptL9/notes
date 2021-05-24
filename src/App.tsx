import React, { useEffect, useState } from 'react'
import './App.scss'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sider/Sidebar'
import Workspace from './components/Workspace/Workspace'
import { NotesDB } from './db/NotesDB'
import { NotesContext } from './NotesContext'
import { INote } from './db/INote'

const App: React.FC = () => {
  const [siderStatus, setSiderStatus] = useState<boolean>(true)
  const [notes, setNotes] = useState<Array<INote>>([])

  useEffect(() => {
    NotesDB.getInstance().get().then(result => {
      setNotes(result)
    })
  })

  const siderHandler = () => {
    setSiderStatus(!siderStatus)
  }

  const addNoteHandler = () => {
    NotesDB.getInstance().add({title: 'Note', content: 'some content'})
  }

  const deleteNoteHandler = () => {
    NotesDB.getInstance().delete()
  }

  return (
    <NotesContext.Provider value={notes}>
      <Layout className="App">
        <Header deleteNoteHandler={deleteNoteHandler} addNoteHandler={addNoteHandler} siderHandler={siderHandler} />
        <div className="wrapper">
          <Sidebar siderStatus={siderStatus} />
          <Workspace siderStatus={siderStatus} />
        </div>
      </Layout>
    </NotesContext.Provider>
  )
}

export default App
