const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')
const {now_t} = require("../util/time");

const addNote = (url_id, content, quote, type, show_order) => {
  const now = now_t();
  return run('INSERT INTO note (url_id, quote, content, type, show_order, created_at) VALUES (?, ?, ?, ?, ?, ?)', [url_id, quote, content, type, show_order, now])
};

const deleteNote = (id) => {
  return run('DELETE FROM note WHERE id = ?', [id]);
};

const updateNote = (id, content, quote, type, show_order) => {
  const now = now_t();
  return run('UPDATE note SET content = ?, quote = ?, type = ?, show_order = ?, updated_at = ? WHERE id = ?', [content, quote, type, show_order, now, id]);
};

const getAllNotes = (url_id) => {
  if(url_id){
    return fetchAll('SELECT * FROM note WHERE url_id = ?', [url_id])
  }
  return fetchAll('SELECT * FROM note')
};

const removeNoteToUrl = async (url_id, notes) => {
  // console.log("in removeNote", notes)
  // 获取当前与 URL 关联的关键词
  const currentNoteIds = await fetchAll('SELECT id FROM note WHERE url_id = ?', [url_id])
    .then((rows) => rows.map(row => row.id))
    .catch(err => {
      console.error('Error fetching existing keywords:', err);
      return [];
    });
  const newNoteIds = notes.map(k => k.id);

  // 需要删除的关键词
  const toRemove = currentNoteIds.filter(id => !newNoteIds.includes(id));

  // // 执行添加
  // for (const id of toAdd) {
  //   await run('INSERT INTO url_keyword (url_id, keyword_id) VALUES (?, ?)', [url_id, id]);
  // }

  // 执行删除
  for (const id of toRemove) {
    await run('DELETE FROM note WHERE id = ?', [id]);
  }

  // console.log(`Updated keywords for URL ${url_id}: Added ${toAdd.length}, Removed ${toRemove.length}`);
};

const batchInsert = (notes) => {
  const now = now_t();
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log("NOTES TRANSACTION BEGIN!");
      db.run("BEGIN TRANSACTION");
      let completed = 0;
      for (let i = 0; i < notes.length; i++) {
        const {url_id, content, type, quote} = notes[i]
        db.run('INSERT INTO note (url_id, content, type, quote) VALUES (?, ?, ?, ?)', [url_id, content, type, quote], function(err) {
          if (err) {
            reject(err);
            return;
          }
          notes[i].id = this.lastID;
          completed++;
          if (completed === notes.length) {
            db.run("COMMIT", (err) => {
              if (err) {
                reject(err);
                return;
              }
              console.log("NOTES COMMIT!");
              resolve(notes);
            });
          }
        });
      }
    });
  });
};

module.exports = {
  addNote,
  deleteNote,
  updateNote,
  getAllNotes,
  batchInsert,
  removeNoteToUrl
};
