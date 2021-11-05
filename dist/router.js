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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var cors_1 = __importDefault(require("cors"));
var express_1 = require("express");
var stream_1 = require("stream");
var readline_1 = __importDefault(require("readline"));
var multer_1 = __importDefault(require("multer"));
var axios_1 = __importDefault(require("axios"));
var client_1 = require("./database/client");
var multerConfig = (0, multer_1.default)();
var router = (0, express_1.Router)();
exports.router = router;
var options = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "https://workflow.abaris.com.br",
    preflightContinue: false,
};
router.use((0, cors_1.default)(options));
router.post("/products", multerConfig.single("file"), function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var file, buffer, readableFile, productsLine, products, productsLine_1, productsLine_1_1, line, productLineSplit, e_1_1, products_1, products_1_1, _a, code_bar, description, price, quantity, e_2_1;
    var e_1, _b, e_2, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                file = request.file;
                buffer = file.buffer;
                readableFile = new stream_1.Readable();
                readableFile.push(buffer);
                readableFile.push(null);
                productsLine = readline_1.default.createInterface({
                    input: readableFile,
                });
                products = [];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, 7, 12]);
                productsLine_1 = __asyncValues(productsLine);
                _d.label = 2;
            case 2: return [4 /*yield*/, productsLine_1.next()];
            case 3:
                if (!(productsLine_1_1 = _d.sent(), !productsLine_1_1.done)) return [3 /*break*/, 5];
                line = productsLine_1_1.value;
                productLineSplit = line.split(",");
                // console.log(productLineSplit[0]);
                products.push({
                    code_bar: productLineSplit[0],
                    description: productLineSplit[1],
                    price: Number(productLineSplit[2]),
                    quantity: Number(productLineSplit[3]),
                });
                _d.label = 4;
            case 4: return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _d.trys.push([7, , 10, 11]);
                if (!(productsLine_1_1 && !productsLine_1_1.done && (_b = productsLine_1.return))) return [3 /*break*/, 9];
                return [4 /*yield*/, _b.call(productsLine_1)];
            case 8:
                _d.sent();
                _d.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12:
                _d.trys.push([12, 18, 19, 24]);
                products_1 = __asyncValues(products);
                _d.label = 13;
            case 13: return [4 /*yield*/, products_1.next()];
            case 14:
                if (!(products_1_1 = _d.sent(), !products_1_1.done)) return [3 /*break*/, 17];
                _a = products_1_1.value, code_bar = _a.code_bar, description = _a.description, price = _a.price, quantity = _a.quantity;
                return [4 /*yield*/, client_1.client.products.create({
                        data: {
                            code_bar: code_bar,
                            description: description,
                            price: price,
                            quantity: quantity,
                        },
                    })];
            case 15:
                _d.sent();
                _d.label = 16;
            case 16: return [3 /*break*/, 13];
            case 17: return [3 /*break*/, 24];
            case 18:
                e_2_1 = _d.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 24];
            case 19:
                _d.trys.push([19, , 22, 23]);
                if (!(products_1_1 && !products_1_1.done && (_c = products_1.return))) return [3 /*break*/, 21];
                return [4 /*yield*/, _c.call(products_1)];
            case 20:
                _d.sent();
                _d.label = 21;
            case 21: return [3 /*break*/, 23];
            case 22:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 23: return [7 /*endfinally*/];
            case 24: return [2 /*return*/, response.json(products)];
        }
    });
}); });
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var config, body, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Modelo 1
                console.log(req.headers.version);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Custom-Origin": "https://univille.abaris.com.br/",
                        version: "'" + req.headers.version + "'",
                    },
                };
                console.log(config);
                body = '{"userName": "api.integra", "password": "@pi.1nt3gr@"}';
                return [4 /*yield*/, axios_1.default.post("https://workflow.abaris.com.br/api/v1/login", body, config)];
            case 2:
                data = (_a.sent()).data;
                return [2 /*return*/, res.json("ok")];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
