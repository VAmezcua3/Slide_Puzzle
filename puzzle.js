//*************** STATE ***************//

var rows = 3;
var columns = 3;

const startTime = .5
let time = startTime * 60

var currentTile;
var otherTile;

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

let winner = false;
let gameActive = true
console.log(winner, "winner status")
console.log(gameActive, "is game active");

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
    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    count.innerHTML = `${minutes}:${seconds}`;
    time--;
    if (time <= -1){
        gameActive = false
        console.log(gameActive, "game active changed");
        count.innerHTML = `GAME OVER`;
        document.getElementById("countdown").style.fontSize="3rem"
        document.getElementById("countdown").style.paddingBottom="2rem"
    }
}

const checkWinner = () => {
    const solution = [ "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i <solution.length; i++){
        let solutionPosition = solution[i]
        let A = solutionPosition[0] //"1"
        let B = solutionPosition[1] //"2"
        let C = solutionPosition[2] //"3"
        let D = solutionPosition[3] //"4"
        let E = solutionPosition[4]
        let F = solutionPosition[5]
        let G = solutionPosition[6]
        let H = solutionPosition[7]
        let I = solutionPosition[8]
    }
        for (let j = 0; j < imgOrder.length; j++){
            let boardPosition = imgOrder[j]
            let valueOne = boardPosition[0];
            let valueTwo = boardPosition[1];
            let valueThree = boardPosition[2];
            let valueFour = boardPosition[3];
            let valueFive = boardPosition[4];
            let valueSix = boardPosition[5];
            let valueSeven = boardPosition[6];
            let valueEight = boardPosition[7];
            let valueNine = boardPosition[8];

            if (valueOne === A && 
                valueTwo === B && 
                valueThree === C && 
                valueFour === D && 
                valueFive === E &&
                valueSix === F &&
                valueSeven === G &&
                valueEight === H &&
                valueNine === I){
            winner = true
            }

        if (winner === true){
            turnStatus.innerHTML = "How You Play The Cards You're Dealt Is All That Matters"
            time = time
        }
    }
}

//*************** BOOT STRAPPING ***************//
setInterval(updateTimer, 1000);
