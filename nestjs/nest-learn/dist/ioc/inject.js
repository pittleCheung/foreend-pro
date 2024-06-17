"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectToken = exports.Inject = void 0;
require("reflect-metadata");
var METADATA_INJECT_KEY = "METADATA_INJECT_KEY";
function Inject(token) {
    return function (target, key, paramsIndex) {
        console.log(token, paramsIndex);
        Reflect.defineMetadata(METADATA_INJECT_KEY, token, target, "index-" + paramsIndex);
        return target;
    };
}
exports.Inject = Inject;
function getInjectToken(target, index) {
    return (Reflect.getMetadata(METADATA_INJECT_KEY, target, "index-" + index));
}
exports.getInjectToken = getInjectToken;
//# sourceMappingURL=inject.js.map