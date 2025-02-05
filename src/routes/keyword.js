const express = require('express');
const router = express.Router();
const db = require('../db/database');
const keywordService = require('../services/keywordService');

/**
 * 添加keyword
 */
router.post('/keyword', async (req, res) => {
  const keyword = req.body.keyword;
  if(keyword.trim() === ''){
    console.log("no query, return",);
    res.send({error: "Keyword received!"});
    return;
  }
  let result = await keywordService.getKeyword(keyword);
  if(result.length === 0){
    await keywordService.addKeyword(keyword);
    result = await keywordService.getKeyword(keyword);
  }
  // console.log("put keyword res: ",result);
  res.send(result);
})

router.get('/keyword', async (req, res) => {
  const result = await keywordService.getAllKeywords();
  // console.log("all keywords: ",result[0]);
  res.send(result);
})


module.exports = router;
