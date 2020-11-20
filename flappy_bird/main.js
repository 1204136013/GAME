
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
            // blocks = loadLevel(game, Number(k))
        }
    })
    
    // 控制速度
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
        bg: "./bird/bg.png",
        pipe: "./bird/pipe.png",
        ground: "./bird/xcground.png",
        b1: "./bird/b1.png",
        b2: "./bird/b2.png",
        b3: "./bird/b3.png",
        over: "./bird/game_over.png",
        title: "./bird/title.png",
        n0: "./bird/number/0.png",
        n1: "./bird/number/1.png",
        n2: "./bird/number/2.png",
        n3: "./bird/number/3.png",
        n4: "./bird/number/4.png",
        n5: "./bird/number/5.png",
        n6: "./bird/number/6.png",
        n7: "./bird/number/7.png",
        n8: "./bird/number/8.png",
        n9: "./bird/number/9.png",
    }
    // var scene = Scene(game)

    var game = Game.instance(45, images, function(g){
        var s = Scene.new(g)
        // var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}

__main()
