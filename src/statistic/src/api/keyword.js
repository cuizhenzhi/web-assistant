import {GetGMRequest, baseURL} from "./fetchGMRequest.js"

export async function addKeyword(keyword){
  console.log("in add keyword",keyword)
  const gmXmlHttpRequest = await GetGMRequest();
  return gmXmlHttpRequest({
    method: "POST",
    url: `${baseURL}/keyword`,
    headers: {
      "Content-Type": "application/json",
    },
    data:JSON.stringify({
      keyword
    }),

    // headers: {
    //   "Content-Type": "text/plain"
    // },
    // data: `{"keyword":"${keyword}"}`

    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    // data: `keyword=${keyword}"}`

  })
}

export async function getAllKeywords(){
  const gmXmlHttpRequest = await GetGMRequest();
  return gmXmlHttpRequest({
    method: "GET",
    url: `${baseURL}/keyword`,
  })
}

// export async function deleteKeyword(url, keyword){
//   const gmXmlHttpRequest = await GetGMRequest();
//   return gmXmlHttpRequest({
//     method: "DELETE",
//     url: `${baseURL}/keyword`,
//     body:{
//       url,
//       keyword
//     }
//   })
// }

// module.exports = {
//   addKeyword,
//   chooseKeyword,
//   deleteKeyword,
// }

