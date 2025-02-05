<template>
  <div id="url-statistic">
    <timeline ref="timeline"
              @selection-change="selectionChange"
              @selection-start="selectionStart"
              :visitsStart="calendar.dateRange.start"
              :visitsEnd="calendar.dateRange.end"
    />

<!--    日历组件-->
    <functional-calendar
        class="functional-calendar"
        :is-dark='false'
        :is-date-range='true'
        ref="Calendar"
        :change-month-function="true"
        :change-year-function="true"
        v-model="calendar"
        @choseDay="choseDay"
        :date-format="'yyyy-mm-dd'"
        @selectedDaysCount="selectedDaysCount"
    ></functional-calendar>

<!--    :markedDates="markedDates"-->
<!--    :marked-date-range='markedDateRange'-->
<!--    上下文标签卡      -->
    <selection-context-card
        :is-visible="showContextCard"
        :position="contextCardPosition"
        :context-list="contextList"
        :start-time="selectionStartTime"
        :end-time="selectionEndTime"
        :selectedItemCount="selectedItemCount"
        :selectedUrls="selectedUrls"
        @addContextWithUrls="addContextWithUrls"
        @close="clearSelection"
        @context-selected="handleContextSelected"
    />
  </div>
</template>

<script>
import Timeline from './Timeline.vue'
import TimelineTooltip from "@/components/TimelineTooltip.vue";
import SelectionContextCard from "@/components/SelectionContextCard/index.vue";
import { FunctionalCalendar } from 'vue-functional-calendar';
import {addContext, get, getContext, updateUrlContext} from '../api/context.js'
export default {
  name: 'url-statistic',
  components: {
    // TimelineTooltip,
    SelectionContextCard,
    Timeline,
    FunctionalCalendar
  },
  data() {
    return {
      // ... 原有的数据
      contextCardPosition: { x: 300, y: 300 },
      selectionStartTime: new Date().getTime(),
      selectionEndTime: 0,
      showContextCard: false,
      selectedItemCount: 0,
      selectedUrls: [],
      contextList: [],

      calendar:{
        dateRange: {
          start: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
          end: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
        },
      },
      // markedDates: [`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`]//[`2025-2-4`]//
      // defaultStart: new Date('2025-02-01').setDate(1),
      // defaultEnd:new Date('2025-01-05'),
      // markedDateRange:{
      //   start: defaultStart,
      //   end: '2025-01-05'
      // }
    }
  },
  computed:{
    // markedDateRange(){
    //   console.log('in markedDateRange', this.calendar.dateRange)
    //   return {
    //     start: this.defaultStart,
    //     end: this.defaultEnd
    //   }
    //   // this.calendar.dateRange ? {start: false, end: false} : {
    //   //   start: this.defaultStart,
    //   //   end: this.defaultEnd
    //   // }
    // }
  },
  methods: {
    choseDay(data){
      console.log(data, this.calendar)
      if(data.isMouseToRight)
        this.searchVisits();
    },
    searchVisits(){
      // console.log(this.calendar)
      const {start, end} = this.calendar.dateRange;
      // let enddate = new Date(end);
      // console.log(start,end)
      // enddate = enddate.setDate(enddate.getDate()+1);

      this.$refs.timeline.fetchData(start, end)
    },
    selectedDaysCount(data){
      console.log(data)
    },
    logCalendar(){
      console.log(this.calendar)
    },
    selectionChange(data) {
      console.log('startTag!', data)
      this.showContextCard = false;
      this.$nextTick(()=>{
        if(!data.selectedurls[0])return
        this.showContextCard = true;
        this.contextCardPosition = {
          x: data.x,
          y: data.y
        }
        this.selectionStartTime = Number(data.selectedurls[0].timestamp)
        this.selectionEndTime = Number(data.selectedurls[data.selectedurls.length - 1].timestamp)
        this.selectedItemCount = data.selectedurls.length
        this.selectedUrls = data.selectedurls
      })
    },

    addContextWithUrls({newContext, urlInfo}){
      console.log("new context:")
      addContext(newContext).then(data=>{
        console.log("new context:",data)
        urlInfo.context = data[0]
        this.handleContextSelected(urlInfo)
      })
    },
    selectionStart(){
      this.showContextCard = false;
    },
    handleContextSelected({ context, timeRange, selectedUrls }) {
      console.log('Selected context:', context)
      console.log('Time range:', timeRange)
      console.log('selected Urls:', selectedUrls)
      let ids= selectedUrls.map(i=>i.id)
      // updateUrlContext({
      //   url_ids:ids,
      //   context_id: context.id
      // })
      updateUrlContext({
        urls: selectedUrls,
        context_id: context.id
      }).then(_ =>{
        this.updateContext()
        const {start, end} = this.calendar.dateRange;
        this.$refs.timeline.fetchData(start, end).then(_=>{
          this.showContextCard=false;
        })
      })
    },
    clearSelection(){
      this.showContextCard=false;
    },
    updateContext(){
      getContext().then(data=>{
        this.contextList = data;
      })
    }
  },
  created() {
    // get().then(data=>{
    //   console.log("data",data)
    // })
    this.updateContext()
    // console.log(this.calendar,)
  }
}
</script>
<style>

.functional-calendar{
  position: fixed;
  top: 10px;
}

</style>