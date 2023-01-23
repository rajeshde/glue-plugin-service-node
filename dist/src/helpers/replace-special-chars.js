"use strict";
exports.__esModule = true;
exports.replaceRouteName = exports.replaceSpecialChars = void 0;
var replaceSpecialChars = function (str) {
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};
exports.replaceSpecialChars = replaceSpecialChars;
var replaceRouteName = function (str) {
    return str.replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
};
exports.replaceRouteName = replaceRouteName;
//# sourceMappingURL=replace-special-chars.js.map