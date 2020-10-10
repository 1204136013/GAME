var Scene = function (game) {
    var s = {
        game: game,
    }
    // 初始化
    var level = 3
    var level_max = levels.length
    log("level_max", level_max)
    var ball = Ball(game)
    var paddle = Paddle(game)
    var blocks = loadLevel(game, level)
    var score = 0

    game.registerAction("a", function () {
        paddle.moveLeft()
    })
    game.registerAction("d", function () {
        paddle.moveRight()
    })
    game.registerAction("f", function () {
        ball.fire()
    })

    // mouse event
    var enableDrag = false
    game.canvas.addEventListener("mousedown", function (event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, event)

        if (ball.hasPoint(x, y)) {
            log("点中球了")
            // 设置拖拽状态
            enableDrag = true
        }
        else {
            log("没点中球·")
        }
    })

    game.canvas.addEventListener("mousemove", function (event) {
        var x = event.offsetX
        var y = event.offsetY
        if (enableDrag) {
            // log(x, y, "move")
            ball.x = x
            ball.y = y
        }
    })

    game.canvas.addEventListener("mouseup", function (event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, "up")
        // 取消拖拽状态
        enableDrag = false
    })



    s.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)

        if (blocks.length > 1) {
            log("blocks", blocks)
        }

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // Create gradient
        var gradient = game.context.createLinearGradient(0, 0, 400, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        game.context.fillStyle = gradient
        game.context.fillText("Score: " + score, 350, 30)

    }
    s.update = function () {
        if (window.paused) {
            return
        }
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 替换场景到游戏结束
            var end  = SceneEnd.new(game)
            game.replaceScene(end)

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

        // 如果所有砖块都打掉了, 载入下一关
        var dead = 0
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (!block.alive) {
                dead = dead + 1
            }
        }
        if (dead == blocks.length){
            if (level < level_max){
                log("所有砖块消灭了")
                level = level + 1
                log("载入", level, "关")
                blocks = loadLevel(game, level)
            }
            else{
                var success  = SceneSuccess.new(game)
                game.replaceScene(success)
                }
        }
        

    }


    return s
}