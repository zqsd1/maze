class Position {
    constructor(x, y) {
        this.x = x
        this.y = y

    }

    ajout(pos) {
        return new Position(this.x + pos.x, this.y + pos.y)
    }

    minus(pos) {
        return new Position(this.x - pos.x, this.y - pos.y)
    }

    moveX(value) {
        this.x += value
        return this
    }
    moveY(value) {
        this.y += value
        return this
    }

    get oppose() {
        return new Position(-this.x, -this.y)
    }

    isEquals(pos) {
        return this.x === pos.x && this.y === pos.y
    }


}

class NullPosition {

}