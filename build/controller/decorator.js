"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var middleware = Reflect.getMetadata('metadata', target.prototype, key);
        var handler = target.prototype[key];
        if (middleware) {
            exports.router[method](path, middleware, handler);
        }
        else if (path && method && handler) {
            exports.router[method](path, handler);
        }
    }
}
exports.controller = controller;
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
function use(middleWarw) {
    return function (target, key) {
        Reflect.defineMetadata('metadata', middleWarw, target, key);
    };
}
exports.use = use;
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
exports.put = getRequestDecorator('put');
