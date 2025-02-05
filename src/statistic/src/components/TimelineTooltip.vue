<template>
  <div class="tooltip-card" :style="tooltipPosition" v-if="visible">
    <div class="tooltip-content"  >
<!--      @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"-->
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
    }
  },
  computed: {
    tooltipPosition() {
      return {
        left: `${this.mouseX + 10}px`,
        top: `${this.mouseY + 10}px`
      }
    }
  },
  methods: {
    // handleMouseEnter(event){
    //   console.log('!!!enter',)
    //   this.$emit("enter",event)
    // },
    // handleMouseLeave(event){
    //   this.$emit("leave",event)
    // },
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
</style>