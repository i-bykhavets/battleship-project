import { IUser } from "../models/user";
import usersStorage from "../storage/users.storage";
export interface IAuthResult {
    isAuthenticated: boolean;
    errorMessage?: string;
}

// export const authenticate = (userName: string, password: string): IAuthResult => {
//     const user = usersStorage.getUser()
// }


