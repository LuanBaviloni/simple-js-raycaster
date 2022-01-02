
class Sensor {
    constructor(robot, map, angle, maxRange = 2000) {
        this.maxRange = maxRange
        this.angle = angle
        this.parent = robot
        this.map = map

        this.measurement = 0

        this.mapRows = this.map.map.length
        this.mapCols = this.map.map[0].length
    }

    getAngle() {
        return this.parent.getAngle() + this.angle
    }

    getMeasurement() {
        return this.measurement
    }

    measure() {
        let robotPos = this.parent.getPos()
        let robotAngle = robotPos.getAngle()
        let centerX = robotPos.getX() + 16
        let centerY = robotPos.getY() + 16
        let originX = centerX + Math.cos(toRadians(robotAngle)) * 16
        let originY = centerY - Math.sin(toRadians(robotAngle)) * 16

        for (var distance = 0; distance < this.maxRange; distance += 1) {
            let endX = originX + Math.cos(toRadians(this.getAngle())) * distance
            let endY = originY - Math.sin(toRadians(this.getAngle())) * distance                       

            let x = Math.floor(endX / this.map.cellWidth)
            let y = Math.floor(endY / this.map.cellHeight)

            //console.log(endX, endY, x, y)

            if ((y <= -1) || (x <= -1)) {
                break;
            }


            if ((y >= this.mapRows) || (x >= this.mapCols)) {
                break;
            }
            
            if (this.map.map[y][x] == 1) {
                break
            }
        }

        this.measurement = distance
        return distance
    }
}
