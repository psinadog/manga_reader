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
var mongoose = require("mongoose");
var User = require("./Schema/users");
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        this.db = mongoose.connection;
        mongoose.connect('mongodb+srv://gokutok:111111ab@cluster0-pu7z4.azure.mongodb.net/mangaDB?retryWrites=true&w=majority');
    }
    MongoDB.prototype.save_user = function (name, password, email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (User.countDocuments().exec() > 0)
                    return [2 /*return*/];
                Promise.all([
                    User.create({ name: name, password: password, email: email })
                ]).then(function () { return console.log('Added Users'); });
                return [2 /*return*/];
            });
        });
    };
    MongoDB.prototype.find_user_name = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, User.find({ name: name }, function (error, users_name) {
                        _this.is_exists_set(users_name);
                    })];
            });
        });
    };
    MongoDB.prototype.find_user_mark = function (name, password) {
        var _this = this;
        return User.find({ name: name, password: password }, function (error, users_name) {
            _this.is_exists_set(users_name);
        });
    };
    MongoDB.prototype.is_exists_set = function (val) {
        if (Object.keys(val).length === 0) {
            this.temp = false;
        }
        else {
            this.temp = true;
        }
    };
    MongoDB.prototype.boolean_value_get = function () {
        return this.temp;
    };
    MongoDB.prototype.paginated_results = function (model) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var results, page, limit, startIndex, endIndex, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        results = {
                            next: {},
                            previous: {},
                            results: ""
                        };
                        page = parseInt(req.query.page);
                        limit = 5;
                        startIndex = (page - 1) * limit;
                        endIndex = page * limit;
                        _a = endIndex;
                        return [4 /*yield*/, model.countDocuments().exec()];
                    case 1:
                        if (_a < (_c.sent())) {
                            results.next = {
                                page: page + 1,
                                limit: limit
                            };
                        }
                        if (startIndex > 0) {
                            results.previous = {
                                page: page - 1,
                                limit: limit
                            };
                        }
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        _b = results;
                        return [4 /*yield*/, model.find().limit(limit).skip(startIndex).exec()];
                    case 3:
                        _b.results = _c.sent();
                        res.paginatedResults = results;
                        next();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _c.sent();
                        res.status(500).json({ message: e_1.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    };
    return MongoDB;
}());
exports.MongoDB = MongoDB;
