const faker = require('faker');

const db = require('../config/connection');
const { Activity, User } = require('../models');

db.once('open', async () => {
  await Activity.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];
  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create activities
  let createdActivities = [];
  for (let i = 0; i < 100; i += 1) {
    const activityText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdActivity = await Activity.create({ activityText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { activities: createdActivity._id } }
    );

    createdActivities.push(createdActivity);
  }

  // create notes
  for (let i = 0; i < 100; i += 1) {
    const noteBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomActivityIndex = Math.floor(Math.random() * createdActivities.length);
    const { _id: activityId } = createdActivities[randomActivityIndex];

    await Activity.updateOne(
      { _id: activityId },
      { $push: { notes: { noteBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
