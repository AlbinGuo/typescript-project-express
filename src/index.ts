import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './router';

// 问题1：express库的类型定义文件，.d.ts文件类型描述不准确
// 问题2：当使用中间件的时候，对req和res做了修改之后，实际上类型并不能改变
// 如： req.helloworld = '123'，但实际上 Request上并没有helloworld

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router);

app.listen(7001, () => {
  console.log('server is running');
});