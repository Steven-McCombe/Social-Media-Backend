const { User, Thought } = require('../models');
//Error response
const catchError = (res, error) => {
  res.status(500).json({ error });
};

//Create a new User
const createUser = async (req, res) => {
  try {
    const userDb = await User.create(req.body);
    res.status(200).json(userDb);
  } catch (error) {
    catchError(res, error);
  }
};

// Find a user by ID
const findOneUser = async (req, res) => {
  try {
    const userDb = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends');
    res.status(200).json(userDb);
  } catch (error) {
    catchError(res, error);
  }
};

//Find all users across the DB
const findAllUsers = async (req, res) => {
  try {
    const userDb = await User.find({});
    res.status(200).json(userDb);
  } catch (error) {
    catchError(res, error);
  }
};

//Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const userDb = await User.findByIdAndDelete({
      _id: req.params.userId,
    });
    const deletedThoughts = await Thought.deleteMany({
      _id: { $in: userDb.thoughts },
    });
    res.status(200).json({
      userDb,
      deletedThoughts,
    });
  } catch (error) {
    catchError(res, error);
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const userDb = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json(userDb);
  } catch (error) {
    catchError(res, error);
  }
};

module.exports = {
  createUser,
  findOneUser,
  findAllUsers,
  deleteUserById,
  updateUserById,
};