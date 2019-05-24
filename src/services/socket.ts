import { Server } from "socket.io";
import { GeneralEvent, LobbyEvent, PlayerEvent, GameEvent } from "../types/event-type";
import { IUserSocket } from "../types/socket";
import emitter from "./event";
import { IGameStatitics } from "../models/game/statitics";
import { logger } from "../helpers/logger";

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

            socket.on(
                GeneralEvent.ChooseName, 
                ({ name }: { name: string }) => this.onChooseName(socket, name)
            );
            socket.on(
                LobbyEvent.Entered, 
                () => emitter.sent(LobbyEvent.Entered, socket.name)
            );
            socket.on(
                PlayerEvent.PositionChange, 
                (position: any) => {
                    socket.broadcast.emit(PlayerEvent.PositionChange, { playerName: socket.name, position });
                    logger.info(`Player ${socket.name} position change`);
                }
            );
            socket.on(
                PlayerEvent.Attack, 
                (attack: {target: string, skill?: string}) => emitter.sent(PlayerEvent.Attack, socket.name, attack.target, attack.skill)
            );
            socket.on(
                PlayerEvent.UseSkill, 
                (skillAt: any) => {
                    socket.broadcast.emit(PlayerEvent.UseSkill, skillAt);
                    logger.info(`Player ${socket.name} usage skill`);
                }
            );

            socket.on(GeneralEvent.Disconnect, () => this.onDisconnection(socket));
        });

        this.listenEvents();
    }

    /**
     * Called when user is connected.
     *
     * @param {IUserSocket} socket
     * @memberof SocketService
     */
    public onConnection(socket: IUserSocket) {
        emitter.sent(GeneralEvent.Connect, socket);

        // Log
        logger.info('New player connected');
    }

    /**
     * Called when user is disconnected.
     *
     * @param {IUserSocket} socket
     * @memberof SocketService
     */
    public onDisconnection(socket: IUserSocket) {
        emitter.sent(GeneralEvent.Disconnect, socket);

        // Log
        logger.info(`Player ${socket.name || socket.id} disconnected`);
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

        // Log
        logger.info(`Player '${name}' choosed your name`);
    }

    /**
     * Called on game found.
     *
     * @param {string} gameId Game id.
     * @param {string} playerName Player name.
     * @memberof SocketService
     */
    public onGameFound(gameId: string, playerName: string) {
        let socket: IUserSocket;
        const sockets = Object.entries(this._io.sockets.sockets);

        for (const [id, item] of sockets) {
            if ((item as IUserSocket).name === playerName) {
                socket = item as IUserSocket;
                break;
            }
        }

        socket.join(`game-${gameId}`);
    }

    /**
     * Called on game started.
     *
     * @param {string} gameId
     * @param {IGameStatitics} gameStats
     * @param {*} playerInfos
     * @memberof SocketService
     */
    public onGameStarted(gameId: string, gameStats: IGameStatitics, playerInfos: any) {
        this._io.to(`game-${gameId}`).emit(GameEvent.Started, { gameStats, playerInfos });
    }

    /**
     * Called on game finished.
     *
     * @param {string} gameId
     * @param {IGameStatitics} gameStats
     * @param {*} playerInfos
     * @memberof SocketService
     */
    public onGameFinish(gameId: string, gameStats: IGameStatitics, playerInfos: any) {
        this._io.to(`game-${gameId}`).emit(GameEvent.Finished, {gameStats, playerInfos});
    }

    /**
     * Called on player infos changed.
     *
     * @param {string} gameId
     * @param {*} playerInfos
     * @memberof SocketService
     */
    public onPlayerInfoChange(gameId: string, playerInfos: any) {
        this._io.to(`game-${gameId}`).emit(GameEvent.PlayersUpdated, playerInfos);
    }

    /**
     * Called on stats changed.
     *
     * @param {string} gameId
     * @param {IGameStatitics} gameStats
     * @memberof SocketService
     */
    public onStatiticsUpdated(gameId: string, gameStats: IGameStatitics) {
        this._io.to(`game-${gameId}`).emit(GameEvent.StatiticsUpdated, gameStats);
    }

    /**
     * Listen game events.
     *
     * @private
     * @memberof SocketService
     */
    private listenEvents() {
        emitter.on(LobbyEvent.Found, this.onGameFound.bind(this));
        emitter.on(GameEvent.Started, this.onGameStarted.bind(this));
        emitter.on(GameEvent.Finished, this.onGameFinish.bind(this));
        emitter.on(GameEvent.PlayersUpdated, this.onPlayerInfoChange.bind(this));
        emitter.on(GameEvent.StatiticsUpdated, this.onStatiticsUpdated.bind(this));
    }
}