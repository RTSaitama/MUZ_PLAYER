"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.default = (prisma) => {
    const router = express_1.default.Router();
    router.get('/playlists', async (req, res) => {
        try {
            const playlists = await prisma.playlist.findMany();
            res.json(playlists);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch playlists' });
        }
    });
    router.post('/playlists', async (req, res) => {
        try {
            const { name } = req.body;
            const playlist = await prisma.playlist.create({
                data: { name }
            });
            res.status(201).json(playlist);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create playlist' });
        }
    });
    router.get('/playlists/:id', async (req, res) => {
        try {
            const playlistId = parseInt(req.params.id);
            const playlist = await prisma.playlist.findUnique({
                where: { id: playlistId },
                include: { tracks: true }
            });
            res.json(playlist);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch playlist' });
        }
    });
    router.delete('/playlists/:id', async (req, res) => {
        try {
            const playlistId = parseInt(req.params.id);
            await prisma.playlist.delete({
                where: { id: playlistId }
            });
            res.json({ message: `Плейліст ${playlistId} видалено` });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete playlist' });
        }
    });
    return router;
};
