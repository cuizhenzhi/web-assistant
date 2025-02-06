import request from "@/utils/request";

export function urlBookmark({url, isBookmarked}){
  if(isBookmarked === undefined) return new Promise(1);
  return request({
    url: `/url/bookmark`,
    method: 'post',
    data: {
      url,
      isBookmarked
    }
  })
}