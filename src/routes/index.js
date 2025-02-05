const express = require('express');
const router = express.Router();

const theme = require('./theme');
const keyword = require('./keyword');
const url = require('./url');
const urlKeyword = require('./urlKeyword');
const urlTheme = require('./urlTheme');
const note = require('./note');
const urlVisit = require('./urlVisit');
const context = require('./context');

router.use(theme);
router.use(keyword);
router.use(url);
router.use(urlKeyword);
router.use(urlTheme);
router.use(note);
router.use(urlVisit);
router.use(context);

module.exports = router;
