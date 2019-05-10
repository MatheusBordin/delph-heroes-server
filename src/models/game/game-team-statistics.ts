import { Player } from "./player";

/**
 * Game team statistics model.
 *
 * @export
 * @class GameTeamStatistics
 */
export class GameTeamStatistics {
    public players: Player[] = [];

    /**
     * Return total of kills of team.
     *
     * @readonly
     * @memberof GameTeamStatistics
     */
    public get kills() {
        return this.players.reduce((acc, player) =>  acc + player.kills, 0);
    }

    /**
     * Return total of deaths of team.
     *
     * @readonly
     * @memberof GameTeamStatistics
     */
    public get deaths() {
        return this.players.reduce((acc, player) =>  acc + player.deaths, 0);
    }
}