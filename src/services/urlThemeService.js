const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')
const {now_t} = require("../util/time");

const updateThemeToUrl = async (url_id, themes) => {
  // console.log(url_id, themes,);
  // 获取当前与 URL 关联的主题
  const currentThemeIds = await fetchAll('SELECT theme_id FROM url_theme WHERE url_id = ?', [url_id])
    .then((rows) => rows.map(row => row.theme_id))
    .catch(err => {
      console.error('Error fetching existing keywords:', err);
      return [];
    });
  const newThemeIds = themes.map(k => k.id);

  // 需要添加的关键词
  const toAdd = newThemeIds.filter(id => !currentThemeIds.includes(id));
  // 需要删除的关键词
  const toRemove = currentThemeIds.filter(id => !newThemeIds.includes(id));

  // 执行添加
  for (const id of toAdd) {
    await run('INSERT INTO url_theme (url_id, theme_id) VALUES (?, ?)', [url_id, id]);
  }

  // 执行删除
  for (const id of toRemove) {
    await run('DELETE FROM url_theme WHERE url_id = ? AND theme_id = ?', [url_id, id]);
  }

  // console.log(`Updated keywords for URL ${url_id}: Added ${toAdd.length}, Removed ${toRemove.length}`);
};

const getThemeOfUrl = async (url_id) => {
  // 获取当前与 URL 关联的关键词
  return await fetchAll(
    `SELECT t.*
          FROM theme t
          JOIN url_theme ut ON t.id = ut.theme_id
          WHERE ut.url_id = ?;`, [url_id])
    .catch(err => {
      return [];
    });
};
module.exports = {
  updateThemeToUrl,
  getThemeOfUrl
};
