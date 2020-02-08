const express = require('express');
const router = express.Router();
const { create } = require('../controllers/category');

// validator

const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddlware } = require('../controllers/auth')

router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddlware, create);

module.exports = router;
