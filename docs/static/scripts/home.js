const _homeSquares = document.querySelector("#homeSquares");
const main = document.querySelector("main");

let info = [
    ["Default", "defaultSquare", "arrow-cursor.svg", "Computer cursor arrow line drawing"],
    ["Music", "headerSquareMusic", "8thNote.svg", "Music note line drawing"],
    ["Video", "headerSquareVideo", "video.svg", "Video roll line drawing"],
    ["Code", "headerSquareCode", "file-code.svg", "Computer code file line drawing"]
]

info.forEach(square => {
    let rawHTML = `<div class='headerSquare' id='${square[1]}'><img src='/static/images/${square[2]}' alt='${square[3]}'></div>`;
    _homeSquares.innerHTML += rawHTML;
});

const homeSquares = document.querySelectorAll(".headerSquare");
let selectedSquare = "defaultSquare";
let selectedSquareDiv;
updateSquare();

homeSquares.forEach(square =>
    square.addEventListener('click', () => {
        toggleSquare(square);
    })
)

function toggleSquare(square) {
    if (selectedSquare && (selectedSquare == square.id)) {
        return
    }
    else if (selectedSquare) {
        oldSquare = document.getElementById(selectedSquare);
        oldSquare.classList.toggle("selected");
        document.querySelector(`#${selectedSquareDiv}`).classList.toggle("selected");
    }
    selectedSquare = square.id;
    updateSquare()
}

function getSquareDivByID(id) {
    divID = `hs${info.find(item => item[1] === id)[0]}`;
    return document.querySelector(`#${divID}`);
}

function updateSquare() {
    square = document.getElementById(selectedSquare);
    square.classList.toggle("selected");
    div = getSquareDivByID(square.id);
    selectedSquareDiv = div.id;
    div.classList.toggle("selected");
}