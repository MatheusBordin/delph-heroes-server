import { Game } from "../models/game/game";
import emitter from "./event";
import { GameEvent, LobbyEvent, PlayerEvent } from "../types/event-type";
import { Player } from "../models/game/player";
import { Hero } from "../models/hero/hero";
import { logger } from "../helpers/logger";

// Heroes
import { BerryHero } from "../models/hero/heroes/berry";
import { CyrusHero } from "../models/hero/heroes/cyrus";
import { KorvaHero } from "../models/hero/heroes/korva";
import { LezoHero } from "../models/hero/heroes/lezo";
import { RoannHero } from "../models/hero/heroes/roann";
import { StokvHero } from "../models/hero/heroes/stokv";

/**
 * Game storage.
 *
 * @export
 * @interface IGameStorage
 */
export default interface IGameStorage {
    [key: string]: Game;
}

export class GameService {

    /**
     * Start new game service.
     *
     * @static
     * @returns
     * @memberof GameService
     */
    public static start() {
        const gameService = new GameService();
        gameService.listenEvents();

        return gameService;
    }

    // Storage
    private runningGames: IGameStorage = {};
    private waitingGames: Game[] = [];

    // Config vars.
    private respawnTime = 5000; // 5 Sec.
    private gameTime = 120000; //600000; // 10 Min.
    private playerByTeam = 1;
    private heroes: Hero[] = [
        new BerryHero(),
        new CyrusHero(),
        new KorvaHero(),
        new LezoHero(),
        new RoannHero(),
        new StokvHero()
    ];

    public listenEvents() {
        // listen events.
        emitter.on(LobbyEvent.Entered, this.findGame.bind(this));
        emitter.on(PlayerEvent.Attack, this.onPlayerAttack.bind(this));
    }

    /**
     * Find game for player.
     *
     * @memberof GameService
     */
    public findGame(playerName: string) {
        const game = this.getOrCreateGame();
        const player =  new Player(playerName, this.foundRandomHero());
        game.addPlayer(player);

        // Dispatch messages.
        emitter.sent(LobbyEvent.Found, game.id, playerName);

        logger.info(`Player '${playerName}' entered in game '${game.id}'`);

        if (game.playersCount === this.playerByTeam * 2) {
            this.waitingGames.shift();
            this.runningGames[game.id] = game;

            // Dispatch messages.
            emitter.sent(GameEvent.Started, game.id, game.statitics, game.playersInformations);

            logger.info(`The game '${game.id}' started.`);

            setTimeout(() => {
                delete this.runningGames[game.id];
                emitter.sent(GameEvent.Finished, game.id, game.statitics, game.playersInformations);
                logger.info(`The game '${game.id}' finished.`);
            }, this.gameTime)
        }
    }

    /**
     * Called on player receive attack.
     *
     * @param {string} gameId The game id.
     * @param {string} origin Player origin name.
     * @param {string} target Player target name.
     * @param {string} [skill] Skill used.
     * @memberof GameService
     */
    public onPlayerAttack(gameId: string, origin: string, target: string, skill?: string) {
        const game = this.runningGames[gameId];
        const originPlayer = game.getPlayer(origin);  
        const targetPlayer = game.getPlayer(target);  

        const damage = originPlayer.calculateAttack(skill);
        const realDamage = targetPlayer.receiveAttack(damage);
        
        if (targetPlayer.attribute.life === 0) { 
            originPlayer.kills++;
            targetPlayer.deaths++;

            emitter.sent(GameEvent.StatiticsUpdated, gameId, game.statitics);
            
            // Respawn player.
            setTimeout(() => {
                targetPlayer.attribute.life = targetPlayer.attribute.originalLife;

                // Dispatch messages.
                emitter.sent(GameEvent.PlayersUpdated, gameId, game.playersInformations);

                logger.info(`The player '${target}' respawned`);
            }, this.respawnTime);
        }
        
        // Dispatch messages.
        emitter.sent(GameEvent.PlayersUpdated, gameId, game.playersInformations);

        logger.info(`The player '${origin}' attack player '${target}'`, {
            damage,
            defense: damage - realDamage
        });
    }

    /**
     * Return next game in stack.
     *
     * @returns {Game}
     * @memberof GameService
     */
    private getOrCreateGame(): Game {
        let game = this.waitingGames[0];

        if (!game) {
            game = new Game();
            this.waitingGames.push(game);
        }

        return game;
    }

    /**
     * Random hero generate for player.
     *
     * @returns
     * @memberof GameService
     */
    private foundRandomHero() {
        const randomIndex = Math.ceil(Math.random() * this.heroes.length) - 1;

        return this.heroes[randomIndex];
    }
}