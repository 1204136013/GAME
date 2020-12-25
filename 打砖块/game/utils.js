var recIntersects = function (a, b) {
    no = a.y + a.image.height < b.y || a.x + a.image.width < b.x || b.y + b.image.height < a.y || b.x + b.image.width < a.x
    return !no
}

var collideRectangle = function (a, b) {
    if (a.y > b.y) {
        var lenY = b.image.height - (a.y - b.y)
    } else {
        var lenY = a.image.height - (b.y - a.y)
    }

    if (a.x > b.x) {
        var lenX = b.image.width - (a.x - b.x)
    } else {
        var lenX = a.image.width - (b.x - a.x)
    }

    if (lenX >= lenY) {
        return "x"
    } else {
        return "y"
    }
}


var e = sel => document.querySelector(sel)

// var log = function (s) {
//     e("#id-text-log").value += "\n" + s
// }

var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}
