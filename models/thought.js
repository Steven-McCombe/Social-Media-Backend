const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
        return new Intl.DateTimeFormat('en-US').format(timestamp);
      },
    },
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => {
      return new Intl.DateTimeFormat('en-US').format(timestamp);
    },
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

ThoughtSchema.set('toJSON', {
  getters: true
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
