var loadLevel = function (game, n) {
    blocks = []
    n = n - 1
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function (game,enable) {
    if (!enable) {
        return
    }
    log("debug 开启")
    window.addEventListener("keydown", function (event) {
        var k = event.key
        if (k == "p") {
            // 暂停功能
            window.paused = !window.paused
        } else if ("1234567".includes(k)) {
            // 临时载入关卡
            blocks = loadLevel(game, Number(k))
        }
    })
    document.querySelector("#id-input-speed").addEventListener("input", function (event) {
        var input = event.target
        log("fps", input.value)
        // input.value 最低是 0 所以 + 1
        // 加一后范围是 1 到 100 
        window.fps = Number(input.value) + 1
    })
}


var __main = function () {
    var images = {
        ball: "./png/ball.png",
        block: "./png/block.png",
        paddle: "./png/paddle.png",
    }
    // var scene = Scene(game)
    var game = Game.instance(45, images, function(g){
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}

__main()
