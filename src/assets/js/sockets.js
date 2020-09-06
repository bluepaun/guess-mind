import { handleNewUser, handleDisconnectedUser } from "./notifications";
import { handleNewMsg } from "./chat";
import { beginPath, strokePath, fillCanvas } from "./paint";
import {
    handlePlayerUpdate,
    handleGameStarted,
    handlePainterNotif,
    handleGameEnded,
    handleGameStarting,
    handleTimer,
} from "./player";

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
    socket.on(events.playerUpdate, handlePlayerUpdate);
    socket.on(events.gameStarted, handleGameStarted);
    socket.on(events.painterNotif, handlePainterNotif);
    socket.on(events.gameEnded, handleGameEnded);
    socket.on(events.starting, handleGameStarting);
    socket.on(events.timer, handleTimer);
};
