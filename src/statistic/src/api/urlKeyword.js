import {baseURL, GetGMRequest} from "@/api/fetchGMRequest";


export async function updateSelectedKeywords(url, keywords){
  const gmXmlHttpRequest = await GetGMRequest();
  return gmXmlHttpRequest({
    method: "PUT",
    url: `${baseURL}/url_keyword`,
    headers: {
      "Content-Type": "application/json",
    },
    data:JSON.stringify({
      url,
      keywords
    })
  })
}
export async function addUrlsKeywords(urls, keywords){
  const gmXmlHttpRequest = await GetGMRequest();
  return gmXmlHttpRequest({
    method: "POST",
    url: `${baseURL}/urls_keywords`,
    headers: {
      "Content-Type": "application/json",
    },
    data:JSON.stringify({
      urls,
      keywords
    })
  })
}
export async function initKeywords(id){
  const gmXmlHttpRequest = await GetGMRequest();
  return gmXmlHttpRequest({
    method: "GET",
    url: `${baseURL}/url_keyword?url_id=${id}`,
  })
}
