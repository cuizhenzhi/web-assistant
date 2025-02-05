const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');
const db = require("./database.js")


// const runAsync = promisify(db.run.bind(db))
// const getAsync = promisify(db.get.bind(db))
// const allAsync = promisify(db.all.bind(db))
function run (sql, params){
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err)  reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function fetch(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function fetchAll(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function each(sql, params, callback) {
  return new Promise((resolve, reject) => {
    db.each(sql, params, (err, row) => {
      if (err) reject(err);
      else if (callback) callback(row);
    }, (err, count) => {
      if (err) reject(err);
      else resolve(count);
    });
  });
}

function serialize(taskFn, params) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      try {
        const result = taskFn(params);  // 执行传入的任务函数
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}
const run_sqls = [
  `-- 创建 URLs 表
CREATE TABLE IF NOT EXISTS url (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE,
    title TEXT
);`,
  `-- 创建 Theme 表
CREATE TABLE IF NOT EXISTS theme (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES theme(id)
);`,
  `-- 创建 Keywords 表
CREATE TABLE IF NOT EXISTS keyword (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);`,
  `-- 记录每个 URL 的访问时间
CREATE TABLE IF NOT EXISTS url_timestamp (
    url_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (url_id) REFERENCES url(id)
);`,
  `-- URL 和 Theme 的多对多关系
CREATE TABLE IF NOT EXISTS url_theme (
    url_id INTEGER,
    theme_id INTEGER,
    FOREIGN KEY (url_id) REFERENCES url(id),
    FOREIGN KEY (theme_id) REFERENCES theme(id)
);`,
  `-- URL 和 Keyword 的多对多关系
CREATE TABLE IF NOT EXISTS url_keyword (
    url_id INTEGER,
    keyword_id INTEGER,
    FOREIGN KEY (url_id) REFERENCES url(id),
    FOREIGN KEY (keyword_id) REFERENCES keyword(id)
);`,
  `-- 笔记表，用于记录思考和笔记
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url_id INTEGER,
    content TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    type TEXT,  -- 可以是 'thought', 'comment', 'summary' 等
    FOREIGN KEY (url_id) REFERENCES url(id)
);`,
  `-- 创建全文搜索表
CREATE VIRTUAL TABLE IF NOT EXISTS notes_fts USING fts4(content);
`,
  `CREATE TRIGGER SyncNotesFTS AFTER INSERT ON notes
BEGIN
    INSERT INTO notes_fts(rowid, content) VALUES (new.rowid, new.content);
END;`
]
// async function main() {
//   // for(const i of run_sqls){
//   //   await runAsync(i);
//   // }
//   await run(`CREATE TRIGGER SyncNotesFTS AFTER INSERT ON notes
// BEGIN
//     INSERT INTO notes_fts(rowid, content) VALUES (new.rowid, new.content);
// END;`)
// }
// main();
module.exports = {
  fetchAll,
  fetch,
  run,
  each,
  serialize
}