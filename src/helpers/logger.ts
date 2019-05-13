import { createLogger, transports } from "winston";
import emitter from "../services/event";
import { SystemEvent } from "../types/event-type";

const winston = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logger.log' })
    ]
});

export const logger = {
    info: (message: string, ...args: any[]) => {
        winston.info(message, ...args);
        emitter.sent(SystemEvent.Log, 'info', message, args);
    },
    error: (message: string, err: any[]) => {
        winston.warn(message, err);
        emitter.sent(SystemEvent.Log, 'error', message, err);
    }
};