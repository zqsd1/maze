/**
 * Deep First Search recursive
 * 
 * @param {Array} graph
 * @param {Node} node 
 */
function DFS(graph, node) {

    node.discovered = true

    for (const voisin of node.voisins/*getVoisins(graph, node)*/) {

        if (voisin.discovered) continue

        removeWall(node, voisin)

        DFS(graph, voisin)
    }
}



/**
 * 
 * DEEP First Search recursive random
 * @param {Array} graph 
 * @param {Node} node 
 */
function DFS_Random(graph, node) {

    node.discovered = true

    let voisins = node.voisins//getVoisins(graph, node)

    while (voisins.length > 0) {

        let random = getRandomInt(0, voisins.length)

        let [voisin] = voisins.splice(random, 1)

        if (voisin.discovered) continue

        removeWall(node, voisin)

        DFS_Random(graph, voisin)

    }

}

