class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 200
        this.columsOfPipe = 3
        this.move = true
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
        for (var i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            if (this.move) {
                p1.x -= 5
                p2.x -= 5
                if (p1.x < -100) {
                    p1.x += this.管子横向间距 * this.columsOfPipe
                    p1.passed = false
                }
                if (p2.x < -100) {
                    p2.x += this.管子横向间距 * this.columsOfPipe
                    this.resetPipesPostion(p1, p2)
                    p2.passed = false
                }
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
        }
    }

    resetPipesPostion(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
        log("管子横向间距为", this.管子横向间距)
    }

    // 管子停止移动
    stop() {
        this.move = false
    }

    pass(b) {
        for (var p of this.pipes) {
            if (b.x > p.x && !p.passed && p.flipY) {
                p.passed = true
                return true
            }
        }
    }
}