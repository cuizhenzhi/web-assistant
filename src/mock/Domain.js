const Mock = require('mockjs');
const domainService = require('../services/domainService.js');

const generateDomains = async (count = 500, ipaddress = false) => {
  const domains = Mock.mock({
    [`domains|${count}`]: [{
      'id|+1': 1,
      'domain': ipaddress ? '@ip' : '@domain'
    }]
  }).domains;
  await domainService.batchInsert(domains);
  return domains;
};
// generateDomains()

module.exports = {
  generateDomains
}