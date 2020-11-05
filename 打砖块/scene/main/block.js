var Block = function (game, postition) {
    // position 格式为 [0, 0]
    var p = postition
    // var image = imageFromPath("./png/block.png")
    // var o = {
    //     image: image,
    //     x: p[0],
    //     y: p[1],
    //     w: 50,
    //     h: 20,
    //     alive: true,
    //     lifes: p[2] || 1,
    // }

    var o = game.imageByName("block")
    o.x = p[0]
    o.y = p[1]
    o.alive = true
    o.lifes = p[2] || 1

    o.kill = function () {
        o.lifes = o.lifes - 1
        log("life -1")
        if (o.lifes < 1) {
            log("killed")
            o.alive = false
        }
    }

    o.collide = function (b) {
        if (o.alive) {
            return recIntersects(o, b) || recIntersects(b, o)
        }
        else {
            return false
        }
    }

    o.cell = function (x, y) {
        // 将画布按照 block 的大小拆分成一个个的格子, 确保每个 block 只能被画在格子里
        o.x = Math.floor(x/o.w) * o.w
        o.y = Math.floor(y/o.h) * o.h
    }

    return o
}
