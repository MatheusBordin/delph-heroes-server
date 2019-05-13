import { Player } from "./player";

/**
 * Game team model.
 *
 * @export
 * @class GameTeam
 */
export class GameTeam {
    public players: Player[] = [];

    /**
     * Return total of kills of team.
     *
     * @readonly
     * @memberof GameTeam
     */
    public get kills() {
        return this.players.reduce((acc, player) =>  acc + player.kills, 0);
    }

    /**
     * Return total of deaths of team.
     *
     * @readonly
     * @memberof GameTeam
     */
    public get deaths() {
        return this.players.reduce((acc, player) =>  acc + player.deaths, 0);
    }
}