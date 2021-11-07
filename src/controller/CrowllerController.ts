import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorator';
import Crowller from '../utils/crowller';
import Analyzer from '../utils/analyzer';
import { getResponseData } from '../utils/util';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

const router = Router();

/**
 * 爬虫控制器
 */
@controller
class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: BodyRequest, res: Response) {
    try {
      const secret = 'secretKey';
      const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
      const analyzer = Analyzer.getInstance();
      new Crowller(url, analyzer);
      res.json(getResponseData(true));
    } catch (error) {

    }
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: BodyRequest, res: Response) {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf8');
      res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData(false, '数据不存在'));
    }
  }
}