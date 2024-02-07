import { newHeaderColor } from "./colors.js"

function changeHeaderColor() {
    const welcomeHeader = document.getElementById('welcome-header')
    welcomeHeader.style.color = newHeaderColor
}

setTimeout(() => {
    changeHeaderColor()
}, 2000)


fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then(body => {
        const descriptionElement = document.getElementById('fake-description')
        descriptionElement.textContent = body.title
    })
            