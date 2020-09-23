
var loadLevel = function (n) {
    blocks = []
    n = n - 1
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}


var __main = function () {
    var images = [
        "./png/ball.png",
        "./png/block.png",
        "./png/paddle.png",
    ]
    var paddle = Paddle()
    var ball = Ball()
    var game = Game(45, images)
    var blocks = loadLevel(1)
    var paused = false
    var score = 0
    var enableDebugMode = function (enable) {
        if (!enable) {
            return
        }
        log("debug 开启")
        window.addEventListener("keydown", function (event) {
            var k = event.key
            if (k == "p") {
                // 暂停功能
                paused = !paused
            } else if ("1234567".includes(k)) {
                // 临时载入关卡
                blocks = loadLevel(Number(k))
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

    game.registerAction("a", function () {
        paddle.moveLeft()
    })
    game.registerAction("d", function () {
        paddle.moveRight()
    })
    game.registerAction("f", function () {
        ball.fire()
    })

    enableDebugMode(true)

    game.update = function () {
        if (paused) {
            return
        }
        ball.move()
        // 判断 ball 和 paddle 相撞
        if (paddle.collide(ball)) {
            // ball.反弹()
            ball.revert()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                ball.revert()
                score = score + 100
            }
        }
    }

    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // Create gradient
        var gradient=game.context.createLinearGradient(0,0,400,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");

        game.context.fillStyle=gradient
        game.context.fillText("Score: "+score, 350, 30)
    }
}

__main()
