import {IUser} from "./user";

export interface IRoom {
    roomUsers: IUser[];
    index: number;
    currentTurn?: number;
}
