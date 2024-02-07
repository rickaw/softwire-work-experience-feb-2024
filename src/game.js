import { iPiece, jPiece, rotatePieceArrayClockwise } from "./pieces.js"
import { getRandomElement } from "./randomElement.js"

const gameBoard = document.getElementById('game-board')
const gameBoardContext = gameBoard.getContext('2d')

const tileWidth = 30
const tileHeight = 30
const nTilesVertical = 20
const nTilesHorizontal = 10
const boardHeight = tileHeight * nTilesVertical
const boardWidth = tileWidth * nTilesHorizontal

const moveInterval = 300

let currentPiece = iPiece
let currentPosition = { row: 0, column: 0 }
let currentClockwiseRotations = 0;

gameBoardContext.canvas.height = boardHeight
gameBoardContext.canvas.width = boardWidth

const occupiedTiles = []

setUpGrid()

function setUpGrid() {
    for (let x = 0; x <= boardWidth; x += tileWidth) {
        gameBoardContext.moveTo(x, 0)
        gameBoardContext.lineTo(x, boardHeight)
        gameBoardContext.stroke()
    }

    for (let y = 0; y <= boardHeight; y += tileHeight) {
        gameBoardContext.moveTo(0, y)
        gameBoardContext.lineTo(boardWidth, y)
        gameBoardContext.stroke()
    }
}

setInterval(() => {
    moveForward()
}, moveInterval)

const downMove = { row: 1, column: 0 }
const leftMove = { row: 0, column: -1 }
const rightMove = { row: 0, column: 1 }

function moveForward() {
    if (canMoveCurrentPiece(downMove)) {
        moveCurrentPiece(downMove)
    } else {
        addCurrentPieceToOccupiedTiles()
        spawnNewPiece()
    }
}

function addMoveToPosition(position, move) {
    return {
        row: position.row + move.row,
        column: position.column + move.column
    }
}

function canMoveCurrentPiece(move) {    
    const nextPosition = addMoveToPosition(currentPosition, move)
    const tilesForNextPosition = tilesOfPiece(currentPiece, nextPosition, currentClockwiseRotations)

    return areValidTiles(tilesForNextPosition)
}

function areValidTiles(tiles) {
    const willGoUnderGrid = tiles.some(tile => tile.row >= nTilesVertical)
    const willGoLeftOfGrid = tiles.some(tile => tile.column < 0)
    const willGoRightOfGrid = tiles.some(tile => tile.column >= nTilesHorizontal)
    const willOverlapOtherPiece = tiles.some(tile => 
        occupiedTiles.some(occupiedTile => 
            tile.row === occupiedTile.row && tile.column === occupiedTile.column
        )
    )

    return !willGoUnderGrid && !willGoLeftOfGrid && !willGoRightOfGrid && !willOverlapOtherPiece
}

function tilesOfPiece(piece, position, clockwiseRotations) {
    const tiles = []
    const rotatedArray = rotatePieceArrayClockwise(piece.array, clockwiseRotations)

    rotatedArray.forEach((row, rowIndex) => 
        row.forEach((value, columnIndex) => {
            if (value === 1) {
                tiles.push({
                    row: position.row + rowIndex,
                    column: position.column + columnIndex
                })
            }
        })
    )

    return tiles
}

function addCurrentPieceToOccupiedTiles() {
    const tiles = tilesOfPiece(currentPiece, currentPosition, currentClockwiseRotations)
    occupiedTiles.push(...tiles)
}

function moveCurrentPiece(move) {
    const originalPosition = currentPosition
    
    currentPosition = addMoveToPosition(currentPosition, move)

    clearPiece(currentPiece, originalPosition, currentClockwiseRotations)
    drawPiece(currentPiece, currentPosition, currentClockwiseRotations)
}

function canRotateCurrentPiece() {
    const tiles = tilesOfPiece(currentPiece, currentPosition, currentClockwiseRotations + 1)
    return areValidTiles(tiles)
}

function rotateCurrentPiece() {
    clearPiece(currentPiece, currentPosition, currentClockwiseRotations)

    currentClockwiseRotations += 1

    drawPiece(currentPiece, currentPosition, currentClockwiseRotations)
}

function clearPiece(piece, position, clockwiseRotations) {
    updateTilesForPiece(piece.array, position, clockwiseRotations, 'white')
}

function drawPiece(piece, position, clockwiseRotations) {
    updateTilesForPiece(piece.array, position, clockwiseRotations, piece.color)
}

function updateTilesForPiece(pieceArray, position, clockwiseRotations, color) {
    const rotatedArray = rotatePieceArrayClockwise(pieceArray, clockwiseRotations)
    rotatedArray.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
            if (value === 1) {
                drawTile(position.row + rowIndex, position.column + columnIndex, color)
            }
        })
    })
}

function drawTile(row, column, color) {
    gameBoardContext.fillStyle = color
    gameBoardContext.fillRect(column * tileWidth + 1, row * tileHeight + 1, tileWidth - 2, tileHeight - 2)
}

function spawnNewPiece() {
    currentPiece = getRandomPiece()
    currentPosition = {row: -3, column: 0}
    currentClockwiseRotations = 0
    drawPiece(currentPiece, currentPosition, currentClockwiseRotations)
}

function getRandomPiece() {
    return getRandomElement([iPiece, jPiece])
}

window.addEventListener("keydown", function name(event )  {
    if (event.key === "ArrowRight" && canMoveCurrentPiece(rightMove))  {
        moveCurrentPiece(rightMove)
    }

    if (event.key === "ArrowLeft"&& canMoveCurrentPiece(leftMove))  {
        moveCurrentPiece(leftMove)
    }

    if (event.key === "ArrowUp") {
        if (canRotateCurrentPiece()) {
            rotateCurrentPiece()
        }
    }

    if (event.key === "ArrowDown") {
        if (canMoveCurrentPiece(downMove)) {
            moveCurrentPiece(downMove)
        } else {
            addCurrentPieceToOccupiedTiles()
            spawnNewPiece()
        }
    }
})