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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Server_1 = __importDefault(require("../classes/Server"));
const sockets_1 = require("../sockets/sockets");
const router = (0, express_1.Router)();
router.get('/api/xxxx', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        ok: true,
        msg: "Tudo Beem"
    });
}));
router.post('/api/connect-info', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const server = Server_1.default.instante;
    server.io.emit('mensaje-nuevo', { de, cuerpo });
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const server = Server_1.default.instante;
    server.io.in(id).emit('mensaje-privado', { de, cuerpo });
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
router.get('/usuarios', (req, res) => {
    const server = Server_1.default.instante;
    server.io.emit('general-usuarios', sockets_1.usuariosConectados.getLista());
    res.json(Object.assign({ ok: true }, sockets_1.usuariosConectados.getLista()));
});
exports.default = router;
