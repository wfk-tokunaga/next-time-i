import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_ACTIVITY = gql`
  mutation addActivity($activityText: String!) {
    addActivity(activityText: $activityText) {
      _id
      activityText
      createdAt
      username
      noteCount
      notes {
        _id
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($activityId: ID!, $noteBody: String!) {
    addNote(activityId: $activityId, noteBody: $noteBody) {
      _id
      noteCount
      notes {
        _id
        noteBody
        createdAt
        username
      }
    }
  }
`;