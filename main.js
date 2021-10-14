/**
 * creer un HTMLElement
 * @param {string} name 
 * @param {Object} attributes 
 * @param {HTMLElement} parent 
 * @param {string|HTMLElement} content
 * @returns {HTMLElement}
 */
function createHTML(name, attributes, parent, content) {
    if (typeof name !== "string")
        return
    const element = document.createElement(name)

    // Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))

    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }

    if (typeof content === "string")
        element.innerText = content
    else if (element instanceof HTMLElement)
        element.innerHTML = content

    parent.appendChild(element)

    return element
}



const canvas = createHTML('canvas', { id: "xxx", class: 'zaer', width: 500, height: 500 }, document.body)
const buttonGenerate = createHTML('button', { id: 'btnGenerate' }, document.body, "GENERATE")
const buttonSolve = createHTML('button', { id: 'btnSolve' }, document.body, "SOLVE")
const ctx = canvas.getContext('2d')

buttonGenerate.addEventListener('click', generate)
buttonSolve.addEventListener('click', solve)

function solve(evt) {
    console.log('solve');
}

function generate(evt) {
    console.log('generate');
}