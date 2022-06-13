import { gql } from '@apollo/client';

export const QUERY_ACTIVITIES = gql`
  query activities($username: String) {
    activities(username: $username) {
      _id
      activityText
      createdAt
      username
      noteCount
      notes {
        _id
        createdAt
        username
        noteBody
      }
    }
  }
`;

export const QUERY_ACTIVITY = gql`
  query activity($id: ID!) {
    activity(_id: $id) {
      _id
      activityText
      createdAt
      username
      noteCount
      notes {
        _id
        createdAt
        username
        noteBody
      }
    }
  }
`;