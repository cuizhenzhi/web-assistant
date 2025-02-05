<template>
  <li :class="['tl-body', {'selected': selected}]" :data-id="id" :data-timestamp="timestamp"
      ref="main"
      @mouseenter="handleUrlEnter"
      @mouseleave="handleUrlLeave"
      :style="tlbodyStyle">
    <span class="time">{{ formatTime(timestamp) }}</span>
<!--    <span class="context" :style="spanLeftStyle"></span>-->
    <span class="context-left" :style="spanLeftStyle"></span>
    <span class="context-middle" :style="spanMiddleStyle"></span>
    <span class="context-right" :style="spanRightStyle"></span>
    <h3 :style="{'--context-color': context_color}">
      <a :href="url" target="_blank">
        <img :src="faviconUrl" :alt="domain">
      </a>
    </h3>
  </li>
</template>

<script>
// import TimelineTooltip from "@/components/TimelineTooltip.vue";

export default {
  name: 'TimelineItem',
  // components: {TimelineTooltip},
  data() {
    return{
      styleclass: "tl-body",
      // visible: this.url.includes('huya'),
    }
  },
  props: {
    context_color: {
      type: String
    },
    context_id: {
    },
    selectedItems:{

    },
    id:{

    },
    position:{
      type: String,
      default: 'middle'
    },
    selected:Boolean,
    timestamp: {
      type: Number,
      required: true,
      default: -10000
    },
    url: {
      type: String,
      required: false,
      default: ""
    },
    domain: {
      type: String,
      required: false,
      default: ""
    },
    ucreated_at: {
      type: Number,
      required: false,
      default: -1
    },
    title: {
      type: String,
      required: false,
      default: ""
    },
  },
  computed: {
    faviconUrl() {
      return `https://www.google.com/s2/favicons?domain=${this.domain}`;//`https://${this.domain}/favicon.ico`
    },
    itemStyle() {
      return {
        borderTopColor: this.color
      }
    },
    spanLeftStyle(){
      if(this.context_color && ['left','single'].includes(this.position)){
        return `border: 6px solid ${this.context_color};
                border-right-color: transparent;
                border-bottom-color: transparent;`
        // return `border: 3px solid ${this.context_color};`
      }else{
        return ``
      }
    },
    spanRightStyle(){
      if(this.context_color && ['right','single'].includes(this.position)){
        return `border: 6px solid ${this.context_color};
                border-bottom-color: transparent;
                border-left-color: transparent;`
        // return `border: 3px solid ${this.context_color};`
      }else{
        return ``
      }
    },
    spanMiddleStyle(){
      if(this.context_color){
        let map = {
          'middle': ' width: 140%;',
          'single': ' width: 38%;',
          'left': ' width: 55%; left: 69%;',
          'right': ' width: 55%; left: 31%;'
        }
        return `border: 3px solid ${this.context_color}; ${map[this.position]}`
      }else{
        return ``
      }
    },
    tlbodybeforecolor(){
      // console.log(this.context_id, this.context_color)
      return this.context_id ? this.context_color : '#23b7e5'
    },
    tlbodyStyle(){
      return {
        'border-top': `4px solid ${this.context_color}`,
        '--context-color': this.tlbodybeforecolor
      }
    }
  },
  watch: {
    color: {
      immediate: true,
      handler(newColor) {
        // 更新伪元素的颜色
        document.documentElement.style.setProperty('--timeline-dot-color', newColor);
      }
    }
  },
  methods: {
    handleUrlEnter(event){
      // console.log(event.relatedTarget.classList.contains(),)
      if(event.relatedTarget?.classList.contains('time-line'))return;
      // console.log("enter",event.x, event.y,event.target,event)
      let rect = this.$refs.main.getBoundingClientRect()
      this.$emit('urlEnter', {
        id: this.id,
        domain: this.domain,
        timestamp: this.timestamp,
        url: this.url,
        ucreated_at: this.ucreated_at,
        title: this.title,
        mouseX: Math.min(rect.left + 30,window.innerWidth - 380),
        mouseY: Math.min(rect.top + 40,window.innerHeight - 210),
      })
    },
    handleUrlLeave(event){
      // console.log(event.relatedTarget,)
      if(event.relatedTarget?.classList.contains('time-line'))return;
      // console.log("leave",event.x, event.y,event.target,event)
      this.$emit('urlLeave', this.id)
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
    }
  }
}

//     .tl-body.selected:before {
//   border-color: #ff8b06;
// }
//
// .tl-body.selected h3:before {
//   border-bottom-color: #ff8b06;
// }
</script>
<style scoped>

.tl-body {
  border-top: 4px solid #23b7e5;
  margin-top: 20px;
  position: relative;
  padding: 0;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-bottom: 24px;
  margin-bottom: 24px;
}

.tl-body span {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 400;
  font-size: 14px;
}
.tl-body span.time {
  top: -29px;
  opacity: 0.7;
}
.tl-body span.context {
  top: -47px;
  width: 92%;
  opacity: 1;
}
.tl-body span.context-left{
  top: -47px;
  left: 16px;
  display: inline-block;
  width: 10px;
  height: 10px;
  /*border: 6px solid rgb(102,126,234);*/
  border-radius: 0 0 0 0;
  border-top-left-radius: 8px;
}
.tl-body span.context-right{
  /*border: 6px solid rgb(102,126,234);*/
  top: -47px;
  left: 72%;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 0 8px 0 0;
}
.tl-body span.context-middle{
  top: -47px;
  /*border: 3px solid rgb(102,126,234);*/
}
.tl-body:before {
  position: absolute;
  content: "";
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #fff;
  border: 2px solid #23b7e5;
  border-color: var(--context-color);/*#23b7e5;*/
  border-radius: 50%;
  box-shadow: 0 0 0 3px #fff;
}

.tl-body h3 {
  font-size: 15px;
  background-color: #23b7e5;
  margin: 8px;
  padding: 5px 5px;
  border-radius: 4px;
  font-weight: normal;
  position: relative;
}

.tl-body h3:before {
  content: "";
  position: absolute;
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-bottom-color: #23b7e5;
  border-top: 0;
}

.tl-body a {
  text-decoration: none;
  color: white;
  display: block;
  text-align: center;
}

.tl-body a img {
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
}
.tl-body.selected{
  border-color: #ff8b06;
}
.tl-body{
  z-index: 100;
  padding-top: 0;
}
.tl-body.selected:before {
  border: 2px solid #ff8b06;
}
.tl-body.selected h3{
  background-color: #ff8b06;
}

.tl-body.selected h3:before {
  border-bottom-color: #ff8b06;
}
</style>