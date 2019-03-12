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
    Finded = "lobby-finded"
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
    Finished = "game-finished"
}

/**
 * Hero event type.
 *
 * @export
 * @enum {number}
 */
export enum HeroEvent {
    Killed = "hero-killed",
    Moved = "hero-moved",
    AttributeChange = "hero-attribute-change"
}