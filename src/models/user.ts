import { WebSocketClient } from "../ws_server";
import { IShip } from "./ship";
import {IShipData} from "../types/requestData";

export interface IUser {
    index: number;
    userName: string;
    wsClient: WebSocketClient;
    sourceShips?: IShipData[];
    ships?: IShip[];
}
