<template>
  <div
      class="timeline-container"
      ref="container"
      @mousedown="startSelection"
      @mousemove="updateSelection"
      @mouseup="endSelection"
      @mouseleave="handleMainLeave"
  >
<!--    <div>-->
<!--      @selectedDaysCount="selectedDaysCount"-->
<!--      :configs="calendarConfigs"-->
<!--      <button @click="searchVisits">查询</button>-->
<!--    </div>-->
    <!-- 选择框 -->
    <div
        v-if="isSelecting"
        class="selection-box"
        ref="selectionbox"
        :style="selectionBoxStyle"
    ></div>
    <!-- 时间轴内容 -->
    <ul class="time-line">
      <template v-for="(dayData, dayIndex) in groupedData">
        <template v-for="(hourData, hour) in dayData.hours">
          <timeline-header
              :key="`header-${dayIndex}-${hour}`"
              :hour="hour"
              :date="isFirstHourOfDay(dayData, hour) ? dayData.date : ''"
              :first-hour="isFirstHourOfDay(dayData, hour)"
          />
          <timeline-item
              v-for="(item, itemIndex) in hourData"
              :key="item.id-item.timestamp"
              :timestamp="item.timestamp"
              :url="item.url"
              :domain="item.domain"
              :id="item.id"
              :title="item.title"
              :ucreated_at="item.ucreated_at"
              :selected="selectedItems.includes(item.id)"
              :context_color="item.color"
              :context_id="item.context_id"
              :position="getItemPosition(hourData, itemIndex, item)"
              @urlLeave="handleUrlLeave"
              @urlEnter="handleUrlEnter"
          />
<!--          getColor(item.color)-->
        </template>
      </template>
    </ul>

    <TimelineTooltip
        :visible="showUrlVisible"
        :id="showUrlInfo.id"
        :domain="showUrlInfo.domain"
        :timestamp="showUrlInfo.timestamp"
        :title="showUrlInfo.title"
        :ucreated_at="showUrlInfo.ucreated_at"
        :url="showUrlInfo.url"
        :mouseX="showUrlInfo.mouseX"
        :mouseY="showUrlInfo.mouseY"
    />
  </div>
</template>

<script>
import TimelineHeader from './TimelineHeader.vue'
import TimelineItem from './TimelineItem.vue'
import TimelineTooltip from "@/components/TimelineTooltip.vue";
import { FunctionalCalendar } from 'vue-functional-calendar';
import {fetchTimelineVisit} from "@/api/context";

export default {
  name: 'Time-line',
  components: {
    TimelineTooltip,
    TimelineHeader,
    TimelineItem,
    // FunctionalCalendar
  },
  props:{
    visitsStart: {},
    visitsEnd: {}
  },
  data() {
    return {
      groupedData: [],
      isSelecting: false,
      startPoint: { x: 0, y: 0 },
      endPoint: { x: 0, y: 0 },
      selectedItems: [],
      selectedItems1: [],
      selectedItems3: [],
      selectedItemSet: new Set(),
      selectionBox: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      showUrlInfo:{
        domain: "",
        domain_id: -1,
        id: -1,
        timestamp: -1,
        title: "",
        ucreated_at: -1,
        url: "",
        mouseX: 1000,
        mouseY: 1000
      },
      showUrlVisible: false,
      tooltipenter: false,
      //
      // calendar:{},
      // calendarData: {},
      // calendarConfigs: {
      //   // sundayStart: false,
      //   dateFormat: 'yyyy-mm-dd',
      //   // isDatePicker: false,
      //   // isDateRange: false
      // }
    }
  },
  computed: {
    selectionBoxStyle() {
      // console.log("left:", this.selectionBox.left, " top:", this.selectionBox.top,
      //     " width:", this.selectionBox.width, " height:", this.selectionBox.height)
      return {
        left: `${this.selectionBox.left}px`,
        top: `${this.selectionBox.top}px`,
        width: `${this.selectionBox.width}px`,
        height: `${this.selectionBox.height}px`
      }
    }
  },
  watch:{
    // calendar(newVal, oldVal) {
    //     console.log('calendar changed from', oldVal.dateRange?.start, 'to', newVal.dateRange?.start);
    //   }
  },
  // watch: {
  //   selectedItems1(newVal, oldVal) {
  //     console.log('selectedItems1 changed from', oldVal, 'to', newVal);
  //   }
  // },

  methods: {
    handleUrlEnter(data){
      // console.log(event.relatedTarget.classList.contains(),)
      // if(event.relatedTarget.classList.contains('time-line'))return;
      // console.log("enter",event.x, event.y,event.target,event)
      // this.$emit('urlEnter', this.id)
      this.showUrlVisible = false;
      this.$nextTick(()=>{
        this.showUrlVisible = true;
        this.showUrlInfo = data;
        // console.log('urlEner',data,)

      })
    },
    getColor(color){
      if(!color) color = '#23b7e5'
      return color
    },
    // getItemPosition(hourData, itemIndex, item){
    //   if(hourData.length === 1)
    //     return `single`
    //   else if(itemIndex===0){
    //     return 'left'
    //   }else if(itemIndex === hourData.length-1){
    //     return 'right'
    //   }else{
    //     let eqleft = hourData[itemIndex-1].context_id === item.context_id;
    //     let eqright = hourData[itemIndex+1].context_id === item.context_id;
    //     if(eqleft && eqright) return `middle`
    //     if(!eqleft && !eqright) return `single`
    //     if(eqleft) return `right`
    //     return `left`
    //     // return hourData[itemIndex-1].context_id !== item.context_id ? 'left' :
    //     //     hourData[itemIndex+1].context_id !== item.context_id ? 'right' : 'middle';
    //   }
    // },
    getItemPosition(hourData, itemIndex, item){
      if(hourData.length === 1)
        return `single`
      else {
        let eqleft = itemIndex === 0 ? false : hourData[itemIndex-1].context_id === item.context_id;
        let eqright = (itemIndex ===  hourData.length - 1) ? false : hourData[itemIndex+1].context_id === item.context_id;
        // if (itemIndex === 0 && eqright) {
        //   return 'left'
        // } else if ((itemIndex === hourData.length - 1) && eqleft) {
        //   return 'right'
        // } else {
        //   if (eqleft && eqright) return `middle`
        //   if (!eqleft && !eqright) return `single`
        //   if (eqleft) return `right`
        //   return `left`
        //   // return hourData[itemIndex-1].context_id !== item.context_id ? 'left' :
        //   //     hourData[itemIndex+1].context_id !== item.context_id ? 'right' : 'middle';
        // }
        if (eqleft && eqright) return `middle`
        if (!eqleft && !eqright) return `single`
        if (eqleft) return `right`
        return `left`
      }
    },
    handleUrlLeave(data){
      // if(this.tooltipenter)return;
      // this.showUrlVisible = false;
      // console.log('urlLeave',data,)
    },
    handleMainLeave(){
      this.showUrlVisible = false;
    },
    startSelection(event) {
      // if (event.target.closest('.tl-header')) return // 不在header上开始选择

      const containerRect = this.$refs.container.getBoundingClientRect()
      this.isSelecting = true
      this.startPoint = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top
      }

      if (!event.ctrlKey) {
        this.selectedItems = []
        this.selectedItems1 = []
        this.selectedItems3 = []
      }

      this.$emit('selection-start')
    },
    updateSelection(event) {
      if (!this.isSelecting) return

      const containerRect = this.$refs.container.getBoundingClientRect()
      this.endPoint = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top
      }

      this.selectionBox = {
        left: Math.min(this.startPoint.x, this.endPoint.x),
        top: Math.min(this.startPoint.y, this.endPoint.y),
        width: Math.abs(this.endPoint.x - this.startPoint.x),
        height: Math.abs(this.endPoint.y - this.startPoint.y)
      }

      // this.checkIntersections()
      this.debouncecheckIntersections();
    },
    endSelection(event) {
      // this.checkIntersections()
      let sd = document.querySelectorAll('.selected')
      sd = Array.from(sd);
      // console.log(sd)
      let selectedurls = []
      sd.forEach(i=>selectedurls.push(
          {
            id: i.dataset.id,
            timestamp: i.dataset.timestamp
          }
      ))
      selectedurls.sort((a,b)=>a.timestamp - b.timestamp)
      // console.log(ids)
      this.selectionBox.width = `0px`;
      this.selectionBox.height = `0px`;
      this.selectionBox.left = `-100px`;
      this.selectionBox.top = `-100px`;
      // let rec = this.$refs.selectionbox.getBoundingClientRect();
      // console.log(rec,)
      // console.log("selected:",this.selectedItems,)
      // console.log("selected1:",this.selectedItems1,[...new Set(this.selectedItems1)])
      // console.log("selected3:",this.selectedItems3,)
      this.isSelecting = false
      this.$emit('selection-change', {
        selectedurls,
        x: Math.min(event.x + 20,window.innerWidth - 500),
        y: Math.min(event.y + 20,window.innerHeight - 670),

      })
    },
    debounce: (func, wait) => {
      let timer
      return () => {
        clearTimeout(timer)
        timer = setTimeout(func, wait);
      }
    },
    throttle: (func, wait) => {
      let timer;

      return () => {
        if (timer) {
          // clearTimeout(timer)
          return
        }
        timer = setTimeout(() => {
          func();
          timer = null
        }, wait)
      }
    },
    checkIntersections() {
      const timelineItems = this.$el.querySelectorAll('.tl-body')
      const containerRect = this.$refs.container.getBoundingClientRect()
      // const selectionBoxRect = this.selectionBox.getBoundingClientRect()

      // console.log("this.selectionBox",this.selectionBox)
      if(this.selectionBox.width == `0px`) {

        timelineItems.forEach(item => {
          item.classList.remove('selected')
        })
        return;
      }

      timelineItems.forEach(item => {
        const itemRect = item.getBoundingClientRect()
        // const id = parseInt(item.dataset.id)
        const id = parseInt(item.getAttribute('data-id')) // 需要在TimelineItem中设置这个属性

        // const timestamp = parseInt(item.dataset.timestamp)
        const timestamp = parseInt(item.getAttribute('data-timestamp')) // 需要在TimelineItem中设置这个属性

        // console.log(id, item.dataset)
        const relativeRect = {
          left: itemRect.left - containerRect.left,
          top: itemRect.top - containerRect.top,
          right: itemRect.right - containerRect.left,
          bottom: itemRect.bottom - containerRect.top
        }

        const isIntersecting = !(
            relativeRect.left > this.selectionBox.left + this.selectionBox.width ||
            relativeRect.right < this.selectionBox.left ||
            relativeRect.top > this.selectionBox.top + this.selectionBox.height ||
            relativeRect.bottom < this.selectionBox.top
        )

        // const itemIndex = this.selectedItems3.indexOf(id)
        // if (isIntersecting) {//&& itemIndex === -1
        //   // console.log("+1",)
        //   this.selectedItemSet.add(id);
        //   this.selectedItems3.push(id)
        //   this.selectedItems = [...this.selectedItemSet]
        // }
        // else if (!isIntersecting) {// && itemIndex !== -1
        //   // console.log("-1",)
        //   this.selectedItems3.splice(itemIndex, 1)
        //   this.selectedItemSet.delete(id);
        //   this.selectedItems = [...this.selectedItemSet]
        // }
        // if (isIntersecting && !this.selectedItemSet.has(id)) {
        //   this.selectedItemSet.add(id);
        //   this.selectedItems3.push(id);  // 触发响应式更新
        //   this.selectedItems = Array.from(this.selectedItemSet);  // 更新为数组，以便Vue追踪
        // } else if (!isIntersecting && this.selectedItemSet.has(id)) {
        //   this.selectedItemSet.delete(id);
        //   let index = this.selectedItems3.indexOf(id);
        //   if (index !== -1) {
        //     this.selectedItems3.splice(index, 1);  // 正确使用splice移除
        //   }
        //   this.selectedItems = Array.from(this.selectedItemSet);  // 更新为数组，以便Vue追踪
        // }

        // const itemIndex1 = this.selectedItems1.indexOf(id)
        // const includes1 = this.selectedItems1.includes(id)
        // if (isIntersecting) {//&& itemIndex1 === -1
        //   // console.log("+1",)
        //   // item.style.borderColor = "#ff8b06";
        //   // if(includes1)return;
        //   // this.selectedItems1.push(id)
        //   // // this.selectedItems3.push(item)
        //   // console.log("selected1:",this.selectedItems1,)
        // }
        // else if(!isIntersecting&& includes1){// && itemIndex1 !== -1
        //   // console.log("-1",)
        //   const itemIndex1 = this.selectedItems1.indexOf(id)
        //   this.selectedItems1.splice(itemIndex1, 1)
        //   item.style.borderColor = "#23b7e5";
        // }else{
        //   item.style.borderColor = "#23b7e5";
        // }

        if (isIntersecting) {//&& itemIndex1 === -1
          item.classList.add('selected')
        }else{
          item.classList.remove('selected')
        }
      })
    },
    fetchData(startDateString, endDateString) {
      let enddate = new Date(endDateString);
      console.log(startDateString,endDateString)
      enddate = enddate.setDate(enddate.getDate()+1);
      return fetchTimelineVisit(startDateString, enddate).then(data=>{
        this.groupedData = Object.values(data)
      })
    },
    isFirstHourOfDay(dayData, currentHour) {
      return currentHour === Object.keys(dayData.hours)[0]
    }
  },
  created() {
    this.fetchData(new Date(this.visitsStart), new Date(this.visitsEnd))
    this.debouncecheckIntersections = this.checkIntersections//this.debounce(this.checkIntersections, 1)
    console.log(this.debouncecheckIntersections,)

  }
}
</script>

<style>
.timeline-container {
  position: relative;
  width: 100%;
  user-select: none;
  display: flex;
}
.selection-box {
  position: absolute;
  border: 1px dashed #0099FF;
  background-color: rgba(195, 213, 237, 0.6);
  pointer-events: none;
  z-index: 1000;
}
.time-line {
  margin: 0;
  width: 84%;
  margin-left: 3%;
  position: absolute;
  left: 10%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 58px 0 0 0;
  -moz-user-select: none; /*火狐*//*选中文字时避免出现蓝色背景*/
  -webkit-user-select: none; /*webkit浏览器*//*选中文字时避免出现蓝色背景*/
  -ms-user-select: none; /*IE10*//*选中文字时避免出现蓝色背景*/
  user-select: none;/*选中文字时避免出现蓝色背景*/
}

.time-line li {
  list-style-type: none;
}


</style>
