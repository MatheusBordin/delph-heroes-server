import { Server } from "socket.io";
import { GeneralEvent } from "../types/event-type";
import { IUserSocket } from "../types/socket";
import emitter from "./event";

export class SocketService {
    /**
     * Start socket server.
     *
     * @static
     * @param {Server} io socket connection instance.
     * @returns
     * @memberof SocketService
     */
    public static start(io: Server) {
        return new SocketService(io);
    }

    constructor(private _io: Server) {
        this._io.on("connection", (socket: IUserSocket) => {
            this.onConnection(socket);

            socket.on(GeneralEvent.ChooseName, (name: string) => this.onChooseName(socket, name));
            socket.on(GeneralEvent.Disconnect, () => this.onDisconnection(socket));
        });
    }

    /**
     * Called when user is connected.
     *
     * @param {IUserSocket} socket
     * @memberof SocketService
     */
    public onConnection(socket: IUserSocket) {
        emitter.sent(GeneralEvent.Connect, socket);
    }

    /**
     * Called when user is disconnected.
     *
     * @param {IUserSocket} socket
     * @memberof SocketService
     */
    public onDisconnection(socket: IUserSocket) {
        emitter.sent(GeneralEvent.Disconnect, socket);
    }

    /**
     * Called when user choose a name.
     *
     * @param {IUserSocket} socket
     * @param {string} name
     * @memberof SocketService
     */
    public onChooseName(socket: IUserSocket, name: string) {
        socket.name = name;
    }
}