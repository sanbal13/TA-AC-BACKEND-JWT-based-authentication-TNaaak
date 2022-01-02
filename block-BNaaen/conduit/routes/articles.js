const express = require('express');
const router = express.Router();

/* List Articles */
router.get('/', (req, res, next) => {

});

/* Feed Articles */
router.get('/feed', (req, res, next) => {

});

/* Get Article */
router.get('/:slug', (req, res, next) => {

});

/* Create Article */
router.post('/',  (req, res, next) => {

});

/* Update Article */
router.put('/:slug', (req, res, next) => {

});

/* Delete Article */
router.delete('/:slug', (req, res, next) => {

});

/* Add comments to an article */
router.post('/:slug/comments', (req, res, next) => {

});

/* Get comments from an article */
router.get('/:slug/comments', (req, res, next) => {

});

/* Delete Comment */
router.delete('/:slug/comments/:id', (req, res, next) => {

});

/* Favorite Article */
router.post('/:slug/favorite', (req, res, next) => {

});

/* Unfavorite Article */
router.delete('/:slug/favorite', (req, res, next) => {

});

module.exports = router;
