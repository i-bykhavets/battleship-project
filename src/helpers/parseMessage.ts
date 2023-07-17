import { Command, ICommand } from "../types/command";
import {
    ILoginRequestData,
    IAddUserToRoomRequestData,
    IAddShipsRequestData,
    IGameAttackRequestData,
    IRandomAttackRequestData
} from "../types/requestData";

export const parseMessage = (message: string) => {
    const command: ICommand = JSON.parse(message);
    let data = null;

    if (!command.data) {
        return command;
    }

    switch (command.type) {
        case Command.login:
            data = JSON.parse(command.data) as ILoginRequestData;
            break;

        case Command.createRoom:
            data = command.data;
            break;

        case Command.addUserToRoom:
            data = JSON.parse(command.data) as IAddUserToRoomRequestData;
            break;

        case Command.addShips:
            data = JSON.parse(command.data) as IAddShipsRequestData;
            break;

        case Command.attack:
            data = JSON.parse(command.data) as IGameAttackRequestData;
            break;

        case Command.randomAttack:
            data = JSON.parse(command.data) as IRandomAttackRequestData;
            break;

        default:
            break;
    }

    return {
        ...command,
        data
    }
}
