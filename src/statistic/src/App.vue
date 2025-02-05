<template>
  <div id="app">
<!--    <button @click="showSuccessMessage">显示成功消息</button>-->
<!--    <button @click="showErrorMessage">显示错误消息</button>-->
<!--    <button @click="handleAsyncOperation">测试异步操作</button>-->
    <url-statistic>
    </url-statistic>
  </div>
</template>

<script>
import UrlStatistic from "@/components/url-statistic.vue";

export default {
  name: 'App',
  components: {
    UrlStatistic
  },
  data() {
    return {}
  },
  methods: {
    showSuccessMessage() {
      this.$message.success({
        title: '操作成功',
        description: '数据已保存',
        duration: 3000  // 3秒后自动关闭
      })
    },

    showErrorMessage() {
      this.$message.error({
        title: '操作失败',
        description: '请检查网络连接',
        duration: 4000
      })
    },

    // 模拟异步操作
    async handleAsyncOperation() {
      // 显示加载消息
      const loadingMsg = this.$message.loading({
        title: '正在处理',
        description: '请稍候...'
      })

      try {
        // 模拟异步请求
        await new Promise(resolve => setTimeout(resolve, 2000))

        // 移除加载消息
        this.$message.removeMessage(loadingMsg.id)

        // 显示成功消息
        this.$message.success({
          title: '处理完成',
          description: '数据处理成功！'
        })
      } catch (error) {
        // 移除加载消息
        this.$message.removeMessage(loadingMsg.id)

        // 显示错误消息
        this.$message.error({
          title: '处理失败',
          description: error.message
        })
      }
    }
  }
}
</script>
<!--<template>-->
<!--  <BracketTimeline-->
<!--      :showLeft="true"-->
<!--      :showMiddle="true"-->
<!--      :showRight="true"-->
<!--  >-->
<!--    这是内容文字-->
<!--  </BracketTimeline>-->
<!--</template>-->
<!--<script>-->
<!--import UrlStatistic from "@/components/url-statistic.vue";-->
<!--import BracketTimeline from "@/components/Braket"-->
<!--export default {-->
<!--  name: 'App',-->
<!--  components: {-->
<!--    BracketTimeline-->
<!--  },-->
<!--}-->
<!--</script>-->
<!--<template>-->
<!--  <div id="app">-->
<!--    <button @click="showSuccessMessage">显示成功消息</button>-->
<!--    <button @click="showErrorMessage">显示错误消息</button>-->
<!--    <button @click="handleAsyncOperation">测试异步操作</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'App',-->
<!--  methods: {-->
<!--    showSuccessMessage() {-->
<!--      this.$message.success({-->
<!--        title: '操作成功',-->
<!--        description: '数据已保存',-->
<!--        duration: 3000  // 3秒后自动关闭-->
<!--      })-->
<!--    },-->

<!--    showErrorMessage() {-->
<!--      this.$message.error({-->
<!--        title: '操作失败',-->
<!--        description: '请检查网络连接',-->
<!--        duration: 4000-->
<!--      })-->
<!--    },-->

<!--    // 模拟异步操作-->
<!--    async handleAsyncOperation() {-->
<!--      // 显示加载消息-->
<!--      const loadingMsg = this.$message.loading({-->
<!--        title: '正在处理',-->
<!--        description: '请稍候...'-->
<!--      })-->

<!--      try {-->
<!--        // 模拟异步请求-->
<!--        await new Promise(resolve => setTimeout(resolve, 2000))-->

<!--        // 移除加载消息-->
<!--        this.$message.removeMessage(loadingMsg.id)-->

<!--        // 显示成功消息-->
<!--        this.$message.success({-->
<!--          title: '处理完成',-->
<!--          description: '数据处理成功！'-->
<!--        })-->
<!--      } catch (error) {-->
<!--        // 移除加载消息-->
<!--        this.$message.removeMessage(loadingMsg.id)-->

<!--        // 显示错误消息-->
<!--        this.$message.error({-->
<!--          title: '处理失败',-->
<!--          description: error.message-->
<!--        })-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--  padding: 20px;-->
<!--}-->

<!--button {-->
<!--  margin-right: 10px;-->
<!--  padding: 8px 16px;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  background-color: #1890ff;-->
<!--  color: white;-->
<!--  cursor: pointer;-->
<!--}-->

<!--button:hover {-->
<!--  background-color: #40a9ff;-->
<!--}-->
<!--</style>-->