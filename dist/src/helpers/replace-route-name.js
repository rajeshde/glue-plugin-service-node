"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRouteName = void 0;
var replaceRouteName = function (str) {
    return str.replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
};
exports.replaceRouteName = replaceRouteName;
//# sourceMappingURL=replace-route-name.js.map