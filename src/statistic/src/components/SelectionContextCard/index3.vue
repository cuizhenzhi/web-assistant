
<template>
  <div v-show="isVisible" class="context-card" :style="positionStyle">
    <!-- 卡片头部 -->
    <div class="card-header">
      <div class="header-content">
        <span class="selected-count">选择上下文</span>
        <span class="selection-count">(已选择 {{ selectedItemCount }} 项)</span>
      </div>
      <button class="close-btn" @click="close">
        <span>×</span>
      </button>
    </div>

    <!-- 时间范围显示 -->
    <div class="time-range">
      <div class="time-item">
        <label>开始时间</label>
        <span>{{ formatTime(startTime) }}</span>
      </div>
      <div class="time-divider"></div>
      <div class="time-item">
        <label>结束时间</label>
        <span>{{ formatTime(endTime) }}</span>
      </div>
    </div>

    <!-- 上下文选择区域 -->
    <div class="context-selection">
      <div class="section-title">选择或创建上下文</div>

      <!-- 已有上下文列表 -->
      <div class="context-list">
        <div
            v-for="context in contextList"
            :key="context.id"
            class="context-item"
            :class="{ active: selectedContext === context.id }"
            @click="selectContext(context)"
            :style="{ borderLeftColor: context.color }"
        >
          <div class="context-info">
            <span class="context-name">{{ context.name }}</span>
            <span class="context-count">{{ context.itemCount }}项</span>
          </div>
          <div class="context-description" v-if="context.description">
            {{ context.description }}
          </div>
        </div>
      </div>

      <!-- 创建新上下文 -->
      <div class="create-context" v-if="isCreating">
        <input
            v-model="newContextName"
            placeholder="输入新上下文名称..."
            ref="contextInput"
            class="context-input"
        />
        <textarea
            v-model="newContextDescription"
            placeholder="添加描述/备忘录（可选）..."
            class="context-description-input"
        ></textarea>
        <div class="color-selection">
          <span class="color-label">选择颜色：</span>
          <div class="color-options">
            <div
                v-for="color in colorOptions"
                :key="color"
                class="color-option"
                :style="{ backgroundColor: color }"
                :class="{ active: selectedColor === color }"
                @click="selectColor(color)"
            ></div>
          </div>
        </div>
        <div class="button-group">
          <button class="confirm-btn" @click="createContext" :disabled="!newContextName.trim()">
            确认
          </button>
          <button class="cancel-btn" @click="cancelCreate">
            取消
          </button>
        </div>
      </div>

      <!-- 创建新上下文按钮 -->
      <button v-else class="create-btn" @click="startCreate">
        + 创建新上下文
      </button>
    </div>

    <!-- 确认按钮 -->
    <div class="action-footer">
      <button
          class="confirm-selection"
          @click="confirmSelection"
          :disabled="!selectedContext"
      >
        确认选择 ({{ selectedItemCount }}项)
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectionContextCard',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    },
    startTime: {
      type: Number,
      required: true
    },
    endTime: {
      type: Number,
      required: true
    },
    selectedItemCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedContext: null,
      isCreating: false,
      newContextName: '',
      newContextDescription: '',
      selectedColor: '#4299e1',
      colorOptions: [
        '#4299e1', // 蓝色
        '#48bb78', // 绿色
        '#ed8936', // 橙色
        '#9f7aea', // 紫色
        '#f56565', // 红色
        '#667eea', // 靛蓝
        '#ed64a6', // 粉色
        '#38b2ac'  // 青色
      ],
      contextList: [
        {
          id: 1,
          name: '工作会议',
          itemCount: 5,
          color: '#4299e1',
          description: '重要工作会议相关的网页记录'
        },
        {
          id: 2,
          name: '学习资料整理',
          itemCount: 8,
          color: '#48bb78',
          description: '在线学习课程和教程收藏'
        },
        {
          id: 3,
          name: '项目研究',
          itemCount: 3,
          color: '#9f7aea',
          description: '项目相关的参考资料'
        },
        {
          id: 4,
          name: '日常浏览',
          itemCount: 12,
          color: '#ed8936',
          description: '感兴趣的文章和新闻'
        }
      ]
    }
  },
  computed: {
    positionStyle() {
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`
      }
    }
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
    },
    selectColor(color) {
      this.selectedColor = color
    },
    close() {
      this.selectedContext = null
      this.isCreating = false
      this.newContextName = ''
      this.newContextDescription = ''
      this.selectedColor = '#4299e1'
      this.$emit('close')
    },
    selectContext(context) {
      this.selectedContext = context.id
    },
    startCreate() {
      this.isCreating = true
      this.$nextTick(() => {
        this.$refs.contextInput?.focus()
      })
    },
    cancelCreate() {
      this.isCreating = false
      this.newContextName = ''
      this.newContextDescription = ''
      this.selectedColor = '#4299e1'
    },
    createContext() {
      if (!this.newContextName.trim()) return

      const newContext = {
        id: Date.now(),
        name: this.newContextName.trim(),
        description: this.newContextDescription.trim(),
        color: this.selectedColor,
        itemCount: 0
      }

      this.contextList.push(newContext)
      this.selectedContext = newContext.id
      this.isCreating = false
      this.newContextName = ''
      this.newContextDescription = ''
      this.selectedColor = '#4299e1'
    },
    confirmSelection() {
      if (!this.selectedContext) return

      const selectedContext = this.contextList.find(c => c.id === this.selectedContext)
      this.$emit('context-selected', {
        context: selectedContext,
        timeRange: {
          start: this.startTime,
          end: this.endTime
        }
      })
      this.close()
    }
  }
}
</script>

<style scoped>
.context-card {
  position: fixed;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  width: 400px;
  padding: 20px;
  z-index: 1000;
  border: 1px solid #edf2f7;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.selected-count {
  font-size: 16px;
  color: #2d3748;
  font-weight: 500;
}

.selection-count {
  font-size: 14px;
  color: #718096;
}

.close-btn {
  background: none;
  border: none;
  color: #a0aec0;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  border-radius: 4px;
}

.time-range {
  background: #f7fafc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.time-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-item label {
  font-size: 12px;
  color: #718096;
}

.time-item span {
  font-size: 14px;
  color: #2d3748;
  font-weight: 500;
}

.time-divider {
  width: 1px;
  height: 30px;
  background: #e2e8f0;
  margin: 0 16px;
}

.section-title {
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 12px;
}

.context-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  max-height: 240px;
  overflow-y: auto;
}

.context-item {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  border-left-width: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.context-item:hover {
  background: #ebf8ff;
}

.context-item.active {
  background: #ebf8ff;
}

.context-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.context-name {
  font-size: 14px;
  color: #2d3748;
  font-weight: 500;
}

.context-count {
  font-size: 12px;
  color: #718096;
}

.context-description {
  font-size: 12px;
  color: #718096;
  margin-top: 4px;
}

.create-btn {
  width: 100%;
  padding: 12px;
  background: #f7fafc;
  border: 1px dashed #cbd5e0;
  border-radius: 8px;
  color: #4a5568;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.create-btn:hover {
  background: #edf2f7;
  border-color: #4299e1;
  color: #4299e1;
}

.create-context {
  margin-top: 12px;
}

.context-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 8px;
}

.context-description-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 12px;
  min-height: 60px;
  resize: vertical;
}

.color-selection {
  margin-bottom: 12px;
}

.color-label {
  font-size: 12px;
  color: #718096;
  margin-bottom: 8px;
  display: block;
}

.color-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.color-option.active {
  border-color: #2d3748;
}

.button-group {
  display: flex;
  gap: 8px;
}

.confirm-btn, .cancel-btn {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-btn {
  background: #4299e1;
  color: white;
  border: none;
}

.confirm-btn:hover:not(:disabled) {
  background: #3182ce;
}

.confirm-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.cancel-btn {
  background: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.cancel-btn:hover {
  background: #f7fafc;
}

.action-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.confirm-selection {
  width: 100%;
  padding: 12px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-selection:hover:not(:disabled) {
  background: #3182ce;
}

.confirm-selection:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}
</style>