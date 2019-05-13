import { v1 as uuid } from "uuid";
import { GameTeam } from "./game-team";
import { IGameStatitics } from "./statitics";
import { Player } from "./player";

/**
 * Game model.
 *
 * @export
 * @class Game
 */
export class Game {
    public id: string;
    public initTime: Date;

    // Teams
    private teamOne: GameTeam;
    private teamTwo: GameTeam;

    constructor() {
        this.id = uuid();
        this.teamOne = new GameTeam();
        this.teamTwo = new GameTeam();
    }

    /**
     * Add player into team.
     *
     * @param {Player} player Player to be added.
     * @memberof Game
     */
    public addPlayer(player: Player) {
        const oneLength = this.teamOne.players.length;
        const twoLength = this.teamOne.players.length;

        if (oneLength > twoLength) {
            this.teamTwo.players.push(player);
        } else {
            this.teamOne.players.push(player);
        }
    }

    /**
     * Get player by name.
     *
     * @param {string} player Player name.
     * @returns
     * @memberof Game
     */
    public getPlayer(player: string) {
        return this.teamOne.players.find(x => x.name === player) || this.teamTwo.players.find(x => x.name === player);
    }

    /**
     * Return game statitics.
     *
     * @readonly
     * @type {IGameStatitics}
     * @memberof Game
     */
    public get statitics(): IGameStatitics {
        return {
            one: {
                kills: this.teamOne.kills,
                deaths: this.teamOne.deaths,
                players: this.teamOne.players.map(({ name, kills, deaths }) => ({ name, kills, deaths }))
            },
            two: {
                kills: this.teamTwo.kills,
                deaths: this.teamTwo.deaths,
                players: this.teamTwo.players.map(({ name, kills, deaths }) => ({ name, kills, deaths }))
            }
        };
    }

    /**
     * Return player informations.
     *
     * @readonly
     * @memberof Game
     */
    public get playersInformations() {
        return {
            one: this.teamOne.players.map(
                ({ name, hero, attribute, position }) =>  ({ name, hero, attribute, position })
            ),
            two: this.teamTwo.players.map(
                ({ name, hero, attribute, position }) =>  ({ name, hero, attribute, position })
            )
        };
    }

    /**
     * Rejturn count of players in game.
     *
     * @readonly
     * @memberof Game
     */
    public get playersCount() {
        return this.teamOne.players.length + this.teamTwo.players.length;
    }
}