const Mock = require('mockjs');
const noteService = require('../services/noteService.js');
const urlService = require('../services/urlService');


const generateNotes = async (count = 20, min, max) => {
  const notes = Mock.mock({
    [`notes|${count}`]: [{
      [`url_id|${min}-${max}`]: max,
      'content': '@paragraph',
      [`type|${0}-${5}`]: 5,
      'quote': '@paragraph',
    }]
  }).notes;
  await noteService.batchInsert(notes);
  return notes;
};
const getURLs = async ()=>{
  const urls = await urlService.getAllUrls();
  return ({min: urls[0], max: urls[urls.length-1]});
}
async function main(){
  const res = await getURLs();
  // console.log(res);
  const notes = await generateNotes(20, res.min.id, res.max.id)
  // console.log("notes:",notes);
}
main()