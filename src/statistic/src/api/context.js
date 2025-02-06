import request from '../utils/request.js'
export function addContext(data) {
  return request({
    url: '/context',
    method: 'post',
    data: data
  })
}

export function getContext() {
  return request({
    url: '/context',
    method: 'get'
  })
}

export function updateUrlContext(data) {
  return request({
    url: '/url_context',
    method: 'post',
    data: data
  })
}
// fetch('http://localhost:3000/api/url_visit?start=0&end=1738508230555').then(resp=>resp.json()).then(data=>{
//   console.log("data1",data)
// })
export function get(){
  return request({
    url: `/url_visit?start=${new Date('2025-01-01').getTime()}&end=1738508230555`,
    method: 'get'
  })
}

export function fetchTimelineVisit(start, end) {
  return request({
    url: `/url_visit?start=${new Date(start).getTime()}&end=${new Date(end).getTime()}`,
    method: 'get'
  })
  // console.log('in fetch data')
  // try {
  //   const response = await fetch(`http://localhost:3000/api/url_visit?start=${new Date(start).getTime()}&end=${new Date(end).getTime()}`)
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`)
  //   }
  //   const data = await response.json()
  //   console.log("数据：",data)
  //   this.groupedData = Object.values(data)
  // } catch (error) {
  //   console.error('Error fetching data:', error)
  // }
}
// get().then(data=>{
//   console.log(data,)
// })

// addContext({
//   name: '工作会议',
//   color: '#4299e1',
//   description: '重要工作会议相关的网页记录',
// })
// import axios from 'axios'
// import errorCode from '../utils/errorCode'
// const ec = require('../utils/errorCode')