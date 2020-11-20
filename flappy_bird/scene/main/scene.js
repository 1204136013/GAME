class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = FourImage.new(game, "pipe")
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = FourImage.new(game, "pipe")
            p2.x = p1.x
            this.resetPipesPostion(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static new(game) {
        return new this(game)
    }

    update() {
        for (var p of this.pipes) {
            p.x -= 5
            if (p.x < -100) {
                p.x += this.管子横向间距 * this.columsOfPipe
            }
        }
    }

    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2

            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)


            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)
            context.restore()
            // this.game.drawImage(this)

        }
    }

    resetPipesPostion(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
}

class SceneTitle extends FourScene {
    constructor(game) {
        super(game)

        //bg
        var bg = FourImage.new(game, "bg")
        this.addElement(bg)
        // 加入管子
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // TODO: 地面抽象成一个类
        //地面, 循环移动
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = FourImage.new(game, "ground")
            g.x = i * 19
            g.y = 530
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        //player
        var b = FourAnimation.new(game)
        b.x = 150
        b.y = 190
        this.bird = b
        this.addElement(this.bird)
        this.setupInputs()

    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        this.offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            this.offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += this.offset
        }
    }
    setupInputs = () => {
        var b = this.bird
        this.game.registerAction("a", (keyStatus) => {
            log("eventa", keyStatus)
            b.move(-2, keyStatus)
        })
        this.game.registerAction("d", (keyStatus) => {
            log("eventd", keyStatus)
            b.move(2, keyStatus)
        })
        this.game.registerAction("j", (keyStatus) => {
            b.jump()
        })

    }
}

