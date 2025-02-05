const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')
const {now_t} = require("../util/time");
const console = require("console");

const addContext = (name,color,description='') => {
    const now = now_t();
    return run('INSERT INTO context (name,color,description, created_at, updated_at) VALUES (?, ?, ?,?,?)', [name,color,description, now, now])
};

const deleteContext = (id) => {
    return run('DELETE FROM context WHERE id = ?', [id])
};

const updateContext = (id,name,color,description='') => {
    return run('UPDATE context SET name = ?,color=?,description =?, updated_at = ? WHERE id = ?', [name,color,description, now_t(), id])
};
const getAllContext = () => {
    return fetchAll(`
SELECT c.*, 
        COUNT(uv.context_id) AS itemCount
        FROM context c 
        LEFT JOIN url_visits uv ON uv.context_id = c.id 
        GROUP BY c.id;`)
};

const getContext = (context) =>{
    return fetchAll('SELECT * FROM context WHERE name = ?', [context])
}

const batchUpdate = (urls, context_id = null) => {
    const now = now_t();
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            console.log("URLS TRANSACTION BEGIN!");
            db.run("BEGIN TRANSACTION");
            let completed = 0;
            for (let i = 0; i < urls.length; i++) {
                const {id, timestamp} = urls[i]
              console.log(id, timestamp,)
                db.run(`UPDATE url_visits SET context_id = ? WHERE url_id = ? and timestamp = ?`, [context_id, id, timestamp], function (err) {
                    if (err) {
                        reject(err);  // 错误处理
                        return;
                    }
                    completed++;
                    if (completed === urls.length) {
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
        })
    })
}
// batchUpdate([12001],2, 1733906348553)
// batchUpdate([{
//   id: 12758,
//   timestamp: 1735388598102
// }],1)
// batchUpdate(
//   [
//     { id: '14778', timestamp: '1738342365152' },
//     { id: '14779', timestamp: '1738342401526' },
//     { id: '14780', timestamp: '1738342442479' },
//     { id: '14778', timestamp: '1738342470055' },
//     { id: '14780', timestamp: '1738342472377' }
//   ],2
// )

const getUrlOfContext = async (url_id) => {
    // 获取当前与 URL 关联的关键词
    return await fetchAll(
        `SELECT u.*
          FROM url u
          JOIN context c ON u.context_id = c.id
          WHERE u.id = ?;`, [url_id])
        .catch(err => {
            console.error('Error fetching existing keywords:', err);
            return [];
        });
};

// addContext('日常浏览','#ed8936', '感兴趣的文章和新闻')
module.exports = {
  batchUpdate,
  getUrlOfContext,
  addContext,
  getContext,
  getAllContext,
  updateContext,
  deleteContext
};
