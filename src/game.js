import { jBlock } from "./blocks.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

drawGameBoardGrid()
drawGridForNextBlock()

window.addEventListener("keydown", handleKeyboardEvent)

const currentBlock = {
  shape: jBlock, 
  position: [3,3],
  colour:'red',
}

drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)

setInterval(() => {
    moveCurrentBlockDown()
  }, 1000);

function drawGameBoardGrid() {
  for(let i = 40; i<400; i+=40) {
    ctx.moveTo(i,0);
    ctx.lineTo(i,800);
    ctx.stroke();
  }

  for(let i = 40; i<800; i+=40) {
    ctx.moveTo(0,i);
    ctx.lineTo(400,i);
    ctx.stroke();
  }
}

function drawGridForNextBlock() {
  ctx.strokeStyle='rgba(0,0,0,0.3)'

  for(let i= 40; i<160; i+=40) {
    ctx.moveTo(i,0);
    ctx.lineTo(i,160);
    ctx.stroke();
  }

  for(let i = 40; i<160; i+=40) {
    ctx.moveTo(0,i);
    ctx.lineTo(160,i);
    ctx.stroke();
  }
}

function fillBox(row, column,colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(column * 40 + 1, row * 40 + 1, 38, 38);
}

function drawBlock(blockType, position, colour){
  blockType.forEach(function (row,rowIndex){
    row.forEach(function(item,index){
      if (item==1){
        fillBox(rowIndex+position[0],index+position[1],colour)
      }
    })
  })
}
function ArrowKeysMovement(){
function moveCurrentBlockDown() {
  drawBlock(currentBlock.shape, currentBlock.position, 'white')
  currentBlock.position = [currentBlock.position[0]+1, currentBlock.position[1]]
  drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)
}
function moveCurrentBlockLeft() {
    drawBlock(currentBlock.shape, currentBlock.position, 'white')
    currentBlock.position = [currentBlock.position[0], currentBlock.position[1]-1]
    drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)
  }
function moveCurrentBlockRight() {
    drawBlock(currentBlock.shape, currentBlock.position, 'white')
    currentBlock.position = [currentBlock.position[0], currentBlock.position[1]+1]
    drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)
  }
}
function handleKeyboardEvent(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    console.log("Up arrow pressed")
    ArrowKeysMovement()
  } else if(event.key === "ArrowDown"){
    event.preventDefault()
    console.log("Down arrow pressed")
    moveCurrentBlockDown()
  } else if(event.key === "ArrowLeft"){
    event.preventDefault()
    moveCurrentBlockLeft()
    console.log("Left arrow pressed")
  } else if(event.key === "ArrowRight"){
    event.preventDefault()
    console.log("Right arrow pressed")
    moveCurrentBlockRight()
  }
}

function rotateBlockShapeClockwise(blockShape) {
  return blockShape[0].map((_, columnIndex) => 
      blockShape.map(row => row[columnIndex]).reverse()
  )
}