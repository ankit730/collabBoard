let menuToggleCont = document.querySelector(".menu-toggle");
let toolCont = document.querySelector(".tool-cont");
let pencilToolCont = document.querySelector(".pencil-tools-cont");
let pencilBtn = document.querySelector(".pencil");
let eraserBtn = document.querySelector(".eraser");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let stickyBtn = document.querySelector(".sticky-note");
let uploadBtn = document.querySelector(".upload-btn");
let toggleVisible = true;
let pencilToolsVisible = false;
let eraserToolVisible = false;

/* Event listener for the menu toggle button
    It toggle the tool container.
*/
menuToggleCont.addEventListener("click", function (event) {
  toggleVisible = !toggleVisible;
  let iconSelected = menuToggleCont.children[0];
  if (toggleVisible) {
    iconSelected.classList.remove("fa-xmark");
    iconSelected.classList.add("fa-pencil");
    toolCont.style.display = "flex";
  } else {
    iconSelected.classList.remove("fa-pencil");
    iconSelected.classList.add("fa-xmark");
    toolCont.style.display = "none";
    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
  }
});

// Event listener on pencil
pencilBtn.addEventListener("click", function (event) {
  pencilToolsVisible = !pencilToolsVisible;
  if (pencilToolsVisible) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});

eraserBtn.addEventListener("click", function (event) {
  eraserToolVisible = !eraserToolVisible;
  if (eraserToolVisible) {
    eraserToolCont.style.display = "block";
  } else {
    eraserToolCont.style.display = "none";
  }
});

//create sticky
stickyBtn.addEventListener("click", function (event) {
  let stickyTemplate = `
    <div class="sticky-header">
        <div class="minimize"></div>
        <div class="delete-sticky"></div>
    </div>
    <div class="sticky-content">
        <textarea spellcheck="none"></textarea>
    </div>
   `;
  createStickyNote(stickyTemplate);
});

function createStickyNote(stickyTemplate) {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-note-cont");
  stickyCont.innerHTML = stickyTemplate;
  document.body.appendChild(stickyCont);

  handleMinimize(stickyCont);
  handleDelete(stickyCont);
}

function handleMinimize(stickyCont) {
  let minimizeBtn = stickyCont.querySelector(".minimize");

  minimizeBtn.addEventListener("click", function (event) {
    let stickyContentArea = stickyCont.querySelector(".sticky-content");
    let contentVisible =
      getComputedStyle(stickyContentArea).getPropertyValue("display");
    if (contentVisible === "none") stickyContentArea.style.display = "block";
    else stickyContentArea.style.display = "none";
  });
}

function handleDelete(stickyCont) {
  let deleteBtn = stickyCont.querySelector(".delete-sticky");

  deleteBtn.addEventListener("click", function (event) {
    stickyCont.remove();
  });
}

uploadBtn.addEventListener("click", function (event) {
  let inputTag = document.createElement("input");
  inputTag.setAttribute("type", "file");
  inputTag.click();
  let url = "";
  inputTag.addEventListener("change", function (event) {
    let fileUploaded = inputTag.files[0];
    url = URL.createObjectURL(fileUploaded);
    console.log(url);

    let stickyTemplate = `
        <div class="sticky-header">
            <div class="minimize"></div>
            <div class="delete-sticky"></div>
        </div>
        <div class="sticky-content">
        <img src="${url}" alt=""/>
        </div>
    `;
    createStickyNote(stickyTemplate);
  });
});
