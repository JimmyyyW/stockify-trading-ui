import { Role } from './role.model';

export interface User {
    _id: any
    name: string,
    username: string,
    password: string,
    email: string,
    balance: number,
    enabled: boolean,
    timeStamp: Date
    roles: Role[]
}