var recIntersects = function (a, b) {
    no = a.y + a.h < b.y || a.x + a.w < b.x || b.y + b.h < a.y || b.x + b.w < a.x
    return !no
}

var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

const randomBetween = function (start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
