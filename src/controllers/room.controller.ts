import {WebSocketClient} from "../ws_server";
import * as WebSocket from "ws";
import {Command, ICommand} from "../types/command";
import usersStorage from "../storage/users.storage";
import roomsStorage from "../storage/rooms.storage";
import {IAddShipsRequestData, IAddUserToRoomRequestData} from "../types/requestData";

export const createRoom = (wsClient: WebSocketClient) => {
    const user = usersStorage.getUser(wsClient.sessionId);
    roomsStorage.createRoom(user);

    // const command: ICommand = {
    //     type: Command.createGame,
    //     data: JSON.stringify(createRoomData),
    //     id: 0,
    // }
    // wsClient.send(JSON.stringify(command));
}

export const updateRooms = (wssClients: Set<WebSocket>) => {
    const availableRooms = roomsStorage.getAvailableRooms();

    const roomsData = availableRooms.map((room) => ({
        roomId: room.index,
        roomUsers: room.roomUsers.map((user) => ({
            name: user.userName,
            index: user.index
        }))
    }))

    wssClients.forEach((wsClient) => {
        const command: ICommand = {
            type: Command.updateRoom,
            data: JSON.stringify(roomsData),
            id: 0,
        };

        wsClient.send(JSON.stringify(command));
    })
}

export const addUserToRoom = (
    data: IAddUserToRoomRequestData,
    wsClient: WebSocketClient
) => {
    const user = usersStorage.getUser(wsClient.sessionId);
    roomsStorage.addUserToRoom(data.indexRoom, user);

    const room = roomsStorage.getUserRoom(user.index);
    const roomUsers = room.roomUsers;

    if (roomUsers.length == 2) {
        roomUsers.map((user) => {
            const createGameData = {
                idGame: room.index,
                idPlayer: user.index,
            };

            const command: ICommand = {
                type: Command.createGame,
                data: JSON.stringify(createGameData),
                id: 0,
            };

            user.wsClient.send(JSON.stringify(command));
        })
    }
}

export const addShips = (data: IAddShipsRequestData) => {
    const {gameId, indexPlayer, ships} = data;

    roomsStorage.addShips(gameId, indexPlayer, ships);

    if (roomsStorage.isRoomReady(gameId)) {
        const roomUsers = roomsStorage.getRoomUsers(gameId);

        roomsStorage.setCurrentTurn(gameId, data.indexPlayer);

        roomUsers.map((user) => {
            const startGameData = {
                ships: user.ships,
                currentPlayerIndex: user.index,
            };

            const commandStart: ICommand = {
                type: Command.startGame,
                data: JSON.stringify(startGameData),
                id: 0,
            };

            const turnData = {
                currentPlayer: indexPlayer,
            }

            const commandTurn: ICommand = {
                type: Command.turn,
                data: JSON.stringify(turnData),
                id: 0,
            };

            user.wsClient.send(JSON.stringify(commandStart));
            user.wsClient.send(JSON.stringify(commandTurn));
        })
    }
}
