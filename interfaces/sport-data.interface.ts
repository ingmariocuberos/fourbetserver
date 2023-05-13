export interface SportData {
    status:    string;
    data:      Datum[];
    timestamp: Date;
}

export interface Datum {
    id:                  string;
    lastUpdate:          Date;
    startDate:           Date;
    score:               Score;
    sport:               Sport;
    sportEvent:          SportEvent;
    tournament:          Tournament;
    editorialInfo?:      EditorialInfo;
    tv?:                 Winner[];
    startDateConfirmed?: boolean;
}

export interface EditorialInfo {
    site:      string;
    url:       string;
    otherUrls: OtherURL[];
}

export interface OtherURL {
    tag: Tag;
    url: string;
}

export enum Tag {
    Autocover = "autocover",
    CompetitorCalendar = "competitor-calendar",
    CompetitorCard = "competitor-card",
    CompetitorClassification = "competitor-classification",
    CompetitorSquad = "competitor-squad",
    CompetitorStats = "competitor-stats",
    Cronica = "cronica",
    Directo = "directo",
    Previa = "previa",
}

export interface Score {
    awayTeam: ScoreAwayTeam;
    homeTeam: ScoreAwayTeam;
    period:   Period;
    winner:   Winner;
}

export interface ScoreAwayTeam {
    subScore?:  string;
    totalScore: string;
}

export interface Period {
    alternateNames: AlternateCountryNamesClass;
    id:             number;
    name:           PeriodName;
    startTime?:     Date;
}

export interface AlternateCountryNamesClass {
    enEN: string;
    esES: string;
}

export enum PeriodName {
    EnJuego = "En juego",
    FaseRegular = "Fase regular",
    Finalizado = "Finalizado",
    SinComenzar = "Sin comenzar",
    The1ªParte = "1ª parte",
    The2ªParte = "2ª parte",
}

export interface Winner {
    id:   string;
    name: string;
}

export interface Sport {
    alternateNames: AlternateCountryNamesClass;
    id:             string;
    name:           SportName;
    type?:          Type;
}

export enum SportName {
    Fútbol = "Fútbol",
    Único = "Único",
}

export enum Type {
    Match = "match",
}

export interface SportEvent {
    competitors:    Competitors;
    alternateNames: AlternateCountryNamesClass;
    name:           string;
    status:         Period;
    referees?:      string[];
    season?:        Winner;
    matchDay?:      string;
    phase?:         Period;
    group?:         Sport;
    location?:      Location;
}

export interface Competitors {
    awayTeam: CompetitorsAwayTeam;
    homeTeam: CompetitorsAwayTeam;
}

export interface CompetitorsAwayTeam {
    abbName:                  string;
    commonName:               string;
    fullName:                 string;
    id:                       string;
    country?:                 string;
    countryName:              string;
    alternateCountryNames:    AlternateCountryNamesClass;
    imageUrlSizes:            ImageURLSizes;
    imageUrl:                 string;
    images:                   Images;
    competitorEditorialInfo?: CompetitorEditorialInfo;
    alternateCommonNames?:    AlternateCommonNamesClass;
    sham?:                    boolean;
}

export interface AlternateCommonNamesClass {
    enEN:  string;
    esES:  string;
    itIT?: string;
    ptBR?: string;
}

export interface CompetitorEditorialInfo {
    competitorId:   string;
    urlsDataCenter: EditorialInfo;
}

export interface ImageURLSizes {
    XS: string;
    S:  string;
    M:  string;
    L:  string;
}

export interface Images {
    urlLogo: string[];
    urlFlag: string[];
}

export interface Location {
    name?:    string;
    address?: string;
    image?:   string;
    url?:     string;
}

export interface Tournament {
    alternateNames: AlternateCommonNamesClass;
    id:             string;
    name:           string;
    isNational:     boolean;
}