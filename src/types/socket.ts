import { Socket } from "socket.io";

export interface IUserSocket extends Socket {
    name: string;
    currGame: string;
}