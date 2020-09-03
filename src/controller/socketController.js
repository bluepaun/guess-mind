import events from "../event";

export const socketController = (socket) => {
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        console.log(nickname);
    });
};
