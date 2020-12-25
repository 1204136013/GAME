var Ball = function (game) {
    var o = game.imageByName("ball")
    o.x = 0
    o.y = 0
    o.speedX = 5
    o.speedY = 5
    o.fired = false
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

    o.revert = function (d) {
        log("反弹")
        if (d == "x") {
            o. speedX = -o.speedX
        } else {
            o.speedY = -o.speedY
        }
    }

    o.hasPoint = function (x, y) {
        // 有一个点在ball这个矩形里面
        log("mouseX", x)
        log("mouseY", y)

        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h

        return xIn && yIn
    }

    o.reset = function () {
        o.x = 0
        o.y = 0
        o.fired = false
    }
    return o
}
