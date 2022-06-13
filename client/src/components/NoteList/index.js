import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = ({ notes }) => {
//   return (
//         <div className="card mb-3">
//             <div className="card-header">
//                 <span className="text-light">Notes</span>
//             </div>
//             <div className="card-body">
//                 {notes &&
//                 notes.map(note => (
//                     <p className="pill mb-3" key={note._id}>
//                     {note.noteBody} {'// '}
//                     <Link to={`/profile/${note.username}`} style={{ fontWeight: 700 }}>
//                         {note.username} on {note.createdAt}
//                     </Link>
//                     </p>
//                 ))}
//             </div>
//         </div>
//   );

    return (
        <ul>
            {notes &&
            notes.map(note => (
                <li key={note._id}>
                    {note.noteBody}
                </li>
            ))}
        </ul>
    )

};

export default NoteList;