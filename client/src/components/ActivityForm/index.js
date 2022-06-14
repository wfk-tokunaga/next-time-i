import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_ACTIVITY } from '../../utils/mutations';
import { QUERY_ACTIVITIES, QUERY_ME } from '../../utils/queries'


const ActivityForm = () => {

    const [activityText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    /**
     * Adding an onUpdate function that will update the cache
     */
     const [addActivity, { error }] = useMutation(ADD_ACTIVITY, {
        update(cache, { data: { addActivity } }) {
      
            // could potentially not exist yet, so wrap in a try/catch
          try {
            // update me array's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, activities: [...me.activities, addActivity] } },
            });
          } catch (e) {
            console.warn("First activity insertion by user!")
          }
      
          // update activity array's cache
          const { activities } = cache.readQuery({ query: QUERY_ACTIVITIES });
          cache.writeQuery({
            query: QUERY_ACTIVITIES,
            data: { activities: [addActivity, ...activities] },
          });
        }
      });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };

      const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add activity to database
          await addActivity({
            variables: { activityText }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      };

    return (
    <div>
        <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
        >
            <textarea
            placeholder="Do some sort of activity ..."
            value={activityText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
            ></textarea>
            
            <button className="btn col-12 col-md-3" type="submit">
                Submit
            </button>
        </form>
        <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
            {/* Commenting this out for now */}
            {/* {error && <span className="ml-2">Something went wrong...</span>} */}
        </p>
    </div>
    );
};

export default ActivityForm;