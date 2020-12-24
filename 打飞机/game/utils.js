var recIntersects = function (a, b) {
    no = a.y + a.h < b.y || a.x + a.w < b.x || b.y + b.h < a.y || b.x + b.w < a.x
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

const randomBetween = function (start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

// 指定生成四个小飞机, 两个中飞机, 一个大飞机
const initType = function (i) {
    if ([0, 1, 2, 3].includes(i)) {
        return 0
    }
    if ([4, 5].includes(i)) {
        return 1
    }
    if (i == 6) {
        return 2
    }
}
