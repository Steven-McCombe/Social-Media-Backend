const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReactionSchema = new Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ReactionSchema.set('toJSON', {
  getters: true
});

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = Reaction;