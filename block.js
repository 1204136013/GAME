var Block = function () {
    var image = imageFromPath("./png/block.png")
    var o = {
        image: image,
        x: 100,
        y: 100,
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
