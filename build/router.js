"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("\n  <html>\n    <body>\n      <form method=\"post\" action=\"/login\">\n        <input type=\"password\" name=\"password\" placeholder=\"\u8BF7\u8F93\u5165\u5BC6\u7801\"/>\n        <button>\u767B\u5F55</button>\n      </form>\n    </body>\n  </html>\n  ");
});
router.post('/login', function (req, res) {
    var password = req.body.password;
    console.log("req.body==", req.body);
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send('已经登录过了');
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.send('登陆成功');
            // const secret = 'secretKey';
            // const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
            // const analyzer = DellAnalyzer.getInstance();
            // new Crowller(url, analyzer);
            // res.send('getData Success!');
        }
        else {
            // res.send(`${req.teacherName} password Error!`);
            res.send('登陆失败');
        }
    }
});
exports.default = router;
