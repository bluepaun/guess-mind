const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const btns = document.querySelector(".canvasContainer");
const paintingSize = document.querySelector("#jsBrushSize");

let isPainting = false;
let isFilling = false;

const clearCanvas = () => {
    const previousStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = previousStyle;
};

const onMouseMove = (event) => {
    if (isFilling === true) {
        return;
    }
    const { offsetX: x, offsetY: y } = event;
    console.log(x, y);
    if (isPainting == false) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
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

const onCanvasClick = (event) => {
    if (isFilling === false) {
        return;
    }

    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

const log = (text) => {
    const span = document.createElement("span");
    span.innerText = text;
    btns.appendChild(span);
};

const onTouchStart = (event) => {
    event.preventDefault();
    if (isFilling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }
    ctx.beginPath();
    const rect = event.target.getBoundingClientRect();
    const x = event.targetTouches[0].pageX - rect.left;
    const y = event.targetTouches[0].pageY - rect.top;
    ctx.moveTo(x, y);
};

const onTouchMove = (event) => {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    const x = event.targetTouches[0].pageX - rect.left;
    const y = event.targetTouches[0].pageY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
};

const init = () => {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchend", stopPainting);
    canvas.addEventListener("touchcancel", stopPainting);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    setColor("black");
    ctx.lineWidth = 2.5;
    clearCanvas();

    paintingSize.addEventListener("input", onChangePaintingSize);

    btns.addEventListener("click", onBtnClick);
};

if (canvas) {
    init();
}
