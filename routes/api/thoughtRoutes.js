const router = require('express').Router();
const {
  findAllThoughts,
  findOneThought,
  createThought,
  deleteThoughtById,
  updateThoughtById,
} = require('../../controllers/thoughtController');

const {
  createReaction,
  deleteReactionById,
} = require('../../controllers/reactionController');

// /api/thoughts
router.route('/').post(createThought).get(findAllThoughts);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionById);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/users/:thoughtId
router
  .route('/:thoughtId')
  .get(findOneThought)
  .delete(deleteThoughtById)
  .post(createReaction)
  .put(updateThoughtById);

module.exports = router;