import { HeroSkill } from "../hero/hero-skill";
import { Hero } from "../hero/hero";

/**
 * Player model.
 *
 * @export
 * @class Player
 */
export class Player {
    // Generic
    public name: string;
    public hero: string;

    // Game informations
    public attribute: PlayerAttribute;
    public skills: {
        [key: string]: HeroSkill;
    };
    public position = new PlayerPosition(); 

    // Hack Control
    public lastUsages: IPlayerLastUse = {};

    // Statitics
    public kills = 0;
    public deaths = 0;
    
    /**
     *Creates an instance of Player.
     * @param {string} name The name of player.
     * @param {*} hero The hero chosed for they.
     * @memberof Player
     */
    constructor(name: string, hero: Hero) {
        this.name = name;
        this.hero = hero.name;
        this.attribute = new PlayerAttribute(hero);
        this.skills = hero.skills;
    }

    /**
     * Calculate attack damage.
     *
     * @param {string} [skill] Skill used in attack.
     * @returns
     * @memberof Player
     */
    public calculateAttack(skill?: string) {
        let damage = this.attribute.damage;
        const randomRate = Math.ceil(Math.random() * 100);
        const isCritical = randomRate <= this.attribute.criticalRate;

        // If is critical, increment damage.
        if (isCritical) {
            damage *= 1.5;
        }

        if (skill) {
            const skillDamage = this.skills[skill].effects.damage.value;
            damage += skillDamage;
        } 

        return damage;
    }

    /**
     * Calculate defense value.
     *
     * @returns
     * @memberof Player
     */
    public calculateDefense() {
        let defense = this.attribute.defense;
        const randomRate = Math.ceil(Math.random() * 100);
        const defenseSuccess = randomRate <= this.attribute.defenseRate;

        // If defense success, return. Else, decrement defense value.
        if (defenseSuccess) {
            return defense;
        } else {
            return defense * (randomRate / 100);
        }
    }

    /**
     * Receive attack.
     *
     * @param {number} damage Damage received.
     * @returns
     * @memberof Player
     */
    public receiveAttack(damage: number) {
        const defense = this.calculateDefense();
        const realDamage = Math.max(damage - defense, 0);

        this.attribute.life -= realDamage;

        if (this.attribute.life > 0) {
            return realDamage;
        }

        this.attribute.life = 0;
        return realDamage;
    }

    /**
     * Update last usage of skill.
     *
     * @param {string} skill Skill name.
     * @memberof Player
     */
    public updateLastUsage(skill: string) {
        this.lastUsages[skill] = new Date().getTime();
    }

    /**
     * Validate skill usage.
     *
     * @param {string} skill Skill name.
     * @returns
     * @memberof Player
     */
    public validateSkillUsage(skill: string) {
        const skillTime = this.lastUsages[skill];
        const delay = this.skills[skill].delay;
        const now = new Date().getTime();

        return skillTime + delay < now;
    }
 }

/**
 * Player Attribute model.
 *
 * @export
 * @class PlayerAttribute
 */
export class PlayerAttribute {
    public life: number;
    public readonly originalLife: number;
    public damage: number;
    public criticalRate: number;
    public defense: number;
    public defenseRate: number;

    constructor(hero: Hero) {
        this.life = hero.life;
        this.originalLife = hero.life;
        this.damage = hero.damage;
        this.criticalRate = hero.criticalRate;
        this.defense = hero.defense;
        this.defenseRate = hero.defenseRate;
    }
}

/**
 * Player position model.
 *
 * @export
 * @class PlayerPosition
 */
export class PlayerPosition {
    public x = 0;
    public y = 0;
}

/**
 * Player last use structure type.
 *
 * @export
 * @interface IPlayerLastUse
 */
export interface IPlayerLastUse {
    [key: string]: number;
}