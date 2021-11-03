import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import DellAnalyzer from './dellAnalyzer';

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

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  console.log("req.body==", req.body);
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send('已经登录过了')
  } else {

    if (password === '123' && req.session) {
      req.session.login = true;
      res.send('登陆成功')
      // const secret = 'secretKey';
      // const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
      // const analyzer = DellAnalyzer.getInstance();
      // new Crowller(url, analyzer);
      // res.send('getData Success!');
    } else {
      // res.send(`${req.teacherName} password Error!`);
      res.send('登陆失败')
    }
  }

});
export default router;