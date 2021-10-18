//#region variables
const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 300

const FPS = 60
const INTERVAL = 1000 / FPS
const U_SPEED = 20


//#endregion



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



const canvas = createHTML('canvas', { id: "canvas", class: "mycanvas", width: CANVAS_WIDTH, height: CANVAS_HEIGHT }, document.body)
const buttonGenerate = createHTML('button', { id: 'btnGenerate' }, document.body, "GENERATE")
const buttonSolve = createHTML('button', { id: 'btnSolve' }, document.body, "SOLVE")
const ctx = canvas.getContext('2d')

buttonGenerate.addEventListener('click', generate)
buttonSolve.addEventListener('click', solve)

function solve(evt) {
    console.log('solve');
}

function generate(evt) {
    togglePause()
    console.log('generate');
}


//#region animation
let animationFrame, lastFrameTime, lastUpdateTime


function gameLoop(timestamp) {
    animationFrame = window.requestAnimationFrame(gameLoop)

    const timeSinceLastFrame = timestamp - lastFrameTime
    const timeSincelLastUpdate = timestamp - lastUpdateTime

    if (timeSinceLastFrame > INTERVAL) {
        draw()
        lastFrameTime = timestamp
    }

    if (timeSincelLastUpdate > 1000 / U_SPEED) {
        update()
        lastUpdateTime = timestamp
    }
}


function play() {
    if (animationFrame === undefined) {
        animationFrame = window.requestAnimationFrame(gameLoop)
        lastUpdateTime = lastFrameTime = performance.now() // 0 ?
        // draw()
        console.log("play");
    }
}

function togglePause() {

    if (animationFrame != undefined) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = undefined
        console.log('pause');
    } else {
        play()

    }
}

function draw() {
    nodes.forEach(tab => tab.forEach(node => node.draw(ctx)))
}

function update() {

}
//#endregion


//#region array node
// let nodes = []
const COLONNES = 11
const LIGNES = 9

function makeDoubleArray(x, y, elementsCallback) {
    const doubleArray = []
    for (let i = 0; i < x; i++) {
        doubleArray[i] = []
        for (let j = 0; j < y; j++) {
            doubleArray[i][j] = elementsCallback(i, j)
        }
    }
    return doubleArray
}

function newNode(x, y) {
    return {
        x: x,
        y: y,
        walls: 15,
        draw: function (ctx) {
            let w = ctx.canvas.width / COLONNES
            let h = ctx.canvas.height / LIGNES
            ctx.strokeRect(this.x * w, this.y * h, w, h)

        }
    }
}

let nodes = makeDoubleArray(COLONNES, LIGNES, newNode)


//#endregion