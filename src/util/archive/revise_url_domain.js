const db = require('../../db/database');
const {fetch, fetchAll, run} = require('../../db/db_operations.js')
const {now_t} = require("../time");
const {makeSureDomainExists} = require("../../services/domainService");
const {getAllUrls, updateUrl} = require("../../services/urlService");

const makeSureUrls = async (maxId) =>{
  const urls = await getAllUrls();
  // console.log("in msu",urls);
  // for(let i = 0; i < maxId)
  let i =629, j = 0
  while(true){
    const id = urls[i].id
    if(id <= maxId){
      let domain = await makeSureDomainExists(urls[i].url);
      console.log("domain: ",domain[0]);
      await updateUrl(id, null, domain[0].id)
      if(i%100 === 0)
      console.log(i)
      //j++;
      i++;
    }
    else
      break
  }
  // console.log(j)
  // if(!domain_id){
  //   domain = await makeSureDomainExists(url)
  //   domain = domain[0].id;
  // }
}
makeSureUrls(12630);