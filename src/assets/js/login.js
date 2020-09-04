import { initSockets, socket, events } from "./sockets";

const body = document.querySelector("body");
const loginForm = document.querySelector("#jsLogin");

const LS_KEY_NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const nickname = localStorage.getItem(LS_KEY_NICKNAME);

const logIn = (nickname) => {
    body.className = LOGGED_IN;
    initSockets();
    socket.emit(events.setNickname, { nickname });
};

if (nickname === null) {
    body.className = LOGGED_OUT;
} else {
    logIn(nickname);
}

if (loginForm) {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const input = loginForm.querySelector("input");
        const { value: nickname } = input;
        input.value = "";
        localStorage.setItem(LS_KEY_NICKNAME, nickname);
        logIn(nickname);
    };
    loginForm.addEventListener("submit", handleFormSubmit);
}
