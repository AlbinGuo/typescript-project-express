import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get } from './decorator';

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

@controller
class LoginController {

  @get('/login')
  login() { }

  @get('/')
  home(req: BodyRequest, res: Response) {
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
  }
}