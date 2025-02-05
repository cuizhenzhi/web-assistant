const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')
const {now_t} = require("../util/time");

const getVisits = async (start, end) => {
    // 获取当前与 URL 关联的关键词
    return await fetchAll(
        `SELECT 
                u.id, u.url, u.created_at as ucreated_at, uv.timestamp, d.domain, u.title, u.domain_id, d.created_at as dcreated_at, uv.context_id, c.color
            FROM 
                url_visits uv
            LEFT JOIN 
                url u ON uv.url_id = u.id
            LEFT JOIN
                domain d ON u.domain_id = d.id
            LEFT JOIN
                context c ON uv.context_id = c.id
            WHERE 
                uv.timestamp > ? AND uv.timestamp < ?;`,
        [start, end])
        .catch(err => {
            console.error('Error fetching existing keywords:', err);
            return [];
        });
};
module.exports = {
    getVisits
};
