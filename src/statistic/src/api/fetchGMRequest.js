const timer = setInterval(findGM_HTTPRequest, 100)
let shouldReject =false;
let request = {

};

const GetGMRequest = () => {
  return new Promise((resolve, reject) => {
    if(shouldReject){
      reject(new Error("gmXmlHttpRequest not found"));
    }
    if(request.gmXmlHttpRequest){
      resolve(request.gmXmlHttpRequest)
    }
    const timer = setInterval(() => {
      if (Window.gmXmlHttpRequest) {
        request.gmXmlHttpRequest = Window.gmXmlHttpRequest;
        clearInterval(timer);
        resolve(request.gmXmlHttpRequest);
      }
    }, 100);
    // 设置超时以防止无限等待
    // setTimeout(() => {
    //   clearInterval(timer);
    //   shouldReject = true;
    //   reject(new Error("gmXmlHttpRequest not found"));
    // }, 5000); // 5 秒超时
  });
};
const baseURL = "http://localhost:3000/api";
export { GetGMRequest, request, baseURL };

function findGM_HTTPRequest(){
  // if(Window){
  //   console.log(Window)
  // }else{
  //   return;
  // }
  if(Window.gmXmlHttpRequest){
    request.gmXmlHttpRequest = Window.gmXmlHttpRequest
    clearTimeout(timer);
  }
}
// const itimer = setInterval(()=>{
//   console.log("in modul gmXmlHttpRequest", request.gmXmlHttpRequest)
//   if(request.gmXmlHttpRequest){
//     clearInterval(itimer)
//   }},
//   1000)

// module.exports = request;
