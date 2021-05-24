import { createContext } from 'react'
import { INote } from './db/INote'

export const NotesContext = createContext<Array<INote>>([])
