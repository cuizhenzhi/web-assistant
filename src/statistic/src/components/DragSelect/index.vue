<template>
  <div
      class="drag-select-container"
      ref="container"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
  >
    <!-- 选择框 -->
    <div
        v-if="isSelecting"
        class="selection-box"
        :style="selectionBoxStyle"
    ></div>

    <!-- 可选择的项目列表 -->
    <ul class="item-list">
      <li
          v-for="(item, index) in items"
          :key="index"
          :class="['list-item', { 'selected': selectedItems.includes(index) }]"
          ref="items"
      >
        <slot name="item" :item="item">
          <!-- 默认内容插槽 -->
          {{ item }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DragSelect',

  props: {
    // 列表数据
    items: {
      type: Array,
      default: () => []
    },
    // 是否允许多选
    multiple: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isSelecting: false,
      startPoint: { x: 0, y: 0 },
      endPoint: { x: 0, y: 0 },
      selectedItems: [],
      selectionBox: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }
  },

  computed: {
    selectionBoxStyle() {
      return {
        left: `${this.selectionBox.left}px`,
        top: `${this.selectionBox.top}px`,
        width: `${this.selectionBox.width}px`,
        height: `${this.selectionBox.height}px`
      }
    }
  },

  methods: {
    handleMouseDown(event) {
      // 获取容器的位置信息
      const containerRect = this.$refs.container.getBoundingClientRect()
      this.selectedItems = [];
      this.selectionBox.width = `-1px`;
      this.selectionBox.height = `-1px`;
      this.selectionBox.left = `0px`;
      this.selectionBox.top = `0px`;
      this.isSelecting = true
      this.startPoint = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top
      }

      if (!this.multiple && !event.ctrlKey) {
        this.selectedItems = []
      }
    },

    handleMouseMove(event) {
      if (!this.isSelecting) return

      const containerRect = this.$refs.container.getBoundingClientRect()
      this.endPoint = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top
      }

      // 计算选择框的位置和大小
      this.selectionBox = {
        left: Math.min(this.startPoint.x, this.endPoint.x),
        top: Math.min(this.startPoint.y, this.endPoint.y),
        width: Math.abs(this.endPoint.x - this.startPoint.x),
        height: Math.abs(this.endPoint.y - this.startPoint.y)
      }

      this.checkIntersections()
    },

    handleMouseUp() {
      this.isSelecting = false

      // 触发选择完成事件
      this.$emit('selection-change', this.selectedItems)
    },
    checkIntersections() {
      if (!this.$refs.items) return

      this.$refs.items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect()
        const containerRect = this.$refs.container.getBoundingClientRect()

        // 转换为相对坐标
        const relativeRect = {
          left: itemRect.left - containerRect.left,
          top: itemRect.top - containerRect.top,
          right: itemRect.right - containerRect.left,
          bottom: itemRect.bottom - containerRect.top
        }

        // 检查相交
        const isIntersecting = !(
            relativeRect.left > this.selectionBox.left + this.selectionBox.width ||
            relativeRect.right < this.selectionBox.left ||
            relativeRect.top > this.selectionBox.top + this.selectionBox.height ||
            relativeRect.bottom < this.selectionBox.top
        )

        // 更新选中状态
        const itemIndex = this.selectedItems.indexOf(index)
        if (isIntersecting && itemIndex === -1) {
          this.selectedItems.push(index)
        } else if (!isIntersecting && itemIndex !== -1) {
          this.selectedItems.splice(itemIndex, 1)
        }
      })
    }
  }
}
</script>

<style scoped>
.drag-select-container {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
}

.selection-box {
  position: absolute;
  border: 1px dashed #0099FF;
  background-color: rgba(195, 213, 237, 0.6);
  pointer-events: none;
  z-index: 1000;
}

.item-list {
  margin: 0;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: flex-start;
  list-style: none;
  flex-wrap: wrap;
}

.list-item {
  list-style: none;
  margin-bottom: 6px;
  margin-right: 6px;
  width: 55px;
  height: 55px;
  border: 1px solid #ccc;
}

.list-item.selected {
  border: 1px solid red;
  background-color: #D6DFF7;
}
</style>
