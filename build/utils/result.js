"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = function (data, errorMsg) {
    if (errorMsg) {
        return {
            success: false,
            errorMsg: errorMsg,
            data: data
        };
    }
    else {
        return {
            success: true,
            data: data
        };
    }
    ;
};
