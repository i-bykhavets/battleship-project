export interface ILoginResponseData {
    name: string;
    index: number;
    error: boolean;
    errorText: string;
}

interface IRoomUserData {
    name: string,
    index: number,
}

export interface IRoomResponseData {
    roomId: number,
    roomUsers: IRoomUserData[],
}
