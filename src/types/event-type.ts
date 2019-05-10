export type EventType = GeneralEvent | LobbyEvent | GameEvent | HeroEvent;

/**
 * General event type.
 *
 * @export
 * @enum {number}
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
 * @enum {number}
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
 * @enum {number}
 */
export enum GameEvent {
    Started = "game-started",
    MessageReceived = "game-message-received",
    MessageSent = "game-message-send",
    Finished = "game-finished",
    GameUpdated = "game-statistics-update"
}

/**
 * Hero event type.
 *
 * @export
 * @enum {number}
 */
export enum HeroEvent {
    PositionChange = "hero-position-change",
    Attack = "hero-attack",
    UseSkill = "hero-use-skill",
    Spawn = "hero-spawn"
}

/**
 * Monster event type.
 *
 * @export
 * @enum {number}
 */
export enum MonsterEvent {
    MonsterAppear = "monster-appear",
    MonsterDied = "monster-died"
}