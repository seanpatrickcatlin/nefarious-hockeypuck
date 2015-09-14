import AltContainer from 'alt/AltContainer';
import React from 'react';
import Notes from './Notes.jsx';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class Lane extends React.Component {
    constructor(props) {
        super(props);

        const id = props.id;

        this.addNote = this.addNote.bind(this, id);
        this.deleteNote = this.deleteNote.bind(this, id);
    }
    render() {
        const {id, name, notes, ...props} = this.props;

        return (
            <div {...props}>
                <div className='lane-header'>
                    <div className='lane-name'>{name}</div>
                    <div className='lane-add-note'>
                        <button onClick={this.addNote}>+</button>
                    </div>
                </div>
                <AltContainer
                    stores={[NoteStore]}
                    inject={ {
                        items: () => NoteStore.get(notes)
                    } }
                    >
                    <Notes
                        onEdit={this.editNote}
                        onDelete={this.deleteNote} />
                </AltContainer>
            </div>
        );
    }
    addNote(laneId) {
        NoteActions.create({task: 'New task'});
        LaneActions.attachToLane({laneId});
    }
    editNote(id, task) {
        NoteActions.update({id, task});
    }
    deleteNote(laneId, noteId) {
        NoteActions.delete(noteId);
        LaneActions.detachFromLane({laneId, noteId});
    }
}
