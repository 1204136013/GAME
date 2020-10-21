const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 3,
    bullet_speed: 6,
    fire_cooldown: 10,
}

class Bullet extends FourImage{
    constructor(game){
        super(game, "bullet")
        this.setup()
    }
    setup() {
        this.speed = 5
    }
    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}

class Player extends FourImage {
    constructor(game) {
        super(game, "player")
        this.setup()
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }

    fire() {
        if (this.cooldown != 0) {
            return
        }
        this.cooldown = config.fire_cooldown
        var x = this.x + this.w/2
        var y = this.y
        var b = Bullet.new(this.game)
        b.x = x
        b.y = y
        this.scene.addElement(b)
    }
}


class Enemy extends FourImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = "enemy" + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 3)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}

class Cloud extends FourImage {
    constructor(game) {
        super(game, "cloud")
        this.setup()
    }
    setup() {
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}


class Scene extends FourScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    update() {
        super.update()
        // this.cloud.y += 1
    }

    setup() {
        this.numberOfEnemies = 10
        this.bg = FourImage.new(this.game, "sky")
        this.cloud = Cloud.new(this.game, "cloud")
        this.player = Player.new(this.game)
        this.player.x = 100
        this.player.y = 150

        // 这里 push 的顺序需要注意, bg必须第一个， 不然会盖住其他图片
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)

        this.addEnemies()
    }

    addEnemies() {
        var es = []
        for(var i = 0; i<this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction("a", function () {
            s.player.moveLeft()
        })
        g.registerAction("d", function () {
            s.player.moveRight()
        })
        g.registerAction("w", function () {
            s.player.moveUp()
        })
        g.registerAction("s", function () {
            s.player.moveDown()
        })
        g.registerAction("j", function () {
            s.player.fire()
        })

        // game.registerAction("f", function () {
        //     ball.fire()
        // })

    }
}

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
//         log(x, y, event)

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

//         if (blocks.length > 1) {
//             log("blocks", blocks)
//         }

//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // Create gradient
//         var gradient = game.context.createLinearGradient(0, 0, 400, 0);
//         gradient.addColorStop("0", "magenta");
//         gradient.addColorStop("0.5", "blue");
//         gradient.addColorStop("1.0", "red");

//         game.context.fillStyle = gradient
//         game.context.fillText("Score: " + score, 350, 30)

//     }
//     s.update = function () {
//         if (window.paused) {
//             return
//         }
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 替换场景到游戏结束
//             var end  = SceneEnd.new(game)
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
//         if (dead == blocks.length){
//             if (level < level_max){
//                 log("所有砖块消灭了")
//                 level = level + 1
//                 log("载入", level, "关")
//                 blocks = loadLevel(game, level)
//             }
//             else{
//                 var success  = SceneSuccess.new(game)
//                 game.replaceScene(success)
//                 }
//         }


//     }


//     return s
// }