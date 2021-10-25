//#region variables
const CANVAS_WIDTH = 300
const CANVAS_HEIGHT = 300

const FPS = 60
const INTERVAL = 1000 / FPS
const U_SPEED = 20

const COLONNES = 10//x
const LIGNES = 10//y


const VOISINS_POSSIBLE = [
    new Position(0, -1),//top
    new Position(1, 0),//right
    new Position(0, 1),//bot
    new Position(-1, 0)//left
]

const NODE_W = CANVAS_WIDTH / COLONNES
const NODE_H = CANVAS_HEIGHT / LIGNES
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
window.addEventListener('load', initialize)
//#endregion

function solve(evt) {
    console.log('solve');
    let resultat = A_Star(nodes, nodes[0][0], nodes[COLONNES - 1][LIGNES - 1])
    togglePause()

    resultat?.forEach(node => {
        ctx.fillStyle = 'rgba(0,100,100,0.5)'
        ctx.fillRect(node.x * NODE_W, node.y * NODE_H, NODE_W, NODE_H)
    });
}


function generate(evt) {
    togglePause()
    console.log('generate');
    DFS_Random(nodes, nodes[0][0])
}

let nodes, nodesSimple
function initialize() {
    console.log('init');
    nodes = generateArrayDouble(COLONNES, LIGNES, newNode)

    nodesSimple = generateArray(COLONNES, LIGNES, newNode)


    nodes.flat().forEach((node, index, arr) => {
        node.voisins = getVoisins(arr, node)
    })
}


function newNode(x, y) {
    return new Node(x, y)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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
    // console.time('draw');
    nodes.flat().forEach(node => node.draw(ctx))
    ctx.stroke()
    // console.timeEnd('draw');
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


/**
 * list les voisins du node existant dans arr
 * @param {Array} arr 
 * @param {Node} node 
 * @returns {Node[]}
 */
function getVoisins(arr, node) {
    //pour gerer les 2 types de array
    let array = arr.flat()

    return VOISINS_POSSIBLE.reduce((prev, current) => {
        prev.push(array.find(element => element.position.isEquals(node.position.ajout(current))))
        return prev

    }, [])
}


/**
 * retire le mur entre les 2 nodes
 * @param {Node} node 
 * @param {Node} voisin 
 */
function removeWall(node, voisin) {
    let diff = voisin.position.minus(node.position)

    let i = VOISINS_POSSIBLE.findIndex(element => element.isEquals(diff))
    if (i > -1) {
        node.removeWall(i)

        let j = VOISINS_POSSIBLE.findIndex(element => element.isEquals(diff.oppose))
        voisin.removeWall(j)
    }
}


/**
 * list les chemin possible du node
 * @param {Array} arr 
 * @param {Node} node 
 * @returns {Position[]}
 */
function getPath(arr, node) {
    let array = arr.flat()
    let paths = []
    VOISINS_POSSIBLE.forEach((voisin, i) => {
        if (!node.hasWall(i)) {
            let p = array.find(element => element.position.isEquals(node.position.ajout(voisin)))
            paths.push(p)
        }
    })
    return paths
}










