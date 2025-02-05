const Mock = require('mockjs');
const urlService = require('./services/urlService');
// const themeService = require('./services/themeService');
// const keywordService = require('./services/keywordService');
// const noteService = require('./services/noteService');

const domainService = require('./services/domainService.js');
// 示例：生成和插入 URL 数据
// const generateUrls = async () => {
//   for (let i = 0; i < 10; i++) {
//     const url = Mock.mock('@url');
//     const title = Mock.mock('@title(5, 10)');
//     try {
//       const urlId = await urlService.addUrl(url, title);
//       console.log(`Inserted URL with ID: ${urlId.lastID}`);
//       const r = await urlService.getAllUrls()
//       console.log(r)
//     } catch (err) {
//       console.error('Error inserting URL', err);
//     }
//   }
// };

// const generateNotes = async () => {
//   for (let i = 0; i < 100; i++) { // 生成 100 条笔记数据
//     const url_id = Mock.Random.integer(1, 50); // 随机生成 1 到 50 之间的 url_id
//     const content = Mock.mock('@sentence(10, 200)'); // 生成一条随机句子作为笔记内容
//     const type = Mock.Random.pick(['thought', 'comment', 'summary', 'question']); // 随机选择笔记类型
//
//     try {
//       const noteId = await noteService.addNote(url_id, content, type);
//       console.log(`Inserted Note with ID: ${noteId}`);
//     } catch (err) {
//       console.error('Error inserting note', err);
//     }
//   }
// };
// 调用生成 URL 的函数
// generateNotes();

const types = {
  keyword:{
    id: "number|+1",
    name: "@cparagraph(2,3)"
  }
}
const generateKeywords = async (count) => {
  const keywords = Mock.mock({
    // 生成 count 个 keywords
    [`keywords|${count}`]: [{
      // 递增的 id
      // 'id|+1': 1,
      // 随机名称
      'name': '@cword(2, 5)',
      // 使用自定义函数转换日期格式为时间戳
      // 'created_at': () => +new Date(Mock.Random.datetime()), // 加号（+）将 Date 对象转换为时间戳
      // 'updated_at': () => +new Date(Mock.Random.datetime())
    }]
  }).keywords;
  // return keywords
  for(let i = 0 ;i < count ; i++){
    const {name} = keywords[i];
    try {
      const keywordId = await keywordService.addKeyword(name);
      console.log(`Inserted Note with ID: ${keywordId}`);
    } catch (err) {
      console.error('Error inserting note', err);
    }
  }

};

// console.log(generateKeywords(300),);
// console.log(+new Date(Mock.Random.datetime()))
// console.log(+new Date(Mock.Random.datetime()))
// console.log(+new Date(Mock.Random.datetime()))

// 生成 20 个 domain，包括主域名和子域名
// 生成 20 个 domain
// const generateDomains = () => {
//   return Mock.mock({
//     'domains|20': [{
//       'id|+1': 1,
//       'domain': '@domain'
//     }]
//   }).domains;
// };
//
// // 生成复杂 URL 的函数
// const generateUrlsForDomains = (domains) => {
//   return domains.map(domain => {
//     return Mock.mock({
//       'urls|10': [{
//         // 生成可能包含子域名的完整 URL
//         'url': `http@pick(['://www.', '://', '://sub.', '://api.'])${domain.domain}/@word(3, 10)/@word(3, 10)`,
//         // 生成包含特殊字符、中英文的标题
//         'title': '@ctitle(3, 10) @cword("零一二三四五六七八九十", 2, 4) @word(3, 5) !@#$%^&*()',
//         'domain_id': domain.id
//       }]
//     }).urls;
//   }).flat(); // 将所有 URL 数组合并为一个数组
// };
//
// // 生成 domain 和 url
// const domains = generateDomains();
// const urls = generateUrlsForDomains(domains);
//
// console.log(domains);
// console.log(urls);

// 生成域名的函数
const generateDomains = async (count = 500) => {
  const domains = Mock.mock({
    [`domains|${count}`]: [{
      'id|+1': 1,
      'domain': '@domain'
    }]
  }).domains;
  // return domains;
  // for(let i = 0 ;i < count ; i++){
  //   const {domain} = domains[i];
  //   try {
  //     const domainId = await domainService.addDomain(domain);
  //     console.log(`Inserted Note with ID: ${domainId.lastID}`);
  //   } catch (err) {
  //     console.error('Error inserting note', err);
  //   }
  // }
  // await domainService.batchInsert(domains);
  return domains;
};

// 生成 IP 地址的函数
const generateIPs = async (count = 100) => {
  const domains =  Mock.mock({
    [`ips|${count}`]: [{
      'id|+1': 11,  // 假设 ID 从 11 开始，避免与域名 ID 冲突
      'domain': '@ip'
    }]
  }).ips;
  // await domainService.batchInsert(domains);

  return domains;
};

// 为域名或 IP 地址生成 URLs 的函数
const generateUrlsForDomainsOrIPs = async (entities) => {
  const count = 20;
  const urls = entities.map(entity => {
    return Mock.mock({
      [`urls|${count}`]: [{
        'url': `http@pick(['s://www.','://', 's://', 's://sub.', 's://api.'])${entity.domain}/@word(3, 10)/@word(3, 10)`,
        'title': '@ctitle(3, 10) @cword("零一二三四五六七八九十", 2, 4) @word(3, 5) !@#？*！。，',
        'domain_id': entity.id
      }]
    }).urls;
  }).flat();
  await urlService.batchInsert(urls);
};

// async function main(){
// // 生成域名和 IP 地址
//   const domains = await generateDomains();
//   const ips = await generateIPs();
//   // console.log(domains);
//   // console.log(ips);
//
// // 生成 URLs
//   const domainUrls = await generateUrlsForDomainsOrIPs(domains);
//   const ipUrls = await generateUrlsForDomainsOrIPs(ips);
//
//   // console.log(domainUrls);
//   // console.log(ipUrls);
//   const gd = await domainService.getAllDomains()
//   console.log("gd:",gd[0]);
//
// }

const generateNoteAndContent = async (entities) => {
  const count = 20;
  const urls = entities.map(entity => {
    return Mock.mock({
      [`urls|${count}`]: [{
        'url': `http@pick(['s://www.','://', 's://', 's://sub.', 's://api.'])${entity.domain}/@word(3, 10)/@word(3, 10)`,
        'title': '@ctitle(3, 10) @cword("零一二三四五六七八九十", 2, 4) @word(3, 5) !@#？*！。，',
        'domain_id': entity.id
      }]
    }).urls;
  }).flat();
  await urlService.batchInsert(urls);
};
// main()
