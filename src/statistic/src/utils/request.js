import axios from 'axios'
import errorCode from './errorCode.js'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
import message from './message.js'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://localhost:3000/api',
  // 超时
  timeout: 10000
})

// request拦截器
// service.interceptors.request.use(config => {
//   return config
// }, error => {
//   console.log(error)
//   Promise.reject(error)
// })

// 是否显示重新登录
export let isRelogin = { show: false };

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
      return res.data
    }
    // if (code === 401) {
    //   if (!isRelogin.show) {
    //     isRelogin.show = true;
    //     MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
    //       isRelogin.show = false;
    //     }).catch(() => {
    //       isRelogin.show = false;
    //     });
    //   }
    //   return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    // } else
      if (code === 500) {
      message.error({
        title: '操作失败',
        description: msg,
        duration: 3000 })
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
        message.error({
          title: '操作失败',
          description: msg,
          duration: 3000 })
      return Promise.reject('error')
    } else if (code !== 200) {
        message.error({
          title: '操作失败',
          description: msg,
          duration: 3000 })
      return Promise.reject('error')
    } else {
        // this.$message.success({ message: msg, type: 'warning' })
        // console.log("this:", this)
        switch (res.config.method){
          case 'get':
            // message.success({
            //   title: '操作成功',
            //   description: '数据获取成功',
            //   duration: 3000
            // })
            break;
          case 'post':
            message.success({
              title: '操作成功',
              description: '数据修改成功',
              duration: 3000
            });
            break;
          case 'delete':
            message.success({
              title: '操作成功',
              description: '数据删除成功',
              duration: 3000
            });
        }

      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    console.log(message,error)
    this.$message.error({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

export default service
// export function addContext(data) {
//   return service({
//     url: '/context',
//     method: 'post',
//     data: data
//   })
// }
// addContext({
//   name: '工作会议',
//   color: '#4299e1',
//   description: '重要工作会议相关的网页记录',
// })