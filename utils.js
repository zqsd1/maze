
function voisinsArraySimple(arr, node) {
    let index = arr.indexOf(node)
    let voisins = []
    if (index > -1) {
        if (arr[index + 1] && (index + 1) % LIGNES != 0)
            voisins.push(arr[index + 1])

        if (arr[index - 1] && (index - 1) % LIGNES != LIGNES - 1)
            voisins.push(arr[index - 1])

        if (arr[index + LIGNES])
            voisins.push(arr[index + LIGNES])

        if (arr[index - LIGNES])
            voisins.push(arr[index - LIGNES])
    }

    return voisins
}



function voisinsArrayDouble(arr, node) {

    //return voisinsArraySimple(arr.flat(), node)

    let voisins = []
    if (node == undefined)
        return voisins

    let x = node.x
    let y = node.y
    if (arr[x][y]) {

        if (arr[x + 1][y]) {
            voisins.push(arr[x + 1][y])
        }
        if (arr[x - 1][y]) {
            voisins.push(arr[x - 1][y])
        }
        if (arr[x][y + 1]) {
            voisins.push(arr[x][y + 1])
        }
        if (arr[x][y - 1]) {
            voisins.push(arr[x][y - 1])
        }
    }
    return voisins

}