var rows = 3;
var columns = 3;

var currentTile;
var otherTile;

var turns = 0;

// var imgOrder = [ "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

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
    }
}