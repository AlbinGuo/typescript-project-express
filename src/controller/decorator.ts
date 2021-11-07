import { RequestHandler } from 'express';
import router from '../router';

enum Method {
  get = 'get',
  post = 'post'
}

export function controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);
    const method: Method = Reflect.getMetadata('method', target.prototype, key);
    const middleware: RequestHandler = Reflect.getMetadata('metadata', target.prototype, key);
    const handler = target.prototype[key];
    if (middleware) {
      router[method](path, middleware, handler);
    } else if (path && method && handler) {
      router[method](path, handler);
    }
  }
}

function getRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  }
}

export function use(middleWarw: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('metadata', middleWarw, target, key);
  }
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
export const put = getRequestDecorator('put');