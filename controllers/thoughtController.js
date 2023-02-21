const { Thought, User } = require('../models');

//Error response
const catchError = (res, error) => {
  res.status(404).json({ msg: `An Error occurred`, error });
};

//Create a thought and associate it with a user based on the request body params.
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const userDb = await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    res.status(200).json({ thought, userDb });
  } catch (error) {
    catchError(res, error);
  }
};

//Find a thought by ID
const findOneThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    res.status(200).json(thought);
  } catch (error) {
    catchError(res, error);
  }
};

//Find all thoughts across the DB
const findAllThoughts = async (req, res) => {
  try {
    const thought = await Thought.find({});
    res.status(200).json(thought);
  } catch (error) {
    catchError(res, error);
  }
};

//Delete a thought by ID
const deleteThoughtById = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete({
      _id: req.params.thoughtId,
    });
    res.status(200).json({ message: 'thought deleted!', deletedThought });
  } catch (error) {
    catchError(res, error);
  }
};

//Update a thought by ID
const updateThoughtById = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedThought);
  } catch (error) {
    catchError(res, error);
  }
};

// Export the controllers to be used by the router.
module.exports = {
  findAllThoughts,
  findOneThought,
  createThought,
  deleteThoughtById,
  updateThoughtById,
};