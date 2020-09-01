import express from "express";
import path from "path";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 80;
const app = express();

const handleListening = () =>
    console.log(`✅ Server running: http://localhost:${PORT}`);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
    res.render("home");
});

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

let sockets = [];

io.on("connection", (socket) => {
    socket.on("newMessage", ({ message }) => {
        console.log(message);
        socket.broadcast.emit("messageNotif", {
            message,
            nickname: socket.nickname || "Anonymos",
        });
    });
    socket.on("setNickname", ({ nickname }) => {
        socket.nickname = nickname;
    });
});
