import React, { useState } from 'react';
import { ADD_NOTE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const NoteForm = ({ activityId }) => {
    const [noteBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addNote, {error}] = useMutation(ADD_NOTE);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            await addNote({
                variables: {noteBody, activityId}
            });
            setBody('');
            setCharacterCount(0);
        } 
        catch (err) {
            console.log(err);
        }
    };

  return (
    <div>
        <form className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}>
        <textarea
            placeholder="Add another thing to remember..."
            className="form-input col-12 col-md-9"
            onChange={handleChange}
            value={noteBody}
        >
        </textarea>

        <button className="btn col-12 col-md-3" type="submit">
            Submit
        </button>
        </form>
        <p className="m-0">
            Character Count: {characterCount}/280
            {error && <span className={`ml-2 ${characterCount === 280 || error ? 'text-error' : ''}`}>Something went wrong...</span>}
        </p>
    </div>
  );
};

export default NoteForm;