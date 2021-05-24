import Dexie from 'dexie'

export const db = new Dexie('NotesDataBase')
db.version(1).stores({ notes: '++id, title, content' })
db.open()
