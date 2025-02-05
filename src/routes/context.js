const express = require('express');
const router = express.Router();
const db = require('../db/database');
const contextService = require('../services/contextService');
const console = require("console");

/**
 * 添加context
 */
router.post('/context', async (req, res) => {
  const {name,color,description} = req.body;
  if(name.trim() === ''){
    console.log("no query, return",);
    res.send({error: "context not received!"});
    return;
  }
  let result = await contextService.getContext(name);
  if(result.length === 0){
    await contextService.addContext(name,color,description);
    result = await contextService.getContext(name);
  }
  res.send(result);
})
router.get('/context', async (req, res) => {
  let result = await contextService.getAllContext();
  res.send(result);
})
router.post('/url_context', async (req, res) => {
  const {urls, context_id} = req.body;
  console.log(req.body,)
  // res.send({
  //   msg: "",
  //   code: 0
  // })
  // return
  // console.log("in put",req.body);
  if(urls){
    contextService.batchUpdate(urls, context_id).then(
      r=>{
        res.send({
            msg: "",
            code: 0
        })
      }
    )
  }
})
//
// router.get('/url_theme', async (req, res) => {
//   const {url_id} = req.query;
//   const result = await getThemeOfUrl(url_id)
//   // console.log("get url_theme",req.query,result);
//   res.send(result)
// })

module.exports = router;