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
  const [disabled, setDisabled] = useState(true)
  const inputRef = useRef<any>(null)

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
      console.log('Сейчас выбрана', keys[keys.length - 1])
    }
  }

  useEffect(() => {
    NotesDB.getInstance()
      .getAll()
      .then(result => {
        setNotes(result)
      })
    if (notes.length === 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
      inputRef.current.focus()
    }
  }, [notes])

  const siderHandler = () => {
    setSiderStatus(!siderStatus)
  }

  const addNoteHandler = async () => {
    NotesDB.getInstance().add({
      title: '',
      content: '',
      isActive: false,
      createdTime: new Date().toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit'
      })
    })
    focus()
    setContent('')
  }

  const deleteNoteHandler = async (id: number) => {
    const keys: any = await NotesDB.getInstance().getKeys()
    if (keys.length !== 0) {
      NotesDB.getInstance().delete(id)
      focus()
      if (keys.length !== 1) {
        const lastNote = await NotesDB.getInstance().getLast()
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
      }
    })
    setContent(value)
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
                inputRef={inputRef}
                disabled={disabled}
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
