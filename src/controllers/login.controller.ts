import {ILoginRequestData} from "../types/requestData";
import {WebSocketClient} from "../ws_server";
import {ILoginResponseData} from "../types/responseData";
import {Command, ICommand} from "../types/command";
import usersStorage from "../storage/users.storage";

import {sendMessage} from "../helpers/sendMessage";

export const login = (data: ILoginRequestData, wsClient: WebSocketClient) => {
    const loginData: ILoginResponseData = {
        name: data.name,
        index: 0,
        error: false,
        errorText: ''
    };

    const user = usersStorage.createUser(data.name, wsClient);
    loginData.index = user.index;

    sendMessage(wsClient, Command.login, loginData);
}
