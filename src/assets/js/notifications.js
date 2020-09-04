import { events } from "./sockets";

const notificationContainer = document.querySelector("#jsNotification");

const NEW_USER_COLOR = "#2196f3";
const DISCONNECTED_COLOR = "#D50000";

const fireNotification = (text, event) => {
    const noti = document.createElement("div");
    noti.innerHTML = text;
    if (event === events.newUser) {
        noti.style.backgroundColor = NEW_USER_COLOR;
    } else {
        noti.style.backgroundColor = DISCONNECTED_COLOR;
    }
    notificationContainer.appendChild(noti);
};

export const handleNewUser = ({ nickname }) => {
    fireNotification(`${nickname} just joins!`, events.newUser);
};

export const handleDisconnectedUser = ({ nickname }) => {
    fireNotification(`${nickname} just left`, events.disconnected);
};
