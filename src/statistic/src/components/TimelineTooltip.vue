<!--<template>-->
<!--  <div class="tooltip-card" :style="tooltipPosition" v-if="visible">-->
<!--    <div class="tooltip-content"  >-->
<!--&lt;!&ndash;      @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"&ndash;&gt;-->
<!--      <div class="tooltip-header">-->
<!--        <div class="domain-info">-->
<!--          <img :src="`https://www.google.com/s2/favicons?domain=${domain}`"-->
<!--               :alt="domain"-->
<!--               class="favicon"-->
<!--          />-->
<!--          <span class="domain-text">{{ domain }}</span>-->
<!--        </div>-->
<!--        <div class="timestamp">-->
<!--          {{ formatTime(timestamp) }}-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="tooltip-body">-->
<!--        <h3 class="title">{{ title }}</h3>-->
<!--        <div class="url-container">-->
<!--          <a :href="url" target="_blank" class="url" :title="url">-->
<!--            {{ truncateUrl(url) }}-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="tooltip-footer">-->
<!--        <div class="first-visit">-->
<!--          First visited: {{ formatFullTime(ucreated_at) }}-->
<!--        </div>-->
<!--        <div class="id-tag">-->
<!--          ID: {{ id }}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'TimelineTooltip',-->
<!--  props: {-->
<!--    visible: {-->
<!--      type: Boolean,-->
<!--      default: false-->
<!--    },-->
<!--    id: {-->
<!--      type: Number,-->
<!--      required: false,-->
<!--      default: -1-->
<!--    },-->
<!--    domain: {-->
<!--      type: String,-->
<!--      required: false,-->
<!--      default: ""-->
<!--    },-->
<!--    timestamp: {-->
<!--      type: Number,-->
<!--      required: false,-->
<!--      default: -1-->
<!--    },-->
<!--    title: {-->
<!--      type: String,-->
<!--      required: false,-->
<!--      default: ""-->
<!--    },-->
<!--    ucreated_at: {-->
<!--      type: Number,-->
<!--      required: false,-->
<!--      default: -1-->
<!--    },-->
<!--    url: {-->
<!--      type: String,-->
<!--      required: false,-->
<!--      default: ""-->
<!--    },-->
<!--    mouseX: {-->
<!--      type: Number,-->
<!--      default: 0-->
<!--    },-->
<!--    mouseY: {-->
<!--      type: Number,-->
<!--      default: 0-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    tooltipPosition() {-->
<!--      return {-->
<!--        left: `${this.mouseX + 10}px`,-->
<!--        top: `${this.mouseY + 10}px`-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    // handleMouseEnter(event){-->
<!--    //   console.log('!!!enter',)-->
<!--    //   this.$emit("enter",event)-->
<!--    // },-->
<!--    // handleMouseLeave(event){-->
<!--    //   this.$emit("leave",event)-->
<!--    // },-->
<!--    formatTime(timestamp) {-->
<!--      const date = new Date(timestamp)-->
<!--      return date.toLocaleString('en-US', {-->
<!--        hour: '2-digit',-->
<!--        minute: '2-digit',-->
<!--        second: '2-digit',-->
<!--        hour12: false-->
<!--      })-->
<!--    },-->
<!--    formatFullTime(timestamp) {-->
<!--      const date = new Date(timestamp)-->
<!--      return date.toLocaleString('en-US', {-->
<!--        year: "numeric",-->
<!--        month: "numeric",-->
<!--        day: "numeric",-->
<!--        hour: '2-digit',-->
<!--        minute: '2-digit',-->
<!--        second: '2-digit',-->
<!--        hour12: false-->
<!--      })-->
<!--    },-->
<!--    truncateUrl(url) {-->
<!--      const maxLength = 50-->
<!--      return url.length > maxLength-->
<!--          ? url.substring(0, maxLength) + '...'-->
<!--          : url-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.tooltip-card {-->
<!--  position: fixed;-->
<!--  z-index: 1000;-->
<!--  width: 320px;-->
<!--  background: white;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);-->
<!--  border: 1px solid #eaeaea;-->
<!--  pointer-events: none;-->
<!--  animation: fadeIn 0.2s ease-in-out;-->
<!--}-->

<!--.tooltip-content {-->
<!--  pointer-events: auto;-->
<!--  padding: 12px;-->
<!--}-->

<!--.tooltip-header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 8px;-->
<!--}-->

<!--.domain-info {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  gap: 8px;-->
<!--}-->

<!--.favicon {-->
<!--  width: 16px;-->
<!--  height: 16px;-->
<!--}-->

<!--.domain-text {-->
<!--  color: #666;-->
<!--  font-size: 14px;-->
<!--}-->

<!--.timestamp {-->
<!--  color: #888;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.tooltip-body {-->
<!--  margin: 12px 0;-->
<!--}-->

<!--.title {-->
<!--  margin: 0 0 8px 0;-->
<!--  font-size: 16px;-->
<!--  color: #333;-->
<!--  font-weight: 500;-->
<!--  line-height: 1.4;-->
<!--}-->

<!--.url-container {-->
<!--  margin-top: 8px;-->
<!--}-->

<!--.url {-->
<!--  color: #2196f3;-->
<!--  font-size: 13px;-->
<!--  text-decoration: none;-->
<!--  word-break: break-all;-->
<!--  display: -webkit-box;-->
<!--  -webkit-line-clamp: 2;-->
<!--  -webkit-box-orient: vertical;-->
<!--  overflow: hidden;-->
<!--}-->

<!--.url:hover {-->
<!--  text-decoration: underline;-->
<!--}-->

<!--.tooltip-footer {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-top: 12px;-->
<!--  padding-top: 8px;-->
<!--  border-top: 1px solid #eaeaea;-->
<!--}-->

<!--.first-visit {-->
<!--  color: #888;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.id-tag {-->
<!--  background: #f5f5f5;-->
<!--  padding: 2px 6px;-->
<!--  border-radius: 4px;-->
<!--  font-size: 12px;-->
<!--  color: #666;-->
<!--}-->

<!--@keyframes fadeIn {-->
<!--  from {-->
<!--    opacity: 0;-->
<!--    transform: translateY(4px);-->
<!--  }-->
<!--  to {-->
<!--    opacity: 1;-->
<!--    transform: translateY(0);-->
<!--  }-->
<!--}-->
<!--</style>-->




<template>
  <div class="tooltip-card" :style="tooltipPosition" v-if="visible">
    <div class="tooltip-content">
      <div class="tooltip-header">
        <div class="domain-info">
          <img :src="`https://www.google.com/s2/favicons?domain=${domain}`"
               :alt="domain"
               class="favicon"
          />
          <span class="domain-text">{{ domain }}</span>
        </div>
        <div class="timestamp">
          {{ formatTime(timestamp) }}
          <button
              @click="toggleFavorite"
              class="favorite-toggle"
              :class="{ 'is-favorited': isBookmarked }"
          >
            ★
          </button>
        </div>
      </div>

      <div class="tooltip-body">
        <h3 class="title">{{ title }}</h3>
        <div class="url-container">
          <a :href="url" target="_blank" class="url" :title="url">
            {{ truncateUrl(url) }}
          </a>
        </div>
      </div>

      <div class="additional-info">
<!--        <div class="info-section">-->
<!--          <label class="info-label">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="label-icon">-->
<!--              <path d="M4 5h7v7h-7z"></path>-->
<!--              <path d="M13 5h7v7h-7z"></path>-->
<!--              <path d="M4 14h7v7h-7z"></path>-->
<!--              <path d="M13 14h7v7h-7z"></path>-->
<!--            </svg>-->
<!--            主题-->
<!--          </label>-->
<!--          <div class="theme-container">-->
<!--            <span class="theme-tag">{{ theme || '未分类' }}</span>-->
<!--          </div>-->
<!--        </div>-->
        <div class="info-section" v-show="context.name">
          <label class="info-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#287ECD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <!-- 中心元素 -->
              <rect x="9" y="9" width="6" height="6"/>
              <!-- 周围的关联元素 -->
              <rect x="3" y="3" width="4" height="4"/>
              <rect x="17" y="3" width="4" height="4"/>
              <rect x="3" y="17" width="4" height="4"/>
              <rect x="17" y="17" width="4" height="4"/>
              <!-- 连接线 -->
              <path d="M7 5h2M15 5h2M12 9V7M12 15v2M7 19h2M15 19h2"/>
            </svg>
            上下文
          </label>
          <div class="tags-container">
            <span
                class="tag"
            >
              {{ context.name }}
            </span>
          </div>
        </div>

        <div class="info-section" v-show="themes.length > 0">
          <label class="info-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="label-icon">
              <path d="M7.5 3.5l0 8l5 5l5 -5l0 -8z"></path>
              <path d="M3 7l4.5 0"></path>
              <path d="M19 7l2 0"></path>
            </svg>
            主题
          </label>
          <div class="tags-container">
            <span
                v-for="theme in themes"
                :key="theme.id"
                class="tag"
            >
              {{ theme.name }}
            </span>
          </div>
        </div>
        <div class="info-section" v-show="tags.length > 0">
          <label class="info-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="label-icon">
              <path d="M7.5 3.5l0 8l5 5l5 -5l0 -8z"></path>
              <path d="M3 7l4.5 0"></path>
              <path d="M19 7l2 0"></path>
            </svg>
            标签
          </label>
          <div class="tags-container">
            <span
                v-for="tag in tags"
                :key="tag.id"
                class="tag"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="tooltip-footer">
        <div class="first-visit">
          First visited: {{ formatFullTime(ucreated_at) }}
        </div>
        <div class="id-tag">
          ID: {{ id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import keyword from "@/components/SelectionContextCard/keyword.vue";

export default {
  name: 'TimelineTooltip',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: false,
      default: -1
    },
    domain: {
      type: String,
      required: false,
      default: ""
    },
    timestamp: {
      type: Number,
      required: false,
      default: -1
    },
    title: {
      type: String,
      required: false,
      default: ""
    },
    ucreated_at: {
      type: Number,
      required: false,
      default: -1
    },
    url: {
      type: String,
      required: false,
      default: ""
    },
    mouseX: {
      type: Number,
      default: 0
    },
    mouseY: {
      type: Number,
      default: 0
    },
    // New props for additional dimensions
    themes: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => []
    },
    initialBookmarked: {
      default: false
    },
    context:{

    }
  },
  data() {
    return {
      isBookmarked: this.initialBookmarked
    }
  },
  watch: {
    // 监听 initialBookmarked 的变化
    initialBookmarked: {
      immediate: true,
      handler(newVal) {
        this.isBookmarked = newVal;
      }
    },
    // 监听 visible 的变化
    visible: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          // 当 tooltip 隐藏时重置状态
          this.isBookmarked = this.initialBookmarked;
        }
      }
    }
  },
  computed: {
    keyword() {
      return keyword
    },
    tooltipPosition() {
      return {
        left: `${this.mouseX + 10}px`,
        top: `${this.mouseY + 10}px`
      }
    }
  },
  methods: {
    toggleFavorite() {
      this.isBookmarked = !this.isBookmarked;
      this.$emit('toggle-favorite', {
        url: {id: this.id},
        isBookmarked: this.isBookmarked
      });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    },
    formatFullTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString('en-US', {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    },
    truncateUrl(url) {
      const maxLength = 50
      return url.length > maxLength
          ? url.substring(0, maxLength) + '...'
          : url
    }
  }
}
</script>

<style scoped>
.tooltip-card {
  position: fixed;
  z-index: 1000;
  width: 380px; /* Increased width to accommodate new sections */
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  pointer-events: none;
  animation: fadeIn 0.2s ease-in-out;
}

.tooltip-content {
  pointer-events: auto;
  padding: 16px;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.favorite-toggle {
  background: none;
  border: none;
  color: #d1d5db;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.favorite-toggle.is-favorited {
  color: #fbbf24;
}

.domain-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favicon {
  width: 16px;
  height: 16px;
}

.domain-text {
  color: #666;
  font-size: 14px;
}

.timestamp {
  color: #888;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.additional-info {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-section {
  background: #f9fafb;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #e2e8f0;
}

.info-label {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 8px;
  font-weight: 500;
}

.label-icon {
  margin-right: 8px;
  color: #34d399;
}

.theme-container, .tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.theme-tag, .tag {
  background: linear-gradient(135deg, #60a5fa20, #34d39920);
  color: #3b82f6;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid #60a5fa40;
  transition: all 0.2s ease;
}

.theme-tag:hover, .tag:hover {
  background: linear-gradient(135deg, #60a5fa30, #34d39930);
  transform: translateY(-1px);
}
.tooltip-card {
  position: fixed;
  z-index: 1000;
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #eaeaea;
  pointer-events: none;
  animation: fadeIn 0.2s ease-in-out;
}

.tooltip-content {
  pointer-events: auto;
  padding: 12px;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.domain-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favicon {
  width: 16px;
  height: 16px;
}

.domain-text {
  color: #666;
  font-size: 14px;
}

.timestamp {
  color: #888;
  font-size: 12px;
}

.tooltip-body {
  margin: 12px 0;
}

.title {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  line-height: 1.4;
}

.url-container {
  margin-top: 8px;
}

.url {
  color: #2196f3;
  font-size: 13px;
  text-decoration: none;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.url:hover {
  text-decoration: underline;
}

.tooltip-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #eaeaea;
}

.first-visit {
  color: #888;
  font-size: 12px;
}

.id-tag {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Rest of the existing styles remain the same */
</style>