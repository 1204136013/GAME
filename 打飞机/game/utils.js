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

const randomBetween = function (start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

// 随机生成敌人容易产生多个同种敌机
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
