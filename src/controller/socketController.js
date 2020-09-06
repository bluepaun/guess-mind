import events from "../event";

export const socketController = (socket) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        broadcast(events.newUser, { nickname });
    });
    socket.on(events.disconnect, () => {
        broadcast(events.disconnected, { nickname: socket.nickname });
    });
    socket.on(events.sendMsg, ({ message }) => {
        broadcast(events.newMsg, { nickname: socket.nickname, message });
    });
    socket.on(events.sendBeginPath, ({ x, y }) => {
        broadcast(events.receiveBeginPath, { x, y });
    });
    socket.on(events.sendStrokePath, ({ x, y, color }) => {
        broadcast(events.receiveStrokePath, { x, y, color });
    });
    socket.on(events.sendFill, ({ color }) => {
        broadcast(events.receiveFill, { color });
    });
};
