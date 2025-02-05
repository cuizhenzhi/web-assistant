const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 创建 SQLite 数据库连接
const db = new sqlite3.Database(path.join(__dirname, 'database_backup.db'), (err) => {
  if (err) {
    console.error('数据库连接失败', err);
  } else {
    console.log('数据库连接成功');
  }
});

module.exports = db;
