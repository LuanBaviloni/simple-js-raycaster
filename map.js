class Map {
    constructor(mapMatrix, canvasId) {
        this.map = mapMatrix

        this.rows = this.map.length
        this.cols = this.map[0].length

        this.cellWidth  = 32;
        this.cellHeight = 32;

        this.canvasMap = document.getElementById(canvasId)
        this.ctxMap = this.canvasMap.getContext("2d")
        
        this.canvasMap.height = this.rows * this.cellHeight
        this.canvasMap.width  = this.cols * this.cellWidth

        this.robot = new Robot(this, 30, 30, 315)

        this.onRender = null
    }

    _clearMap() {
        this.ctxMap.clearRect(0, 0, this.canvasMap.width, this.canvasMap.height)   
    }

    _renderMap () {
        this.ctxMap.fillStyle = "#000"

        for(let y = 0; y < this.cols; y++) {
            for(let x = 0; x < this.cols; x++) {
                if (this.map[y][x] == 1) {
                    this.ctxMap.beginPath()
                    this.ctxMap.fillRect(x * this.cellWidth, y * this.cellHeight,  this.cellWidth,  this.cellHeight)
                    this.ctxMap.stroke()
                }
            }
        }
    }

    _renderRobot() {
        let robotPos = this.robot.getPos()
        let centerX = robotPos.getX() + 16
        let centerY = robotPos.getY() + 16
        let originX = centerX + Math.cos(toRadians(robotPos.getAngle())) * 16;
        let originY = centerY - Math.sin(toRadians(robotPos.getAngle())) * 16

        this.ctxMap.fillStyle = "#CA0"
        this.ctxMap.beginPath()
        this.ctxMap.arc(centerX, centerY, 16, 0, 2 * Math.PI)
        this.ctxMap.fill()


        this.ctxMap.beginPath()
        this.ctxMap.fillStyle = "#000"
        this.ctxMap.strokeStyle = "#000"
        this.ctxMap.moveTo(centerX, centerY)
        this.ctxMap.lineTo(originX, originY)
        this.ctxMap.stroke()

        for(let i = 0; i < this.robot.sensors.length; i++) {
            
            let sensor = this.robot.sensors[i]
            let distance = sensor.measure()
            let angle = sensor.getAngle()

            let endX = originX + Math.cos(toRadians(angle)) * distance
            let endY = originY - Math.sin(toRadians(angle)) * distance
           
            this.ctxMap.beginPath()
            this.ctxMap.strokeStyle  = "#0A0"
            this.ctxMap.moveTo(originX, originY)
            this.ctxMap.lineTo(endX, endY)
            this.ctxMap.stroke()
        }

        this.onRender && this.onRender()
    }

    render() {
        this._clearMap()
        this._renderMap()
        this._renderRobot()
    }
}