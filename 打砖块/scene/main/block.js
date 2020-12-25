var Block = function (game, postition) {
    var p = postition
    var o = game.imageByName("block")
    o.x = p[0]
    o.y = p[1]
    o.alive = true
    o.lifes = p[2] || 1
    o.hp = p[2] || 1

    o.kill = function () {
        o.lifes = o.lifes - 1
        log("life -1, lifes:", o.lifes)
        if (o.lifes < 1) {
            log("killed")
            o.alive = false
        }
    }

    o.collide = function (b) {
        var c = recIntersects(o, b) || recIntersects(b, o)
        if (o.alive && c) {
            return collideRectangle(o, b)
        }
        else {
            return false
        }
    }

    o.cell = function (x, y) {
        // 将画布按照 block 的大小拆分成一个个的格子, 确保每个 block 只能被画在格子里
        o.x = Math.floor(x / o.w) * o.w
        o.y = Math.floor(y / o.h) * o.h
    }

    o.reborn = function () {
        o.lifes = o.hp
        o.alive = true
    }
    
    return o
}
