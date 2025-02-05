const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')
const {now_t} = require("../util/time");
const {getTopLevelDomainOrIP} = require("../util/domain")
const {serialize} = require("../db/db_operations");
const addDomain = (domain) => {
  const now = now_t();
  return run(`INSERT OR IGNORE INTO domain (domain, created_at) VALUES (?, ?)`, [domain, now])
};

const deleteDomain = (id) => {
  return run(`DELETE FROM domain WHERE id = ?`, [id])
};

const updateDomain = (id, url, title) => {
  return run(`UPDATE url SET domain = ?, title = ? WHERE id = ?`, [url, title, id])
};

const getAllDomains = (offset, limit) => {
  return fetchAll(`SELECT * FROM domain`)
};
const getDomain = (domain) =>{
  return fetchAll(`SELECT * FROM domain WHERE domain = ?`, [domain])
}
const makeSureDomainExists = (url) => {
  let domain = getTopLevelDomainOrIP(url)
  if(!domain){
    return [];
  }
  // console.log(domain,);
  return getDomain(domain)
    .then(async (rows) => {
      if (rows!== undefined && rows.length === 0) {
        await addDomain(domain);
        return getDomain(domain);
      } else {
        return Promise.resolve(rows);
      }
    });
};
// (async function (){
//   console.log(await makeSureDomainExists(getTopLevelDomainOrIP("https://localhost:8088/eric/tools/css/reset/")))
// })()

// const batchInsert = (domains) => {
//   const now = now_t();
//   return serialize(()=>{
//     db.run("BEGIN TRANSACTION");
//     for (let i = 0; i < domains.length; i++) {
//       // const {domain} = domains[i];
//       db.run(`INSERT INTO domain (domain, created_at) VALUES (?, ?)`, [domains[i].domain, now],function (err){
//         console.log("this.lastID: ",this.lastID);
//         domains[i].id=this.lastID
//       });
//     }
//     db.run("COMMIT");
//     console.log("DOMAINS COMMIT!")
//   })
// }
const batchInsert = (domains) => {
  const now = now_t();
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log("DOMAINS TRANSACTION BEGIN!");
      db.run("BEGIN TRANSACTION");
      let completed = 0;
      for (let i = 0; i < domains.length; i++) {
        db.run(`INSERT INTO domain (domain, created_at) VALUES (?, ?)`, [domains[i].domain, now], function(err) {
          if (err) {
            reject(err);  // 错误处理
            return;
          }
          domains[i].id = this.lastID;
          completed++;
          if (completed === domains.length) {
            db.run("COMMIT", (err) => {
              if (err) {
                reject(err);
                return;
              }
              console.log("DOMAINS COMMIT!");
              resolve(domains);  // 确保所有插入操作完成后再resolve
            });
          }
        });
      }
    });
  });
};
module.exports = {
  addDomain,
  // deleteDomain,
  // updateDomain,
  getAllDomains,
  batchInsert,
  makeSureDomainExists
};
