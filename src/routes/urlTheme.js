const express = require('express');
const router = express.Router();
const db = require('../db/database');
const {updateThemeToUrl, getThemeOfUrl} = require("../services/urlThemeService");

router.put('/url_theme', async (req, res) => {
  const {url, themes} = req.body;
  // console.log("in put",req.body);
  if(url.id && themes.length >= 0){
    updateThemeToUrl(url.id, themes).then(
      r=>{
        res.send({
          msg: "",
          code: 0
        })
      }
    )
  }
})

router.get('/url_theme', async (req, res) => {
  const {url_id} = req.query;
  const result = await getThemeOfUrl(url_id)
  // console.log("get url_theme",req.query,result);
  res.send(result)
})

module.exports = router;