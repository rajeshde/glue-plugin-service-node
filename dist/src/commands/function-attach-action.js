"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = exports.functionsAttachAction = void 0;
var prompts = require("prompts");
var node_path_1 = require("node:path");
var rewrite_file_1 = require("../helpers/rewrite-file");
var replace_special_chars_1 = require("../helpers/replace-special-chars");
var copy_to_target_1 = require("../helpers/copy-to-target");
var get_directories_1 = require("../helpers/get-directories");
var file_exists_1 = require("../helpers/file-exists");
var functionsAttachAction = function (program, glueStackPlugin) {
    program
        .command("function:attach-action")
        .description("Adds a graphql action against the function")
        .action(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, handler(glueStackPlugin)];
    }); }); });
};
exports.functionsAttachAction = functionsAttachAction;
var selectInstance = function (pluginInstances) { return __awaiter(void 0, void 0, void 0, function () {
    var choices, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                choices = pluginInstances.map(function (instance) {
                    return {
                        title: instance.getName(),
                        description: "Select ".concat(instance.getName(), " instance"),
                        value: instance
                    };
                });
                return [4, prompts({
                        type: "select",
                        name: "value",
                        message: "Select an instance",
                        choices: choices
                    })];
            case 1:
                value = (_a.sent()).value;
                return [2, value];
        }
    });
}); };
var selectFunction = function (functions) { return __awaiter(void 0, void 0, void 0, function () {
    var choices, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                choices = functions.map(function (_function) {
                    return {
                        title: _function,
                        value: _function
                    };
                });
                return [4, prompts({
                        type: "select",
                        name: "value",
                        message: "Select a function",
                        choices: choices
                    })];
            case 1:
                value = (_a.sent()).value;
                return [2, value];
        }
    });
}); };
var writeAction = function (pluginInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var functionsPath, directories, functionName, functionPath, actionGQLfile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                functionsPath = (0, node_path_1.join)(process.cwd(), pluginInstance.getInstallationPath(), 'functions');
                return [4, (0, file_exists_1.fileExists)(functionsPath)];
            case 1:
                if (!(_a.sent())) {
                    console.error("No functions found in ".concat((0, node_path_1.relative)('.', functionsPath), ". Please add one and try again!"));
                    return [2];
                }
                return [4, (0, get_directories_1.getDirectories)(functionsPath)];
            case 2:
                directories = _a.sent();
                if (!directories.length) {
                    console.error("No functions found in ".concat((0, node_path_1.relative)('.', functionsPath), ". Please add one and try again!"));
                    return [2];
                }
                return [4, selectFunction(directories)];
            case 3:
                functionName = _a.sent();
                functionPath = (0, node_path_1.join)(functionsPath, functionName);
                return [4, (0, file_exists_1.fileExists)(functionPath + '/handler.js')];
            case 4:
                if (!(_a.sent())) {
                    console.error("Missing \"handler.js\" file in \"".concat((0, node_path_1.relative)('.', functionPath), "\". Please add one and try again!"));
                    return [2];
                }
                return [4, (0, copy_to_target_1.copyToTarget)(pluginInstance.callerPlugin.getActionTemplateFolderPath(), functionPath)];
            case 5:
                _a.sent();
                actionGQLfile = "".concat(functionPath, "/action.graphql");
                return [4, (0, rewrite_file_1.reWriteFile)(actionGQLfile, (0, replace_special_chars_1.replaceSpecialChars)(functionName), 'actionName')];
            case 6:
                _a.sent();
                return [2];
        }
    });
}); };
function handler(glueStackPlugin) {
    return __awaiter(this, void 0, void 0, function () {
        var instance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!glueStackPlugin.getInstances().length) return [3, 4];
                    return [4, selectInstance(glueStackPlugin.getInstances())];
                case 1:
                    instance = _a.sent();
                    if (!instance) return [3, 3];
                    return [4, writeAction(instance)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3, 5];
                case 4:
                    console.error("No service instances found");
                    _a.label = 5;
                case 5: return [2];
            }
        });
    });
}
exports.handler = handler;
//# sourceMappingURL=function-attach-action.js.map