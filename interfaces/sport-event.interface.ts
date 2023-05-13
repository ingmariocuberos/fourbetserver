import { CompetitorsAwayTeam, Period, Score } from "./sport-data.interface";

export interface sportEvent {
    id: String;
    startDate: Date;
    home: CompetitorsAwayTeam;
    away: CompetitorsAwayTeam;
    status: Period;
    score: Score;
}

export interface sportInfoToSend {
    proximos: sportEvent[],
    enCurso: sportEvent[],
    finalizados: sportEvent[]
}