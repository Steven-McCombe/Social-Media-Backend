const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  }
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
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
