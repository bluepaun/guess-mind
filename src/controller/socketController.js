import events from "../event";
import { chooseWord } from "../words";

let sockets = [];
let server = null;
let inProgress = false;
let painter = null;
let word = null;
let timeout = null;
let leftTime = 0;
let leftTimer = null;
const MIN_PLAYER_NUM = 2;

export const ioController = (io) => {
    server = io;
};

const superBoardcast = (event, data) => {
    server.emit(event, data);
};

const sendPlayerUpdate = () => {
    superBoardcast(events.playerUpdate, { sockets });
};

const choosePainer = () => {
    return sockets[Math.floor(Math.random() * sockets.length)];
};
const startGame = () => {
    if (inProgress === true || sockets.length < MIN_PLAYER_NUM) {
        return;
    }
    inProgress = true;
    painter = choosePainer();
    word = chooseWord();
    superBoardcast(events.starting);
    new Promise((resolve, reject) => {
        setTimeout(() => {
            superBoardcast(events.gameStarted);
            resolve();
        }, 3000);
    })
        .then(() => {
            server.to(painter.id).emit(events.painterNotif, { word });
        })
        .then(() => {
            leftTime = 30;
            superBoardcast(events.timer, { leftTime });
            leftTimer = setInterval(() => {
                leftTime -= 1;
                superBoardcast(events.timer, { leftTime });
            }, 1000);
            timeout = setTimeout(() => {
                endGame();
            }, 30000);
        });
};

const endGame = () => {
    inProgress = false;
    superBoardcast(events.gameEnded);
    if (timeout !== null) {
        clearTimeout(timeout);
    }
    leftTime = 0;
    superBoardcast(events.timer, { leftTime });
    if (leftTimer !== null) {
        clearInterval(leftTimer);
    }
    startGame();
};

const addPoints = (id) => {
    sockets = sockets.map((socketElement) => {
        if (socketElement.id === id) {
            socketElement.points += 10;
        } else if (socketElement.id === painter.id) {
            socketElement.points += 5;
        }
        return socketElement;
    });
    sendPlayerUpdate();
};

export const socketController = (socket) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);

    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;

        sockets.push({ id: socket.id, points: 0, nickname: nickname });
        sendPlayerUpdate();
        broadcast(events.newUser, { nickname });
        startGame();
    });
    socket.on(events.disconnect, () => {
        sockets = sockets.filter((socketElement) => {
            return socketElement.id !== socket.id;
        });
        sendPlayerUpdate();
        if (sockets.length < MIN_PLAYER_NUM) {
            endGame();
        } else if (painter && painter.id === socket.id) {
            endGame();
        }
        broadcast(events.disconnected, { nickname: socket.nickname });
    });
    socket.on(events.sendMsg, ({ message }) => {
        broadcast(events.newMsg, { nickname: socket.nickname, message });
        if (message === word) {
            superBoardcast(events.newMsg, {
                message: `Winner is ${socket.nickname}. answer was ${word}`,
                nickname: "system",
            });
            addPoints(socket.id);
            endGame();
        }
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
