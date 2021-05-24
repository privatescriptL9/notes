import { db } from './db'
import { INote } from './INote'

export class NotesDB {

  static db: NotesDB = null!

  static getInstance(): NotesDB {
    return NotesDB.db === null ? new NotesDB() : NotesDB.db
  }

  get() {
    return db.table('notes').toArray()
  }

  add(note: INote) {
    db.table('notes').add(note)
  }

  delete() {
    db.table('notes').clear()
  }
}
