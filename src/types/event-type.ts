export type EventType = GeneralEvent | LobbyEvent | GameEvent | PlayerEvent | SystemEvent;

/**
 * System event type.
 *
 * @export
 * @enum {string}
 */
export enum SystemEvent {
    Log = "log"
}

/**
 * General event type.
 *
 * @export
 * @enum {string}
 */
export enum GeneralEvent {
    Connect = "connection",
    Disconnect = "disconnect",
    ChooseName = "socket-choose-name"
}

/**
 * Lobby event type.
 *
 * @export
 * @enum {string}
 */
export enum LobbyEvent {
    Entered = "lobby-entered",
    Exited = "lobby-exited",
    Found = "lobby-found"
}

/**
 * Game event type.
 *
 * @export
 * @enum {string}
 */
export enum GameEvent {
    Started = "game-started",
    MessageReceived = "game-message-received",
    MessageSent = "game-message-send",
    Finished = "game-finished",
    StatiticsUpdated = "game-statistics-update",
    PlayersUpdated = "game-players-update"
}

/**
 * Player event type.
 *
 * @export
 * @enum {string}
 */
export enum PlayerEvent {
    PositionChange = "player-position-change",
    Attack = "player-attack",
    UseSkill = "player-use-skill"
}

/**
 * Monster event type.
 *
 * @export
 * @enum {string}
 */
export enum MonsterEvent {
    MonsterAppear = "monster-appear",
    MonsterDied = "monster-died"
}