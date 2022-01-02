var inputs = {
    up: false,
    down: false,
    right: false,
    left: false,
}

document.onkeydown = function(evt) {
    evt = evt || window.event
    var charCode = evt.keyCode || evt.which

    switch(charCode) {
        case 37: // ->
            //cMap.robot.addAngle(1)
            inputs.right = true
            break;

        case 39: // <-
            //cMap.robot.addAngle(-1)
            inputs.left = true
            break;

        case 38: // up
            //cMap.robot.moveFoward(4)
            inputs.up = true
            break;

        case 40: // down
            //cMap.robot.moveBackward(4)
            inputs.down = true
            break;

        default:
            //console.log(charCode)

    }                
}

document.onkeyup = function(evt) {
    evt = evt || window.event
    var charCode = evt.keyCode || evt.which

    switch(charCode) {
        case 37: // ->
            //cMap.robot.addAngle(1)
            inputs.right = false
            break;

        case 39: // <-
            //cMap.robot.addAngle(-1)
            inputs.left = false
            break;

        case 38: // up
            //cMap.robot.moveFoward(4)
            inputs.up = false
            break;

        case 40: // down
            //cMap.robot.moveBackward(4)
            inputs.down = false
            break;

        default:
            //console.log(charCode)

    }                
}