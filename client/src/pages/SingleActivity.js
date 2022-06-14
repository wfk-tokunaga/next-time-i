// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_ACTIVITY } from '../utils/queries';
// import NoteList from '../components/NoteList';

// const SingleActivity = props => {
//     const { id: activityId } = useParams();

//     const { loading, data } = useQuery(QUERY_ACTIVITY, {
//         variables: { id: activityId }
//     });

//     const activity = data?.activity || {};

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <p>Next Time I ... </p>
//             <p className='activityText'>{activity.activityText}</p>
//             <p>I'll remember to ... </p>
//             {activity.noteCount > 0 && <NoteList notes={activity.notes} />}

//             {/* <div className="card mb-3">
//                 <p className="card-header">
//                     <span style={{ fontWeight: 700 }} className="text-light">
//                         {activity.username}
//                     </span>{' '}
//                     activity on {activity.createdAt}
//                 </p>
//                 <div className="card-body">
//                     <p>{activity.activityText}</p>
//                 </div>
//             </div> */}
//             {/* Where the actual notes go */}
//             {/* {activity.noteCount > 0 && <NoteList notes={activity.notes} />} */}
//         </div>
//     );
// };

// export default SingleActivity;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ACTIVITY } from '../utils/queries';
import NoteList from '../components/NoteList';
import Auth from '../utils/auth';
import NoteForm from '../components/NoteForm';

const SingleActivity = props => {
  // HOW TO GET ID OF ACTIVITY FROM URI
  const { id: activityId } = useParams();

  const { loading, data } = useQuery(QUERY_ACTIVITY, {
    variables: { id: activityId }
  });

  const activity = data?.activity || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="card mb-3">
            <p className="card-header">
                <span style={{ fontWeight: 700 }} className="text-light">
                {activity.username}
                </span>{' '}
                activity on {activity.createdAt}
            </p>
            <div className="card-body">
                <p>{activity.activityText}</p>
            </div>
        </div>
        <p>I'll remember to ... </p>
        {activity.noteCount > 0 && <NoteList notes={activity.notes} />}
        {Auth.loggedIn() && <NoteForm activityId={activity._id} />}
    </div>
  );
};

export default SingleActivity;
