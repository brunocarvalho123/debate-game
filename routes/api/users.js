const express = require('express');
const router = express.Router();
const global = require('../../common/global');

/**
 * @route   GET api/users/:room_id
 * @desc    Get All users in the room
 * @access  Public
 */
router.get('/:room_id', (req, res) => {
  try {
    global.usersObject[req.params.room_id].mod.send(`${req.params.room_id}:me-mod`);
    res.status(200).json(global.usersObject[req.params.room_id].users.map(e => e.name));
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;