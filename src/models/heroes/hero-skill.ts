import { PlayerAttribute } from "../game/player";

/**
 * Hero skill model.
 *
 * @export
 * @abstract
 * @class HeroSkill
 */
export abstract class HeroSkill {
    public name: string;
    public effects: HeroSkillEffect;
}

/**
 * Hero skill effect type.
 *
 * @export
 * @enum {string}
 */
export enum HeroSkillEffectType {
    Increase = "INCREASE",
    Decrease = "DECREASE"
}

/**
 * Hero skill effect target.
 *
 * @export
 * @enum {string}
 */
export enum HeroSkillEffectTarget {
    Yourself = "YOURSELF",
    Team = "TEAM",
    TeamMember = "TEAM-MEMBER",
    EnemyTeam = "ENEMY-TEAM",
    EnemyTeamMember = "ENEMY-TEAM-MEMBER",
    Enemy = "ENEMY",
    Monster = "MONSTER"
}

export type HeroSkillEffect = {
    [P in keyof PlayerAttribute]?: {
        type: HeroSkillEffectType,
        target: HeroSkillEffectTarget,
        value: PlayerAttribute[P]
    };
}