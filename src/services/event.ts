import { EventEmitter } from "events";
import { EventType } from "../types/event-type";

/**
 * Comunication service.
 *
 * @export
 * @class Emitter
 */
export class Emitter {
    private _eventEmitter = new EventEmitter();

    /**
     * Called on message is received.
     *
     * @param {EventType} event
     * @param {(...params: any[]) => void} cb
     * @memberof Emitter
     */
    public on(event: EventType, cb: (...params: any[]) => void) {
        this._eventEmitter.on(event, cb);
    }

    /**
     * Sent message with args.
     *
     * @param {EventType} event
     * @param {...any[]} params
     * @memberof Emitter
     */
    public sent(event: EventType, ...params: any[]) {
        this._eventEmitter.emit(event, params);
    }
}

export default new Emitter();