const express = require('express');
const router = express.Router();
const global = require('../../common/global.js');

/**
 * @route   GET api/groups/:room_id
 * @desc    Get All groups in the room
 * @access  Public
 */
router.get('/:room_id', (req, res) => {
  try {
    res.status(200).json(global.groups[req.params.room_id]);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;