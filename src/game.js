import { blockShapes } from "./blocks.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const nextCanvas = document.getElementById("canvas2");
const nextCtx = nextCanvas.getContext("2d");

drawGameBoardGrid()
drawGridForNextBlock()

window.addEventListener("keydown", handleKeyboardEvent)

const currentBlock = {
  shape: blockShapes[0], 
  position: [3,3],
  colour:'red',
}

drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)

setInterval(() => {
  moveCurrentBlockIfValid(downMove)
}, 500);

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
  ctx.strokeStyle='rgba(0,0,0,2)'

  for(let i= 40; i<160; i+=40) {
    nextCtx.moveTo(i,0);
    nextCtx.lineTo(i,160);
    nextCtx.stroke();
  }

  for(let i = 40; i<160; i+=40) {
    nextCtx.moveTo(0,i);
    nextCtx.lineTo(160,i);
    nextCtx.stroke();
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

const downMove = [1, 0]
const leftMove=[0,-1]

const rightMove=[0,1]
function moveCurrentBlock(move) {
    const rowChange = move[0]
    const columnChange = move[1]

    drawBlock(currentBlock.shape, currentBlock.position, 'white')
    currentBlock.position = [currentBlock.position[0] + rowChange, currentBlock.position[1] + columnChange]
    drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)
}

function moveCurrentBlockDown() {
  drawBlock(currentBlock.shape, currentBlock.position, 'white')
  currentBlock.position = [currentBlock.position[0]+1, currentBlock.position[1]]
  drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)
}

function handleKeyboardEvent(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    console.log("Up arrow pressed")

  } else if(event.key === "ArrowDown"){
    event.preventDefault()
    console.log("Down arrow pressed")
    // moveCurrentBlockDown()

    moveCurrentBlockIfValid(downMove)

  } else if(event.key === "ArrowLeft"){
    event.preventDefault()

    moveCurrentBlockIfValid(leftMove)

    console.log("Left arrow pressed")

    
  } else if(event.key === "ArrowRight"){
    event.preventDefault()
    console.log("Right arrow pressed")

    moveCurrentBlockIfValid(rightMove)

}}

function moveCurrentBlockIfValid(move) {
  const nextBlockPosition = getPosition(currentBlock.position, move)
    const nextTilePositions = getTilePositions(currentBlock.shape, nextBlockPosition)
    const tilePositionsAreValid = nextTilePositions.every(isValidTilePosition)
    if (tilePositionsAreValid) {
      moveCurrentBlock(move)
    }
}

function isValidTilePosition(tilePosition) {
  const row = tilePosition[0]
  const column = tilePosition[1]
  if (row < 0 || row >19){
    return false
  }
  if (column<0 || column>9){
    return false
  }
  return true 
}

function getPosition(originalPosition, move) {
  return [
    originalPosition[0] + move[0],
    originalPosition[1] + move[1],
  ]
}

function getTilePositions(blockType, position){
  const tilePos=[]
  blockType.forEach(function (row,rowIndex){
    row.forEach(function(item,index){
      if (item==1){
        tilePos.push([position[0] + rowIndex , position[1] + index])
      }
    })
  })
  return tilePos
}

function rotateBlockShapeClockwise(blockShape) {
  return blockShape[0].map((_, columnIndex) => 
      blockShape.map(row => row[columnIndex]).reverse()
  )
}