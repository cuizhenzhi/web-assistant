const express = require('express');
const router = express.Router();
const db = require('../db/database');
const themeService = require('../services/themeService');

/**
 * 添加 theme
 */
router.post('/theme', async (req, res) => {
  const theme = req.body.theme;
  if(theme.trim() === ''){
    console.log("no query, return",);
    res.send({error: "Theme received!"});
    return;
  }
  let result = await themeService.getTheme(theme);
  if(result.length === 0){
    await themeService.addTheme(theme);
    result = await themeService.getTheme(theme);
  }
  // console.log("put keyword res: ",result);
  res.send(result);
})

router.get('/theme', async (req, res) => {
  const result = await themeService.getAllThemes();
  res.send(result);
})


module.exports = router;
