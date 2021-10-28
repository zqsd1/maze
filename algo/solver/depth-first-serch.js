
function DFS_Iterative_Solver(start, goal) {
    start.discovered = true
    let path = []
    path.push(start)

    while (path.length > 0) {
        currentNode = path.pop()

        if (currentNode === goal) return path

        let voisins = currentNode.paths.filter(element => element.discovered === false)

        if (voisins.length > 0) {
            path.push(currentNode)

            let voisin = voisins[0]

            voisin.discovered = true
            path.push(voisin)
        }

    }

    return console.log("No path")
}

