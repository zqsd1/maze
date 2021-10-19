/**
 * Deep First Search recursive
 * 
 * @param {*} graph :nodes[][] 
 * @param {Node} node 
 */
 function DFS(graph, node) {

    node.discovered = true

    for (const voisin of getVoisins(graph,node)) {

        if (voisin.discovered) continue

        removeWall(node,voisin)

        DFS(graph, voisin)
    }
}