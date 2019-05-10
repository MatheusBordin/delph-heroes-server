import { HeroSkill } from "./hero-skill";

/**
 * Hero model.
 *
 * @export
 * @abstract
 * @class Hero
 */
export abstract class Hero {
    public life: number;
    public damage: number;
    public criticalAttackRate: number;
    public defenseRate: number;
    public skills: HeroSkill[];
}

