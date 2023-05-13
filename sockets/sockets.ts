import { Socket, Server } from "socket.io";
import Servero from '../classes/Server'
import { Usuario } from "../classes/Usuario";
import { UsuariosLista } from "../classes/Usuarios-lista";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) =>{

    const usuario = new Usuario( cliente.id );

    usuariosConectados.agregar(usuario);
}

export const desconectar = ( cliente: Socket) =>{

    const server = Servero.instante;
    cliente.on('disconnect', ()=>{
        const server = Servero.instante;
        const usuarioDesconectado = usuariosConectados.borrarUsuario(cliente.id);
        server.io.emit('general-usuarios', usuariosConectados.getLista());
        console.log('====== Usuario Desconectado ======');
        console.log(usuarioDesconectado);
    })
}

//Escuchar mensajes
export const mensaje = ( cliente: Socket, io: Server) =>{
    cliente.on('mensaje', ( payload: {de: string, cuerpo: string})=>{
        console.log('Mensaje recibido ', payload);

        io.emit('mensaje-nuevo', payload );
    });
}

export const loginWS = ( cliente: Socket, io: Server) => {
    cliente.on('configurar-usuario', 
               ( payload: { nombre: string }, 
                callback: Function )=>{
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
        
        callback({
            ok: true,
            msg: `Usuario configurado ${payload.nombre}`
        })
    });

    cliente.on('desconectar-usuario', ( payload: { nombre: string }, 
                callback: Function )=>{

        const usuarioDesconectado = usuariosConectados.getUserByName( payload.nombre );
        const server = Servero.instante;
        if(usuarioDesconectado){
            usuariosConectados.borrarUsuario( usuarioDesconectado?.id );
            server.io.emit('general-usuarios', usuariosConectados.getLista());
        }
        
        callback({
            ok: true,
            msg: `Usuario desconectado ${payload.nombre}`
        })
    })
}