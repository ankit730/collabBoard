let canvas = document.querySelector("canvas");
let pencilWidth = document.querySelector(".pencil-size");
let pencilColors = document.querySelectorAll(".pencil-color");
let eraserWidth = document.querySelector(".eraser-size");
let downloadBtn = document.querySelector(".download-btn");
let undoBtn = document.querySelector(".undo-btn");
let redoBtn = document.querySelector(".redo-btn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let defaultPencilColor = "red";
let eraserColor = "white";



let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = defaultPencilColor;

let mouseDown;

let canvasAllInstances = [];
let currInstance;

canvas.addEventListener("mousedown", function (event) {
  mouseDown = true;
  let currentCoordinates = {
    x: event.clientX,
    y: event.clientY,
  };

  startDrawing(currentCoordinates);
});


canvas.addEventListener("mousemove", function (event) {
  let currentCoordinates = {
    x: event.clientX,
    y: event.clientY,
  };
  if (mouseDown) {
    ctx.lineTo(currentCoordinates.x, currentCoordinates.y);
    ctx.stroke();
  }
});


canvas.addEventListener("mouseup", function (event) {
  mouseDown = false;
  stopDrawing();
});

function startDrawing(currentCoordinates) {
    ctx.beginPath();
    ctx.moveTo(currentCoordinates.x, currentCoordinates.y);
  }

  
function stopDrawing() {
  let url = canvas.toDataURL();
  canvasAllInstances.push(url);
  currInstance = canvasAllInstances.length - 1;
}

pencilColors.forEach((color) => {
  color.addEventListener("click", function (event) {
    let selectedColor = color.classList[1];
    ctx.strokeStyle = selectedColor;
  });
});

pencilWidth.addEventListener("change", function (event) {
  let currentPencilWidth = pencilWidth.value;
  ctx.lineWidth = currentPencilWidth;
});

eraserBtn.addEventListener("click", function (event) {
  ctx.strokeStyle = "white";
});

eraserWidth.addEventListener("change", function (event) {
  let currentEraserWidth = eraserWidth.value;
  ctx.lineWidth = currentEraserWidth;
});

downloadBtn.addEventListener("click", function (event) {
  downloadCanavsPage();
});

function downloadCanavsPage() {
  let link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "filename.png";
  link.click();
}

undoBtn.addEventListener("click", function (event) {
  if (currInstance > 0) {
    --currInstance;
  }

  changeState();
});

redoBtn.addEventListener("click", function (event) {
  if (currInstance < canvasAllInstances.length - 1) {
    ++currInstance;
  }
  changeState();
});

function changeState() {
  let url = canvasAllInstances[currInstance];
  let canvasImg = new Image();
  canvasImg.src = url;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  canvasImg.onload = function () {
    ctx.drawImage(canvasImg, 0, 0, canvas.width, canvas.height);
  };
}
