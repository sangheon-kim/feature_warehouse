"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json()); // body값 파싱 미들웨어
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res, next) => {
    res.send("Sangheon App");
});
app.post("/profile", (req, res) => {
    console.log(req.cookies);
    res.end();
});
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
