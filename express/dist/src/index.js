"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json()); // body값 파싱 미들웨어
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
