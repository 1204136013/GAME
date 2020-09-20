var Ball = function () {
    // 初始化挡板
    var image = imageFromPath("./png/ball.png")
    var o = {
        image: image,
        x: 0,
        y: 0,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function () {
        o.fired = true
    }
    o.revert = function () {
        o.speedY = -o.speedY
    }
    return o
}
