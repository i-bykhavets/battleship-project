export interface ILoginRequestData {
    name: string;
    password: string;
}

export interface IAddUserToRoomRequestData {
    indexRoom: number;
}

export type ShipType = "small" | "medium" | "large" | "huge";

export interface IShipData {
    position: {
        x: number;
        y: number;
    };
    direction: boolean;
    type: string;
    length: number;
}

export interface IAddShipsRequestData {
    gameId: number;
    indexPlayer: number;
    ships: IShipData[];
}

export interface IGameAttackRequestData {
    gameId: number;
    indexPlayer: number;
    x: number;
    y: number;
}

export interface IRandomAttackRequestData {
    gameId: number;
    indexPlayer: number;
}

