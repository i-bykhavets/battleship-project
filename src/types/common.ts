import { ICommand } from "./command";

export interface IMessageBase {
    type: ICommand;
    id: number;
}
