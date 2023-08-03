
export interface IUserJWT {
    username: string;
    email: string;
    roles: [string];
    id: string;
}
export interface IUserInfo {
    UserInfo: IUserJWT;
}