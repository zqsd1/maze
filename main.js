//#region variables
const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 300

const FPS = 60
const INTERVAL = 1000 / FPS
const U_SPEED = 20

const COLONNES = 11//x
const LIGNES = 9//y


const VOISINS_POSSIBLE = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 }
]

const WALLS_POSSIBLE = ['top', 'right', 'bottom', 'left']
const WALLS_OPPOSE = ['bottom', 'left', 'top', 'right']
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


//#region  html
const canvas = createHTML('canvas', { id: "canvas", class: "mycanvas", width: CANVAS_WIDTH, height: CANVAS_HEIGHT }, document.body)
const buttonGenerate = createHTML('button', { id: 'btnGenerate' }, document.body, "GENERATE")
const buttonSolve = createHTML('button', { id: 'btnSolve' }, document.body, "SOLVE")
const buttonDraw = createHTML('button', { id: 'btnDraw' }, document.body, "DRAW")
const ctx = canvas.getContext('2d')
//#endregion
//#region event
buttonGenerate.addEventListener('click', generate)
buttonSolve.addEventListener('click', solve)
buttonDraw.addEventListener('click', draw)
//#endregion

function solve(evt) {
    console.log('solve');
}

function generate(evt) {
    togglePause()
    console.log('generate');
    DFS(nodes, nodes[0][0])
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
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.beginPath()
    nodes.flat().forEach(node => node.draw(ctx))
}

function update() {

}
//#endregion


//#region array double
function generateArrayDouble(x, y, elementsCallback) {
    const doubleArray = []
    for (let i = 0; i < x; i++) {
        doubleArray[i] = []
        for (let j = 0; j < y; j++) {
            doubleArray[i][j] = elementsCallback(i, j)
        }
    }
    return doubleArray
}

//#endregion

//#region array simple
function generateArray(x, y, elementsCallback) {
    const array = []
    for (let i = 0; i < x * y; i++) {
        array[i] = elementsCallback(Math.trunc(i / y), i % y)
    }

    return array
}
//#endregion


function newNode(x, y) {
    return new Node(x, y)
}



/**
 * 
 * @param {[Node]} arr 
 * @param {Node} node 
 * @returns {[Node]}
 */
function getVoisins(arr, node) {
    //pour gerer les 2 types de array
    let array = arr.flat()

    let voisins = []
    VOISINS_POSSIBLE.forEach(voisin => {
        voisins.push(array.find(element => {
            return element.x === node.x + voisin.x && element.y === node.y + voisin.y
        }))
    });

    //filter pour enlever les undefinied
    return voisins.filter(element => element)
}

function removeWall(nodeA, nodeB) {

    const wpos = ['top', 'left', 'bottom', 'right']
    const wopp = ['bottom', 'right', 'top', 'left']
    let pos = { x: nodeB.x - nodeA.x, y: nodeB.y - nodeA.y }
    let tmp = VOISINS_POSSIBLE.findIndex(element => element.x == pos.x && element.y == pos.y)
    nodeA.removeWall(wopp[tmp])
    nodeB.removeWall(wpos[tmp])
}



let nodes = generateArrayDouble(COLONNES, LIGNES, newNode)

let nodesSimple = generateArray(COLONNES, LIGNES, newNode)

// let voisins = voisinsArrayDouble(nodes, nodes[3][5])
// voisins.forEach(element => {
//     element.color = true
// });

