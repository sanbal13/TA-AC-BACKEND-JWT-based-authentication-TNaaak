const express = require('express');

const router = express.Router();

/* Get Profile */
router.get('/:username', (req, res, next) => {

});

/* Follow User */
router.post('/:username/follow', (req, res, next) => {

});

/* Unfollow user */
router.delete('/:username/follow', (req, res, next) => {

});

module.exports = router;
