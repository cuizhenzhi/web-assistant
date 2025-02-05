<!--<template>-->
<!--  <div v-if="visible" class="request-result" :class="statusClass">-->
<!--    <div v-if="status === 'loading'" class="loading">-->
<!--      <span>Loading...</span>-->
<!--    </div>-->
<!--    <div v-else-if="status === 'success'" class="success">-->
<!--      <span>{{ successMessage }}</span>-->
<!--    </div>-->
<!--    <div v-else-if="status === 'error'" class="error">-->
<!--      <span>{{ errorMessage }}</span>-->
<!--    </div>-->
<!--    <div v-else-if="status === 'warning'" class="warning">-->
<!--      <span>{{ warningMessage }}</span>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  props: {-->
<!--    status: {-->
<!--      type: String,-->
<!--      required: true,-->
<!--      validator(value) {-->
<!--        return ['loading', 'success', 'error', 'warning'].includes(value);-->
<!--      }-->
<!--    },-->
<!--    visible: {-->
<!--      type: Boolean,-->
<!--      default: true-->
<!--    },-->
<!--    successMessage: {-->
<!--      type: String,-->
<!--      default: 'Request successful!'-->
<!--    },-->
<!--    errorMessage: {-->
<!--      type: String,-->
<!--      default: 'Request failed. Please try again.'-->
<!--    },-->
<!--    warningMessage: {-->
<!--      type: String,-->
<!--      default: 'There is a warning with the request.'-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    statusClass() {-->
<!--      return {-->
<!--        loading: this.status === 'loading',-->
<!--        success: this.status === 'success',-->
<!--        error: this.status === 'error',-->
<!--        warning: this.status === 'warning'-->
<!--      };-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.request-result {-->
<!--  padding: 10px;-->
<!--  border-radius: 5px;-->
<!--  font-size: 14px;-->
<!--  margin: 10px 0;-->
<!--}-->

<!--.loading {-->
<!--  background-color: #f0f0f0;-->
<!--  color: #888;-->
<!--}-->

<!--.success {-->
<!--  background-color: #dff0d8;-->
<!--  color: #3c763d;-->
<!--}-->

<!--.error {-->
<!--  background-color: #f2dede;-->
<!--  color: #a94442;-->
<!--}-->

<!--.warning {-->
<!--  background-color: #fcf8e3;-->
<!--  color: #8a6d3b;-->
<!--}-->
<!--</style>-->
<!-- MessageNotification.vue -->
<template>
  <transition-group
      name="message-fade"
      tag="div"
      class="message-container"
  >
    <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['message-item', `message-${msg.type}`]"
        @click="removeMessage(msg.id)"
    >
      <div class="message-icon">
        <i :class="getIcon(msg.type)"></i>
      </div>
      <div class="message-content">
        <div class="message-title">{{ msg.title }}</div>
        <div v-if="msg.description" class="message-description">
          {{ msg.description }}
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'MessageNotification',
  data() {
    return {
      messages: [],
      messageId: 0
    }
  },
  methods: {
    getIcon(type) {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        warning: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        loading: 'fas fa-spinner fa-spin'
      }
      return icons[type] || icons.info
    },
    show(config) {
      const id = this.messageId++
      const message = {
        id,
        type: config.type || 'info',
        title: config.title || '',
        description: config.description || '',
        duration: config.duration || 3000
      }

      this.messages.push(message)

      if (message.duration > 0) {
        setTimeout(() => {
          this.removeMessage(id)
        }, message.duration)
      }
    },
    removeMessage(id) {
      const index = this.messages.findIndex(msg => msg.id === id)
      if (index > -1) {
        this.messages.splice(index, 1)
      }
    },
    success(config) {
      this.show({ ...config, type: 'success' })
    },
    error(config) {
      this.show({ ...config, type: 'error' })
    },
    warning(config) {
      this.show({ ...config, type: 'warning' })
    },
    info(config) {
      this.show({ ...config, type: 'info' })
    },
    loading(config) {
      return this.show({ ...config, type: 'loading', duration: 0 })
    }
  }
}
</script>

<style scoped>
.message-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 24px;
  margin-bottom: 12px;
  min-width: 300px;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.message-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.message-icon {
  margin-right: 12px;
  font-size: 20px;
  line-height: 24px;
}

.message-content {
  flex: 1;
}

.message-title {
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
}

.message-description {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  line-height: 1.5;
}

.message-success {
  border-left: 4px solid #52c41a;
}
.message-success .message-icon {
  color: #52c41a;
}

.message-error {
  border-left: 4px solid #ff4d4f;
}
.message-error .message-icon {
  color: #ff4d4f;
}

.message-warning {
  border-left: 4px solid #faad14;
}
.message-warning .message-icon {
  color: #faad14;
}

.message-info {
  border-left: 4px solid #1890ff;
}
.message-info .message-icon {
  color: #1890ff;
}

.message-loading {
  border-left: 4px solid #1890ff;
}
.message-loading .message-icon {
  color: #1890ff;
}

/* 过渡动画 */
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease;
}

.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>