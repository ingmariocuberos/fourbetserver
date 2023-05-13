"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWS = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const Server_1 = __importDefault(require("../classes/Server"));
const Usuario_1 = require("../classes/Usuario");
const Usuarios_lista_1 = require("../classes/Usuarios-lista");
exports.usuariosConectados = new Usuarios_lista_1.UsuariosLista();
const conectarCliente = (cliente) => {
    const usuario = new Usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente) => {
    const server = Server_1.default.instante;
    cliente.on('disconnect', () => {
        const server = Server_1.default.instante;
        const usuarioDesconectado = exports.usuariosConectados.borrarUsuario(cliente.id);
        server.io.emit('general-usuarios', exports.usuariosConectados.getLista());
        console.log('====== Usuario Desconectado ======');
        console.log(usuarioDesconectado);
    });
};
exports.desconectar = desconectar;
//Escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido ', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
const loginWS = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            msg: `Usuario configurado ${payload.nombre}`
        });
    });
    cliente.on('desconectar-usuario', (payload, callback) => {
        const usuarioDesconectado = exports.usuariosConectados.getUserByName(payload.nombre);
        const server = Server_1.default.instante;
        if (usuarioDesconectado) {
            exports.usuariosConectados.borrarUsuario(usuarioDesconectado === null || usuarioDesconectado === void 0 ? void 0 : usuarioDesconectado.id);
            server.io.emit('general-usuarios', exports.usuariosConectados.getLista());
        }
        callback({
            ok: true,
            msg: `Usuario desconectado ${payload.nombre}`
        });
    });
};
exports.loginWS = loginWS;
