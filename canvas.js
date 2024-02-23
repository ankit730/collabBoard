let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilWidth = document.querySelector(".pencil-size");
let defaultPencilColor = "red";

let eraserWidth = document.querySelector(".eraser-size");
let eraserColor = "white";


let pencilColors = document.querySelectorAll(".pencil-color");
let downloadBtn = document.querySelector(".download-btn");
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);



ctx.strokeStyle = defaultPencilColor;
// ctx.beginPath();
// ctx.moveTo(0,0);
// ctx.lineTo(10,100);
// ctx.stroke()
let mouseDown;

canvas.addEventListener("mousedown", function(event){

    ctx.beginPath();
   mouseDown=true;
    let currentCoordinates = {
        x: event.clientX,
        y: event.clientY
    }

    ctx.moveTo(currentCoordinates.x, currentCoordinates.y);
})

canvas.addEventListener("mousemove", function(event){
    let currentCoordinates = {
        x: event.clientX,
        y: event.clientY
    }
    if(mouseDown){
    ctx.lineTo(currentCoordinates.x, currentCoordinates.y);
    ctx.stroke();
    }
})
canvas.addEventListener("mouseup", function(event){
    
   mouseDown=false;
})


pencilColors.forEach((color)=>{
    color.addEventListener("click", function(event){
        let selectedColor = color.classList[1];
        ctx.strokeStyle = selectedColor;
    })
})


pencilWidth.addEventListener("change", function(event){
    let currentPencilWidth = pencilWidth.value;
    ctx.lineWidth = currentPencilWidth;
})

eraserBtn.addEventListener("click", function(event){
    ctx.strokeStyle = "white";
})

eraserWidth.addEventListener("change", function(event){
    let currentEraserWidth = eraserWidth.value;
    ctx.lineWidth = currentEraserWidth;
})


downloadBtn.addEventListener("click", function(event){
    downloadCanavsPage();
})

function downloadCanavsPage(){
  let link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'filename.png';
  link.click();
}