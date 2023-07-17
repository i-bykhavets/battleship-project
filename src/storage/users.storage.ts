import { IUser } from "../models/user";
import { WebSocketClient } from "../ws_server";

class UsersStorage {
    users: IUser[] = [];

    createUser = (userName: string, wsClient: WebSocketClient): IUser => {
        const newUser = {
          userName,
          wsClient,
          index: this.users.length
        };
        this.users.push(newUser);

        return newUser;
    };

    getUser = (sessionId: string): IUser | undefined => {
        return this.users.find((user) =>
            user.wsClient.sessionId === sessionId
        );
    };
}

export default new UsersStorage();
