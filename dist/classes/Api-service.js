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
exports.ApiService = void 0;
const axios_1 = __importDefault(require("axios"));
const environment_1 = require("../global/environment");
const node_cron_1 = __importDefault(require("node-cron"));
const Server_1 = __importDefault(require("./Server"));
class ApiService {
    constructor() {
    }
    static getSportInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield axios_1.default.get(environment_1.BASE_URL + '&date=2023-05-14' || '')).data;
            return data;
        });
    }
    static executeCron() {
        return __awaiter(this, void 0, void 0, function* () {
            node_cron_1.default.schedule('*/10 * * * * *', () => __awaiter(this, void 0, void 0, function* () {
                const response = yield ApiService.getSportInfo();
                const nextEvents = [];
                const playingEvents = [];
                const finishedEvents = [];
                response.data.forEach(e => {
                    const dataFiltered = {
                        id: e.id,
                        startDate: e.startDate,
                        home: e.sportEvent.competitors.homeTeam,
                        away: e.sportEvent.competitors.awayTeam,
                        status: e.sportEvent.status,
                        score: e.score
                    };
                    if (e.tournament.id === "0101") {
                        if (e.sportEvent.status.id === 0) {
                            nextEvents.push(dataFiltered);
                        }
                        else if (e.sportEvent.status.id === 1) {
                            playingEvents.push(dataFiltered);
                        }
                        else if (e.sportEvent.status.id === 2) {
                            finishedEvents.push(dataFiltered);
                        }
                        else {
                            // else añadido por programación defensiva
                        }
                    }
                });
                const infoToSend = {
                    proximos: nextEvents,
                    enCurso: playingEvents,
                    finalizados: finishedEvents
                };
                const server = Server_1.default.instante;
                console.log(infoToSend);
                server.io.emit('sport-info', infoToSend);
            }));
        });
    }
}
exports.ApiService = ApiService;
