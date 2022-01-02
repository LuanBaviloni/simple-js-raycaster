class Robot {
    constructor(map, x, y, angle) {
        this.pos = new Position(x, y, angle)
        this.sensors = []

        //this.sensors.push(new Sensor(this, map, 0))
        
        for (let a = 20; a >= -20;  a = a-0.1) {
            this.sensors.push(new Sensor(this, map, a))
        } /* */
    }

    getPos() {
        return this.pos
    }

    moveFoward(amount) {
        this.pos.addX(  amount * Math.cos(toRadians(this.pos.getAngle())) )
        this.pos.addY(- amount * Math.sin(toRadians(this.pos.getAngle())) )
    }


    moveBackward(amount) {
        this.pos.addX(- amount * Math.cos(toRadians(this.pos.getAngle())) )
        this.pos.addY(+ amount * Math.sin(toRadians(this.pos.getAngle())) )
    }

    addAngle(angle) {
        this.pos.addAngle(angle)
    }

    getAngle() {
        return this.pos.getAngle()
    }

}