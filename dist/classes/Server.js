"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const environment_1 = require("../global/environment");
const sockets_1 = require("../sockets/sockets");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = http_1.default.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer, { cors: { origin: true, credentials: true } });
        this.listenSockets();
    }
    static get instante() {
        if (!Server._instance) {
            Server._instance = new this();
        }
        return Server._instance;
    }
    listenSockets() {
        console.log('listening sockets...');
        this.io.on('connection', (cliente) => {
            (0, sockets_1.conectarCliente)(cliente);
            (0, sockets_1.mensaje)(cliente, this.io);
            (0, sockets_1.loginWS)(cliente, this.io);
            (0, sockets_1.desconectar)(cliente);
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
