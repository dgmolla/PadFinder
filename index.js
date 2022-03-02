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
        while (_) try {
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
var node_html_parser_1 = require("node-html-parser");
var firebase_1 = require("./firebase");
var axios = require('axios')["default"];
var getAptString = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, resultsHTML, idsToCheck_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.get(url)];
            case 1:
                response = _a.sent();
                resultsHTML = getSearchResults(response.data)['childNodes'];
                idsToCheck_1 = [];
                resultsHTML.forEach(function (result) {
                    if (result.nodeType === 1 && !result['rawAttrs'].includes('data-repost-of')) {
                        var rawAttrs = result['rawAttrs'].split(" ");
                        if (rawAttrs.length < 3) {
                            //this grabs id from data-pid tag
                            var id = rawAttrs[1].substring(10, rawAttrs[1].length - 1);
                            idsToCheck_1.push(id);
                        }
                    }
                });
                checkForNewResults(idsToCheck_1);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getSearchResults = function (string) {
    var root = (0, node_html_parser_1.parse)(string);
    var res = root.querySelector('#search-results');
    return res;
};
//see if there are any new search results
var checkForNewResults = function (idsToCheck) { return __awaiter(void 0, void 0, void 0, function () {
    var existingResults, existingResultsSet_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, firebase_1.get)((0, firebase_1.ref)(firebase_1.db, 'apartments'))];
            case 1:
                existingResults = _a.sent();
                existingResultsSet_1 = new Set(existingResults.val());
                console.log(existingResultsSet_1);
                //then, check ea id in param string for existence in the set u just made
                idsToCheck.filter(function (id) {
                    !existingResultsSet_1.has(id);
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
getAptString('https://losangeles.craigslist.org/search/apa?query=west+hollywood&max_price=5000&min_bedrooms=3&max_bedrooms=3&availabilityMode=0&sale_date=all+dates');
