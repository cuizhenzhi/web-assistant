const Mock = require('mockjs');
const keywordService = require('../services/keywordService');

/**
 * **产生并插入**一定数量关键词
 * @param count 新增数量
 * @return {Promise<void>}
 */
const generateKeywords = async (count) => {
  const keywords = Mock.mock({
    // 生成 count 个 keywords
    [`keywords|${count}`]: [{
      'id|+1': 1,
      'name': '@cword(2, 5)',
    }]
  }).keywords;
  // return keywords
  console.log("keywords: ",keywords);
  for(let i = 0 ;i < count ; i++){
    const {name} = keywords[i];
    try {
      const keyword = await keywordService.addKeyword(name);
      console.log(`Inserted Note with ID: ${keyword.lastID}`);
    } catch (err) {
      console.error('Error inserting note', err);
    }
  }

};

// generateKeywords(200)
module.exports = {
  generateKeywords
}