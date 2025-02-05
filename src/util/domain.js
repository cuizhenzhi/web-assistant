function getTopLevelDomainOrIP(url) {
  try {
    const urlObj = new URL(url);
    const {hostname, protocol} = urlObj;
    // 0. 处理 localhost 情况
    if (hostname === 'localhost') {
      return 'localhost';
    }
    if(protocol === 'file:'){
      return "localfile"
    }


    // 1. 尝试提取 IP 地址
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(hostname)) {
      return hostname; // 返回 IP 地址
    }


    // 2. 尝试提取一级域名 (包括 .com.cn 这样的二级域名)
    const domainRegex = /([a-zA-Z0-9-]+\.(?:[a-zA-Z]{2,4}\.[a-zA-Z]{2}|[a-zA-Z]{2,6}|[a-zA-Z]{2}))$/;
    const match = hostname.match(domainRegex);
    if(match){
      return match[1]
    }


    // 如果以上两种方式都提取不到内容，返回null
    return null;
  } catch (e) {
    console.error("Invalid URL:", url);
    return null; // 如果 URL 无效，则返回 null
  }
}
// console.log(getTopLevelDomainOrIP("file:///G:/..%E5%A4%A7%E4%B8%89/01%20%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%A7%86%E8%A7%89/%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%A7%86%E8%A7%89%EF%BC%88%E4%BA%BA%E6%99%BA%EF%BC%89/%E6%95%99%E5%AD%A6%E8%AF%BE%E4%BB%B6/1-Introduction.pdf"))
module.exports = {
  getTopLevelDomainOrIP
}

// 示例：
// console.log(getTopLevelDomainOrIP("https://www.example.com/page"));      // 输出: example.com
// console.log(getTopLevelDomainOrIP("http://blog.example.com/post"));     // 输出: example.com
// console.log(getTopLevelDomainOrIP("https://sub.sub2.example.com/page")); // 输出: example.com
// console.log(getTopLevelDomainOrIP("https://www.example.co.uk/page"));   // 输出: example.co.uk
// console.log(getTopLevelDomainOrIP("https://www.example.cc.cc/page"));   // 输出: example.co.
// console.log(getTopLevelDomainOrIP("https://search.bilibili.com/all?keyword=%E6%B8%B8%E6%88%8F%E4%B8%8A%E7%98%BE&from_source=webtop_search&spm_id_from=333.1007&search_source=5"));   // 输出: example.co.uk
// console.log(getTopLevelDomainOrIP("http://192.168.1.100/index"));      // 输出: 192.168.1.100
// console.log(getTopLevelDomainOrIP("https://172.10.0.1/page"));         // 输出: 172.10.0.1
// console.log(getTopLevelDomainOrIP("http://localhost:3000/index"));     // 输出：localhost
// console.log(getTopLevelDomainOrIP("invalid-url"));                     // 输出: null
// console.log(getTopLevelDomainOrIP("https://www.example.com.cn/page"));// 输出：example.com.cn
// console.log(getTopLevelDomainOrIP("https://example.com.cn/page"));// 输出：example.com.cn