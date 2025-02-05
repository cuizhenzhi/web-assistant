const express = require('express');
const router = express.Router();
const db = require('../db/database');
const urlService = require('../services/urlService.js');
const {makeSureUrlExists, addUrl, addUrlVisit, toggleUrlBookmark} = require("../services/urlService");

/**
 * 添加url
 */
router.post('/url', async (req, res) => {
  const {url, title} = req.body;
  if(url.trim() === ''){
    console.log("no query, return",);
    res.send({error: "url received!"});
    return;
  }
  let result = await makeSureUrlExists(url, title);
  result = result[0]
  await addUrlVisit(result.id);
  res.send(result);
})
router.post('/url/bookmark', async (req, res) => {
  const {url, isBookmarked} = req.body;
  // console.log(url, isBookmarked)
  await toggleUrlBookmark(url.id, isBookmarked);
  res.send({code: 0});

})

module.exports = router;