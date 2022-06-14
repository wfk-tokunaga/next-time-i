import { useQuery } from '@apollo/client';
import { QUERY_ACTIVITIES, QUERY_ME_BASIC  } from '../utils/queries';
import React from 'react';

import ActivityList from '../components/ActivityList';
import ActivityForm from '../components/ActivityForm';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_ACTIVITIES);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const activities = data?.activities || [];
  console.log(activities);

  const loggedIn = Auth.loggedIn();
  console.log("loggedIn: " + loggedIn);

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ActivityForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ActivityList activities={activities} title="Some Feed for Activity(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
  </main>
  );
};

export default Home;
