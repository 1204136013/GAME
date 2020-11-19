class Bullet extends FourImage {
    constructor(game, name) {
        super(game, name)
        this.setup(name)
    }

    setup(name) {
        this.speed = 5
        this.alive = true
        if (name == "bullete") {
            this.reverse = true // 敌人子弹
        }
    }

    update() {
        this.speed = config.bullet_speed
        if (!this.reverse) {
            this.y -= this.speed
        } else {
            this.y += this.speed
        }
        if (this.y < 0 || this.y > 600) {
            this.kill()
        }
    }

    kill() {
        this.alive = false
    }
}
