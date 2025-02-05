
<template>
  <div class="app">
    <drag-select
        :items="items"
        @selection-change="handleSelectionChange"
    >
      <template #item="{ item }">
        <!-- 自定义项目内容 -->
        <div class="custom-item">{{ item }}</div>
      </template>
    </drag-select>
  </div>
</template>

<script>
import DragSelect from './DragSelect'

export default {
  components: {
    DragSelect
  },

  data() {
    return {
      items: Array(24).fill(null).map((_, i) => `Item ${i + 1}`)
    }
  },

  methods: {
    handleSelectionChange(selectedIndexes) {
      console.log('Selected items:', selectedIndexes)
    }
  }
}
</script>