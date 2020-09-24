var recIntersects = function (a, b) {
    no = a.y + a.image.height < b.y || a.x + a.image.width < b.x || b.y + b.image.height < a.y || b.x + b.image.width < a.x
    return !no
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

var imageByName = function (name) {
    
}