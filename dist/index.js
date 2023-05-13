"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const Server_1 = __importDefault(require("./classes/Server"));
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const Api_service_1 = require("./classes/Api-service");
const server = Server_1.default.instante;
server.start(() => {
    console.log('Inicializado en el puerto: ', server.port);
});
server.app.use((0, cors_1.default)());
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use('/', router_1.default);
Api_service_1.ApiService.executeCron();
