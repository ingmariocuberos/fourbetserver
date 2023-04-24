import bodyParser from "body-parser";
import Server from "./classes/Server";
import router from "./routes/router";
import cors from 'cors'

const server = new Server();

server.start( ()=> {
    console.log('Inicializado en el puerto: ', server.port );
});

server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors({origin: true, credentials: true}) )

server.app.use('/', router);