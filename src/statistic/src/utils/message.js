import Vue from 'vue'
import MessageNotification from '@/components/MessageNotification.vue'

const MessageInstance = Vue.extend(MessageNotification)
const message = new MessageInstance()
message.$mount()
document.body.appendChild(message.$el)
Vue.prototype.$message = message

export default message