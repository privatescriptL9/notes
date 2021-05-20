import Dexie from 'dexie'
import { Note } from './note/Note'

export class NotesDB extends Dexie {
  static db: NotesDB = null!

  static getInstance(): NotesDB {
    return NotesDB.db === null ? new NotesDB() : NotesDB.db
  }

  notes: Dexie.Table<Note, number>

  private constructor() {
    super('NotesDB')
    this.version(1).stores({
      notes: '++id, title, content'
    })

    this.notes = this.table('notes')
  }
}
