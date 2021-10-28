class Node {

    constructor(x, y) {
        this.position = new Position(x, y)
        this.walls = Math.pow(2, VOISINS_POSSIBLE.length) - 1
        this.discovered = false
        this.neighbourgs = []
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

    get paths() {
        return this.neighbourgs.reduce((prev, current, index) => {
            if (!this.hasWall(index) && current != undefined) {
                prev.push(current)
            }
            return prev
        }, [])

    }

    get voisins() {
        //get rid of undefinied
        return this.neighbourgs.filter(e => e)
    }
    set voisins(value) {
        this.neighbourgs = value
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

        /*
        //c'est beau mais ça prend 2x +de temps
        let swap = true
          ctx.save()
          ctx.translate(this.x * NODE_W, this.y * NODE_H)
          ctx.moveTo(0, 0)
  
          for (let i = 0; i < VOISINS_POSSIBLE.length; i++) {
              if (this.hasWall(i)) {
                  ctx.lineTo(swap ? NODE_W : NODE_H, 0)
              }
              ctx.moveTo(swap ? NODE_W : NODE_H, 0)
  
              //TODO see transform
              ctx.translate(swap ? NODE_W : NODE_H, 0)
              ctx.rotate(Math.PI / 2)
  
              swap = !swap
  
          }*/

        let swap = true
        ctx.save()
        ctx.transform(1, 0, 0, 1, this.x * NODE_W, this.y * NODE_H)

        ctx.moveTo(0, 0)
        for (let i = 0; i < VOISINS_POSSIBLE.length; i++) {
            if (this.hasWall(i)) {
                ctx.lineTo(swap ? NODE_W : NODE_H, 0)
            }
            ctx.moveTo(swap ? NODE_W : NODE_H, 0)

            transform(swap ? NODE_W : NODE_H, 0, 1, 2 * Math.PI / VOISINS_POSSIBLE.length)
            //ctx.transform(0, 1, -1, 0, swap ? NODE_W : NODE_H, 0)


            swap = !swap
        }


        /*
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
                }*/


        // ctx.stroke()

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


let a, b
function transform(x, y, scale, rotate) {
    if (a == undefined) {

        const xAX = Math.cos(rotate) * scale;
        const xAY = Math.sin(rotate) * scale;
        a = xAX
        b = xAY
        ctx.transform(xAX, xAY, -xAY, xAX, x, y);
    }
    else
        ctx.transform(a, b, -b, a, x, y)


}