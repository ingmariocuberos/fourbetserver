"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const preset = "https://api.unidadeditorial.es/sports/v1/events/preset/1_99a16e5b";
exports.default = axios_1.default.create({
    baseURL: preset + "?timezoneOffset=-5&sport=01&date="
});
