
/**
 * Player model.
 *
 * @export
 * @class Player
 */
export class Player {
    public name: string;
    public attribute: PlayerAttribute;
    public lastUsages: IPlayerLastUse = {};
    public kills = 0;
    public deaths = 0;

    constructor(name: string, hero: any) {
        this.name = name;
        this.attribute = new PlayerAttribute(hero);
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
    public damage: number;
    public position = new PlayerPosition(); 

    constructor(hero: any) {

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