const { Schema, model } = require('mongoose');
const noteSchema = require('./Note');
const dateFormat = require('../utils/dateFormat');

const activitySchema = new Schema(
  {
    activityText: {
      type: String,
      required: 'You need to leave an activity!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    notes: [noteSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

activitySchema.virtual('noteCount').get(function() {
  return this.notes.length;
});

const Activity = model('Activity', activitySchema);

module.exports = Activity;
