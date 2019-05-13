import { HeroSkill } from "./hero-skill";

/**
 * Hero model.
 *
 * @export
 * @abstract
 * @class Hero
 */
export abstract class Hero {
    public abstract name: string;
    public life: number;
    public damage: number;
    public criticalRate: number;
    public defense: number;
    public defenseRate: number;
    public skills: {
        [key: string]: HeroSkill;
    };
}