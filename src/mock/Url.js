const Mock = require('mockjs');
const urlService = require('../services/urlService');

const generateUrlsForDomainsOrIPs = async (count = 20, entities) => {
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
  return urls;
};

module.exports = {
  generateUrlsForDomainsOrIPs
}

// console.log(new URL("https://filehelper.weixin.qq.com:44/?a=1&b=2"))
// console.log(new URL("http://127.0.0.1:808/post1"))
//
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
//
// }
// main()

