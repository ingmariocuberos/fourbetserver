import axios from "axios";
import { BASE_URL } from "../global/environment";
import cron from 'node-cron'
import { SportData } from "../interfaces/sport-data.interface";
import Server from "./Server";
import { sportEvent, sportInfoToSend } from "../interfaces/sport-event.interface";

export class ApiService {

    constructor(){
        
    }

    public static async getSportInfo(){
        const data = (await axios.get( BASE_URL + '&date=2023-05-14' || '' )).data;
        return data;
    }

    public static async executeCron(){
        cron.schedule('*/10 * * * * *', async ()=>{
            const response: SportData = await ApiService.getSportInfo();

            const nextEvents: sportEvent[] = [];
            const playingEvents: sportEvent[] = [];
            const finishedEvents: sportEvent[] = [];

            response.data.forEach(e => {

                const dataFiltered: sportEvent = {
                    id: e.id,
                    startDate: e.startDate,
                    home: e.sportEvent.competitors.homeTeam,
                    away: e.sportEvent.competitors.awayTeam,
                    status: e.sportEvent.status,
                    score: e.score
                }

                if(e.tournament.id === "0101"){
                    if(e.sportEvent.status.id === 0){
                        nextEvents.push(dataFiltered);
                    } else if(e.sportEvent.status.id === 1){
                        playingEvents.push(dataFiltered);
                    } else if(e.sportEvent.status.id === 2){
                        finishedEvents.push(dataFiltered);
                    } else {
                        // else añadido por programación defensiva
                    }
                }
            });

            const infoToSend: sportInfoToSend = {
                proximos: nextEvents,
                enCurso: playingEvents,
                finalizados: finishedEvents
            }

            const server = Server.instante;

            console.log(infoToSend);
        
            server.io.emit('sport-info', infoToSend);
        })
    }
}