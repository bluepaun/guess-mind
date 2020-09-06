import { socket, events } from "./sockets";

const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const btns = document.querySelector(".canvasContainer");
const paintingSize = document.querySelector("#jsBrushSize");
const controlContainer = document.querySelector("#jsControlContainer");

let isPainting = false;
let isFilling = false;

const sendBeginPath = (x, y) => {
    socket.emit(events.sendBeginPath, { x, y });
};

const sendStrokePath = (x, y) => {
    socket.emit(events.sendStrokePath, { x, y, color: ctx.strokeStyle });
};

export const beginPath = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
};

export const strokePath = (x, y, color = null) => {
    const currentColor = ctx.strokeStyle;
    if (color !== null) {
        ctx.strokeStyle = color;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = currentColor;
};

const clearCanvas = () => {
    const previousStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    fillCanvas();
    sendFill();
    ctx.fillStyle = previousStyle;
};

const onMouseMove = (event) => {
    if (isFilling === true) {
        return;
    }
    const { offsetX: x, offsetY: y } = event;
    if (isPainting == false) {
        beginPath(x, y);
        sendBeginPath(x, y);
    } else {
        strokePath(x, y);
        sendStrokePath(x, y);
    }
};

const startPainting = () => {
    isPainting = true;
};

const stopPainting = () => {
    isPainting = false;
};

const onChangePaintingSize = (event) => {
    ctx.lineWidth = event.target.value;
};

export const fillCanvas = (color = null) => {
    const currentColor = ctx.fillStyle;
    if (color !== null) {
        ctx.fillStyle = color;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = currentColor;
};

const sendFill = () => {
    if (socket) socket.emit(events.sendFill, { color: ctx.fillStyle });
};

const onCanvasClick = (event) => {
    if (isFilling === false) {
        return;
    }
    fillCanvas();
    sendFill();
};

const handleControl = (control, btn) => {
    switch (control) {
        case "fill":
            isFilling = true;
            btn.innerHTML = "PAINT";
            btn.dataset.value = "paint";
            break;
        case "paint":
            isFilling = false;
            btn.innerHTML = "FILL";
            btn.dataset.value = "fill";
            break;
        case "clear":
            clearCanvas();
            break;
        default:
            Error("unknowen control");
            break;
    }
};

const setColor = (value) => {
    ctx.strokeStyle = value;
    ctx.fillStyle = ctx.strokeStyle;
};

const onBtnClick = (event) => {
    const { key, value } = event.target.dataset;

    if (key == null || value == null) return;

    if (key === "control") {
        handleControl(value, event.target);
    } else if (key === "color") {
        setColor(value);
    }
};

const onTouchStart = (event) => {
    event.preventDefault();
    if (isFilling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }
    const rect = event.target.getBoundingClientRect();
    const x = event.targetTouches[0].pageX - rect.left;
    const y = event.targetTouches[0].pageY - rect.top;
    beginPath(x, y);
    sendBeginPath(x, y);
};

const onTouchMove = (event) => {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    const x = event.targetTouches[0].pageX - rect.left;
    const y = event.targetTouches[0].pageY - rect.top;
    strokePath(x, y);
    sendStrokePath(x, y);
};

export const enableCanvas = () => {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchend", stopPainting);
    canvas.addEventListener("touchcancel", stopPainting);
};

export const disableCanvas = () => {
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mousedown", startPainting);
    canvas.removeEventListener("mouseup", stopPainting);
    canvas.removeEventListener("mouseleave", stopPainting);
    canvas.removeEventListener("click", onCanvasClick);
    canvas.removeEventListener("touchmove", onTouchMove);
    canvas.removeEventListener("touchstart", onTouchStart);
    canvas.removeEventListener("touchend", stopPainting);
    canvas.removeEventListener("touchcancel", stopPainting);
};

export const hideCanvasControls = () => {
    controlContainer.style.display = "none";
};

export const showCanvasControls = () => {
    controlContainer.style.display = "block";
};

export const resetCanvas = () => {
    clearCanvas();
};

const init = () => {
    hideCanvasControls();
    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    canvas.width = 300;
    canvas.height = 300;
    setColor("#000000");
    ctx.lineWidth = 2.5;
    clearCanvas();

    paintingSize.addEventListener("input", onChangePaintingSize);

    btns.addEventListener("click", onBtnClick);
};

if (canvas) {
    init();
}
