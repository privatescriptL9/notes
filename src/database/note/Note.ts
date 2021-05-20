import { NotesDB } from '../NotesDB'
import { INote } from './INote'

export class Note implements INote {
  id?: number
  title: string
  content: string

  constructor(title: string, content: string, id?: number) {
    this.title = title
    this.content = content
    if (id) this.id = id
  }

  static getNotes() {
    const _notes = NotesDB.getInstance().notes
    const notes: Array<Note> = []

    _notes.each(note => {
      notes.push(note)
    })

    return notes
  }
}
