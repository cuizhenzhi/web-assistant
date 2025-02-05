const db = require('../db/database');
const {fetch, fetchAll, run, serialize} = require('../db/db_operations.js')
const {now_t} = require("../util/time");
const {makeSureDomainExists} = require("./domainService");

const addUrl =async (url, title, domain_id) => {
  const now = now_t();
  let domain = domain_id;
  if(!domain_id){
    domain = await makeSureDomainExists(url)
    console.log("from no domain: ",domain);
    domain = domain[0].id;
  }
  return run(`INSERT INTO url (url, title, domain_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`, [url, title, domain, now, now])
};
const addUrlVisit =async (url_id) => {
  const now = now_t();
  return run(`INSERT INTO url_visits (url_id, timestamp) VALUES (?, ?)`, [url_id, now])
};
const deleteUrl = (id) => {
  return run(`DELETE FROM url WHERE id = ?`, [id])
};

const updateUrl = (id, title, domain_id) => {
  return run(`UPDATE url SET title = ?, domain_id = ?, updated_at = ? WHERE id = ?`, [title, domain_id, now_t(), id])
};

const getAllUrls = () => {
  return fetchAll(`SELECT * FROM url`)
};

const getUrl = (url) =>{
  return fetchAll('SELECT * FROM url WHERE url = ?', [url])
}
const makeSureUrlExists = (url, title, domain_id) => {
  console.log("url: ",url);
  return getUrl(url)
    .then(async (rows) => {
      if (rows.length=== 0) {
        await addUrl(url, title, domain_id);
        return getUrl(url);
      } else {

        return Promise.resolve(rows);
      }
    });
};
// (async function (){
//   console.log(await makeSureUrlExists("http://test.com/?a=18&b=2"))
// })()
const toggleUrlBookmark = (url_id, isBookmarked)=>{
  return run(`UPDATE url SET isBookmarked = ? WHERE id = ?`, [isBookmarked, url_id]);
}
const batchInsert = (urls) => {
  const now = now_t();
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log("URLS TRANSACTION BEGIN!");
      db.run("BEGIN TRANSACTION");
      let completed = 0;
      for (let i = 0; i < urls.length; i++) {
        const {url, title, domain_id} = urls[i]
        db.run(`INSERT INTO url (url, title, domain_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`, [url, title, domain_id, now, now], function (err) {
          if (err) {
            reject(err);  // 错误处理
            return;
          }
          urls[i].id = this.lastID;
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
module.exports = {
  addUrl,
  // deleteUrl,
  updateUrl,
  getAllUrls,
  batchInsert,
  getUrl,
  makeSureUrlExists,
  addUrlVisit,
  toggleUrlBookmark
};
