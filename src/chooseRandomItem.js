export function chooseRandomItem(array) {
    const indexToChoose = Math.floor(Math.random() * array.length)
    return array[indexToChoose]
}