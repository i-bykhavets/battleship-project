export interface IShipCell {
    x: number;
    y: number;
    isDamaged: boolean;
}

export interface IShip {
    parts: IShipCell[];
}
