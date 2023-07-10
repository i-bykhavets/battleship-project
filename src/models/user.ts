import { WebSocketClient } from "../ws_server";
import { IShip } from "./ship";

export interface IUser {
    index: number;
    userName: string;
    wsClient: WebSocketClient;
    sourceShips?: IShip[];
    ships?: IShip[];
}
