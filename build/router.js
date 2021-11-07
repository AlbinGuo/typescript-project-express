"use strict";
// import fs from 'fs';
// import path from 'path';
// import { Router, Request, Response, NextFunction } from 'express';
// import Crowller from './utils/crowller';
// import Analyzer from './utils/analyzer';
// import { getResponseData } from './utils/util';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// interface BodyRequest extends Request {
//   body: { [key: string]: string | undefined };
// }
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     next();
//   } else {
//     res.json(getResponseData(null, '请先登录'));
//   }
// };
// const router = Router();
// router.post('/login', (req: BodyRequest, res: Response) => {
//   const { password } = req.body;
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     res.json(getResponseData(false, '已经登陆过'));
//   } else {
//     if (password === '123' && req.session) {
//       req.session.login = true;
//       res.json(getResponseData(true));
//     } else {
//       res.json(getResponseData(false, '登陆失败'));
//     }
//   }
// });
// router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {
//   const secret = 'secretKey';
//   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
//   const analyzer = Analyzer.getInstance();
//   new Crowller(url, analyzer);
//   res.json(getResponseData(true));
// });
// router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
//   try {
//     const position = path.resolve(__dirname, '../data/course.json');
//     const result = fs.readFileSync(position, 'utf8');
//     res.json(getResponseData(JSON.parse(result)));
//   } catch (e) {
//     res.json(getResponseData(false, '数据不存在'));
//   }
// });
// export default router;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = require("express");
var crowller_1 = __importDefault(require("./utils/crowller"));
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var util_1 = require("./utils/util");
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请先登录'));
    }
};
var router = express_1.Router();
router.get('/', function () { });
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json(util_1.getResponseData(true));
});
router.get('/getData', checkLogin, function (req, res) {
    var secret = 'secretKey';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
    var analyzer = analyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.json(util_1.getResponseData(true));
});
router.get('/showData', checkLogin, function (req, res) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(position, 'utf8');
        res.json(util_1.getResponseData(JSON.parse(result)));
    }
    catch (e) {
        res.json(util_1.getResponseData(false, '数据不存在'));
    }
});
exports.default = router;
