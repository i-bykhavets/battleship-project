import {WebSocketClient} from "../ws_server";
import usersStorage from "../storage/users.storage";
import roomsStorage from "../storage/rooms.storage";
import {IRoom} from "../models/room";
import {IShipData} from "../types/requestData";

export const createRoom = (wsClient: WebSocketClient) => {
    const user = usersStorage.getUser(wsClient.sessionId);
    roomsStorage.createRoom(user);
}

export const getAvailableRooms = (): IRoom[] => {
    return roomsStorage.getAvailableRooms();
}

export const addUserToRoom = (wsClient: WebSocketClient, indexRoom: number) => {
    const user = usersStorage.getUser(wsClient.sessionId);
    !roomsStorage.getUserRoom(user.index)
        && roomsStorage.addUserToRoom(indexRoom, user);

    const room = roomsStorage.getUserRoom(user.index);
    const roomUsers = room.roomUsers;

    return { room, roomUsers };
}

export const addShips = (gameId: number, indexPlayer: number, ships: IShipData[]) => {
    roomsStorage.addShips(gameId, indexPlayer, ships);

    if (roomsStorage.isRoomReady(gameId)) {
        const roomUsers = roomsStorage.getRoomUsers(gameId);

        roomsStorage.setCurrentTurn(gameId, indexPlayer);

        return {
            roomUsers,
            isRoomReady: true,
        };
    }

    return {
        roomUsers: [],
        isRoomReady: false,
    };
}
