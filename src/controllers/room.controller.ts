import * as WebSocket from "ws";

import {WebSocketClient} from "../ws_server";
import {Command} from "../types/command";
import {IAddShipsRequestData, IAddUserToRoomRequestData} from "../types/requestData";
import * as roomService from '../services/room.service';

import {sendMessage} from "../helpers/sendMessage";
import {IRoomResponseData} from "../types/responseData";

export const createRoom = (wsClient: WebSocketClient) => {
    roomService.createRoom(wsClient);
}

export const updateRooms = (wssClients: Set<WebSocket>) => {
    const availableRooms = roomService.getAvailableRooms();

    const roomsData: IRoomResponseData[] = availableRooms.map((room) => ({
        roomId: room.index,
        roomUsers: room.roomUsers.map((user) => ({
            name: user.userName,
            index: user.index
        }))
    }))

    wssClients.forEach((wsClient: WebSocketClient) => {
        sendMessage(wsClient, Command.updateRoom, roomsData)
    })
}

export const addUserToRoom = (
    data: IAddUserToRoomRequestData,
    wsClient: WebSocketClient
) => {
    const { room, roomUsers } = roomService.addUserToRoom(wsClient, data.indexRoom);

    if (roomUsers.length == 2) {
        roomUsers.map((user) => {
            const createGameData = {
                idGame: room.index,
                idPlayer: user.index,
            };

            sendMessage(user.wsClient, Command.createGame, createGameData);
        })
    }
}

export const addShips = (data: IAddShipsRequestData) => {
    const {gameId, indexPlayer, ships} = data;

    const { isRoomReady, roomUsers } = roomService.addShips(gameId, indexPlayer, ships);

    if (isRoomReady) {
        roomUsers.map((user) => {
            const startGameData = {
                ships: user.ships,
                currentPlayerIndex: user.index,
            };

            const turnData = {
                currentPlayer: indexPlayer,
            }

            sendMessage(user.wsClient, Command.startGame, startGameData);
            sendMessage(user.wsClient, Command.turn, turnData);
        })
    }
}
