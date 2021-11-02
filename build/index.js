"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = __importDefault(require("./router"));
// 问题1：express库的类型定义文件，.d.ts文件类型描述不准确
// 问题2：当使用中间件的时候，对req和res做了修改之后，实际上类型并不能改变
// 如： req.helloworld = '123'，但实际上 Request上并没有helloworld
var app = express_1.default();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server is running');
});
