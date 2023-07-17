import * as WebSocket from "ws";
import winnersStorage from "../storage/winners.storage";
import {Command, ICommand} from "../types/command";


export const updateWinners = (wssClients: Set<WebSocket>) => {
    const winners = winnersStorage.getWinners();

    wssClients.forEach((wsClient) => {
        const command: ICommand = {
            type: Command.updateWinners,
            data: JSON.stringify(winners),
            id: 0,
        };

        wsClient.send(JSON.stringify(command));
    })
}
