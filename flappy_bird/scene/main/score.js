class Score {
    constructor(game) {
        this.game = game
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
        }
    }

    resetPipesPostion(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
}