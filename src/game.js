import { blockShapes } from "./blocks.js";
import { chooseRandomItem } from "./chooseRandomItem.js";
import { colors } from "./colors.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const nextCanvas = document.getElementById("canvas2");
const nextCtx = nextCanvas.getContext("2d");

const downMove = [1, 0]
const leftMove=[0,-1]
const rightMove=[0,1]

drawGameBoardGrid()
drawGridForNextBlock()

window.addEventListener("keydown", handleKeyboardEvent)

const currentBlock = {
  shape: blockShapes[0], 
  position: [3,3],
  colour:'red',
}

drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)

const occupiedTilePositionsAndColors = []

setInterval(() => {
  const nextBlockPosition = getPosition(currentBlock.position, downMove)
  const nextTilePositions = getTilePositions(currentBlock.shape, nextBlockPosition)
  const tilePositionsAreValid = nextTilePositions.every(isValidTilePosition)
  if (tilePositionsAreValid) {
    moveCurrentBlock(downMove)
  }
  else{
    const tilePositions = getTilePositions(currentBlock.shape, currentBlock.position)
    tilePositions.forEach(tilePosition => {
      occupiedTilePositionsAndColors.push({
        position: tilePosition,
        color: currentBlock.colour
      })
    })
    currentBlock.shape= chooseRandomItem(blockShapes)
    currentBlock.position= [0,2]
    currentBlock.colour = chooseRandomItem(colors)
  }
}
, 500);

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

// fill a box on the board given its row index, column index and colour
function fillBox(row, column,colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(column * 40 + 1, row * 40 + 1, 38, 38);
}

// draw a block given a block shape, its position and its colour
function drawBlock(blockType, position, colour){
  blockType.forEach(function (row,rowIndex){
    row.forEach(function(item,index){
      if (item==1){
        fillBox(rowIndex+position[0],index+position[1],colour)
      }
    })
  })
}

// move the current block given a move
function moveCurrentBlock(move) {
    const rowChange = move[0]
    const columnChange = move[1]

    drawBlock(currentBlock.shape, currentBlock.position, 'white')
    currentBlock.position = [currentBlock.position[0] + rowChange, currentBlock.position[1] + columnChange]
    drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)
}

function handleKeyboardEvent(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    rotateBlockShapeClockwiseIfValid()
  } else if(event.key === "ArrowDown"){
    event.preventDefault()
    moveCurrentBlockIfValid(downMove)
  } else if(event.key === "ArrowLeft"){
    event.preventDefault()
    moveCurrentBlockIfValid(leftMove)
  } else if(event.key === "ArrowRight"){
    event.preventDefault()
    moveCurrentBlockIfValid(rightMove)
}}

// given a move, this function gets the next position 
function moveCurrentBlockIfValid(move) {
  const nextBlockPosition = getPosition(currentBlock.position, move)
    const nextTilePositions = getTilePositions(currentBlock.shape, nextBlockPosition)
    const tilePositionsAreValid = nextTilePositions.every(isValidTilePosition)
    if (tilePositionsAreValid) {
      moveCurrentBlock(move)
    }
}

// returns true if the given tile position (2-dimensional array) is within the game board
// returns false otherwise
function isValidTilePosition(tilePosition) {
  for (const occupiedTilePositionAndColor of occupiedTilePositionsAndColors) {
    const occupiedPosition = occupiedTilePositionAndColor.position
    if (occupiedPosition[0] === tilePosition[0] && occupiedPosition[1] === tilePosition[1]) {
      return false
    }
  }
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

// returns the next position given the original position and a move
// e.g. if originalPosition is [1, 2] and move is [3, 4], this function returns [4, 6]
function getPosition(originalPosition, move) {
  return [
    originalPosition[0] + move[0],
    originalPosition[1] + move[1],
  ]
}

// returns the positions of tiles occupied by the block, given a block shape and the block position
// blockType is a 2-dimensional array (like jBlock)
// block position could be something like [2, 5]
// the return value looks something like [[4, 6], [4, 8], [5, 7], ...] 
// (They tell you which positions would be occupied by the block, depending on its shape and position)
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



// given a block shape (2-dimensional array), returns another 2-dimensional array that has been rotated 90 degrees clockwise
function rotateBlockShapeClockwise(blockShape) {
  return blockShape[0].map((_, columnIndex) => 
      blockShape.map(row => row[columnIndex]).reverse()
  )
}


function rotateBlockShapeClockwiseIfValid(){

 const rotatedShape= rotateBlockShapeClockwise(currentBlock.shape)
 const rotatedShapePositions = getTilePositions(rotatedShape, currentBlock.position,)

 const tilePositionsAreValid = rotatedShapePositions.every(isValidTilePosition)
 if (tilePositionsAreValid) {
  drawBlock(currentBlock.shape, currentBlock.position, 'white')
  currentBlock.shape = rotatedShape
  drawBlock(currentBlock.shape, currentBlock.position, currentBlock.colour)
 }
}

