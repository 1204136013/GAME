class Scene extends FourScene {
    constructor(game) {
        super(game)
        this.level = 1
        this.levels = levels
        this.level_max = this.levels.length
        this.ball = Ball(this.game)
        this.paddle = Paddle(this.game)
        this.blocks = loadLevel(this.game, this.level)
        this.score = 0

        this.game.registerAction("a", () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction("d", () => {
            this.paddle.moveRight()
        })
        this.game.registerAction("f", () => {
            this.ball.fire()
        })
        // mouse event
        this.enableDrag = false
        this.game.canvas.addEventListener("mousedown", (event) => {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, "down")

            if (this.ball.hasPoint(x, y)) {
                log("点中球了")
                // 设置拖拽状态
                this.enableDrag = true
            }
            else {
                log("没点中球·")
            }
        })

        this.game.canvas.addEventListener("mousemove", (event) => {
            var x = event.offsetX
            var y = event.offsetY
            if (this.enableDrag) {
                // log(x, y, "move")
                this.ball.x = x
                this.ball.y = y
            }
        })

        this.game.canvas.addEventListener("mouseup", (event) => {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, "up")
            // 取消拖拽状态
            this.enableDrag = false
        })
    }

    draw() {
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)

        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if (block.alive) {
                this.game.drawImage(block)
            }
        }
        this.game.context.fillText("Score: " + this.score, 350, 30)
    }

    update() {
        if (window.paused) {
            return
        }
        var ball = this.ball
        var blocks = this.blocks
        // 判断游戏结束
        if (ball.y > this.paddle.y) {
            // 替换场景到游戏结束
            var end = SceneEnd.new(this.game)
            this.game.replaceScene(end)
        }
        ball.move()
        // 判断 ball 和 paddle 相撞
        if (this.paddle.collide(ball)) {
            // ball.反弹()
            ball.revert()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            var d = block.collide(ball)
            if (d) {
                block.kill()
                log("ball revert with block")
                ball.revert(d)
                this.score = this.score + 100
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

        if (dead >= blocks.length) {
            if (this.level < this.level_max) {
                log("所有砖块消灭了")
                this.level = this.level + 1
                log("载入", this.level, "关")
                blocks = loadLevel(this.game, this.level)
            }
            else {
                var e = SceneEnd.new(this.game)
                this.game.replaceScene(e)
            }
        }
    }

    reset() {
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            block.reborn()
        }
        this.ball.reset()
        this.level = 1
        this.blocks = loadLevel(this.game, this.level)
    }
}
