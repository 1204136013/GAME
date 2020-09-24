
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


var __main = function () {
    var images = {
        ball: "./png/ball.png",
        block: "./png/block.png",
        paddle: "./png/paddle.png",
    }
    var game = Game(45, images, function(g){
        var ball = Ball(game)
        var paddle = Paddle(game)
        var blocks = loadLevel(game, 1)
        var paused = false
        var score = 0
        var enableDebugMode = function (game,enable) {
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
    
        game.registerAction("a", function () {
            paddle.moveLeft()
        })
        game.registerAction("d", function () {
            paddle.moveRight()
        })
        game.registerAction("f", function () {
            ball.fire()
        })
    
        enableDebugMode(game, true)
    
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

        var enableDrag = false
        game.canvas.addEventListener("mousedown", function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, event)
    
            if (ball.hasPoint(x, y)) {
                log("点中球了")
                // 设置拖拽状态
                enableDrag = true
            }
            else{
                log("没点中球·")
            }
        })
    
        game.canvas.addEventListener("mousemove", function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                // log(x, y, "move")
                ball.x = x
                ball.y = y
            }
        })
    
        game.canvas.addEventListener("mouseup", function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, "up")
            // 取消拖拽状态
            enableDrag = false
        })    


    })
    // 这里会有一个bug， game里需要载入图像， 而JavaScript载入图像是异步操作
    // 他并不会在这里载入图像， 而是接着执行下面的代码， 然后再载入图像
    // 下面的代码依赖图像，会出现undefined错误
    // 非常恶心的 临时解决办法， 把所有的事情全丢到回调函数里去做

}

__main()
