// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// all type defs go in here
const typeDefs = gql `
    type Activity {
      _id: ID
      activityText: String
      createdAt: String
      username: String
      noteCount: Int
      notes: [Note]
    }

    type Note {
      _id: ID
      noteBody: String
      createdAt: String
      username: String
    }

    type User {
      _id: ID
      username: String
      email: String
      friendCount: Int
      activities: [Activity]
      friends: [User]
    }

    type Auth {
      token: ID!
      user: User
    }
    
    type Query {
      me: User
      users: [User]
      user(username: String!): User
      activities(username: String): [Activity]
      activity(_id: ID!): Activity
    }

    type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      addActivity(activityText: String!): Activity
      addNote(activityId: ID!, noteBody: String!): Activity
      addFriend(friendId: ID!): User
    }
`;

/**
 * Final type defs
const typeDefs = gql `
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    activities: [Activity]
    friends: [User]
  }

  type Activity {
    _id: ID
    activityText: String
    createdAt: String
    username: String
    noteCount: Int
    notes: [Note]
  }

  type Note {
    _id: ID
    noteBody: String
    createdAt: String
    username: String
  }

  type Auth {
      token: ID!
      user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    activities(username: String): [Activity]
    activity(_id: ID!): Activity
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addActivity(activityText: String!): Activity
    addNote(activityId: ID!, noteBody: String!): Activity
    addFriend(friendId: ID!): User
  }
`;
**/

// export the typeDefs
module.exports = typeDefs;