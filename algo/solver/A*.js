function reconstructPath(cameFrom, current) {

    let totalPath = [current]

    while (cameFrom.has(current)) {

        current = cameFrom.get(current)
        totalPath.unshift(current)

    }
    return totalPath
}

function A_Star(graph, start, goal, h = heuristic) {

    let openSet = [start]

    let cameFrom = new Map()

    let gScore = new Map()
    gScore.set(start, 0)

    let fScore = new Map()
    fScore.set(start, h(start, goal))


    while (openSet.length > 0) {
        let currentNode = openSet.reduce((cumul, courrant) =>
            mapGet(fScore, courrant) < mapGet(fScore, cumul) ? courrant : cumul
        )

        if (currentNode === goal)
            return reconstructPath(cameFrom, currentNode)

        openSet.splice(openSet.findIndex(e => e === currentNode), 1)

        let d = 1 //pytagore ....
            for (const voisin of getPath(graph,currentNode)) {

            let tentative_gScore = mapGet(gScore, currentNode) + d

            if (tentative_gScore < mapGet(gScore, voisin)) {

                cameFrom.set(voisin, currentNode)
                gScore.set(voisin, tentative_gScore)
                fScore.set(voisin, mapGet(gScore, voisin) + h(voisin, goal))

                if (!openSet.includes(voisin)) {
                    openSet.push(voisin)
                }
            }
        }
    }

    return console.error("no path")
}


//renvoi la longueur du chemin entre a et b
function heuristic(a, b) {
    //return (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)
    return (b.x - a.x) + (b.y - a.y)
}


/**
 * de base si map a pas la clé sa renvoi undefinied 
 * la sa renvoi infinity
 * @param {Map} map 
 * @param {key} param 
 * @returns 
 */
function mapGet(map, param) {
    return map.get(param) ?? Infinity
}






