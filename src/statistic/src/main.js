// import Vue from 'vue'
// import App from './App.vue'
//
// new Vue({
//   render: h => h(App)
// }).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'

// // 注册消息组件
// import MessageNotification from './components/MessageNotification.vue'
// const messageInstance = Vue.extend(MessageNotification)
// const message = new messageInstance()
// message.$mount()
// document.body.appendChild(message.$el)
//
// Vue.prototype.$message = message
// Window.$message = message

new Vue({
  render: h => h(App)
}).$mount('#app')