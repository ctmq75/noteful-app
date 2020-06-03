
import React from 'react'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'
import Note from '../Note/Note'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static contextType = ApiContext

  handleDeleteNote = () => {
    this.props.history.push('/')
  }

  render() {
    const { notes=[] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: ''};

  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        deleteNote={this.handleDeleteNote}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}}

NotePageMain.defaultProps = {
  match: {
    params: {}
  }
}

NotePageMain.propTypes = {
  match: PropTypes.shape({
      params: PropTypes.object.isRequired
  })
}