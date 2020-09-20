var Block = function (postition) {
    // position 格式为 [0, 0]
    var p = postition
    var image = imageFromPath("./png/block.png")
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        alive: true,
    }
    o.kill = function () {
        o.alive = false
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
