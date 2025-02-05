// const fs = require("fs")
// async function main() {
//     let f = fetch('https://notionchina.co/assets/logo.png').then(resp=>
//         f.blob()).then(data=>fs.writeSync("icon.png",data));
//
// }
// main()

// const fs = require("fs");
// // const fetch = require('node-fetch'); // 引入 node-fetch
//
// async function main() {
//     try {
//         const response = await fetch('https://notionchina.co/assets/logo.png');
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const blob = await response.blob();
//         const arrayBuffer = await blob.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer); // 将ArrayBuffer转换为Buffer
//         fs.writeFileSync("icon.png", buffer); // 使用 writeFileSync 进行同步写入
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }
// main();

const fs = require("fs");
const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent'); // 导入HttpsProxyAgent

async function main() {
    const proxyUrl = 'http://127.0.0.1:10809'; // 你的代理服务器地址

    const agent = new HttpsProxyAgent(proxyUrl); // 创建代理对象

    try {
        const response = await fetch('https://notionchina.co/assets/logo.png', {
            agent: agent // 将代理对象传递给 fetch
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync("icon.png", buffer);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();