//*************** STATE ***************//
var rows = 3;
var columns = 3;
var turns = 0;
const startTime = 3
let time = startTime * 60

var currentTile;
var otherTile;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

let winner = false;
let gameActive = true;
let timerPause = false;

//*************** DOM SELECTIONS ***************//
const count = document.getElementById("countdown");
const turnStatus = document.getElementById("turns");

//*************** DOM FUNCTIONS ***************//

window.onload = function(){

    for (let r=0; r<rows; r++){
        for (let c=0; c<columns; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString()
            tile.src = imgOrder.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart)
            tile.addEventListener("dragover", dragOver)
            tile.addEventListener("dragenter", dragEnter)
            tile.addEventListener("dragleave", dragLeave)
            tile.addEventListener("drop", dragDrop)
            tile.addEventListener("dragend", dragEnd)
            document.getElementById("board").append(tile)
        }
    }
    var song = document.getElementById("audio")
    song.play()
}

//*************** HELPER FUNCTIONS ***************//

function dragStart(){
    currentTile = this;
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
}

function dragLeave(){

}

function dragDrop(){
    otherTile = this;
}

function dragEnd(){
    if (gameActive === false){
        return
    }

    if(!otherTile.src.includes("3.jpg")){
        return
    }

    let currentCoords = currentTile.id.split("-");
    let r = parseInt(currentCoords[0]);
    let c = parseInt(currentCoords[1]);

    let otherCoords = otherTile.id.split("-")
    let r2 = parseInt(otherCoords[0])
    let c2 = parseInt(otherCoords[1])

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1
    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent){
        let currentImg = currentTile.src;
        let otherImg = otherTile.src;

        currentTile.src = otherImg;
        otherTile.src = currentImg

        turns++
        document.getElementById("turns").innerText = turns;
        checkWinner()
    }
}

const updateTimer = () => {
    if (timerPause === true){
        return
    } else{
        const minutes = Math.floor(time/60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        count.innerHTML = `${minutes}:${seconds}`;
        time--;
        if (time <= -1){
            gameActive = false
            count.innerHTML = `GAME OVER`;
            document.getElementById("countdown").style.fontSize="3rem"
            document.getElementById("countdown").style.paddingBottom="2rem"
        }
    }
}

const checkWinner = () => {
    const board = document.getElementById("board")

    const tile1 = document.getElementById("0-0").getAttribute("src")
    const tile2 = document.getElementById("0-1").getAttribute("src")
    const tile3 = document.getElementById("0-2").getAttribute("src")
    const tile4 = document.getElementById("1-0").getAttribute("src")
    const tile5 = document.getElementById("1-1").getAttribute("src")
    const tile6 = document.getElementById("1-2").getAttribute("src")
    const tile7 = document.getElementById("2-0").getAttribute("src")
    const tile8 = document.getElementById("2-1").getAttribute("src")
    const tile9 = document.getElementById("2-2").getAttribute("src")
    
    if (
        tile1.includes("1.jpg") &&
        tile2.includes("2.jpg") &&
        tile3.includes("3.jpg") &&
        tile4.includes("4.jpg") &&
        tile5.includes("5.jpg") &&
        tile6.includes("6.jpg") &&
        tile7.includes("7.jpg") &&
        tile8.includes("8.jpg") &&
        tile9.includes("9.jpg")
    ){
        winner = true
    }
    if (winner === true){
        turnStatus.innerHTML = "How You Play The Cards You're Dealt Is All That Matters"
        timerPause = true;
    }
}

//*************** BOOT STRAPPING ***************//
setInterval(updateTimer, 1000);
