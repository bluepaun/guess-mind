import {
    disableCanvas,
    hideCanvasControls,
    enableCanvas,
    showCanvasControls,
    resetCanvas,
} from "./paint";
import { disableChat, enableChat } from "./chat";

const playerBoard = document.querySelector("#jsPlayerBoard");
const answer = document.querySelector("#jsAnswer");
const timer = document.querySelector("#jsTimer");

const showPlayer = (playerList) => {
    if (playerBoard == null) return;

    playerBoard.innerHTML = "";
    playerList.forEach((player) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${player.nickname}</span><span>: ${player.points}</span>`;
        playerBoard.appendChild(li);
    });
};

export const handlePlayerUpdate = ({ sockets }) => {
    showPlayer(sockets);
};

export const handleGameStarted = () => {
    disableCanvas();
    hideCanvasControls();
    answer.innerHTML = "";
};

export const handlePainterNotif = ({ word }) => {
    enableCanvas();
    showCanvasControls();
    answer.innerHTML = `paint : ${word}`;
    disableChat();
};

export const handleGameEnded = () => {
    answer.innerHTML = "Game ended.";
    disableCanvas();
    hideCanvasControls();
    resetCanvas();
    enableChat();
};

export const handleGameStarting = () => {
    answer.innerHTML = "Game will start soon!";
};

export const handleTimer = ({ leftTime }) => {
    timer.innerHTML = `${leftTime}`;
};
