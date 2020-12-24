var Paddle = function (game) {
    var o = game.imageByName("paddle")
    o.x = 100
    o.y = 250
    o.speed = 10
    
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

    o.collide = function (b) {
        return recIntersects(o, b) || recIntersects(b, o)
    }
    return o
}
