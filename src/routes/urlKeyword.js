const express = require('express');
const router = express.Router();
const db = require('../db/database');
const {updateKeywordToUrl, getKeywordOfUrl} = require("../services/urlKeywordService");

router.put('/url_keyword', async (req, res) => {
  // console.log("in put",);
  const {url, keywords} = req.body;
  // console.log("url, kw",url, keywords);
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
  // res.send({1:"hello"})
  // if(url)

})

router.get('/url_keyword', async (req, res) => {
  const {url_id} = req.query;
  const result = await getKeywordOfUrl(url_id)
  res.send(result)
})

module.exports = router;