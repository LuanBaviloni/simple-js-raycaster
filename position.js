class Position {
    constructor(x, y, angle = 45) {
        this.x = x
        this.y = y
        this.angle = angle
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getAngle() {
        return this.angle
    }

    add(other) {
        this.x += other.getX()
        this.y += other.getY()
    }

    addX(x) {
        this.x += x
    }

    addY(y) {
        this.y += y
    }

    addAngle(angle) {
        this.angle += angle
    }
}