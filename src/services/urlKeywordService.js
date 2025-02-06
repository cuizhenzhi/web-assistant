const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')
const {now_t} = require("../util/time");

const updateKeywordToUrl = async (url_id, keywords) => {
  // 获取当前与 URL 关联的关键词
  const currentKeywordIds = await fetchAll('SELECT keyword_id FROM url_keyword WHERE url_id = ?', [url_id])
    .then((rows) => rows.map(row => row.keyword_id))
    .catch(err => {
      console.error('Error fetching existing keywords:', err);
      return [];
    });
  // console.log("currentKeywordIds",currentKeywordIds, );
  const newKeywordIds = keywords.map(k => k.id);

  // 需要添加的关键词
  const toAdd = newKeywordIds.filter(id => !currentKeywordIds.includes(id));
  // 需要删除的关键词
  const toRemove = currentKeywordIds.filter(id => !newKeywordIds.includes(id));

  // 执行添加
  for (const id of toAdd) {
    await run('INSERT INTO url_keyword (url_id, keyword_id) VALUES (?, ?)', [url_id, id]);
  }

  // 执行删除
  for (const id of toRemove) {
    await run('DELETE FROM url_keyword WHERE url_id = ? AND keyword_id = ?', [url_id, id]);
  }

  // console.log(`Updated keywords for URL ${url_id}: Added ${toAdd.length}, Removed ${toRemove.length}`);
};
const updateKeywordsToUrls = async (urls, keywords) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log("URLS TRANSACTION BEGIN!");
      db.run("BEGIN TRANSACTION");
      let completed = 0;
      for (let i = 0; i < urls.length; i++) {
        const url_id = urls[i].id;
        for (let i = 0; i < keywords.length; i++) {
          const keyword_id = keywords[i].id;
          db.run(`INSERT OR IGNORE INTO url_keyword (url_id, keyword_id) VALUES(?, ?); `, [url_id, keyword_id], function (err) {
            if (err) {
              reject(err);  // 错误处理
              return;
            }
            completed++;
            if (completed === urls.length * keywords.length) {
              db.run("COMMIT", (err) => {
                if (err) {
                  reject(err);
                  return;
                }
                console.log("URLS COMMIT!");
                resolve(urls);  // 确保所有插入操作完成后再resolve
              });
            }
          });
        }
      }
    })
  })
};
// updateKeywordsToUrls([{id:12000},{id:12001},{id:12002},{id:13818}], [{id:270}, {id:271}, {id:272}, {id:286}])
const getKeywordOfUrl = async (url_id) => {
  // 获取当前与 URL 关联的关键词
  return await fetchAll(
    `SELECT k.*
          FROM keyword k
          JOIN url_keyword uk ON k.id = uk.keyword_id
          WHERE uk.url_id = ?;`, [url_id])
    .catch(err => {
      console.error('Error fetching existing keywords:', err);
      return [];
    });
};
module.exports = {
  updateKeywordToUrl,
  updateKeywordsToUrls,
  getKeywordOfUrl
};
