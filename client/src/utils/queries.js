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

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      activities {
        _id
        activityText
        createdAt
        noteCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      activities {
        _id
        activityText
        createdAt
        noteCount
        notes {
          _id
          createdAt
          noteBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;