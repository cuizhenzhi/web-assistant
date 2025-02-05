const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')
const {now_t} = require("../util/time");

const addKeyword = (name) => {
  const now = now_t();
  return run('INSERT INTO keyword (name, created_at, updated_at) VALUES (?, ?, ?)', [name, now, now])
};

const deleteKeyword = (id) => {
  return run('DELETE FROM keyword WHERE id = ?', [id])
};

const updateKeyword = (id, name) => {
  return run('UPDATE keyword SET name = ?, updated_at = ? WHERE id = ?', [name, now_t(), id])
};

const getAllKeywords = () => {
  return fetchAll('SELECT * FROM keyword')
};

const getKeyword = (keyword) =>{
  return fetchAll('SELECT * FROM keyword WHERE name = ?', [keyword])
}

module.exports = {
  addKeyword,
  // deleteKeyword,
  updateKeyword,
  getAllKeywords,
  getKeyword
};
