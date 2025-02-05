-- 主题表
CREATE TABLE IF NOT EXISTS theme (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 关键词表
CREATE TABLE IF NOT EXISTS keyword (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 域名表
CREATE TABLE IF NOT EXISTS domain (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  domain TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 上下文表
CREATE TABLE IF NOT EXISTS context (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- URL表
CREATE TABLE IF NOT EXISTS url (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  title TEXT,
  domain_id INTEGER,
  isBookmarked boolean NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   context_id INTEGER,
  FOREIGN KEY (domain_id) REFERENCES domain (id)
--   FOREIGN KEY (context_id) REFERENCES context (id)
);

-- 访问记录表
CREATE TABLE IF NOT EXISTS url_visits (
  url_id INTEGER,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (url_id) REFERENCES url (id),
  FOREIGN KEY (context_id) REFERENCES context (id)
);

CREATE TABLE IF NOT EXISTS url_theme (
  url_id INTEGER,
  theme_id INTEGER,
  PRIMARY KEY (url_id, theme_id),
  FOREIGN KEY (url_id) REFERENCES url (id) ON DELETE CASCADE,
  FOREIGN KEY (theme_id) REFERENCES theme (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS url_keyword (
  url_id INTEGER,
  keyword_id INTEGER,
  PRIMARY KEY (url_id, keyword_id),
  FOREIGN KEY (url_id) REFERENCES url (id) ON DELETE CASCADE,
  FOREIGN KEY (keyword_id) REFERENCES keyword (id) ON DELETE CASCADE
);


-- 笔记类型表
CREATE TABLE IF NOT EXISTS note_type (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO note_type (id, name, created_at) VALUES(1, 'thinking', strftime('%s','now'));
INSERT INTO note_type (name, created_at) VALUES(2, 'comment', strftime('%s','now'));
INSERT INTO note_type (name, created_at) VALUES(3, 'summary', strftime('%s','now'));
INSERT INTO note_type (name, created_at) VALUES(4, 'question', strftime('%s','now'));

-- 笔记表
CREATE TABLE IF NOT EXISTS note (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url_id INTEGER,
  content TEXT,
  quote TEXT,
  type INTEGER,
  show_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (url_id) REFERENCES url (id),
  FOREIGN KEY (type) REFERENCES note_type (id)
);

-- 创建全文搜索表
-- CREATE VIRTUAL TABLE IF NOT EXISTS note_fts USING fts5(
--   content,
--   quote,
--   content='note',
--   content_rowid='id',
--   tokenize='unicode61'
-- );


-- -- 插入时同步触发器
-- CREATE TRIGGER IF NOT EXISTS note_ai AFTER INSERT ON note
-- BEGIN
--   INSERT INTO note_fts (rowid, content, quote) VALUES (new.id, new.content, new.quote);
-- END;
--
-- -- 更新时同步触发器
-- CREATE TRIGGER IF NOT EXISTS note_au AFTER UPDATE ON note
-- BEGIN
--   UPDATE note_fts SET content = new.content, quote = new.quote WHERE rowid = old.id;
-- END;
--
-- -- 删除时同步触发器
-- CREATE TRIGGER IF NOT EXISTS note_ad AFTER DELETE ON note
-- BEGIN
--   DELETE FROM note_fts WHERE rowid = old.id;
-- END;
