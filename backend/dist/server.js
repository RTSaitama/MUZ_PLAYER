"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const playlists_1 = __importDefault(require("./routes/playlists"));
const PORT = 3005;
const sqlite = new better_sqlite3_1.default('file:./dev.db');
const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3(sqlite);
const prisma = new client_1.PrismaClient({ adapter });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', (0, playlists_1.default)(prisma));
app.listen(PORT, () => {
    console.log('server started at 3005 PORT');
});
