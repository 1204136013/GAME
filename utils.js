var recIntersects = function (a, b) {
    // var o = a
    // if (b.y > o.y && b.y < o.y + o.image.height) {
    //     if (b.x > o.x && b.x < o.x + o.image.width) {
    //         log("相撞")
    //         return true
    //     }
    // }
    // return false
    no = a.y + a.image.height < b.y || a.x + a.image.width < b.x || b.y + b.image.height < a.y || b.x + b.image.width < a.x
    return !no
}
