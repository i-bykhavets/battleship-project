import { WebSocketServer } from 'ws';
import * as WebSocket from "ws";
import { IncomingMessage } from "http";
import { parseMessage } from "../helpers/parseMessage";
import { Command, ICommand } from "../types/command";
import { login} from "../controllers/login.controller";
import {addShips, addUserToRoom, createRoom, updateRooms} from "../controllers/room.controller";
import { updateWinners } from "../controllers/winner.controller";

export type WebSocketClient = WebSocket & { sessionId: string};

export const WS_PORT = 3000;

const wss = new WebSocketServer({ port: WS_PORT, clientTracking: true });

wss.on('connection', (currentClient: WebSocketClient, request: IncomingMessage) => {
    currentClient.sessionId = request.headers["sec-websocket-key"];
    console.log(`New client connected, sessionId is ${currentClient.sessionId}`);

    currentClient.on('close', (code: number) => {
        console.log(`Client disconnected with code=${code}, sessionId was ${currentClient.sessionId}`);
        // Close connection
    })

    currentClient.on('message', (data: string) => {
        console.log(`Received data=${data} from sessionId: ${currentClient.sessionId}`);
        const command = parseMessage(data.toString());

        switch (command.type) {
            case Command.login:
                login(command.data, currentClient);
                break;

            case Command.createRoom:
                createRoom(currentClient);
                break;

            case Command.addUserToRoom:
                addUserToRoom(command.data, currentClient);
                break;

            case Command.addShips:
                addShips(command.data)
                break;

            case Command.attack:
                // Room controller
                break;

            case Command.randomAttack:
                // Room controller
                break;

            default:
                break;
        }

        updateRooms(wss.clients as Set<WebSocket>);
        updateWinners(wss.clients as Set<WebSocket>);
    })
})
