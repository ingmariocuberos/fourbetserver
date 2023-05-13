"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
}
exports.Usuario = Usuario;
