var Game = function (fps, images, call) {
    // 初始化大地图, 游戏世界之类的
    // images 是一个对象， 里面是图片的引用名 和 路径
    // 程序会在所有图片载入完成后开始运行
    var g = {
        scene: null,
        actions: {},
        keydonws: {},
        images: {},
    }
    var canvas = document.querySelector("#id-canvas")
    var context = canvas.getContext("2d")
    g.canvas = canvas
    g.context = context
    g.drawImage = function (p) {
        g.context.drawImage(p.image, p.x, p.y)
    }
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }
    g.clear = function () {
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
    }
    g.update = function() {
        g.scene.update()
    }
    g.draw = function() {
        g.scene.draw()
    }
    g.replaceScene = function(scene) {
        g.scene = scene
    }

    //events
    window.addEventListener("keydown", function (event) {
        g.keydonws[event.key] = true
    })
    window.addEventListener("keyup", function (event) {
        g.keydonws[event.key] = false
    })
    // timer
    window.fps = 45
    var runloop = function () {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydonws[key]) {
                g.actions[key]()
            }
        }
        g.update()
        g.clear()
        g.draw()
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    }

    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name];
        let img = new Image()
        img.src = path
        img.onload = function () {
            g.images[name] = img
            // 所有图片载入成功后，调用 run
            loads.push(1)
            if (loads.length == names.length) {
                g.run()
            }
        }
    }

    g.imageByName = function (name) {
        log("g")
        log(name)
        log(g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    // 开始运行
    g.runWithScene = function (scene) {
        // call(g)
        g.scene = scene
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    }
    g.run = function(scene) {
        call(g)
    }

    return g
}
