<template>
  <li class="tl-header">
    <h2 :class="{ firstHour }">{{ hour }}:00</h2>
    <h3 v-if="date">{{ date }}</h3>
  </li>
</template>

<script>
export default {
  name: 'TimelineHeader',
  props: {
    hour: {
      type: String,
      required: true
    },
    date: {
      type: String,
      default: ''
    },
    firstHour: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

.tl-header {
  margin: 4px 0;
  flex-shrink: 0;
}

.tl-header h2 {
  background-color: #23b7e5;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
}

.tl-header h2.firstHour {
  background-color: #b923e5;
}

.tl-header h3 {
  text-align: center;
  margin: 0;
}
</style>