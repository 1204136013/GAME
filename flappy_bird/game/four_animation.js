class FourAnimation extends Gravity {
    constructor(game) {
        super(game)
        // 硬编码一套动画
        this.animations = {
            idle: [],
            run: [],
        }
        this.importTexture()
        this.AnimationName = "idle"
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 6
        this.flipX = false
        this.w = this.texture.width
        this.h = this.texture.height
        this.rotation = 0
        this.alive = true
        this.lifes = 1
    }

    static new(game) {
        return new this(game)
    }

    importTexture() {
        var game = this.game
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations.run.push(t)
        }
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations.idle.push(t)
        }

    }

    frames() {
        return this.animations[this.AnimationName]
    }

    jump() {
        if (this.alive) {
            this.vy = -5
            this.rotation = -45
        }
    }

    fall() {
        this.alive = false
        if (this.vy < 0) {
            this.vy = 0
        }
    }

    update() {
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.04
        var h = 495
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.changeFrame()
    }

    changeFrame() {
        if (!this.alive) {
            return
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 6
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()
    }

    move(x, keyStatus) {
        this.flipX = x < 0
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
        this.AnimationName = name
    }

    collide(p) {
        es = p.pipes
        var killed = false
        for (var i = 0; i < es.length; i++) {
            var b = es[i]
            if (recIntersects(this, b) || recIntersects(b, this)) {
                if (this.kill()) {
                    killed = true
                }
            }
        }
        if (this.y >= 495) {
            killed = true
        }
        return killed
    }

    kill() {
        var o = this
        o.lifes = o.lifes - 1
        if (o.lifes < 1) {
            o.alive = false
            return true
        }
    }
}