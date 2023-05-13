import bodyParser from "body-parser";
import Server from "./classes/Server";
import router from "./routes/router";
import cors from 'cors';
import { ApiService } from "./classes/Api-service";


const server = Server.instante;

server.start( ()=> {
    console.log('Inicializado en el puerto: ', server.port );
});

server.app.use(cors());
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

server.app.use('/', router);

ApiService.executeCron();




