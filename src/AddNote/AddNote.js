
import React from 'react';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            error: null
        }
    }

    static contextType = ApiContext;

    handleSubmit = event => {
        event.preventDefault();
        const { noteName, noteFolder, noteContent } = event.target;
        const date = new Date();
        const isoDate = date.toISOString();
        const note = {
            'name': noteName.value,
            'modified': isoDate,
            'folder_id': noteFolder.value,
            'content': noteContent.value,
        }
        this.setState({error: null})
        const url = 'http://localhost:9090/notes';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {'content-type': 'application/json'},
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {throw error})
            }
            return response.json()
        })
        .then(data => {
            this.context.addNote(data);
            this.props.history.push(`/note/${data.id}`);
        })
        .catch(error => {
            this.setState(error)
        })
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    updateContent(content) {
        this.setState({content: {value: content, touched: true}})
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Content is required'
        }
    }

    handleClickCancel = () => {
        this.props.history.push('/');
    };

    render() {
        const folderOptions = this.context.folders.map(folder => {
            return (
                <option
                    value={folder.id}
                    key={folder.id}>
                    {folder.name}
                </option>)
        });
        const { error } = this.state;

        return (
            <>
                <form onSubmit={this.handleSubmit} className='noteForm'>
                    <label htmlFor='noteName'>
                        Note Name
                    </label>
                    <p className='name error' role='alert'>
                            {this.state.name.touched && this.validateName()}
                    </p>
                    <input
                        type='text'
                        name='noteName'
                        id='noteName'
                        placeholder='Add Note Here...'
                        aria-required='true'
                        aria-describedby='name error'
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <label htmlFor='noteFolder'>
                        Folder
                    </label>
                    <select
                        name='noteFolder'
                        id='noteFolder'
                        required
                    >
                        {folderOptions}
                    </select>
                    <label htmlFor='noteContent'>
                        Content
                    </label>
                    <p className='content error' role='alert'>
                            {this.state.content.touched && this.validateContent()}
                    </p>
                    <textarea
                        name='noteContent'
                        id='noteContent'
                        placeholder='Type content here...'
                        aria-required='true'
                        aria-describedby='content error'
                        onChange={e => this.updateContent(e.target.value)}
                    />
                    <div className="noteButtons">
                    <button
                        type='submit'
                        className='noteButton__add'
                        disabled={
                            this.validateName() ||
                            this.validateContent()
                        }>
                        Add
                    </button>
                    <button
                        type='button'
                        className='noteButton__cancel'
                        onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                    </div>
                </form>
                <div className='AddBookmark__error' role='alert'>
                    {error && <p>{error.message}</p>}
                </div>
            </>
        )
    }
}
AddNote.propType = {
    push: PropTypes.func.isRequired
}