const express = require('express');
const path = require("path")
const bodyParser = require('body-parser');
const router = require('./routes/index');
const app = express();
const cors = require('cors')
const fs = require("fs")
const publicDirectory = path.join(__dirname, 'browser', 'browser-demo', 'dist');

// app.use(bodyParser.json());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: false }))
app.use(cors())
console.log("publicDirectory: ",publicDirectory);
app.use(express.static(path.resolve(publicDirectory)));
const publicDirectory2= path.join(__dirname, 'public');

app.use(express.static(path.resolve(publicDirectory2)));
app.use('/api', router);
// 递归函数：列出目录下所有文件，包括子目录中的文件
const getFilesRecursively = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // 如果是目录，递归读取
      results = results.concat(getFilesRecursively(filePath));
    } else {
      // 如果是文件，加入到结果数组
      results.push(filePath);
    }
  });

  return results;
};

// 路由：列出/public目录下的所有文件的网络路径
app.get('/files', (req, res) => {
  try {
    // 获取/public目录下的所有文件（包括子目录中的文件）
    const files = getFilesRecursively(publicDirectory);

    // 获取所有文件的网络路径，并去掉public目录
    const filePaths = files.map(file => {
      // 去掉public路径部分，只保留相对路径
      const relativePath = path.relative(publicDirectory, file);
      const networkPath = `http://localhost:3000/${relativePath.replace(/\\/g, '/')}`;
      return networkPath;
    });

    // 返回所有文件的网络路径
    // res.json(filePaths);
    res.setHeader('Content-Type', 'text/plain');

    // 返回纯文本格式的文件路径，每个文件路径一行
    res.send(filePaths.join('\n'));

  } catch (err) {
    res.status(500).json({ error: 'Unable to read public directory' });
  }
});
// console.log(path.join(__dirname, "src","browser", "browser-demo", "dist"));
// app.use(express.static(path.join(__dirname, "browser", "browser-demo", "dist")))//,
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器正在运行，监听端口 ${PORT}`);
});
