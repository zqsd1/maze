class Node {

    constructor(x, y) {
        this.position = new Position(x, y)
        this.walls = 15
        this.discovered = false
    }
    get x() {
        return this.position.x
    }
    get y() {
        return this.position.y
    }
    set x(value) {
        this.position.x = value
    }
    set y(value) {
        this.position.y = value
    }

    removeWall(pos) {
        return this.walls = clearBit(this.walls, pos)
    }

    buildWall(pos) {
        return this.walls = setBit(this.walls, pos)
    }

    hasWall(pos) {
        return getBit(this.walls, pos)
    }


    draw(ctx) {
        let w = ctx.canvas.width / COLONNES
        let h = ctx.canvas.height / LIGNES

        let posx = this.x * w
        let posy = this.y * h


        ctx.save()
        ctx.translate(posx, posy)


        if (this.hasWall(0)) {
            ctx.moveTo(0, 0)
            ctx.lineTo(w, 0)
        }

        if (this.hasWall(1)) {
            ctx.moveTo(w, 0)
            ctx.lineTo(w, h)
        }

        if (this.hasWall(2)) {
            ctx.moveTo(w, h)
            ctx.lineTo(0, h)
        }

        if (this.hasWall(3)) {
            ctx.moveTo(0, h)
            ctx.lineTo(0, 0)
        }
        ctx.stroke()

        ctx.restore()

    }

}

function clearBit(num, i) {

    let mask = ~(1 << i); // if i = 4, (1 << i) => 00010000, mask = 11101111

    return num & mask;

}
function getBit(num, i) { // i range is {0, 31}, 0 is the rightest
    return (num & (1 << i)) != 0; // if i = 4, (1 << i) => 00010000
}
function setBit(num, i) {

    return num | (1 << i); // if i = 4, (1 << i) => 00010000

}

