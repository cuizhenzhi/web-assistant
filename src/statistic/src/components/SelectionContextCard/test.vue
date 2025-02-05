<template>
  <div class="timeline-container">
    <!-- 原有的时间轴内容 -->

    <selection-context-card
        :is-visible="true"
    />
  </div>
</template>

<!--:selected-count="selectedItems.length"-->
<!--:position="contextCardPosition"-->
<!--@close="clearSelection"-->
<!--@tag-added="handleTagAdded"-->
<!--@tag-removed="handleTagRemoved"-->
<script>
import SelectionContextCard from './index.vue'

export default {
  components: {
    SelectionContextCard
  },
  data() {
    return {
      // ... 原有的数据
      contextCardPosition: { x: 0, y: 0 }
    }
  },
  computed: {
    hasSelection() {
      return this.selectedItems.length > 0
    }
  },
  methods: {
    endSelection() {
      if (this.selectedItems.length > 0) {
        // 计算选项卡位置，默认显示在选区的右上角
        const selectionBox = this.$refs.selectionbox
        if (selectionBox) {
          const rect = selectionBox.getBoundingClientRect()
          this.contextCardPosition = {
            x: rect.right + 10,
            y: rect.top
          }
        }
      }
      // ... 原有的结束选择逻辑
    },
    clearSelection() {
      this.selectedItems = []
    },
    handleTagAdded(tag) {
      // 处理标签添加逻辑
      console.log('Added tag:', tag)
    },
    handleTagRemoved(tag) {
      // 处理标签移除逻辑
      console.log('Removed tag:', tag)
    }
  }
}
</script>