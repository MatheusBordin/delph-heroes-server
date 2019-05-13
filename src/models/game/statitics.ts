/**
 * Game statitics.
 *
 * @export
 * @interface IGameStatitics
 */
export interface IGameStatitics {
    one: ITeamStatitics;
    two: ITeamStatitics;
}

/**
 * Team statitics.
 *
 * @export
 * @interface ITeamStatitics
 */
export interface ITeamStatitics {
    kills: number;
    deaths: number;
    players: IPlayerStatitics[];
}

/**
 * Player statitics.
 *
 * @export
 * @interface IPlayerStatitics
 */
export interface IPlayerStatitics {
    name: string;
    kills: number;
    deaths: number;
}