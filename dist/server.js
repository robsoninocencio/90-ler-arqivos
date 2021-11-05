"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = require("./router");
var port = 8080;
var app = (0, express_1.default)();
app.use(router_1.router);
app.listen(port, function () { return console.log("Server is running on port " + port); });
