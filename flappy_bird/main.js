
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
        bullet: "./png/bullet.png",
        cloud: "./png/cloud.png",
        player: "./png/player.png",
        sky: "./png/sky.png",
        enemy0: "./png/enemy0.png",
        enemy1: "./png/enemy1.png",
        enemy2: "./png/enemy2.png",
        enemy3: "./png/enemy3.png",
        enemy4: "./png/enemy4.png",
        fire: "./png/fire.png",
        
        // 多状态动画
        i1: "./png/idle/i1.png",
        i2: "./png/idle/i2.png",
        i3: "./png/idle/i3.png",
        i4: "./png/idle/i4.png",
        // 跑动
        w1: "./png/walking/w1.png",
        w2: "./png/walking/w2.png",
        w3: "./png/walking/w3.png",
        w4: "./png/walking/w4.png",
        w5: "./png/walking/w5.png",
        w6: "./png/walking/w6.png",

        cave: "./png/cave.png",
        
        bg: "./bird/bg.png",
        ground: "./bird/xcground.png",
        b1: "./bird/b1.png",
        b2: "./bird/b2.png",
        b3: "./bird/b3.png",
    }
    // var scene = Scene(game)

    var game = Game.instance(45, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
    // var game = Game(45, images, function(g){
    //     // debug 模式所需

    //     enableDebugMode(game, true)

    //     game.update = function () {
    //         scene.update()
    //     }
    
    //     game.draw = function () {
    //         scene.draw()
    //     }


    // })
    // 这里会有一个bug， game里需要载入图像， 而JavaScript载入图像是异步操作
    // 他并不会在这里载入图像， 而是接着执行下面的代码， 然后再载入图像
    // 下面的代码依赖图像，会出现undefined错误
    // 非常恶心的 临时解决办法， 把所有的事情全丢到回调函数里去做

}

__main()