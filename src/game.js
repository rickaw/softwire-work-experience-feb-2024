import { iPiece } from "./pieces.js"

const gameBoard = document.getElementById('game-board')
const gameBoardContext = gameBoard.getContext('2d')

const tileWidth = 30
const tileHeight = 30
const nTilesVertical = 20
const nTilesHorizontal = 10
const boardHeight = tileHeight * nTilesVertical
const boardWidth = tileWidth * nTilesHorizontal

const moveInterval = 300

let currentPiece, currentPosition;

gameBoardContext.canvas.height = boardHeight
gameBoardContext.canvas.width = boardWidth

const occupiedTiles = []

currentPiece = iPiece
currentPosition = { row: 0, column: 0 }

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

function moveForward() {
    if (canMoveCurrentPieceDown()) {
        moveCurrentPieceDown()
    } else {
        addCurrentPieceToOccupiedTiles()
        spawnNewPiece()
    }
}

function positionOneDown(position) {
    return {
        row: position.row + 1,
        column: position.column
    }
}

function canMoveCurrentPieceDown() {    
    const nextPosition = positionOneDown(currentPosition)
    const tilesForNextPosition = tilesOfPiece(currentPiece, nextPosition)

    const hasReachedBottom = tilesForNextPosition.some(tile => tile.row >= nTilesVertical)
    const willOverlapOtherPiece = tilesForNextPosition.some(tile => 
        occupiedTiles.some(occupiedTile => 
            tile.row === occupiedTile.row && tile.column === occupiedTile.column
        )
    )

    return !hasReachedBottom && !willOverlapOtherPiece
}

function tilesOfPiece(piece, position) {
    const tiles = []
    piece.array.forEach((row, rowIndex) => 
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
    const tiles = tilesOfPiece(currentPiece, currentPosition)
    occupiedTiles.push(...tiles)
}

function moveCurrentPieceDown() {
    clearPiece(currentPiece, currentPosition)

    currentPosition = positionOneDown(currentPosition)

    drawPiece(currentPiece, currentPosition)
}

function clearPiece(piece, position) {
    piece.array.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
            if (value === 1) {
                drawTile(position.row + rowIndex, position.column + columnIndex, 'white')
            }
        })
    })
}

function drawPiece(piece, position) {
    piece.array.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
            if (value === 1) {
                drawTile(position.row + rowIndex, position.column + columnIndex, piece.color)
            }
        })
    })
}

function drawTile(row, column, color) {
    gameBoardContext.fillStyle = color
    gameBoardContext.fillRect(column * tileWidth + 1, row * tileHeight + 1, tileWidth - 2, tileHeight - 2)
}

function spawnNewPiece() {
    currentPiece = iPiece
    currentPosition = {row: -3, column: 0}
    drawPiece(currentPiece, currentPosition)
}