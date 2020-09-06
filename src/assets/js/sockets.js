import { handleNewUser, handleDisconnectedUser } from "./notifications";
import { handleNewMsg } from "./chat";

export let socket = null;
export const events = window.events;

export const initSockets = () => {
    socket = io("/");
    socket.on(events.newUser, handleNewUser);
    socket.on(events.disconnected, handleDisconnectedUser);
    socket.on(events.newMsg, handleNewMsg);
};
