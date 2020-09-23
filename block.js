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

    o.collide = function (p) {
        if (o.alive) {
            return recIntersects(o, p) || recIntersects(p, o)
        }
        else {
            return false
        }
    }
    return o
}
