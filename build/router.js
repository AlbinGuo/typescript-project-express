"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = require("express");
var crowller_1 = __importDefault(require("./utils/crowller"));
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var result_1 = require("./utils/result");
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(result_1.getResponseData(null, "登录失败"));
    }
};
var router = express_1.Router();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n    <html>\n      <body>\n        <a href=\"/getData\">\u722C\u53D6\u5185\u5BB9</a>\n        <a href=\"/showData\">\u663E\u793A\u5185\u5BB9</a>\n        <a href=\"/logout\">\u9000\u51FA</a>\n      </body>\n    </html>\n    ");
    }
    else {
        res.send("\n    <html>\n      <body>\n        <form method='post' action='/login'>\n          <input placeholder='\u8BF7\u8F93\u5165\u5BC6\u7801' name='password' type='password'/>\n          <button>\u767B\u5F55</button>\n        </form>\n      </body>\n    </html>\n    ");
    }
});
/**
 * 登录
 */
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json(result_1.getResponseData(false, '已经登录过了'));
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.json(result_1.getResponseData(true));
        }
        else {
            res.json(result_1.getResponseData(null, "登录失败"));
        }
    }
});
/**
 * 退出
 */
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json(result_1.getResponseData(true));
});
/**
 * 爬取数据
 */
router.get('/getData', checkLogin, function (req, res) {
    var secret = 'secretKey';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
    var analyzer = analyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.json(result_1.getResponseData(true));
});
/**
 * 展示数据
 */
router.get('/showData', checkLogin, function (req, res) {
    try {
        var postion = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(postion, 'utf8');
        res.json(JSON.parse(result));
    }
    catch (error) {
        res.json(result_1.getResponseData(null, '数据不存在！'));
    }
});
exports.default = router;
