import { handleNewUser, handleDisconnectedUser } from "./notifications";

export let socket = null;
export const events = window.events;

export const initSockets = () => {
    socket = io("/");
    socket.on(events.newUser, handleNewUser);
    socket.on(events.disconnected, handleDisconnectedUser);
};
