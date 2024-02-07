export function getRandomElement(array) {
    const numberOfElements = array.length
    return array[Math.floor(Math.random() * numberOfElements)]
}