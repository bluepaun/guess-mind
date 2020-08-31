import express from "express";
import path from "path";
import socketIO from "socket.io";

const PORT = 4000;
const app = express();

const handleListening = () =>
    console.log(`✅ Server running: http://localhost:${PORT}`);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
    res.render("home");
});

const server = app.listen(PORT, handleListening);

const io = socketIO(server);
