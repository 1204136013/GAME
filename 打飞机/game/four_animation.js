class FourAnimation {
    constructor(game) {
        this.game = game
        // 硬编码一套动画
        this.animations = {
            idle: [],
            run: [],
        }
        for (var i = 1; i < 7; i++) {
            var name = `w${i}`
            var t = game.textureByName(name)
            this.animations.run.push(t)
        }
        for (var i = 1; i < 5; i++) {
            var name = `i${i}`
            var t = game.textureByName(name)
            this.animations.idle.push(t)
        }
        this.AnimationName = "idle"
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 6
        this.flipx = false
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.AnimationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 6
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        if (this.flipx) {
            context.save()
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)

            context.drawImage(this.texture, this.x, this.y)
            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
        // this.game.drawImage(this)
    }
    move(x, keyStatus) {
        this.flipx = x < 0
        log("keystatus", keyStatus)
        this.x += x
        var animationNames = {
            down: "run",
            up: "idle",
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name) {
        // log("change animation", name)
        this.AnimationName = name
    }
}