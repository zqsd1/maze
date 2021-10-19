class Node {

    constructor(x, y) {
        this.x = x
        this.y = y
        this.walls = 15
        this.color = false
    }

    removeWall(pos) {
        let w = wallsP.indexOf(pos)
        if (w > -1)
            this.walls = clearBit(this.walls, w)
    }

    isWall(pos) {
        let w = wallsP.indexOf(pos)
        if (w > -1)
            return getBit(this.walls, w)
    }

    buildWall(pos) {
        let w = wallsP.indexOf(pos)
        if (w > -1)
            this.walls = setBit(this.walls, w)
    }


    draw(ctx) {
        let w = ctx.canvas.width / COLONNES
        let h = ctx.canvas.height / LIGNES

        let posx = this.x * w
        let posy = this.y * h

        ctx.beginPath()
        ctx.save()
        ctx.translate(posx, posy)

        if (this.isWall("top")) {
            ctx.moveTo(0, 0)
            ctx.lineTo(w, 0)
        }
        if (this.isWall("right")) {
            ctx.moveTo(w, 0)
            ctx.lineTo(w, h)
        }
        if (this.isWall("bottom")) {
            ctx.moveTo(w, h)
            ctx.lineTo(0, h)
        }
        if (this.isWall("left")) {
            ctx.moveTo(0, h)
            ctx.lineTo(0, 0)
        }

        ctx.stroke()



        if (this.color) {
            ctx.fillStyle = 'yellow'
            ctx.fillRect(0, 0, w, h)
        }
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


wallsP = ['top', 'right', 'bottom', 'left']
