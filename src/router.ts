import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import DellAnalyzer from './dellAnalyzer';

const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.send(`
  <html>
    <body>
      <form method="post" action="/getData">
        <input type="password" placeholder="请输入密码"/>
        <button>确定</button>
      </form>
    </body>
  </html>
  `);
})

router.post('/getData', (req: Request, res: Response) => {
  console.log('body=====', req.body)
  if (req.body.password === '123') {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('getData Success!');
  } else {
    res.send('password Error!');
  }
});
export default router;