const { Thought } = require('../models');
//Error response
const catchError = (res, error) => {
  res.status(500).json({ error });
};
//Create a new reaction on an associated thought
const createReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedThought);
  } catch (error) {
    catchError(res, error);
  }
};
//Delete a reaction on an associated thought
const deleteReactionById = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedThought);
  } catch (error) {
    catchError(res, error);
  }
};
//Export to be used in the routes
module.exports = {
  createReaction,
  deleteReactionById,
};