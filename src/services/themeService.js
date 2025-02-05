const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')

const addTheme = (name) => {
  return run('INSERT INTO theme (name) VALUES (?)', [name])
};

const deleteTheme = (id) => {
  return run('DELETE FROM theme WHERE id = ?', [id])
};

const updateTheme = (id, name) => {
  return run('UPDATE theme SET name = ? WHERE id = ?', [name, id])
};

const getAllThemes = () => {
  return fetchAll('SELECT * FROM theme')
};
const getTheme = (theme) =>{
  return fetchAll('SELECT * FROM theme WHERE name = ?', [theme])
}
module.exports = {
  addTheme,
  deleteTheme,
  updateTheme,
  getAllThemes,
  getTheme
};
