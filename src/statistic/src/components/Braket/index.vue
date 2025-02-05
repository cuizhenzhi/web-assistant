<template>
  <div class="time-line">
    <div class="tl-body">
      <span
          class="context"
          :style="[
          borderStyle,
          {
            borderLeft: showLeft ? '2px solid #ccc' : 'none',
            borderRight: showRight ? '2px solid #ccc' : 'none',
            borderTop: showLine ? '2px solid #ccc' : 'none',
            borderRadius: getBorderRadius
          }
        ]"
      >
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BracketTimeline',
  props: {
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    },
    showLine: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: '#ccc'
    }
  },
  computed: {
    borderStyle() {
      return {
        borderColor: this.borderColor
      }
    },
    getBorderRadius() {
      const radius = '8px';
      let style = '';

      if (this.showLeft) {
        style += `${radius} 0 0 0`;
      } else {
        style += '0 0 0 0';
      }

      if (this.showRight) {
        style += ` 0 ${radius} 0 0`;
      } else {
        style += ' 0 0 0 0';
      }

      return style;
    }
  }
}
</script>

<style scoped>
.time-line .tl-body span {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 400;
  font-size: 14px;
}

.time-line .tl-body span.context {
  top: -37px;
  width: 92%;
  opacity: 1;
  padding: 8px 16px;
  box-sizing: border-box;
}
</style>