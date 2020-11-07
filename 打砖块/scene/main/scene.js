// var Scene = function (game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var level = 1
//     var level_max = levels.length
//     log("level_max", level_max)
//     var ball = Ball(game)
//     var paddle = Paddle(game)
//     var blocks = loadLevel(game, level)
//     var score = 0

//     game.registerAction("a", function () {
//         paddle.moveLeft()
//     })
//     game.registerAction("d", function () {
//         paddle.moveRight()
//     })
//     game.registerAction("f", function () {
//         ball.fire()
//     })

//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener("mousedown", function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, "down")

//         if (ball.hasPoint(x, y)) {
//             log("点中球了")
//             // 设置拖拽状态
//             enableDrag = true
//         }
//         else {
//             log("没点中球·")
//         }
//     })

//     game.canvas.addEventListener("mousemove", function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         if (enableDrag) {
//             // log(x, y, "move")
//             ball.x = x
//             ball.y = y
//         }
//     })

//     game.canvas.addEventListener("mouseup", function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, "up")
//         // 取消拖拽状态
//         enableDrag = false
//     })


//     s.draw = function () {
//         game.drawImage(paddle)
//         game.drawImage(ball)

//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         game.context.fillText("Score: " + score, 350, 30)

//     }
//     s.update = function () {
//         if (window.paused) {
//             return
//         }
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 替换场景到游戏结束
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)

//         }
//         ball.move()
//         // 判断 ball 和 paddle 相撞
//         if (paddle.collide(ball)) {
//             // ball.反弹()
//             ball.revert()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 block.kill()
//                 log("ball revert with block")
//                 ball.revert()
//                 score = score + 100
//             }
//         }

//         // 如果所有砖块都打掉了, 载入下一关
//         var dead = 0
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (!block.alive) {
//                 dead = dead + 1
//             }
//         }
//         if (dead == blocks.length) {
//             if (level < level_max) {
//                 log("所有砖块消灭了")
//                 level = level + 1
//                 log("载入", level, "关")
//                 blocks = loadLevel(game, level)
//             }
//             else {
//                 var success = SceneSuccess.new(game)
//                 game.replaceScene(success)
//             }
//         }


//     }


//     return s
// }

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

        log("scene blocks", this.blocks)
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
        // 判断游戏结束
        if (this.ball.y > this.paddle.y) {
            // 替换场景到游戏结束
            var end = SceneEnd.new(game)
            this.game.replaceScene(end)
        }
        this.ball.move()
        // 判断 ball 和 paddle 相撞
        if (this.paddle.collide(this.ball)) {
            // ball.反弹()
            this.ball.revert()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if (block.collide(this.ball)) {
                block.kill()
                log("ball revert with block")
                this.ball.revert()
                this.score = this.score + 100
            }
        }

        // 如果所有砖块都打掉了, 载入下一关
        var dead = 0
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if (!block.alive) {
                dead = dead + 1
            }
        }
        if (dead >= this.blocks.length) {
            if (this.level < this.level_max) {
                log("所有砖块消灭了")
                this.level = this.level + 1
                log("载入", level, "关")
                this.blocks = loadLevel(game, this.level)
            }
            else {
                var success = SceneSuccess.new(this.game)
                this.game.replaceScene(success)
            }
        }


    }

}

// 碰撞只反弹了 y, 没有反弹 x, 如果 从侧面装上去, 就会卡进到模型里