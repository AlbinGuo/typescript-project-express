import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import DellAnalyzer from './dellAnalyzer';
import fs from 'fs';
import path from 'path';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined // 泛匹配
  }
}

const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.send(`
  <html>
    <body>
      <form method="post" action="/login">
        <input type="password" name="password" placeholder="请输入密码"/>
        <button>登录</button>
      </form>
    </body>
  </html>
  `);
})

/**
 * 登录
 */
router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  console.log("req.body==", req.body);
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
    <html>
      <body>
        <a href="/getData">爬取内容</a>
        <a href="/showData">显示内容</a>
        <a href="/logout">退出</a>
      </body>
    </html>
    `)
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.send('登陆成功')
    } else {
      res.send('登陆失败')
    }
  }

});

/**
 * 退出
 */
router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
    res.redirect('/')
  }
});

/**
 * 爬取数据
 */
router.get('/getData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('getData Success!');
  } else {
    res.send('请登录后爬取内容');
  }
});

/**
 * 展示数据
 */
router.get('/showData', (req: RequestWithBody, res: Response) => {
  try {
    const postion = path.resolve(__dirname, '../data/course.json');
    const result = fs.readFileSync(postion, 'utf8');
    res.json(JSON.parse(result))
  } catch (error) {
    res.send('尚未爬取到内容！');
  }
});

export default router;