import { handleNewUser, handleDisconnectedUser } from "./notifications";
import { handleNewMsg } from "./chat";
import { beginPath, strokePath, fillCanvas } from "./paint";

export let socket = null;
export const events = window.events;

export const initSockets = () => {
    socket = io("/");
    socket.on(events.newUser, handleNewUser);
    socket.on(events.disconnected, handleDisconnectedUser);
    socket.on(events.newMsg, handleNewMsg);
    socket.on(events.receiveBeginPath, ({ x, y }) => {
        beginPath(x, y);
    });
    socket.on(events.receiveStrokePath, ({ x, y, color }) => {
        strokePath(x, y, color);
    });
    socket.on(events.receiveFill, ({ color }) => {
        fillCanvas(color);
    });
};
