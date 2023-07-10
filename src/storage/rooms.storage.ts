import { IRoom } from "../models/room";
import { IUser } from "../models/user";
import {IShipData} from "../types/requestData";
import {IShip, IShipCell} from "../models/ship";

class RoomsStorage {
    rooms: IRoom[] = [];

    getUserRoom = (userId: number): IRoom | undefined => {
        return this.rooms.find((room) =>
            room.roomUsers.some((user) => user.index === userId)
        );
    }

    setCurrentTurn = (indexRoom: number, currentTurn: number) => {
        const room = this.rooms.find((room) =>
            room.index === indexRoom
        );
        room.currentTurn = currentTurn;
    }

    getCurrentTurn = (indexRoom: number): number => {
        const room = this.rooms.find((room) =>
            room.index === indexRoom
        );
        return room.currentTurn;
    }

    createRoom = (user: IUser): IRoom => {
        const newRoom: IRoom = {
            roomUsers: [user],
            index: this.rooms.length,
        };
        this.rooms.push(newRoom);
        return newRoom;
    };

    addUserToRoom = (indexRoom: number, user: IUser) => {
        const room = this.rooms.find((room) =>
            room.index === indexRoom
        );
        room.roomUsers.length < 2
            && room.roomUsers.push(user);
    }

    getAvailableRooms = (): IRoom[] => {
        return this.rooms.filter((room) => room.roomUsers.length < 2);
    }

    addShips = (gameId: number, indexPlayer: number, ships: IShipData[]) => {
        const room = this.rooms.find((room) =>
            room.index === gameId);
        const user = room.roomUsers.find((user) =>
            user.index === indexPlayer);

        user.sourceShips = ships;
        user.ships = this.convertSourceShips(ships);
    }

    isRoomReady = (indexRoom: number): boolean => {
        const room = this.rooms.find((room) =>
            room.index === indexRoom
        );
        const isTwoUsers = room.roomUsers.length === 2;
        const isShips = room.roomUsers.every((user) =>
            user.ships?.length > 0);

        return isTwoUsers && isShips;
    }

    getWinners = (indexRoom: number): IUser => {
        const room = this.rooms.find((room) =>
            room.index === indexRoom
        );
        const looser = room.roomUsers.find((user) =>
            user.ships.every((ship) =>
                ship.parts.every((part) =>
                    part.isDamaged)));

        return looser
            ? room.roomUsers.find((user) => user.index !== looser.index)
            : null;
    }

    getAttackResult = () => {
        //
    }

    getRoomUsers = (indexRoom: number): IUser[] => {
        const room = this.rooms.find((room) =>
            room.index === indexRoom
        );

        return room.roomUsers;
    }

    completeGame = (indexRoom: number) => {
        this.rooms = this.rooms.filter((room) => room.index !== indexRoom);
    }

    private convertSourceShips = (sourceShips: IShipData[]): IShip[] => {
        const ships: IShip[] = [];

        sourceShips.map((sourceShip) => {
            const shipParts: IShipCell[] = [];

            let partX = sourceShip.position.x;
            let partY = sourceShip.position.y;

            for (let i = 0; i < sourceShip.length; i++) {
                const cell = { x: null, y: null, isDamaged: false };

                if (sourceShip.direction) {
                    cell.x = sourceShip.position.x;
                    cell.y = partY++;
                } else {
                    cell.x = partX++;
                    cell.y = sourceShip.position.y;
                }
                shipParts.push(cell);
            }
            ships.push({ parts: shipParts });
        })

        return ships;
    }
}

export default new RoomsStorage();
