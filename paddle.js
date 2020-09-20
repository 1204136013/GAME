var Paddle = function () {
    // 初始化挡板
    var image = imageFromPath("paddle.png")
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 10,
    }
    o.moveLeft = function () {
        o.x -= o.speed
        if (o.x < 0) {
            o.x = 0
        }
    }
    o.moveRight = function () {
        o.x += o.speed
        if (o.x > 400 - o.image.width) {
            o.x = 400 - o.image.width
        }
    }
    // o.collide = function (b) {
    //     if (b.y > o.y && b.y < o.y + o.image.height ) {
    //         if (b.x > o.x && b.x < o.x + o.image.width) {
    //             log("相撞")
    //             return true
    //         }
    //     }
    //     return false
    // }
    o.collide = function (b) {
        return recIntersects(o, b) || recIntersects(b, o)
    }
    return o
}
