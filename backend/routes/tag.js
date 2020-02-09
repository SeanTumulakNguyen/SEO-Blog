const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controllers/tag');

// validator

const { runValidation } = require('../validators');
const { tagCreateValidator } = require('../validators/tag');
const { requireSignin, adminMiddleware } = require('../controllers/tag');

router.post('/tag', tagCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/cateory/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
