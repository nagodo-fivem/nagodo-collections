export interface ICard {
    identifier: number;
    name: string;
    health: number;
    info: string;
    attack: string;
    damage: number;
    cardNum: number;
    rarity: number;
    
    frameIdentifier: number;
    elementIdentifier: number;
    imageOverlayIdentifier: number;
    cardImage: string;
    isCustomCard: boolean;
}