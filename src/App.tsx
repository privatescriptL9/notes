import React, { useEffect, useState, useRef } from 'react'
import './App.scss'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
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
  const inputRef = useRef<any>(null)
  const currentTime = new Date().toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit'
  })

  const addNote = () => {
    NotesDB.getInstance().add({
      title: '',
      content: '',
      isActive: false,
      editableTime: currentTime
    })
    focus()
    setContent('')
    inputRef.current.focus()
  }

  const clearClasses = async (id: number) => {
    const keys = await NotesDB.getInstance().getKeys()
    keys.forEach(key => {
      NotesDB.getInstance().update(+key, { isActive: false })
    })
    NotesDB.getInstance().update(id, { isActive: true })
  }

  const focus = async () => {
    const keys: any = await NotesDB.getInstance().getKeys()

    if (keys.length !== 0) {
      keys.forEach((key: any) => {
        NotesDB.getInstance().update(+key, { isActive: false })
      })
      NotesDB.getInstance().update(keys[keys.length - 1], { isActive: true })
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      const result = await NotesDB.getInstance().getAll()
      setNotes(result)
    }
    fetchNotes()
  }, [notes])

  const siderHandler = () => {
    setSiderStatus(!siderStatus)
  }

  const addNoteHandler = async () => {
    addNote()
  }

  const deleteNoteHandler = async (id: number) => {
    const keys: any = await NotesDB.getInstance().getKeys()
    if (keys.length !== 0) {
      NotesDB.getInstance().delete(id)
      focus()
      if (keys.length !== 1) {
        const lastNote = await NotesDB.getInstance().getLast()
        inputRef.current.focus()
        setContent(lastNote.content)
      } else {
        setContent('')
      }
    }
  }

  const addClassHandler = async (e: React.MouseEvent, id: number) => {
    clearClasses(id)
    const currentNote = await NotesDB.getInstance().get(id)
    setContent(currentNote.content)
  }

  const changeHandler = (value: string) => {
    notes.forEach(note => {
      if (note.isActive) {
        NotesDB.getInstance().update(note.id, { content: value })
        NotesDB.getInstance().update(note.id, { editableTime: currentTime})
      }
    })
    setContent(value)
  }

  const addOneNote = () => {
    if (notes.length === 0) {
      addNote()
    }
  }

  return (
    <AddClass.Provider value={addClassHandler}>
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
                addOneNote={addOneNote}
                inputRef={inputRef}
                changeHandler={changeHandler}
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
