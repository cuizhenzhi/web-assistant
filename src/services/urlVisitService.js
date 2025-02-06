const db = require('../db/database');
const {fetch, fetchAll, run} = require('../db/db_operations.js')
const {now_t} = require("../util/time");

const getVisits = async (start, end) => {
    // 获取当前与 URL 关联的关键词
    return await fetchAll(
        `SELECT 
    u.id, 
    u.url, 
    u.created_at AS ucreated_at, 
    uv.timestamp, 
    d.domain, 
    u.title, 
    u.domain_id, 
    u.isBookmarked,
    d.created_at AS dcreated_at, 
    uv.context_id, 
    c.color,
    GROUP_CONCAT(
        CASE 
            WHEN k.id IS NOT NULL AND k.name IS NOT NULL THEN CONCAT(k.id, ':', k.name) 
--              WHEN k.id IS NOT NULL AND k.name IS NOT NULL THEN CONCAT(k.name) 
            ELSE NULL 
        END
    ) AS keywords,  -- 只有当 ID 和名称都非空时才组合
    GROUP_CONCAT(
        CASE 
            WHEN t.id IS NOT NULL AND t.name IS NOT NULL THEN CONCAT(t.id, ':', t.name) 
            ELSE NULL 
        END
    ) AS themes  -- 只有当 ID 和名称都非空时才组合
FROM 
    url_visits uv
LEFT JOIN 
    url u ON uv.url_id = u.id
LEFT JOIN
    domain d ON u.domain_id = d.id
LEFT JOIN
    context c ON uv.context_id = c.id
LEFT JOIN
    url_keyword uk ON u.id = uk.url_id
LEFT JOIN
    keyword k ON uk.keyword_id = k.id
LEFT JOIN
    url_theme ut ON u.id = ut.url_id
LEFT JOIN
    theme t ON ut.theme_id = t.id
WHERE 
    uv.timestamp > ? AND uv.timestamp < ?
GROUP BY 
    u.id, u.url, u.created_at, uv.timestamp, d.domain, u.title, u.domain_id, d.created_at, uv.context_id, c.color;`,
        [start, end])
        .catch(err => {
            console.error('Error fetching existing keywords:', err);
            return [];
        });
};
module.exports = {
    getVisits
};
