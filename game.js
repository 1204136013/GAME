var Game = function (fps) {
    // 初始化大地图, 游戏世界之类的
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

    setTimeout(function () {
        runloop()
    }, 1000 / window.fps)

    return g
}
