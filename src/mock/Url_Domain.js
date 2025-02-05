const {generateDomains} = require('./Domain')
const {generateUrlsForDomainsOrIPs} = require('./Url')

async function main(){
  const domains = await generateDomains(100);
  // console.log("domains:",domains);
  await generateUrlsForDomainsOrIPs(20, domains)
  const domains_ip = await generateDomains(500, true);
  // console.log("domains_ip: ",domains_ip);
  await generateUrlsForDomainsOrIPs(20, domains_ip)
  console.log("both insert of domains and urls are done!")
}
module.exports = {
  main
}

main()