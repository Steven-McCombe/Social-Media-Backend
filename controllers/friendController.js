const { User } = require('../models');
//Error Response
const catchError = (res, error) => {
  res.status(500).json({ error });
};
//Update friends by ID
const updateFriends = async (req, res, update) => {
  try {
    const userDb = await User.findOneAndUpdate(
      { _id: req.params.userId },
      update,
      { new: true }
    );
    res.status(200).json(userDb);
  } catch (error) {
    catchError(res, error);
  }
};
//Add Friends by iD
const addFriend = async (req, res) => {
  const update = { $addToSet: { friends: req.params.friendId } };
  updateFriends(req, res, update);
};
//Remove a friend by id
const removeFriend = async (req, res) => {
  const update = { $pull: { friends: req.params.friendId } };
  updateFriends(req, res, update);
};
//Export to be used in the routes
module.exports = {
  addFriend,
  removeFriend,
};