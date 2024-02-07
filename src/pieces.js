export const iPiece= {
    color: "cyan",
    array: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
}


function rotatePieceClockwise(pieceArray) {
    return pieceArray[0].map((_, columnIndex) => 
        pieceArray.map(row => row[columnIndex]).reverse()
    )
}