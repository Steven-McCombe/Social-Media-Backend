const router = require('express').Router();
const {
  findAllUsers,
  createUser,
  findOneUser,
  updateUserById,
  deleteUserById,
} = require('../../controllers/userController');

const {
  addFriend,
  removeFriend,
} = require('../../controllers/friendController');

// /api/users
router.route('/').post(createUser).get(findAllUsers);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// /api/users/:userId
router.route('/:userId').get(findOneUser).delete(deleteUserById).put(updateUserById);

module.exports = router;