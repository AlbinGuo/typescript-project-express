import fs from 'fs';
import path from 'path';
import { Router, Request, Response, NextFunction, response } from 'express';
import Crowller from './utils/crowller';
import DellAnalyzer from './utils/analyzer';
import { getResponseData } from './utils/result';

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined // 泛匹配
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "登录失败"))
  }
};

const router = Router();
router.get('/', (req: Request, res: Response) => {
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
    `);
  } else {
    res.send(`
    <html>
      <body>
        <form method='post' action='/login'>
          <input placeholder='请输入密码' name='password' type='password'/>
          <button>登录</button>
        </form>
      </body>
    </html>
    `)
  }

})

/**
 * 登录
 */
router.post('/login', (req: BodyRequest, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResponseData(false, '已经登录过了'))
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true))
    } else {
      res.json(getResponseData(null, "登录失败"));
    }
  }

});

/**
 * 退出
 */
router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.json(getResponseData(true))
});

/**
 * 爬取数据
 */
router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {
  const secret = 'secretKey';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = DellAnalyzer.getInstance();
  new Crowller(url, analyzer);
  res.json(getResponseData(true));
}
);

/**
 * 展示数据
 */
router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
  try {
    const postion = path.resolve(__dirname, '../data/course.json');
    const result = fs.readFileSync(postion, 'utf8');
    res.json(JSON.parse(result))
  } catch (error) {
    res.json(getResponseData(null, '数据不存在！'))
  }
});

export default router;