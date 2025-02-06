const express = require('express');
const router = express.Router();
const db = require('../db/database');
const {updateKeywordToUrl, getKeywordOfUrl, updateKeywordsToUrls} = require("../services/urlKeywordService");

router.put('/url_keyword', async (req, res) => {
  const {url, keywords} = req.body;
  if(url.id && keywords.length >= 0){
    updateKeywordToUrl(url.id, keywords).then(
      r=>{
        res.send({
          msg: "",
          code: 0
        })
      }
    )
  }
})
router.post('/urls_keywords', async (req, res) => {
  const {urls, keywords} = req.body;
  if(urls.length >= 1 && keywords.length >= 1){
    updateKeywordsToUrls(urls, keywords).then(
      r=>{
        res.send({
          msg: "",
          code: 0
        })
      }
    )
  }
})
router.get('/url_keyword', async (req, res) => {
  const {url_id} = req.query;
  const result = await getKeywordOfUrl(url_id)
  res.send(result)
})

module.exports = router;