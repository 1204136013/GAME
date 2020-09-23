var Game = function (fps, images) {
    // 初始化大地图, 游戏世界之类的
    // images 是一个数组， 里面是图片的名字
    // 程序会在所有图片载入完成后开始运行
    var g = {
        actions: {},
        keydonws: {},
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
    for (var i = 0; i < images.length; i++) {
        var path = images[i];
        var img = new Image()
        img.src = path
        img.onload = function () {
            // 所有图片载入成功后，调用 run
            loads.push(1)
            if (loads.length == images.length) {
                g.run()
            }

        }
    }
    // 开始运行
    g.run = function() {
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    
    }

    return g
}
