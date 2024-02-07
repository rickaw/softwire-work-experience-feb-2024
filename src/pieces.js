export const iPiece= {
    color: "cyan",
    array: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
}

export const jPiece = {
    color: "blue",
    array: [
        [0, 0, 1 ,0],
        [0, 0, 1 ,0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ]
}

export function rotatePieceArrayClockwise(pieceArray, numberOfRotations = 1) {
    let rotatedArray = pieceArray

    for (let rotationCount = 0; rotationCount < numberOfRotations; rotationCount++) {
        rotatedArray = rotatePieceArrayClockwiseOnce(rotatedArray)
    }
    
    return rotatedArray
}

function rotatePieceArrayClockwiseOnce(pieceArray) {
    return pieceArray[0].map((_, columnIndex) => 
        pieceArray.map(row => row[columnIndex]).reverse()
    )
}