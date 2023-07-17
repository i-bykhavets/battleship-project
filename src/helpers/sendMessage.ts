import {WebSocketClient} from "../ws_server";
import {Command, ICommand} from "../types/command";

export const sendMessage = (wsClient: WebSocketClient, command: Command, data: any) => {
    const message: ICommand = {
        type: command,
        data: JSON.stringify(data),
        id: 0,
    }

    wsClient.send(JSON.stringify(message));
}
