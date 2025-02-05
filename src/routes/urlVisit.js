const express = require('express');
const router = express.Router();
const db = require('../db/database');
const {getVisits} = require("../services/urlVisitService");


router.get('/url_visit', async (req, res) => {
    const {start, end} = req.query;
    console.log(start,end)
    const data = await getVisits(start, end);
    // const result = await getKeywordOfUrl(url_id)

     function processData(data) {
        const groupedByDay = {}

        data.sort((a, b) => a.timestamp - b.timestamp)

        data.forEach(item => {
            const time = new Date(item.timestamp)
            const date = time.toLocaleDateString('en-CA', {
                timeZone: 'Asia/Shanghai',  // 设置为你需要的时区，"Asia/Shanghai" 对应的是 UTC+8
            }).substring(5, 10);// time.toISOString().substring(5, 10)
            const hour = time.getHours().toString()

            if (!groupedByDay[date]) {
                groupedByDay[date] = { date, hours: {} }
            }
            if (!groupedByDay[date].hours[hour]) {
                groupedByDay[date].hours[hour] = []
            }
            groupedByDay[date].hours[hour].push(item)
        })
         return Object.values(groupedByDay);
    }
    res.send(processData(data))
})

module.exports = router;