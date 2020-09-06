import { socket, events } from "./sockets";

const messages = document.querySelector("#jsMessages");
const sendMsg = document.querySelector("#jsSendMessage");

const appendMsg = (text, nickname) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="author ${nickname ? "other" : "self"}">${
        nickname ? nickname : "You"
    }</span> <span> : ${text}</span>
    `;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
};

const handleSendMsg = (event) => {
    event.preventDefault();
    const input = sendMsg.querySelector("input");
    const { value } = input;
    input.value = "";
    appendMsg(value);
    socket.emit(events.sendMsg, {
        message: value,
    });
};

export const handleNewMsg = ({ nickname, message }) => {
    appendMsg(message, nickname);
};

if (sendMsg) {
    sendMsg.addEventListener("submit", handleSendMsg);
}

export const disableChat = () => {
    sendMsg.style.display = "none";
};

export const enableChat = () => {
    sendMsg.style.display = "block";
};
