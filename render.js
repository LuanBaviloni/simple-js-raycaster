class Render {
    constructor(map, canvasId) {
        this.map = map
        
        this.canvasMap = document.getElementById(canvasId)
        this.ctxMap = this.canvasMap.getContext("2d")
        
        this.canvasMap.height = 512;//map.canvasMap.height
        this.canvasMap.width  = 800;//map.canvasMap.width
        
        this.width = this.canvasMap.width 
        this.height = this.canvasMap.height
    }

    _clearMap() {
        this.ctxMap.clearRect(0, 0, this.width, this.height)   
        this.ctxMap.fillStyle = '#000';
        this.ctxMap.fillRect(0, 0, this.width, this.height/2);

        let grd = this.ctxMap.createLinearGradient(0, this.height/2, 0, this.height);
        grd.addColorStop(0, "#113");
        grd.addColorStop(1, "#337");

        
        this.ctxMap.fillStyle = grd;
        this.ctxMap.fillRect(0, this.height/2, this.width, this.height);
    }

    getColor(x) {
        // console.log(x)
        // return "#A00"
        let val1 = Math.floor(x * 16)
        let val2 = Math.floor( ((x * 16) % 1) * 16 )
        let hex  = val1.toString(16)
        let hex2 = val2.toString(16)

        return '#' + hex + hex2 + hex + hex2 + hex + hex2

        if (x < 0.25 ) return "#555"
        if (x < 0.5 ) return "#666"
        if (x < 0.75 ) return "#777"
        if (x < 1 )   return "#999"
    }

    sigmoid(z) {
        const k = 2;
        return 1 / (1 + Math.exp(-z/k));
    }

    render() {
        this._clearMap()
        
        let sensorsCount = this.map.robot.sensors.length
        
        let colWidth = this.width / sensorsCount

        for(let i = 0; i < sensorsCount; i++) {
            let sensor = this.map.robot.sensors[i]

            let tx = 1;
            // if (sensor.getAngle > 0) {
            //     tx = Math.cos(toRadians(sensor.getAngle()))
            // } else {
            //     tx = Math.sin(toRadians(sensor.getAngle()))
            // }
            let m =  Math.abs(sensor.getMeasurement() * tx)
            //console.log(m)
            //let m =  sensor.getMeasurement()
            let x = i * colWidth
            
            let colHeight =  75000/m            
            let y = Math.floor((this.height / 2) - (colHeight / 2))

            if (y < 0) y = 0
            if (colHeight > this.height) colHeight = this.height-1
            if (i == 0) {            
                document.getElementById("m").innerText = colHeight
                document.getElementById("y").innerText = x + ', ' + y + ', ' + colWidth + 1 + ', ' + colHeight
            }
            
            this.ctxMap.fillStyle = this.getColor(colHeight / this.height);
            this.ctxMap.fillRect(x, y, colWidth + 1, colHeight)
            
        }
    }

}