import { useQuery } from '@apollo/client';
import { QUERY_ACTIVITIES } from '../utils/queries';
import React from 'react';
import ActivityList from '../components/ActivityList';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_ACTIVITIES);

  const activities = data?.activities || [];
  console.log(activities);

  return (
    <main>
    <div className="flex-row justify-space-between">
      <div className="col-12 mb-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ActivityList activities={activities} title="Activities" />
        )}
      </div>
    </div>
  </main>
  );
};

export default Home;
