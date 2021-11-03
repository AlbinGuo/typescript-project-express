"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("\n  <html>\n    <body>\n      <form method=\"post\" action=\"/getData\">\n        <input type=\"password\" placeholder=\"\u8BF7\u8F93\u5165\u5BC6\u7801\"/>\n        <button>\u786E\u5B9A</button>\n      </form>\n    </body>\n  </html>\n  ");
});
router.post('/getData', function (req, res) {
    var _a = req.body, password = _a.password, username = _a.username;
    if (req.body.password === '123') {
        var secret = 'secretKey';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        var analyzer = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('getData Success!');
    }
    else {
        res.send(req.teacherName + " password Error!");
    }
});
exports.default = router;
