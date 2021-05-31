import { db } from './db'
import { INote } from './INote'

export class NotesDB {
  static db: NotesDB = null!
  private table = db.table('notes')

  async getKeys() {
    const keys = await this.table.toCollection().primaryKeys()
    return keys
  }

  static getInstance(): NotesDB {
    return NotesDB.db === null ? new NotesDB() : NotesDB.db
  }

  getAll() {
    return db.table('notes').toArray()
  }

  async get(key: number) {
    const note = await this.table.get(key)
    return note
  }

  async getLast() {
    const last = await this.table.limit(1).last()
    return last
  }

  add(note: INote) {
    this.table.add(note)
  }

  delete(key: number) {
    this.table.delete(key)
  }

  update(key: number | undefined, changes: { [k: string]: any }) {
    this.table.update(key, changes)
  }

  reverse() {
    this.table.reverse()
  }
}
