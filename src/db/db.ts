import Dexie from 'dexie'

export const db = new Dexie('NotesDataBase')
db.version(10).stores({ notes: '++id, title, content, isActive, editableTime' })
db.open()
