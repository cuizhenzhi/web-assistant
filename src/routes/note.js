const express = require('express');
const router = express.Router();
const db = require('../db/database');
const noteService = require('../services/noteService');

const note_types = {
  thinking: 1,
  comment: 2,
  summary: 3,
  question: 4,
  1: 'thinking',
  2: 'comment',
  3: 'summary',
  4: 'question',
}
/**
 * 添加keyword
 */
router.post('/note', async (req, res) => {
  // console.log(req.body)
  const notes = req.body.notes;
  const url_id = req.body.url_id;
  const notesWithIds = notes.filter(i=>i.id);
  await noteService.removeNoteToUrl(url_id, notesWithIds)
  for(let i = 0; i < notes.length; i++){
    const {content, quote, type, id} = notes[i];
    if(id){
      // 修改已有
      await noteService.updateNote(id, content, quote, note_types[type], i)
    }else{
      //添加note
      await noteService.addNote(url_id, content, quote, note_types[type], i)
    }
  }
  let result = await noteService.getAllNotes(url_id);
  result.forEach(i=>i.type = note_types[i.type])
  res.send(result);
})
router.get('/note', async (req, res) => {
  const url_id = req.query.url_id;
  // console.log("getnote:", url_id);
  const result = await noteService.getAllNotes(url_id);
  result.forEach(i=>i.type = note_types[i.type])
  // console.log("all keywords: ",result[0]);
  res.send(result);
})
// /**
//  * 修改url-keyword关系
//  */
// router.put('/keyword-url', async (req, res) => {
//   console.log("keyword-url:");
//   const {url, keywords} = req.body;
//   // if(keyword.trim() === ''){
//   //   console.log("no query, return",);
//   //   res.send({error: "Keyword received!"});
//   //   return;
//   // }
//   // let result = await keywordService.getKeyword(keyword);
//   // if(result.length === 0){
//   //   await keywordService.addKeyword(keyword);
//   //   result = await keywordService.getKeyword(keyword);
//   // }
//   console.log("url, keywords: ",url, keywords);
//   res.send(keywords);
// })
//

// // 接收并存储网页信息
// router.post('/theme', (req, res) => {
//
//   const { url, title, theme, keywords } = req.body;
//
//   // 插入 URL 信息
//   db.run('INSERT INTO url (url, title) VALUES (?, ?)', [url, title], function (err) {
//     if (err) {
//       return res.status(500).json({ message: 'URL 添加失败', error: err });
//     }
//     const urlId = this.lastID;  // 获取刚插入的 URL 的 ID
//
//     // 插入主题
//     if (theme) {
//       db.run('INSERT INTO theme (name) VALUES (?)', [theme], function (err) {
//         if (err) {
//           return res.status(500).json({ message: '主题添加失败', error: err });
//         }
//         const themeId = this.lastID;
//
//         // 关联 URL 和 Theme
//         db.run('INSERT INTO url_theme (url_id, theme_id) VALUES (?, ?)', [urlId, themeId], (err) => {
//           if (err) {
//             return res.status(500).json({ message: 'URL 与主题关联失败', error: err });
//           }
//         });
//       });
//     }
//
//     // 插入关键词并关联 URL
//     if (keywords && keywords.length) {
//       keywords.forEach((keyword) => {
//         db.run('INSERT INTO keyword (name) VALUES (?)', [keyword], function (err) {
//           if (err) {
//             return res.status(500).json({ message: '关键词添加失败', error: err });
//           }
//           const keywordId = this.lastID;
//
//           // 关联 URL 和 Keyword
//           db.run('INSERT INTO url_keyword (url_id, keyword_id) VALUES (?, ?)', [urlId, keywordId], (err) => {
//             if (err) {
//               return res.status(500).json({ message: 'URL 与关键词关联失败', error: err });
//             }
//           });
//         });
//       });
//     }
//
//     res.status(200).json({ message: '数据添加成功', urlId });
//   });
// });
//
// // 获取 URL 的笔记
// router.get('/get-notes/:urlId', (req, res) => {
//   const { urlId } = req.params;
//
//   db.all('SELECT * FROM notes WHERE url_id = ?', [urlId], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ message: '获取笔记失败', error: err });
//     }
//     res.status(200).json(rows);
//   });
// });

module.exports = router;
