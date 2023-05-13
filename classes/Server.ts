import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { SERVER_PORT } from '../global/environment';
import { conectarCliente, desconectar, loginWS, mensaje } from '../sockets/sockets';
 
 
export default class Server {
  private static _instance: Server;
 
  public app: express.Application;
  public port: number;
 
  public io: socketIO.Server;
  public httpServer: http.Server;
 
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
 
    this.httpServer = http.createServer(this.app);
    this.io = new socketIO.Server(this.httpServer, { cors: {origin: true, credentials: true} });
 
    this.listenSockets();
  }
 
  public static get instante(): Server {
    if (!Server._instance) {
        Server._instance = new this();
      }
      return Server._instance;
  }
 
  private listenSockets() {
    console.log('listening sockets...');
    this.io.on('connection', (cliente) => {
      
      conectarCliente(cliente);

      mensaje(cliente, this.io);

      loginWS(cliente, this.io);

      desconectar(cliente);
    });
  }
 
  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}